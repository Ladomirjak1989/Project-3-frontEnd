import React, { useEffect, useState } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import { API_URL } from '../../utils/variables';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Store/Slices/sessionSliceReducer';

const PaymentPage = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch()
  const { user, totalPrice, order, firstName, lastName, email } = useSelector(state => state.session);
 
  useEffect(() => {
    fetch(`${API_URL}/api/config`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));

    });
  }, []);

  useEffect(() => {
    const createCustomerAndPaymentIntent = async () => {
      let customer = undefined
      if ((user && user.email && user.name) || (firstName && lastName && email)) {
        const customerResponse = await fetch(`${API_URL}/api/create-customer`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user ? user.email : email,
            name: user ? `${user.name}` : `${firstName} ${lastName}`
          })
        });

        const { customerId } = await customerResponse.json();
        customer = customerId
      }
      const paymentIntentResponse = await fetch(`${API_URL}/api/create-payment-intent`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPrice: totalPrice * 100 || 100, 
          customerId: customer,
          description: order.map(item => `${item._id} ${item.type}`).join(", "),
          user,
          order: order.map(({ _id, type, price, totalPrice }) => {
            const order = { _id, type, price: price || totalPrice }
            return order
          })
        })
      });
      const { clientSecret, user:updatedUser } = await paymentIntentResponse.json();
      setClientSecret(clientSecret);
      dispatch(setUser(user, updatedUser))
    };

    createCustomerAndPaymentIntent();
  }, [totalPrice, order, firstName, lastName, user, email]);
  return (
    <div>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
}

export default PaymentPage;