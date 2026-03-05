import { useEffect, useRef, useCallback } from "react";

/**
 * useAutoSave – debounce-saves form state to localStorage every `delay` ms.
 * On mount, returns any previously saved state so the form can restore it.
 *
 * @param key   unique localStorage key (e.g. "aip_draft_school_5")
 * @param state current form state object
 * @param delay debounce interval in ms (default 2000)
 */
export function useAutoSave<T>(key: string, state: T, delay = 2000) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            try {
                localStorage.setItem(key, JSON.stringify(state));
            } catch { /* quota exceeded – ignore */ }
        }, delay);
        return () => { if (timer.current) clearTimeout(timer.current); };
    }, [key, state, delay]);

    // Save immediately (for use before navigation away)
    const saveNow = useCallback(() => {
        try { localStorage.setItem(key, JSON.stringify(state)); } catch { }
    }, [key, state]);

    return { saveNow };
}

/** Load a previously saved draft from localStorage, or return null */
export function loadDraft<T>(key: string): T | null {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) as T : null;
    } catch { return null; }
}

/** Clear a saved draft */
export function clearDraft(key: string) {
    try { localStorage.removeItem(key); } catch { }
}
