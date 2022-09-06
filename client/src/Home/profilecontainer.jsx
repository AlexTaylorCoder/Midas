import Logout from "../Login/logout"
import Navbar from "./navbar"
import { useState } from "react"
import { swipe } from "../api"
import PersonCard from "./personcard"
import { useQuery, useMutation } from "react-query"
import { matches } from "../api"
import { InfinitySpin } from "react-loader-spinner"

function ProfileContainer() {
  const [cardsList,setCardsList] = useState([])

    const {isLoading, data} = useQuery("matches",matches, {
    onSuccess: (data)=> {
      console.log(data)
      if (data.errors) {
        console.log("Failed to fetch batch")
      }
      else {
        setCardsList(data)
      }
    }
  })

  const {mutate} = useMutation(swipe, {
    onSuccess: ()=> {
      console.log("Success")
    }
  })
  if (isLoading) {
    return (
        <InfinitySpin/>
    )
  }

  function handlePass() {
    const first_card = cardsList[0]
    mutate({user_id: first_card.id ,like:false})
    setCardsList([...cardsList.slice(1)])
  }
  function handleLike() {
    const first_card = cardsList[0]

    mutate({user_id: first_card.id ,like:true})
    setCardsList([...cardsList.slice(1)])
  }

    const cardList = cardsList?.map((user,index)=><PersonCard index={index} key={user.id} user={user}/>)

    return (
        <div id = "profile-container">
          <div className="arrow-border">
            <a onClick={handlePass} className="arr arr-prev"></a>
              {cardList}
            <a onClick={handleLike} className="arr arr-next"></a>
          </div>
            <Logout/>
        </div>
    )
}


export default ProfileContainer