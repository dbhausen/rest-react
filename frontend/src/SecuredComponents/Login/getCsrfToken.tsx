import env from './Env'

const getCsrfToken = async () => {
   let _csrfToken = sessionStorage.getItem('csrf_token')
   if (_csrfToken === undefined || _csrfToken === null) {
      const response = await fetch(`${env().API_HOST}/csrf/`, {
         credentials: 'include',
      })
      const data = await response.json()
      _csrfToken = data.csrfToken
   }

   if (_csrfToken === null) {
      _csrfToken = 'NO_TOKEN'
   } else {
      sessionStorage.setItem('csrf_token', _csrfToken)
   }

   return _csrfToken
}
export default getCsrfToken
