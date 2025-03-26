const product = JSON.parse(localStorage.getItem('product')) || []
function renderProduct(product){
    let productList = document.getElementById('productList')
    productList.innerHTML = ''
    product.forEach(item => {
        productList.innerHTML += `
            <div class="card" style="width: 18rem;">
            <img src="${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}<br>${(item.price).toLocaleString("vi-vn")} VNĐ</p>
                <a href="#" class="btn btn-primary">Buy</a>
            </div>
            </div>
        `
    })
}
function search(){
    let searchInput = document.getElementById('searchInput').value
    let filteredProduct = product.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
    renderProduct(filteredProduct)
}
renderProduct(product)
