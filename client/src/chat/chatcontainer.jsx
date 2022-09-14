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

    console.log(channel_id)

    const {data, isLoading} = useQuery(["chat",channel_id],()=>Chat(channel_id), {
        onSuccess: (data)=>{
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
        console.log(channel)
        return ()=> channel.unsubscribe()
    },[])

    if (isLoading) {
        return <span>Fetching chat content... </span>
    }

    console.log(data)
    const messageList = messages?.map(chat=> 
            <motion.div key={chat.id} className={chat.user_id !== data.id ? "message other-message" : "message own-message"}
                whileHover={{
                    x: chat.user_id ? 50 : -50,
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