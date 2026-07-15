import type { Status } from "../constants/variants";

export type Toast = {
    id: number;
    message: string;
    title?: string;
    status: Status;
};

type ToastOptions = {
    title?: string;
    status?: Status;
    duration?: number;
};

const DEFAULT_DURATION = 5000;

let nextId = 1;

export const toasts: Toast[] = $state([]);

export const dismissToast = (id: number) => {
    const index = toasts.findIndex((item) => item.id === id);

    if (index !== -1) {
        toasts.splice(index, 1);
    }
};

export const showToast = (message: string, options?: ToastOptions): number => {
    const id = nextId++;
    const duration = options?.duration ?? DEFAULT_DURATION;

    toasts.push({
        id,
        message,
        title: options?.title,
        status: options?.status ?? "info",
    });

    if (duration > 0) {
        setTimeout(() => dismissToast(id), duration);
    }

    return id;
};
