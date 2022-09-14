import * as React from "react";
import { motion } from "framer-motion/dist/framer-motion";
import {AiFillHome} from "react-icons/ai"
import {BsPersonFill, BsChatFill} from "react-icons/bs"
import {IoMdPin} from "react-icons/io"
import {GiBrain} from "react-icons/gi"
import {useNavigate } from "react-router-dom";
import { logout } from "../api";
import Logout from "../Login/logout";
import {RiLogoutCircleLine} from "react-icons/ri"

import {useMutation, useQueryClient } from "react-query"
import { ThreeDots } from "react-loader-spinner";


const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF","#FF5733"];

export const MenuItem = ({ i }) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const style = { border: `2px solid ${colors[i]}` };

    const {mutate, isLoading} = useMutation(logout, {
        onSuccess: ()=>{navigate("/login"); console.log("Logout success!"); queryClient.removeQueries()},
        onError: ()=>{console.log("Failed to logout!")}

    })

  function handleClick() {
    if (i === 0) {
        navigate("/")
    }
    else if (i === 1) {
        navigate("/profile")
    }
    else if (i === 2) {
        navigate("/map")
    }
    else if (i === 3) {
        navigate("/channels")
    }
    else if (i === 4) {
        navigate("/points")
    }
    else if (i===5) {
        mutate()
    }
  }
  return (
    <motion.li onClick={handleClick}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder" style={style}>
        <h1>
        {i === 0 && <AiFillHome style={{WebkitTextStroke:"2px solid #BBA14F"}}/>}
        {i === 1 && <BsPersonFill/>}
        {i === 2 && <IoMdPin/>}
        {i === 3 && <BsChatFill/>}
        {i === 4 && <GiBrain/>}
        {i === 5 && (isLoading ? <RiLogoutCircleLine/> : <Logout/>)}
        </h1>
      </div>
      <div className="text-placeholder" style={style}>
        <h3>
            {i === 0  && "Home"}
            {i === 1  && "Profile"}
            {i === 2  && "Map"}
            {i === 3  && "Chats"}
            {i === 4  && "Points"}
            {i === 5 && (isLoading ? <ThreeDots color="pink"/> : "Logout") }
        </h3>
      </div>
    </motion.li>
  );
};
