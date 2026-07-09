export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    private increaseQuality(item: Item) {
        if (item.quality < 50) {
            item.quality++;
        }
    }

    private decreaseQuality(item:Item) {
        if (item.quality > 0) {
            item.quality--;
        }
    }

    private decreaseSellIn(item:Item) {
        item.sellIn--;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++)
        {
            if (this.items[i].name === 'Sulfuras, Hand of Ragnaros')
                continue;

            switch (this.items[i].name) {

                case 'Aged Brie':
                    this.increaseQuality(this.items[i]);
                    if (this.items[i].sellIn <= 0) this.increaseQuality(this.items[i]);
                    break;

                case 'Backstage passes to a TAFKAL80ETC concert':
                    this.increaseQuality(this.items[i]);
                    if (this.items[i].sellIn <= 10) this.increaseQuality(this.items[i]);
                    if (this.items[i].sellIn <= 5) this.increaseQuality(this.items[i]);
                    if (this.items[i].sellIn <= 0) this.items[i].quality = 0;
                    break;

                case 'Conjured Mana Cake':
                    this.decreaseQuality(this.items[i]);
                    this.decreaseQuality(this.items[i]);
                    if (this.items[i].sellIn <= 0)
                    {
                        this.decreaseQuality(this.items[i]);
                        this.decreaseQuality(this.items[i]);
                    }
                    break;

                default:
                    this.decreaseQuality(this.items[i]);
                    if (this.items[i].sellIn <= 0) this.decreaseQuality(this.items[i]);
                    break;

            }
           this.decreaseSellIn(this.items[i]);
        }

        return this.items;
    }
}