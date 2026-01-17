// Toast helper for easy access
export const toast = {
  success: (message: string, duration = 3000) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      ;(window as any).showToast(message, 'success', duration)
    }
  },
  error: (message: string, duration = 3000) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      ;(window as any).showToast(message, 'error', duration)
    }
  },
  info: (message: string, duration = 3000) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      ;(window as any).showToast(message, 'info', duration)
    }
  },
  warning: (message: string, duration = 3000) => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      ;(window as any).showToast(message, 'warning', duration)
    }
  },
}
