import React from 'react'

export interface IUserContext {
   hasToken: boolean
   user: string | null
   token: string | null
}

export const defaultUser: IUserContext = {
   hasToken: sessionStorage.getItem('token') !== null,
   user: sessionStorage.getItem('email'),
   token: sessionStorage.getItem('token'),
}

const UserContext = React.createContext<IUserContext>(defaultUser)

export default UserContext
