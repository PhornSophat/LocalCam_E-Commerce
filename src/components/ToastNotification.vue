<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration: number
}

const toasts = ref<Toast[]>([])
let nextId = 1

const showToast = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
  const id = nextId++
  toasts.value.push({ id, message, type, duration })

  setTimeout(() => {
    removeToast(id)
  }, duration)
}

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

// Expose to global
if (typeof window !== 'undefined') {
  ;(window as any).showToast = showToast
}

defineExpose({ showToast })
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-20 right-4 z-[9999] flex flex-col gap-3 max-w-sm">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="{
            'bg-green-500': toast.type === 'success',
            'bg-red-500': toast.type === 'error',
            'bg-blue-500': toast.type === 'info',
            'bg-yellow-500': toast.type === 'warning',
          }"
          class="flex items-center gap-3 px-6 py-4 text-white rounded-lg shadow-2xl"
        >
          <span v-if="toast.type === 'success'" class="text-2xl">✓</span>
          <span v-else-if="toast.type === 'error'" class="text-2xl">✕</span>
          <span v-else-if="toast.type === 'warning'" class="text-2xl">⚠</span>
          <span v-else class="text-2xl">ℹ</span>

          <span class="flex-1 font-medium">{{ toast.message }}</span>

          <button
            @click="removeToast(toast.id)"
            class="p-1 transition-colors rounded hover:bg-white/20"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.8);
}
</style>
