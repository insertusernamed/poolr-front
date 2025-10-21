import { toast } from 'vue3-toastify';

export const showToast = (message, type = "info") => {
    const className = `toast-${type}`;
    toast(message, {
        type: type,
        position: "bottom-right",
        transition: fade,
        autoClose: 3000,
        className: className,
    });
}

const fade = {
    enter: "toast-fade-enter",
    exit: "toast-fade-exit",
    appendPosition: false,
    collapse: false
}