import { NavLink } from "react-router-dom"
function Navbar() {

    return (
        <div id = "navbar">
            <h1 className="logo">Logo</h1>
            <NavLink to='/map'>Map</NavLink>
            <NavLink to="/"><h1>Swipe</h1></NavLink>
            <NavLink to="/chats"><h1>Chats</h1></NavLink>
            <NavLink to="/profile"><h1>Profile</h1></NavLink>
        </div>
    )
}


export default Navbar