const bookList = document.getElementById('book-list');
const form = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');

// 🔁 Load and display all books
function loadBooks() {
  fetch('https://books-api-vu9i.onrender.com')
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        bookList.innerHTML = '<p>No books found.</p>';
        return;
      }

      bookList.innerHTML = '';
      data.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
          <strong>${book.title}</strong> by ${book.author}
          <button class="delete-btn" data-id="${book._id}">Delete</button>
        `;
        bookList.appendChild(bookDiv);
      });

      // 🗑 Attach delete event listeners
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(btn => {
        btn.addEventListener('click', function () {
          const bookId = this.getAttribute('data-id');
          deleteBook(bookId);
        });
      });
    })
    .catch(err => {
      bookList.innerHTML = `<p>Error loading books: ${err.message}</p>`;
    });
}

// ➕ Add a new book
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const newBook = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
  };

  fetch('https://books-api-vu9i.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook),
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to add book');
      return res.json();
    })
    .then(() => {
      alert('✅ Book added successfully!');
      titleInput.value = '';
      authorInput.value = '';
      loadBooks();
    })
    .catch(err => {
      alert('❌ Error adding book: ' + err.message);
    });
});

// 🗑 Delete a book by ID
function deleteBook(id) {
  fetch(`https://books-api-vu9i.onrender.com/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete book');
      alert('🗑️ Book deleted successfully!');
      loadBooks();
    })
    .catch(err => {
      alert('❌ Error deleting book: ' + err.message);
    });
}

// 🚀 Initial load
loadBooks();
