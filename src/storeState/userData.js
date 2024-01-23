import { defineStore } from 'pinia'

export const userDataStore = defineStore('userData', {
  state: () => ({
    token: null,
    userData: null,
    artistId: null,
    allUserData: null,
    selecTedUser: null,
    selectedMusic: null
  }),
  actions: {},
  persist: {
    enabled: true
  }
})
