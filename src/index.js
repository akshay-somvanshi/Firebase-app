import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

    // Clear the input field
    inputFieldEl.value = ""
})

// Get the snapshot - state of db at current time
onValue(itemsInDB, function(snapshot){
    // Clear the list from the previous snapshop
    shopListEl.innerHTML = ""

    // Convert object to array if snapshot is not empty
    if(snapshot.exists()){
        let itemsArr = Object.entries(snapshot.val())
        itemsArr.forEach((ele) => {
            addItemToList(ele, itemsInDB)
        });
    } else {
        shopListEl.innerHTML = "No items in list"
    }

})

function addItemToList(item){
    // Decode item into its key and value
    const [key, val] = item

    // Create a list item
    var li = document.createElement("li")
    // Add the text to this element
    li.appendChild(document.createTextNode(val))

    // Add a listener event to delete item if double clicked on
    li.addEventListener("dblclick", function(){
        // Get the reference to the item location in db
        var dbLocation = ref(database, `Items/${key}`)

        // Remove it 
        remove(dbLocation)
    })

    // Append this element into the list
    shopListEl.append(li)
}
