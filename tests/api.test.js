const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Books API', () => {
    // Get tests
    test('should return all books', async () => {
        const response = await request(app).get('/books');
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3); // Assuming 3 books in your data 
    
    });

    test('should return book by ID', async () => {
        const response = await request(app).get('/books/1');
      
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title');
    });

    test('should return book by ID', async () => {
        const response = await request(app).get('/books/999');
      
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('should create a new book', async () => {
        const newBook = {
            title: "Psalms",
            author: "David",
            genre: "Poetry",
            copiesAvailable: 297638
        };
    
        const response = await request(app)
            .post('/books')
            .send(newBook);
      
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Psalms');
    });

    test('should update existing book', async () => {
        const updatedBook = {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            copiesAvailable: 7
            
        };
    
        const response = await request(app)
            .put('/books/1')
            .send(updatedBook);
      
        expect(response.status).toBe(200);
        expect(response.body.copiesAvailable).toBe(7);
    });

    test('should delete existing book', async () => {
        const response = await request(app).delete('/books/1');
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

});