import { NavLink } from "react-router-dom"

function Navbar({id}) {
    return (
        <div id = "navbar">
            <h1 className="logo">Logo</h1>
            <NavLink to='/map'>Map</NavLink>
            <NavLink to="/"><h1>Swipe</h1></NavLink>
            <NavLink to="/channels"><h1>Chats</h1></NavLink>
            <NavLink to={"/profile/"+id}><h1>Profile</h1></NavLink>
        </div>
    )
}


export default Navbar