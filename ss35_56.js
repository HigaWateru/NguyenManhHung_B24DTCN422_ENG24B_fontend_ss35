// let categories = [
//     {id: "DM001", name: "Quần áo", statusbar: 1},
//     {id: "DM002", name: "Kính mắt", statusbar: 0},
//     {id: "DM003", name: "Giày dép", statusbar: 1},
//     {id: "DM004", name: "Thời trang nam", statusbar: 0},
//     {id: "DM005", name: "Thời trang nữ", statusbar: 0},
//     {id: "DM006", name: "Hoa quả", statusbar: 0},
//     {id: "DM007", name: "Rau", statusbar: 1},
//     {id: "DM008", name: "Điện thoại", statusbar: 0}
// ]

let categories = JSON.parse(localStorage.getItem("categories")) || []
let categoryList = document.getElementById("categoryList")

function renderCategoryList(categories) {
    categoryList.innerHTML = ""
    categories.forEach((category, index) => {
        categoryList.innerHTML += `
            <tr>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>${parseInt(category.statusbar) === 1 ? '<div class="active"><li>Đang hoạt động</li></div>' : '<div class="unactive"><li>Ngừng hoạt động</li></div>'}</td>
                <td class="opsion">
                    <button type="button" onclick="deleteCategory(${index})"><ion-icon name="trash" class="delete"></ion-icon></button>
                    <button type="button" onclick="editCategory(${index})"><ion-icon name="create" class="edit"></ion-icon></button>
                </td>
            </tr>
        `
    })
}

function addCategory() {
    let categoryID = document.getElementById("categoryID").value.trim()
    let categoryName = document.getElementById("categoryName").value.trim()
    let messengerID = document.getElementById("messengerID")
    let messengerName = document.getElementById("messengerName")
    let statusbar = document.getElementById("status").value
    let error = false
    if (categoryID === "") {
        messengerID.innerText = "Mã danh mục không được để trống"
        error = true
    } else messengerID.innerText = ""
    if (categoryName === "") {
        messengerName.innerText = "Tên danh mục không được để trống"
        error = true
    } else messengerName.innerText = ""
    if (error) return
    categories.push({ id: categoryID, name: categoryName, statusbar: statusbar })
    localStorage.setItem("categories", JSON.stringify(categories))
    renderCategoryList(categories)
    let modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'))
    modal.hide()
}

function deleteCategory(index) {
    categories.splice(index, 1)
    localStorage.setItem("categories", JSON.stringify(categories))
    renderCategoryList(categories)
}
function filterStatusbar(){
    let statusbar = document.getElementById("filter").value
    statusbar = statusbar === '' ? '' : parseInt(statusbar)
    if(statusbar === '') renderCategoryList(categories)
    else{
        let filteredCategories = categories.filter(category => parseInt(category.statusbar) === parseInt(statusbar))
        renderCategoryList(filteredCategories)
    }
}

window.addEventListener("DOMContentLoaded", renderCategoryList(categories))
document.getElementById("filter").addEventListener('change', filterStatusbar)
