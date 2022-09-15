import Postmessage from "./postmessage"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import { motion } from "framer-motion/dist/framer-motion";
import { Chat } from "../api"
import { useEffect, useRef, useState } from "react";
import { Menu } from "../sidebar/menu";

const regex = /<img>/g
function Chatcontainer({cable,id}) {
    const scrollRef = useRef(null)
    const {channel_id} = useParams()
    const [messages,setMessages] = useState([])


    const {data, isLoading} = useQuery(["chat",channel_id],()=>Chat(channel_id), {
        onSuccess: (data)=>{
            scrollRef.current?.scrollIntoView()
            setMessages(data.messages)
        }
    })

    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
        const channel = cable.subscriptions.create(
            {channel: "ChatsChannel", room_id: channel_id },
            {received: (newMessage)=> {
                setMessages(previousMessages=>[...previousMessages, newMessage])
                scrollRef.current?.scrollIntoView()
             }
            }
        )
        return ()=> channel.unsubscribe()
    },[])

    if (isLoading) {
        return <span>Fetching chat content... </span>
    }

    console.log(id)
    console.log(messages)

    const messageList = messages?.map(chat=> 
            <motion.div key={chat.id} className={chat.user_id !== id ? "message other-message" : "message own-message"}
                whileHover={{
                    x: chat.user_id !== id ? 25 : -25,
                    scale:1.2
                }}
            dangerouslySetInnerHTML={{__html:chat.text}}>
            </motion.div> 
    )
     {/* <div className="date">
                    {new Date(chat.updated_at).toDateString()}
                </div> */}
            {/* {!chat.user_id && <p>Edit</p>} */}

    return (
        <>
        <Menu/>
        <div id = "chat-container">
            <div className="chat-content">
                    <div className="messages">
                        {messageList}
                    </div>
            <div ref={scrollRef} id = "content-end"/>
            </div>
            <Postmessage id = {data.id}/>
        </div>
        </>
    )
}

export default Chatcontainer