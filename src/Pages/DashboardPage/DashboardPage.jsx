import React, { useEffect, useMemo, useState } from 'react';
import FlightEl from '../../components/FlightEl/FlightEl';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { setPopUp } from '../../Store/Slices/popUpSliceReducer';
import PopUpMessage from '../../components/PopUpMessage/PopUpMessage';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdFlightTakeoff } from "react-icons/md";
import { SiGlobus } from "react-icons/si";
import { FaRegClock } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { LuBaggageClaim } from "react-icons/lu";
import VacationDeals from '../../components/VacationDeals/VacationDeals';
import Searchbar from '../../components/Searchbar/Searchbar';
import FlightBanner from '../../components/FlightBanner/FlightBanner';
import FlightElAdmin from '../../components/FlightElAdmin/FlightElAdmin';




const DashboardPage = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const isLoading = useSelector(state => state.flights.loading)
    const flights = useSelector(state => Object.values(state.flights.flights))
    const flightApi = useSelector(state => Object.values(state.flights.flightApi))
    const flightApiReturn = useSelector(state => Object.values(state.flights.flightApiReturn))
    const popUp = useSelector(state => state.popUp.popUp)

    const [visibleCount, setVisibleCount] = useState(5);
    const [sortOption, setSortOption] = useState("recommended");
    const [isDirect, setIsDirect] = useState(false);

    const memoizedHelper = (flights) => {
        flights = flights.filter(flight => flight?.price?.total && flight?.itineraries);

        if (sortOption === "lowToHigh") {
            flights.sort((a, b) => +a.price.total - +b.price.total);
        } else if (sortOption === "highToLow") {
            flights.sort((a, b) => +b.price.total - +a.price.total);
        }

        if (isDirect) {
            flights = flights.filter((flight) => flight.itineraries[0]?.segments.length === 1);
        }

        return flights.slice(0, visibleCount);
    }


    const memoizedVisibleFlights = useMemo(() => {
        let flights = memoizedHelper(flightApi);
        return flights
    }, [flightApi, visibleCount, sortOption, isDirect]);



    const memoizedVisibleFlightsReturn = useMemo(() => {
        let flights = memoizedHelper(flightApiReturn);
        return flights
    }, [flightApiReturn, visibleCount, sortOption, isDirect]);





    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 5);
    };
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const toggleDirectFlights = () => {
        setIsDirect((prevState) => !prevState);
    };

    useEffect(() => {
        if (popUp) {
            setTimeout(() => {
                dispatch(setPopUp(null))
            }, 9000)
        }
    }, [popUp, dispatch])


    if (isLoading) {
        return <Loader />

    }

    return (
        <>
            {user?.role !== "admin" && <Searchbar />}
            <FlightBanner />
            <main className='mt-5 px-4 sm:px-6 lg:px-8'>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center max-w-5xl mx-auto mb-6 space-y-4 sm:space-y-0">
                    <div className='w-full sm:w-auto'>
                        <label htmlFor="sort" className="block text-gray-700 text-sm font-semibold mb-1 sm:mb-0">
                            SORT BY:
                        </label>
                        <select
                            id="sort"
                            value={sortOption}
                            onChange={handleSortChange}
                            className="w-full sm:w-auto px-4 py-2 border rounded-md text-gray-700"
                        >
                            <option value="recommended">Our recommended</option>
                            <option value="lowToHigh">Price - low to high</option>
                            <option value="highToLow">Price - high to low</option>
                        </select>
                    </div>

                    {/* Direct Flights Toggle */}
                    <div className="flex items-center">
                        <span className="text-gray-800 font-semibold mr-3">Direct Flight</span>
                        <label className="relative flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={isDirect}
                                onChange={toggleDirectFlights}
                            />
                            <div className={`w-11 h-6 bg-gray-300 rounded-full flex items-center transition ${isDirect ? "bg-green-500" : ""}`}>
                                <div
                                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${isDirect ? "translate-x-5" : "translate-x-0 mx-auto"
                                        }`}
                                ></div>
                            </div>
                        </label>
                    </div>
                </div>



                <div className='mx-auto my-0 max-w-5xl'>
                    <div className='bg-slate-50'>
                        <div className="border-dotted bg-amber-200 border-2 border-blue-900 p-4 rounded-lg">
                            <p className="text-center text-blue-800 text-sm sm:text-base">
                                <span className="font-bold">10kg hand luggage</span> and <span className="font-bold">underseat bag</span> included in the price <span className="font-bold">on all flights.</span>
                            </p>
                        </div>
                        <div  className="mt-4">
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center sm:text-left">Alternative Flights</h3>
                        </div>
                        <div className='relative'>
                            {!memoizedVisibleFlights.length && (
                                <p className="text-center text-gray-500">No flights available.</p>
                            )}
                            <ul className='flex flex-col items-center gap-5'>

                                {user?.role === "admin" && flights.map((flight) => (
                                    <FlightElAdmin key={flight._id} flight={flight} />

                                ))}

                                {memoizedVisibleFlights.map((flight, index) => (
                                    <FlightEl
                                        key={flight.id}
                                        flight={flight}
                                        flightApiReturn={memoizedVisibleFlightsReturn[index]} // Передаємо відповідний return flight
                                    />
                                ))}
                            </ul>

                            {!flightApi.length && user?.role !== "admin" && <h2 className='font-semibold text-center mt-4'>Search for your flight above🡹</h2>}
                            {popUp && <PopUpMessage />}
                        </div>
                    </div>

                    {visibleCount < flightApi.length + flightApiReturn.length && (
                        <div className="flex justify-center gap-5">
                            <button
                                onClick={handleShowMore}
                                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800 transition-all duration-300"
                            >
                                SHOW MORE
                            </button>
                        </div>
                    )}
                </div>

                <VacationDeals count={10} customKey="a" />

                <div className="mx-auto max-w-[1200px] mt-5 p-10">
                    <h2 className="text-2xl font-bold mb-4">What our customers say ...</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="border rounded-lg p-4 shadow">
                            <h3 className="font-bold text-xl mb-2 flex items-center">
                                <IoCheckmarkDoneCircleOutline />
                                Trip Verified
                            </h3>
                            <p className="text-gray-700 mb-4">"The service experience was brilliant going to our destination, but coming home was the best flight I have ever experienced. The flight crews were extremely attentive, they turned the heating on, it was fantastic, I never knew that there was heating on a plane. Well done!"</p>
                            <p className="text-gray-500 text-sm">3rd April 2024</p>
                        </div>
                        <div className="border rounded-lg p-4 shadow">
                            <h3 className="font-bold text-xl mb-2 flex items-center">
                                <IoCheckmarkDoneCircleOutline />
                                Trip Verified
                            </h3>
                            <p className="text-gray-700 mb-4">"The whole flight was very good and my whole family enjoyed it. The captain kept us updated and the cabin crew were fantastic when I told them of my fear of flying. Travelling with my 5 children was stress free due to the amazing staff."</p>
                            <p className="text-gray-500 text-sm">4th April 2024</p>
                        </div>
                        <div className="border rounded-lg p-4 shadow">
                            <h3 className="font-bold text-xl mb-2 flex items-center">
                                <IoCheckmarkDoneCircleOutline />
                                Trip Verified
                            </h3>
                            <p className="text-gray-700 mb-4">"Friendly, experienced crew, great service throughout flight. Pilot explained well and was very reassuring when explaining why seatbelt sign was switched on due to turbulence. Which was great for someone like me who has a fear of flying. Very relaxed atmosphere, spacious seating. It did not feel like a long haul flight the time flew by."</p>
                            <p className="text-gray-500 text-sm">28th March 2024</p>
                        </div>
                        <div className="border rounded-lg p-4 shadow">
                            <h3 className="font-bold text-xl mb-2 flex items-center">
                                <IoCheckmarkDoneCircleOutline />
                                Trip Verified
                            </h3>
                            <p className="text-gray-700 mb-4">"Great experience on the flight out and home, cabin crew very polite and friendly. Will definitely be flying with TUI again."</p>
                            <p className="text-gray-500 text-sm">2nd April 2024</p>
                        </div>
                    </div>
                </div>


                <div className="mx-auto max-w-[1200px] p-4 border-t">
                    <div className="mb-8">
                        <p className="text-gray-700 text-sm sm:text-base">
                            Choosing one of our flight deals couldn’t be easier. Here at Dream Voyage, we know you might already have your hotel in the bag – that’s why we also offer flight-only options to get you there on our award-winning airline. Sorting a Dream Voyage flight out is as easy as pie. Simply take a look at our choice of regional airports, and pick the one closest to you. Then put in where it is you’re setting off to. We’ll do the rest, by finding your perfect flight deal. Flights with Dream Voyage take off from all the major airports, including London Gatwick, London Luton, and Manchester. We also fly from regional airports like Bournemouth. The Dream Voyage Airways programme ticks off eye-popping destinations all over the globe, from the golden beaches of Spain and Portugal to far-off places like Mexico and Thailand. The best thing about flying long haul is the fact that you’ll probably travel in style on one of our Dreamliners. They’re super comfy, extra quiet, and come with more space than other planes. Have a look at our
                            <a href="#" className="text-blue-500 underline"> flight and travel options</a>,
                            <a href="#" className="text-blue-500 underline"> flight extras</a>, and
                            <a href="#" className="text-blue-500 underline"> holiday extras</a> pages for essential information. Then, check out all of our flight deals by having a nose around our website, or pop into one of our high-street stores.
                        </p>
                    </div>

                    {/* Заголовок */}
                    <div className="text-center mb-8">
                        <h2 className="text-lg sm:text-xl font-bold border-t text-blue-900">
                            Why choose <p className="underline text-yellow-500 inline">Dream Voyage</p> flights
                        </h2>
                    </div>

                    {/* Контейнер сітки з адаптивністю */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center">

                        {/* Картка 1 */}
                        <div className="flex flex-col items-center justify-center px-4">
                            <MdFlightTakeoff className="text-5xl sm:text-6xl mb-2 text-blue-900" />
                            <h3 className="font-bold text-lg sm:text-xl text-blue-900">Fly local</h3>
                            <p className="text-gray-500 text-sm sm:text-base">
                                Flights from over 20 airports, so it's easy to find one that takes off near you.
                            </p>
                        </div>

                        {/* Картка 2 */}
                        <div className="flex flex-col items-center justify-center px-4">
                            <SiGlobus className="text-5xl sm:text-6xl mb-2 text-blue-900" />
                            <h3 className="font-bold text-lg sm:text-xl text-blue-900">20+ destinations</h3>
                            <p className="text-gray-500 text-sm sm:text-base">
                                We've most popular flight destinations to suit you.
                            </p>
                        </div>

                        {/* Картка 3 */}
                        <div className="flex flex-col items-center justify-center px-4">
                            <FaRegClock className="text-5xl sm:text-6xl mb-2 text-blue-900" />
                            <h3 className="font-bold text-lg sm:text-xl text-blue-900">Flexible flight times</h3>
                            <p className="text-gray-500 text-sm sm:text-base">
                                We've got times and durations to suit you.
                            </p>
                        </div>

                        {/* Картка 4 */}
                        <div className="flex flex-col items-center justify-center px-4">
                            <FaRegStar className="text-5xl sm:text-6xl mb-2 text-blue-900" />
                            <h3 className="font-bold text-lg sm:text-xl text-blue-900">Premium Club extras</h3>
                            <p className="text-gray-500 text-sm sm:text-base">
                                Get perks like bigger seats and priority check-in.
                            </p>
                        </div>

                        {/* Картка 5 */}
                        <div className="flex flex-col items-center justify-center px-4">
                            <LuBaggageClaim className="text-5xl sm:text-6xl mb-2 text-blue-900" />
                            <h3 className="font-bold text-lg sm:text-xl text-blue-900">DV flights</h3>
                            <p className="text-gray-500 text-sm sm:text-base">
                                10kg cabin luggage included as standard.
                            </p>
                        </div>

                    </div>
                </div>

            </main>
        </>
    );
};

export default DashboardPage;







