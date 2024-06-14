import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const AdminRouter = () => {
    const isAdmin = useSelector(state => state.session.user?.role)
    return isAdmin === "admin" ? <Outlet /> : <Navigate to="/" />
}


export default AdminRouter