const Account = require("../../../../domains/account/Account");

describe("Account", () => {
  test("address should be a valid Ethereum address", () => {
    const account = new Account();

    // Check if the address starts with '0x'
    expect(account.address.startsWith("0x")).toBe(true);

    // Check if the address is 42 characters long (excluding '0x')
    expect(account.address.length).toBe(42);

    // Check if the address contains only hexadecimal characters
    const hexRegex = /^[0-9a-fA-F]+$/;
    expect(hexRegex.test(account.address.slice(2))).toBe(true);
  });

  // Add more test cases as needed to verify the behavior of the Account class
});
