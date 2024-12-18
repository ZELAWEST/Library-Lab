



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


class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}
class Library {

 
 

    constructor() {
        this.addBook = document.querySelector(".addBook")
        console.log(this.addBook)
        this.dialog = document.querySelector(".modal")
        console.log(this.dialog)
        this.maincontainer = document.querySelector('.card-container')
        this.paragraph = document.querySelector('.bookInfo')
        this.closeButton = document.querySelector('#closeModal')
        this.popupAddBook = document.querySelector('.add')

        this.titleText = document.querySelector('#title')
        this.authorText = document.querySelector('#author')
        this.pagesText = document.querySelector('#pages')
        this.readText = document.querySelector('#read')
        this.createCardButton = function (card) {
            const button = document.createElement('button')

            button.style.backgroundColor = "transparent"
            button.style.color = card.style.backgroundColor
            button.setAttribute('class', 'card-buttons')


            return button

        }
        this.addBookToLibrary = function (title, author, pages, read) {

            const bookObj = new Book(title, author, pages, read)
            myLibrary.push(bookObj)

        }
        this.displayBooks = function () {
            myLibrary.forEach((book, index) => {
                this.createCard(book, index)
            })

        }
        this.createCard = function (book, index) {
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


            read.style.color = author.style.color = pages.style.color = this.maincontainer.style.backgroundColor



            // Card Labels
            const titleLabel = document.createElement('label')
            const authorLabel = document.createElement('label')
            const readLabel = document.createElement('label')
            const pagesLabel = document.createElement('label')
            titleLabel.textContent = "Title"
            authorLabel.textContent = "Author"
            readLabel.textContent = "Read"
            pagesLabel.textContent = "Pages"


            readLabel.style.backgroundColor = pagesLabel.style.backgroundColor = titleLabel.style.backgroundColor = authorLabel.style.backgroundColor = this.maincontainer.style.backgroundColor



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
           
            const changeReadStatus = this.createCardButton(card)

            changeReadStatus.textContent = "Read Or Not Yet"
            changeReadStatus.addEventListener('click', () => {

                book.read = book.read.toLowerCase() === 'read' ? 'Not Yet Read' : 'Read'
                read.textContent = book.read
            })
            divButtons.append(changeReadStatus)

            const deleteBookBtn = this.createCardButton(card)
            deleteBookBtn.textContent = "Delete"
            deleteBookBtn.addEventListener('click', () => {


                const id = card.id

                const mainchildren = this.maincontainer.querySelectorAll('.card')
                const mainCards = Array.from(mainchildren)
                myLibrary.filter((item, index) => {
                    if (mainCards[index].id === id) {
                        myLibrary.splice(id, 1)

                    }

                })
                this.deleteCards(this.maincontainer)
                this.displayBooks()

            })



            divButtons.append(deleteBookBtn)
            card.append(divButtons)
            this.maincontainer.append(card)

        }
        this.deleteCards = function (cardContainer) {
            while (cardContainer.hasChildNodes()) {
                cardContainer.removeChild(cardContainer.firstChild);
            }

        }
        this.addOneBook = () =>{
            const that = this
            that.addBook.addEventListener("click", function () {
                console.log(this)
                that.dialog.classList.add('show')
            })
        }
        this.closeDialog = function () {
            const that = this
            that.closeButton.addEventListener("click", function () {
console.log(this)
                that.dialog.classList.remove('show')
            })
        }
        this.popUpBookInsert = function () {
            const that = this
            that.popupAddBook.addEventListener('click', (e) => {
                e.preventDefault()
            
            
                const title = that.titleText.value
                const author = that.authorText.value
                const pages = that.pagesText.value
                const read = that.readText.value
                if (title === '' || author === '' || pages === '' || read === '') {
                    alert("Please enter correct info")
                } else {
                    that.deleteCards(that.maincontainer)
                    that.addBookToLibrary(title, author, pages, read)
                    that.displayBooks()
            
                    that.titleText.value = ''
                    that.authorText.value = ''
                    that.pagesText.value = ''
                    that.readText.value = ''
                    that.dialog.classList.remove('show')
                }
            })
            
        }
    }
}

let library = new Library()
library.addOneBook(library.addBook)
library.popUpBookInsert(library.popupAddBook)
library.closeDialog()
library.displayBooks()
