export default defineAppConfig({
  api: {
    protocol: 'https://',
    host: 'api.unitap.dev/'
  },
  app: {
    protocol: 'https://',
    host: 'unitap.dev/'
  },
  user_roles: [
    {
      id: 'student',
      label: 'Student',
      icon: 'i-heroicons-academic-cap-20-solid'
    },
    {
      id: 'store',
      label: 'Store',
      icon: 'i-heroicons-building-storefront-20-solid'
    },
    {
      id: 'security-guard',
      label: 'Security Guard',
      icon: 'i-heroicons-shield-exclamation-20-solid'
    },
    {
      id: 'guidance-staff',
      label: 'Guidance Staff',
      icon: 'i-heroicons-lifebuoy-20-solid'
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: 'i-heroicons-building-library-20-solid'
    }
  ],
  ui: {
    primary: 'green',
    gray: 'neutral',
    notifications: {
      position: 'top-10 left-0 bottom-auto'
    }
  },
})