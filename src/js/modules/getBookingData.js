const getBookingData = () => {
  const date = new Date();
  const bookingForm = document.getElementById("bookingForm");

  const renderCalendar = elem => {
    const calendar = elem.querySelector(".calendar");
    const calendarMonth = calendar.querySelector(".calendar__month");
    const calendarDays = calendar.querySelector(".calendar__days");

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

    calendar.style.display = "block";
  };

  const hideCalendar = () => {
    const calendar = bookingForm.querySelectorAll(".calendar");
    calendar.forEach(elem => {
      if (elem.style.display === "block") {
        elem.style.display = "none";
      }
    });
  };

  document.addEventListener("click", event => {
    let target = event.target;

    if (!target.closest(".calendar")) {
      hideCalendar();
    }

    target = target.closest("#bookingForm");
    if (target) {
      event.preventDefault();
      target = event.target;

      if (target.matches(".calendar__button-prev")) {
        date.setMonth(date.getMonth() - 1);
      }

      if (target.matches(".calendar__button-next")) {
        date.setMonth(date.getMonth() + 1);
      }

      target = target.closest(".hero-form__input-group");

      if (target && target.querySelector("input[type=date]")) {
        renderCalendar(target);
      }
    }
  });
};

export default getBookingData;
