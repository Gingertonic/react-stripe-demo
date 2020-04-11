import React from 'react'
import BillingDetails from './BillingDetails'

export default function PaymentModal({ donations, closeModal, billingDetails, updateBillingDetails, giftAid, setGiftAid }) {
    const total = donations.reduce((d, total) => d + total, 0)
    return (
        <div id="payment-modal" className="centre-section">
            <button id="close-modal" className="text-change-hover" onClick={closeModal}>X</button>
            <span className="don-amount currency">{total}</span>
            <div className="inline">
                <p>Gift Aid?</p><input name="gift-aid-check" type="checkbox" defaultChecked={giftAid} onChange={e => setGiftAid(e.target.checked)}/>
            </div>
            <BillingDetails billingDetails={billingDetails} updateBillingDetails={updateBillingDetails}/>
        </div>
    )
}
