import { defineStore } from 'pinia'
import apiClient from '../utils/apiClient'

export const useAddressStore = defineStore('address', {
    state: () => ({
        origin: null,
        destination: null,
        // bumped on every search; responses from older searches are discarded
        // so a slow earlier request can never overwrite a newer one's results
        searchRequestId: 0
    }),
    actions: {
        async searchAddresses(query, limit = 10, userLat = null, userLon = null) {
            const requestId = ++this.searchRequestId

            const params = { query, limit }
            if (userLat !== null && userLon !== null) {
                params.userLat = userLat
                params.userLon = userLon
            }

            try {
                const response = await apiClient.get('/api/search/autocomplete', {
                    params
                })

                // a newer search has started, these results are outdated
                if (requestId !== this.searchRequestId) {
                    return []
                }

                return response.data
            } catch (err) {
                if (requestId === this.searchRequestId) {
                    throw err
                }
                // superseded request, swallow its error
                return []
            }
        },

        setOrigin(address) {
            this.origin = address
        },

        setDestination(address) {
            this.destination = address
        },

        clearOrigin() {
            this.origin = null
        },

        clearDestination() {
            this.destination = null
        }
    }
})
