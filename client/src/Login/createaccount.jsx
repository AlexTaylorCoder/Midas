import { useState, useEffect } from "react"
import * as faceapi from "face-api.js";
import { useMutation } from "react-query";
import { createAccount } from "../api";
import { BsPlusSquareFill} from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import GoogleInfo from "./googleinfo";
import {analyzeimage} from "../analyzeimage"
import { Dna } from "react-loader-spinner";
import { motion } from "framer-motion/dist/framer-motion";

const placeholder = "https://i1.wp.com/ggrmlawfirm.com/wp-content/uploads/avatar-placeholder.png?fit=256%2C256&ssl=1"
const postplaceholder = "https://www.ieee.org/content/dam/ieee-org/ieee/web/org/about/dataport-analysis-icon.png"
// import { TurnFile } from "../turnfile";

//when create account send image to backend to save. Then send back url which 
//detects points and send back again to save to back points
function CreateAccount() {
    const navigate = useNavigate()
    const [currentPage,setCurrentPage] = useState(0)
    const [preview,setPreview] = useState(placeholder)
    const [postPlaceholderPreview, setPostPlaceholderPreview] = useState(postplaceholder)

    const [first_name, setFirstName] = useState("")
    const [last_name,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [birthday,setBirthday] = useState("")
    const [profLink,setProfLink] = useState()
    const [image,setImage] = useState()
    const [post_img, setPostImage] = useState()
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
    
    function handleImage(e) {
        const file = e.target.files[0]
        setPostImage(file)
        setPostPlaceholderPreview(URL.createObjectURL(file))
        analyzeimage(file).then(data=> {
            if (data) setPoints(data)
            else {setErrorCreation("Not a valid image. Try getting closer to the camera")}
        })
    }

    function handleChangeProf(e) {
        const file = e.target.files[0]
        console.log(file)
        setImage(file)
        setPreview(URL.createObjectURL(file))
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
        <motion.div id = "create-account"
        animate={{
            backgroundColor: ['#000000','#BBA14F','#000']
        }}
        >
                <div className="center-row-flex">
                {/* {currentPage !== 0 && */}
                        <div className={`arrow-rotate ${currentPage===0 && "hide"}`}>
                            <div onClick={()=>setCurrentPage(currentPage-1)} className="arrow">
                                <div className="arrow-top"></div>
                                <div className="arrow-bottom"></div>
                            </div>
                        </div>
                    {/* } */}
                <motion.form onSubmit={handleSubmit} className="inner-form"
                animate={{
                opacity: ["0","1"],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                backgroundColor: ['#000000','#F5F5F5']
            }}
                >
                    <input id="create-prof-pic" type="file" onChange={handleChangeProf}/>
                    <label htmlFor="create-prof-pic">
                        <img className="prof-pic" src={preview}/>
                    </label>

                    {currentPage === 0 &&
                        <>
                            <h3 style={{color:"red"}}>{errorCreation}</h3>
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

                            <input required onChange={handleImage} type="file" id="image-upload"/>
                                <label id="image-upload-style" htmlFor = "image-upload">
                                   <img style={{objectFit:"cover",borderRadius:"10px"}}width="300" height="200" src={postPlaceholderPreview}/>
                                </label>
                        </>
                    }
                    
                    {currentPage === 3 &&               
                    //Dropdown menu with recommended tags
                        <>
                        
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
                    <NavLink to={"/login"}>Login</NavLink>
                    </motion.form>
                    {/* <div className={`arrow-rotate ${currentPage===0 && "hide"}`}> */}
                    <div onClick={()=>setCurrentPage(currentPage+1)} className={`arrow ${currentPage >= 3 && "hide"}`}>
                        <div className="arrow-top"></div>
                        <div className="arrow-bottom"></div>
                    </div>
                </div>
        </motion.div>  
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

