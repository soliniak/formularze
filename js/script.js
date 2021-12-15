const addBookForm = document.querySelector('.book__form');
const booksContainer = document.querySelector('.books__container');
const errorContainer = document.querySelector('.error__container');
const booksFromLoacalStorage = JSON.parse(localStorage.getItem('books')) || [];

const bookTemplate = (title, author, priority, category) => {
  return `
  <tr class="book__wrapper">
    <td class="book__title">${title}</td>
    <td class="book__author">${author}</td>
    <td class="book__priority">${priority}</td>
    <td class="book__category">${category}</td>
  </tr>
  `
}

const generateLibrary = () => {
  if (booksFromLoacalStorage.length) {
    booksContainer.innerHTML = '';
    booksFromLoacalStorage
      .forEach((book) => {
          const { id, title, author, priority, category } = book;
          booksContainer.innerHTML += bookTemplate(title, author, priority, category);
      });
  }
}

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorContainer.innerText = '';

  const { 
    book__title: bookTitle, 
    book__author: bookAuthor, 
    book__priority: bookPriority, 
    book__categories: bookCategory
    } = e.target;

  if(bookTitle.value.length >= 1 && bookAuthor.value.length >= 3 && bookPriority.value.length > 0 && bookCategory.value.length > 0) {

    const dataHolder = {
      id: Date.now(),
      title: bookTitle.value,
      author: bookAuthor.value,
      priority: bookPriority.value,
      category: bookCategory.value,
      addDate: new Date().toLocaleDateString(),
    };

    booksFromLoacalStorage.push(dataHolder);
    localStorage.setItem('books', JSON.stringify(booksFromLoacalStorage));

    e.target.reset();
    generateLibrary();

  } else {
    errorContainer.innerText = 'Błąd walidacji formularza, uzupełnij pola.'
    console.log('Validation failed.');
  }
});

generateLibrary();

