import { useMutation} from "react-query"
import Postmessage from "./postmessage"

function Chatcontainer() {

    return (
        <div id = "chat-container">
            <Postmessage/>
        </div>
    )
}

export default Chatcontainer