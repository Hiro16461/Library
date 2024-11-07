const libraryList = [];
const addBookButton = document.querySelector('.btn-add');
const newBookForm = document.querySelector('dialog');
const form = document.querySelector('form');

addBookButton.addEventListener('click', () => {
	newBookForm.showModal();
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	let title = form[0].value;
	let author = form[1].value;
	let pages = form[2].value;
	let read = form[3].checked;

	if (title === '' || author === '' || pages < 1) {
		let error = document.querySelector('.error');
		error.classList.remove('hidden');
		setTimeout(() => {
			let error = document.querySelector('.error');
			error.classList.add('hidden');
		}, 3000);
		return;
	}

	addBookToLibrary(title, author, pages, read);
	updateDisplay();

	form.reset();
	newBookForm.close();
});

function Book(title = '', author = '', pages = 1, read = false) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.toggleRead = function () {
		this.read = !this.read;
	};
}

function addBookToLibrary(title, author, pages, read = false) {
	let newBook = new Book(title, author, pages, read);
	libraryList.push(newBook);
}

function populateLibrary() {
	addBookToLibrary('Leviathan Wakes', 'James A. Corey', 577);
	addBookToLibrary(
		'Mistborn: The Final Empire',
		'Brandon Sanderson',
		647,
		true
	);
	addBookToLibrary('Critique of pure reason', 'Immanuel Kant', 785);
	addBookToLibrary(
		'Project Management Body of Knowlege',
		'Project Management Institute',
		370
	);
}

function updateDisplay() {
    let display = document.getElementsByClassName("library-display")[0];
    display.innerHTML = "";
    for (let i = 0; i < libraryList.length; i++) {
        let bookCard = createBookCard(libraryList[i]);
        bookCard.setAttribute("data-index", i);
        let btnRemove = bookCard.querySelector(".btn-remove");
        let btnToggleRead = bookCard.querySelector('.btn-toggle');

        btnRemove.addEventListener("click", removeBook);
        btnToggleRead.addEventListener("click", toggleBookRead);

        display.appendChild(bookCard)
    }
}

function removeBook(event) {
    let card = event.target.parentNode.parentNode;
    libraryList.splice(card.dataset.index, 1);
    updateDisplay();
}

function toggleBookRead(event) {
    let card = event.target.parentNode.parentNode;
    let book = libraryList[card.dataset.index];
    book.toggleRead();
    updateDisplay();
}

function createBookCard(book) {
    const card = document.createElement("div");
    card.className = "book-card";

    const title = document.createElement("h2");
    title.innerText = book.title;
    title.className = "book-title";
    card.appendChild(title);

    const author = document.createElement("p");
    author.innerText = `By ${book.author}`;
    author.className = "book-author";
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.innerText = `Pages: ${book.pages}`;
    pages.className = "book-pages";
    card.appendChild(pages);

    const read = document.createElement('p');
    read.innerText = `${book.read ? 'This book is read' : 'This book is not read yet'
        }`;
    read.className = `${book.read ? "book-read" : "book-not-read"}`;
    card.appendChild(read);

    card.appendChild(document.createElement("hr"));

    const buttons = document.createElement("div");
    buttons.className = "button-group";

    const toggleRead = document.createElement("button");
    toggleRead.className = "btn-toggle";
    toggleRead.innerText = `Toggle Read`;
    buttons.appendChild(toggleRead);

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-remove";
    removeBtn.innerText = "Remove";
    buttons.appendChild(removeBtn);

    card.appendChild(buttons);

    return card;
}

populateLibrary();
updateDisplay();