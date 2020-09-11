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

function validationMessage(message, className){
    vMessage = document.createElement("p");
    vMessage.setAttribute("class", className);
    vMessage.innerText = message;
    vMessage.style.color = "red";
    vMessage.style.fontFamily = "Arial";
    return vMessage;
}

// On submission, we should prevent default behavior and add in how we want the data to be stored
function submitButtonClick(e){
    e.preventDefault();
 
    /*
        - Validate fields and throw error text if invalid values
        - Take current values from fields and store them in IndexedDB
            - Use window.querySelectorAll(...) to grab the fields
        - Clear out fields
        - Submission success
            - Dynamically hide the landing box
    */

    /*
        JS Validation

        - Are the fields filled
        - Are the numeric values valid
        
        - If any conditions are false, print an error message. Otherwise, continue with submission.
    */

   // REWORK logic: Should be FALSE and TRUE when all fields have correct behavior. We can have an array of booleans. 
   let emptyCheck = new Array(inputArray.length);
   let numericCheck = new Array(inputArray.length-2);

   for(let i=0; i<emptyCheck.length; i++){
    emptyCheck[i] = false;
    }
    for(let i=0; i<numericCheck.length; i++){
        numericCheck[i] = true;
    }

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

            emptyCheck[i] = true;
        }
        // If the value is not null and there's currently a validation message
        if(inputArray[i].value != "" && currentMessage != null){
            // Remove the validation message
            currentMessage.remove();

            emptyCheck[i] = false;
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

            numericCheck[i-2] = false;
        }

        // If its a number and there's currently a validation message
        if(!isNaN(Number(inputArray[i].value)) && currentMessage != null ){
            currentMessage.remove();
            numericCheck[i-2] = true;
        }
    }

    // If the conditions are valid, then we can proceed with submission. emptyCheck should be all false and numericCheck should be all true.
    let finalCheck = true;

    for(let i=0; i<emptyCheck.length; i++){
        if(emptyCheck[i]==true){
            finalCheck = false;
        }

    }
    for(let i=0; i<numericCheck.length; i++){
        if(numericCheck[i]==false){
            finalCheck = false;
        }

    }

    // Proceed with submission
    if(finalCheck==true){
        console.log(emptyCheck);
        console.log(numericCheck);
        console.log("hi2");
    }
    

}

