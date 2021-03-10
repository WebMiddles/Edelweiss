const getBookingData = () => {
  const calendar = document.querySelectorAll(".calendar");
  const calendarMonth = document.querySelector(".calendar__month");
  const calendarDays = document.querySelector(".calendar__days");
  const date = new Date();

  const renderCalendar = () => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    date.setDate(1);

    const firstDayIndex = date.getDay() - 1;
    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      -1
    ).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    let days = "";

    calendarMonth.innerHTML = `${months[month]} ${year}`;

    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="calendar__day calendar__day--empty"></div>`;
      calendarDays.innerHTML = days;
    }

    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth()
      ) {
        days += `<div class="calendar__day calendar__day-today">${i}</div>`;
      } else {
        days += `<div class="calendar__day">${i}</div>`;
      }
      calendarDays.innerHTML = days;
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="calendar__day calendar__day--empty"></div>`;
      calendarDays.innerHTML = days;
    }
  };
  const eventListeners = elem => {
    elem.addEventListener("click", event => {
      const target = event.target;

      if (target.closest(".calendar__control")) {
        if (target.matches(".calendar__button-prev")) {
          date.setMonth(date.getMonth() - 1);
        }
        if (target.matches(".calendar__button-next")) {
          date.setMonth(date.getMonth() + 1);
        }
        renderCalendar();
      }
    });
  };

  calendar.forEach(elem => eventListeners(elem));

  const bookingForm = document.getElementById("bookingForm");

  bookingForm.addEventListener("click", event => {
    let target = event.target;

    target = target.closest(".hero-form__input-group");

    if (target) {
      target.querySelector(".calendar").classList.add("calendar_active");
    }
  });

  renderCalendar();
};

export default getBookingData;
