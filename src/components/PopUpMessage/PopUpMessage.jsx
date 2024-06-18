import React from 'react'
import { useSelector } from 'react-redux'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const PopUpMessage = () => {
    const popUp = useSelector(state=>state.popUp.popUp)
    return (
        <div className='absolute top-0 left-[5%] bg-white w-[400px] h-[70px] p-5 text-size[30px]'>
            <IoIosCheckmarkCircleOutline />{popUp}</div>
    )
}

export default PopUpMessage