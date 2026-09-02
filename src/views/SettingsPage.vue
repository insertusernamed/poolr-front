<template>
  <div class="settings-wrapper">
    <div class="settings-page" :class="{ dark: theme.theme === 'dark', 'nav-open': navOpen }">
      <div class="settings-head">
        <h2 class="title">{{ t("settings") }}</h2>
        <button
          class="nav-toggle"
          @click="navOpen = !navOpen"
          :aria-expanded="navOpen ? 'true' : 'false'"
          :aria-label="t('settings')"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!navOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="settings-nav">
        <div class="box" id="profile">
          <label>{{ t("profile") }}</label>
          <router-link to="/settings/profile" class="link-box" @click="navOpen = false">
            {{ t("goToProfile") }}
          </router-link>
        </div>
        <div class="box" id="rideHistory">
          <label>{{ t("rideHistory") }}</label>
          <router-link to="/settings/rideHistory" class="link-box" @click="navOpen = false">
            {{ t("goToRideHistory") }}
          </router-link>
        </div>
        <div class="box" id="theme">
          <label>{{ t("theme") }}</label>
          <select v-model="theme.theme" @change="theme.setTheme(theme.theme)">
            <option value="light">{{ t("light") }}</option>
            <option value="dark">{{ t("dark") }}</option>
          </select>
        </div>

        <div class="box" id="appearance">
          <label>{{ t("appearanceSize") }}</label>
          <select
            v-model="theme.appearanceSize"
            @change="theme.setAppearanceSize(theme.appearanceSize)"
          >
            <option value="small">{{ t("small") }}</option>
            <option value="medium">{{ t("medium") }}</option>
            <option value="large">{{ t("large") }}</option>
          </select>
        </div>

        <div class="box" id="language">
          <label>{{ t("language") }}</label>
          <select v-model="selectedLanguage" @change="changeLanguage">
            <option value="en">English</option>
            <option value="frCA">Français (Canada)</option>
          </select>
        </div>
      </div>
    </div>

    <div class="settings-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useThemeStore } from "../stores/theme";
import { useI18n } from "vue-i18n";
const theme = useThemeStore();

const { t, locale } = useI18n();
const selectedLanguage = ref(locale.value);
const navOpen = ref(false);

const changeLanguage = () => {
  locale.value = selectedLanguage.value;
  localStorage.setItem("appLanguage", selectedLanguage.value);
};
</script>

<style>
.settings-wrapper {
  display: flex;
  align-items: flex-start;
}

.settings-page {
  display: flex;
  flex-direction: column;
  width: 220px;
  flex-shrink: 0;
  background-color: #f9fafc;
  border-right: 1px solid #e5e7eb;
  padding: 1.5rem;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
}

.settings-head {
  display: contents;
}

.settings-nav {
  display: flex;
  flex-direction: column;
}

.settings-content {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 2rem;
  min-width: 0;
}

.settings-content > * {
  width: 100%;
  max-width: 600px;
}

.title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #111827;
}

.nav-toggle {
  display: none;
}

.settings-page.dark {
  background-color: #111827 !important;
  border-right: 1px solid #1f2937 !important;
}

.settings-page.dark .box {
  background-color: #1f2937 !important;
}

.settings-page.dark .link-box {
  color: #f9fafb !important;
}

.box {
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.dark .box label {
  color: #f9fafb;
}

.box:hover {
  background-color: #f0f4ff;
  transform: translateX(3px);
}

.link-box {
  color: #1f2937;
  font-weight: 500;
  text-decoration: none;
}

.link-box:hover {
  text-decoration: underline;
}

.box label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.box select {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #fff;
  font-size: 0.95rem;
  color: #111827;
  cursor: pointer;
}

#theme {
  border-left: 4px solid #3b82f6;
}

#appearance {
  border-left: 4px solid #10b981;
}
#profile {
  border-left: 4px solid #374151;
}
#rideHistory {
  border-left: 4px solid #ffff00;
}
#language {
  border-left: 4px solid #8b5cf6;
}

@media (max-width: 767px) {
  .settings-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .settings-page {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem;
  }

  .settings-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    margin-bottom: 0;
  }

  /* collapsed by default on phones; the toggle opens it */
  .settings-nav {
    display: none;
  }

  .settings-page.nav-open .settings-nav {
    display: flex;
    margin-top: 1rem;
  }

  .nav-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #fff;
    color: #374151;
    cursor: pointer;
  }

  .settings-page.dark .nav-toggle {
    background: #1f2937;
    border-color: #374151;
    color: #f9fafb;
  }

  .settings-content {
    padding: 1rem;
  }
}
</style>
