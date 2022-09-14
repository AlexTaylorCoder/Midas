import { useState } from "react"
import ReactModal from "react-modal"
import { useMutation } from "react-query"
import { updateprofile } from "../api"


function EditProfile({data, isOpen, handleClose}) {

    const {mutate,isLoading} = useMutation(updateprofile, {
        onSuccess: ()=> {handleClose()}
    })

    const [preview,setPreview] = useState("")

    // const [newProf,setNewProf] = useState(false)
    // const [first_name, setFirstName] = useState("")
    // const [last_name,setLastName] = useState("")
    // const [email,setEmail] = useState("")
    // const [password,setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")
    // const [phone,setPhone] = useState("")
    // const [birthday,setBirthday] = useState("")
    // const [profLink,setProfLink] = useState()
    const [image,setImage] = useState()
    // const [post_img, setPostImage] = useState()
    // const [gender,setGender] = useState("")
    // const [prefGender,setPrefGender] = useState("")

    // const [points,setPoints] = useState("")

    // const [bio,setBio] = useState("")
    

    function handleImageChange(e) {
        const file = e.target.files[0]
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }
    function handleSubmit(e) {
        e.preventDefault()
        mutate()
    }
    return ( 
        <ReactModal className="modal-background" isOpen={isOpen} onRequestClose={handleClose}>
          <div className="center">
                <form onSubmit={handleSubmit} className="edit-profile">
                <h1>Edit profile</h1>
                    <label>First Name<input type="text" placeholder={data?.first_name} /></label>
                    <label>Email <input type="email" placeholder={data?.email} /></label>
                    <label>Bio <input type="text" placeholder={data?.bio} /></label>
                    <label>Phone <input type="phone"/></label>
                    <label>Gender <input type="text" placeholder={data?.gender.toUpperCase()} /></label>
                    <label htmlFor="edit-profile-pic">
                        <img className="prof-pic" width="100" height="100" src={preview || data?.image_url}/>
                    </label>
                    <input onChange={handleImageChange} id="edit-profile-pic" type="file"/>
                    <input value="Change" type="submit"/>
                    <button onClick={handleClose}>Close</button>
                </form>
            </div>
        </ReactModal>
    )
}

export default EditProfile