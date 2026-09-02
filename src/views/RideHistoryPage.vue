<template>
    <div class="max-w-2xl mx-auto my-6 px-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ t('rideHistory') }}</h2>

        <div v-if="loading" class="bg-white rounded-xl p-8 shadow text-center text-gray-500">
            {{ t('loading') }}
        </div>

        <div v-else-if="bookings.length === 0" class="bg-white rounded-xl p-8 shadow text-center text-gray-500">
            <p>{{ t('rideHistoryEmpty') }}</p>
            <router-link to="/find-ride"
                class="inline-block mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                {{ t('findRide') }}
            </router-link>
        </div>

        <div v-else class="space-y-3">
            <div v-for="booking in bookings" :key="booking.ticketId"
                class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start gap-3">
                    <div class="min-w-0">
                        <p class="text-xs uppercase tracking-wide text-gray-400">{{ t('tickets.departure') }}</p>
                        <p class="font-semibold text-gray-900">{{ formatDeparture(booking.startTime) }}</p>
                        <p class="text-sm text-gray-700 mt-2 truncate">
                            <span class="text-green-600">●</span> {{ booking.startAddress }}
                        </p>
                        <p class="text-sm text-gray-700 truncate">
                            <span class="text-red-600">●</span> {{ booking.endAddress }}
                        </p>
                    </div>
                    <div class="text-right flex-shrink-0">
                        <p class="text-xs uppercase tracking-wide text-gray-400">{{ t('tickets.driver') }}</p>
                        <p class="text-sm font-medium text-gray-900">{{ booking.driverName }}</p>
                        <p class="text-xs text-gray-500">{{ booking.vehicleColor }} {{ booking.vehicle }}</p>
                        <p class="text-xs text-gray-400 mt-2 font-mono">{{ booking.confirmationCode }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '../utils/apiClient'
import { useI18n } from 'vue-i18n'
import { showToast } from '../utils/BaseToast'

const { t } = useI18n()
const bookings = ref([])
const loading = ref(true)

const formatDeparture = (startTime) => {
    if (!startTime) return t('tickets.unknown')
    const d = new Date(startTime)
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
        ' • ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

onMounted(async () => {
    try {
        // bookings = purchased tickets; this is the user's actual ride history
        const res = await apiClient.get('/api/tickets/my')
        bookings.value = [...(res.data || [])].sort(
            (a, b) => new Date(b.startTime) - new Date(a.startTime)
        )
    } catch (err) {
        console.error('Failed to load ride history', err)
        showToast(t('rideHistoryError'), 'error')
    } finally {
        loading.value = false
    }
})
</script>
