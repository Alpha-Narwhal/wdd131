// Validate form on submit
function validateForm(event) {
  // Reference to the form being submitted
  const theForm = event.target;

  // Prepare to collect error messages
  const errors = [];

  // Assume the form is valid unless a validation fails
  let isValid = true;

  // Validate full name must be exactly "Bob"
  if (theForm.fullName.value !== "Bob") {
    isValid = false;
    errors.push("Only users named 'Bob' can submit the form.");
  }

  // Validate credit card number if credit card payment method is selected
  if (theForm.paymentMethod.value === "creditCard") {
    const ccNumber = theForm.creditCardNumber.value;
    if (ccNumber !== "1234123412341234") {
      isValid = false;
      errors.push("Credit card number is invalid. Use 1234123412341234 for testing.");
    }
  }

  // If form is invalid, prevent submission and show errors
  if (!isValid) {
    event.preventDefault();
    showErrors(errors);
    return false;
  }

  // Clear errors if any (optional)
  showErrors([]);
}

// Toggle payment details visibility and required attribute
function togglePaymentDetails(e) {
  const theForm = document.querySelector("#checkoutForm");
  const creditCardContainer = document.getElementById("creditCardNumberContainer");
  const paypalContainer = document.getElementById("paypalUsernameContainer");

  // Hide payment containers
  creditCardContainer.classList.add("hide");
  paypalContainer.classList.add("hide");

  // Disable required attribute on hidden inputs
  theForm.creditCardNumber.required = false;
  theForm.paypalUsername.required = false;

  // Show and require the inputs based on selected payment method
  if (theForm.paymentMethod.value === "creditCard") {
    creditCardContainer.classList.remove("hide");
    theForm.creditCardNumber.required = true;
  } else if (theForm.paymentMethod.value === "paypal") {
    paypalContainer.classList.remove("hide");
    theForm.paypalUsername.required = true;
  }
}

// Helper to display errors inside the .errors section
function showErrors(errors) {
  const errorEl = document.querySelector(".errors");
  if (errors.length === 0) {
    errorEl.innerHTML = "";
  } else {
    const html = errors.map((error) => `<p>${error}</p>`).join("");
    errorEl.innerHTML = html;
  }
}

// Attach event listeners after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Toggle payment inputs when payment method changes
  document
    .querySelector("#paymentMethod")
    .addEventListener("change", togglePaymentDetails);

  // Validate form on submit
  document
    .querySelector("#checkoutForm")
    .addEventListener("submit", validateForm);
});
