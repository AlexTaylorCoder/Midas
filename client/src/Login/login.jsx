import { useState } from "react";
import GoogleInfo from "./googleinfo";
import { LoginDefault } from "../api";
import { useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";


const phoneReg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login() {
    const navigate = useNavigate()
    const [input,setInput] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)

    const {mutate, isLoading} = useMutation(LoginDefault,{
        onSuccess: (data)=> {
            if (data.error || data.errors) {

                setError(data.errors ?? data.error)
                console.log(data)
                navigate("/login")
            }
            else {
                navigate("/")
            }
        }
    })

    function googleinfo(info) {
        console.log(info)

        setInput(info.email)
        setPassword(info.googleId)
        mutate({googleId:info.googleId})
    }
    function onSubmit(e) {  
        e.preventDefault()
        let body = {}

        if (phoneReg.test(input)) {
            body.phone = input
        }
        else if (emailReg.test(input)) {
            body.email = input
        }
        else {
            setError("Invalid Input")
            return
        }
        body.password = password
        
        mutate(body)
    }
    return (

        //  background: linear-gradient(to right, #0f2027, #203a43, #2c5364); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        <div id="login">
            <motion.form className="login-form" onSubmit={onSubmit} 
            animate={{
                opacity: ["0","1"],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            >
        
                {isLoading && <span>Loading...</span>}
                <span>{error}</span>
                <h1 className="logo-css">
                 {/* <motion.img 
                initial={{y:"400px", rotate:90}}
                 animate={{
                    y:"0px",
                    rotate: 0
                 }}
                 height="80" width="80" src="https://cmagazine.org/wp-content/uploads/2021/04/IMG_7361-900x738.png"/> 
                    <div className="logo-text">
                        <div className="main-text">
                            <h1>M</h1>
                        </div>
                    </div> */}
                    <h2>Midas</h2>
                 </h1>
                <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Email or Phone Number" type="text"/>
                <input value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} type="password"/>
                <input className="login-button" value="Log In" type="submit"/>
                <GoogleInfo googleinfo={googleinfo} />
                <NavLink style={{color:"#FFD700"}} to="/signup">Signup</NavLink>
            </motion.form>
        </div>
    )
}

export default Login