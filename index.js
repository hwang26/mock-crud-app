const canvas = document.getElementById('landing-box');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// Draw White Landing Box
ctx.fillStyle = "deepskyblue";

// Place it in the center of the window
ctx.fillRect(0,0, canvas.width,canvas.height);

// Submit button

const submitButton = document.getElementById("submit-form");

submitButton.addEventListener("click", submitButtonClick);

const inputArray = document.querySelectorAll(".input-field input");

const labelArray = document.querySelectorAll(".input-field label");

const landingPageData = window.localStorage;

const selectLanding = document.querySelector(".landing");

let fieldCheck = new Array(inputArray.length);

for(let i=0; i<fieldCheck.length; i++){
 fieldCheck[i] = 0;
 }

function validationMessage(message, className){
    vMessage = document.createElement("p");
    vMessage.setAttribute("class", className);
    vMessage.innerText = message;
    vMessage.style.color = "red";
    vMessage.style.fontFamily = "Arial";
    return vMessage;
}

let formShow = landingPageData.getItem("formShow");
if(formShow != "none"){
    selectLanding.style.display = "flex";
}

// On submission, we should prevent default behavior and add in how we want the data to be stored
function submitButtonClick(e){
    e.preventDefault();

    /*
        JS Validation

        - Are the fields filled
        - Are the numeric values valid
        
        - If any conditions are false, print an error message. Otherwise, continue with submission.
    */

    for(let i=0; i<inputArray.length; i++){

        let currentMessage = inputArray[i].parentElement.querySelector(".emptyValidation");

        // If the value is null and there's not currently a validation message
        if(inputArray[i].value === "" && currentMessage === null){

            let emptyMessage = validationMessage("Value cannot be null","emptyValidation" );

            // If there's another message, insert before that one
            let existingMessage = inputArray[i].parentElement.querySelector(".numericValidation");
            if(existingMessage){
                existingMessage.insertAdjacentElement('beforebegin',emptyMessage);
            }
            else{
                inputArray[i].insertAdjacentElement('afterend',emptyMessage);
            }

            fieldCheck[i]++;

        }
        // If the value is not null and there's currently a validation message
        if(inputArray[i].value != "" && currentMessage != null){
            // Remove the validation message
            currentMessage.remove();
            fieldCheck[i]--;
        }
    }

    // Check if the values are valid
    for(let i=2; i<inputArray.length; i++){

        let currentMessage = inputArray[i].parentElement.querySelector(".numericValidation");

        // If its not a number, then add another validation message
        if(isNaN(Number(inputArray[i].value)) && currentMessage === null){

            let emptyMessage = validationMessage("Value must be numeric","numericValidation");

            let existingMessage = inputArray[i].parentElement.querySelector(".emptyValidation");

            if(existingMessage){
                existingMessage.insertAdjacentElement('afterend',emptyMessage);
            }
            else{
                inputArray[i].insertAdjacentElement('afterend',emptyMessage);
            }

            fieldCheck[i]++;

        }

        // If its a number and there's currently a validation message
        if(!isNaN(Number(inputArray[i].value)) && currentMessage != null ){
            currentMessage.remove();
            fieldCheck[i]--;
        }
    }

    // If the conditions are valid, then we can proceed with submission
    let finalCheck = true;

    for(let i=0; i<fieldCheck.length; i++){
        if(fieldCheck[i]!=0){
            finalCheck = false;
        }
    }
    
    // Store the values in localStorage
    if(finalCheck == true){
        for(let i=0; i<inputArray.length; i++){
            landingPageData.setItem(labelArray[i].innerText,inputArray[i].value);
        }

        landingPageData.setItem("formShow", "none");

        // Make the landing box disappear
        selectLanding.style.display = "none";     
    }

}
