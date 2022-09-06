import Logout from "../Login/logout"
import EditProfile from "./editprofile"
import PreferenceSelector from "./preferenceselector"
import RangeSlider from "./rangeslider"

function Ownprofile({user={}}) {
    return (
        <div id="own-profile">
            <div className="profile-header">
                <p>{user.first_name} {user.last_name}</p>
                <p>{user.age}</p>
                <p>{user.email}</p>
                <p>{user.gender}</p>
                <p>{user.bio}</p>
                <img className="prof-pic" src={user.image_url}/>
            </div>
            <PreferenceSelector prefGender = {user.pref_gender} id={user.id} />
            <RangeSlider upper_range={user.upper_range}/>
            <Logout/>
        </div>
    )
}

export default Ownprofile