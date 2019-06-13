import printBills from "./print-bills";
import invoices from "./invoices.json";
import plays from "./plays.json";

describe("print bills", () => {
    const formattedResponse = `Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $580.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n`

    it("should print the bills", () => {
        const invoice = invoices[0];
        const bills = printBills(invoice, plays);
        expect(bills).toEqual(formattedResponse);
    })
})