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
}
