import toggleBurgerMenu from "@modules/toggleBurgerMenu";
import getBookingData from "@modules/getBookingData";
import servicesSlider from "@modules/servicesSlider";
import activitiesSlider from "@modules/activitiesSlider";
import getWeather from "@modules/getWeather";

import "@sass/styles.sass";

toggleBurgerMenu();

getBookingData();

servicesSlider();

activitiesSlider();

getWeather();
