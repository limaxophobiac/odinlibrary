let libraryList =[];
const library = document.getElementById("libraryContainer");

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

function refreshView(){
    library.innerHTML = '';
    for (let i = 0; i < libraryList.length; i++){
        showBook(i);
        let n = document.getElementById('book' + i);
        n.style.display = 'grid';
    }

}

function showBook(index){
    let readText;
    libraryList[index].read ? readText = 'Read' : readText = 'Unread';
    const bookCard = document.createElement('div');
    bookCard.innerHTML = `<div class="bTitle">Title: ${libraryList[index].title}</div>
    <div class="bAuthor">Author: ${libraryList[index].author}</div>
    <div class="bPages">Pages: ${libraryList[index].pages}</div>
    <button class="bRead" id="read${index}">${readText}</button>
    <button class="bDelete" id="delete${index}">Delete</button>`;
    bookCard.classList.add("book");
    bookCard.id = 'book' + index;
    library.appendChild(bookCard);

    let deleteButton = document.getElementById(`delete${index}`);
    deleteButton.addEventListener('click', () => {
        libraryList.splice(index, 1);
        refreshView();
    });
    let readButton = document.getElementById(`read${index}`);
    readButton.addEventListener('click', () => {
        libraryList[index].read = !libraryList[index].read;
        let readBtnTemp = document.getElementById(`read${index}`);
        libraryList[index].read ? readBtnTemp.innerHTML = 'Read' : readBtnTemp.innerHTML = 'Unread';
    });
}


const  newButton = document.getElementById("newBook");
const  newTitle = document.getElementById("newTitle");
const  newAuthor = document.getElementById("newAuthor");
const  newPages = document.getElementById("newPages");
const  newRead = document.getElementById("newRead");

newButton.addEventListener('click', addBookClick);

const  searchButton = document.getElementById("searchBook");
const  searchTitle = document.getElementById("searchTitle");
const  searchAuthor = document.getElementById("searchAuthor");

function addBookClick(){
    addBookToLibrary(newTitle.value, newAuthor.value, newPages.value, newRead.checked);
    showBook(libraryList.length-1);
}

searchButton.addEventListener('click', searchBooks);

function searchBooks(){
    for (let i = 0; i < libraryList.length; i++){
        let n = document.getElementById('book' + i);
        if (libraryList[i].author.toLowerCase().includes(searchAuthor.value.toLowerCase()) && libraryList[i].title.toLowerCase().includes(searchTitle.value.toLowerCase())){
            n.style.display = 'grid';
        } else {
            n.style.display = 'none';
        }
    }
}

function populateLibrary(){
    addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, true);
    addBookToLibrary('The Two Towers', 'J.R.R. Tolkien', 352, true);
    addBookToLibrary('The Return of the King', 'J.R.R. Tolkien', 416, true);
    addBookToLibrary('The Silmarillion', 'J.R.R. Tolkien', 365, true);
    addBookToLibrary('Dune', 'Frank Herbert', 412, true);
    addBookToLibrary('Dune Messiah', 'Frank Herbert', 256, true);
    addBookToLibrary('Children of Dune', 'Frank Herbert', 444, true);
    addBookToLibrary('The Colour of Magic', 'Terry Pratchett', 300, true);
    addBookToLibrary('The Light Fantastic', 'Terry Pratchett', 300, true);
    addBookToLibrary('Equal Rites', 'Terry Pratchett', 300, true);
    addBookToLibrary('Mort', 'Terry Pratchett', 300, true);
    addBookToLibrary('Sourcery', 'Terry Pratchett', 300, true);
    addBookToLibrary('Wyrd Sisters', 'Terry Pratchett', 300, false);
    addBookToLibrary('Pyramids', 'Terry Pratchett', 300, false);
    addBookToLibrary('Guards! Guards!', 'Terry Pratchett', 300, true);
    addBookToLibrary('Notes from Underground', 'Fyodor Dostoevsky', 120, true);
    addBookToLibrary('Crime and Punishment', 'Fyodor Dostoevsky', 500, false);
    addBookToLibrary('The Brothers Karamazov', 'Fyodor Dostoevsky', 500, true);
    refreshView();
}

populateLibrary();