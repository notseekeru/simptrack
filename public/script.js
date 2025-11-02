// Import the exercises array from workout.js
import exercises from './workout.js'

// Get the table element where exercises will be rendered
const tableEl = document.getElementById('table')
let html = ''

// Check if localStorage already has exercise data; if not, initialize it
if (!localStorage.getItem("storageSet")) {
  localStorage.setItem("storageSet", JSON.stringify(exercises))
}

// Load exercises from localStorage
let storedStorage = JSON.parse(localStorage.getItem("storageSet"))

// Helper function to save the current state to localStorage
function saveToLocalStorage() {
    localStorage.setItem('storageSet', JSON.stringify(storedStorage))
}

// Listen for clicks on the document to handle plus/minus button actions
document.addEventListener('click', (e) => {
    const exerId = e.target.dataset.id // Get the exercise id from the button
    switch (e.target.dataset.action) {
        case 'minus' :
            // Decrease weight by 5 if above 0, then update storage and re-render
            if (storedStorage[exerId].weight > 0) {
                storedStorage[exerId].weight -= 5
                saveToLocalStorage()
                renderHtml()
            } else {
                console.log("Already low");
            }
            break
        case 'plus' :
            // Increase weight by 5, update storage and re-render
            storedStorage[exerId].weight += 5
            saveToLocalStorage()
            renderHtml()
            break
    }
})

// Function to render the exercise table based on storedStorage
function renderHtml() {
    let html = ''
    for (const x of storedStorage) {
        let checkbox = ''
        for (let i = 0; i < x.sets; i++) {
            checkbox += `<input type="checkbox">`
        }
        // Note: data-id uses x.id - 1, which assumes ids are sequential and start at 1
        html += `
            <tr data-id="${x.id}">
            <td>${x.id}. ${x.work}</td>
            <td>${checkbox}</td>
            <td>${x.reps}</td>
            <td>
                <button data-action="minus" data-id="${x.id - 1}">-</button>
                ${x.weight}
                <button data-action="plus" data-id="${x.id - 1}">+</button>
            </td>
            </tr>
        `
    }
    tableEl.innerHTML = html
}

// Initial render of the table
renderHtml()