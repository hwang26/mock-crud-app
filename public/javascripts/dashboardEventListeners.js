
let saveCategoryButton = document.querySelector("button.saveCategory");

let addBudgetModalCloseButton = document.querySelector("div.modal-footer").firstElementChild;

let saveBudgetButton = document.querySelector("div.modal-footer button.btn-primary");

let addBudgetInputElements = document.querySelectorAll("div.form-group input.form-control");

let saveCategory = (() => {
    for(let i=0; i<addBudgetInputElements.length; i++){
        if(addBudgetInputElements[i].className.includes("saveCategory")){
            return addBudgetInputElements[i];
        }
    }
})();


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
        let budgetCategories = document.querySelector("#addBudgetCategories");

        let newOption = document.createElement("option");

        newOption.textContent = saveCategoryValue;

        budgetCategories.appendChild(newOption);
    }

}

async function saveBudgetPostHandler(){

    let selectedCategoryValue = (() => {

        let allBudgetCategories = document.querySelector("#addBudgetCategories").children;

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

   let saveBudgetPostResource = new Request("/dashboard/saveBudget");

   let saveBudgetPostBody = JSON.stringify({
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
        for(let i=0; i<addBudgetInputElements.length; i++){
            addBudgetInputElements[i].value = null;
        }
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
