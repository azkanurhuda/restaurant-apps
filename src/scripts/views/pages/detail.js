import UrlParser from '../../routes/url-parser';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantDetailTemplate, showAllReview } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import LoadingInitiator from '../../utils/loading-initiator';

const Detail = {
  async render() {
    return `
        <section class="content">
            <div class="detail">
                <div id="restaurant" class="restaurant"></div>
                <div id="likeButtonContainer"></div>
            </div>
        </section>
    `;
  },

  async afterRender() {
    LoadingInitiator.init();

    LoadingInitiator.showLoading();
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      const btnShow = document.querySelector('#btn_show');
      const reviewContainer = document.querySelector('#review-container');
      btnShow.addEventListener('click', () => {
        reviewContainer.innerHTML = showAllReview(restaurant.customerReviews);
        btnShow.classList.add('hide');
      });

      const btnSubmit = document.querySelector('#btn_submit');
      const name = document.querySelector('#name');
      const review = document.querySelector('#review');
      btnSubmit.addEventListener('click', async () => {
        LoadingInitiator.showLoading();
        if (!name.value || !review.value) {
          alert('Data tidak lengkap');
        } else {
          const reviews = await TheRestaurantDbSource.addReview(JSON.stringify(
            {
              id: `${url.id}`,
              name: `${name.value}`,
              review: `${review.value}`,
            },
          ));
          reviewContainer.innerHTML = showAllReview(reviews);
          name.value = '';
          review.value = '';
          btnShow.classList.add('hide');
        }
        LoadingInitiator.hideLoading();
      });

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          rating: restaurant.rating,
          description: restaurant.description,
        },
      });
    } catch (error) {
      alert(`${error}\n Gagal memuat halaman, coba beberapa saat lagi`);
    }
    LoadingInitiator.hideLoading();
  },
};

export default Detail;
