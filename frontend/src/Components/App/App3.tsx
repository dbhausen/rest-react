import {
   Button,
   createMuiTheme,
   createStyles,
   FormControlLabel,
   makeStyles,
   Paper,
   Switch,
   Theme,
   ThemeProvider,
   Typography,
} from '@material-ui/core'
import { blue, green, purple, red } from '@material-ui/core/colors'
import React, { useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
         padding: theme.spacing(2),
         minHeight: '400px',
      },
   })
)

const pgthemeCfg = {
   palette: {
      primary: {
         main: purple[500],
      },
      secondary: {
         main: green[500],
      },
   },
}
const rbtheme = {
   palette: {
      primary: {
         main: red[500],
      },
      secondary: {
         main: blue[500],
      },
   },
}

const App = () => {
   const [darkMode, setDarkMode] = useState(false)
   const classes = useStyles()
   const themeCfg = darkMode ? pgthemeCfg : rbtheme
   const theme = createMuiTheme(themeCfg)

   return (
      <ThemeProvider theme={theme}>
         <Paper className={classes.root}>
            <FormControlLabel
               control={<Switch checked={darkMode} onClick={() => setDarkMode(!darkMode)} color="primary" />}
               label="Dark"
            />
            <Typography>Hello, Is Dark {darkMode ? 'dark' : 'light'}</Typography>
            <Button color="primary" variant="contained">
               Primary
            </Button>
            <Button color="secondary" variant="contained">
               secondary
            </Button>
         </Paper>
      </ThemeProvider>
   )
}
export default App
