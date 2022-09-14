import Logout from "../Login/logout"
import PreferenceSelector from "./preferenceselector"
import RangeSlider from "./rangeslider"
import {RiEdit2Line} from 'react-icons/ri'
import { motion } from "framer-motion/dist/framer-motion";

import Heartloader from "../stylecomponents/heartloader"
import { useEffect, useRef, useState } from "react"
import { authorize } from "../api"
import { useQuery, useMutation } from "react-query"
import { newPost } from "../api"
import { Menu } from "../sidebar/menu";
import EditProfile from "./editprofile";

const placeholder_url = "http://www.acindar.com.ar/wp-content/uploads/woocommerce-placeholder-400x400.png"


function Ownprofile() {
    const postRef = useRef()
    const {isLoading,data} = useQuery("profile",authorize, {
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        <div id = "own-profile">
            <Heartloader/>
        </div>
    }
 
    // const [posts,setPosts] = useState([])
    const [previews,setPreviews] = useState([])
    const [images,setImages] = useState([]) 
    const [texts,setTexts] = useState([])
    const [current_id, setCurrentId] = useState(0)
    const {mutate} = useMutation(newPost)


    useEffect(()=> {
        return ()=> {
            // mutate({post_img:imageRef.current,text: })
        }
    },[])

    const [isOpen, setIsOpen] = useState(false)
    function handleEdit() {
        setIsOpen(true)
    }
    function handleClose() {
        setIsOpen(false)
    }


    function handleEditPost(e) {
        console.log(e.target.name)
    }
    // function handleNewPost() {
    //     mutate()
    // }
    function handleSubmit() {
        console.log(images)
    }

    function handleImage(e) {
        console.log(e.target)
        const file = e.target.files[0]
        // setCurrentId(e.target.name)
        if (5 - data.posts.length === previews.length) {
            setImages(images=>images.slice(0,images.length-1))
            setPreviews(previews=>previews.slice(0,previews.length-1))
        }
            setImages(images=>[...images,file])
            setPreviews(previews=>[...previews,URL.createObjectURL(file)])
        
    }

    function handleText(e) {
        const text = texts.map((text,index)=> {
            if (index === e.target.name) {
                return text + e.target.value
            }
            return e.target.value
        })
        setTexts(text)
        console.log(text)
    }

  
    return (
    <>
        <Menu/>
        <div id="own-profile">
            <div className="profile-header">
                <div className="profile-header-row">
                <img className="prof-pic" src={data?.image_url}/>   
                    <div className="profile-header-col">
                        <h2>{data?.first_name} {data?.last_name}</h2>
                        <p>{data?.email}</p>
                        <p>{data?.bio}</p>
                    </div>
                    <div className="profile-header-col">
                        <h2>{data?.age}</h2>
                        <h2>{data?.gender?.toUpperCase()}</h2>
                        <RiEdit2Line onClick={handleEdit}/>
                    </div>
                </div>
            </div>
            <div className="profile-posts">
                {data?.posts?.map(post=> 
                        <div className="post-cover">
                            <img key={post.id} id={post.id} style={{objectFit: "cover"}} width="400" height="400" src={post.image_url}/>
                            {post?.text ? <h3>{post?.text}</h3> : <input type='text' placeholder="Caption"/> }
                        </div>
                )}
                {Array.apply(null, {length: 5 - data?.posts?.length}).map((e,i)=>
                    <>
                    {/* <p>text</p> */}
                    <input onClick={(e)=>setCurrentId(()=>e.target.name)} key={i} name={i} onChange={handleImage} type="file" id={`post-upload-${i}`}/>
                        <label htmlFor={`post-upload-${i}`}>
                            <div className="post-cover" width="400" height="400">
                                    <img width="400" height="400" style={{objectFit: "cover"}} src={ previews[i] ? previews[i] : placeholder_url}/>
                                    <input name={i} onChange={handleText} value={texts[i]} type='text' placeholder="Caption"/>
                            </div>
                        </label>
                    </>
                )}
          </div>
          <button style= {{width:"60px",height:"30px"}}onClick={handleSubmit}>Submit</button>

            <Logout/>
            <RangeSlider upper_range={data?.upper_range}/>
            <PreferenceSelector prefGender = {data?.pref_gender} id={data?.id} />
        </div>

        <EditProfile data={data} isOpen={isOpen} handleClose={handleClose}/>
        </>
    )
}

export default Ownprofile