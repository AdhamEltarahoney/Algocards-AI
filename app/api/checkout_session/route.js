import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { plan } = await req.json(); // Extract the plan from the request body

    let priceData;
    if (plan === 'basic') {
      priceData = {
        currency: 'usd',
        product_data: {
          name: 'Basic Subscription',
        },
        unit_amount: 500, // $5
        recurring: {
          interval: 'month',
        },
      };
    } else if (plan === 'pro') {
      priceData = {
        currency: 'usd',
        product_data: {
          name: 'Pro Subscription',
        },
        unit_amount: 1000, // $10
        recurring: {
          interval: 'month',
        },
      };
    } else {
      return new Response(JSON.stringify({ error: 'Invalid plan selected' }), {
        status: 400,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
    });

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
