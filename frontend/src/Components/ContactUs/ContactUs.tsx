import { Accordion, AccordionDetails, AccordionSummary, Button } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider, useTheme } from '@material-ui/core/styles'
import ExpandMore from '@material-ui/icons/ExpandMore'
// eslint-disable-next-line no-unused-vars
import TelegramIcon from '@material-ui/icons/Telegram'
import axios from 'axios'
import { convertToRaw, EditorState, RawDraftContentState } from 'draft-js'
import MUIRichTextEditor, { TToolbarComponentProps } from 'mui-rte'
import React, { useEffect, useState } from 'react'
import env from '../Login/Env'

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
const url = `${env().API_HOST}/api/message/`
// eslint-disable-next-line no-unused-vars
const content =
   '{"blocks":[{"key":"22m2s","text":"thing 1","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"59k7f","text":"thing 2","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
type TMessage = {
   id: number
   date: string
   text: string
   approved: boolean
   category: string
}

const MyEditor = () => {
   const [dirty, setDirty] = useState(false)
   const [messages, setMessages] = useState<TMessage[]>()

   useEffect(() => {
      const getMessages = async () => {
         const response = await axios.get(url)
         setMessages(response.data)
      }

      getMessages()
   }, [])

   const save = async (data: RawDraftContentState) => {
      const newMessage = {
         text: JSON.stringify(data),
      }
      await axios.post(url, newMessage)
      const response = await axios.get(url)
      setMessages(response.data)
      // eslint-disable-next-line no-console
      console.log(messages)
   }

   /*
                           <MuiThemeProvider theme={getTheme()}>
                           <MUIRichTextEditor defaultValue={message.text} />
                        </MuiThemeProvider>
   */

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
         <div>
            {messages?.map((message: TMessage) => {
               return (
                  <Accordion>
                     <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header">
                        {message.date}
                     </AccordionSummary>
                     <AccordionDetails>
                        <div>
                           <MuiThemeProvider theme={getTheme()}>
                              <MUIRichTextEditor defaultValue={message.text} controls={[]} readOnly={true} />
                           </MuiThemeProvider>
                        </div>
                     </AccordionDetails>
                  </Accordion>
               )
            })}
         </div>
      </div>
   )
}

export default MyEditor
