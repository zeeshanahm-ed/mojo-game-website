// utils/device.ts
import FingerprintJS from "@fingerprintjs/fingerprintjs";
export async function getDeviceId(): Promise<string | undefined> {
    try {
        const deviceId = localStorage.getItem("device-id");
        if (!deviceId) {
            // Initialize the FingerprintJS agent
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            localStorage.setItem("device-id", result.visitorId);
            return result.visitorId;
        } else {
            return deviceId;
        }
    } catch (error) {
        console.error("Error generating device ID:", error);
        // Fallback in case FingerprintJS fails
        const fallback = await getDeviceId();
        if (!fallback) {
            const randomId = Math.random().toString(36).substring(2, 15);
            localStorage.setItem("device-id", randomId);
            return randomId;
        }
        return fallback;
    }
}