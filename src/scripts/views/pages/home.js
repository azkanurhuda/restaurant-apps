import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import LoadingInitiator from '../../utils/loading-initiator';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <section class="content">
            <div class="latest">
                <h1 class="catalog">Restautant Catalog</h1>
                <div class="list" id="restaurantcatalog"></div>
            </div>
        </section>
    `;
  },

  async afterRender() {
    LoadingInitiator.init();

    LoadingInitiator.showLoading();
    try {
      const restaurants = await TheRestaurantDbSource.listRestaurant();
      const restaurantContainer = document.querySelector('#restaurantcatalog');
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      alert(`${error}\n Gagal memuat Halaman, cobalah beberapa saat lagi`);
    }
    LoadingInitiator.hideLoading();
  },
};

export default Home;
