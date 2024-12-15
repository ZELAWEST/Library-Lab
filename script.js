const addBook = document.querySelector(".add-book")
const dialog = document.querySelector(".modal")
const maincontainer = document.querySelector('.card-container')
const paragraph = document.querySelector('.bookInfo')
const closeButton = document.querySelector('#closeModal')
const popupAddBook = document.querySelector('.add')

const titleText = document.querySelector('#title')
const authorText = document.querySelector('#author')
const pagesText = document.querySelector('#pages')
const readText = document.querySelector('#read')



let myLibrary = [

    { title: "The Doctor", author: "Dr Philly", pages: "324", read: "read" },
    { title: "Beasty Oceans", author: "Morgan Alonxo", pages: "296", read: "Not Yet Read" },
    { title: "The Moon Walker", author: "Phindele Zoko", pages: "188", read: "read" },
    { title: "Ambulance Story", author: "Dr Mokhosi", pages: "604", read: "Not Yet Read" },
    { title: "The Logic", author: "Dr Philly", pages: "324", read: "read" },
    { title: "Real Men", author: "Morgan Alonxo", pages: "296", read: "Not Yet Read" },
    { title: "The Bush Baby", author: "Phindele Zoko", pages: "188", read: "read" },
    { title: "Ambulance", author: "Dr Mokhosi", pages: "604", read: "Not Yet Read" }, 
    { title: "Math", author: "Phindele Zoko", pages: "188", read: "read" },
    { title: "Science", author: "Dr Mokhosi", pages: "604", read: "Not Yet Read" }
   

]

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

}
Book.prototype.info = function () {

    return `The ${this.title} by ${this.author}, ${this.pages} pages, ${read}`

}
// 
function addBookToLibrary(title, author, pages, read) {

    const bookObj = new Book(title, author, pages, read)
    myLibrary.push(bookObj)

}
function displayBooks() {
    myLibrary.forEach((book, index) => {
        createCard(book, index)
    })
}
function createCardButton(card) {
    const button = document.createElement('button')

    button.style.backgroundColor = "transparent"
    button.style.color = card.style.backgroundColor
    button.setAttribute('class', 'card-buttons')


    return button

}
function createCard(book, index) {
    const card = document.createElement('div')
    card.setAttribute('id', index)
    card.setAttribute("class", "card")

    const header = document.createElement('h4')
    header.textContent = book.title


    const author = document.createElement('p')
    author.textContent = book.author
    const pages = document.createElement('p')
    pages.textContent = book.pages
    const read = document.createElement('p')
    read.textContent = book.read

    author.style.color = maincontainer.style.backgroundColor
    pages.style.color = maincontainer.style.backgroundColor
    read.style.color = maincontainer.style.backgroundColor


    // Card Labels
    const titleLabel = document.createElement('label')
    const authorLabel = document.createElement('label')
    const readLabel = document.createElement('label')
    const pagesLabel = document.createElement('label')
    titleLabel.textContent = "Title"
    authorLabel.textContent = "Author"
    readLabel.textContent = "Read"
    pagesLabel.textContent = "Pages"

    titleLabel.style.backgroundColor = maincontainer.style.backgroundColor
    authorLabel.style.backgroundColor = maincontainer.style.backgroundColor
    readLabel.style.backgroundColor = maincontainer.style.backgroundColor
    pagesLabel.style.backgroundColor = maincontainer.style.backgroundColor

    const lables = document.createElement('div')
    lables.setAttribute('class', 'bookInfo')


    lables.append(authorLabel)
    lables.append(author)
    lables.append(pagesLabel)
    lables.append(pages)
    lables.append(readLabel)
    lables.append(read)
    card.append(header)
    card.append(lables)

    const divButtons = document.createElement('div')
    divButtons.setAttribute("class", "buttons")

    const changeReadStatus = createCardButton(card)

    changeReadStatus.textContent = "Read Or Not Yet"
    changeReadStatus.addEventListener('click', () => {

        book.read = book.read.toLowerCase() === 'read' ? 'Not Yet Read' : 'Read'
        read.textContent = book.read
    })
    divButtons.append(changeReadStatus)

    const deleteBook = createCardButton(card)
    deleteBook.textContent = "Delete"
    deleteBook.addEventListener('click', () => {


        const id = card.id

        const mainchildren = maincontainer.querySelectorAll('.card')
        const mainCards = Array.from(mainchildren)
        myLibrary.filter((item, index) => {
            if (mainCards[index].id === id) {
                myLibrary.splice(id, 1)

            }

        })
        deleteCards(maincontainer)
        displayBooks()

    })



    divButtons.append(deleteBook)
    card.append(divButtons)
    maincontainer.append(card)

}


displayBooks()



addBook.addEventListener("click", function () {

    dialog.classList.add('show')
})

closeButton.addEventListener("click", function () {

    dialog.classList.remove('show')
})

popupAddBook.addEventListener('click', (e) => {
    e.preventDefault()


    const title = titleText.value
    const author = authorText.value
    const pages = pagesText.value
    const read = readText.value
    if (title === '' || author === '' || pages === '' || read === '') {
        alert("Please enter correct info")
    } else {
        deleteCards(maincontainer)
        addBookToLibrary(title, author, pages, read)
        displayBooks()

        titleText.value = '' 
         authorText.value = ''
         pagesText.value = ''
         readText.value = ''
        dialog.classList.remove('show')
    }
})
function deleteCards(cardContainer) {
    while (cardContainer.hasChildNodes()) {
        cardContainer.removeChild(cardContainer.firstChild);
    }

}