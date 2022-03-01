export function checkLogin() {
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo') || '{}')
  return loginInfo
}

export default {
  checkLogin
}
