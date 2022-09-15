import { useState } from "react"
import {AiOutlineArrowRight, AiOutlineArrowLeft} from "react-icons/ai"

function PostCarousel({pic,gender,name,age,posts}) {
    const [currentPost,setCurrentPost] = useState(0)
    console.log(posts)

    // function handlePostClick() {
    //     if (currentPost + 1 < posts.length) setCurrentPost(currentPost+1) 
    // }
    console.log(currentPost)
    console.log(posts)
    return (
        <div id = "post-carousel"> 
            <img alt={posts[currentPost]?.image_url} src={posts[currentPost]?.image_url} width="500" height="650"/>
            <div className="image-post">
                    <div className = "image-post-header">
                    { currentPost === 0 && 
                        <>
                        <img style={{opacity:.9}} alt={pic} src={pic} className="prof-pic"/>
                        <h1>{name}</h1>
                        <h1>{gender.toUpperCase()}</h1>
                        </>
                    }
                    </div>
            </div>
            <div className="image-post-arrows">
                            <h1 className= {currentPost === 0 ? "hide" : undefined}><AiOutlineArrowLeft onClick={()=>setCurrentPost(currentPost-1)}/></h1>
                            <h1 className= {currentPost === posts.length-1 ? "hide" : undefined}><AiOutlineArrowRight onClick={()=>setCurrentPost(currentPost+1)}/></h1>
                    </div>
            <div className="image-post-footer">
            
                {posts.length !== 1 && [...Array(posts.length)].map((e,i) => <span className= {currentPost === i ? "image-dots-highlighted " : "image-dots"} index={i} key={i}/>)}
            </div>
        </div>
    )
}

export default PostCarousel