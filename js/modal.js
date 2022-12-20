
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close");
const form1 = document.getElementsByName("reserve");
const submit = document.getElementById("btn-submit-modal")
const btnRedClose = document.getElementById("close")
const menu = document.getElementById("menu")


function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


 // launch menu in responsive
menu.addEventListener("click", editNav)

// submit form
submit.addEventListener("click", validate)

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}
function closeModal2() {
  modalbg.style.display = "none";
}

// Close modal event
btnRedClose.addEventListener("click", closeModal2);

// Close modal event
modalCloseBtn[0].addEventListener("click", closeModal);

// Keep form data
form1[0].addEventListener("submit", (e) => {
  e.preventDefault();
});

// Check validation of condition provided
function checkCondition(condition) {
  if (!condition) return false;
  else return true;
}

// Send specific error message rather than elementId provided
// Add aria invalid for use CSS
function getErrorMessage(elementId, message, inputAssociate) {
  if (elementId && message) {
    document.getElementById(elementId).style.display = "block";
    document.getElementById(elementId).innerText = message;
    if (inputAssociate) inputAssociate.setAttribute("aria-invalid", "true");
  } else throw new Error("Missing parameter for handler error message");
}

//2nd submit, hide a valid field previous invlid
// Swich aria invalid to false for use CSS
function hideErrorMessage(elementId, inputAssociate) {
  if (elementId) document.getElementById(elementId).style.display = "none";
  if (inputAssociate) inputAssociate.setAttribute("aria-invalid", "false");
}

//Check after submit form conditon, and call function who show specific message or a valid field
function validate() {
  const form = document.getElementsByName("reserve");
  let firstNameValid = checkCondition(form[0][0]?.value) && checkCondition(form[0][0].value.length >= 2);
  firstNameValid ? hideErrorMessage("error-firstName", form[0][0]) : getErrorMessage("error-firstName", "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", form[0][0]);
  let lastNameValid = checkCondition(form[0][1]?.value) && checkCondition(form[0][1].value.length >= 2);
  lastNameValid ? hideErrorMessage("error-lastName", form[0][1]) : getErrorMessage("error-lastName", "Veuillez entrer 2 caractères ou plus pour le champ du nom.", form[0][1]);

  //https://regex101.com/
  let emailValid = checkCondition(form[0][2]?.value) && checkCondition(/[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(form[0][2].value));
  emailValid ? hideErrorMessage("error-email", form[0][2]) : getErrorMessage("error-email", "Veuillez entrer une adresse mail valide.", form[0][2]);

  let birthdateValid = checkCondition(form[0][3]?.value) && checkCondition(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(form[0][3].value));
  birthdateValid ? hideErrorMessage("error-birthdate", form[0][3]) : getErrorMessage("error-birthdate", "Veuillez entrer une date de naissance.", form[0][3]);

  //isNaN return false if is a number, true if not
  let qteTournamentValid = checkCondition(form[0][4]?.value) && checkCondition(/^[0-9]+$/.test(form[0][4].value));
  qteTournamentValid ? hideErrorMessage("error-tournament", form[0][4]) : getErrorMessage("error-tournament", "Veuillez entrer une valeur numérique.", form[0][4]);

  let locationValid = checkCondition(form[0][5].checked || form[0][6].checked || form[0][7].checked || form[0][8].checked || form[0][9].checked || form[0][10].checked);
  locationValid ? hideErrorMessage("error-location") : getErrorMessage("error-location", "Veuillez sélectionner une ville.");

  let termsValid = checkCondition(form[0][11].checked);
  termsValid ? hideErrorMessage("error-terms") : getErrorMessage("error-terms", "Veuillez indiquer que vous acceptez les conditions générales.");
console.log(form[0][5].checked);
  // Check the confirmation form, show a confirmation message
  if (firstNameValid && lastNameValid && emailValid && birthdateValid && qteTournamentValid && locationValid && termsValid) {
    document.querySelector(".modal-body").style.display = "none";
    document.querySelector(".formConfirmation").style.display = "flex";
  }
  
}