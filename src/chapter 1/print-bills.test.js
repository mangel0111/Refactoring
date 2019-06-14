import printBills from "./print-bills";
import invoices from "./invoices.json";
import plays from "./plays.json";

describe("print bills", () => {
    const formattedResponse = `Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $580.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n`;
    const formattedResponseWithLowersLimit = `Statement for BigCo\n Hamlet: $400.00 (29 seats)\n As You Like It: $357.00 (19 seats)\n Othello: $400.00 (28 seats)\nAmount owed is $1,157.00\nYou earned 3 credits\n`;
    const formattedResponseOnTheLimit = `Statement for BigCo\n Hamlet: $400.00 (30 seats)\n As You Like It: $360.00 (20 seats)\n Othello: $400.00 (30 seats)\nAmount owed is $1,160.00\nYou earned 4 credits\n`;
    const formattedResponseOnTheLimitWithJustOne = `Statement for BigCo\n Hamlet: $400.00 (30 seats)\nAmount owed is $400.00\nYou earned 0 credits\n`;

    it("should print the bills when the performance was high", () => {
        const invoice = invoices[0];

        const bills = printBills(invoice, plays);

        expect(bills).toEqual(formattedResponse);
    });

    it("should print the bills when the performance was lower", () => {
        const invoice = invoices[1];

        const bills = printBills(invoice, plays);

        expect(bills).toEqual(formattedResponseWithLowersLimit);
    })

    it("should print the bills when the performance is the limits", () => {
        const invoice = invoices[2];

        const bills = printBills(invoice, plays);

        expect(bills).toEqual(formattedResponseOnTheLimit);
    })

    it("should fails when the play is not correct", () => {
        const invoice = invoices[3];
        try {
            printBills(invoice, plays);
            error(1).toEqual(2);
        } catch (error) {
            expect(error.message).toEqual("unknown type: musical");
        }
    })

    it("should fails when the play equal to the limit", () => {
        const invoice = invoices[4];

        const bills = printBills(invoice, plays);

        expect(bills).toEqual(formattedResponseOnTheLimitWithJustOne);
    })
})