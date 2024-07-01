import React, { useEffect, useState } from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from '../../components/PaymentForm/PaymentForm'
import { API_URL } from '../../utils/variables'

const PaymentPage = () => {

  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    fetch(`${API_URL}/api/config`).then(async (r) => {
      const { publishableKey } = await r.json()
      setStripePromise(loadStripe(publishableKey))
      console.log(publishableKey)
    })

  }, [])

  useEffect(() => {
    fetch(`${API_URL}/api/create-payment-intent`,
      {
        method: "POST",
        body: JSON.stringify({})
      }).then(async (result) => {

        const { clientSecret } = await result.json()
        setClientSecret(clientSecret)
        console.log(clientSecret)
      })

  }, [])
  return (

    <div>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      )}
    </div>

  )
}

export default PaymentPage