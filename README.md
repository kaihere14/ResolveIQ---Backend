# ResolveIQ – Backend API  

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/Express-5.x-blue)](https://expressjs.com/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-success)](https://www.mongodb.com/)  
[![License](https://img.shields.io/badge/License-ISC-lightgrey)](./LICENSE)  
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)  

**Demo**: https://resolve-iq-cqza.vercel.app (frontend)  
**API Docs**: https://github.com/kaihere14/ResolveIQ---Backend#api-endpoints  

---  

## Overview  

ResolveIQ is a **RESTful backend** that powers a complaint‑management platform. It enables users to register, log in, file complaints, and interact with technicians. Administrators can view all complaints, assign technicians, and change complaint status. The API is built with **Express 5**, **MongoDB**, and **JWT**‑based authentication, and it sends transactional emails via **Resend**.

**Target audience** – developers who need a ready‑to‑use, well‑structured Node.js backend for ticketing or help‑desk applications.  

**Current version** – `1.0.0` (stable).  

---  

## Features  

| Feature | Description | Status |
|---------|-------------|--------|
| **User Management** | Register, login, refresh tokens, role‑based access (user / admin) | ✅ Stable |
| **JWT Authentication** | Access & refresh tokens with configurable expiry | ✅ Stable |
| **Complaint Lifecycle** | Create, fetch (all / per‑user), view single, change status, assign technician | ✅ Stable |
| **Technician Portal** | Technician can view assigned complaints, update status, change password | ✅ Stable |
| **Admin Dashboard** | Admin can list all users, all complaints, and manage assignments | ✅ Stable |
| **Email Notifications** | Welcome email on registration, status change alerts via Resend | ✅ Stable |
| **Role‑Based Middleware** | `verifyJWT`, `verifyADMIN` protect routes | ✅ Stable |
| **Docker Ready** *(future)* | Dockerfile and compose files can be added | ⚙️ Planned |

---  

## Tech Stack  

| Layer | Technology | Reason |
|-------|------------|--------|
| **Runtime** | Node.js (v20+) | Modern, async‑first JavaScript |
| **Web Framework** | Express 5.x | Minimalist routing & middleware |
| **Database** | MongoDB + Mongoose 8.x | Flexible schema, aggregation support |
| **Auth** | JSON Web Tokens (`jsonwebtoken`) | Stateless, easy to integrate |
| **Password Security** | bcrypt | Strong hashing |
| **Email** | Resend (`resend` npm package) | Transactional email service |
| **Environment** | dotenv | Centralised config |
| **CORS** | cors | Front‑end integration (localhost & Vercel) |
| **Dev Tools** | nodemon | Hot‑reloading during development |
| **Testing** | (not yet added) – can use Jest / Supertest | – |

---  

## Architecture  

```
src
├─ index.js                # Entry point – creates Express app & connects DB
├─ database/
│   └─ index.js            # MongoDB connection helper
├─ models/
│   ├─ user.model.js       # User schema + methods (hash, JWT helpers)
│   └─ complain.model.js   # Complaint schema
├─ controllers/
│   ├─ user.controller.js
│   ├─ complain.controller.js
│   ├─ technician.controller.js
│   └─ email.resend.js     # Resend email wrappers
├─ routes/
│   ├─ user.routes.js
│   ├─ complain.routes.js
│   └─ technician.routes.js
├─ middleware/
│   ├─ verifyJWT.js        # JWT verification
│   └─ verifyAdmin.js      # Admin role guard
└─ utils/
    ├─ apiResponse.js
    └─ apiError.js
```

* **Express** handles routing.  
* **Middleware** validates JWTs and admin rights before reaching controllers.  
* **Controllers** contain business logic, interact with **Mongoose** models, and return a unified response format (`apiResponse`).  
* **Utils** provide consistent API responses and custom error handling.  

---  

## Getting Started  

### Prerequisites  

| Tool | Minimum version |
|------|-----------------|
| Node.js | 20.x |
| npm | 10.x (or use `yarn`) |
| MongoDB | 6.x (cloud Atlas or local) |
| Resend account | API key for transactional emails |

### Installation  

```bash
# 1️⃣ Clone the repository
git clone https://github.com/kaihere14/ResolveIQ---Backend.git
cd ResolveIQ---Backend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create a .env file (see below)
cp .env.example .env   # if an example exists, otherwise create manually
```

### Environment variables  

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster0.mongodb.net/resolveiq` |
| `ACCESS_TOKEN_SECRET` | Secret for signing access JWTs | `mySuperSecretAccess` |
| `REFRESH_TOKEN_SECRET` | Secret for signing refresh JWTs | `mySuperSecretRefresh` |
| `RESEND_API_KEY` | API key for Resend email service | `re_1234567890abcdef` |
| `PORT` *(optional)* | Port for the server (default 3000) | `3000` |

### Running the server  

```bash
# Development mode (auto‑restart on changes)
npm run dev
```

You should see:

```
Database connected succesfully
Example app listening on port 3000
```

---  

## Usage  

All endpoints are prefixed with `/api`.  
Authentication is required for every route except **register** and **login**.  

### 1️⃣ Register a new user  

```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
        "username": "johnDoe",
        "email": "john@example.com",
        "password": "StrongPass123",
        "role": "user"
      }'
```

**Response** (200):

```json
{
  "statusCode": 200,
  "data": {
    "_id": "64a1f2c9e5b8c2d5f8a7b9c1",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-07-01T12:34:56.789Z",
    "updatedAt": "2023-07-01T12:34:56.789Z"
  },
  "message": "created succesfully"
}
```

A welcome email is sent automatically via Resend.

### 2️⃣ Login  

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"johnDoe","password":"StrongPass123"}'
```

**Response** (200):

```json
{
  "statusCode": 200,
  "data": {
    "user": { /* user object */ },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    "role": "user"
  },
  "message": "logged in "
}
```

Save the `accessToken` for subsequent calls (Bearer token).

### 3️⃣ Create a complaint (authenticated)  

```bash
curl -X POST http://localhost:3000/api/complain/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
        "title": "Leaking faucet",
        "description": "The kitchen faucet leaks continuously.",
        "status": "open"
      }'
```

### 4️⃣ Fetch all complaints (admin only)  

```bash
curl -X GET http://localhost:3000/api/complain/fetch \
  -H "Authorization: Bearer <ADMIN_ACCESS_TOKEN>"
```

### 5️⃣ Assign a technician (admin)  

```bash
curl -X POST http://localhost:3000/api/complain/addtech \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_ACCESS_TOKEN>" \
  -d '{
        "complainId": "64a2b3d4e5f6a7b8c9d0e1f2",
        "technician": "MikeTech",
        "technicianId": "64a2b3d4e5f6a7b8c9d0e1f3"
      }'
```

### 6️⃣ Refresh access token  

```bash
curl -X POST http://localhost:3000/api/users/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<REFRESH_TOKEN>"}'
```

---  

## API Endpoints  

| Method | Path | Auth | Role | Description |
|--------|------|------|------|-------------|
| **POST** | `/api/users/register` | ❌ | – | Register a new user (sends welcome email) |
| **POST** | `/api/users/login` | ❌ | – | Authenticate and receive JWTs |
| **POST** | `/api/users/refresh` | ❌ | – | Exchange a refresh token for a new access token |
| **GET** | `/api/users/fetchUser` | ✅ | admin | List all users |
| **GET** | `/api/users/checkRole` | ✅ | – | Returns the role of the authenticated user |
| **GET** | `/api/users/admin` | ✅ | admin | Simple admin‑only test route |
| **GET** | `/api/users/adminProfile` | ✅ | – | Get profile of the logged‑in user |
| **POST** | `/api/users/changePass` | ✅ | – | Change password (requires current password) |
| **POST** | `/api/complain/register` | ✅ | user | Create a new complaint |
| **GET** | `/api/complain/fetch` | ✅ | admin | Get all complaints (with user details) |
| **GET** | `/api/complain/userComplains` | ✅ | user | Get complaints belonging to the logged‑in user |
| **POST** | `/api/complain/getOne` | ✅ | admin | Retrieve a single complaint by ID |
| **POST** | `/api/complain/changeStatus` | ✅ | admin | Update `activeStatus` (e.g., pending → resolved) |
| **POST** | `/api/complain/addtech` | ✅ | admin | Assign a technician to a complaint |
| **GET** | `/api/technician/complainData` | ✅ | technician | List complaints assigned to the technician |
| **GET** | `/api/technician/technicianData` | ✅ | technician | Get technician profile data |
| **POST** | `/api/technician/changeStatus` | ✅ | technician | Technician updates complaint status |
| **POST** | `/api/technician/passChange` | ✅ | technician | Technician changes own password |

*All responses follow the shape:*  

```json
{
  "statusCode": <number>,
  "data": <payload | null>,
  "message": "<human readable>"
}
```

---  

## Development  

### Setting up a local development environment  

```bash
# Clone (already done) and install dependencies
npm install

# Install nodemon globally if you prefer
npm i -g nodemon
```

### Running tests  

> No test suite is shipped yet. You can add Jest/Supertest and run `npm test`.

### Code style  

- Use **ESM** (`import`/`export`) – the project is `"type": "module"`.  
- Follow the existing linting conventions (indentation 2 spaces, semicolons optional).  
- Keep controller logic thin; move reusable code to `utils/` or `services/`.  

### Debugging  

- Errors are wrapped in `ApiError` and sent with proper HTTP status.  
- Console logs for DB connection and server start are already present.  
- Use `node --inspect` or VS Code debugger with the `dev` script.

---  

## Deployment  

### Docker (recommended for production)  

> A Dockerfile is not included yet, but the steps are straightforward:

```dockerfile
# Dockerfile (example)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/index.js"]
```

Build & run:

```bash
docker build -t resolveiq-backend .
docker run -d -p 3000:3000 --env-file .env resolveiq-backend
```

### Vercel / Render / Railway  

- Set the **build command** to `npm install && npm run dev` (or a custom start script).  
- Define the environment variables in the platform UI.  
- Ensure the platform provides a persistent MongoDB connection (e.g., Atlas).  

### Performance considerations  

- Index `user` field in `complains` collection for faster look‑ups (`db.complains.createIndex({ user: 1 })`).  
- Use pagination on fetch endpoints for large data sets (future improvement).  

---  

## API Documentation  

For a deeper dive, see the **OpenAPI/Swagger** spec (to be added). Below is a quick reference for the most used endpoints.

### Register User  

| Field | Type | Required |
|-------|------|----------|
| `username` | string | ✅ |
| `email` | string (email) | ✅ |
| `password` | string (min 8) | ✅ |
| `role` | string (`user`/`admin`) | optional (defaults to `user`) |

### Login  

| Field | Type | Required |
|-------|------|----------|
| `username` | string | ✅ |
| `password` | string | ✅ |

### Create Complaint  

| Field | Type | Required |
|-------|------|----------|
| `title` | string | ✅ |
| `description` | string | ✅ |
| `status` | string (`open`/`closed`…) | optional (defaults to `open`) |

### Change Complaint Status (admin)  

```json
{
  "complainId": "64a2b3d4e5f6a7b8c9d0e1f2",
  "newStatus": "resolved"
}
```

### Assign Technician (admin)  

```json
{
  "complainId": "64a2b3d4e5f6a7b8c9d0e1f2",
  "technician": "MikeTech",
  "technicianId": "64a2b3d4e5f6a7b8c9d0e1f3"
}
```

---  

## Contributing  

1. Fork the repository.  
2. Create a feature branch (`git checkout -b feat/awesome-feature`).  
3. Install dependencies (`npm install`).  
4. Make your changes, add tests if applicable.  
5. Ensure the code follows the existing style and runs without lint errors.  
6. Commit with a clear message and push to your fork.  
7. Open a Pull Request against `main`.  

**Guidelines**

- Keep controllers focused on request handling; move business logic to services/helpers.  
- Update the README when adding new endpoints or environment variables.  
- Write descriptive commit messages.  

---  

## Troubleshooting & FAQ  

| Issue | Solution |
|-------|----------|
| **Cannot connect to MongoDB** | Verify `MONGO_URI` is correct and reachable. Check network/firewall rules. |
| **`jwt` verification fails** | Ensure the request includes `Authorization: Bearer <token>` and that the token was signed with the matching secret (`ACCESS_TOKEN_SECRET`). |
| **Emails not sent** | Confirm `RESEND_API_KEY` is valid and the Resend service is not rate‑limited. |
| **`npm run dev` crashes** | Look at the console output – most likely a missing env variable or port conflict. |
| **Forgot admin token** | Use the `/api/users/login` endpoint with an admin account to obtain a fresh token. |

For further help, open an issue or contact the maintainer.

---  

## Roadmap  

- [ ] Add pagination & filtering for complaint lists.  
- [ ] Implement unit & integration tests (Jest + Supertest).  
- [ ] Provide OpenAPI (Swagger) documentation endpoint (`/api-docs`).  
- [ ] Dockerfile and CI/CD pipelines.  
- [ ] Role‑based rate limiting.  

---  

## License & Credits  

**License:** ISC – see the [LICENSE](./LICENSE) file.  

**Author:** Arman Thakur  

**Acknowledgments**  

- **Express** – web framework  
- **Mongoose** – MongoDB ODM