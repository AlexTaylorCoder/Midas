import { GoogleLogin } from "react-google-login"

const OathKey = process.env.REACT_APP_OATH_KEY

function GoogleInfo({googleinfo}) {
    function onSuccess(res) {
        googleinfo(res.profileObj)
    }

    function onFailure(res) {
        console.log("failed",res)
    }

    return (
        <div id = "Login">
            <GoogleLogin 
                client_id = {OathKey}
                buttonText = "Login"
                onSuccess={onSuccess}  
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default GoogleInfo