<template>
  <div
    class="flex min-h-full max-w-md min-w-md border border-gray-200 rounded-lg flex-col justify-center px-6 py-12 lg:px-8 bg-sky-900"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white"
      >
        {{ t("profileTitle") }}
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-sky-900">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label
            for="realName"
            class="block text-sm/6 font-medium text-gray-100"
            >{{ t("fullName") }}</label
          >
          <div class="mt-2">
            <input
              v-model="localUserData.realName"
              id="realName"
              type="text"
              name="realName"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            for="username"
            class="block text-sm/6 font-medium text-gray-100"
            >{{ t("username") }}</label
          >
          <div class="mt-2">
            <input
              v-model="localUserData.username"
              id="username"
              type="text"
              name="username"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            for="phoneNumber"
            class="block text-sm/6 font-medium text-gray-100"
            >{{ t("phoneNumber") }}</label
          >
          <div class="mt-2">
            <input
              v-model="localUserData.phoneNumber"
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              autocomplete="tel"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            for="email"
            class="block text-sm/6 font-medium text-gray-100"
            >{{ t("emailAddress") }}</label
          >
          <div class="mt-2">
            <input
              v-model="localUserData.email"
              id="email"
              type="email"
              name="email"
              autocomplete="email"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            for="vehicleModel"
            class="block text-sm/6 font-medium text-gray-100"
            >{{ t("vehicleModel") }}</label
          >
          <div class="mt-2">
            <input
              disabled
              v-model="localUserData.vehicleModel"
              id="vehicleModel"
              type="tel"
              name="vehicleModel"
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {{ t("updateButton") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useIdentityStore } from "../stores/identityStore";
import { showToast } from "../utils/BaseToast";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const identityStore = useIdentityStore();
const { id, realName, username, email, phoneNumber, vehicleModel } =
  storeToRefs(identityStore);
const localUserData = ref({
  id: "",
  realName: "",
  username: "",
  email: "",
  phoneNumber: "",
  vehicleModel: "",
});
onMounted(async () => {
  refreshUserData();
});

const submitForm = async () => {
  try {
    const response = await identityStore.postIdentity(localUserData.value);

    if (response.status != 200) throw new Error(t("update_failed"));

    console.log(response);
    localStorage.setItem("token", response.data.token);
    refreshUserData();
  } catch (err) {
    console.error(err);
    showToast(t("update_error"), "error");
  }
};

async function refreshUserData() {
  await identityStore.getIdentity();
  localUserData.value.id = id.value;
  localUserData.value.realName = realName.value;
  localUserData.value.username = username.value;
  localUserData.value.email = email.value;
  localUserData.value.phoneNumber = phoneNumber.value;
  localUserData.value.vehicleModel = vehicleModel.value;
}
</script>
