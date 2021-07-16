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

export interface IProps {
   label: string
}

export const ValidatedLink = (props: IProps): any => {
   const { label } = props
   const classes = useStyles()

   const linkData = linkJSON.find((link) => link.label === label)

   if (linkData?.isValidated || linkData?.okIfNotValid) {
      return (
         <Link target="_blank" href={linkData.url}>
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
