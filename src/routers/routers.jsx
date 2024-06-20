import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HomePage from "../Pages/HomePage/HomePage";
import PrivateRouter from "./PrivateRouter";
import Profile from "../Pages/Profile/Profile";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignupPage from "../Pages/SignUp/SignUp";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import AboutPage from "../Pages/AboutPage/AboutPage";
import AttractionPage from "../Pages/AttractionPage/AttractionPage";
import CityPage from "../Pages/CityPage/CityPage";
import CityDetailsPage from "../Pages/CityDetailsPage/CityDetailsPage";
import CruisesPage from "../Pages/CruisesPage/CruisesPage";
import HotelsPage from "../Pages/HotelsPage/HotelsPage";
import AdminRouter from "./AdminRouter";
import Searchbar from "../components/Searchbar/Searchbar";
import FlightDetails from "../Pages/FlightDetails/FlightDetails";
import CreateFlightPage from "../Pages/CreateFlightPage/CreateFlightPage";
import VacationPage from "../Pages/VacationPage/VacationPage";
import UpdatedFlightPage from "../Pages/UpdatedFlightPage/UpdatedFlightPage";
import VacationDetails from "../Pages/VacationDetails/VacationDetails";
import CreateVacationPage from "../Pages/CreateVacationPage/CreateVacationPage";
import UpdatedVacationPage from "../Pages/UpDateVacation/UpDateVacation";


const router = createBrowserRouter([

    {
        element: (
            <><Header />
            <Searchbar/>
                <Outlet />
                <Footer />
            </>
        ),
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
            { path: "/flights", element: <DashboardPage /> },
            { path: "/about", element: <AboutPage /> },
            { path: "/attractions", element: <AttractionPage /> },
            { path: "/cities", element: <CityPage /> },
            { path: "/citydetails", element: <CityDetailsPage /> },
            { path: "/cruises", element: <CruisesPage /> },
            { path: "/hotels", element: <HotelsPage /> },
            { path: "/flights/:id", element: <FlightDetails /> },
            { path: "/vacations", element: <VacationPage /> },
            { path: "/vacations/:id", element: <VacationDetails /> },


            {
                element: <PrivateRouter />,
                children: [
                    { path: "/profile", element: <Profile /> }
                ]
            },
            {
                element: <AdminRouter />,
                children: [
                    { path: "/flights/flight-new", element: <CreateFlightPage /> },
                    { path: "/flights/flight-updated/:id", element: <UpdatedFlightPage /> },
                    
                    { path: "/vacations/vacation-new", element: <CreateVacationPage /> },
                    { path: "/vacations/vacation-updated/:id", element: <UpdatedVacationPage /> },
            
                ]
            },
            { path: "*", element: <NotFoundPage /> }
        ]
    }
])

export default router