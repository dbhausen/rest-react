import { Checkbox, FormControlLabel, Grid, Paper, TextField, TextFieldProps } from '@material-ui/core'
import React from 'react'
import NumberFormat from 'react-number-format'

const varient = 'standard'

// number input type is being used for integers only
// checkbox is used for boolean datatype
const implementedInputTypes = ['decimal', 'float', 'number', 'dateTime-local', 'date', 'email', 'checkbox', 'text']

function NumberFormatCustomFixed2(props: any) {
   const { inputRef, onChange, ...other } = props

   return (
      <NumberFormat
         {...other}
         getInputRef={inputRef}
         onChange={onChange}
         decimalScale={2}
         fixedDecimalScale
         thousandSeparator
         isNumericString
      />
   )
}

function NumberFormatCustomFloat(props: any) {
   const { inputRef, onChange, ...other } = props

   return <NumberFormat {...other} getInputRef={inputRef} onChange={onChange} isNumericString />
}

/*
interface IProps {
   fullWidth: boolean
   label: string
   value: any
   required: boolean
   onChange: any
   name: string
   id: string
   type: string
   InputLabelProps: any
}
*/

type SwitchTextFieldProps = Omit<TextFieldProps, 'InputProps'> & { type: string; onChange: any; value: any }

const SwitchTextField = (props: SwitchTextFieldProps) => {
   const { type, value, label } = props
   if (!implementedInputTypes.includes(type)) {
      return (
         <Grid justify="center">
            <Paper variant="outlined">type {type} is not implemented</Paper>
         </Grid>
      )
   }

   // inputComponent undefined is ok
   let inputComponent
   if (type === 'decimal') {
      inputComponent = NumberFormatCustomFixed2
   } else if (type === 'float') {
      inputComponent = NumberFormatCustomFloat
   }

   if (type === 'checkbox') {
      return (
         <Paper elevation={3} square style={{ margin: 0, borderBottom: '1px solid' }}>
            <FormControlLabel
               control={<Checkbox id={props.id} onClick={props.onChange} color="primary" checked={value} />}
               label={label}
            />
         </Paper>
      )
   }
   return (
      <Paper elevation={3} variant="elevation">
         <TextField
            variant={varient}
            InputProps={{
               inputComponent,
            }}
            {...props}
         />
      </Paper>
   )
}
export default SwitchTextField
