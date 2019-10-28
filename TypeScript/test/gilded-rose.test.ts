import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", () => {
  describe("#updateQuality", () => {
    let item: Item;
    let agedBrieItem: Item;
    let sulfurasItem: Item;
    let backstagePassItem: Item;
    let backstagePassItem5DaysLeft: Item;
    let conjuredItem: Item;

    beforeEach(() => {
      item = new Item("foo", 2, 10);
      agedBrieItem = new Item("Aged Brie", 0, 0);
      sulfurasItem = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
      backstagePassItem = new Item(
        "Backstage passes to a TAFKAL80ETC concert",
        11,
        20
      );
      backstagePassItem5DaysLeft = new Item(
        "Backstage passes to a TAFKAL80ETC concert",
        5,
        20
      );
      conjuredItem = new Item("Conjured Mana Cake", 3, 6);
    });

    describe("Regular item type", () => {
      it("should update the item correctly", () => {
        const updatedItem = new Item("foo", 1, 9);
        const gildedRose = new GildedRose([item]);

        const items = gildedRose.updateQuality();

        expect(items[0]).toEqual(updatedItem);
      });

      describe("When the sell by date has passed", () => {
        it("should degrade an item's quality twice as fast ", () => {
          const gildedRose = new GildedRose([item]);

          const items = gildedRose.updateQuality();

          // Degrades by 1
          gildedRose.updateQuality();
          expect(items[0].quality).toEqual(8);

          // Degrades by 1
          gildedRose.updateQuality();
          expect(items[0].quality).toEqual(6);

          // Degrades by 2 because its past the sell by date
          gildedRose.updateQuality();
          expect(items[0].quality).toEqual(4);
        });
      });
    });

    describe("Aged Brie type", () => {
      it("should increase in quality as it ages", () => {
        const gildedRose = new GildedRose([agedBrieItem]);

        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(2);

        gildedRose.updateQuality();
        expect(items[0].quality).toEqual(4);
      });
    });

    describe("Sulfuras item type", () => {
      it("should always have a quality value of 80", () => {
        const gildedRose = new GildedRose([sulfurasItem]);

        const items = gildedRose.updateQuality();

        const updateAmount = 100;

        for (let index = 0; index < updateAmount; index++) {
          gildedRose.updateQuality();

          for (let item of items) {
            expect(item.quality).toBe(80);
          }
        }
      });
    });

    describe("Backstage pass item type", () => {
      it("should increase in quality by 1 when there are more than 10 days left", () => {
        const gildedRose = new GildedRose([backstagePassItem]);

        const items = gildedRose.updateQuality();

        // Example of using snapshot to show days left + quality
        expect(items[0]).toMatchInlineSnapshot(`
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 21,
            "sellIn": 10,
          }
        `);
      });

      it("should increase in quality by 2 when there are 10 days left", () => {
        const gildedRose = new GildedRose([backstagePassItem]);

        // Qual starts at 20
        const items = gildedRose.updateQuality(); // + 1

        gildedRose.updateQuality(); // + 2
        gildedRose.updateQuality(); // + 2
        gildedRose.updateQuality(); // + 2

        expect(items[0].quality).toBe(27);
      });

      it("should increase in quality by 3 when there are 5 days left", () => {
        const gildedRose = new GildedRose([backstagePassItem5DaysLeft]);

        // Starts at 20
        const items = gildedRose.updateQuality(); // + 3

        gildedRose.updateQuality(); // + 3
        gildedRose.updateQuality(); // + 3
        gildedRose.updateQuality(); // + 3

        expect(items[0].quality).toBe(32);
      });

      it("should decrease to a quality of 0 after the concert", () => {
        const gildedRose = new GildedRose([backstagePassItem5DaysLeft]);

        // Starts at 20
        const items = gildedRose.updateQuality(); // + 3

        [...Array(5)].forEach(() => {
          gildedRose.updateQuality();
        });

        expect(items[0].quality).toBe(0);
      });
    });

    describe("Conjured item type", () => {
      it("should degrade in quality by 2", () => {
        const gildedRose = new GildedRose([conjuredItem]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toBe(4);
      });
    });

    describe("All item types", () => {
      it("should never have a negative quality value", () => {
        const gildedRose = new GildedRose([
          item,
          agedBrieItem,
          sulfurasItem,
          backstagePassItem,
          conjuredItem
        ]);

        const items = gildedRose.updateQuality();

        const updateAmount = 100;

        for (let index = 0; index < updateAmount; index++) {
          gildedRose.updateQuality();

          for (let item of items) {
            expect(item.quality).toBeGreaterThanOrEqual(0);
          }
        }
      });
    });

    describe("All items except sulfuras", () => {
      it("should never have a quality value greater than 50", () => {
        const gildedRose = new GildedRose([
          item,
          agedBrieItem,
          backstagePassItem,
          conjuredItem
        ]);

        const items = gildedRose.updateQuality();

        const updateAmount = 100;

        for (let index = 0; index < updateAmount; index++) {
          gildedRose.updateQuality();

          for (let item of items) {
            expect(item.quality).toBeLessThanOrEqual(50);
          }
        }
      });
    });
  });
});
