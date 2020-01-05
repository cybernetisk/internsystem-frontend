const authdataStore = "authdata"
export const authdata = [authdataStore]

export const isLoggedIn = [authdataStore, "data", "loggedIn"]

export const userDetails = [
  [authdataStore, "data", "details"],
  data => {
    return data ? data.toJS() : null
  },
]

export const csrfToken = [authdataStore, "data", "csrfToken"]
