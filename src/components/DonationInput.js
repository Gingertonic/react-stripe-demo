import React from 'react'

export default function DonationInput({ charity, onDonationAdjustment, amount }) {

    return (
        <div className="don-unit">
            <button className="increment" onClick={() => onDonationAdjustment(charity, "increase")}>+</button>
            <div className="don-amount currency">{amount}</div>
            <button className="increment" onClick={() => onDonationAdjustment(charity, "deecrease")}>-</button>
        </div>
    )
}