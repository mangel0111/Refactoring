import createPerformanceCalculator from "./performance-calculator";

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
        this.calculator = createPerformanceCalculator(aPerformance, this.playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = this.calculator.play;
        result.amount = this.calculator.amount;
        result.volumeCredits = this.calculator.volumeCredits;
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

}

export default CreateStatement;