import { Item } from "./item";

export const updateAddOne = (item: Item) => {
  if (item.quality < 50) {
    item.quality += 1;
  }
};

export const updateDecreaseOne = (item: Item) => {
  if (item.quality > 0) {
    item.quality -= 1;
  }
};

export const updateFloorItem = (item: Item) => {
  item.quality = 0;
};

export const updateBackstagePass = (item: Item) => {
  updateAddOne(item);

  if (item.sellIn < 11) {
    updateAddOne(item);
  }

  if (item.sellIn < 6) {
    updateAddOne(item);
  }
};
