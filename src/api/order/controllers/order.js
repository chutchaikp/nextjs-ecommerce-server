// 'use strict';
// /**
//  * order controller
//  */
// const { createCoreController } = require('@strapi/strapi').factories;
// module.exports = createCoreController('api::order.order');

'use strict';
const Stripe = require('stripe'); // (process.env.STRIPE_SECRET_KEY)


/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::order.order');
module.exports = createCoreController('api::order.order', ({ strapi }) => ({
	async find(ctx) {
		debugger;
		return { data: 'All data' }
	},
	async findOne(ctx) {
		return { data: 'OK', }
	},
	async create(ctx) {
		try {
			debugger;
			const { products, email, currency, amount, } = ctx.request.body;
			const secretKey = process.env.STRIPE_SECRET_KEY;
			const stripe = new Stripe(secretKey)
			const _amount = parseInt(amount * 100)

			const paymentIntent = await stripe.paymentIntents.create({
				// shipping_address_collection: { allowed_countries: ["TH"] },
				currency, // : 'thb',
				amount: _amount, // 4099,
				receipt_email: email,
				// payment_method_types: ['card'],
				automatic_payment_methods: {
					enabled: true
				},
			})

			debugger;
			// save to db
			// await strapi
			//   .service("api::order.order")
			//   .create({ data: { products, stripeId: session.id } });

			return { clientSecret: paymentIntent.client_secret, }
		} catch (error) {
			debugger;
			return { clientSecret: '', }
		}
	},
}));

