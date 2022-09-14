import { useState, useRef } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from 'react-query';
import { newMessage } from '../api';
import {IoSend} from "react-icons/io5"



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

function Postmessage({id}) {
    const quillRef = useRef()
    
    const {mutate} = useMutation(newMessage)

    function handleSend() {
      mutate({text:quillRef.current.value,channel_id:id})

    }
    return (
    <div id='post-message-container'>
        <ReactQuill preserveWhitespace="true" ref={quillRef} modules={modules} formats={formats} placeholder="Send a message" theme="snow"/>
        <h1><IoSend onClick={handleSend}/></h1>
    </div>
    )

}

export default Postmessage