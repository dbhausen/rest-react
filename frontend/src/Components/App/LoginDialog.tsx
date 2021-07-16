import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import axios from 'axios'
import React, { useContext, useState } from 'react'

import env from '../../SecuredComponents/Login/Env'
import UserContext from '../Context/UserContext'

export interface LoginDialogProps {
   open: boolean

   // eslint-disable-next-line no-unused-vars
   onClose: (value: string) => void
}

export default function LoginDialog(props: LoginDialogProps) {
   const { onClose, open } = props
   const [email, setEmail] = useState('d@dd.com')
   const [password, setPassword] = useState('postman!!01')
   const user = useContext(UserContext)

   const handleCancel = () => {
      onClose('selectedValue')
   }

   const handleLogout = () => {
      user.token = null
      user.hasToken = false
      user.user = null
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('email')
      onClose('selectedValue')
   }

   const handleLogin = async () => {
      axios
         .post(`${env().API_HOST}/api/v1/users/auth/login/`, { email, password })
         .then((response) => {
            const token = response.data.key
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('email', email)
            user.token = token
            user.hasToken = true
            user.user = email
            onClose(email)
         })
         .catch(() => {
            onClose(email)
         })
   }

   if (!user.hasToken) {
      return (
         <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  To subscribe to this website, please enter your email address here. We will send updates occasionally.
               </DialogContentText>
               <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  type="email"
                  fullWidth
               />
               <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  fullWidth
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCancel} color="primary">
                  Cancel
               </Button>
               <Button onClick={handleLogin} color="primary">
                  Login
               </Button>
            </DialogActions>
         </Dialog>
      )
   }
   return (
      <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
         <DialogTitle id="form-dialog-title">Logout</DialogTitle>
         <DialogContent>
            <DialogContentText>
               To subscribe to this website, please enter your email address here. We will send updates occasionally.
            </DialogContentText>
            <TextField
               disabled={true}
               margin="dense"
               id="email"
               value={email}
               label="Email Address"
               type="email"
               fullWidth
            />
            <TextField
               disabled={true}
               margin="dense"
               id="password"
               label="Password"
               value={password}
               type="password"
               fullWidth
            />
         </DialogContent>
         <DialogActions>
            <Button onClick={handleCancel} color="primary">
               Cancel
            </Button>

            <Button onClick={handleLogout} color="primary">
               Logout
            </Button>
         </DialogActions>
      </Dialog>
   )
}
