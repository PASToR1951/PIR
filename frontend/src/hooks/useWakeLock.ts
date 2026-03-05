import { useEffect, useRef } from "react";

/**
 * useWakeLock – prevents the screen from sleeping while a form / wizard is in use.
 *
 * Acquires a WakeLockSentinel on mount.
 * Releases it on unmount.
 * Re-acquires when the tab becomes visible again (the browser auto-releases on blur).
 * No-op on browsers that don't support the API.
 */
export function useWakeLock() {
    const sentinel = useRef<WakeLockSentinel | null>(null);

    useEffect(() => {
        if (!("wakeLock" in navigator)) return;           // unsupported – silently skip

        let released = false;

        const acquire = async () => {
            if (released) return;
            try {
                sentinel.current = await navigator.wakeLock.request("screen");
                sentinel.current.addEventListener("release", () => {
                    sentinel.current = null;
                });
            } catch {
                // e.g. low battery, or user denied permission – no-op
            }
        };

        const onVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                acquire();
            }
        };

        acquire();
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            released = true;
            document.removeEventListener("visibilitychange", onVisibilityChange);
            sentinel.current?.release().catch(() => { });
            sentinel.current = null;
        };
    }, []);
}
