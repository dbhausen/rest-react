import { Paper } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App/App2'
import './index.css'

ReactDOM.render(
   <React.StrictMode>
      <Paper>
         <App />
      </Paper>
   </React.StrictMode>,
   document.getElementById('root')
)
