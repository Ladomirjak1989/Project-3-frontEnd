import React, { useEffect } from 'react';
import { RouterProvider, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import router from './routers/routers';
import { fetchVacationAsync } from './Store/Slices/fetchVacationSliceAsync';
import { fetchCityAsync } from './Store/Slices/fetchCitySliceReducer';
import { fetchHotelAsync, } from './Store/Slices/fetchHotelSliceAsync';
import { fetchCruiseAsync } from './Store/Slices/fetchCruiseSliceAsync';
import { setCartCruiseWithUser } from './Store/Slices/cruiseSliceReducer';
import { setCartFlightWithUser } from './Store/Slices/flightSliceReducer';
import { setCartVacationWithUser } from './Store/Slices/vacationSliceReducer';
import { setCartHotelWithUser } from './Store/Slices/hotelSliceReducer';
import { fetchGetUserByIdAsync, fetchTokenAmadeus } from './Store/Slices/fetchSessionSliceAsync';
import i18n from 'i18next';
import { setCurrentLang } from './Store/Slices/languageSliceReducer';
import { setCartAttractionWithUser } from './Store/Slices/attractionSliceReducer';
import { fetchFlightAsync } from './Store/Slices/fetchFlightSliceAsync';





const App = () => {
    const dispatch = useDispatch();
    const { lang } = useParams();

    useEffect(() => {
        // Fetch all data when the app loads
        const init = async () => {

            const vacation = await dispatch(fetchVacationAsync());
            const city = await dispatch(fetchCityAsync());
            const hotel = await dispatch(fetchHotelAsync());
            const cruise = await dispatch(fetchCruiseAsync())
            const flights = await dispatch(fetchFlightAsync())
            await dispatch(fetchTokenAmadeus())
            const token = await localStorage.getItem("token")
            const storage = await JSON.parse(localStorage.getItem("user"))

            if (storage && token) {

                const { payload } = await dispatch(fetchGetUserByIdAsync({ id: storage._id }))
                await dispatch(setCartCruiseWithUser(payload.user.cruises))
                await dispatch(setCartFlightWithUser(payload.user.flights))
                await dispatch(setCartVacationWithUser(payload.user.vacations))
                await dispatch(setCartHotelWithUser(payload.user.hotels))
               
            }
        }
        init()
    }, [dispatch]);

    useEffect(() => {

        // Спочатку отримуємо збережену мову з localStorage
        const savedLang = localStorage.getItem('lang');

        // Якщо збереженої мови немає, використовуємо мову браузера
        if (!savedLang) {
            const browserLang = navigator.language || navigator.userLanguage;
            const language = browserLang.split('-')[0]; // Наприклад, з 'en-US' отримуємо 'en'

            // Перевіряємо, чи підтримується мова додатком
            const supportedLanguages = ['en', 'uk', 'de', 'fr', 'es', 'pl', 'sk', 'nl', 'hu', 'pt']; // Приклад підтримуваних мов
            const defaultLang = supportedLanguages.includes(language) ? language : 'en';

            // Змінюємо мову додатку
            i18n.changeLanguage(defaultLang);

            // Зберігаємо мову в localStorage для подальших сеансів
            localStorage.setItem('lang', defaultLang);
            dispatch(setCurrentLang(defaultLang))
        } else {
            // Якщо є збережена мова, використовуємо її
            i18n.changeLanguage(savedLang);
            dispatch(setCurrentLang(savedLang))
        }
    }, []);


    return <RouterProvider router={router} />;
};

export default App;
