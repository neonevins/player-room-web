import { registerTemporary, getTokenApi } from "../http/api"


export function reactiveScreen() {
  return window.innerWidth < 640;
}

export function register() {
  return new Promise(res => {
    registerTemporary()
    .then( ({data}) => {
      localStorage.setItem('sign', data.sign)
      res(data.sign)
    })
    .catch(err => {

    })
  })

}

export async function getToken(isNew) {
  if (!localStorage.getItem('token') || isNew) {
    let sign = localStorage.getItem('sign')
    if (!sign) {
      sign = await register()
    }
    const {data:{ token }} = await getTokenApi(sign)
    localStorage.setItem('token', token);
  }

  return Promise.resolve(localStorage.getItem('token'))
}

export default {}
