import { Item } from "./item";

const updateBackstagePassPositive = (item: Item) => {
  if (item.sellIn < 11) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }
  if (item.sellIn < 6) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }
};

const updateAgedBrie = (item: Item) => {
  if (item.quality < 50) {
    item.quality += 1;
  }
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

      if (
        name !== "Aged Brie" &&
        name !== "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (item.quality > 0) {
          if (name !== "Sulfuras, Hand of Ragnaros") {
            updateDefaultItem(item);
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality += 1;

          if (name === "Backstage passes to a TAFKAL80ETC concert") {
            updateBackstagePassPositive(item);
          }
        }
      }

      // All items bar sulfuras Sell in
      if (name !== "Sulfuras, Hand of Ragnaros") {
        item.sellIn -= 1;
      }

      // All items bar sulfuras
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
