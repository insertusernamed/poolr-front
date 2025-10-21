<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-xl shadow-lg p-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-6">
                    Address Finder
                </h1>

                <AddressSearchBar v-model="selectedAddress" placeholder="Start typing an address..." :min-chars="2"
                    :debounce-delay="300" :max-results="10" @select="handleAddressSelect" @clear="handleClear" />

                <div v-if="selectedAddress"
                    class="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">
                        Selected Address
                    </h3>
                    <dl class="space-y-2">
                        <div class="flex justify-between">
                            <dt class="text-sm font-medium text-gray-600">Full Address:</dt>
                            <dd class="text-sm text-gray-900">{{ selectedAddress.fullAddress }}</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-sm font-medium text-gray-600">City:</dt>
                            <dd class="text-sm text-gray-900">{{ selectedAddress.city }}</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-sm font-medium text-gray-600">Postcode:</dt>
                            <dd class="text-sm text-gray-900">{{ selectedAddress.postcode }}</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-sm font-medium text-gray-600">Coordinates:</dt>
                            <dd class="text-sm text-gray-900">
                                {{ selectedAddress.latitude.toFixed(6) }}, {{ selectedAddress.longitude.toFixed(6) }}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import AddressSearchBar from '../components/AddressSearchBar.vue'

const selectedAddress = ref(null)

const handleAddressSelect = (address) => {
    console.log('Address selected:', address)
}

const handleClear = () => {
    console.log('Search cleared')
}
</script>
