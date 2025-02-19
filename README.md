# Job Portal Backend

A **Node.js + Express + TypeScript** backend for a **Job Portal**, with authentication via **JWT Bearer Token** and **MongoDB/PostgreSQL** database.

## 🚀 **Live Hosts**
- **UI Host:** [Job Portal UI](https://job-portal.d2ai0u2ag2wvfc.amplifyapp.com/)
- **Swagger API Docs:** [Swagger Docs](https://behhobhg56.execute-api.ap-south-1.amazonaws.com/dev/api-docs)
- **API Base URL:** [Job API](https://behhobhg56.execute-api.ap-south-1.amazonaws.com/dev/api)


---

## 🚀 **Features**
✅ **JWT Authentication** (Login, Protected Routes)  
✅ **CRUD APIs** for managing jobs  
✅ **Search & filter** jobs by title, location, and type  
✅ **Swagger API Documentation**  
✅ **Database Support:** PostgreSQL  

---

## 🛠 **Setup & Installation**
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/job-portal-backend.git
cd job-portal-backend
```

2️⃣ Install Dependencies
```sh
npm install
```
3️⃣ Create a .env file and add environment variables
```sh
PORT=5000
JWT_SECRET=your-secret-key
DATABASE_URL=your-database-url
DB_PORT=your
DB_USER=your
DB_PASS=your
DB_NAME=your
JWT_SECRET=your
```
4️⃣ Start the Server
```sh
npm run dev
Runs on http://localhost:5002
```
📌Project Structure
```sh
📂 src
 ┣ 📂 controllers     # Business logic (JobController, AuthController)
 ┣ 📂 models          # Database models
 ┣ 📂 routes          # API routes (job.routes.ts, auth.routes.ts)
 ┣ 📂 middleware      # Middleware (authenticateToken.ts)
 ┣ 📂 services        # Business services (JobService)
 ┣ 📂 config          # Database config
 ┣ 📜 server.ts      # Entry point & Express app configuration
 ┗ 📜 index.ts         
```
📌 API Documentation (Swagger)
```sh
Visit: http://localhost:5002/api-docs
Authorization: Use Bearer Token
```
🔹 Authentication APIs
```sh
Method	Endpoint	Description	Auth
POST	/api/auth/login	User login, returns JWT	❌
POST	/api/auth/register	Register a new user	❌
```

🔹 Job Management APIs
```sh
Method	Endpoint	Description	Auth
GET	/api/jobs	Fetch all jobs	✅
GET	/api/jobs/:id	Get job details	✅
POST	/api/jobs	Create a job	✅
PUT	/api/jobs/:id	Update a job	✅
DELETE	/api/jobs/:id	Delete a job	✅
```

🔹 Authentication Required (✅): Use Authorization: Bearer <token> in headers.



🔥 How It Works
```sh
1️⃣ Login → Get JWT Token
2️⃣ Use Bearer Token in API calls
3️⃣ Perform CRUD on job listings
```
⚙ Best Practices Followed
```sh
✔ TypeScript for strong typing
✔ MVC Architecture
✔ JWT Authentication
✔ Database connection pooling
✔ Swagger for API documentation
```


