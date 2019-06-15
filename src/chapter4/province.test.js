import Province from "./province";
import provinceData from "./province-data.json"

describe('Province Tests', () => {
    let asia;
    describe("Province with 3 Producers", () => {
        beforeEach(() => {
            asia = new Province(provinceData);
        })

        it('shortfall', () => {
            expect(asia.shortfall).toEqual(5);
        });
        it("profit", () => {
            expect(asia.profit).toEqual(230);
        })
        it("change production", () => {
            asia.producers[0].production = 20;
            expect(asia.shortfall).toEqual(-6);
            expect(asia.profit).toEqual(292);
        });
        it('zero demand', function () {
            asia.demand = 0;
            expect(asia.shortfall).toEqual(-25);
            expect(asia.profit).toEqual(0);
        });
        it('negative demand', function () {
            asia.demand = -1;
            expect(asia.shortfall).toEqual(-26);
            expect(asia.profit).toEqual(-10);
        });

        it('empty string demand', function () {
            asia.demand = "";
            expect(asia.shortfall).toEqual(NaN);
            expect(asia.profit).toEqual(NaN);
        });
    });
    describe("Province with no Producers", () => {
        let noProducers;
        beforeEach(function () {
            const data = {
                name: "No Producers",
                producers: [],
                demand: 30,
                price: 20
            };
            noProducers = new Province(data);
        });
        it('shortfall', () => {
            expect(noProducers.shortfall).toEqual(30);
        });
        it("profit", () => {
            expect(noProducers.profit).toEqual(0);
        })
    });
});