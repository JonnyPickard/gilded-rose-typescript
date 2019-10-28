import { Item, Shop } from "../app";
import {
  CONJURED,
  BACKSTAGE_PASS,
  AGED_BRIE,
  SULFURAS
} from "../app/item-types";

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
      agedBrieItem = new Item(AGED_BRIE, 0, 0);
      sulfurasItem = new Item(SULFURAS, 0, 80);
      backstagePassItem = new Item(BACKSTAGE_PASS, 11, 20);
      backstagePassItem5DaysLeft = new Item(BACKSTAGE_PASS, 5, 20);
      conjuredItem = new Item(CONJURED, 1, 10);
    });

    describe("Regular item type", () => {
      it("should update the item correctly", () => {
        const updatedItem = new Item("foo", 1, 9);
        const shop = new Shop([item]);

        const items = shop.updateQuality();

        expect(items[0]).toEqual(updatedItem);
      });

      describe("When the sell by date has passed", () => {
        it("should degrade an item's quality twice as fast ", () => {
          const shop = new Shop([item]);

          const items = shop.updateQuality();

          // Degrades by 1
          shop.updateQuality();
          expect(items[0].quality).toEqual(8);

          // Degrades by 1
          shop.updateQuality();
          expect(items[0].quality).toEqual(6);

          // Degrades by 2 because its past the sell by date
          shop.updateQuality();
          expect(items[0].quality).toEqual(4);
        });
      });
    });

    describe("Aged Brie type", () => {
      it("should increase in quality as it ages", () => {
        const shop = new Shop([agedBrieItem]);

        const items = shop.updateQuality();
        expect(items[0].quality).toEqual(2);

        shop.updateQuality();
        expect(items[0].quality).toEqual(4);
      });
    });

    describe("Sulfuras item type", () => {
      it("should always have a quality value of 80", () => {
        const shop = new Shop([sulfurasItem]);

        const items = shop.updateQuality();

        const updateAmount = 100;

        for (let index = 0; index < updateAmount; index++) {
          shop.updateQuality();

          for (let item of items) {
            expect(item.quality).toBe(80);
          }
        }
      });
    });

    describe("Backstage pass item type", () => {
      it("should increase in quality by 1 when there are more than 10 days left", () => {
        const shop = new Shop([backstagePassItem]);

        const items = shop.updateQuality();

        // Example of using snapshot to show days left + quality
        expect(items[0]).toMatchInlineSnapshot(`
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 21,
            "sellIn": 10,
          }
        `);
      });

      it("should increase in quality by 2 when there are 10 - 6 days left", () => {
        const shop = new Shop([backstagePassItem]);

        // Qual starts at 20
        const items = shop.updateQuality(); // + 1

        shop.updateQuality(); // + 2
        shop.updateQuality(); // + 2
        shop.updateQuality(); // + 2

        expect(items[0].quality).toBe(27);
      });

      it("should increase in quality by 3 when there are or less days left", () => {
        const shop = new Shop([backstagePassItem5DaysLeft]);

        // Starts at 20
        const items = shop.updateQuality(); // + 3

        shop.updateQuality(); // + 3
        shop.updateQuality(); // + 3
        shop.updateQuality(); // + 3

        expect(items[0].quality).toBe(32);
      });

      it("should decrease to a quality of 0 after the concert", () => {
        const shop = new Shop([backstagePassItem5DaysLeft]);

        // Starts at 20
        const items = shop.updateQuality(); // + 3

        [...Array(5)].forEach(() => {
          shop.updateQuality();
        });

        expect(items[0].quality).toBe(0);
      });
    });

    describe("Conjured item type", () => {
      it("should degrade in quality by 2 when there are days left", () => {
        const shop = new Shop([conjuredItem]);

        const items = shop.updateQuality();

        expect(items[0].quality).toBe(8);
      });

      it("should degrade in quality by 4 when there are 0 days left", () => {
        const shop = new Shop([conjuredItem]);

        const items = shop.updateQuality();
        shop.updateQuality(); // 8

        expect(items[0].quality).toBe(4);
      });
    });

    describe("All item types", () => {
      it("should never have a negative quality value", () => {
        const shop = new Shop([
          item,
          agedBrieItem,
          sulfurasItem,
          backstagePassItem,
          conjuredItem
        ]);

        const items = shop.updateQuality();

        const updateAmount = 100;

        for (let index = 0; index < updateAmount; index++) {
          shop.updateQuality();

          for (let item of items) {
            expect(item.quality).toBeGreaterThanOrEqual(0);
          }
        }
      });
    });

    describe("All items except sulfuras", () => {
      it("should never have a quality value greater than 50", () => {
        const shop = new Shop([
          item,
          agedBrieItem,
          backstagePassItem,
          conjuredItem
        ]);

        const items = shop.updateQuality();

        const updateAmount = 100;

        for (let index = 0; index < updateAmount; index++) {
          shop.updateQuality();

          for (let item of items) {
            expect(item.quality).toBeLessThanOrEqual(50);
          }
        }
      });
    });

    describe("No items", () => {
      it("should return an empty array by default", () => {
        const shop = new Shop();

        const items = shop.updateQuality();

        expect(items).toEqual([]);
      });
    });
  });
});
