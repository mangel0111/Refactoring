

class CreateStatement {
    constructor(invoice, plays) {
        this.data = {};
        this.invoice = invoice;
        this.plays = plays;
        this.data.customer = this.invoice.customer;
        this.data.performances = this.invoice.performances.map((aPerformance) => this.enrichPerformance(aPerformance));
        this.data.totalAmount = this.getTotalAmount();
        this.data.totalVolumeOfCredits = this.totalVolumeOfCredits();
    }

    enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        result.play = this.playFor(aPerformance);
        result.amount = this.amountFor(result);
        result.volumeCredits = this.volumeCreditsFor(result);
        return result;
    }

    getTotalAmount() {
        return this.data.performances.reduce((total, perf) => total + perf.amount, 0);
    }

    totalVolumeOfCredits() {
        return this.data.performances.reduce((total, perf) => total + perf.volumeCredits, 0);
    }

    playFor(aPerformance) {
        return this.plays[aPerformance.playID]
    };

    volumeCreditsFor(aPerformance) {
        let volumeCredits = 0;
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === aPerformance.play.type) {
            volumeCredits += Math.floor(aPerformance.audience / 5);
        };
        return volumeCredits;
    }

    amountFor(aPerformance) {
        let result = 0;
        switch (aPerformance.play.type) {
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
                throw new Error(`unknown type: ${aPerformance.play.type}`);
        }
        return result;
    }
}

class Statement {
    constructor(invoice, plays) {
        this.invoice = invoice;
        this.plays = plays;
        this.data = new CreateStatement(this.invoice, this.plays).data;
    }

    printBills() {
        return this.renderPlainText();
    }

    renderBills() {
        return this.renderHTML();
    }

    renderHTML() {
        let result = `<h1>Statement for ${this.data.customer}</h1>\n`;
        result += "<table>\n";
        result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
        for (let perf of this.data.performances) {
            result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
            result += `<td>${this.usd(perf.amount)}</td></tr>\n`;
        }
        result += "</table>\n";
        result += `<p>Amount owed is <em>${this.usd(this.data.totalAmount)}</em></p>\n`;
        result += `<p>You earned <em>${this.data.totalVolumeCredits}</em> credits</p>\n`;
        return result;

    }

    renderPlainText() {
        let result = `Statement for ${this.data.customer}\n`;
        for (let perf of this.data.performances) {
            result += ` ${perf.play.name}: ${this.usd(perf.amount / 100)} (${perf.audience} seats)\n`;
        }
        result += `Amount owed is ${this.usd(this.data.totalAmount / 100)}\n`;
        result += `You earned ${this.data.totalVolumeOfCredits} credits\n`;
        return result;
    }

    usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber);
    }

}

export default Statement;