import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote','code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
    
  }

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color','background'
  ]

function Postmessage() {
    const [value,setValue] = useState('')


    return (
    <>
        <ReactQuill modules={modules} formats={formats} placeholder="Send a message" theme="snow" value={value} onChange={setValue} />;
        <button>random</button>
    </>
    )

}

export default Postmessage