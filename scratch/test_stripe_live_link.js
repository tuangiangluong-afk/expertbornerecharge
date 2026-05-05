const Stripe = require('stripe');
const stripe = new Stripe('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');

async function createLiveSession() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Lead Client - Paris (Maison)',
              description: 'Déverrouillage des coordonnées du prospect (LIVE)',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://expertbornerecharge.com/leads/unlock/de08fa8a-99f4-4120-8a6d-e54fdd48de8f?success=true',
      cancel_url: 'https://expertbornerecharge.com/leads/unlock/de08fa8a-99f4-4120-8a6d-e54fdd48de8f?canceled=true',
    });

    console.log('--- LIEN STRIPE LIVE ---');
    console.log(session.url);
    console.log('------------------------');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createLiveSession();
