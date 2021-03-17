const sendForm = () => {
  const questionForm = document.getElementById("questionForm");
  const inputName = questionForm.querySelector("input[name=userName]");
  const inputPhone = questionForm.querySelector("input[name=userPhone]");
  const userQuestion = questionForm.querySelector(
    "textarea[name=userQuestion]"
  );
  const requestStatusMessage = questionForm.querySelector(
    ".footer-form__requestStatus"
  );

  const validate = (target = "") => {
    let isValid = 0;
    if (target.name === "userName") {
      target.value = target.value.replace(/[^а-я]/i, "");
    }

    if (target === "") {
      if (inputName.value.trim() === "") {
        inputName.nextElementSibling.textContent =
          "Обязательно введите ваше имя";
      } else if (inputName.value.trim().length < 2) {
        inputName.nextElementSibling.textContent =
          "Имя не должно быть короче двух букв";
      } else {
        inputName.nextElementSibling.textContent = "";
        isValid++;
      }
      if (inputPhone.value.length < 18) {
        inputPhone.nextElementSibling.textContent =
          "Обязательно введите полностью ваш телефон";
      } else {
        inputPhone.nextElementSibling.textContent = "";
        isValid++;
      }

      if (userQuestion.value.trim().length < 10) {
        userQuestion.nextElementSibling.textContent =
          "Длина вопроса должна быть не менее 10 символов";
      } else {
        userQuestion.nextElementSibling.textContent = "";
        isValid++;
      }
    }

    if (isValid === 3) {
      return true;
    }
  };

  document.addEventListener("input", event => {
    const target = event.target;

    if (target.matches("input") || target.matches("textarea")) {
      validate(target);
    }
  });

  document.addEventListener("submit", event => {
    event.preventDefault();

    const target = event.target;

    if (target.matches("#questionForm") && validate()) {
      requestStatusMessage.classList.add("success");
      requestStatusMessage.textContent = "Подождите, идет отправка...";

      const formData = new FormData(target);
      const body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      console.log(body);

      postData(body).then(showSuccess).catch(showError);
    }
  });

  function showSuccess(response) {
    if (response.status !== 200) {
      throw new Error("network status not 200!");
    }

    requestStatusMessage.classList.add("success");
    requestStatusMessage.textContent = "Ваш вопрос отправлен.";
    setTimeout(() => {
      requestStatusMessage.classList.remove("success");
      requestStatusMessage.textContent = "";
    }, 2000);
    questionForm.reset();
  }

  function showError() {
    if (requestStatusMessage.classList.contains("success")) {
      requestStatusMessage.classList.remove("success");
    }
    requestStatusMessage.classList.add("error");
    requestStatusMessage.textContent =
      "При отправке произошла ошибка, попробуйте повторить позже.";
    setTimeout(() => {
      requestStatusMessage.classList.remove("error");
      requestStatusMessage.textContent = "";
    }, 2000);
  }

  function postData(body) {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
};

export default sendForm;
