import { InfoWindow, Marker } from "@react-google-maps/api"
import { useState } from "react"
import { NavLink } from "react-router-dom"

function Markercomp({user}) {
    const [isOpen, setOpen] = useState(false)
    console.log(user)
    function handleOpen() {
        setOpen(true)
    }
    return (
        <Marker icon={user.image_url} 
        onClick={handleOpen} position={user.coords}>
        { isOpen ?
            <InfoWindow onCloseClick={()=>setOpen(false)}>
                    <div id = "profile-popup">
                        <h2>{user.first_name}</h2>
                        <img className="prof-pic" width="75" height="75" src={user.image_url}/>
                    </div>
            </InfoWindow>
            :
            null
        }
        </Marker>
    )
}

export default Markercomp