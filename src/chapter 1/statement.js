import { usd } from "./utils";
import CreateStatement from "./create-statement";

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
            result += `<td>${usd(perf.amount)}</td></tr>\n`;
        }
        result += "</table>\n";
        result += `<p>Amount owed is <em>${usd(this.data.totalAmount)}</em></p>\n`;
        result += `<p>You earned <em>${this.data.totalVolumeCredits}</em> credits</p>\n`;
        return result;
    }

    renderPlainText() {
        let result = `Statement for ${this.data.customer}\n`;
        for (let perf of this.data.performances) {
            result += ` ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`;
        }
        result += `Amount owed is ${usd(this.data.totalAmount / 100)}\n`;
        result += `You earned ${this.data.totalVolumeOfCredits} credits\n`;
        return result;
    }
}

export default Statement;