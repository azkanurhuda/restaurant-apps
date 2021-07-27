/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('liking one retaurant', async ({ I }) => {
  I.see('No Data Found', '#empty_data');
  I.amOnPage('/');
  I.seeElement('.post_item a');
  const clicked = locate('.post_item a').first();
  const firstRestaurant = locate('.post_item_title').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(clicked);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.post_item a');
  const likedRestaurant = locate('.post_item_title').first();
  const likedRestaurantTitle = await I.grabTextFrom(likedRestaurant);
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('No Data Found', '#empty_data');
  I.amOnPage('/');
  I.seeElement('.post_item a');
  const clicked = locate('.post_item a').first();
  I.click(clicked);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.post_item a');
  const clickedLiked = locate('.post_item a').first();
  I.click(clickedLiked);

  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.see('No Data Found', '#empty_data');
});
