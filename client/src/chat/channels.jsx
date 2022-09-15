import { channels } from "../api"
import { useQuery } from "react-query"
import { motion } from "framer-motion/dist/framer-motion";
import { useNavigate } from "react-router-dom";
import { Menu } from "../sidebar/menu"
import Heartloader from "../stylecomponents/heartloader";

const imagereg = /<img/g


function Channels() {
    const navigate = useNavigate()
    const {data,isLoading,isFetching} = useQuery("channels",channels)


    if (isLoading) {
        return  (
        <div id = "channels-container">
            <Heartloader/>
        </div>
        )
    }
    
    function setCurrentChannel(id) {
            navigate("/chat/"+id)
    }

    console.log(data)

    return (
        <>
        <Menu/>
        <div id = "channels-container">
            <div className="channel-preview-container">
                {data.error ?
                    <div id = "channels-empty">
                        <h2>You have no chats</h2>
                        <h3>Start Swiping!</h3>
                    </div>
                    :
                    data.map(channel=> 
                    <motion.div key={channel.id} id={channel.id} className="channel"
                    whileHover={{scale:1.05,transition:{duration:.2},cursor:"pointer"}}
                    whileTap={{scale: 0.95}}
                    onTap={() => setCurrentChannel(channel.id)}
                    >
                    
                        <img className="prof-pic" src={channel.image}/>
                        <h3>{channel.caption}</h3>
                        { !imagereg.test(channel?.last_message?.text) ?
                        <h2 dangerouslySetInnerHTML={{__html:channel?.last_message?.text}}>
                        </h2>
                        :
                        <p>Media</p>

                        }
                    </motion.div>
                    )
                }
            </div>
        </div>
        </>
    )
}


export default Channels