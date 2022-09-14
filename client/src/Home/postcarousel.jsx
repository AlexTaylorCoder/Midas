import { useState } from "react"
function PostCarousel({pic,gender,name,age,posts}) {
    const [currentPost,setCurrentPost] = useState(0)
    console.log(posts)

    function handlePostClick() {
        if (currentPost + 1 < posts.length) setCurrentPost(currentPost+1) 
    }
    console.log(posts)
    return (
        <div id = "post-carousel"> 
            <img src={posts[currentPost]?.image_url} width="500" height="650"/>
            <div className="image-post">
                    <div className = "image-post-header">
                    { currentPost === 0 && 
                        <>
                        <img src={pic} className="prof-pic"/>
                        <h1>{name}</h1>
                        <h1>{gender.toUpperCase()}</h1>
                        </>
                    }
                    </div>
            </div>
            <div className="image-post-footer">
            
                {[...Array(posts.length)].map((e,i) => <span className= {currentPost === i ? "image-dots-highlighted " : "image-dots"} index={i} key={i}/>)}
            </div>
        </div>
    )
}

export default PostCarousel