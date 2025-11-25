<template>
    <div class="max-w-2xl mx-auto my-8 px-4">
        <div v-if="isLoading" class="bg-white rounded-lg p-8 shadow-md text-center">
            <div class="w-12 h-12 mx-auto mb-4 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin">
            </div>
            <p class="text-gray-600">Loading...</p>
        </div>
        <transition v-else name="fade" mode="out-in">
            <div v-if="!isLoggedIn" class="bg-white rounded-lg p-8 shadow-md text-center">
                <h2 class="text-2xl font-semibold mb-4 text-gray-800">Start Offering Rides</h2>
                <p class="mb-6 text-gray-600">Please create an account or log in to start offering rides to other users.
                </p>
                <button @click="goToLogin"
                    class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors">
                    Create Account / Log In
                </button>
            </div>

            <!-- not verified -->
            <div v-else-if="!isVerified" class="bg-white rounded-lg p-8 shadow-md text-center">
                <!-- Maybe this should just redirect but this seems okay for now -->
                <h2 class="text-2xl font-semibold mb-4 text-gray-800">Start Offering Rides</h2>
                <p class="mb-6 text-gray-600">Looking to help others in their commute?</p>
                <p class="mb-6 text-gray-600">To register as a driver with our service, you will need to provide a valid
                    driver's license for the area you will be driving in. Any images you upload will be removed from our
                    servers after verification is complete.
                </p>
                <button @click="goToVerify"
                    class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors">
                    Submit your License
                </button>
            </div>

            <!-- Verified but no vehicle -->
            <div v-else-if="isVerified && !isVehicleSetup" class="bg-white rounded-lg p-8 shadow-md text-center">
                <h2 class="text-2xl font-semibold mb-4 text-gray-800">Complete Vehicle Setup</h2>
                <p class="mb-6 text-gray-600">You are verified, but you need to set up your vehicle details before
                    offering rides.</p>
                <button @click="goToVerify"
                    class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors">
                    Setup Vehicle
                </button>
            </div>

            <!-- Verified and vehicle setup -->
            <div v-else-if="isVerified && isVehicleSetup" class="bg-white rounded-lg p-8 shadow-md">
                <h2 class="text-3xl font-semibold mb-6 text-gray-800 text-center">Offer a Ride</h2>

                <div class="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 class="text-xl font-medium mb-4 text-gray-700">Create New Ride</h3>
                    <div class="space-y-4" :key="refreshKey">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                            <AddressSearchBar placeholder="Enter pickup location" @select="handleStartSelect" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Dropoff Location</label>
                            <AddressSearchBar placeholder="Enter dropoff location" @select="handleEndSelect"
                                :userLocation="startLocationForSearch" />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                                <input v-model="departureTime" type="datetime-local"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Fare ($)</label>
                                <input v-model="fare" type="number" min="0" step="0.50"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>
                        </div>

                        <button @click="createRide" :disabled="!isValidRide || isCreating"
                            class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center">
                            <span v-if="isCreating" class="animate-spin mr-2">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                            </span>
                            {{ isCreating ? 'Creating Ride...' : 'Create Ride' }}
                        </button>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-medium mb-4 text-gray-700">Your Upcoming Rides</h3>
                    <div v-if="myRides.length === 0" class="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
                        No upcoming rides scheduled.
                    </div>
                    <div v-else class="space-y-4">
                        <div v-for="ride in myRides" :key="ride.id"
                            class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="flex items-center text-gray-600 mb-2">
                                        <span class="font-medium text-gray-900">{{ formatDate(ride.startTime) }}</span>
                                        <span class="mx-2">•</span>
                                        <span class="px-2 py-1 text-xs rounded-full" :class="{
                                            'bg-green-100 text-green-800': ride.status === 'SCHEDULED',
                                            'bg-blue-100 text-blue-800': ride.status === 'IN_PROGRESS',
                                            'bg-gray-100 text-gray-800': ride.status === 'COMPLETED',
                                            'bg-red-100 text-red-800': ride.status === 'CANCELLED'
                                        }">
                                            {{ ride.status }}
                                        </span>
                                    </div>
                                    <div class="space-y-2">
                                        <div class="flex items-start">
                                            <div class="mt-1 mr-2 w-2 h-2 rounded-full bg-green-500"></div>
                                            <span class="text-gray-700">{{ ride.startAddress }}</span>
                                        </div>
                                        <div class="flex items-start">
                                            <div class="mt-1 mr-2 w-2 h-2 rounded-full bg-red-500"></div>
                                            <span class="text-gray-700">{{ ride.endAddress }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <!-- TODO: add cancel button or other things here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useIdentityStore } from '../stores/identityStore'
import AddressSearchBar from '../components/AddressSearchBar.vue'
import apiClient from '../utils/apiClient'

const router = useRouter()
const identityStore = useIdentityStore()

const isVerified = ref(false)
const isVehicleSetup = ref(false)
const isLoading = ref(true)
const isCreating = ref(false)

const myRides = ref([])
const startLocation = ref(null)
const endLocation = ref(null)
const departureTime = ref('')
const fare = ref(5.00)

const isLoggedIn = computed(() => !!identityStore.id)
const isValidRide = computed(() => startLocation.value && endLocation.value && departureTime.value && fare.value > 0)
const startLocationForSearch = computed(() => {
    if (startLocation.value) {
        return {
            latitude: startLocation.value.latitude,
            longitude: startLocation.value.longitude
        }
    }
    return null
})

onMounted(async () => {
    await identityStore.getIdentity()
    if (identityStore.isVerified) {
        isVerified.value = true
    }
    if (identityStore.vehicleModel && identityStore.vehicleMake && identityStore.vehicleYear && identityStore.vehicleSeats && identityStore.vehicleColor) {
        isVehicleSetup.value = true
        await fetchMyRides()
    }
    isLoading.value = false
})

const fetchMyRides = async () => {
    try {
        const response = await apiClient.get('/api/rides/driver')
        myRides.value = response.data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    } catch (error) {
        console.error('Failed to fetch rides', error)
    }
}

const handleStartSelect = (address) => {
    startLocation.value = address
}

const handleEndSelect = (address) => {
    endLocation.value = address
}

const formatAddress = (location) => {
    // For POIs: use name + street + city, for addresses: use street + city or description
    if (location.type === 'poi') {
        const parts = [location.name]
        if (location.street) parts.push(location.street)
        if (location.city) parts.push(location.city)
        return parts.join(', ')
    } else {
        // For addresses, street + city or fall back to name
        const parts = []
        if (location.street) parts.push(location.street)
        if (location.city) parts.push(location.city)
        return parts.length > 0 ? parts.join(', ') : location.name
    }
}

const createRide = async () => {
    if (!isValidRide.value) return

    isCreating.value = true
    try {
        const rideData = {
            driverId: identityStore.id,
            startLatitude: startLocation.value.latitude,
            startLongitude: startLocation.value.longitude,
            startAddress: formatAddress(startLocation.value),
            endLatitude: endLocation.value.latitude,
            endLongitude: endLocation.value.longitude,
            endAddress: formatAddress(endLocation.value),
            poiCategory: 'commute',
            fare: parseFloat(fare.value),
            startTime: new Date(departureTime.value).toISOString()
        }

        await apiClient.post('/api/rides', rideData)
        await fetchMyRides()

        startLocation.value = null
        endLocation.value = null
        departureTime.value = ''

        // forcing a refresh of the form
        refreshKey.value++

    } catch (error) {
        console.error('Failed to create ride', error)
        alert('Failed to create ride. Please try again.')
    } finally {
        isCreating.value = false
    }
}

const refreshKey = ref(0)

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    })
}

const goToLogin = () => {
    router.push('/login')
}

const goToVerify = () => {
    router.push('/driver-setup')
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scanning-container {
    position: relative;
    overflow: hidden;
}

.scanning-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.9), transparent);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.4);
    animation: scan 1.2s ease-in-out infinite;
    z-index: 1;
}

@keyframes scan {
    0% {
        top: 0;
        opacity: 0;
        transform: scaleY(0.5);
    }

    10% {
        opacity: 1;
        transform: scaleY(1);
    }

    90% {
        opacity: 1;
        transform: scaleY(1);
    }

    100% {
        top: 100%;
        opacity: 0;
        transform: scaleY(0.5);
    }
}
</style>
