const Transactions = require('@arkecosystem/core-transactions');
const { ApplicationEvents } = require('@arkecosystem/core-event-emitter');
const Radians = require('@foly/radians-sdk');

exports.plugin = {
	pkg: require('../package.json'),
	defaults: require('./defaults'),
	alias: 'foly:radians-transactions-plugin',
	async register(container, options) {
		const logger = container.resolvePlugin('logger');

		if( ! options.enabled) {
			logger.info(`[${this.alias}] Plugin is disabled!`);
			return;
		}

		logger.info(`[${this.alias}] Registering wallet indexers...`);

		const database = container.resolvePlugin('database');

		for(const key in Radians.Indexes) {
			if(Radians.Indexes.hasOwnProperty(key)) {
				database.walletManager.registerIndex(key, Radians.Indexers[Radians.Indexes[key]]);
				logger.info(`[${this.alias}] Registered '${key}' indexer`);
			}
		}
		
		logger.info(`[${this.alias}] Registering rental start transaction...`);
		await Transactions.Handlers.Registry.registerTransactionHandler(Radians.TransactionHandlerFactory.rentalStart());
		logger.info(`[${this.alias}] Registering rental finish transaction...`);
		await Transactions.Handlers.Registry.registerTransactionHandler(Radians.TransactionHandlerFactory.rentalFinish());
		logger.info(`[${this.alias}] Registering scooter registration transaction...`);
		await Transactions.Handlers.Registry.registerTransactionHandler(Radians.TransactionHandlerFactory.scooterRegistration());
		logger.info(`[${this.alias}] Registering authentication transaction...`);
		await Transactions.Handlers.Registry.registerTransactionHandler(Radians.TransactionHandlerFactory.authentication());
		logger.info(`[${this.alias}] Registering character registration transaction...`);
		await Transactions.Handlers.Registry.registerTransactionHandler(Radians.TransactionHandlerFactory.characterRegistration());
		logger.info(`[${this.alias}] All custom transactions registered!`);
	}
};
