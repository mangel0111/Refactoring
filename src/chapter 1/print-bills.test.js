import Statement from "./print-bills";
import invoices from "./invoices.json";
import plays from "./plays.json";

describe("print bills", () => {
    const formattedResponse = `Statement for BigCo\n Hamlet: $650.00 (55 seats)\n As You Like It: $580.00 (35 seats)\n Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n`;
    const formattedResponseWithLowersLimit = `Statement for BigCo\n Hamlet: $400.00 (29 seats)\n As You Like It: $357.00 (19 seats)\n Othello: $400.00 (28 seats)\nAmount owed is $1,157.00\nYou earned 3 credits\n`;
    const formattedResponseOnTheLimit = `Statement for BigCo\n Hamlet: $400.00 (30 seats)\n As You Like It: $360.00 (20 seats)\n Othello: $400.00 (30 seats)\nAmount owed is $1,160.00\nYou earned 4 credits\n`;
    const formattedResponseAudienceOnTheLimitWithJustOne = `Statement for BigCo\n Hamlet: $400.00 (30 seats)\nAmount owed is $400.00\nYou earned 0 credits\n`;
    const formattedResponseAudienceLowerTheLimitWithJustOne = `Statement for BigCo\n Hamlet: $400.00 (29 seats)\nAmount owed is $400.00\nYou earned 0 credits\n`;
    const formattedResponseAudienceHigherTheLimitWithJustOne = `Statement for BigCo\n Hamlet: $410.00 (31 seats)\nAmount owed is $410.00\nYou earned 1 credits\n`;
    const formattedResponseAudienceHigherTheLimitWithJustOneHTML = `<h1>Statement for BigCo</h1>\n<table>\n<tr><th>play</th><th>seats</th><th>cost</th></tr> <tr><td>Hamlet</td><td>31</td><td>$41,000.00</td></tr>\n</table>\n<p>Amount owed is <em>$41,000.00</em></p>\n<p>You earned <em>undefined</em> credits</p>\n`;

    it("should print the bills when the performance was high", () => {
        const invoice = invoices[0];

        const bills = new Statement(invoice, plays).printBills();

        expect(bills).toEqual(formattedResponse);
    });

    it("should print the bills when the performance was lower", () => {
        const invoice = invoices[1];

        const bills = new Statement(invoice, plays).printBills();

        expect(bills).toEqual(formattedResponseWithLowersLimit);
    })

    it("should print the bills when the performance is the limits", () => {
        const invoice = invoices[2];

        const bills = new Statement(invoice, plays).printBills();

        expect(bills).toEqual(formattedResponseOnTheLimit);
    })

    it("should fails when the play is not correct", () => {
        const invoice = invoices[3];
        try {
            new Statement(invoice, plays).printBills();
            error(1).toEqual(2);
        } catch (error) {
            expect(error.message).toEqual("unknown type: musical");
        }
    })

    it("should verify when one play have the audience equal to the limit", () => {
        const invoice = invoices[4];

        const bills = new Statement(invoice, plays).printBills();

        expect(bills).toEqual(formattedResponseAudienceOnTheLimitWithJustOne);
    });

    it("should verify when one play have the audience lower to the limit", () => {
        const invoice = invoices[5];

        const bills = new Statement(invoice, plays).printBills();

        expect(bills).toEqual(formattedResponseAudienceLowerTheLimitWithJustOne);
    })

    it("should verify when one play have the audience higher to the limit", () => {
        const invoice = invoices[6];

        const bills = new Statement(invoice, plays).printBills();

        expect(bills).toEqual(formattedResponseAudienceHigherTheLimitWithJustOne);
    })

    it("should verify and render HTML when one play have the audience higher to the limit", () => {
        const invoice = invoices[6];

        const bills = new Statement(invoice, plays).renderBills();

        expect(bills).toEqual(formattedResponseAudienceHigherTheLimitWithJustOneHTML);
    })
})
