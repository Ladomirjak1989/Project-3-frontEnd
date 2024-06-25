import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import HotelEl from '../../components/HotelEl/HotelEl';
import SortList from '../../components/SortList/SortList';
import Searchbar from '../../components/Searchbar/Searchbar';
import { FaHotel } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { FaMobileScreenButton } from "react-icons/fa6";


const HotelsPage = () => {

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.hotels.loading)
  const hotels = useSelector(state => Object.values(state.hotels.hotels))
  const hotelSearch = useSelector(state => Object.values(state.hotelSearch.hotels))
  console.log(hotels, 999)
  const user = useSelector(state => state.session.user)

  if (isLoading) {
    return <Loader />
  }
  if (hotelSearch.length) {
    return (
      <>


        {user?.role !== "admin" && <Searchbar />}
        <div class="bg-white p-8">



        </div>
        <div className='mx-auto my-0 max-w-5xl'>
          <div className="container mx-auto p-4">

            <div className="flex justify-between mb-4 items-center">
              <h2 className='"text-xl font-semibold mb-2 italic text-xl'>Find your best hotel below:</h2>

              <SortList />

            </div>
            <ul>
              {hotelSearch.map(item => (
                <HotelEl {...item} key={item._id} />

              ))}
            </ul>
            <Button id="book" />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {user?.role !== "admin" && <Searchbar />}
      <div className='mx-auto my-0 max-w-5xl'>
        <div className="container mx-auto p-4">
          <div className="flex justify-between mb-4 items-center">
            <h2 className='"text-xl font-semibold mb-2 italic text-xl underline'>Find your best hotel below:</h2>

            <SortList />

          </div>
          <div class="max-w-6xl mx-auto text-center py-12">
            <div class="border-b border-gray-300 mb-8">
              <h2 class="text-2xl font-bold text-blue-900 inline-block px-4 bg-white">Reasons to book with Dream Voyage</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div class="flex flex-col items-center">
                <FaHotel class="text-5xl text-blue-900 mb-4" />
                <p class="text-lg font-semibold text-blue-900 mb-2">Twenty of hotels worldwide</p>
              </div>
              <div class="flex flex-col items-center">
                <FaRegCreditCard class="text-5xl text-blue-900 mb-4" />
                <p class="text-lg font-semibold text-blue-900 mb-2">Book now, pay later</p>
              </div>
              <div class="flex flex-col items-center">
                <FaMobileScreenButton class="text-5xl text-blue-900 mb-4" />
                <p class="text-lg font-semibold text-blue-900 mb-2">Around-the-clock support through the Dream Voyage app</p>
              </div>
            </div>
          </div>


          <ul>
            {hotels.map(item => (
              <HotelEl {...item} key={item._id} />
            ))}

          </ul>

          <Button id="book" />
        </div>
      </div>



      <div class="bg-orange-50 p-8">
        <div class="max-w-4xl mx-auto text-gray-900">
          <p class="mb-4">
            Got your flights sorted and just need to find somewhere to stay? Good news – we’ve got twenty of hotels for you to choose from right around the globe. Plus, our bumper selection means there’s something in our range to suit every budget. From city-and-beach breaks on Spain’s south coast to Caribbean getaways, the hotels in our collection have got you covered no matter what type of holiday you’re after. And as well as sun and sand, you can pick from a selection of spots in big-name cities, too – from places close to home like Edinburgh and Manchester to European capitals and beyond.
          </p>
          <p>
            The best bit? We’ve taken the stress out of searching, with easy-to-use filters giving you the option to search by star rating, board basis and more. There are spots for all seasons, too, so whether you’re escaping the winter weather in the Canary Islands or making the most of the Med’s balmy temperatures in summer, we’ve got you covered. And, when it comes to choosing a place to stay, we’ve got everything from All Inclusive hotels to private apartments and huge villas that are great for big groups. All that’s left to do is start your search…
          </p>
        </div>

      </div>
    </>
  );

}

export default HotelsPage




