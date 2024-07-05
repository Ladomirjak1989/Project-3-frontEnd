import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";


const PrivateRouter = ()=>{
const token = useSelector(state=>state.session.token)
return token ? <Outlet/> : <Navigate to="/login"/>
}


export default PrivateRouter