import CreateAccount from "./Login/createaccount";
import ProfileContainer from "./Home/profilecontainer";
import Logout from "./Login/logout";
import Login from "./Login/login";
import { position } from "./api";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { authorize } from "./api";
import { useQuery } from "react-query";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Ownprofile from "./Profile/ownprofile";
import UnknownRoute from "./stylecomponents/unknownroute";
import { Puff, Rings } from "react-loader-spinner";
import Chatcontainer from "./chat/chatcontainer";
import Navbar from "./Home/navbar";
import Mapcontainer from "./Map/mapcontainer";
import { matches } from "./api";
import { useLocation } from "react-router-dom";

const client_id = "645736260230-kig48kr4ae080nadjtf6tr7fr49re930.apps.googleusercontent.com"

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const {isLoading, data} = useQuery("user",authorize, {
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


  if (isLoading) {
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

  return (
    <div id="app">
      <Navbar/>
      <Routes>
        <Route path="/chats" element={<Chatcontainer/>}/>
        <Route path="/signup" element={<CreateAccount/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/map" element={<Mapcontainer coords={data.coords}/>}/>
        <Route path="/profile" element={<Ownprofile user={data}/>}/>
        <Route path = "/" element={<ProfileContainer/>}/>
        <Route path = "*" element={<UnknownRoute/>}/>
      </Routes>
    </div>
  );
}

export default App;
