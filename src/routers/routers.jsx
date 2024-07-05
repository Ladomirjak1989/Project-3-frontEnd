import { createBrowserRouter, Outlet } from "react-router-dom";
import React from 'react';
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
import AdminRouter from "./AdminRouter";
import FlightDetails from "../Pages/FlightDetails/FlightDetails";
import CreateFlightPage from "../Pages/CreateFlightPage/CreateFlightPage";
import VacationPage from "../Pages/VacationPage/VacationPage";
import UpdatedFlightPage from "../Pages/UpdatedFlightPage/UpdatedFlightPage";
import VacationDetails from "../Pages/VacationDetails/VacationDetails";
import CreateVacationPage from "../Pages/CreateVacationPage/CreateVacationPage";
import UpdatedVacationPage from "../Pages/UpDateVacation/UpDateVacation";
import ShortListPage from "../Pages/ShortListPage/ShortListPage";
import HotelDetailsPage from "../Pages/HotelDetailsPage/HotelDetailsPage";
import HotelsPage from "../Pages/HotelsPage/HotelsPage";
import CruisesDetailsPage from "../Pages/CruisesDetailsPage/CruisesDetailsPage";
import BookingPage from "../Pages/BookingPage/BookingPage";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import CompletionPage from "../Pages/CompletionPage/CompletionPage";
import ContactPage from "../Pages/ContactPage/ContactPage";
import TermsAndConditionsPage from "../Pages/TermsAndConditionsPage/TermsAndConditionsPage";
import CartPage from "../Pages/CartPage/CartPage";
import OrderPage from "../Pages/OrderPage/OrderPage";
import GoToTop from "../components/GoToTop/GoToTop";




const router = createBrowserRouter([

    {
        element: (
            <>
                <Header />
                <GoToTop />
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
            { path: "/city-details/:id", element: <CityDetailsPage /> },
            { path: "/cruises", element: <CruisesPage /> },
            { path: "/cruises/:id", element: <CruisesDetailsPage /> },
            { path: "/hotels", element: <HotelsPage /> },
            { path: "/hotels/:id", element: <HotelDetailsPage /> },
            { path: "/flights/:id", element: <FlightDetails /> },
            { path: "/vacations", element: <VacationPage /> },
            { path: "/vacations/:id", element: <VacationDetails /> },
            { path: "/short-list", element: <ShortListPage /> },
            { path: "/booking", element: <BookingPage /> },
            { path: "/payment", element: <PaymentPage /> },
            { path: "/completion", element: <CompletionPage /> },
            { path: "/contact", element: <ContactPage /> },
            { path: "/terms", element: <TermsAndConditionsPage /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/order", element: <OrderPage /> },

            { path: "*", element: <NotFoundPage /> },



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





