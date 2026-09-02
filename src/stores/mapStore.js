import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '../utils/apiClient'
import { showToast } from '../utils/BaseToast'
import { useI18n } from 'vue-i18n'

export const useMapStore = defineStore('map', () => {
    const { t } = useI18n()

    const waypoints = ref([])
    const routeData = ref(null)
    const nearbyRides = ref([])
    const selectedRide = ref(null)
    const userOrigin = ref(null)
    const userDestination = ref(null)
    const hoveredElement = ref(null)

    function setHoveredElement(element) {
        hoveredElement.value = element
    }

    function addWaypoint(waypoint) {
        waypoints.value.push(waypoint)
        if (waypoints.value.length >= 2) {
            fetchRoute()
        }
    }

    function setWaypoints(newWaypoints) {
        waypoints.value = newWaypoints
        if (waypoints.value.length >= 2) {
            fetchRoute()
        }
    }

    async function fetchRoute() {
        try {
            const response = await apiClient.post('/api/route', { waypoints: waypoints.value })
            routeData.value = response.data
        } catch (error) {
            console.error('Error fetching route:', error)
            const detail = error.response?.data?.message || error.response?.data
            if (typeof detail === 'string' && detail.toLowerCase().includes('cannot find point')) {
                showToast(t('toast_routablePointError'), 'error')
            } else {
                showToast(t('toast_routeError'), 'error')
            }
        }
    }

    async function fetchNearbyRides(lat, lon, lat2, lon2) {
        try {
            const params = { lat, lon, lat2, lon2 }
            const response = await apiClient.get('/api/demo/rides/nearest', { params })
            // cheapest first
            nearbyRides.value = (response.data || []).sort((a, b) => {
                const priceA = a.pricing?.grossAmount ?? Infinity
                const priceB = b.pricing?.grossAmount ?? Infinity
                return priceA - priceB
            })
            return nearbyRides.value
        } catch (error) {
            console.error('Error fetching nearby rides:', error)
            showToast(t('toast_searchError'), 'error')
            nearbyRides.value = []
            throw error
        }
    }

    function setSelectedRide(ride, origin, destination) {
        selectedRide.value = ride
        userOrigin.value = origin
        userDestination.value = destination
        // A = driver start, B = passenger pickup, C = passenger destination
        const newWaypoints = [
            { lat: ride.startLatitude, lon: ride.startLongitude },
            { lat: origin.latitude, lon: origin.longitude },
            { lat: destination.latitude, lon: destination.longitude }
        ]
        setWaypoints(newWaypoints)
    }

    function clearPoints() {
        waypoints.value = []
        routeData.value = null
        nearbyRides.value = []
        selectedRide.value = null
        userOrigin.value = null
        userDestination.value = null
    }

    return {
        waypoints,
        routeData,
        nearbyRides,
        selectedRide,
        userOrigin,
        userDestination,
        hoveredElement,
        setHoveredElement,
        addWaypoint,
        setWaypoints,
        fetchRoute,
        fetchNearbyRides,
        setSelectedRide,
        clearPoints
    }
})
