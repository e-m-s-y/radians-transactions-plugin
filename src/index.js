const Transactions = require('@arkecosystem/core-transactions');
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

		logger.info(`[${this.alias}] Registering login transaction...`);
		await Transactions.Handlers.Registry.registerTransactionHandler(Radians.TransactionHandlerFactory.login());
		logger.info(`[${this.alias}] Registered login transaction.`);
		logger.info(`[${this.alias}] Registering logout transaction...`);
		await Transactions.Handlers.Registry.registerTransactionHandler(Radians.TransactionHandlerFactory.logout());
		logger.info(`[${this.alias}] Registered logout transaction.`);
		logger.info(`[${this.alias}] All custom transactions registered!`);
	}
};