
let saveCategory = document.querySelector("input.saveCategory");

let saveCategoryButton = document.querySelector("button.saveCategory");

let addBudgetModalCloseButton = document.querySelector("div.modal-footer").firstElementChild;

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
    }

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

saveCategoryButton.addEventListener("click", saveCategoryPostHandler);

addBudgetModalCloseButton.addEventListener("click", () => {
    saveCategory.value = null;
})
