import { React, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
function Draft(props) {
  const [editorState, seteditorState] = useState('')
  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={(editorState) => seteditorState(editorState)}
      onBlur={() => {
        props.getEditContent(
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        )
      }}
    />
  )
}

export default Draft
