<template>
    <div class="ride-summary">
        <h3 class="summary-title">{{ t("rideSummary.title") }}</h3>
        <div class="summary-row">
            <span class="label">{{ t("rideSummary.driver") }}</span>
            <span class="value">{{ ride.driverName }}</span>
        </div>
        <div class="summary-row">
            <span class="label">{{ t("rideSummary.vehicle") }}</span>
            <span class="value">{{ ride.vehicle }} ({{ ride.vehicleColor }})</span>
        </div>
        <div class="summary-row">
            <span class="label">{{ t("rideSummary.pickup") }}</span>
            <span class="value">{{ ride.startAddress }}</span>
        </div>
        <div class="summary-row">
            <span class="label">{{ t("rideSummary.destination") }}</span>
            <span class="value">{{ ride.endAddress }}</span>
        </div>
        <div v-if="routeData" class="summary-row">
            <span class="label">{{ t("rideSummary.routeDistance") }}</span>
            <span class="value">{{ routeData.distanceKm.toFixed(2) }} km</span>
        </div>
        <div v-if="routeData" class="summary-row">
            <span class="label">{{ t("rideSummary.estimatedDuration") }}</span>
            <span class="value">{{ routeData.durationMinutes.toFixed(1) }} min</span>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
    ride: {
        type: Object,
        required: true,
    },
    routeData: {
        type: Object,
        default: null,
    },
});
</script>

<style scoped>
.ride-summary {
    margin-top: 20px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
    background: #f9fafb;
}

.summary-title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 700;
    color: #111827;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #1f2937;
}

.summary-row:last-child {
    margin-bottom: 0;
}

.summary-row .label {
    font-weight: 600;
}

@media (max-width: 640px) {
    .summary-row {
        /* stack label above value so long addresses don't wrap one word per line */
        flex-direction: column;
        gap: 2px;
    }

    .summary-row .value {
        text-align: left;
        word-break: break-word;
    }
}
</style>
