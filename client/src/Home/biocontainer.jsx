import { useState } from "react"


function BioContainer({bio}) {
    const [expand,setExpand] = useState(false)
    return (
        <div id="bio-container">
            <p>{bio}</p>
            <button onClick={()=>setExpand(true)}>awrawrawrt</button>
        </div>
    )
}

export default BioContainer