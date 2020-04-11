const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event, context) => {

  if (event.httpMethod !== "POST"){
    return { statusCode: 405, body: "POST OR BUST"}
  }

  try {
    const { donations, giftAid } = JSON.parse(event.body)
    const description = giftAid ? 'Gift Aid donation' : 'Gift Aid not available'
    const total = donations.reduce((don, acc) => don + acc) * 100
    const message = `You are about to pay ${total} British pennies!`
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "gbp",
      description
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ message, paymentIntent })
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
