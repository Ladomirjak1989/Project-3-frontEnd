import { useSelector} from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import VacationEl from '../../components/VacationEl/VacationEl';


const ShortListPage = () => {

    const favorite = useSelector(state => state.vacations.favoriteVacation)
    console.log(favorite)
    
  
    
    return (
        <div className="container mx-auto my-6 p-4 border rounded shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">YOUR SHORTLIST</h2>
                <div className="flex items-center space-x-2">
                    <FaHeart className="text-yellow-500" />

                </div>
            </div>
            <div className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">SAVE YOUR SHORTLIST</h3>
                    <p>Save your shortlist to your account to view and update it any time, from any device.</p>
                </div>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">SAVE TO ACCOUNT</button>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded">CREATE AN ACCOUNT</button>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-bold"> SHORTLISTED PACKAGE HOLIDAYS</h3>
                <ul>
                   {favorite.map(item=>(
                  <VacationEl key={item._id} {...item}/>
                   ))}
                
                </ul>
                
            </div>
        </div>
    );
};

export default ShortListPage;

