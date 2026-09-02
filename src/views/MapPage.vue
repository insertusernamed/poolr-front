<template>
  <p class="map-page-message">{{ t("mapPageMessage") }}</p>

  <div class="route-container">
    <RouteMap />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import RouteMap from "../components/RouteMap.vue";

const { t } = useI18n();
</script>

<style scoped>
.route-container {
  padding: 0;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
}

.map-page-message {
  margin: 8px 12px 0;
  font-size: 14px;
  color: #6b7280;
}
</style>
