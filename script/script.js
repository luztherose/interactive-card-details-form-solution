// Get DOM Elements
const form = document.querySelector("#id-card-form");
const pErrorMessage = document.querySelector(".error-message");
const inputCardNumberError = document.querySelector("#cardNumber");
const inputCardExpMonth = document.querySelector("#cardExpMonth");
const inputCardExpYear = document.querySelector("#cardExpYear");
const inputCardVCV = document.querySelector("#cardCVC");
const pExpDateError = document.querySelector(".cardExpDateErrorMessage");
const pCardBackNumberError = document.querySelector(".card-back-number-Error-message");
const pCompleteState = document.querySelector(".complete-state-desktop");

// Cardholder Information
const pCardholderName = document.querySelector("#cardholder-name");
const pCardNumber = document.querySelector(".card-number");
const pExpMonth = document.querySelector("#exp-month");
const pExpYear = document.querySelector("#exp-year");
const pCardCVC = document.querySelector("#card-cvc");

// validate characters, numbers only

const areAllNumbers = (inputStr) => {
    return inputStr.split("").every(item => Number(item) >= 0);
}

// Validate Card Numbers input
const validateCardNumber = () => {
    const cardNumber = document.getElementById("cardNumber").value;
    let isAValidCard;

    if (cardNumber.length >= 12 && cardNumber.length <= 16) {
        const isValid = areAllNumbers(cardNumber);
        if (isValid) {
            isAValidCard = true;
        } else {
            isAValidCard = false;
            pErrorMessage.innerText = "Wrong format, numbers only";
            inputCardNumberError.classList.add("error-message-input-border");
        }
    } else {
        isAValidCard = false;
        pErrorMessage.innerText = "Wrong format";
        inputCardNumberError.classList.add("error-message-input-border");
    }

    return isAValidCard;
}

// Validate Exp Month 
const validateMonth = (cardExpMonth) => {
    let isAValidMonth;
    if (cardExpMonth === "") {
        isAValidMonth = false;
        pExpDateError.innerText = "Can't be blank";
    } else {
        const isValid = areAllNumbers(cardExpMonth);
        if (isValid) {
            const month = Number(cardExpMonth)
            if (month >= 1 && month <= 12) {
                isAValidMonth = true;
            } else {
                isAValidMonth = false;
                pExpDateError.innerText = "Month must be 01 - 12";
                inputCardExpMonth.classList.add("error-message-input-border");
            }
        } else {
            isAValidMonth = false;
            pExpDateError.innerText = "Wrong format, numbers only";
            inputCardExpMonth.classList.add("error-message-input-border");
        }
    }

    if ((cardExpMonth.length === 1 || cardExpMonth.length > 2)) {
        isAValidMonth = false;
        pExpDateError.innerText = "Two digits only (01 - 12)";
        if (cardExpMonth.length === 1 || cardExpMonth.length > 2) {
            inputCardExpMonth.classList.add("error-message-input-border");
        }
    }
    return isAValidMonth;
}

// Validate Exp Year 
const validateYear = (inputStr) => {
    let isAValidYear;

    if (cardExpYear === "") {
        isAValidYear = false;
        inputCardExpMonth.classList.add("error-message-input-border");
        pExpDateError.innerText = "Can't be blank";
    } else {
        const isValid = areAllNumbers(inputStr);
        if (isValid) {
            isAValidYear = true;
        } else {
            isAValidYear = false;
            pExpDateError.innerText = "Wrong format, numbers only";
            inputCardExpMonth.classList.add("error-message-input-border");
        }
    }

    if (cardExpYear.length === 1 || cardExpYear.length > 2) {
        isAValidYear = false;
        pExpDateError.innerText = "Two digits only (01 - 12)";
        if (cardExpYear.length === 1 || cardExpYear.length > 2) {
            inputCardExpYear.classList.add("error-message-input-border");
        }
    }

    return isAValidYear;
}

const alertEmptyField = (cardExpMonth, cardExpYear) => {
    let areAllFieldsFilled;
    if (cardExpMonth === "" && cardExpYear === "") {
        areAllFieldsFilled = false;
        inputCardExpMonth.classList.add("error-message-input-border");
        inputCardExpYear.classList.add("error-message-input-border");
        pExpDateError.innerText = "Can't be blank";
    }
    if (cardExpMonth === "") {
        areAllFieldsFilled = false;
        inputCardExpMonth.classList.add("error-message-input-border");
        pExpDateError.innerText = "Can't be blank";
    }

    if (cardExpYear === "") {
        areAllFieldsFilled = false;
        inputCardExpYear.classList.add("error-message-input-border");
        pExpDateError.innerText = "Can't be blank";
    }

    return !areAllFieldsFilled;
}

// Validate Exp Date 
const validateExpDate = (cardExpMonth, cardExpYear) => {
    let areAllFieldsFilled;
    let isAValidMonth;
    let isAValidYear;

    areAllFieldsFilled = alertEmptyField(cardExpMonth, cardExpYear);

    if (cardExpMonth.length > 0) {
        isAValidMonth = validateMonth(cardExpMonth);
    }

    if (cardExpYear.length > 0) {
        isAValidYear = validateYear(cardExpYear)
    }

    return areAllFieldsFilled && isAValidMonth && isAValidYear;
}

// Validate Back Card Code

const validateBackCardCode = (cardCVC) => {
    const isValid = areAllNumbers(cardCVC);
    let isAValidCVC;

    if (cardCVC === "") {
        isAValidCVC = false;
        inputCardVCV.classList.add("error-message-input-border");
        pCardBackNumberError.innerText = "Can't be blank";
    } else {
        const hasAvalidLength = cardCVC.length === 3 || cardCVC.length === 4;
        if (isValid && hasAvalidLength) {
            isAValidCVC = true;
        } else {
            isAValidCVC = false;
            inputCardVCV.classList.add("error-message-input-border");
            pCardBackNumberError.innerText = "Wrong format";
        }

    }
    return isAValidCVC;
}

// Display Cardholder information

const displayCardholderInfo = (
    cardholderName,
    cardNumber,
    cardExpMonth,
    cardExpYear,
    cardCVC) => {
    if (cardholderName) {
        pCardholderName.innerText = cardholderName;
    }
    if (cardNumber) {
        pCardNumber.innerText = cardNumber;
    }
    if (cardExpMonth) {
        pExpMonth.innerText = cardExpMonth;
    }
    if (cardExpYear) {
        pExpYear.innerText = cardExpYear;
    }
    if (cardCVC) {
        pCardCVC.innerText = cardCVC;
    }

}

const showCompleteStateScreen = () => {
    // Get user information from inputs
    const cardholderName = document.getElementById("cardholderName").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const cardExpMonth = document.getElementById("cardExpMonth").value;
    const cardExpYear = document.getElementById("cardExpYear").value;
    const cardCVC = document.getElementById("cardCVC").value;

    validateCardNumber(cardNumber);
    validateExpDate(cardExpMonth, cardExpYear);
    validateBackCardCode(cardCVC);
    displayCardholderInfo(cardholderName, cardNumber, cardExpMonth, cardExpYear, cardCVC);

    const areAllFieldsValidated = () => {
        return validateCardNumber(cardNumber) && validateExpDate(cardExpMonth, cardExpYear) && validateBackCardCode(cardCVC);
    }

    if (areAllFieldsValidated()) {
        form.classList.add("no-show")
        pCompleteState.classList.remove("no-show");
    }
}

const onSubmit = (event) => {
    event.preventDefault();
    showCompleteStateScreen();
}

form.addEventListener("submit", onSubmit);