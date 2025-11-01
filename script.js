import exercises from './workout.js'

const tableEl = document.getElementById('table')
let html = ''

for (const x of exercises) {
    let checkbox = ''
    for (let i = 0; i < x.sets; i++) {
        checkbox += `<input type="checkbox">`
    }
    html += `
        <tr data-id="${x.id}">
        <td>${x.id}. ${x.work}</td>
        <td>${checkbox}</td>
        <td>${x.reps}</td>
        <td class="weight"><button data-action="minus" data-id="${x.id}">-</button>${x.weight}<button data-action="plus" data-id="${x.id}">+</button></td>
        </tr>
    `
}

function renderHtml() {
    let html = ''
    for (const x of exercises) {
        let checkbox = ''
        for (let i = 0; i < x.sets; i++) {
            checkbox += `<input type="checkbox">`
        }
        html += `
            <tr data-id="${x.id}">
            <td>${x.id}. ${x.work}</td>
            <td>${checkbox}</td>
            <td>${x.reps}</td>
            <td class="weight">
                <button data-action="minus" data-id="${x.id - 1}">-</button>
                ${x.weight}
                <button data-action="plus" data-id="${x.id - 1}">+</button>
            </td>
            </tr>
        `
    }
    tableEl.innerHTML = html
}

document.addEventListener('click', (e) => {
    const exerId = e.target.dataset.id
    switch (e.target.dataset.action) {
        case 'minus' :
            if (exercises[exerId].weight > 0) {
                exercises[exerId].weight -= 5
                renderHtml()
            } else {
                console.log("Already low");
            }
            break
        case 'plus' :
            exercises[exerId].weight += 5
            renderHtml()
            break
    }
})

renderHtml()