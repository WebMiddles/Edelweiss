const activitiesSlider = () => {
  const slider = document.querySelector(".activities-slider"),
    slide = slider.querySelectorAll(".activities-slider__item");

  let currentSlide = 0,
    interval;

  const createDotsWrap = () => {
    const dotsWrap = document.createElement("ul");

    dotsWrap.classList.add("slider-pagination", "activities-pagination");

    slider.append(dotsWrap);

    return dotsWrap;
  };

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const addDots = () => {
    const dotsWrap = createDotsWrap();
    slide.forEach(() => {
      const dot = document.createElement("li");
      dot.classList.add("slider-pagination__item");
      dotsWrap.append(dot);
    });
    dotsWrap
      .querySelector(".slider-pagination__item")
      .classList.add("slider-pagination__item_active");
  };

  addDots();

  const dot = document.querySelectorAll(".slider-pagination__item");

  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, "activities-slider__item_active");
    prevSlide(dot, currentSlide, "slider-pagination__item_active");
    currentSlide++;

    if (currentSlide === slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, "activities-slider__item_active");
    nextSlide(dot, currentSlide, "slider-pagination__item_active");
  };

  const startSlide = (time = 4000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener("click", event => {
    event.preventDefault();

    const target = event.target;

    if (!target.matches(".gallery-slider-btn, .slider-pagination__item")) {
      return;
    }

    prevSlide(slide, currentSlide, "activities-slider__item_active");
    prevSlide(dot, currentSlide, "slider-pagination__item_active");

    if (target.matches(".slider-pagination__item")) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }

    nextSlide(slide, currentSlide, "activities-slider__item_active");
    nextSlide(dot, currentSlide, "slider-pagination__item_active");
  });

  slider.addEventListener("mouseover", event => {
    const target = event.target;
    if (
      target.matches(".gallery-slider-btn") ||
      target.matches(".slider-pagination__item") ||
      target.matches(".activities-slider__button")
    ) {
      stopSlide();
    }
  });

  slider.addEventListener("mouseout", event => {
    const target = event.target;
    if (
      target.matches(".gallery-slider-btn") ||
      target.matches(".slider-pagination__item") ||
      target.matches(".activities-slider__button")
    ) {
      startSlide();
    }
  });

  slide[0].classList.add("activities-slider__item_active");

  startSlide(4000);
};

export default activitiesSlider;
