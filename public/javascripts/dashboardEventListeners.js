
let saveCategoryButton = document.querySelector("button.saveCategory");

let addBudgetModalCloseButton = document.querySelector("div.modal-footer").firstElementChild;

let saveBudgetButton = document.querySelector("div.modal-footer button.btn-primary");

let addBudgetInputElements = document.querySelectorAll("div.form-group .form-control");

let saveCategory = document.querySelector("input.saveCategory");

let editButtonElements = document.querySelectorAll("#budgetEditButton");

let budgetDeleteButtons = document.querySelectorAll("#budgetDeleteButton");

let budgetCategories = document.querySelector("#addBudgetCategories");

let modalXButton = document.querySelector(".x-button");

// Functions

async function saveCategoryPostHandler(){

    let saveCategoryValue = saveCategory.value;

    let saveCategoryPostResource = new Request("/dashboard/saveCategory");

    let saveCategoryPostBody = JSON.stringify(
        {
            saveCategory: saveCategoryValue
        }
    );
    
    let saveCategoryPostInit = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: saveCategoryPostBody
    };

    let saveCategoryPostRequest = await fetch(saveCategoryPostResource, saveCategoryPostInit);

    saveCategoryPostRequest = await saveCategoryPostRequest.json();

    if(saveCategoryPostRequest === 1){
        // Update the page with the new data

        let newOption = document.createElement("option");

        newOption.textContent = saveCategoryValue;

        budgetCategories.appendChild(newOption);
    }

}

async function saveBudgetPostHandler(){

    let selectedCategoryValue = (() => {

        let allBudgetCategories = budgetCategories.children;

        if(allBudgetCategories.length === 0){
            return null;
        }
        else{
            for(let i=0; i<allBudgetCategories.length; i++){
                if(allBudgetCategories[i].selected){
                    return allBudgetCategories[i].textContent;
                }
            }
        }

    })();

    let budgetNameValue = (() => {
        for(let i=0; i<addBudgetInputElements.length; i++){
            if(addBudgetInputElements[i].id === "addBudgetNameInput"){
                return addBudgetInputElements[i].value;
            }
        }
    })();

    let budgetAmountValue = (() => {
        for(let i=0; i<addBudgetInputElements.length; i++){
            if(addBudgetInputElements[i].id === "addBudgetAmount"){
                return addBudgetInputElements[i].value;
            }
        }
    })();   

    let budgetIdValue = document.querySelectorAll("#currentBudget p");

    if(budgetIdValue.length > 0){
        budgetIdValue = budgetIdValue[0].innerText;
    }
    else{
        budgetIdValue = "";
    }

    let saveBudgetPostResource = new Request("/dashboard/saveBudget");

   let saveBudgetPostBody = JSON.stringify({
       id: budgetIdValue,
       name: budgetNameValue,
       amount: budgetAmountValue,
       category: selectedCategoryValue
   });

   let saveBudgetPostInit = {
       method: "POST",
       headers: {
           "Content-type" : "application/json"
       },
       body: saveBudgetPostBody
   };

   let saveBudgetPostRequest = await fetch(saveBudgetPostResource, saveBudgetPostInit);

   saveBudgetPostRequest = await saveBudgetPostRequest.json();

   // On success, refresh the page
   // TODO: Handle failure validations

   if(saveBudgetPostRequest == 1){
       location.reload();
   }

}

// Has 2 options, clear category field only OR clear all input fields
function clearSaveBudgetFormValues(categoryOnly){

    
    if(categoryOnly){
        saveCategory.value = null;
    }
    else{
        // Reset Modal Title
        let modalTitle = document.querySelector(".modal-title");
        modalTitle.textContent = "Add Budget";

        // Remove the currentBudget ID from any elements

        let currentBudget = document.querySelector("#currentBudget");

        if(currentBudget != null){
            currentBudget.removeAttribute("id");
        }

        // Clear form values

        for(let i=0; i<addBudgetInputElements.length; i++){
            addBudgetInputElements[i].value = null;
        }
    }
}

function editButtonClickHandler(event){

    let editBudgetValues = event.currentTarget.querySelectorAll("p");
    let modalTitle = document.querySelector(".modal-title");

    let nameInput = document.querySelector("#addBudgetNameInput");
    let amountInput = document.querySelector("#addBudgetAmount");
    let categorySelect = document.querySelector("#addBudgetCategories");

    // Change Add to Edit

    modalTitle.textContent = "Edit Budget";

    // Populate Form Fields

    nameInput.value = editBudgetValues[1].innerText;
    amountInput.value = editBudgetValues[2].innerText;
    categorySelect.value = editBudgetValues[3].innerText;

    // Add an ID to the budget being edited so that we can retrieve its ID in saveBudgetPostHandler()
    // When we exit out of the modal, we should remove this ID
    event.currentTarget.id = "currentBudget";

}

async function deleteButtonClickHandler(event){

    // Get the ID and do a POST request
    // On success, refresh the page

    let bId = event.currentTarget.querySelector("p");
    bId = bId.innerText;

    // Build request

    let reqBody = JSON.stringify({
        id: bId
    });

    let reqResource = new Request("/dashboard/deleteBudget");

    let reqInit = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: reqBody
    };

    let reqResponse = await fetch(reqResource, reqInit);
    reqResponse = await reqResponse.json();

    // If success, we refresh the page
    // TODO: Show validation if we fail

    if(reqResponse == 1){
        location.reload();
    }

}

// Event Handlers

saveCategoryButton.addEventListener("click", () => {
    saveCategoryPostHandler();
    clearSaveBudgetFormValues(1);

});

addBudgetModalCloseButton.addEventListener("click", () => {
    clearSaveBudgetFormValues(0);
})

saveBudgetButton.addEventListener("click", () => {
    saveBudgetPostHandler();
    clearSaveBudgetFormValues(0);
})

editButtonElements.forEach((currVal, currIndex, listObj) => {
    currVal.addEventListener("click", editButtonClickHandler);
});

budgetDeleteButtons.forEach((currVal, currIndex, listObj) => {
    currVal.addEventListener("click", deleteButtonClickHandler);
});

modalXButton.addEventListener("click", () => {
    clearSaveBudgetFormValues(0);
})
