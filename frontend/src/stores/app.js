import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const isLoading = ref(false)
  const sidebarCollapsed = ref(false)
  const currentTheme = ref('light')

  // Getters
  const isDarkMode = computed(() => currentTheme.value === 'dark')

  // Actions
  function setLoading(loading) {
    isLoading.value = loading
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function setTheme(theme) {
    currentTheme.value = theme
    // Aquí podrías aplicar el tema al DOM
    document.documentElement.setAttribute('data-theme', theme)
  }

  return {
    // State
    isLoading,
    sidebarCollapsed,
    currentTheme,

    // Getters
    isDarkMode,

    // Actions
    setLoading,
    toggleSidebar,
    setTheme
  }
})
