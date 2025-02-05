import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setFirstName, setLastName } from '../../Store/Slices/sessionSliceReducer';
import { Link } from 'react-router-dom';

const OrderForm = () => {
    const dispatch = useDispatch();
    const { firstName, lastName, email } = useSelector(state => state.session);
    const user = useSelector(state => state.session.user)
    const currentLang = useSelector(state => state.language.language)
    
    useEffect(() => {
      
        if (user) {
          
            dispatch(setEmail(user.email))
            dispatch(setFirstName(user.name))
        }
    }, [user])
    return (
        <main>
            <div className='flex justify-center font-semibold pt-3'>
                <h2 >PAY FOR ORDER</h2>
            </div>
            <div className="max-w-md mx-auto mt-10 p-6 bg-slate-100 rounded-lg shadow-md">
                <form>
                    <div className='flex gap-3 mt-2'>
                        <div className="mb-4 w-1/2">
                            <label className="block text-gray-700 mb-2">Cardholder First Name</label>
                            <input
                                type="text"
                                placeholder='First name'
                                value={firstName}
                                onChange={(e) => dispatch(setFirstName(e.target.value))}
                                className="block w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>

                        <div className="mb-4 w-1/2">
                            <label className="block text-gray-700 mb-2">Cardholder Last Name</label>
                            <input
                                type="text"
                                placeholder='Last name'
                                value={lastName}
                                onChange={(e) => dispatch(setLastName(e.target.value))}
                                className="block w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => dispatch(setEmail(e.target.value))}
                            className="block w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <Link
                            to={`/${currentLang}/payment`}
                            className="inline-block bg-blue-500 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors"
                        >
                            PAY
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default OrderForm;
