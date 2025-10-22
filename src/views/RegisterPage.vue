<script setup lang="ts">
import RegistrationForm from '../components/RegistrationForm.vue';

</script>

<template>
    <div class="register-container">
        <RegistrationForm />
    </div>
</template>

<style scoped>
.register-container {
    padding: 0;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>