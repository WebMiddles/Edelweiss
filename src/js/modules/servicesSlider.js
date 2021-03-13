const servicesSlider = () => {
  const sliderContainer = document.getElementById("servicesSlider");
  const sliderWrapper = document.getElementById("servicesSliderWrapper");
  const sliderSlide = sliderWrapper.querySelectorAll(".slider-slide");
  const slideBackground = sliderContainer.querySelector(
    ".services-slider__background"
  );
  const slideCount = sliderSlide.length;

  let position = -770;
  let count = 1;

  slideBackground.classList.add("active");
  sliderSlide[count].classList.add("slider-slide_active");
  sliderWrapper.style.transform = `translateX(${position}px)`;

  sliderContainer.addEventListener("click", event => {
    const target = event.target;

    if (
      target.matches(".services-slider__button_prev") ||
      target.matches(".services-slider__button_next")
    ) {
      slideBackground.classList.remove("active");
      sliderSlide[count].classList.remove("slider-slide_active");
      setTimeout(() => {
        slideBackground.classList.add("active");
        sliderSlide[count].classList.add("slider-slide_active");
      }, 1000);
    }

    if (target.matches(".services-slider__button_prev") && count > 0) {
      position += 770;
      count--;
    }
    if (
      target.matches(".services-slider__button_next") &&
      count < slideCount - 1
    ) {
      position -= 770;
      count++;
    }

    sliderWrapper.style.transform = `translateX(${position}px)`;
  });
};

export default servicesSlider;
