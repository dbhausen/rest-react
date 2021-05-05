/* eslint-disable no-unused-vars */
import { AppBar, Box, createStyles, Grid, makeStyles, Paper, Tab, Tabs, Theme } from '@material-ui/core'
import { GridColumns } from '@material-ui/data-grid'
import React from 'react'
import env from '../Login/Env'
import { RestForm, RestViewGrid } from '../RestFormGrid/RestFormGrid'

const cols: GridColumns = [{ field: 'myemail', width: 250, headerName: 'Email Address' }, { field: 'id' }]

const RestCrud = () => {
   const [value, setValue] = React.useState(0)

   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue)
   }
   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         root: {
            padding: '2px',
         },
         form: {
            marginBottom: theme.spacing(2),
            marginRight: theme.spacing(1),
            marginLeft: 5,
            minWidth: '215px',
         },
         data: {
            marginBottom: theme.spacing(2),
            minHeight: '400px',

            color: theme.palette.text.secondary,
         },
         dataPaper: {
            marginBottom: theme.spacing(2),
            minHeight: '400px',
            background: theme.palette.background.default,
         },
      })
   )
   const classes = useStyles()

   interface TabPanelProps {
      children?: React.ReactNode
      index: any
      value: any
   }

   function TabPanel(props: TabPanelProps) {
      const { children, index, ...other } = props

      return (
         <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box>{children}</Box>}
         </div>
      )
   }

   function a11yProps(index: any) {
      return {
         id: `simple-tab-${index}`,
         'aria-controls': `simple-tabpanel-${index}`,
      }
   }

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
               <Tab label="Demo" {...a11yProps(0)} />
               <Tab label="Instalation" {...a11yProps(1)} />
               <Tab label="Usage" {...a11yProps(2)} />
            </Tabs>
         </AppBar>
         <TabPanel value={value} index={0}>
            <Grid container spacing={1}>
               <Grid item xs={7} sm={5} md={4} lg={2} className={classes.form}>
                  <RestForm url={`${env().API_HOST}/api/`} />
               </Grid>
               <Grid item xs={12} sm={6} md={7} lg={9} className={classes.data}>
                  <Paper className={classes.dataPaper}>
                     <RestViewGrid url={`${env().API_HOST}/api/`} density="compact" autoHeight pageSize={10} />
                  </Paper>
               </Grid>
            </Grid>
         </TabPanel>
         <TabPanel value={value} index={1}>
            To Do: Instalations instructions
         </TabPanel>
         <TabPanel value={value} index={2}>
            To Do: Usage notes
         </TabPanel>
      </div>
   )
}
export default RestCrud
