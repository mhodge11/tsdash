export function warnNoCrypto() {
	const needsCrypto = [
		"KSUID",
		"compareKsuids",
		"generateCustomUuid",
		"generateCustomUuidAsync",
		"generateKsuid",
		"generateKsuidAsync",
		"generateUuid",
		"generateUuidAsync",
		"hash",
		"randomElement",
		"randomFloat",
		"randomInt",
		"randomString",
	];

	console.warn(
		"Web Crypto API not available:",
		needsCrypto.join(", "),
		"will not work.",
	);
}
