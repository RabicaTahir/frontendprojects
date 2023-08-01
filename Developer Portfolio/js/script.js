//Container for the group of projects:
const portfolioContainers = document.querySelectorAll(".project");
const contactFormContainer = document.querySelector(".contact-form");
const buttonSubmit = document.querySelector(".send-message-button");

//Form section:
const formName = document.getElementById("form-name");
const errorName = document.getElementById("error-name");
const formEmail = document.getElementById("form-email");
const errorEmail = document.getElementById("error-email");
const formMessage = document.getElementById("form-message");
const errorMessage = document.getElementById("error-message");
const errorIcon = document.querySelector(".error-icon");

//Name validation:
const verifyName= function(){
    if(formName.value === ""){
        errorName.textContent = "Please don't leave blank";
        errorName.classList.add("error");
        buttonSubmit.disabled = true;
        return false;
    } else {
        errorName.textContent = "";
        errorName.classList.remove("error");
        buttonSubmit.disabled = false;
    }
    return true;
}

//Email Validation:
const verifyEmail = function(){
    let email = formEmail.value
    if(!email.includes('@')) {
        errorIcon.classList.remove("hide-error-icon");
        errorEmail.textContent = "Sorry, invalid format here";
        errorEmail.classList.add("error");

        buttonSubmit.disabled = true;
        return false;
    } else {
        errorEmail.textContent = "";
        errorIcon.classList.add("hide-error-icon");
        errorEmail.classList.remove("error");
        buttonSubmit.disabled = false;
    }
    return true;
    }


//Message Validation:
const verifyMessage = function(){
    if(formMessage.value === ""){
        errorMessage.textContent = "Please don't leave blank";
        errorMessage.classList.add("error");
        buttonSubmit.disabled = true;
        return false;
    } else {
        errorMessage.textContent = "";
        errorMessage.classList.remove("error");
        buttonSubmit.disabled = false;
    }
    return true;
}

//Event listeners for form:
formName.addEventListener("change", function(event){
    verifyName();
})
formEmail.addEventListener("change", function(event){
    verifyEmail();
})
formMessage.addEventListener("change", function(event){
    verifyMessage();
})
//Eventlistener for Submit button:
buttonSubmit.addEventListener("click", function(event){
    event.preventDefault();
    verifyName();
    verifyEmail();
    verifyMessage();

    if(verifyName() && verifyEmail() && verifyMessage() === true) {
        
        formName.value = "";
        formEmail.value = "";
        formMessage.value = "";
        alert("Thank you, your message has been sent!");
    }
    
    const formDetails = {
        Name: formName.value,
        Email: formEmail.value,
        Message: formMessage.value
    }
    //To show that the form has captured the user's information:
    console.log(formDetails);
})

portfolioContainers.forEach(container => {
    const projectLinks = container.querySelector(".project-links");
    const imgContainer = container.querySelector(".img-container");


    //EventListener for when mouse enters the ".project" class element in html-desktop only
    container.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1440) {
            projectLinks.classList.remove('project-links-hide');
            imgContainer.style.opacity = "0.25";
        }
    });

    //EventListener for when mouse leaves the ".project" class element in html-desktop only
    container.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 1440) {
            projectLinks.classList.add('project-links-hide');
            imgContainer.style.opacity = "1";
        }
    });
});