<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';

</script>

<template>
    this is the login page
    <div class="login-container">
        <LoginForm />
    </div>
</template>

<style scoped>
.login-container {
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