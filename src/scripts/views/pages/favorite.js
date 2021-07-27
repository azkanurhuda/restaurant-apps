import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import LoadingInitiator from '../../utils/loading-initiator';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
        <section class="content">
            <div class="latest">
                <h1 class="catalog">Your Favorite Restaurant</h1>
                <h1 id="empty_data">No Data Found</h1>
                <div class="list" id="favoriteRestaurant"></div>
            </div>
        </section>
    `;
  },

  async afterRender() {
    LoadingInitiator.init();

    LoadingInitiator.showLoading();
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      const restaurantsContainer = document.querySelector('#favoriteRestaurant');
      const emptyData = document.querySelector('#empty_data');
      if (restaurants.length === 0) {
        emptyData.classList.remove('hide');
      } else {
        emptyData.classList.add('hide');
        restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
      }
    } catch (error) {
      alert(`${error}\nGagal memuat halaman, cobalah beberapa saat lagi`);
    }
    LoadingInitiator.hideLoading();
  },
};

export default Favorite;
