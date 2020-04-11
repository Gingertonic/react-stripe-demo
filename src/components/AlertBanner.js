import React from 'react'

export default function AlertBanner({ message, close }) {
    return (
        <div id="alert-banner" onClick={close}>
            <h2>{message}</h2>
        </div>
    )
}
