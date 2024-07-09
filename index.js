// Grabbing the input fields
const inputQuery = document.querySelectorAll(".form-input-query");
const inputEmail = document.querySelector(".form-input-email");
const inputCheckbox = document.querySelector(".form-input-checkbox");
const inputTextField = document.querySelectorAll(".form-input");

//
const successMessage = document.querySelector(".success-message");

// Grabbing the form
const form = document.querySelector("form");
let validData = true;

// Changing Query-Type Style While Changing
inputQuery.forEach((input) => {
  input.addEventListener("change", function (e) {
    inputQuery.forEach((inp) =>
      inp.closest(".form-query").classList.remove("form-input-query-selected")
    );

    this.closest(".form-query").classList.add("form-input-query-selected");

    this.closest(".form-query-type").querySelector(".label-error").innerText =
      "";
  });
});

function setTextFieldError(element, message) {
  const parent = element.parentElement;
  const errorDisplay = parent.querySelector(".label-error");

  element.classList.add("errorBorder");

  errorDisplay.innerText = message;
  validData = false;
}

function setRadioAndCheckboxError(element, message) {
  const parent = element.parentElement;
  const errorDisplay = parent.querySelector(".label-error");

  errorDisplay.innerText = message;
  validData = false;
}

function emptyFieldCheck() {
  inputTextField.forEach((element) => {
    if (element.value == "") {
      setTextFieldError(element, "This Field is Required");
    } else {
      removeTheErrors(element);
    }
  });
}

function isRadioButtonChecked() {
  for (const radiobutton of inputQuery) {
    if (radiobutton.checked) {
      return true;
    }
  }
  //   Show error msg - please select query type
  setRadioAndCheckboxError(
    inputQuery[0].parentElement.parentElement,
    "Please Select Query Type"
  );

  return false;
}

function setFieldEmpty() {
  inputTextField.forEach((element) => (element.value = ""));

  inputQuery.forEach((input) => {
    input.checked = false;
    input.closest(".form-query").classList.remove("form-input-query-selected");
  });

  inputCheckbox.checked = false;
}

function validateEmailAddress() {
  //   console.log(inputEmail.value);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!inputEmail.value) return;

  console.log("not empty");
  const isValid = emailPattern.test(inputEmail.value);

  if (isValid) return;

  setTextFieldError(inputEmail, "Please enter a valid email address");
}

function removeTheErrors(element) {
  const parent = element.parentElement;
  const errorDisplay = parent.querySelector(".label-error");

  element.classList.remove("errorBorder");

  errorDisplay.innerText = "";
}

// Removing the errors
inputCheckbox.addEventListener("change", function (e) {
  removeTheErrors(e.target.parentElement);
  // console.log(e.target.parentElement);
});

inputTextField.forEach((element) => {
  element.addEventListener("change", function (e) {
    removeTheErrors(e.target);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emptyFieldCheck();
  isRadioButtonChecked();

  //   Checking checkbox:
  inputCheckbox.checked
    ? (validData = true)
    : setRadioAndCheckboxError(
        inputCheckbox.parentElement,
        "To submit this form, please consent to being contacted"
      );

  //   validating the email
  validateEmailAddress();

  // if all fine then -- show success msg..
  if (validData) {
    setFieldEmpty();
    successMessage.classList.add("animate");
    setTimeout(() => {
      successMessage.classList.remove("animate");
    }, 3000);

    document.body.scrollIntoView({ behavior: "smooth" });
  }
});
