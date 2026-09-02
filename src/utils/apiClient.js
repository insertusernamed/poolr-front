import axios from "axios";

const apiClient = axios.create({
    // default to relative URLs so the vite dev proxy (and same-origin deploys) work
    // even when VITE_API_BASE_URL is not set
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// handle expired sessions globally
let isHandlingUnauthorized = false;
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url || "";

        if (status === 401 && !isHandlingUnauthorized) {
            isHandlingUnauthorized = true;
            localStorage.removeItem("token");

            // avoid redirect loops when we're already on an auth page
            if (!window.location.pathname.startsWith("/login") && !window.location.pathname.startsWith("/register")) {
                // dynamic import avoids a circular dependency with the router
                import("../router").then(({ default: router }) => {
                    router.push("/login");
                    setTimeout(() => { isHandlingUnauthorized = false; }, 1000);
                }).catch(() => { isHandlingUnauthorized = false; });
            } else {
                setTimeout(() => { isHandlingUnauthorized = false; }, 1000);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
