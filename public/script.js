// Import the exercises array from workout.js
import gymExercises from './workout.js'

// Get the table element where exercises will be rendered


if (!localStorage.getItem("storageSet")) {
    localStorage.setItem("storageSet", JSON.stringify(gymExercises))
}

let storedStorage = JSON.parse(localStorage.getItem("storageSet"))

function saveToLocalStorage() {
    localStorage.setItem('storageSet', JSON.stringify(storedStorage))
}

document.addEventListener('click', (e) => {
    const exerId = e.target.dataset.id
    switch (e.target.dataset.action) {
        case 'minus' :
            if (storedStorage[exerId].weight > 0) {
                storedStorage[exerId].weight -= 5
                saveToLocalStorage()
                renderHtml()
            } else {
                console.log("Already low");
            }
            break
        case 'plus' :
            storedStorage[exerId].weight += 5
            saveToLocalStorage()
            renderHtml()
            break
    }
})

function renderHtml() {
    const tableEl = document.getElementById('table')
        let html = ``;
    for (const x of storedStorage) {
        let checkbox = ''
        for (let i = 0; i < x.sets; i++) {
            checkbox += `<input type="checkbox">`
        }
        html += `
            <tr data-id="${x.id}">
                <td>${x.work}</td>
                <td>${checkbox}</td>
                <td>${x.reps}</td>
                <td>
                    <button data-action="minus" data-id="${x.id}">-</button>
                    ${x.weight}
                    <button data-action="plus" data-id="${x.id}">+</button>
                </td>
            </tr>
        `
    }
        html += '</tbody>';
    tableEl.innerHTML = html
}

renderHtml()