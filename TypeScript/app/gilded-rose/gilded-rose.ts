import { Item } from "./item";

const updateAddOne = (item: Item) => {
  if (item.quality < 50) {
    item.quality += 1;
  }
};

const updateBackstagePassPositive = (item: Item) => {
  const { sellIn } = item;

  if (sellIn < 11) {
    updateAddOne(item);
  }

  if (sellIn < 6) {
    updateAddOne(item);
  }
};

const updateAgedBrie = (item: Item) => {
  updateAddOne(item);
};

const updateBackstagePassNegative = (item: Item) => {
  item.quality = 0;
};

const updateDefaultItem = (item: Item) => {
  item.quality -= 1;
};

export class GildedRose {
  items: Item[];

  constructor(items = [] as Item[]) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const { name } = item;

      switch (name) {
        case "Aged Brie":
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          updateBackstagePassPositive(item);
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;

        default:
          break;
      }

      // Pre sell in
      if (
        name !== "Aged Brie" &&
        name !== "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (item.quality > 0) {
          if (name !== "Sulfuras, Hand of Ragnaros") {
            updateDefaultItem(item); // not b, bs || sulf
          }
        }
      } else {
        // b, bs + sulf
        updateAddOne(item);
      }

      // All items bar sulfuras Sell in
      if (name !== "Sulfuras, Hand of Ragnaros") {
        item.sellIn -= 1;
      }

      // Post sell in change
      // All items bar sulfuras - past sell in date
      if (item.sellIn < 0) {
        if (name === "Aged Brie") {
          updateAgedBrie(item);
        } else {
          if (name === "Backstage passes to a TAFKAL80ETC concert") {
            updateBackstagePassNegative(item);
          } else {
            if (item.quality > 0) {
              if (name !== "Sulfuras, Hand of Ragnaros") {
                updateDefaultItem(item);
              }
            }
          }
        }
      }
    }

    return this.items;
  }
}
