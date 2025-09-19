// Connect the html element to a variable
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

// Button needs to be clicked before any action is taken - add an event listener
addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    console.log(inputValue)
})
