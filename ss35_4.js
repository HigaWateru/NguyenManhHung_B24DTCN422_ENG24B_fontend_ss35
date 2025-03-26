let employees = JSON.parse(localStorage.getItem('employees')) || []
let currentPage = 1
let itemsPage = 3
function renderTable() {
    let start = (currentPage - 1) * itemsPage
    let end = start + itemsPage
    let currentData = employees.slice(start, end)
    let tableBody = document.getElementById('employeeTable')
    tableBody.innerHTML = ''
    currentData.forEach((employee, index) => {
        let row = `
            <tr>
                <td>${start + index + 1}</td>
                <td>${employee.name}</td>
                <td>${employee.position}</td>
            </tr>
        `
        tableBody.innerHTML += row
    })
    renderPagination()
}
function renderPagination() {
    let pageNumbers = document.getElementById('pageNumbers')
    pageNumbers.innerHTML = ''

    let totalPages = Math.ceil(employees.length / itemsPage)
    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement('button')
        button.textContent = i
        button.className = currentPage === i ? 'active' : ''
        button.onclick = () => {
            currentPage = i
            renderTable()
        }
        pageNumbers.appendChild(button)
    }

    document.getElementById('prevPage').disabled = currentPage === 1
    document.getElementById('nextPage').disabled = currentPage === totalPages
}
document.getElementById('addButton').onclick = () => {
    let name = document.getElementById('name').value.trim()
    let position = document.getElementById('position').value.trim()

    if (name && position) {
        employees.push({ name, position })
        document.getElementById('name').value = ''
        document.getElementById('position').value = ''
        localStorage.setItem('employees', JSON.stringify(employees))
        currentPage = Math.ceil(employees.length / itemsPage)
        renderTable()
    }
}
document.getElementById('prevPage').onclick = () => {
    if (currentPage > 1) {
        currentPage--
        renderTable()
    }
}

document.getElementById('nextPage').onclick = () => {
    let totalPages = Math.ceil(employees.length / itemsPage)
    if (currentPage < totalPages) {
        currentPage++
        renderTable()
    }
}
renderTable()
