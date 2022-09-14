import Logout from "../Login/logout"
import { useState } from "react"
import PersonCard from "./personcard"
import { useQuery} from "react-query"
import { matches } from "../api"
import { Triangle } from "react-loader-spinner"
import { motion } from "framer-motion/dist/framer-motion";
import { Menu } from "../sidebar/menu"


function ProfileContainer() {

  const [cardDeck,setCardDeck] = useState([])
    const {isLoading,data, isFetching} = useQuery("matches",matches, {
    onSuccess: (data)=> {
      console.log(data)
      if (data.errors) {
        console.log("Failed to fetch batch")
      }
      else {
        setCardDeck(data)
      }
    }
  })


  if (isLoading) {
    return (
      <div id = "profile-container">
        <Triangle
        height="500"
        width="500"
        color="#ADD8E6"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        />
    </div>
    )
  }

  // function removeCard() {
  //   setCardsList([...data.slice(0)])
  // }

    const cardList = cardDeck?.map((user,index)=><PersonCard removeCard={removeCard} index={index} id={user.id} key={user.id} user={user}/>)

    function removeCard() {
      setCardDeck(cards=>[...cards.slice(0,cardDeck.length-1)])
    }
    return (
      <>
      <Menu/>
        <motion.div id = "profile-container"
        >
              {cardList}
            <Logout/>
        </motion.div>
      </>
    )
}


export default ProfileContainer