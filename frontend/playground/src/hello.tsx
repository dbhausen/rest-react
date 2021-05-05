/* eslint-disable react/jsx-props-no-spreading */
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import NumberFormat from 'react-number-format'

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         '& > *': {
            margin: theme.spacing(1),
         },
      },
   })
)

interface NumberFormatCustomProps {
   // eslint-disable-next-line no-unused-vars
   inputRef: (instance: NumberFormat | null) => void
   // eslint-disable-next-line no-unused-vars
   onChange: (event: { target: { name: string; value: string } }) => void
   name: string
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
   const { inputRef, onChange, ...other } = props

   return (
      <NumberFormat
         {...other}
         getInputRef={inputRef}
         onValueChange={(values) => {
            onChange({
               target: {
                  name: props.name,
                  value: values.value,
               },
            })
         }}
         thousandSeparator
         isNumericString
         prefix="$"
      />
   )
}

interface State {
   numberformat: string
}

export default function FormattedInputs() {
   const classes = useStyles()
   const [values, setValues] = React.useState<State>({
      numberformat: '1320',
   })

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
         ...values,
         [event.target.name]: event.target.value,
      })
   }

   return (
      <div className={classes.root}>
         <TextField
            label="react-number-format"
            value={values.numberformat}
            onChange={handleChange}
            name="numberformat"
            id="formatted-numberformat-input"
            InputProps={{
               inputComponent: NumberFormatCustom as any,
            }}
         />
      </div>
   )
}
