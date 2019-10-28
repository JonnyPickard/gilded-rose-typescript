import { AGED_BRIE, SULFURAS, BACKSTAGE_PASS } from "./itemTypes";
import { Item } from "./item";
import {
  updateAddOne,
  updateBackstagePass,
  updateDecreaseOne,
  updateFloorItem
} from "./helpers";

export class GildedRose {
  items: Item[];

  constructor(items = [] as Item[]) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name === SULFURAS) {
        continue;
      }

      // Standard item logic
      switch (item.name) {
        case AGED_BRIE:
          updateAddOne(item);
          break;
        case BACKSTAGE_PASS:
          updateBackstagePass(item);
          break;
        default:
          updateDecreaseOne(item);
          break;
      }

      // End of day
      item.sellIn -= 1;

      // Expired item logic
      if (item.sellIn < 0) {
        switch (item.name) {
          case AGED_BRIE:
            updateAddOne(item);
            break;
          case BACKSTAGE_PASS:
            updateFloorItem(item);
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
