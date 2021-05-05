import { Button } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider, useTheme } from '@material-ui/core/styles'
// eslint-disable-next-line no-unused-vars
import TelegramIcon from '@material-ui/icons/Telegram'
import { convertToRaw, EditorState, RawDraftContentState } from 'draft-js'
import MUIRichTextEditor, { TToolbarComponentProps } from 'mui-rte'
import React, { useState } from 'react'
import env from '../Login/Env'
import getCsrfToken from '../Login/getCsrfToken'

const lightTheme = createMuiTheme()

Object.assign(lightTheme, {
   overrides: {
      MuiIconButton: {
         root: {
            color: '#546E7A',
         },
      },
      MuiButton: {
         root: {
            color: '#546E7A',
         },
      },
      MUIRichTextEditor: {
         root: {
            '& pre': {
               marginTop: 0,
               marginBottom: 0,
               paddingLeft: 6,
               overflow: 'auto',
            },
            '& blockQuote': {
               marginTop: 0,
               marginBottom: 0,
               paddingLeft: 6,
            },
         },
         container: {
            display: 'flex',
            flexDirection: 'column',
         },
         editor: {
            padding: '20px',
            height: '200px',
            maxHeight: '200px',
            overflow: 'auto',
         },
         toolbar: {
            borderTop: '1px solid gray',
            backgroundColor: '#CFD8DC',
         },
         placeHolder: {
            paddingLeft: 20,
            width: 'inherit',
            position: 'static',
         },
         anchorLink: {
            color: '#333333',
            textDecoration: 'underline',
         },
      },
   },
})
const darkTheme = createMuiTheme({
   palette: {
      primary: {
         main: '#90CAF9',
      },
   },
})

Object.assign(darkTheme, {
   overrides: {
      MuiIconButton: {
         root: {
            color: '#ECEFF1',
         },
      },
      MuiButton: {
         root: {
            color: '#ECEFF1',
         },
      },
      MUIRichTextEditor: {
         root: {
            maxWidth: 800,
            '& pre': {
               backgroundColor: '#37474F',
               marginTop: 0,
               marginBottom: 0,
               paddingLeft: 6,
               overflow: 'auto',
            },
            '& blockQuote': {
               marginTop: 0,
               color: '#ECEFF1',
               marginBottom: 0,
               paddingLeft: 6,
            },
         },
         editor: {
            padding: '20px',
            height: '200px',
            maxHeight: '200px',

            overflow: 'auto',
         },
         toolbar: {
            borderTop: '1px solid gray',
            backgroundColor: '#37474F',
         },
         placeHolder: {
            paddingLeft: 20,
            width: 'inherit',
            position: 'static',
         },
         anchorLink: {
            color: '#FFEB3B',
            textDecoration: 'underline',
         },
      },
   },
})

const getTheme = () => {
   const theme = useTheme()
   if (theme.palette.type === 'light') {
      return lightTheme
   }

   return darkTheme
}

const save = async (data: RawDraftContentState) => {
   const url = `${env().API_HOST}/api/message/`
   const method = 'POST'

   /*
   if (false) {
      url = `${env().API_HOST + baseUrl}update/${pk}`
      method = 'PUT'
   }
   */
   const newMessage = {
      text: JSON.stringify(data),
   }

   const requestOptions = {
      method,
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': await getCsrfToken() },
      body: JSON.stringify(newMessage),
   }
   try {
      await fetch(url, requestOptions)
   } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
   }
}

const MyEditor = () => {
   const [dirty, setDirty] = useState(false)

   const MySendComponent = (props: TToolbarComponentProps) => {
      return (
         <Button
            startIcon={<TelegramIcon />}
            id={props.id}
            variant="text"
            onMouseDown={props.onMouseDown}
            disabled={!dirty}>
            Send
         </Button>
      )
   }

   const handleChange = (state: EditorState) => {
      setDirty(state.getCurrentContent().hasText())
   }

   return (
      <div>
         <form>
            <MuiThemeProvider theme={getTheme()}>
               <MUIRichTextEditor
                  controls={[
                     'bold',
                     'italic',
                     'underline',
                     'link',
                     'numberList',
                     'bulletList',
                     'quote',
                     'code',
                     'undo',
                     'redo',
                     'send',
                  ]}
                  customControls={[
                     {
                        name: 'send',
                        component: MySendComponent,
                        type: 'callback',
                        onClick: (editorState) => {
                           save(convertToRaw(editorState.getCurrentContent()))
                           return EditorState.createEmpty()
                        },
                     },
                  ]}
                  defaultValue=""
                  label="Type something here..."
                  inlineToolbar={false}
                  toolbarButtonSize="medium"
                  onChange={handleChange}
               />
            </MuiThemeProvider>
            <br />
         </form>
      </div>
   )
}

export default MyEditor
