import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('Sulfuras never changes', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 100, 80) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Sulfuras, Hand of Ragnaros');
        expect(items[0].sellIn).to.equal(100);
        expect(items[0].quality).to.equal(80);
    });

    it('Backstage passes increases quality with 10 days or less left', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 9, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).to.equal(8);
        expect(items[0].quality).to.equal(12);
    });

    it('Backstage passes increases quality with 5 days or less left', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 2, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).to.equal(1);
        expect(items[0].quality).to.equal(13);
    });

    it('Backstage passes quality 0 after sellIn reaches negative', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', -1, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Backstage passes to a TAFKAL80ETC concert');
        expect(items[0].sellIn).to.equal(-2);
        expect(items[0].quality).to.equal(0);
    });

    it('Aged Brie increases quality the older it gets, sellIn pozitive', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 45) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(46);
    });
    it('Aged Brie increases quality the older it gets, sellIn negative', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', -1, 45) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].sellIn).to.equal(-2);
        expect(items[0].quality).to.equal(47);
    });

    it('Aged Brie maximum quality the older it gets', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 50) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Aged Brie');
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(50);
    });

    it('Normal Item decrease quality the older it gets', function() {
        const gildedRose = new GildedRose([ new Item('Magic Crow', 14, 30) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Magic Crow');
        expect(items[0].sellIn).to.equal(13);
        expect(items[0].quality).to.equal(29);
    });

    it('Normal Item maintain quality = 0  the older it gets', function() {
        const gildedRose = new GildedRose([ new Item('Fairy Dust', 14, 0) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Fairy Dust');
        expect(items[0].sellIn).to.equal(13);
        expect(items[0].quality).to.equal(0);
    });

    it('Normal Item no more sellIn days, quality 0', function() {
        const gildedRose = new GildedRose([ new Item('Fairy Dust', 0, 1) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Fairy Dust');
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });

    it('Normal Item no more sellIn days, quality positive', function() {
        const gildedRose = new GildedRose([ new Item('Fairy Dust', -1, 20) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Fairy Dust');
        expect(items[0].sellIn).to.equal(-2);
        expect(items[0].quality).to.equal(18);
    });

    it('Conjured Items quality degrading twice as fast, sellIn pozitive', function() {
        const gildedRose = new GildedRose([ new Item('Conjured Mana Cake', 7, 10) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Conjured Mana Cake');
        expect(items[0].sellIn).to.equal(6);
        expect(items[0].quality).to.equal(8);
    });

    it('Conjured Items quality degrading twice as fast, sellIn negative', function() {
        const gildedRose = new GildedRose([ new Item('Conjured Mana Cake', 0, 10) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('Conjured Mana Cake');
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(6);
    });

});
