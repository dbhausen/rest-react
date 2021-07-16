import { Paper, withWidth, WithWidth } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
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
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import PersonIcon from '@material-ui/icons/Person'
import React, { useContext, useState } from 'react'
import env from '../../SecuredComponents/Login/Env'
import Test from '../../SecuredComponents/Test'

import { createMyTheme, makeMyStyles } from '../../Themes/createMyTheme'
import BoxBuilder from '../BoxBuilder/BoxBuilder'
import MyEditor from '../ContactUs/ContactUs'
import UserContext from '../Context/UserContext'
import GettingStarted from '../GettingStarted/GettingStarted'
import Home from '../Home/Home'
import RandomValues from '../RandomNames/RandomNames'
import RestCrud from '../RestCrud/RestCrud'
import Stack from '../Stack/Stack'
import LoginDialog from './LoginDialog'

const drawerWidth = 150

const ResponsiveDrawer = (props: WithWidth) => {
   const { width } = props

   const [brigtness, setBrightness] = useState('dark')
   const appliedTheme = createMyTheme(brigtness)
   const myStyles = makeMyStyles(appliedTheme, drawerWidth)
   const useStyles = makeStyles(() => createStyles(myStyles))
   const classes = useStyles()
   const [mobileOpen, setMobileOpen] = useState(false)
   const [open, setOpen] = useState(false)
   const [showing, setShowing] = useState('Home')
   const [showGalleryChildren, setShowGalleryChildren] = useState(false)
   const user = useContext(UserContext)

   const handleToggleShowGalleryChildren = () => {
      setShowGalleryChildren(!showGalleryChildren)
   }

   document.body.style.backgroundColor = appliedTheme.palette.background.paper

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen)
   }

   const handleClose = (x: string) => {
      // eslint-disable-next-line no-console
      console.log(x)

      setOpen(false)
   }

   const handleThemeToggle = (event: any, newValue: string) => {
      setBrightness(newValue)
   }

   const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: string) => {
      setShowing(index)
      setMobileOpen(false)
   }

   const drawer = () => {
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
               <ListItem button onClick={handleToggleShowGalleryChildren}>
                  <ListItemText primary="Gallery" />
                  {showGalleryChildren ? <ExpandLess /> : <ExpandMore />}
               </ListItem>
               <Collapse in={showGalleryChildren} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                     {['RestGrid', 'Random', 'BoxBuilder', 'Secure'].map((text) => (
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
      <UserContext.Consumer>
         {(u) => (
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
                           <Tooltip title="Use dark theme">
                              <IconButton
                                 className={classes.brightness}
                                 color="inherit"
                                 aria-label="Dark Theme"
                                 edge="start"
                                 onClick={(event) => handleThemeToggle(event, 'dark')}>
                                 <Brightness4Icon />
                              </IconButton>
                           </Tooltip>
                        ) : null}
                        {brigtness === 'dark' ? (
                           <Tooltip title="Use light theme">
                              <IconButton
                                 className={classes.brightness}
                                 color="inherit"
                                 aria-label="Light Theme"
                                 edge="start"
                                 onClick={(event) => handleThemeToggle(event, 'light')}>
                                 <BrightnessHighIcon />
                              </IconButton>
                           </Tooltip>
                        ) : null}
                        {!u.hasToken ? (
                           <Tooltip title="Login">
                              <IconButton
                                 className={classes.clearToken}
                                 color="inherit"
                                 aria-label="login"
                                 edge="start"
                                 onClick={() => setOpen(true)}>
                                 <PermIdentityIcon />
                              </IconButton>
                           </Tooltip>
                        ) : null}
                        {u.hasToken ? (
                           <Tooltip title="Logout">
                              <IconButton
                                 className={classes.clearToken}
                                 color="inherit"
                                 aria-label="clear login token"
                                 edge="start"
                                 onClick={() => setOpen(true)}>
                                 <PersonIcon />
                              </IconButton>
                           </Tooltip>
                        ) : null}

                        <LoginDialog open={open} onClose={handleClose} />

                        <Typography variant="h6" noWrap>
                           Rest-React {u.user}
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
                  {showing === 'Secure' ? <Test user={user} /> : null}
               </div>
               <Divider />
               <div className={classes.appBar2}>
                  <Typography align="justify">{width}</Typography>
               </div>
            </ThemeProvider>
         )}
      </UserContext.Consumer>
   )
}
export default withWidth()(ResponsiveDrawer)
