import { useState, useEffect } from "react"
import * as faceapi from "face-api.js";
import { useMutation } from "react-query";
import { createAccount } from "../api";
import { BsPlusSquareFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import GoogleInfo from "./googleinfo";
import {analyzeimage} from "../analyzeimage"
import { Dna } from "react-loader-spinner";
// import { TurnFile } from "../turnfile";

//when create account send image to backend to save. Then send back url which 
//detects points and send back again to save to back points
function CreateAccount() {
    const navigate = useNavigate()
    const [currentPage,setCurrentPage] = useState(0)

    const [first_name, setFirstName] = useState("aegaesg")
    const [last_name,setLastName] = useState("azsfzs")
    const [email,setEmail] = useState("zsfz")
    const [password,setPassword] = useState("123")
    const [confirmPassword, setConfirmPassword] = useState("123")
    const [phone,setPhone] = useState("124125")
    const [birthday,setBirthday] = useState("2022-09-08")
    const [profLink,setProfLink] = useState(null)
    const [image,setImage] = useState(null)
    const [post_img, setPostImage] = useState(null)
    const [gender,setGender] = useState("m")
    const [prefGender,setPrefGender] = useState("m")

    const [points,setPoints] = useState("")

    const [newProf,setNewProf] = useState(false)
    const [bio,setBio] = useState("")
    const [googleId,setGoogleId] = useState("")

    const [errorCreation,setErrorCreation] = useState("")


    useEffect(()=>{
        const loadModals = () => {
          Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/weights"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/weights"),
          ])
        }
        loadModals();
      },[])


    const {mutate, isLoading} = useMutation(createAccount, {
        onSuccess: (data)=> {
            if (data.errors) {
                console.log(data.errors)
            }
            else {
                navigate("/")
            }
        }
    })

    function googleinfo(info) {
        setGoogleId(info.googleId)
        setEmail(info.email)
        setFirstName(info.givenName)
        setLastName(info.familyName)
        setProfLink(info.imageUrl)
        setImage(info.imageUrl)
    }
    function handleImage(e) {
        const file = e.target.files[0]
        setPostImage(file)
        analyzeimage(file).then(data=> {
            if (data) setPoints(data)
            else {setErrorCreation("Not a valid image. Try getting closer to the camera")}
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (password !== confirmPassword) {
            setErrorCreation("Passwords don't match!")
            setCurrentPage(0)
            return 
        }
        console.log(gender,prefGender)
        if (first_name && email && last_name && password && confirmPassword && birthday && gender && prefGender) {
            const formData = new FormData()

            if (!image) setImage(profLink)

            formData.append('first_name',first_name)
            formData.append('last_name',last_name)
            formData.append('password',password)
            formData.append('email',email)
            formData.append('phone',phone)
            formData.append('birthday',birthday)
            formData.append('bio',bio)
            formData.append('image',image)
            formData.append('post_img',post_img)
            formData.append('avg_points',points)
            formData.append('pref_gender',prefGender)
            formData.append('gender',gender)
            
           mutate(formData)
        }
        else {
            setCurrentPage(0)
            setErrorCreation("Please fill all fields")
        }
    }

    if (isLoading) {
        return <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    }
   
    return (
        <div id = "create-account">
                <div className="center-row-flex">
                {currentPage !== 0 &&
                        <div className="arrow-rotate">
                            <div onClick={()=>setCurrentPage(currentPage-1)} className="arrow">
                                <div className="arrow-top"></div>
                                <div className="arrow-bottom"></div>
                            </div>
                        </div>
                    }
                <form onSubmit={handleSubmit} className="inner-form">
                    {currentPage === 0 &&
                        <>
                            <h3 style={{color:"red"}}>{errorCreation}</h3>
                            <div className="circle" onClick={()=>setNewProf(true)}> { newProf ? 
                                <>
                                <input required onChange={(e)=>setImage(e.target.files[0])} type="file" id="image-upload"/>
                                <label id="image-upload-style" htmlFor = "image-upload">
                                    <h2> Upload Image </h2>
                                    <BsPlusSquareFill id="icon-upload-style"/>
                                </label>
                                </>
                                : 
                                <img src={profLink}/> }
                            </div>
                            <input onChange={(e)=>setFirstName(e.target.value)} value={first_name} required placeholder="First name" type="text"/>
                            <input onChange={(e)=>setLastName(e.target.value)} value={last_name} required placeholder="Last name" type="text"/>
                            <input onChange={(e)=>setEmail(e.target.value)} value={email} required placeholder="Email" type="email"/> 
                            <GoogleInfo googleinfo={googleinfo}/>
                        </>
                    }
                    {currentPage === 1 &&
                        <>
                            <input onChange={(e)=>setBirthday(e.target.value)} value={birthday} required placeholder="Birthdate" type="date"/> 
                            <input onChange={(e)=>setPhone(e.target.value)} value={phone} required placeholder="Mobile Phone" type="phone"/> 
                            <input onChange={(e)=>setPassword(e.target.value)} value={password} required placeholder="Password" type="password"/> 
                            <input onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} required placeholder="Confirm Password" type="password"/> 

                        </>
                    }

                    {currentPage === 2 &&
                        <>
                        <div className="circle"> <h2> Images </h2> </div>
                            <input required onChange={handleImage} type="file" id="image-upload"/>
                                <label id="image-upload-style" htmlFor = "image-upload">
                                    <h2> Upload Image </h2>
                                    <BsPlusSquareFill id="icon-upload-style"/>
                                </label>
                        </>
                    }
                    
                    {currentPage === 3 &&               
                    //Dropdown menu with recommended tags
                        <>
                        <div className="circle"> <h2> Bio </h2> </div>
                            <h2>Gender</h2>
                            <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                                <option value="o">Other</option>
                            </select>
                            <h2>Preffered Gender</h2>
                            <select value={prefGender} onChange={(e)=>setPrefGender(e.target.value)}>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                                <option value="o">Other</option>
                            </select>
                            <input placeholder="Say a little about yourself" onChange={(e)=>setBio(e.target.value)} value={bio} type="text"/>
                            <input type="submit" value="Signup"/>
                        </>
                    }
                    </form>

                    { currentPage < 3 &&
                    <div onClick={()=>setCurrentPage(currentPage+1)} className="arrow">
                        <div className="arrow-top"></div>
                        <div className="arrow-bottom"></div>
                    </div>
                    }
                </div>
        </div>  
    )
}

// function GoogleInfo({googleinfo}) {
//     function onSuccess(res) {
//         googleinfo(res.profileObj)
//     }

//     function onFailure(res) {
//         console.log("failed",res)
//     }

//     return (
//         <div id = "Login">
//             <GoogleLogin 
//                 client_id = {client_id}
//                 buttonText = "Login"
//                 onSuccess={onSuccess}  
//                 onFailure={onFailure}
//                 cookiePolicy={'single_host_origin'}
//                 isSignedIn={true}
//             />
//         </div>
//     )
// }

export default CreateAccount

