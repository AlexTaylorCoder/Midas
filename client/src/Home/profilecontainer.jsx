import Logout from "../Login/logout"
import { useState } from "react"
import PersonCard from "./personcard"
import { useQuery} from "react-query"
import { matches } from "../api"
import { InfinitySpin } from "react-loader-spinner"

function ProfileContainer() {
  const [cardsList,setCardsList] = useState([])

    const {isLoading,isFetching} = useQuery("matches",matches, {
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

  if (isLoading) {
    return (
        <InfinitySpin/>
    )
  }

  function removeCard() {
    setCardsList([...cardsList.slice(0)])
  }

    const cardList = cardsList?.map((user,index)=><PersonCard removeCard={removeCard} index={index} id={user.id} key={user.id} user={user}/>)

    return (
        <div id = "profile-container">
              {cardList}
            <Logout/>
        </div>
    )
}


export default ProfileContainer