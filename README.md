# 🐦 Twitter Project

## About

**Twitter Project** is a full-featured backend API inspired by Twitter, built with Node.js, Express, and MongoDB. It supports user authentication (JWT & Passport), tweeting, commenting (including threaded comments), liking tweets and comments, and image uploads directly to AWS S3.

The project demonstrates best practices in REST API design, middleware usage, secure authentication, and scalable file handling with cloud storage. It’s perfect as a learning resource or starter template for social media style applications.

---

## Tech Stack

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication & Passport.js
- AWS S3 for image uploads
- Multer & Multer-S3 for multipart form data handling

---

## ✅ Core Features

---

### 1. User Authentication

- **Register User**
  - `POST /api/v1/users/register`
- **Login User**
  - `POST /api/v1/users/login`
- Secure password hashing and JWT-based authentication.
- Authenticated routes protected by `authenticateJwt` middleware.
- Only logged-in users can post, like, retweet, comment, and upload images.

---

### 2. Tweet Functionality

- **Create a Tweet**
  - `POST /api/v1/tweets`
- **Get Tweet by ID**
  - `GET /api/v1/tweets/:id`
- **Get All Tweets (with pagination)**
  - `GET /api/v1/tweets`
- **Update Tweet by ID**
  - `PUT /api/v1/tweets/:id`
- **Delete Tweet by ID**
  - `DELETE /api/v1/tweets/:id`
- Supports text content (max 280 chars) and image attachments via upload endpoint.
- Tweet images uploaded via:
  - `POST /api/v1/upload/image` (protected, expects `image` form-data key)
- **Retweet & Quote Retweet**
  - (Handled via tweet creation logic with references and optional comment)

---

### 3. Comments on Tweets

- **Create Comment or Reply**
  - `POST /api/v1/comments` (protected)
- **Get All Top-Level Comments for a Tweet**
  - `GET /api/v1/comments/tweet/:tweetId`
- **Get Replies for a Specific Comment**
  - `GET /api/v1/comments/:commentId/replies`

---

### 4. Likes

- **Toggle Like/Unlike on Tweet or Comment**
  - `POST /api/v1/likes/toggle` (protected)
- **Get Like Count for Tweet**
  - `GET /api/v1/likes/tweet/:id/count`
- **Get Like Count for Comment**
  - `GET /api/v1/likes/comment/:id/count`

---

### 5. User Profiles & Social

- **Get User by ID**
  - `GET /api/v1/users/:id`
- **Update User by ID**
  - `PUT /api/v1/users/:id` (protected)
- **Delete User by ID**
  - `DELETE /api/v1/users/:id` (protected)
- Follow/Unfollow features can be handled via user controller (not explicitly shown here).

---

### 6. Image Upload

- **Upload Image to AWS S3**
  - `POST /api/v1/upload/image` (protected, expects `image` in form-data)
- Uploaded images are stored publicly and returned with a URL.

---

# 📌 All API Endpoints

## 🧑‍💻 Users

| Method | Endpoint                 | Description               | Access    |
| ------ | ------------------------ | ------------------------- | --------- |
| POST   | `/api/v1/users/register` | Register a new user       | Public    |
| POST   | `/api/v1/users/login`    | Authenticate user (login) | Public    |
| GET    | `/api/v1/users/:id`      | Get a user by ID          | Public    |
| PUT    | `/api/v1/users/:id`      | Update a user by ID       | Protected |
| DELETE | `/api/v1/users/:id`      | Delete a user by ID       | Protected |

---

## 🐦 Tweets

| Method | Endpoint             | Description                      | Access    |
| ------ | -------------------- | -------------------------------- | --------- |
| POST   | `/api/v1/tweets`     | Create a new tweet               | Protected |
| GET    | `/api/v1/tweets/:id` | Get a tweet by ID                | Public    |
| GET    | `/api/v1/tweets`     | Get all tweets (with pagination) | Public    |
| PUT    | `/api/v1/tweets/:id` | Update a tweet by ID             | Protected |
| DELETE | `/api/v1/tweets/:id` | Delete a tweet by ID             | Protected |

---

## 💬 Comments

| Method | Endpoint                              | Description                            | Access    |
| ------ | ------------------------------------- | -------------------------------------- | --------- |
| POST   | `/api/v1/comments`                    | Create a comment or reply              | Protected |
| GET    | `/api/v1/comments/tweet/:tweetId`     | Get all top-level comments for a tweet | Public    |
| GET    | `/api/v1/comments/:commentId/replies` | Get replies for a comment              | Public    |

---

## ❤️ Likes

| Method | Endpoint                          | Description                            | Access    |
| ------ | --------------------------------- | -------------------------------------- | --------- |
| POST   | `/api/v1/likes/toggle`            | Toggle like/unlike on tweet or comment | Protected |
| GET    | `/api/v1/likes/tweet/:id/count`   | Get like count for a tweet             | Public    |
| GET    | `/api/v1/likes/comment/:id/count` | Get like count for a comment           | Public    |

---

## 📤 Uploads

| Method | Endpoint               | Description               | Access    |
| ------ | ---------------------- | ------------------------- | --------- |
| POST   | `/api/v1/upload/image` | Upload an image to AWS S3 | Protected |

---

## ℹ️ Info

| Method | Endpoint       | Description      | Access |
| ------ | -------------- | ---------------- | ------ |
| GET    | `/api/v1/info` | API general info | Public |

---

## Notes

- Authentication middleware (`authenticateJwt`) protects routes that require a logged-in user.
- Image upload expects multipart form-data with key `image` and uploads to AWS S3 with public access.

---
