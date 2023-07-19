const form = document.getElementById("form");
const formError = document.getElementById("error-form");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const dayResult = document.getElementById("day-result");
const monthResult = document.getElementById("month-result");
const yearResult = document.getElementById("year-result");

// current date
const now = dayjs();

// show/hide input errors
const showError = (input, error) => {
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", true);
    input.previousElementSibling.classList.add("label-error");
    input.nextElementSibling.innerHTML = error;
    input.nextElementSibling.classList.add("show-error");
};
const hideError = (input) => {
    input.classList.remove("input-error");
    input.setAttribute("aria-invalid", false);
    input.previousElementSibling.classList.remove("label-error");
    input.nextElementSibling.innerHTML = "";
    input.nextElementSibling.classList.remove("show-error");
};

// form validation on input
dayInput.addEventListener("input", () => {
    if (dayInput.value.trim() < 0 || dayInput.value.trim() > 31) {
        showError(dayInput, "Must be a valid day");
    } else {
        hideError(dayInput);
    }
});

monthInput.addEventListener("input", () => {
    if (monthInput.value.trim() < 0 || monthInput.value.trim() > 12) {
        showError(monthInput, "Must be a valid month");
    } else {
        hideError(monthInput);
    }
});

yearInput.addEventListener("input", () => {
    if (yearInput.value.trim() > now.year()) {
        showError(yearInput, "Must be in the past");
    } else {
        hideError(yearInput);
    }
});

// check if input fields are empty
const isDayRequired = () => {
    if (!dayInput.value.trim()) {
        showError(dayInput, "This field is required");
        return false;
    } else {
        hideError(dayInput);
        return true;
    }
};

const isMonthRequired = () => {
    if (!monthInput.value.trim()) {
        showError(monthInput, "This field is required");
        return false;
    } else {
        hideError(monthInput);
        return true;
    }
};

const isYearRequired = () => {
    if (!yearInput.value.trim()) {
        showError(yearInput, "This field is required");
        return false;
    } else {
        hideError(yearInput);
        return true;
    }
};

// general form validation function
const isFormValid = () => {
    if (
        (monthInput.value == 4 && dayInput.value > 30) ||
        (monthInput.value == 6 && dayInput.value > 30) ||
        (monthInput.value == 09 && dayInput.value > 30) ||
        (monthInput.value == 11 && dayInput.value > 30)
    ) {
        formError.classList.add("show-form-error");
        formError.innerHTML = "Must be a valid date";
        form.setAttribute("aria-invalid", true);
        return false;
    } else {
        formError.classList.remove("show-form-error");
        formError.innerHTML = "";
        form.setAttribute("aria-invalid", false);
        return true;
    }
};

// age calculator function
const calculateAge = () => {
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;

    const age = new Date(year, month - 1, day);
    const birthDate = dayjs(age);

    // calculate year difference
    const yearDifference = now.diff(birthDate, "year");

    // calculate month difference
    const monthDifference = now.diff(birthDate, "month") - 12 * yearDifference;

    // calculate day difference
    let dayDifference = 0;
    if (day <= now.date()) {
        dayDifference = now.date() - day;
    } else {
        dayDifference = now.daysInMonth() + now.date() - day;
    }

    // result animation
    const displayAgeYear = () => {
        let yearCount = 0;
        let interval = setInterval(() => {
            yearCount++;
            yearResult.innerHTML = yearCount;
            if (yearCount == yearDifference) {
                clearInterval(interval);
            }
        }, 50);
    };

    const displayAgeMonth = () => {
        let monthCount = 0;
        if (monthDifference == 0) {
            monthResult.innerHTML = monthCount;
        } else {
            let interval = setInterval(() => {
                monthCount++;
                monthResult.innerHTML = monthCount;
                if (monthCount == monthDifference) {
                    clearInterval(interval);
                }
            }, 100);
        }
    };

    const displayAgeDay = () => {
        let dayCount = 0;
        if (dayDifference == 0) {
            dayResult.innerHTML = dayCount;
        } else {
            let interval = setInterval(() => {
                dayCount++;
                dayResult.innerHTML = dayCount;
                if (dayCount == dayDifference) {
                    clearInterval(interval);
                }
            }, 50);
        }
    };

    displayAgeYear();
    displayAgeMonth();
    displayAgeDay();
};

// validate form, calculate age and display result on form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dayRequired = isDayRequired();
    const monthRequired = isMonthRequired();
    const yearRequired = isYearRequired();
    const validForm = isFormValid();
    if (!dayRequired || !monthRequired || !yearRequired || !validForm) {
        return false;
    } else {
        calculateAge();
    }
});