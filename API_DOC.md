# 📚 Book Management API Documentation

## 🌐 Base URL
http://localhost:5500/api/book

---

## 🧪 Root Endpoint

### 🔹 GET `/`
- **Description**: Basic test endpoint to check if the server is running.
- **Response**:
```json
[
    {
        "_id": "123",
    "title": "Atomic Habits",
    "author": "James Clear",
    "publishedYear": 2018
    }
]

GET /api/book/:id
Description: Retrieve a specific book by its ID.

Method: GET

URL Param:

id (string) – ID of the book

Response:
json
{
  "_id": "123",
  "title": "Atomic Habits",
  "author": "James Clear",
  "publishedYear": 2018
}
Error:

json
{ "message": "Book not found" }

POST /api/book
Description: Add a new book.

Method: POST

Request Body:{
  "title": "New Book Title",
  "author": "Author Name",
  "publishedYear": 2024
}
Response:
{
  "_id": "abc123",
  "title": "New Book Title",
  "author": "Author Name",
  "publishedYear": 2024
}

PUT /api/book/:id
Description: Update a book by its ID.

Method: PUT

URL Param:

id (string) – ID of the book

Request Body:{
  "title": "Updated Title",
  "author": "Updated Author",
  "publishedYear": 2024
}
Response:{
  "_id": "abc123",
  "title": "Updated Title",
  "author": "Updated Author",
  "publishedYear": 2024
}
DELETE /api/book/:id
Description: Delete a book by ID.

Method: DELETE

URL Param:

id (string) – ID of the book

Response:{ "message": "Book deleted successfully" }

