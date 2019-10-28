import { Item } from "./item";
import { AGED_BRIE, SULFURAS, BACKSTAGE_PASS } from "./itemTypes";

const updateAddOne = (item: Item) => {
  if (item.quality < 50) {
    item.quality += 1;
  }
};

const updateDecreaseOne = (item: Item) => {
  if (item.quality > 0) {
    item.quality -= 1;
  }
};

const updateIncrementBackstagePass = (item: Item) => {
  const { sellIn } = item;

  if (sellIn < 11) {
    updateAddOne(item);
  }

  if (sellIn < 6) {
    updateAddOne(item);
  }
};

const updateFloorBackstagePass = (item: Item) => {
  item.quality = 0;
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

      if (name === SULFURAS) {
        continue;
      }

      switch (name) {
        case AGED_BRIE:
          updateAddOne(item);
          break;
        case BACKSTAGE_PASS:
          updateAddOne(item);
          updateIncrementBackstagePass(item);
          break;
        default:
          updateDecreaseOne(item);
          break;
      }

      item.sellIn -= 1;

      // Post sell in change
      if (item.sellIn < 0) {
        switch (name) {
          case AGED_BRIE:
            updateAddOne(item);
            break;
          case BACKSTAGE_PASS:
            updateFloorBackstagePass(item);
            break;
          default:
            updateDecreaseOne(item);
            break;
        }
      }
    }

    return this.items;
  }
}
