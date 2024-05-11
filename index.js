document.addEventListener("DOMContentLoaded", function () {
  const loginFormEl = document.getElementById("login-form");
  const emailInputEl = document.getElementById("email");
  const passwordInputEl = document.getElementById("password");
  const confirmPasswordInputEl = document.getElementById("confirmPassword");
  const emailErrorEl = document.getElementById("emailError");
  const passwordErrorEl = document.getElementById("passwordError");
  const confirmPasswordErrorEl = document.getElementById(
    "confirmPasswordError"
  );
  const showHideEl = document.getElementById("show-hide");

  loginFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });

  emailInputEl.addEventListener("blur", function () {
    validateEmail();
  });

  emailInputEl.addEventListener("change", function () {
    clearError(emailErrorEl);
  });

  passwordInputEl.addEventListener("change", function () {
    clearError(passwordErrorEl);
  });

  confirmPasswordInputEl.addEventListener("change", function () {
    clearError(confirmPasswordErrorEl);
  });

  showHideEl.addEventListener("click", function () {
    if (passwordInputEl.type == "password") {
      passwordInputEl.type = "text";
      confirmPasswordInputEl.type = "text";
    } else {
      passwordInputEl.type = "password";
      confirmPasswordInputEl.type = "password";
    }
  });

  function validateForm() {
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const passwordMatch = validatePasswordMatch();

    if (isValidEmail && isValidPassword && passwordMatch) {
      saveToLocalStorage();
      alert("Welcome! You are logged in!");
    }
  }

  function validateEmail() {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const emailValue = emailInputEl.value.trim();

    if (!emailRegex.test(emailValue)) {
      showError(emailErrorEl, "Enter a valid Email");
      return false;
    }

    return true;
  }

  function validatePassword() {
    const passwordValue = passwordInputEl.value.trim();

    if (passwordValue.length < 6) {
      showError(passwordErrorEl, "The password must be at least 6 characters");
      return false;
    }

    return true;
  }

  function validatePasswordMatch() {
    const passwordValue = passwordInputEl.value.trim();
    const confirmPasswordValue = confirmPasswordInputEl.value.trim();

    if (passwordValue != confirmPasswordValue) {
      showError(confirmPasswordErrorEl, "Passwords do not match");
      return false;
    }

    return true;
  }

  function showError(errorElement, message) {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
  }

  function clearError(errorElement) {
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
  }

  function saveToLocalStorage() {
    const emailValue = emailInputEl.value.trim();
    localStorage.setItem("email", emailValue);
    const body = bodyBuilderJSON();
    console.log(body);
  }

  function bodyBuilderJSON() {
    return {
      email: emailInputEl.value,
      password: passwordInputEl.value,
    };
  }
});
