<template>
    <div class="min-h-screen bg-white text-slate-900 font-sans selection:bg-electric-blue selection:text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-24 pb-12 sm:pb-20">
            <div class="space-y-6 sm:space-y-8">
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-slate-900">
                    {{ t("terms.title") }}
                </h1>
                <p class="text-sm text-slate-400">{{ t("terms.lastUpdated") }}: December 2025</p>

                <div class="prose prose-slate max-w-none space-y-8">
                    <!-- Introduction -->
                    <section class="space-y-4">
                        <p class="text-base sm:text-lg text-slate-500 leading-relaxed">
                            {{ t("terms.intro") }}
                        </p>
                    </section>

                    <!-- Acceptance of Terms -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("terms.acceptanceTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("terms.acceptanceDesc") }}</p>
                    </section>

                    <!-- Use of Service -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("terms.useOfServiceTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("terms.useOfServiceDesc") }}</p>
                        <ul class="list-disc list-inside space-y-2 text-slate-600">
                            <li>{{ t("terms.useOfServiceItem1") }}</li>
                            <li>{{ t("terms.useOfServiceItem2") }}</li>
                            <li>{{ t("terms.useOfServiceItem3") }}</li>
                            <li>{{ t("terms.useOfServiceItem4") }}</li>
                        </ul>
                    </section>

                    <!-- User Responsibilities -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("terms.userResponsibilitiesTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("terms.userResponsibilitiesDesc") }}</p>
                        <ul class="list-disc list-inside space-y-2 text-slate-600">
                            <li>{{ t("terms.userResponsibilitiesItem1") }}</li>
                            <li>{{ t("terms.userResponsibilitiesItem2") }}</li>
                            <li>{{ t("terms.userResponsibilitiesItem3") }}</li>
                        </ul>
                    </section>

                    <!-- Driver Requirements -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("terms.driverRequirementsTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("terms.driverRequirementsDesc") }}</p>
                        <ul class="list-disc list-inside space-y-2 text-slate-600">
                            <li>{{ t("terms.driverRequirementsItem1") }}</li>
                            <li>{{ t("terms.driverRequirementsItem2") }}</li>
                            <li>{{ t("terms.driverRequirementsItem3") }}</li>
                        </ul>
                    </section>

                    <!-- Payment Terms -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("terms.paymentTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("terms.paymentDesc") }}</p>
                    </section>

                    <!-- Limitation of Liability -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("terms.liabilityTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("terms.liabilityDesc") }}</p>
                    </section>

                    <!-- Changes to Terms -->
                    <section class="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h2 class="text-2xl font-bold text-slate-900">{{ t("terms.changesTitle") }}</h2>
                        <p class="text-slate-600 leading-relaxed">{{ t("terms.changesDesc") }}</p>
                    </section>

                    <!-- Back to Home -->
                    <div class="pt-6 sm:pt-8 border-t border-slate-100 mt-6 sm:mt-8">
                        <button @click="$router.push('/')"
                            class="bg-slate-900 text-white hover:bg-slate-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base">
                            {{ t("terms.backToHome") }}
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
