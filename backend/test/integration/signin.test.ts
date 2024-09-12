import request from 'supertest';
import app from '../../src/app'; // Ensure the correct path to your app file
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Test suite for sign-in
describe('POST /api/user/signin', () => {
  // Connect to the MongoDB before running the tests
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb');
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  });
  

  // Close the MongoDB connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test for successful sign-in
  it('should return 200 for a successful sign-in', async () => {
    const response = await request(app)
      .post('/api/user/signin') // Ensure route is consistent with your backend
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200); // Expect a 200 status code
  });

  // Test for invalid credentials
  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/user/signin') // Ensure route is consistent
      .send({ email: 'wrong@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401); // Expect a 401 status code for wrong credentials
  });
});

