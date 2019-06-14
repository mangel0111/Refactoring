class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
        this.amount = this.getAmount();
        this.volumeCredits = this.getVolumeCredits();
    }

    getAmount() {
        throw new Error('subclass responsibility');
    }

    getVolumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }
}

const createPerformanceCalculator = (aPerformance, aPlay) => {
    switch (aPlay.type) {
        case "tragedy": {
            return new TragedyCalculator(aPerformance, aPlay)
        };
        case "comedy": {
            return new ComedyCalculator(aPerformance, aPlay);
        }
        default: {
            throw new Error(`unknown type: ${aPlay.type}`);
        }
    }
}

class TragedyCalculator extends PerformanceCalculator {
    getAmount() {
        let result = 0;
        result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    getAmount() {
        let result = 0;
        result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    getVolumeCredits() {
        return super.getVolumeCredits() + Math.floor(this.performance.audience / 5);
    }
}


export default createPerformanceCalculator;