import { generateKsuid, isValidKsuid } from "../src/index.ts";

test("generateKsuid", async () => {
	const ksuid = generateKsuid();
	expect(isValidKsuid(ksuid)).toBe(true);
});
