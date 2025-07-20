const container = document.querySelector('.container');
const showButton = document.getElementById('showDialog');
const dialog = document.getElementById('dialog');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const addBookBtn = document.getElementById('addBookBtn');

const myLibrary = [
	{
		id: crypto.randomUUID(),
		title: 'The Hobbit',
		author: 'J.R.R. Tolkien',
		pages: 295,
		read: 'not read yet',
	},
	{
		id: crypto.randomUUID(),
		title: 'The Harry Potter',
		author: 'J.K Rollings',
		pages: 300,
		read: 'already read',
	},
	{
		id: crypto.randomUUID(),
		title: 'The Hobbit',
		author: 'J.R.R. Tolkien',
		pages: 295,
		read: 'not read yet',
	},
];

function Book(title, author, pages, read) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}
	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function () {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
	};
}

function addBookToLibrary(newBook) {
	return myLibrary.push(newBook);
}

showButton.addEventListener('click', () => {
	dialog.showModal();
});

dialog.addEventListener('close', (e) => {
	e.preventDefault();
	title.value = '';
	author.value = '';
	pages.value = '';
	read.checked = read.unchecked;
});

addBookBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const newBook = new Book(
		`${title.value}`,
		`${author.value}`,
		`${pages.value}`,
		`${read.checked ? "read" : "not read yet"}`
	);

	addBookToLibrary(newBook);
	const div = document.createElement('div');
	const para = document.createElement('p');
	div.classList.add('card');
	para.innerHTML = `${newBook.id}<br>${newBook.title}<br>${newBook.author}<br>${newBook.pages}<br>${newBook.read}<br>`;
	container.appendChild(div);
	div.appendChild(para);
});

for (let i = 0; i < myLibrary.length; i++) {
	const div = document.createElement('div');
	const para = document.createElement('p');
	div.classList.add('card');
	para.innerHTML = `${myLibrary[i].id}<br>${myLibrary[i].title}<br>${myLibrary[i].author}<br>${myLibrary[i].pages}<br>${myLibrary[i].read}<br>`;
	container.appendChild(div);
	div.appendChild(para);
}
