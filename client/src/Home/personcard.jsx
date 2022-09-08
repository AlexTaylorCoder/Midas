import PostCarousel from "./postcarousel"
import BioContainer from "./biocontainer"
import { swipe } from "../api"
import { useMutation } from "react-query"
import { motion, useTransform, useMotionValue, useAnimation} from "framer-motion/dist/framer-motion"
import { useState } from "react"
function PersonCard({index,user,id,removeCard}) {
    const animControls = useAnimation()
    const {mutate} = useMutation(swipe, {
        onSuccess: ()=> {
          console.log("Success")
        }
      })

    const motionValue = useMotionValue(0)
    const [dragCenter, setDragCenter] = useState(true)
    const rotateValue = useTransform(
        motionValue, 
        [-300, 300], 
        [-50, 50],
        )

    const opacityValue = useTransform(
        motionValue,
        [-300, -150, 0, 150, 300],
        [0, .9, 1, .9, 0]
    )

    function handleDragEnd(event,info) {
        if (info.offset.x > 250) {
            mutate({user_id: id,like:true})
            setDragCenter(false)
            removeCard()
        }
        else if (info.offset.x < -250) {
            mutate({user_id: id,like:false})
            setDragCenter(false)
            removeCard()
        }
        else {
            setDragCenter(true)
        }
    }

    console.log(dragCenter)

    return (
        
        <motion.div drag="x" className="person-card" 
        style={{
            zIndex:index,
            x: motionValue,
            rotate: rotateValue,
            opacity:opacityValue
        }}
        dragSnapToOrigin={dragCenter}
        dragElastic={0.8}
        dragConstraints={{left:-1000,right:1000}}
        onDragEnd={handleDragEnd}
        >
            <motion.div animate={{x:100}}/>
            <PostCarousel posts={user.posts} age={user.age} pic={user.image_url} gender={user.gender} name={user.first_name}/>
            <BioContainer bio={user.bio}/>
        </motion.div>
    )
}

export default PersonCard