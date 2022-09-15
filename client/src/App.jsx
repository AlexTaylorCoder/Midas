import CreateAccount from "./Login/createaccount";
import ProfileContainer from "./Home/profilecontainer";
import Login from "./Login/login";
import { position } from "./api";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { authorize } from "./api";
import { useQuery } from "react-query";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Ownprofile from "./Profile/ownprofile";
import UnknownRoute from "./stylecomponents/unknownroute";
import { Puff} from "react-loader-spinner";
import Chatcontainer from "./chat/chatcontainer";
import Mapcontainer from "./Map/mapcontainer";
import Channels from "./chat/channels";
import { useLocation } from "react-router-dom";
import Prefpoints from "./Profile/prefpoints";
import ActionCable from 'actioncable';

const cable = ActionCable.createConsumer("ws://localhost:3000/cable")
const client_id = "645736260230-kig48kr4ae080nadjtf6tr7fr49re930.apps.googleusercontent.com"

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const {isFetching, data} = useQuery("user",authorize, {
    refetchOnWindowFocus: false,
    onSuccess: (data)=> {
      if (data.errors) {
        if (location.path !== "/login" || location.pathname !== "/signup") {
          navigate("/login")
        }
      }
      else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(onSuccess)
        }
        else {
          console.log("Location is not enabled")
        }
     
       function onSuccess({coords}) {
            position({lat:coords.latitude,lng:coords.longitude}).then(()=>console.log("position updated on backend"))
       }
      }
    }
  } )
  useEffect(()=> {
      function start() {
        gapi.client.init({
          client_id,
          scope:"profile"
        })
      }
    gapi.load('client:auth2',start);
  })


  if (isFetching) {
    return <Puff
    height="80"
    width="80"
    radisu={1}
    color="#4fa94d"
    ariaLabel="puff-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  }
  // console.log(data?.id)
  return (
    <div id="app">
      <Routes>
        <Route path = "/chat/:channel_id" element={<Chatcontainer id={data.id} cable={cable}/>}/>
        <Route path="/channels" element={<Channels/>}/>
        <Route path="/signup" element={<CreateAccount/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/map" element={<Mapcontainer coords={data.coords}/>}/>
        <Route path="/profile" element={<Ownprofile/>}/>
        <Route path = "/" element={<ProfileContainer/>}/>
        <Route path = "/points" element={<Prefpoints/>}/>
        <Route path = "*" element={<UnknownRoute/>}/>
      </Routes>
    </div>
  );
}

export default App;
