const mockRequire = require("mock-require");

function runImport() {
	return mockRequire.reRequire("../src/index.cts");
}

beforeEach(() => {
	vi.resetModules();
	vi.unstubAllGlobals();
});

afterEach(() => {
	mockRequire.stopAll();
});

test("require works when crypto already exists", async () => {
	const { crypto } = runImport();
	expect(crypto).toBeDefined();
});

test("require works when crypto doesn't exist and node:crypto exists", async () => {
	vi.stubGlobal("crypto", undefined);
	const { crypto } = runImport();
	expect(crypto).toBeDefined();
});

test("require is undefined when crypto doesn't exist and node:crypto doesn't exist", async () => {
	vi.stubGlobal("crypto", undefined);
	mockRequire("node:crypto", "_mockCrypto.ts");
	const { crypto } = runImport();
	expect(crypto).toBeUndefined();
});
