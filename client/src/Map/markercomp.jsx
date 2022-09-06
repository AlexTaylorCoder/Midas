import { Marker } from "@react-google-maps/api"

function Markercomp({user}) {
    console.log(user)
    return (
        <Marker position={user.coords}/>
    )
}

export default Markercomp