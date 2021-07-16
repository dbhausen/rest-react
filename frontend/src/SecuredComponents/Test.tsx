import React from 'react'
import Login from './Login/Login'
import useToken from './useToken'

interface IProps {
   user: any
}

const Test = (props: IProps) => {
   // eslint-disable-next-line no-unused-vars
   const { token, setToken } = useToken()
   const { user } = props

   if (!user.hasToken) {
      return <Login setToken={setToken} />
   }

   return <div>got here {user.user}</div>
}
export default Test
