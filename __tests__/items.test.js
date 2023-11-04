const request = require('supertest');
const app = require('../app');
const items = require('../fakeDb');

beforeEach(() => {
  // Clear out the array before each test
  items.length = 0;
  items.push({ name: 'popsicle', price: 1.45 });
  items.push({ name: 'cheerios', price: 3.40 });
});

// Test GET /items
test('GET /items should return all items', async () => {
  const response = await request(app).get('/items');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual(items);
});

// Test POST /items
test('POST /items should add an item', async () => {
  const newItem = { name: 'banana', price: 0.99 };
  const response = await request(app)
    .post('/items')
    .send(newItem);

  expect(response.statusCode).toBe(201);
  expect(response.body).toEqual({ added: newItem });
  expect(items).toContainEqual(newItem); // Check that the item was actually added to the array
});

// Test GET /items/:name
test('GET /items/:name should retrieve a single item', async () => {
  const response = await request(app).get(`/items/popsicle`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ name: 'popsicle', price: 1.45 });
});

// Test for a non-existent item
test('GET /items/:name with non-existent item should return 404', async () => {
  const response = await request(app).get(`/items/nonexistentitem`);
  expect(response.statusCode).toBe(404);
});

// Test PATCH /items/:name
test('PATCH /items/:name should update the item', async () => {
  const updatedItem = { name: 'popsicle', price: 2.00 };
  const response = await request(app)
    .patch(`/items/popsicle`)
    .send(updatedItem);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ updated: updatedItem });
});

// Test DELETE /items/:name
test('DELETE /items/:name should delete the item', async () => {
  const response = await request(app).delete(`/items/cheerios`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ message: 'Deleted' });
  expect(items).not.toContainEqual({ name: 'cheerios', price: 3.40 }); // Check the item was removed
});
