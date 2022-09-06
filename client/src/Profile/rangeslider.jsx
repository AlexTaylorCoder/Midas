import { useEffect, useRef, useState } from "react"
import { useMutation } from "react-query"
import { updateprofile } from "../api"

function RangeSlider({upper_range}) {
    const [slider,setSlider] = useState(upper_range)

    useEffect(()=> {
        setSlider(upper_range)
    },[])
    const {mutate} = useMutation(updateprofile)
    const rangeRef = useRef()
    useEffect(()=> {

        return ()=> {

            if (rangeRef.current !== upper_range) mutate({upper_range: rangeRef.current})
        }
    },[])

    function handleSlider(e) {
        setSlider(e.target.value)
        rangeRef.current = e.target.value
    }

    return (
        <div id = "range-slider">
            <input value={slider} step="10" onChange={handleSlider} type="range"/>
            <p>{slider}</p>
        </div>
    )
}

export default RangeSlider