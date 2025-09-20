import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    // Add the Firebase URL
    databaseURL: "https://fir-project-4877c-dev-default-rtdb.europe-west1.firebasedatabase.app/"
}

// Connect our project with the project containing the database
const app = initializeApp(appSettings)
const database = getDatabase(app)

// Reference to database called Items, where every added item gets stored in the DB
const itemsInDB = ref(database, "Items")

// Connect the html element to a variable
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shopListEl = document.getElementById("shopping-list")

// Button needs to be clicked before any action is taken - add an event listener
addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

    // Push the item to database
    push(itemsInDB, inputValue)

    // console.log(`${inputValue} added to database!`)

    // Clear the input field again
    inputFieldEl.value = "Enter"

    addItemToList(inputValue)
})

function addItemToList(itemValue){
    var li = document.createElement("li")
    li.appendChild(document.createTextNode(itemValue))
    shopListEl.append(li)
}
