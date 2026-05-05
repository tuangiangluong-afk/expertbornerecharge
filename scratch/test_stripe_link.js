const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51TK0uaLdaAZkZMNETpwIu3GWqMkc5uP2BTJCuZ7W3kN8D66v5xYKceRqEA2Aya8LqsIfAgvR6Y0lvmC1LE1Dw93c00nggSxy4u');

async function createTestSession() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Lead Client - Paris (Maison)',
              description: 'Déverrouillage des coordonnées du prospect',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/leads/unlock/de08fa8a-99f4-4120-8a6d-e54fdd48de8f?success=true',
      cancel_url: 'http://localhost:3000/leads/unlock/de08fa8a-99f4-4120-8a6d-e54fdd48de8f?canceled=true',
    });

    console.log('--- LIEN STRIPE TEST ---');
    console.log(session.url);
    console.log('------------------------');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createTestSession();
