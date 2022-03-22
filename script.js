let libraryList =[];

function Book(title, author, pages, read = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    /*Not used by library*/
    this.info = function(){
        let rString = `${this.title} by ${this.author}, ${this.pages} pages, `;
        this.read ? rString += 'has read.' : rString += 'not read yet.';  
        return rString;
    }
}

function addBookToLibrary(title, author, pages, read = false) {
    let book = new Book(title, author, pages, read);
    libraryList.push(book);
}

function showBooks(){
    const library = document.getElementById("libraryContainer");
    library.innerHTML = '';
    for (let i = 0; i < libraryList.length; i++){
        let readText;
        libraryList[i].read ? readText = 'Read' : readText = 'Unread';
        const bookCard = document.createElement('div');
        bookCard.innerHTML = `<div class="bTitle">Title: ${libraryList[i].title}</div>
        <div class="bAuthor">Author: ${libraryList[i].author}</div>
        <div class="bPages">Pages: ${libraryList[i].pages}</div>
        <button class="bRead" id="read${i}">${readText}</button>
        <button class="bDelete" id="delete${i}">Delete</button>`;
        bookCard.classList.add("book");
        bookCard.id = 'book' + i;
        library.appendChild(bookCard);
    }
    for (let i = 0; i < libraryList.length; i++){
        let deleteButton = document.getElementById(`delete${i}`);
        deleteButton.addEventListener('click', () => {
            libraryList.splice(i, 1);
            showBooks();
        });
        let readButton = document.getElementById(`read${i}`);
        readButton.addEventListener('click', () => {
            libraryList[i].read = !libraryList[i].read;
            showBooks();
        });
    }

}

const  newButton = document.getElementById("newBook");
const  newTitle = document.getElementById("newTitle");
const  newAuthor = document.getElementById("newAuthor");
const  newPages = document.getElementById("newPages");
const  newRead = document.getElementById("newRead");

newButton.addEventListener('click', addBookClick);

function addBookClick(){
    addBookToLibrary(newTitle.value, newAuthor.value, newPages.value, newRead.checked);
    showBooks();
}