import React from 'react'
import BillingDetails from './BillingDetails'

export default function PaymentModal({ donations, closeModal, billingDetails, updateBillingDetails }) {
    const total = donations.reduce((d, total) => d + total, 0)
    return (
        <div id="payment-modal" className="centre-section">
            <button id="close-modal" className="text-change-hover" onClick={closeModal}>X</button>
            <span className="don-amount currency">{total}</span>
            <BillingDetails billingDetails={billingDetails} updateBillingDetails={updateBillingDetails}/>
        </div>
    )
}
