import { channels } from "../api"
import { useQuery } from "react-query"

function Channels() {
    const {data,isLoading} = useQuery("channels",channels)


    if (isLoading) {
        return <span>Fetching Channels...</span>
    }

    if (data.length === 0) {
        return (
            <span>You have no matches so you have no chats!</span>
        )
    } 
    return (
        <div id = "channels-container">
            {data.map(channel=> 
            <div className="channel">
                {channel.caption}
            </div>
            )}
        </div>
    )
}


export default Channels