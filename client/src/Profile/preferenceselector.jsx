import { useState, useEffect, useRef } from "react"
import {BsGenderMale, BsGenderFemale} from 'react-icons/bs'
import {useMutation} from "react-query"
import { updateprofile } from "../api"
import {useQueryClient} from "react-query"

function PreferenceSelector({prefGender}) {
    const queryClient = useQueryClient()
    const genderRef = useRef()
    const [onClick, setOnClick] = useState(false)
    const {mutate} = useMutation(updateprofile)

    useEffect(()=> {
        // if (prefGender === "m") {
        //     setOnClick(true)
        // }
        return ()=> {
            const gender = genderRef.current ? "m" : "f"
            if (prefGender !== gender) {
                mutate({pref_gender: gender})
            }
        }
    },[])


    function handleClick() {
        setOnClick(!onClick)
        genderRef.current = !onClick
    }
    return (
        <div id = "pref-selector">
            <input type="checkbox" id="switch" /> 
            <label onClick={handleClick} htmlFor="switch">
                <p>
                    <BsGenderFemale/>
                    <BsGenderMale/>
                </p>
            </label>
        </div>
    )
}

export default PreferenceSelector