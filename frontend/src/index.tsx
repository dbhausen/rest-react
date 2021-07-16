import { Paper } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App/App2'
import UserContext, { defaultUser } from './Components/Context/UserContext'
import './index.css'

ReactDOM.render(
   <React.StrictMode>
      <Paper>
         <UserContext.Provider value={defaultUser}>
            <App />
         </UserContext.Provider>
      </Paper>
   </React.StrictMode>,
   document.getElementById('root')
)
