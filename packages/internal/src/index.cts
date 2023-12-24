let webcrypto = crypto;
if (typeof webcrypto === "undefined")
	try {
		webcrypto = require("node:crypto");
	} catch {
		require("./utils.cts").warnNoCrypto();
	}

module.exports = { crypto: webcrypto };
