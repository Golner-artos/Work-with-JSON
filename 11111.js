class Book {
  constructor(title, author, year, genre) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
  }
}
 
const library = new Map();
library.set('978-0-14-303943-3', new Book('1984', 'Джордж Оруэлл', 1949, 'Антиутопия'));
library.set('978-5-17-090733-0', new Book('Мастер и Маргарита', 'Михаил Булгаков', 1967, 'Роман'));
library.set('978-5-389-06256-6', new Book('Гарри Поттер и философский камень', 'Дж. К. Роулинг', 2001, 'Фэнтези'));
library.set('978-5-699-12014-7', new Book('Игра престолов', 'Джордж Мартин', 2003, 'Фэнтези'));
library.set('978-5-04-089362-2', new Book('Дюна', 'Фрэнк Герберт', 1965, 'Фантастика'));
 
console.log('Исходная библиотека:', library);
 
const libraryArray = Array.from(library); 
 
const json = JSON.stringify(libraryArray);
console.log('JSON:', json);
 
const parsed = JSON.parse(json);
 
const restoredLibrary = new Map(
  parsed.map(([isbn, b]) => [isbn, new Book(b.title, b.author, b.year, b.genre)])
);
console.log('Восстановленная библиотека:', restoredLibrary);
 
function findBook(isbn) {
  const book = restoredLibrary.get(isbn);
  if (book) {
    console.log(`Найдена книга по ISBN ${isbn}:`, book);
  } else {
    console.log(`Книга с ISBN ${isbn} не найдена`);
  }
  return book;
}
 
findBook('978-5-699-12014-7'); 
findBook('000-0-00-000000-0'); 
 

function replacer(key, value) {
  if (key === '') {
    return value.filter(([isbn, book]) => book.year > 2000);
  }
  return value;
}
 
const filteredJson = JSON.stringify(Array.from(library), replacer);
console.log('JSON только с книгами после 2000 года:', filteredJson);
 
const filteredLibrary = new Map(
  JSON.parse(filteredJson).map(([isbn, b]) => [isbn, new Book(b.title, b.author, b.year, b.genre)])
);
console.log('Библиотека после фильтрации:', filteredLibrary);