let websites = JSON.parse(localStorage.getItem('websites')) || []
let listWebsite = document.getElementById("listWebsite")
function renderWebsite() {
    listWebsite.innerHTML = ''
    websites.forEach((website, index) => {
        const faviconUrl = `https://www.google.com/s2/favicons?sz=32&domain=${website.url}`;
        listWebsite.innerHTML += `
            <div class="list-group-item">
                <img src="${faviconUrl}" alt="Favicon">
                <a href="${website.url}" target="_blank">${website.name}</a>
                <button class="close" onclick="deleteWebsite(${index})">&times;</button>
            </div>
        `
    })
}
function addWebsite() {
    let name = document.getElementById('nameWebInput').value.trim()
    let url = document.getElementById('urlWebInput').value.trim()
    if (!name || !url) {
        alert("Không được để trống!!!")
        return
    }
    websites.push({ name, url });
    localStorage.setItem('websites', JSON.stringify(websites))
    document.getElementById('nameWebInput').value = ''
    document.getElementById('urlWebInput').value = ''
    document.querySelector('.btn-close').click()
    renderWebsite()
}

function deleteWebsite(index) {
    websites.splice(index, 1)
    localStorage.setItem('websites', JSON.stringify(websites))
    renderWebsite()
}

renderWebsite()
