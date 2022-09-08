import Logout from "../Login/logout"
// import EditProfile from "./editprofile"
import PreferenceSelector from "./preferenceselector"
import RangeSlider from "./rangeslider"

function Ownprofile({user}) {
    // const user_id = useParams()

    // const {isLoading, data} = useQuery("profile",)
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
            {user?.posts?.map(post=> 
                <div key={post.id}>
                    <img style={{objectFit: "cover"}} width="400" height="400" src={post.image_url}/>
               </div>
            )}
            <Logout/>
            <RangeSlider upper_range={user.upper_range}/>
            <PreferenceSelector prefGender = {user.pref_gender} id={user.id} />
        </div>
    )
}

export default Ownprofile