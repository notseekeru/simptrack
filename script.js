import exercises from './workout.js'


const tableEl = document.getElementById('table')

for (const x of exercises) {
    let checkbox = ''
    for (let i = 0; i < x.sets; i++) {
        checkbox += `<input type="checkbox">`
    }
    tableEl.innerHTML += `
        <tr>
        <td>${x.work}</td>
        <td>${checkbox}</td>
        <td>${x.reps}</td>
        <td>${x.weight}</td>
        </tr>
    `
}