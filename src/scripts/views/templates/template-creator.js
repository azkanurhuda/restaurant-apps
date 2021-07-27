import CONFIG from '../../globals/config';
import extractStringFromList from '../../utils/list-helper';

const createList = (array) => {
  let innerList = '';
  array.forEach((element) => {
    innerList += `<li class="list_menu">${element}</li>`;
  });
  return innerList;
};

const createReview = (array) => {
  let innerReview = '';
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    innerReview += `
        <div class="card_review">
            <p>${element.date} by ${element.name}</p>
            <p>${element.review}</p>
        </div>
    `;
    if (i === 4) {
      break;
    }
  }
  return innerReview;
};

const showAllReview = (array) => {
  let innerReview = '';
  array.forEach((element) => {
    innerReview += `
      <div class="card_review">
        <p>${element.date} by ${element.name}</p>
        <p>${element.review}</p>
      </div>
    `;
  });
  return innerReview;
};

const createRestaurantItemTemplate = (restaurant) => `
    <div class="post_item">
      <a href="#/detail/${restaurant.id}">
        <img class="post_thumbnail lazyload" data-src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}"
        alt="${restaurant.name}" title="${restaurant.name}">
        <div class="kota">Kota : ${restaurant.city}</div>
        <div class="post_content">
            <div class="rating">Rating : ${restaurant.rating} / 5</div>
            <h1 class="post_item_title">${restaurant.name}</h1>
            <div class="post_item_description">Description :
            ${restaurant.description.slice(0, 111)}...</div>
        </div>
      </a>
    </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
    <h2 class="restaurant_title">${restaurant.name}</h2>
    <img class="restaurant_poster" src="${CONFIG.BASE_IMAGE_URL}large/${restaurant.pictureId}" alt="${restaurant.name}" />
    <div class="restaurant_info">
      <h3>Information</h3>
      <h4>Rating</h4>
      <p>${restaurant.rating}</p>
      <h4>Location</h4>
      <p>${restaurant.address}, ${restaurant.city}</p>
      <h4>Kategori Menu</h4>
      <p>${extractStringFromList(restaurant.categories)}</p>
    </div>
    <div class="info_menu">
        <div class="menu_makanan">
            <h4>Menu Makanan</h4>
            <ul>${createList(extractStringFromList(restaurant.menus.foods))}</ul>
        </div>
        <div class="menu_minuman">
            <h4>Menu Minuman</h4>
            <ul>${createList(extractStringFromList(restaurant.menus.drinks))}</ul>
        </div>
    </div>
    <div class="restaurant_overview">
        <h3>Overview</h3>
        <p>${restaurant.description}</p>
    </div>
    <div class="customer_review">
        <h3>Customer Review</h3>
        <div id="review-container">
            ${createReview(restaurant.customerReviews)}
        </div>
        <button id="btn_show" class="btn_show">Show All</button>
    </div>
    <div class="customer_review">
      <h3>Add Review</h3>
      <div class="add_review">
        <div class="container_input">
          <p class="label">Name</p>
          <input class="input" type="text" id="name" name="name"></input>
        </div>
        <div class="container_input">
          <p class="label">Review</p>
          <textarea class="input" type="text" id="review" name="review"></textarea>
        </div>
        <button id="btn_submit" class="btn_submit">Submit</button>
      </div>
    </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createReview,
  showAllReview,
};
