<template>
    <div class="pricing-section">
        <h2>{{ t("pricing.fareBreakdown") }}</h2>
        <ul>
            <li v-if="pricing.baseFareAmount !== undefined">
                <span>{{ t("pricing.baseFare") }} <small>({{ t("pricing.fixedStartingRate") }})</small></span>
                <span>{{ formatCurrency(pricing.baseFareAmount) }}</span>
            </li>
            <li v-if="pricing.distanceCostAmount !== undefined">
                <span>{{ t("pricing.distanceCost") }} <small>({{ distanceKm }} km × $0.25/km)</small></span>
                <span>{{ formatCurrency(pricing.distanceCostAmount) }}</span>
            </li>
            <li v-if="pricing.detourCostAmount !== undefined && pricing.detourCostAmount > 0">
                <span>{{ t("pricing.detourCost") }} <small>({{ detourKm }} km × $0.75/km)</small></span>
                <span>{{ formatCurrency(pricing.detourCostAmount) }}</span>
            </li>
            <li class="subtotal-row">
                <span>{{ t("pricing.subtotal") }}</span>
                <span>{{ formatCurrency(pricing.subtotalAmount) }}</span>
            </li>
            <li>
                <span>{{ t("pricing.tax") }} <small>(13% {{ t("pricing.ofSubtotal") }})</small></span>
                <span>{{ formatCurrency(pricing.taxAmount) }}</span>
            </li>
            <li class="info-only">
                <span>{{ t("pricing.platformFee") }} <small>(18%, {{ t("pricing.paidByDriver") }})</small></span>
                <span class="not-charged">—</span>
            </li>
            <li class="info-only">
                <span>{{ t("pricing.paymentProcessing") }} <small>($0.35, {{ t("pricing.paidByDriver") }})</small></span>
                <span class="not-charged">—</span>
            </li>
            <li v-if="pricing.tipAmount > 0">
                <span>{{ t("pricing.tip") }} <small>({{ t("pricing.goesToDriver") }})</small></span>
                <span>{{ formatCurrency(pricing.tipAmount) }}</span>
            </li>
        </ul>
        <div class="pricing-total">
            <span>{{ t("pricing.totalDue") }}</span>
            <span>{{ formatCurrency(pricing.grossAmount) }}</span>
        </div>
        <div class="driver-earnings">
            {{ t("pricing.driverEarns") }} <strong>{{ formatCurrency(pricing.driverEarningsAmount) }}</strong> {{ t("pricing.fromThisRide") }}
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { formatCurrency } from '../utils/pricing'
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
    pricing: {
        type: Object,
        required: true
    }
})

const distanceKm = computed(() => {
    if (props.pricing.distanceCostAmount === 0) return '0.00'
    return (props.pricing.distanceCostAmount / 0.25).toFixed(2)
})

const detourKm = computed(() => {
    if (!props.pricing.detourCostAmount || props.pricing.detourCostAmount === 0) return '0.00'
    return (props.pricing.detourCostAmount / 0.75).toFixed(2)
})
</script>

<style scoped>
.pricing-section {
  margin-top: 24px;
}

.pricing-section h2 {
  font-size: 18px;
  margin-bottom: 12px;
}

.pricing-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.pricing-section li {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 14px;
  color: #111827;
  background: #ffffff;
}

.pricing-section li:nth-child(even) {
  background: #f9fafb;
}

.pricing-section li small {
    color: #6b7280;
    font-weight: 400;
    margin-left: 4px;
}

.pricing-section li.info-only {
    color: #9ca3af;
}

.pricing-section li .not-charged {
    color: #9ca3af;
}

.pricing-total {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.subtotal-row {
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.driver-earnings {
    margin-top: 12px;
    padding: 10px 14px;
    background: #f0f9ff;
    border-radius: 8px;
    font-size: 13px;
    color: #0369a1;
}

.driver-earnings strong {
    font-weight: 600;
}
</style>
