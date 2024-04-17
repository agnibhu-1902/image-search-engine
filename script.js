const access_key = '75LR80E9ayKIHljlXMIJnq3fQ_nSw3e0OfLYsU6aayo'
const searchForm = document.getElementById('search-form')
const searchBox = document.getElementById('search-box')
const crossIcon = document.querySelector('#search-form img')
const searchResult = document.getElementById('search-result')
const showMoreButton = document.getElementById('show-more-btn')
const footer = document.querySelector('footer')

const spanTag = '<span class="blink">|</span>'
let searchElement = document.querySelector('.container h1 span')
const text = 'Search'
let n = 0
var typeTimer = setInterval(() => {
    searchElement.innerHTML = text.slice(0, n) + spanTag
    n += 1
    if (n === text.length + 1)
        clearInterval(typeTimer)
}, 800)

let keyword = ''
let page = 1
const perPage = 12

const searchImages = async () => {
    if (page === 1)
        searchResult.innerHTML = ""
    if (searchBox.value === '') {
        showMoreButton.style.display = 'none'
        footer.style.display = 'none'
    }
    else {
        keyword = searchBox.value
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=${perPage}&client_id=${access_key}&orientation=squarish`
        const response = await fetch(url)
        const data = await response.json()
        const results = data.results
        let i = 1
        results.map((result) => {
            (function(i) {
                setTimeout(() => {
                    const figure = document.createElement('figure')
                    const image = document.createElement('img')
                    image.src = result.urls.regular
                    image.alt = result.description
                    const imageLink = document.createElement('a')
                    imageLink.href = result.links.html
                    imageLink.target = '_blank'
                    imageLink.appendChild(image)
                    figure.appendChild(imageLink)
                    searchResult.appendChild(figure)
                    if (i === 12) {
                        showMoreButton.style.display = 'block'
                        footer.style.display = 'block'
                    }
                    else {
                        showMoreButton.style.display = 'none'
                        footer.style.display = 'none'
                    }
                }, i * 300)
            })(i++)
        })
    }
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

searchBox.addEventListener('input', () => {
    crossIcon.style.display = 'block'
})

crossIcon.addEventListener('click', () => {
    searchBox.value = ''
    crossIcon.style.display = 'none'
    searchBox.focus()
})

searchBox.addEventListener('focusout', () => {
    if (searchBox.value === '')
        crossIcon.style.display = 'none'
})
