import React, { useState } from 'react';
import { Header, BigButton, Charity, PaymentModal, DonationTracker } from './components'
import { charities } from './charityData'
import './App.css';



function App() {
  const [donations, setDonations] = useState([5, 5])
  const [modalOpenStatus, setModalOpenStatus] = useState(false)
  const [paymentDisabled, setPaymentDisabled] = useState(true)
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    addLine1: '',
    addLine2: '',
    county: '',
    postcode: '',
    cardNum: ''
  })

  const updateBillingDetails = e => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value })
    Object.values(billingDetails).some(d => d === '') ? setPaymentDisabled(true) : setPaymentDisabled(false)
  }

  const onDonationAdjustment = (charity, direction) => {
    const updatedDonations = [...donations]
    direction === "increase" ? updatedDonations[charity.id] += 5 : updatedDonations[charity.id] -= 5 
    updatedDonations.every(x => x >= 0) && setDonations(updatedDonations)
  }

  const handleSubmitPayment = () => console.log("submitting payment")

  const setBigButton = () => {
    if (modalOpenStatus) {
      return <button id="to-payment" disabled={paymentDisabled} className={paymentDisabled ? null : "text-change-hover"} onClick={handleSubmitPayment}>confirm payment</button> 
    } else {
      return <button id="to-payment" className="text-change-hover" onClick={() => setModalOpenStatus(true)}>contribute</button>
    }
  }

  const setCentreSection = () => {
    if (modalOpenStatus) {
      return <PaymentModal donations={donations} closeModal={() => setModalOpenStatus(false)} billingDetails={billingDetails} updateBillingDetails={updateBillingDetails} /> 
    } else {
      return <DonationTracker charities={charities} onDonationAdjustment={onDonationAdjustment} donations={donations}/>
    }
  }

  return (
    <div className="App">
      <Header />
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
