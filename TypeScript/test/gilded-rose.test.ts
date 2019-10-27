import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", () => {
  describe("#updateQuality", () => {
    it("should not update the item name", () => {
      const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toEqual("foo");
    });
  });
});
