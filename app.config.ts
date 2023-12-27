const apiProtocol = 'https://'
const apiHost = 'api.unitap.dev/'
const appProtocol = 'https://'
const appHost = 'unitap.dev/'

export default defineAppConfig({
  api: {
    base: apiProtocol + apiHost,
    head: apiProtocol + apiHost.slice(0, -1),
  },
  app: {
    base: appProtocol + appHost,
    head: appProtocol + appHost.slice(0, -1),
  },
  ui: {
    primary: 'green',
    gray: 'neutral'
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
      label: 'Administrator',
      icon: 'i-heroicons-building-library-20-solid'
    }
  ],
  bannerTitleCardRef: {
    img: null,
    imgurl: '',
    title:'',
    subtitle:'',
    description:'',
    btn_txt:'',
    btn_lnk:'',
    disabled: '',
  },
  smallAvatarCardRef: {
    img: null,
    imgurl: '',
    title: '',
    subtitle: '',
  },
  simpleTitleCardRef: {
    title:'',
    subtitle:'',
    disabled: '',
  },

})