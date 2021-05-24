import { createStyles, Divider, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { getLink, ValidatedLink } from '../Links/LinkUtil'

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: { maxWidth: 675, paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 45 },
      linkdesc: {
         maxWidth: 500,
      },
      intro: { maxWidth: 625, paddingBottom: 10, paddingLeft: 30, paddingRight: 10 },
      linkHeading: {
         maxWidth: 600,
         paddingBottom: 3,
         fontWeight: 'bold',
      },
      linkLabel: {
         color: theme.palette.info.contrastText,
         fontStyle: 'italic',
         fontWeight: 'bolder',
      },
   })
)

type TlinkData = {
   typeHeading: string
   link: string
   linkLabel: string
   description: string
}

export const linkData: TlinkData[] = [
   {
      typeHeading: 'Editor.  Free',
      link: getLink('VSCode').url,
      linkLabel: 'VSCode',
      description:
         'Visual Studio Code is a powerful source code editor. It is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript, Node.js, GitHub...',
   },
   {
      typeHeading: 'Remote Host.  Free to Cheap',
      link: getLink('pythonanywhere').url,
      linkLabel: 'pythonanywhere',
      description:
         'Super easy and cheap hosting built for django. MySQL is included for free. Plans start at free and go up in a flexible way from there. Downgrade to free any time you want.  Postgres is available at extra cost.',
   },
   {
      typeHeading: 'Domain Name Registration. about $12 per year',
      link: getLink('namecheap').url,
      linkLabel: 'namecheap',
      description: 'Absolutely not needed if you use pythonanywhere. This is kinda like buying vanity plates.',
   },
   {
      typeHeading: 'Source control.  FREE',
      link: getLink('GitHub').url,
      linkLabel: 'GitHub',
      description:
         'More than source control, GitHub is a social media destination and rich eco-system. It is feature rich but easy to get started. GitHub is well supported by VSCode.',
   },
   {
      typeHeading: 'Django (jang-gow the "D" is silent)  Open Source, FREE',
      link: getLink('django').url,
      linkLabel: 'django',
      description:
         'A high-level backend (or server side) Python Web framework that does the heavy lifting required to access databases and other server resources.',
   },
   {
      typeHeading: 'Django REST framework. Free',
      link: getLink('Rest framework').url,
      linkLabel: 'Rest framework',
      description: 'The Rest framework is build on top of django and adds some really good sugar.',
   },

   {
      typeHeading: 'TypeScript a newer (and better) way to create JavaScript. Free',
      link: getLink('TypeScript').url,
      linkLabel: 'TypeScript',
      description:
         'This is what all the cool kids are using. TypeScript is a super set of JavaScript that compiles back to JavaScript for the browser. The benefit of all this is that with TypeScript you can see more of your mistakes in your editor (VSCode or other) as soon as you make them instead of much later when you bump into them at runtime. TypeScript is easier for a human to read, the browser could care less.',
   },
   {
      typeHeading: 'React. A JavaScript (or TypeScript) library for building user interfaces. Free',
      link: getLink('React').url,
      linkLabel: 'React',
      description:
         'Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. This is a serious upgrade to AngularJS.',
   },

   {
      typeHeading: 'Axios. Free',
      link: getLink('axios on github').url,
      linkLabel: 'axios on github',
      description:
         'Promise based HTTP client for the browser and node.js. (Used as an alternative to native Fetch api)',
   },

   {
      typeHeading: 'Material-ui  Free (until it is not)',
      link: getLink('material-ui').url,
      linkLabel: 'material-ui',
      description: 'Well documented React component library developed by Google in 2014. Great support for TypeScript.',
   },
]

const Stack = () => {
   const classes = useStyles()

   return (
      <Paper elevation={0} className={classes.root}>
         <Typography align="justify" className={classes.intro}>
            Part of the fun is developing a great technology stack. Think of the following as a reasonable starting
            point on your quest for Nirvana.
         </Typography>

         <Divider />
         <Grid container direction="column" spacing={2}>
            {linkData.map((link) => (
               <Grid item>
                  <Paper elevation={0} className={classes.linkHeading}>
                     <Typography>{link.typeHeading}</Typography>
                  </Paper>
                  <Grid container direction="row" spacing={3}>
                     <Grid item xs={4} sm={3} md={3} lg={3} xl={3}>
                        <Typography className={classes.linkLabel}>
                           <ValidatedLink label={link.linkLabel} />
                        </Typography>
                     </Grid>
                     <Grid item xs={8} sm={9} md={9} lg={9} xl={9}>
                        <Paper elevation={0} className={classes.linkdesc}>
                           <Typography>{link.description}</Typography>
                        </Paper>
                        <Divider />
                     </Grid>
                  </Grid>
               </Grid>
            ))}
         </Grid>
      </Paper>
   )
}
export default Stack
