import { generateKsuidAsync, isValidKsuid } from "../src/index.ts";

test("generateKsuidAsync", async () => {
	const ksuid = await generateKsuidAsync();
	expect(isValidKsuid(ksuid)).toBe(true);
});
