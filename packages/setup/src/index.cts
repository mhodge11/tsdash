let webcrypto = crypto;

if (typeof webcrypto === "undefined")
	try {
		({ webcrypto } = require("node:crypto"));
		globalThis.crypto = webcrypto;
	} catch {
		const { warnNoCrypto } = require("./utils");
		warnNoCrypto();
	}
