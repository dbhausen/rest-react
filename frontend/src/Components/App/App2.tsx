import { Paper, withWidth, WithWidth } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from 'react'
import { createMyTheme, makeMyStyles } from '../../Themes/createMyTheme'
import BoxBuilder from '../BoxBuilder/BoxBuilder'
import MyEditor from '../ContactUs/ContactUs'
import GettingStarted from '../GettingStarted/GettingStarted'
import Home from '../Home/Home'
import linkJSON from '../Links/links.json'
import env from '../Login/Env'
import RandomValues from '../RandomNames/RandomNames'
import RestCrud from '../RestCrud/RestCrud'
import Stack from '../Stack/Stack'

const drawerWidth = 150

const ResponsiveDrawer = (props: WithWidth) => {
   const { width } = props

   const [brigtness, setBrightness] = useState('dark')
   const appliedTheme = createMyTheme(brigtness)
   const myStyles = makeMyStyles(appliedTheme, drawerWidth)
   const useStyles = makeStyles(() => createStyles(myStyles))
   const classes = useStyles()
   const [mobileOpen, setMobileOpen] = useState(false)
   const [showing, setShowing] = useState('Home')

   const getLink = (label: string): any => {
      return linkJSON.find((link) => link.label === label)
   }

   document.body.style.backgroundColor = appliedTheme.palette.background.paper

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen)
   }

   const handleThemeToggle = (event: any, newValue: string) => {
      // eslint-disable-next-line no-console
      console.log(getLink('VSCode'))

      setBrightness(newValue)
   }

   const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: string) => {
      setShowing(index)
      setMobileOpen(false)
   }

   type TmyMenuNode = {
      name: string
      id: number
      url: string
      children?: TmyMenuNode[]
   }

   const drawer = () => {
      const [open, setOpen] = React.useState(false)

      const handleClick = () => {
         setOpen(!open)
      }
      return (
         <div>
            <Divider />
            <List>
               {['Home', 'Getting Started', 'Stack', 'Contact Us'].map((text) => (
                  <ListItem onClick={(event) => handleListItemClick(event, text)} button key={text}>
                     <ListItemText primary={text} />
                  </ListItem>
               ))}
            </List>
            <Divider />
            <List component="nav">
               <ListItem button onClick={handleClick}>
                  <ListItemText primary="Gallery" />
                  {open ? <ExpandLess /> : <ExpandMore />}
               </ListItem>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                     {['RestGrid', 'Random', 'BoxBuilder'].map((text) => (
                        <ListItem
                           style={{ paddingLeft: 26 }}
                           onClick={(event) => handleListItemClick(event, text)}
                           button
                           key={text}>
                           <ListItemText primary={text} />
                        </ListItem>
                     ))}
                  </List>
               </Collapse>
            </List>
         </div>
      )
   }

   return (
      <ThemeProvider theme={appliedTheme}>
         <Paper elevation={0} className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
               <Toolbar>
                  <IconButton
                     color="inherit"
                     aria-label="open drawer"
                     edge="start"
                     onClick={handleDrawerToggle}
                     className={classes.menuButton}>
                     <MenuIcon />
                  </IconButton>
                  {brigtness === 'light' ? (
                     <IconButton
                        className={classes.brightness}
                        color="inherit"
                        aria-label="Dark Theme"
                        edge="start"
                        onClick={(event) => handleThemeToggle(event, 'dark')}>
                        <Brightness4Icon />
                     </IconButton>
                  ) : null}
                  {brigtness === 'dark' ? (
                     <IconButton
                        className={classes.brightness}
                        color="inherit"
                        aria-label="Light Theme"
                        edge="start"
                        onClick={(event) => handleThemeToggle(event, 'light')}>
                        <BrightnessHighIcon />
                     </IconButton>
                  ) : null}
                  <Typography variant="h6" noWrap>
                     Rest-React
                  </Typography>
               </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
               <Hidden mdUp implementation="css">
                  <Drawer
                     variant="temporary"
                     anchor={appliedTheme.direction === 'rtl' ? 'right' : 'left'}
                     disableAutoFocus
                     open={mobileOpen}
                     onClose={handleDrawerToggle}
                     classes={{
                        paper: classes.drawerPaper,
                     }}
                     ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                     }}>
                     {drawer()}
                  </Drawer>
               </Hidden>
               <Hidden smDown implementation="css">
                  <Drawer
                     classes={{
                        paper: classes.drawerPaper,
                     }}
                     variant="permanent"
                     open>
                     {drawer()}
                  </Drawer>
               </Hidden>
            </nav>
         </Paper>
         <div className={classes.appBar}>
            <div className={classes.toolbar} />

            {showing === 'Home' ? <Home /> : null}
            {showing === 'Stack' ? <Stack /> : null}
            {showing === 'Getting Started' ? <GettingStarted /> : null}
            {showing === 'RestGrid' ? <RestCrud /> : null}
            {showing === 'Random' ? <RandomValues url={`${env().API_HOST}/api/`} /> : null}
            {showing === 'BoxBuilder' ? <BoxBuilder /> : null}
            {showing === 'Contact Us' ? <MyEditor /> : null}
         </div>
         <Divider />
         <div className={classes.appBar2}>
            <Typography align="justify">{width}</Typography>
         </div>
      </ThemeProvider>
   )
}
export default withWidth()(ResponsiveDrawer)
