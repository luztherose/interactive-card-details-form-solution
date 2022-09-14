// Get DOM Elements
const form = document.querySelector("#id-card-form");
const pCardNumberErrorMessage = document.querySelector(".cardNumberErrorMessage");
const inputCardholderError = document.querySelector("#input-cardholder-name");
const inputCardNumberError = document.querySelector("#input-card-number");
const inputCardExpMonth = document.querySelector("#input-card-exp-month");
const inputCardExpYear = document.querySelector("#input-card-exp-year");
const inputCardVCV = document.querySelector("#input-card-cvc");
const pCardholderNameErrorMessage = document.querySelector(".cardholderNameErrorMessage");
const pExpDateError = document.querySelector(".cardExpDateErrorMessage");
const pCardBackNumberError = document.querySelector(".card-back-number-Error-message");
const pCompleteState = document.querySelector(".complete-state-desktop");
const continueButton = document.querySelector("#continue-button");

// Cardholder Elements
const pCardholderName = document.querySelector("#cardholder-name");
const pCardNumber = document.querySelector(".card-number");
const pExpMonth = document.querySelector("#exp-month");
const pExpYear = document.querySelector("#exp-year");
const pCardCVC = document.querySelector("#card-cvc");

// validate user input, numbers only
const areAllNumbers = (inputStr) => {
    return inputStr.split("").every(item => Number(item) >= 0);
}

// Validate cardholder input
const validateCardholderName = (cardholderName) => {
    let isValid;
    if (cardholderName === "") {
        isValid = false;
        pCardholderNameErrorMessage.innerText = "Can't be blank";
        inputCardholderError.classList.add("error-message-input-border");
    } else {
        isValid = true;
    }

    return isValid;
}

// Validate Card Numbers input
const validateCardNumber = (cardNumber) => {
    let isAValidCard;

    if (cardNumber === "") {
        isAValidCard = false;
        pCardNumberErrorMessage.innerText = "Can't be blank";
        inputCardNumberError.classList.add("error-message-input-border");
    } else {

        if (cardNumber.length === 15 || cardNumber.length === 16) {
            const isValid = areAllNumbers(cardNumber);
            if (isValid) {
                isAValidCard = true;
            } else {
                isAValidCard = false;
                pCardNumberErrorMessage.innerText = "Wrong format, numbers only";
                inputCardNumberError.classList.add("error-message-input-border");
            }
        } else {
            isAValidCard = false;
            pCardNumberErrorMessage.innerText = "Wrong format";
            inputCardNumberError.classList.add("error-message-input-border");
        }
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
            const month = Number(cardExpMonth);
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
const validateYear = (cardExpYear) => {
    let isAValidYear;

    if (cardExpYear === "") {
        isAValidYear = false;
        inputCardExpMonth.classList.add("error-message-input-border");
        pExpDateError.innerText = "Can't be blank";
    } else {
        const isValid = areAllNumbers(cardExpYear);
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

const alertEmptyDateFields = (cardExpMonth, cardExpYear) => {
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

    areAllFieldsFilled = alertEmptyDateFields(cardExpMonth, cardExpYear);

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
const formatCardNumber = (cardNumber) => {
    const cardNumArr = cardNumber.split("");
    const newArr = [];
    let count = 0;

    for (let i = 0; i < cardNumArr.length; i++) {
        count++
        newArr.push(cardNumArr[i]);
        if (count === 4) {
            newArr.push(" ");
            count = 0;
        }
    }
    return newArr.join("");
}


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
        pCardNumber.innerText = formatCardNumber(cardNumber);
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

const cleanInputFields = () => {
    document.getElementById("input-cardholder-name").value = "";
    document.getElementById("input-card-number").value = "";
    document.getElementById("input-card-exp-month").value = "";
    document.getElementById("input-card-exp-year").value = "";
    document.getElementById("input-card-cvc").value = "";
}

const showCompleteStateScreen = () => {
    // Get user information from inputs
    const cardholderName = document.getElementById("input-cardholder-name").value;
    const cardNumber = document.getElementById("input-card-number").value;
    const cardExpMonth = document.getElementById("input-card-exp-month").value;
    const cardExpYear = document.getElementById("input-card-exp-year").value;
    const cardCVC = document.getElementById("input-card-cvc").value;

    validateCardholderName(cardholderName);
    validateCardNumber(cardNumber);
    validateExpDate(cardExpMonth, cardExpYear);
    validateBackCardCode(cardCVC);
    displayCardholderInfo(cardholderName, cardNumber, cardExpMonth, cardExpYear, cardCVC);

    const areAllFieldsValidated = () => {
        return validateCardNumber(cardNumber) && validateExpDate(cardExpMonth, cardExpYear) && validateBackCardCode(cardCVC);
    }

    if (areAllFieldsValidated()) {
        cleanInputFields();
        form.classList.add("no-show")
        pCompleteState.classList.remove("no-show");
    }
}

const onSubmit = (event) => {
    event.preventDefault();
    showCompleteStateScreen();
}

const handleContinueButton = () => {
    pCompleteState.classList.add("no-show");
    form.classList.remove("no-show");

}

form.addEventListener("submit", onSubmit);
continueButton.addEventListener("click", handleContinueButton);