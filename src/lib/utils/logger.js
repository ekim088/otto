// import winston from 'winston';

// const logger = winston.createLogger({
// 	transports: [new winston.transports.Console()]
// });

const logger = {
	error() {},
	info() {},
	transports: [
		{
			silent: true
		}
	]
};

export default logger;
