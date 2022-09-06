import { useState } from "react";
import GoogleInfo from "./googleinfo";
import { LoginDefault } from "../api";
import { useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";

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
        <div id="login">
            <form className="login-form" onSubmit={onSubmit}>
                {isLoading && <span>Loading...</span>}
                <span>{error}</span>
                <h1> Logo </h1>
                <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Email or Phone Number" type="text"/>
                <input value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} type="password"/>
                <input className="login-button" value="Log In" type="submit"/>
                <GoogleInfo googleinfo={googleinfo} />
                <NavLink to="/signup">Signup</NavLink>
            </form>
        </div>
    )
}

export default Login