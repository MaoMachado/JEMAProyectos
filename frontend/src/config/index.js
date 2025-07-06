// Application configuration

export const config = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  },

  // App Configuration
  app: {
    name: 'JEMA',
    version: '1.0.0',
    description: 'Plataforma de gestión y administración',
    defaultLocale: 'es-ES',
    supportedLocales: ['es-ES', 'en-US']
  },

  // Feature flags
  features: {
    darkMode: true,
    notifications: true,
    analytics: false
  },

  // Pagination defaults
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50]
  },

  // Date formats
  dateFormats: {
    short: 'DD/MM/YYYY',
    long: 'DD/MM/YYYY HH:mm',
    iso: 'YYYY-MM-DD'
  }
}

// Environment-specific configurations
export const isDevelopment = import.meta.env.DEV
export const isProduction = import.meta.env.PROD

// Get environment variable with fallback
export function getEnvVar(key, defaultValue = '') {
  return import.meta.env[key] || defaultValue
}
