


class Statement {


    constructor(invoice, plays) {
        this.invoice = invoice;
        this.plays = plays;
    }


    printBills() {
        let totalAmount = 0;
        let volumeCredits = 0;
        let result = `Statement for ${this.invoice.customer}\n`;
        for (let perf of this.invoice.performances) {
            volumeCredits += this.volumeCreditsFor(perf);
            result += ` ${this.playFor(perf).name}: ${this.usd(this.amountFor(perf, this.playFor(perf)) / 100)} (${perf.audience} seats)\n`;
            totalAmount += this.amountFor(perf, this.playFor(perf));
        }
        result += `Amount owed is ${this.usd(totalAmount / 100)}\n`;
        result += `You earned ${volumeCredits} credits\n`;
        return result;
    }

    playFor(aPerformance) {
        return this.plays[aPerformance.playID]
    };

    usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber);
    }

    volumeCreditsFor(aPerformance) {
        let volumeCredits = 0;
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === this.playFor(aPerformance).type) {
            volumeCredits += Math.floor(aPerformance.audience / 5);
        };
        return volumeCredits;
    }

    amountFor(aPerformance) {
        let result = 0;
        switch (this.playFor(aPerformance).type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${this.playFor(aPerformance).type}`);
        }
        return result;
    }
}

export default Statement;