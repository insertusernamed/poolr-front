<template>
    <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-electric-blue selection:text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-24 pb-12 sm:pb-20">
            <div class="space-y-6 sm:space-y-8">
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-slate-900">
                    {{ t("privacy.title") }}
                </h1>
                <p class="text-sm text-slate-400">{{ t("privacy.lastUpdated") }}: December 2025</p>

                <div class="prose prose-slate max-w-none space-y-8">
                    <!-- Introduction -->
                    <section class="space-y-4">
                        <p class="text-base sm:text-lg text-slate-500 leading-relaxed">
                            {{ t("privacy.intro") }}
                        </p>
                    </section>

                    <!-- Information We Collect -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("privacy.infoCollectTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("privacy.infoCollectDesc") }}</p>
                        <ul class="list-disc list-inside space-y-2 text-slate-600">
                            <li>{{ t("privacy.infoCollectItem1") }}</li>
                            <li>{{ t("privacy.infoCollectItem2") }}</li>
                            <li>{{ t("privacy.infoCollectItem3") }}</li>
                            <li>{{ t("privacy.infoCollectItem4") }}</li>
                        </ul>
                    </section>

                    <!-- How We Use Information -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("privacy.howWeUseTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("privacy.howWeUseDesc") }}</p>
                        <ul class="list-disc list-inside space-y-2 text-slate-600">
                            <li>{{ t("privacy.howWeUseItem1") }}</li>
                            <li>{{ t("privacy.howWeUseItem2") }}</li>
                            <li>{{ t("privacy.howWeUseItem3") }}</li>
                            <li>{{ t("privacy.howWeUseItem4") }}</li>
                        </ul>
                    </section>

                    <!-- Data Sharing -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("privacy.dataSharingTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("privacy.dataSharingDesc") }}</p>
                    </section>

                    <!-- Your Rights -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("privacy.yourRightsTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("privacy.yourRightsDesc") }}</p>
                        <ul class="list-disc list-inside space-y-2 text-slate-600">
                            <li>{{ t("privacy.yourRightsItem1") }}</li>
                            <li>{{ t("privacy.yourRightsItem2") }}</li>
                            <li>{{ t("privacy.yourRightsItem3") }}</li>
                        </ul>
                    </section>

                    <!-- Security -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("privacy.securityTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("privacy.securityDesc") }}</p>
                    </section>

                    <!-- Back to Home -->
                    <div class="pt-6 sm:pt-8 border-t border-slate-100 mt-6 sm:mt-8">
                        <button @click="$router.push('/')"
                            class="bg-slate-900 text-white hover:bg-slate-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base">
                            {{ t("privacy.backToHome") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
