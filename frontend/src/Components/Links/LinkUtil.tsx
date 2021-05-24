/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-console */
import { Button, createStyles, Link, makeStyles, Theme, Tooltip } from '@material-ui/core'
import LinkOffIcon from '@material-ui/icons/LinkOff'
import React from 'react'
import linkJSON from './links.json'

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      button: {
         margin: theme.spacing(1),
      },
   })
)

export const getLink = (label: string): any => {
   console.log(label)
   console.log(linkJSON.find((link) => link.label === label)?.url)

   return linkJSON.find((link) => link.label === label)
}

interface IProps {
   label: string
}

export const ValidatedLink = (props: IProps): any => {
   const classes = useStyles()

   const linkData = linkJSON.find((link) => link.label === props.label)

   if (linkData?.isValidated || linkData?.okIfNotValid) {
      return (
         <Link target="_blank" href={linkData.url} color="inherit">
            {linkData.label}
         </Link>
      )
   }
   return (
      <Tooltip title="Brooken link">
         <Button variant="text" color="inherit" size="small" className={classes.button} endIcon={<LinkOffIcon />}>
            {' '}
            {`${linkData?.label}`}
         </Button>
      </Tooltip>
   )
}
