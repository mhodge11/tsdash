import { warnNoCrypto } from "./utils.ts";

let webcrypto = crypto;

if (typeof webcrypto === "undefined")
	try {
		webcrypto = (await import("node:crypto")) as Crypto;
		globalThis.crypto = webcrypto;
	} catch {
		warnNoCrypto();
	}
