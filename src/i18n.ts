import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import viResources from 'utils/locales/vi'
import enResources from 'utils/locales/en'

const resources = {
  vi: viResources,
  en: enResources,
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
