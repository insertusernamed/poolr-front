<template>
    <div class="ride-search-results">
        <div v-if="futureRides.length === 0"
            class="rounded-xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-500">
            {{ t("rides.noRidesFound") }}
        </div>
        <div v-else class="space-y-3">
            <article v-for="ride in futureRides" :key="ride.rideId" class="ride-card" :class="{ 'ride-card--selected': selectedRideId === ride.rideId }"
                @click="$emit('select', ride)">
                <div class="flex items-center gap-3">
                    <div class="ride-avatar" aria-hidden="true">
                        {{ initials(ride.driverName) }}
                    </div>

                    <div class="min-w-0 flex-1">
                        <div class="flex items-baseline justify-between gap-3">
                            <h3 class="truncate text-[15px] font-semibold text-slate-900">
                                {{ ride.driverName }}
                            </h3>
                            <p class="shrink-0 text-[15px] font-semibold tabular-nums text-slate-900">
                                {{ ride.pricing ? formatCurrency(ride.pricing.grossAmount) : "-" }}
                            </p>
                        </div>

                        <p class="mt-0.5 truncate text-[13px] text-slate-500">
                            {{ ride.vehicle }}<template v-if="ride.vehicleColor"> · {{ ride.vehicleColor }}</template>
                        </p>
                    </div>
                </div>

                <div class="mt-3 grid gap-1.5 text-[13px] leading-snug">
                    <!-- show the approximate pickup area, not the driver's exact door -->
                    <p class="flex min-w-0 items-center gap-2" :title="ride.startAddress">
                        <span class="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true"></span>
                        <span class="truncate text-slate-700">{{ approxStart(ride.startAddress) }}</span>
                    </p>
                    <p class="flex min-w-0 items-center gap-2">
                        <span class="ml-[3px] h-2 w-2 shrink-0 rounded-sm bg-slate-400" aria-hidden="true"></span>
                        <span class="truncate text-slate-700">{{ destinationLabel }}</span>
                    </p>
                </div>

                <div class="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-2.5">
                    <p class="min-w-0 truncate text-xs text-slate-500">
                        <span class="font-medium text-slate-700">{{ getDepartureInfo(ride.startTime) }}</span>
                        <template v-if="tripDistance(ride)"> · {{ tripDistance(ride) }} km {{ t("rides.trip") }}</template>
                        <template v-if="ride.detourDistance != null"> · +{{ ride.detourDistance.toFixed(1) }} km
                            {{ t("rides.detourForDriver") }}</template>
                    </p>
                    <button type="button" class="shrink-0 text-[13px] font-medium text-blue-600 hover:text-blue-700"
                        @click.stop="$emit('select', ride)">
                        {{ t("rides.viewRide") }}
                    </button>
                </div>
            </article>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { formatCurrency } from "../utils/pricing";
import { getDepartureInfo } from "../utils/dateUtils";
import { useI18n } from "vue-i18n";
import { useAddressStore } from "../stores/addressStore";

const { t } = useI18n();
const addressStore = useAddressStore();
const props = defineProps({
    rides: {
        type: Array,
        required: true,
    },
    selectedRideId: {
        type: Number,
        default: null,
    },
});

const futureRides = computed(() => {
    const now = new Date();
    return props.rides.filter((ride) => {
        const isFuture = new Date(ride.startTime) > now;
        // a missing detour means it could not be calculated, not "no detour".
        const hasValidDetour = ride.detourDistance == null || ride.detourDistance > 0;
        return isFuture && hasValidDetour;
    });
});

// Passenger's own trip if known, otherwise the ride's full route length.
const tripDistance = (ride) => {
    const km = ride.passengerTripDistanceKm ?? ride.rideDistanceKm;
    return km == null ? null : km.toFixed(1);
};

// "59 Colborne St, Orillia" -> "Colborne St, Orillia". Drops a venue name and
// house number so cards show an area, not a front door.
const approxStart = (address) => {
    if (!address) return "-";
    const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 2) parts.shift();
    const street = parts[0]?.replace(/^\d+[A-Za-z]?\s+/, "") || "";
    return [street, parts[1]].filter(Boolean).join(", ");
};

const destinationLabel = computed(() => {
    const dest = addressStore.destination;
    if (dest) {
        const label = [dest.name || dest.street, dest.city].filter(Boolean).join(", ");
        if (label) return label;
    }
    return "-";
});

const initials = (name) =>
    (name || "?")
        .split(/\s+/)
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();

defineEmits(["select"]);
</script>

<style scoped>
.ride-search-results {
    width: 100%;
}

.ride-card {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    background: #fff;
    padding: 14px 16px;
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.ride-card:hover {
    border-color: #94a3b8;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}

.ride-card--selected {
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb inset;
}

.ride-avatar {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    background: #f1f5f9;
    color: #334155;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
