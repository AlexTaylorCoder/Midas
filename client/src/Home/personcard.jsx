import PostCarousel from "./postcarousel"
import BioContainer from "./biocontainer"
import { motion, useTransform, useMotionValue, useAnimation } from "framer-motion/dist/framer-motion"
function PersonCard({index,user}) {

    const motionValue = useMotionValue(0)
    const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);

    const opacityValue = useTransform(
        motionValue,
        [-200, -150, 0, 150, 200],
        [0, 1, 1, 1, 0]
    )

    // const animControls = useAnimation()

    return (
        
        <motion.div drag="x" className="person-card" 
        style={{zIndex:index}}
        x = {motionValue}
        rotate={rotateValue}
        opacity={opacityValue}
        dragConstraints={{left:-500,right:500}}
        >
            <motion.div animate={{x:100}}/>
            <PostCarousel posts={user.posts} age={user.age} pic={user.image_url} gender={user.gender} name={user.first_name}/>
            <BioContainer bio={user.bio}/>
        </motion.div>
    )
}

export default PersonCard