import React from 'react'
import DonationInput from './DonationInput'

export default function DonationTracker({ charities, onDonationAdjustment, donations }) {
    const renderDonationInputs = charities.map(ch => <DonationInput charity={ch} key={ch.id} onDonationAdjustment={onDonationAdjustment} amount={donations[ch.id]}/>)
    return (
        <div id="donation-tracker" className="centre-section">
            {renderDonationInputs}
        </div>
    )
}
