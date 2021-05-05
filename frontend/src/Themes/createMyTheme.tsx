import { teal } from '@material-ui/core/colors'
import { createMuiTheme, createStyles, Theme, ThemeOptions } from '@material-ui/core/styles'

export const createMyTheme = (brigtness: string) => {
   const darkThemeCfg: ThemeOptions = {
      palette: {
         type: 'dark',
         background: {
            paper: '#424242',
            default: '#212121',
         },
         info: {
            dark: '#212121',
            main: '#212121',
            light: '#616161',
            contrastText: '#FFF59D',
         },
      },
      overrides: {
         MuiLink: {
            root: {
               color: '#FFF59D',
               fontStyle: 'italic',
               fontWeight: 'bolder',
            },
         },
      },
   }

   const lightThemeCfg: ThemeOptions = {
      palette: {
         type: 'light',
         primary: teal,
         info: {
            dark: '#4DB6AC',
            main: '#80CBC4',
            light: '#B2DFDB',
            contrastText: '#004D40',
         },
         background: {
            default: '#b2dfdb',
            paper: '#e0f2f1',
         },
      },
      overrides: {
         MuiLink: {
            root: {
               color: '#1A237E',
               fontStyle: 'italic',
               fontWeight: 'bolder',
            },
         },
      },
   }

   const options = brigtness === 'light' ? lightThemeCfg : darkThemeCfg
   return createMuiTheme({
      ...options,
   })
}

export const makeMyStyles = (theme: Theme, drawerWidth: number) => {
   return createStyles({
      root: {
         display: 'flex',
      },
      drawer: {
         [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
         },
      },
      appBar: {
         [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
         },
      },

      appBar2: {
         position: 'fixed',
         bottom: '0',
         height: '30px',
         paddingLeft: theme.spacing(2),
         background: '#36363a',
         width: '100%',
         [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
         },
      },
      menuButton: {
         marginRight: theme.spacing(2),
         [theme.breakpoints.up('md')]: {
            display: 'none',
         },
      },
      brightness: {
         marginRight: theme.spacing(2),
         position: 'absolute',
         right: 0,
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,

      drawerPaper: {
         width: drawerWidth,
         background: theme.palette.background.default,
      },
      main: {
         background: '#424242',
      },
      content: {
         flexGrow: 1,
         padding: theme.spacing(3),
      },
   })
}
