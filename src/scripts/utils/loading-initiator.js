const LoadingInitiator = {
  init() {
    this.overlay = document.querySelector('.overlay');
    this.spanner = document.querySelector('.spanner');
  },

  showLoading() {
    this.overlay.classList.add('show');
    this.spanner.classList.add('show');
  },

  hideLoading() {
    this.overlay.classList.remove('show');
    this.spanner.classList.remove('show');
  },
};

export default LoadingInitiator;
