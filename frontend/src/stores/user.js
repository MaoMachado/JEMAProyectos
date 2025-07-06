import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)
  const permissions = ref([])

  // Getters
  const hasPermission = computed(() => {
    return (permission) => permissions.value.includes(permission)
  })

  const isAdmin = computed(() => {
    return user.value?.role === 'admin'
  })

  // Actions
  function login(userData) {
    user.value = userData
    isAuthenticated.value = true
    permissions.value = userData.permissions || []
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    permissions.value = []
  }

  function updateUser(userData) {
    user.value = { ...user.value, ...userData }
  }

  return {
    // State
    user,
    isAuthenticated,
    permissions,

    // Getters
    hasPermission,
    isAdmin,

    // Actions
    login,
    logout,
    updateUser
  }
})
