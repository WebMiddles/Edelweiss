document.addEventListener("DOMContentLoaded", () => {
  const toggleBurgerMenu = () => {
    const navMenu = document.getElementById("nav"),
      header = document.querySelector(".header"),
      bookingForm = document.getElementById("bookingForm");

    const isActive = (elem, strClass) => {
      return elem.classList.contains(strClass);
    };

    const toggleMenu = () => {
      navMenu.classList.toggle("menu_active");
      document.body.style.overflow = isActive(navMenu, "menu_active")
        ? "hidden"
        : "auto";
      header.classList.toggle("header-menu_active");
    };

    document.addEventListener("click", (event) => {
      let target = event.target;

      target = target.closest("button#menuBtn") || target.matches("#nav");
      if (target) {
        toggleMenu();
      }
    });
  };

  toggleBurgerMenu();
});
