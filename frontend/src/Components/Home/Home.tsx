import { Grid, Typography } from '@material-ui/core'
import React from 'react'

const Home = () => {
   return (
      <Grid container direction="column" alignContent="center">
         <Grid item>
            <Typography style={{ margin: 20 }} variant="h3" component="h3">
               Welcome
            </Typography>
         </Grid>
         <Grid item>
            <Typography style={{ margin: 20 }} variant="h6" component="p">
               Being un-opinionated is a virtue but it can also be confusing. There are so many ways to do even the most
               fundamental things. This site takes you through one way of creating a basic CRUD (Create-Update-Delete)
               application using Rest Framework and React. So, while there are countless other ways to do this, this
               approach is based on the following tools:
            </Typography>
         </Grid>
         <Grid item>
            <Typography>
               <ul>
                  <li>SQLite and MySQL (Examples will show MySql syntax but any database will do)</li>
                  <li>Python django/Rest framework (handles server side operations)</li>
                  <li>pythonanywhere (optional remote host) </li>
                  <li>React (JavaScript/TypeScript client side operations)</li>
                  <li>Material-ui (pretty buttons and whatnot for React)</li>
               </ul>
            </Typography>
         </Grid>
      </Grid>
   )
}
export default Home
