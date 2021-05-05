import { useState } from 'react'

// use 'localStorage' to persist between sessions
const useToken = () => {
   const getToken = () => {
      const tokenString = sessionStorage.getItem('token')
      if (tokenString === null) {
         return undefined
      }
      return JSON.parse(tokenString)
   }
   const [token, setToken] = useState(getToken())

   const saveToken = (userToken: { token: string }) => {
      sessionStorage.setItem('token', JSON.stringify(userToken))
      setToken(userToken)
   }
   return {
      setToken: saveToken,
      token,
   }
}
export default useToken
