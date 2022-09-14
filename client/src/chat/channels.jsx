import { channels } from "../api"
import { useQuery } from "react-query"
import { motion } from "framer-motion/dist/framer-motion";
import { useNavigate } from "react-router-dom";
import { Menu } from "../sidebar/menu"
import Heartloader from "../stylecomponents/heartloader";

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
    
    function setCurrentChannel(e) {
        console.log(e.target.id)
        navigate("/chat/"+e.target.id)
    }

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
                    onTap={setCurrentChannel}
                    >
                    
                        <img className="prof-pic" src={channel.image}/>
                        <h3>{channel.caption}</h3>
                        <h2 dangerouslySetInnerHTML={{__html:channel?.last_message?.text}}>
                        </h2>
                    </motion.div>
                    )
                }
            </div>
        </div>
        </>
    )
}


export default Channels