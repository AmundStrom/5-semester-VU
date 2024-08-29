/*Holds the current years in the year container */
const yearMap = new Map();
var activeButtonId = null;

/* Populate the gallery when the page is refreshed */ 
populateGallery();

/* Insert new element into gallery when a form is submitted */
document.getElementById("newItemForm").addEventListener("submit", submitNewItemForm);
document.getElementById("updateItemForm").addEventListener("submit", submitUpdateForm);
document.getElementById("resetButton").addEventListener("click", resetForm);

/* Add event listeners to the modal */
modalListener("newItemModal", "newItemOpen", "newItemClose");
modalListener("updateItemModal", "updateItemOpen", "updateItemClose");
modalListener("resetModal", "resetOpen", "resetClose");

async function yearButtonHandler(event) {
    var self = event.target;

    if (activeButtonId === self.id) {
        // Button is already active, deactivate it
        self.classList.remove('year-active');
        activeButtonId = null;

        // Get all img elements within the image gallery
        var imageGallery = document.getElementById('imageGallery');
        var imgElements = imageGallery.getElementsByTagName('img');

        // Show all img elements
        for (var i = imgElements.length - 1; i >= 0; i--) {
            var imgElement = imgElements[i];
            imgElement.style.display = 'block';
        }

    } else {
        // Deactivate the currently active button (if any)
        if (activeButtonId !== null) {
            document.getElementById(activeButtonId).classList.remove('year-active');
        }

        // Get all img elements within the image gallery
        var imageGallery = document.getElementById('imageGallery');
        var imgElements = imageGallery.getElementsByTagName('img');

        // Hide img elements that dont match the year
        for (var i = imgElements.length - 1; i >= 0; i--) {
            var imgElement = imgElements[i];
            if(imgElement.classList[0] !== self.id) {
                imgElement.style.display = 'none';
            }
        }

        // Activate the clicked button
        self.classList.add('year-active');
        activeButtonId = self.id;
    }
}


/* Called by the EventListener, will submit a new item to the database and DOM */
async function submitNewItemForm(event) {
    // Stops the web browser from performing the built-in handler 
    event.preventDefault();

    var formData = getFormData(this);

    /* Code taken from: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch */
    try {
        // Make a POST request 
        await fetch("https://webtech.labs.vu.nl/api24/c2cf42e2", {
            method: "POST", // or 'PUT'
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        // Make a GET request and insert the latest element into the image gallery 
        const responseGet = await fetch("https://webtech.labs.vu.nl/api24/c2cf42e2");
        const obj = await responseGet.json();
        insertGallery(obj[obj.length - 1]);
    
        // Reset the input fields 
        document.getElementById("newItemForm").reset();

        // Close the modal window 
        var modal = document.getElementById(document.getElementById("newItemModal").id);
        modal.style.display = "none";

    } catch (error) {
        console.error("Error:", error);
    }
}


/* Called by the EventListener, will update an existing item in the database and DOM */
async function submitUpdateForm(event) {
    // Stops the web browser from performing the built-in handler 
    event.preventDefault();

    var itemNumber = new FormData(this).get('itemNumber');
    var formData = getFormData(this);

    /* Code taken from: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch */
    try {
        // Get image that is gonna be replaced 
        const imgToReplace = document.getElementsByTagName('img')[itemNumber - 1];

        // Make a PUT request
        await fetch("https://webtech.labs.vu.nl/api24/c2cf42e2/item/" + imgToReplace.id, {
            method: "PUT", // or 'POST'
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        // Make a GET request and insert the latest element into the image gallery
        const responseGET = await fetch("https://webtech.labs.vu.nl/api24/c2cf42e2");
        const obj = await responseGET.json();
        insertGallery(obj[itemNumber - 1], imgToReplace );
    
        // Reset the input fields 
        document.getElementById("updateItemForm").reset();

        // Close the modal window 
        var modal = document.getElementById(document.getElementById("updateItemModal").id);
        modal.style.display = "none";

    } catch (error) {
        console.error("Error:", error);
    }
}


/* Called by the EventListener, will reset the database and DOM to the default state */
async function resetForm(event) {
    // Stops the web browser from performing the built-in handler 
    event.preventDefault();

    try {
        // Make a GET request to reset database
        await fetch("https://webtech.labs.vu.nl/api24/c2cf42e2/reset");

        removeGallery();

        populateGallery();

        // Close the modal window
        var modal = document.getElementById(document.getElementById("resetModal").id);
        modal.style.display = "none";

    } catch (error) {
        console.error("Error:", error);
    }
}


/* Add event listeners to the modal */
function modalListener(modalID, openID, closeID) {
    /* Code taken from: https://www.w3schools.com/howto/howto_css_modals.asp */

    // Get the modal
    var modal = document.getElementById(modalID);
        
    // When the user clicks the button, open the modal 
    document.getElementById(openID).addEventListener("click", function() {
        modal.style.display = "block";
    });

    // When the user clicks on (x), close the modal
    document.getElementById(closeID).addEventListener("click", function() {
        modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    document.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // When the user presses the escape key, close the modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = "none";
        }
    });
}


/* Will populate the gallery with all the objects in the database */
async function populateGallery() {
    try {
        /* Make a GET requst */
        const response = await fetch("https://webtech.labs.vu.nl/api24/c2cf42e2");
        const obj = await response.json();
    
        for (let i = 0; i < obj.length; i++) {
            insertGallery(obj[i]);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}


/* Helper function that will remove all img elements in the 'imageGallery' container */
function removeGallery() {
    // Get all img elements within the image gallery
    var imageGallery = document.getElementById('imageGallery');
    var imgElements = imageGallery.getElementsByTagName('img');

    // Remove img elements
    for (var i = imgElements.length - 1; i >= 0; i--) {
        var imgElement = imgElements[i];
        removeYear(imgElement.classList[0]);
        imgElement.parentNode.removeChild(imgElement);
    }
}


/* Helper function that extracts data in the form */
function getFormData(self) {

    // Get form data using FormData
    var formData = new FormData(self);
  
    // Data which will be sent to server
    return {
        name: formData.get('name'),
        year: formData.get('year'),
        genre: formData.get('genre'),
        poster: formData.get('poster'),
        description: formData.get('description')
    };
}


/* Helper function to insert a image into the gallery */
async function insertGallery(JSONobj, replace = false) {

    // Create a new img element
    var newImg = document.createElement('img');

    // Set attributes for the img element
    newImg.src = JSONobj.poster;
    newImg.alt = 'Poster of: ' + JSONobj.name;
    newImg.id = JSONobj.id;
    newImg.classList.add(JSONobj.year);
    insertYear(JSONobj.year);

    // Access the image gallery container
    var imageGallery = document.getElementById('imageGallery');

    // Append or replace the new image element to the image gallery
    if (replace === false) {
        imageGallery.appendChild(newImg);
    } else {
        // If the updated year is different from the original, remove the year button
        if(JSONobj.year !== replace.classList[0]) {
            removeYear(replace.classList[0]);
        }
        
        imageGallery.replaceChild(newImg, replace);
    }
}


/* Helper function that create a button that will filter the images by a specfic year */
async function insertYear(year) {
    if (yearMap.has(year)) {
        // Increment the counter if the year already exists
        yearMap.set(year, yearMap.get(year) + 1);
    } else {
        // Add the year to the Map if it doesn't exist
        yearMap.set(year, 1);

        // Figure out where to insert the new year button in the year-container
        var currentYears = Array.from(yearMap.keys()); // Get array of current years
        currentYears.sort((a, b) => a - b); // Sorting in ascending order
        var indexOfYear = currentYears.indexOf(year); // Get index in the list of the newly added year

        // Create a new year button element
        var newButton = document.createElement('button');
        newButton.textContent = year + '';
        newButton.id = year;
        newButton.classList.add('year-button');
        newButton.addEventListener('click', yearButtonHandler);

        // Get a reference to current buttons in the year-container
        var container = document.getElementById('yearContainer');
        var currentButtons = container.getElementsByTagName('button');

        // Check if new year button should be appended last or not
        if (indexOfYear < currentButtons.length) {
            container.insertBefore(newButton, currentButtons[indexOfYear]);
        } else {
            container.appendChild(newButton);
        }
    }
}


/* Helper function that will remove a year button if there are no more images of that year */
async function removeYear(year) {
    yearMap.set(year, yearMap.get(year) - 1);

    if(yearMap.get(year) === 0) {
        yearMap.delete(year);

        // remove year button
        var container = document.getElementById('yearContainer');
        var removeButton = document.getElementById(year);

        // Check if the image element exists before attempting to remove it
        if (removeButton) {
            // Remove the img element from the container
            container.removeChild(removeButton);
        }
    }
}