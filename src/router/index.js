import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";

// lazy-load every other page so the initial bundle stays small;
// vite splits each into its own chunk fetched on first visit
const OfferRidePage = () => import("../views/OfferRidePage.vue");
const DriverSetupPage = () => import("../views/DriverSetupPage.vue");
const FindRidePage = () => import("../views/FindRidePage.vue");
const AboutPage = () => import("../views/AboutPage.vue");
const AuthPage = () => import("../views/AuthPage.vue");
const MapPage = () => import("../views/MapPage.vue");
const ErrorPage = () => import("../views/ErrorPage.vue");
const MyProfilePage = () => import("../views/MyProfilePage.vue");
const RideDetailsPage = () => import("../views/RideDetailsPage.vue");
const TransactionPage = () => import("../views/TransactionPage.vue");
const SettingsPage = () => import("../views/SettingsPage.vue");
const RideHistoryPage = () => import("../views/RideHistoryPage.vue");
const TicketsPage = () => import("../views/TicketsPage.vue");
const PrivacyPage = () => import("../views/PrivacyPage.vue");
const TermsPage = () => import("../views/TermsPage.vue");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
            meta: { title: "Home" },
        },
        {
            path: "/about",
            name: "about",
            component: AboutPage,
            meta: { title: "About" },
        },
        {
            path: "/offer-ride",
            name: "offerRide",
            component: OfferRidePage,
            meta: { title: "Offer Ride" },
        },
        {
            path: "/find-ride",
            name: "findRide",
            component: FindRidePage,
            meta: { title: "Find Ride" },
        },
        {
            path: "/tickets",
            name: "tickets",
            component: TicketsPage,
            meta: { title: "Tickets", requiresAuth: true },
        },
        {
            path: "/ride-results",
            name: "RideResults",
            component: RideDetailsPage,
            meta: { title: "Ride Results" },
        },
        {
            path: "/transaction",
            name: "transaction",
            component: TransactionPage,
            meta: { title: "Confirm Ride" },
        },
        {
            path: "/login",
            name: "login",
            component: AuthPage,
            meta: { title: "Login", requiresGuest: true },
        },
        {
            path: "/register",
            name: "register",
            component: AuthPage,
            meta: { title: "Register", requiresGuest: true },
        },
        {
            path: "/map",
            name: "map",
            component: MapPage,
            meta: { title: "Map" },
        },
        {
            path: "/me",
            name: "MyProfile",
            component: MyProfilePage,
            meta: { title: "My Profile", requiresAuth: true },
        },
        {
            path: "/rideHistory",
            name: "rideHistory",
            component: RideHistoryPage,
            meta: { title: "Ride History", requiresAuth: true },
        },
        {
            path: "/settings",
            name: "settings",
            component: SettingsPage,
            redirect: { name: "settingsProfile" },
            meta: { title: "Settings", requiresAuth: false },
            children: [
                {
                    path: "profile",
                    name: "settingsProfile",
                    component: MyProfilePage,
                    meta: { title: "My Profile", requiresAuth: true },
                },
                {
                    path: "/driver-setup",
                    name: "DriverSetup",
                    component: DriverSetupPage,
                    meta: { title: "Driver Setup", requiresAuth: true },
                },
                {
                    path: "rideHistory",
                    name: "settingsRideHistory",
                    component: RideHistoryPage,
                    meta: { title: "Ride History", requiresAuth: true },
                },
            ],
        },
        {
            path: "/privacy",
            name: "privacy",
            component: PrivacyPage,
            meta: { title: "Privacy Policy" },
        },
        {
            path: "/terms",
            name: "terms",
            component: TermsPage,
            meta: { title: "Terms of Service" },
        },
        {
            path: "/:pathMatch(.*)*",
            name: "error",
            component: ErrorPage,
            meta: { title: "404" },
        },
    ],
});

function isTokenExpired(token) {
    if (!token) return true;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Checking if token has an expiration claim and if it's expired
        if (payload.exp) {
            return Date.now() >= payload.exp * 1000;
        }
        return false; // No exp claim so we consider it valid
    } catch {
        return true; // Invalid token format
    }
}

router.beforeEach((to, _from, next) => {
    document.title = `Poolr - ${to.meta.title}`;
    const token = localStorage.getItem('token');
    const isValidToken = token && !isTokenExpired(token);

    // Clearing expired tokens
    if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
    }

    // Redirect unauthenticated users away from protected pages
    if (to.meta.requiresAuth && !isValidToken) {
        return next({ name: 'login' });
    }

    // Redirect logged-in users away from guest-only pages (login/register)
    if (to.meta.requiresGuest && isValidToken) {
        return next({ name: 'home' });
    }

    next();
});

export default router;
