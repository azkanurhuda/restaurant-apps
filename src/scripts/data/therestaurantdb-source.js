import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class TheRestaurantDbSource {
  static async listRestaurant() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async searchRestaurant(query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async addReview(body) {
    const response = await fetch(API_ENDPOINT.ADD_REVIEW,
      {
        headers: {
          'X-Auth-Token': CONFIG.KEY,
          'Content-Type': 'application/json',
        },
        body,
        method: 'POST',
      });
    const responseJson = await response.json();
    return responseJson.customerReviews;
  }
}

export default TheRestaurantDbSource;
