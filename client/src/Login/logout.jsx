import {AiOutlineLogout} from "react-icons/ai"
import { logout } from "../api"
import { GoogleLogout } from "react-google-login"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
const client_id = "645736260230-kig48kr4ae080nadjtf6tr7fr49re930.apps.googleusercontent.com"


function Logout() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {mutate} = useMutation(logout, {
        onSuccess: ()=>{navigate("/login"); console.log("Logout success!"); queryClient.removeQueries()},
        onError: ()=>{console.log("Failed to logout!")}

    })
    
    return (
        <GoogleLogout
        client_id={client_id}
        render={renderProps=> (
        <AiOutlineLogout onClick = {renderProps.onClick} disabled={renderProps.disabled}></AiOutlineLogout>
        )}
        onLogoutFailure={()=>console.log("Failed to logout of Google")} 
        onLogoutSuccess={mutate}>
        </GoogleLogout>
    )
}

export default Logout