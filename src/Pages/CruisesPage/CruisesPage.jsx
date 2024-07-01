import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import CruiseEl from '../../components/CruiseEl/CruiseEl';
import Searchbar from '../../components/Searchbar/Searchbar';
import PromoBanner from '../../components/PromoBanner/PromoBanner';
import MapWithDestinations from '../../components/MapWithDestinations/MapWithDestinations';
import CruiseDeal from '../../components/CruiseDeal/CruiseDeal';



const CruisesPage = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.cruise.loading);
  const cruises = useSelector(state => Object.values(state.cruise.cruises));
  const cruiseSearch = useSelector(state => Object.values(state.cruiseSearch.cruise));
  const user = useSelector(state => state.session.user);
 


  if (isLoading) {
    return <Loader />;
  }

  if (cruiseSearch.length) {
    return (
      <>

        {user?.role !== "admin" && <Searchbar />}
        <PromoBanner />
        <div className='mx-auto my-0 max-w-5xl'>
          <div className="container mx-auto p-4">

            <ul>
              {cruiseSearch.map(item => (
                <CruiseEl {...item} key={item._id} />
              ))}
            </ul>
          
          </div>
        </div>
      </>
    );
  }

  return (
    <>

      {user?.role !== "admin" && <Searchbar />}
      <PromoBanner />
      <div className='mx-auto my-0 max-w-5xl'>
        <div className="container mx-auto p-4">
        <div className="border border-dashed border-blue-400 p-4 rounded-lg text-center mb-6">
        <p className="text-blue-500 font-bold">
          SAVE 
          <span className="font-semibold text-black">€200</span> 
          ON MARELLA CRUISES USING CODE <span className="font-semibold text-black">OCEAN200</span><br />
          <span className="text-blue-700 font-semibold">October - December 2024 </span> 
          <a href="#" className="text-blue-500 underline">T&CS APPLY</a>.
        </p>
       
      </div>
      <h2 className='text-2xl font-semibold mb-6 underline text-center italic'>Find your best Cruise below:</h2>
          <ul>
            {cruises.map(item => (
              <CruiseEl {...item} key={item._id} />
            ))}
          </ul>
      
        </div>
      </div>

      <MapWithDestinations />
      <CruiseDeal count={3} />

    </>


  );
};

export default CruisesPage;