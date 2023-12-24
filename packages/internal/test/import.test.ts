async function runImport() {
	return import("../src/index.ts");
}

beforeEach(() => {
	vi.resetModules();
	vi.doUnmock("node:crypto");
	vi.unstubAllGlobals();
});

test("import works when crypto already exists", async () => {
	const { crypto } = await runImport();
	expect(crypto).toBeDefined();
});

test("import works when crypto doesn't exist and node:crypto exists", async () => {
	vi.stubGlobal("crypto", undefined);
	const { crypto } = await runImport();
	expect(crypto).toBeDefined();
});

test("import is undefined when crypto doesn't exist and node:crypto doesn't exist", async () => {
	vi.stubGlobal("crypto", undefined);
	vi.doMock("node:crypto", () => undefined);
	const { crypto } = await runImport();
	expect(crypto).toBeUndefined();
});
