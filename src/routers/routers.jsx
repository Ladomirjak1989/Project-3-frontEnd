import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import React from 'react';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HomePage from "../Pages/HomePage/HomePage";
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
import PayToWay from "../Pages/PayToWay/PayToWay";
import CookieNoticePage from "../Pages/CookieNoticePage/CookieNoticePage";
import AttractionDetailsPage from "../Pages/AttractionDetailsPage/AttractionDetailsPage";
import HolidayOffersPage from "../Pages/HolidayOffersPage/HolidayOffersPage";
import Policy from "../Pages/Policy/Policy";
import Privacy from "../Pages/Privacy/Privacy";
import DeleteInstructionUser from "../Pages/Delete/DeleteInstructionUser";
import ConfirmEmailPage from "../Pages/ConfirmEmailPage/ConfirmEmailPage";
import FlightDetailsAdmin from '../Pages/FlightDetailsAdmin/FlightDetailsAdmin'
import UpdatedFlightAdmin from "../Pages/UpdatedFlightAdmin/UpdatedFlightAdmin";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";


const DEFAULT_LANGUAGE = "en";

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
            { path: "/", element: <Navigate to={`/${DEFAULT_LANGUAGE}/`} replace /> },
            { path: "/:lang/", element: <HomePage /> },
            { path: "/:lang/flights", element: <DashboardPage /> },
            { path: "/:lang/about", element: <AboutPage /> },
            { path: "/:lang/attractions", element: <AttractionPage /> },
            { path: "/:lang/attractions/:id", element: <AttractionDetailsPage /> },
            { path: "/:lang/cities", element: <CityPage /> },
            { path: "/:lang/city-details/:id", element: <CityDetailsPage /> },
            { path: "/:lang/cruises", element: <CruisesPage /> },
            { path: "/:lang/cruises/:id", element: <CruisesDetailsPage /> },
            { path: "/:lang/hotels", element: <HotelsPage /> },
            { path: "/:lang/hotels/:id", element: <HotelDetailsPage /> },
            { path: "/:lang/flights/:type/:id", element: <FlightDetails /> },
            { path: "/:lang/flights/:type/:id/:idReturn", element: <FlightDetails /> },
            { path: "/:lang/vacations", element: <VacationPage /> },
            { path: "/:lang/vacations/:id", element: <VacationDetails /> },
            { path: "/:lang/short-list", element: <ShortListPage /> },
            { path: "/:lang/booking", element: <BookingPage /> },
            { path: "/:lang/payment", element: <PaymentPage /> },
            { path: "/:lang/contact", element: <ContactPage /> },
            { path: "/:lang/terms", element: <TermsAndConditionsPage /> },
            { path: "/:lang/cart", element: <CartPage /> },
            { path: "/:lang/order", element: <OrderPage /> },
            { path: "/:lang/pay", element: <PayToWay /> },
            { path: "/:lang/cookie", element: <CookieNoticePage /> },
            { path: "/:lang/holiday", element: <HolidayOffersPage /> },
            { path: "/:lang/policy", element: <Policy /> },
            { path: "/:lang/privacy", element: <Privacy /> },
            { path: "/:lang/profile", element: <Profile /> },
            { path: "/:lang/delete-user", element: <DeleteInstructionUser /> },
            { path: "/:lang/confirm-email", element: <ConfirmEmailPage /> },
            
        ],
    },

    {
        element: (
            <>
                <Outlet /> {/* Тільки контент сторінки */}
            </>
        ),
        children: [
            { path: "/:lang/login", element: <LoginPage /> },
            { path: "/:lang/forgot-password", element: <ForgotPasswordPage /> },
            { path: "/:lang/reset-password/:token", element: <ResetPassword /> },
            { path: "/:lang/signup", element: <SignupPage /> },
            { path: "/:lang/completion", element: <CompletionPage /> },
        ],
    },

    {
        element: <AdminRouter />,
        children: [
            { path: "/:lang/flights/flight-new", element: <CreateFlightPage /> },
            { path: "/:lang/flights/flight-updated/:id", element: <UpdatedFlightPage /> },
            { path: "/:lang/flights/admin-updated/:id", element: <UpdatedFlightAdmin /> },
            { path: "/:lang/flights-admin/:id", element: <FlightDetailsAdmin /> },
            { path: "/:lang/vacations/vacation-new", element: <CreateVacationPage /> },
            { path: "/:lang/vacations/vacation-updated/:id", element: <UpdatedVacationPage /> },
        ],
    },

    { path: "*", element: <NotFoundPage /> },
]);


export default router





