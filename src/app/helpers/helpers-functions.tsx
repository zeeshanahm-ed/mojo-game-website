export async function copyToClipboard(text: string): Promise<boolean> {
    if (!navigator?.clipboard) {
        console.warn('Clipboard API not supported');
        return false;
    }

    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};

export function scrollToTop(behavior: ScrollBehavior = 'smooth') {
    if (typeof window !== 'undefined') {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior,
        });
    }
};

export function getLanguage() {
    if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem("i18nextLng") || "en";
    }
    return "en";
};
