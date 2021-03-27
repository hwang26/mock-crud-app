/*
    We want to handle onclick on the EDIT button, Cancel button, and Save button

    Save button should send a POST request to the server to write the new user data to the DB
*/

// Edit button that is visible initially
const editButton = document.querySelector(".editButton");

// The read-only fields that are visible initially
const readOnlyUserInfo = document.querySelector(".readOnlyUserInfo");

// The editable version of those fields
const editableUserInfo = document.querySelector(".editableUserInfo");

// Save button
const saveButton = document.querySelector(".saveButton");

// Cancel button
const cancelButton = document.querySelector(".cancelButton");

// TODO in Issue #36

function saveButtonPostRequest(){};

function postResponseHandler(){};

function saveButtonClearValidations(){};

// We just want to hide the read-only component and make the editable component visible
editButton.addEventListener("click", () => {

    readOnlyUserInfo.setAttribute("style", "display: none;");
    editableUserInfo.setAttribute("style", "display: flex;");

});

saveButton.addEventListener("click", async () => {

    const savedValues = editableUserInfo.querySelectorAll("input");

    let myReq = new Request("/dashboard/saveButton");

    let postBody = {};

    // Determines how the controller function will handle this post request
    postBody["postType"] = "Dashboard.UserInfo.SaveButton";

    // Build the request body
    for(let i=0; i<savedValues.length; i++){
        postBody[savedValues[i].name] = savedValues[i].value;
    }

    // Convert to JSON string
    postBody = JSON.stringify(postBody);

    let myInit = {
        method: "POST",
        headers: {
            // Gives the server information on what kind of data is in the body
            "Content-type": "application/json",
        },
        body: postBody
    };
    
    let testResponse = await fetch(myReq, myInit);
    // Convert response data into JSON
    testResponse = await testResponse.json();

    // Based on the response, we either make the component Read-Only again or we display some validation messages

    if(testResponse == "Its all good!"){

        // Update the fields with the new data
        let readOnlyFields = document.querySelectorAll(".readOnlyUserInfoField");

        for(let i=0; i<readOnlyFields.length; i++){
            if(savedValues[i].name == "takeHome"){
                readOnlyFields[i].textContent = "$" + (Number(savedValues[i].value)*2).toString() + "/month";

                // Update the editable field so that its not just the number value
                savedValues[i].value = readOnlyFields[i].textContent;
            }
            else{
                readOnlyFields[i].textContent = savedValues[i].value;
            }
        }

        // Display the read-only component
        readOnlyUserInfo.setAttribute("style", "display: flex;");
        editableUserInfo.setAttribute("style", "display: none;");

    }
    else{

        // For each error, create a validation message element and then insert them all above the editable fields

        // Remove the current validationMessageList if it exists

        let oldValidationMessageList = editableUserInfo.querySelector("ul");

        if(oldValidationMessageList != null){
            oldValidationMessageList.remove();
        }

        let validationMessageList = document.createElement("ul");

        for(let i=0; i<testResponse.length; i++){
            let newValidationMessage = document.createElement("li");
            let message = testResponse[i].msg;

            newValidationMessage.textContent = message;
            validationMessageList.append(newValidationMessage);
        }

        editableUserInfo.prepend(validationMessageList);
        
    }
    
})


// (Cancel button) We want to hide the editable component and make the read-only component visible
cancelButton.addEventListener("click", () => {

    let oldValidationMessageList = editableUserInfo.querySelector("ul");

    if(oldValidationMessageList != null){
        oldValidationMessageList.remove();
    }

    readOnlyUserInfo.setAttribute("style", "display: flex;");
    editableUserInfo.setAttribute("style", "display: none;");

})