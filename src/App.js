import React, { useState } from 'react';
import { Header, BigButton, Charity, PaymentModal, DonationTracker, AlertBanner } from './components'
import { useElements, CardElement, useStripe } from '@stripe/react-stripe-js'
import { charities } from './charityData'
import './App.css';


function App() {
  const stripeElements = useElements()
  const stripe = useStripe()
  const [donations, setDonations] = useState([5, 5])
  const [modalOpenStatus, setModalOpenStatus] = useState(false)
  const [paymentDisabled, setPaymentDisabled] = useState(false)
  const [successfulPayment, setSuccessfulPayment] = useState(false)
  const [giftAid, setGiftAid] = useState(false)
  const [error, setError] = useState('')
  const [billingDetails, setBillingDetails] = useState({
    name: 'test',
    addLine1: 'test',
    addLine2: 'test',
    county: 'test',
    postcode: 'test'
  })

  const updateBillingDetails = e => {
    e.target && setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value })
    const cardDeets = stripeElements.getElement(CardElement)
    Object.values(billingDetails).some(d => d === '') || cardDeets._empty ? setPaymentDisabled(true) : setPaymentDisabled(false)
  }

  const onDonationAdjustment = (charity, direction) => {
    const updatedDonations = [...donations]
    direction === "increase" ? updatedDonations[charity.id] += 5 : updatedDonations[charity.id] -= 5 
    updatedDonations.every(x => x >= 0) && setDonations(updatedDonations)
  }

  const handleSubmitPayment = async () => {
    setPaymentDisabled(true)
    // 1. create a Payment Intent - get client secret 
    const createPaymentIntent = await fetch('/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ donations, giftAid })
    })
    const paymentIntentDetails = await createPaymentIntent.json()

    const clientSecret = paymentIntentDetails.paymentIntent.client_secret 
   

    // 2. create a Payment Method - get payment method ID
    const formattedBillingDetails = {
      name: billingDetails.name,
      address: {
        line1: billingDetails.addLine1,
        line2: billingDetails.addLine2,
        state: billingDetails.county,
        postal_code: billingDetails.postcode,
      }
    }

    const cardDeets = stripeElements.getElement(CardElement) 

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardDeets,
      billing_details: formattedBillingDetails
    })

    if (error) {
      setError(error.message)
      return
    }

    const paymentMethodId = paymentMethod.id

    // 3. use all the above to confirm the payment
    const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId
      }
    )

    if (confirmation.error) {
      setError(confirmation.error.message)
      return
    }

    console.log(confirmation)

  setSuccessfulPayment(true)
  setModalOpenStatus(false)
    
  }

  const setBigButton = () => {
    if (successfulPayment){
      return <button id="to-payment">thank you!</button>
    } else if (modalOpenStatus) {
      return <button id="to-payment" disabled={paymentDisabled} className={paymentDisabled ? null : "text-change-hover"} onClick={handleSubmitPayment}>confirm payment</button> 
    } else {
      return <button id="to-payment" className="text-change-hover" onClick={() => setModalOpenStatus(true)}>contribute</button>
    }
  }

  const setCentreSection = () => {
    if (modalOpenStatus) {
      return <PaymentModal donations={donations} closeModal={() => setModalOpenStatus(false)} billingDetails={billingDetails} updateBillingDetails={updateBillingDetails} giftAid={giftAid} setGiftAid={setGiftAid}/> 
    } else {
      return <DonationTracker charities={charities} onDonationAdjustment={onDonationAdjustment} donations={donations}/>
    }
  }

  return (
    <div className="App">
      <Header />
      { error && <AlertBanner message={error} close={() => setError('')}/>}
      <div id="main" className="grid-3">
          <Charity charity={charities[0]}/>
          {setCentreSection()}
          <Charity charity={charities[1]}/>
      </div>
      <BigButton>{setBigButton()}</BigButton>

    </div>
  );
}

export default App;
