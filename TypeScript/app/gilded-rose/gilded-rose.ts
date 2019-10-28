import { Item } from "./item";

export class GildedRose {
  items: Item[];

  constructor(items = [] as Item[]) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        // Normal items -- *
        this.items[i].name !== "Aged Brie" &&
        this.items[i].name !== "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
        // Normal items -- *
      } else {
        // Other items
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          // Backstage pass -- *
          if (
            this.items[i].name === "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
        // Backstage pass -- *
      }
      // Other items

      // All items bar sulfuras Sell in
      if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      const updateAgedBrie = () => {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      };

      // All items bar sulfuras
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name === "Aged Brie") {
          updateAgedBrie();
        } else {
          if (
            this.items[i].name === "Backstage passes to a TAFKAL80ETC concert"
          ) {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          } else {
            if (this.items[i].quality > 0) {
              if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          }
        }
      }
    }

    return this.items;
  }
}
