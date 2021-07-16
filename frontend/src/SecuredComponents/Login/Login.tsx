/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react'
import UserContext from '../../Components/Context/UserContext'
import env from './Env'
import getCsrfToken from './getCsrfToken'
import './Login.css'

interface ICredentials {
   email: string
   password: string
}

type ThttpMethod = 'POST' | 'GET' | 'OPTIONS'

const loginUser = async (method: ThttpMethod, userpass: ICredentials) => {
   const response = await fetch(`${env().API_HOST}/api/v1/users/auth/login/`, {
      method,
      headers: method === 'POST' ? { 'Content-Type': 'application/json', 'X-CSRFToken': await getCsrfToken() } : {},
      credentials: 'include',
      body: JSON.stringify(userpass),
   })
   const data = await response.json()
   // needed to do some validation here to see if login was success
   // handle errors
   return data.key
}

const Login = ({ setToken }: any) => {
   const [email, setEmail] = useState('d@dd.com')
   const [password, setPassword] = useState('postman!!01')
   const user = useContext(UserContext)

   const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      const token = await loginUser('POST', { email, password })
      user.hasToken = true
      user.user = email

      // eslint-disable-next-line no-shadow

      setToken(token)
   }

   return (
      <div className="login-wrapper">
         <h1>Please Log In</h1>

         <h3>Feel free to use the default Username/Password to hack the system</h3>
         <form onSubmit={handleSubmit}>
            <label>
               <p>Username</p>
               <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
               <p>Password</p>
               <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <div>
               <button type="submit">Submit</button>
            </div>
         </form>
         <div>
            <small>
               You are running this application in <b>{process.env.NODE_ENV}</b> mode.
            </small>
            <form>
               <input type="hidden" defaultValue={process.env.REACT_APP_NOT_SECRET_CODE} />
            </form>
         </div>
      </div>
   )
}
export default Login
