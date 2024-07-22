import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useState } from 'react'

type IProps = {
  name?: string
  editorRef: React.MutableRefObject<null>
  description?: string
}

function EditorMCE({ description, editorRef }: IProps) {
  const [content, setContent] = useState('')
  useEffect(() => {
    if (description) setContent(description)
    return () => setContent('')
  }, [description])
  return (
    <>
      <Editor
        ref={editorRef}
        apiKey='ho4916u93vf2q68ipmwki5rwpus0urlp12l823orkm245sap'
        value={content}
        init={{
          menubar: false,
          height: 250,
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'textcolor' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={(content) => {
          setContent(content)
        }}
      />
    </>
  )
}

export default EditorMCE
