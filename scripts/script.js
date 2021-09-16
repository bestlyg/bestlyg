var book = {
  title: 'shiji',
  author: 'simaqian',
};
var book1 = {
  title: 'sanguo',
  author: 'luo',
};
var myBooks = [book, book1];
function hashTemplate(templateData) {
  var s = '';
  var i = 0;
  while (i < templateData.length) {
    s += templateData[i++];
    if (i < arguments.length) {
      s += arguments[i];
    }
  }
  return s;
}
var libraryHtml = hashTemplate`
  <ul>
      #for book in ${myBooks}
          <li><i>${book.title}</i> by ${book.author}</li>
      #end
  </ul>
`;
console.log(libraryHtml);
