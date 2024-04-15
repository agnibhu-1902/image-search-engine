const access_key = '75LR80E9ayKIHljlXMIJnq3fQ_nSw3e0OfLYsU6aayo'
const searchForm = document.getElementById('search-form')
const searchBox = document.getElementById('search-box')
const searchResult = document.getElementById('search-result')
const showMoreButton = document.getElementById('show-more-btn')

let keyword = ''
let page = 1
const perPage = 12

const searchImages = async () => {
    keyword = searchBox.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=${perPage}&client_id=${access_key}`
    if (page === 1)
        searchResult.innerHTML = ""
    const response = await fetch(url)
    const data = await response.json()
    const results = data.results
    let i = 1
    results.map((result) => {
        (function(i) {
            setTimeout(() => {
                const image = document.createElement('img')
                image.src = result.urls.regular
                const imageLink = document.createElement('a')
                imageLink.href = result.links.html
                imageLink.target = '_blank'
                if (i <= 4 && page === 1) {
                    image.style.visibility = 'hidden'
                    image.style.width = '0'
                    image.style.height = '0'
                }
                imageLink.appendChild(image)
                searchResult.appendChild(imageLink)
                if (i === 12)
                    showMoreButton.style.display = 'block'
                else
                    showMoreButton.style.display = 'none'
            }, i * 300)
        })(i++)
    })
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    page = 1
    searchImages()
})

showMoreButton.addEventListener('click', () => {
    page++
    searchImages()
})