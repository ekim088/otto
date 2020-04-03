// import winston from 'winston';

// const logger = winston.createLogger({
// 	transports: [new winston.transports.Console()]
// });

const logger = {
	error() {},
	info() {},
	warn() {},
	transports: [
		{
			silent: true
		}
	]
};

export default logger;
