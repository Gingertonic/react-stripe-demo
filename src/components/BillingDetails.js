import React from 'react'
import { CardElement } from '@stripe/react-stripe-js'

export default function BillingDetails({ billingDetails, updateBillingDetails }) {
    const { name, addLine1, addLine2, county, postcode } = billingDetails
    const cardElementOptions = {
        style: {
            invalid: {
                color: "darkred",
                iconColor: "darkred"
            }
        },
        hidePostalCode: true
    }

    return (
        <div id="billing-details">
            <input id="name" name="name" type="text" value={name} placeholder="Name on card" onChange={updateBillingDetails}/>
            <input id="address-line-one" name="addLine1" type="text" value={addLine1} placeholder="Address Line 1" onChange={updateBillingDetails}/>
            <input id="address-line-two" name="addLine2" type="text" value={addLine2} placeholder="Address Line 2" onChange={updateBillingDetails}/>
            <input id="county" type="text" name="county" value={county} placeholder="County" onChange={updateBillingDetails}/>
            <input id="postcode" type="text" name="postcode" value={postcode} placeholder="Postcode" onChange={updateBillingDetails}/>
            <div className="fake-input"> 
                <CardElement options={cardElementOptions} onChange={updateBillingDetails} />
            </div>  
        </div>
    )
}
