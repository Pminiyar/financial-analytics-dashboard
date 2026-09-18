# 📊 Financial Analytics Dashboard

[![Live Frontend](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://financial-analytics-dashboard-self-nine.vercel.app/)
[![API Backend](https://img.shields.io/badge/Backend%20API-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://financial-analytics-dashboard-oylz.onrender.com/health)
[![Postman Docs](https://img.shields.io/badge/Postman-Documentation-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/58309406/2sBYB1N8gR)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Pminiyar/financial-analytics-dashboard)

A full-stack, fintech-grade web application built for financial analysts to monitor corporate liquidity, revenue trends, expense breakdowns, and multi-entity transaction flows with server-side pagination, multi-dimensional filters, three-state sorting, and configurable backend-streamed CSV reports.

---

## 🔗 Quick Links & Live Deployments

| Resource | URL | Status |
|---|---|---|
| **🌐 Live Application (Frontend)** | [https://financial-analytics-dashboard-self-nine.vercel.app/](https://financial-analytics-dashboard-self-nine.vercel.app/) | ✅ Active (Vercel) |
| **🚀 Backend API Base URL** | [https://financial-analytics-dashboard-oylz.onrender.com](https://financial-analytics-dashboard-oylz.onrender.com) | ✅ Active (Render) |
| **🏥 Backend Health Check** | [https://financial-analytics-dashboard-oylz.onrender.com/health](https://financial-analytics-dashboard-oylz.onrender.com/health) | `{"status": "ok"}` |
| **📑 Published Postman Docs** | [https://documenter.getpostman.com/view/58309406/2sBYB1N8gR](https://documenter.getpostman.com/view/58309406/2sBYB1N8gR) | ✅ Verified |
| **💻 GitHub Repository** | [https://github.com/Pminiyar/financial-analytics-dashboard](https://github.com/Pminiyar/financial-analytics-dashboard) | ✅ Public |

---

## 👤 Submission Details

- **Applicant Name:** Piyush Miniyar
- **Email:** `piyushminiyar2002@gmail.com`
- **GitHub Repository:** [https://github.com/Pminiyar/financial-analytics-dashboard](https://github.com/Pminiyar/financial-analytics-dashboard)
- **Live Deployment:** [https://financial-analytics-dashboard-self-nine.vercel.app/](https://financial-analytics-dashboard-self-nine.vercel.app/)
- **Postman Documentation:** [https://documenter.getpostman.com/view/58309406/2sBYB1N8gR](https://documenter.getpostman.com/view/58309406/2sBYB1N8gR)

---

## 🔑 Demo Login Credentials

You can use the built-in demo account to log into the application immediately:

| Field | Value |
|---|---|
| **Email** | `demo@loopr-dashboard.com` |
| **Password** | `Demo@123` |

> 💡 **Tip:** On the login page, you can simply click the **"Auto-Fill"** button to enter these credentials in 1 second!

---

## 1. Overview

The **Financial Analytics Dashboard** is designed for financial analysts, finance directors, and leadership teams to analyze high-volume corporate transactions. It translates raw accounting data into actionable insights, interactive charts, and exportable audit reports.

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Chart.js.
- **Backend:** Node.js, Express, TypeScript, Mongoose, JWT authentication, RFC-4180 CSV engine.
- **Database:** MongoDB Atlas (production) with automatic local in-memory fallback for immediate zero-config runs.

---

## 2. Key Features

### 🔐 Authentication & Security
- **JWT-Based Authentication:** Secure login, registration, token persistence in localStorage, and protected API routes.
- **Password Hashing:** Passwords securely hashed with `bcryptjs` (salt rounds: 10).
- **Auto-Fill Demo Account:** Fast evaluation access with a single click.

### 📈 Financial Dashboard
- **Top 4 Summary Cards:**
  1. **Total Revenue** (e.g. `$456,650.00`)
  2. **Total Expenses** (e.g. `$107,420.50`)
  3. **Net Balance** (e.g. `$349,229.50`)
  4. **Total Transactions** (e.g. `70` transactions)
- **Revenue vs. Expenses Trend Chart:** Monthly multi-bar visualization built with Chart.js.
- **Category Distribution Doughnut Chart:** Breakdown by business function (Sales, Software, Marketing, Services, Operations, Travel, Office, etc.) with custom hover percentages.
- **Recent Transactions Ledger:** Quick glance at latest transactions with positive (`+$`) and negative (`-$`) financial badges.

### 📋 Full Transactions Page
- **Live Search Bar:** Instant debounced search across ID, description, category, status, and team member.
- **Advanced Filters Drawer:**
  - **Category:** All, Sales, Services, Software, Marketing, Operations, Travel, Office, Other.
  - **Status:** All, Paid, Pending, Failed.
  - **Type:** All, Revenue, Expense.
  - **User Selector:** Filter transactions by analyst/manager profile.
  - **Date Range:** Start date & End date picker.
  - **Amount Range:** Min & Max dollar bounds.
- **Server-Side Sorting:** 3-state sorting (Ascending ⬆️ $\rightarrow$ Descending ⬇️ $\rightarrow$ Default) on Date, Amount, Category, Status, and User.
- **Server-Side Pagination:** Limit & offset pagination with rows-per-page selector (10, 20, 50).

### 📥 Configurable CSV Export
- **Custom Column Selector:** Choose which columns to export (`id`, `date`, `amount`, `category`, `status`, `user`, `user_profile`, `transaction_type`, `description`).
- **Select All / Clear All:** Bulk column toggles with live header previews.
- **Direct Browser Download:** Backend streams the CSV with `Content-Disposition: attachment` and UTF-8 BOM so Microsoft Excel and Google Sheets render numbers and currencies without formatting issues.

### 📊 In-Depth Analytics Page
- Net profit margins, expense ratios, blended ticket size, and full category line-item tables.

---

## 3. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend UI** | **React 19** + **TypeScript** | Strongly-typed, modern UI components |
| **Build Tool** | **Vite** | Ultra-fast development and optimized production bundling |
| **Styling** | **Tailwind CSS** | Fintech SaaS aesthetic (neutral slate, indigo, emerald, rose) |
| **Charts** | **Chart.js** + **react-chartjs-2** | Responsive Bar and Doughnut charts |
| **Icons** | **Lucide React** | Clean, modern iconography |
| **Routing** | **React Router v6** | Single Page Application client routing with protected guards |
| **Backend API**| **Node.js** + **Express** + **TypeScript** | REST API endpoints, middleware, and services |
| **Database** | **MongoDB** + **Mongoose** | Schema validation, compound indexing, aggregation pipelines |
| **Cloud DB** | **MongoDB Atlas** | Production cloud database cluster |
| **Auth** | **JWT** + **bcryptjs** | Stateless Bearer token authorization |
| **Deployments**| **Vercel** (Frontend) + **Render** (Backend) | Global edge CDN and scalable cloud web service |

---

## 4. Architecture

```
                                  +-----------------------+
                                  |  React 19 + Vite SPA  |
                                  |  (Deployed on Vercel) |
                                  +-----------+-----------+
                                              |
                             REST API (JSON)  |  Direct Stream (.csv)
                             Bearer Token     |  Browser Auto-download
                                              v
                                  +-----------------------+
                                  |  Express API Server   |
                                  |  (Deployed on Render) |
                                  +-----------+-----------+
                                              |
                   +--------------------------+--------------------------+
                   |                          |                          |
                   v                          v                          v
          +-----------------+        +-----------------+        +-----------------+
          | Auth Controller |        | Txn Controller  |        | Analytics Ctrl  |
          +--------+--------+        +--------+--------+        +--------+--------+
                   |                          |                          |
                   v                          v                          v
          +-----------------+        +-----------------+        +-----------------+
          | JWT / Bcrypt    |        | CSV Service     |        | Aggregations    |
          +-----------------+        +-----------------+        +-----------------+
                                              |
                                              v
                                  +-----------------------+
                                  |     MongoDB Atlas     |
                                  |   (Cluster Database)  |
                                  +-----------------------+
```

---

## 5. Project Folder Structure

```
financial-analytics-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts         # Dual-mode connector (Atlas / local memory)
│   │   │   └── env.ts              # Strongly-typed environment variables
│   │   ├── controllers/
│   │   │   ├── authController.ts   # Register, login, logout, me
│   │   │   ├── transactionController.ts # List, get by ID, export CSV
│   │   │   └── analyticsController.ts   # Summary, trends, categories
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts   # Bearer JWT token verification
│   │   │   └── errorMiddleware.ts  # 404 & centralized error handler
│   │   ├── models/
│   │   │   ├── User.ts             # User schema with bcrypt password hashing
│   │   │   └── Transaction.ts      # Indexed transaction schema
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── transactionRoutes.ts
│   │   │   └── analyticsRoutes.ts
│   │   ├── seed/
│   │   │   └── seedData.ts         # 70+ realistic multi-month seed transactions
│   │   ├── services/
│   │   │   ├── analyticsService.ts # MongoDB aggregation pipelines
│   │   │   ├── csvService.ts       # RFC-4180 compliant CSV stream generator
│   │   │   └── transactionService.ts# Filter, search, sort, pagination logic
│   │   ├── types/                  # Backend TypeScript contracts
│   │   ├── app.ts                  # Express application setup, CORS, routes
│   │   └── server.ts               # Server entry point & auto-seeder
│   ├── package.json
│   ├── tsconfig.json
│   └── render.yaml                 # Render cloud deployment blueprint
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/             # Button, Modal, Loader, Alert, ToastContainer
│   │   │   ├── dashboard/          # SummaryCard, RevenueExpenseChart, CategoryChart, RecentTransactions
│   │   │   ├── layout/             # Sidebar, Header, Layout
│   │   │   └── transactions/       # SearchBar, TransactionFilters, TransactionTable, Pagination, ExportModal
│   │   ├── context/
│   │   │   ├── AuthContext.tsx     # Session state & JWT handling
│   │   │   └── ToastContext.tsx    # Toast notifications provider
│   │   ├── pages/
│   │   │   ├── Login.tsx           # Login page with 1-click demo filler
│   │   │   ├── Register.tsx        # Registration page
│   │   │   ├── Dashboard.tsx       # Main analytics dashboard
│   │   │   ├── Transactions.tsx    # Transaction audit ledger with filters
│   │   │   └── Analytics.tsx       # Deep-dive ratio and category analysis
│   │   ├── services/
│   │   │   └── api.ts              # Axios HTTP client with JWT interceptor
│   │   ├── types/                  # Frontend TypeScript contracts
│   │   ├── utils/                  # Currency, date, and badge formatters
│   │   ├── App.tsx                 # Route definitions & guards
│   │   └── main.tsx                # React DOM mount point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vercel.json                 # Vercel SPA rewrite configuration
│
├── postman/
│   └── Financial-Analytics-Dashboard.postman_collection.json # Exported collection file
├── verify-qa.js                    # Automated end-to-end QA test suite
├── package.json                    # Root script orchestrator (`npm run dev`)
└── README.md                       # Project documentation
```

---

## 6. How to Run Locally

### Prerequisites
- **Node.js**: v18 or newer
- **npm**: v9 or newer
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Pminiyar/financial-analytics-dashboard.git
cd financial-analytics-dashboard
```

### 2. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

cd ..
```

### 3. Environment Variables Setup

#### Backend (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.ohcs4zq.mongodb.net/financial-dashboard?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=super-secret-jwt-token-financial-analytics-dashboard-key-2026
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```
*(Note: If no MongoDB Atlas URI is provided, the backend will automatically spin up an in-memory database for testing.)*

#### Frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Application

You can start both Backend and Frontend concurrently with one command from the project root:

```bash
npm run dev
```

Or run them in separate terminals:

```bash
# Terminal 1: Start Backend (Runs on http://localhost:5000)
cd backend
npm run dev

# Terminal 2: Start Frontend (Runs on http://localhost:5173)
cd frontend
npm run dev
```

Open your browser at **`http://localhost:5173`** and sign in!

---

## 7. API Endpoints & Real Responses

Published Postman Documentation: **[View Postman Collection](https://documenter.getpostman.com/view/58309406/2sBYB1N8gR)**

### 1. Health Check
- **Endpoint:** `GET /health`
- **Response:**
  ```json
  {
    "status": "ok"
  }
  ```

### 2. Authentication Endpoints
- `POST /api/auth/register` — Create a new analyst profile.
- `POST /api/auth/login` — Authenticate and receive a JWT token.
- `POST /api/auth/logout` — Invalidate user session.
- `GET /api/auth/me` — Get current logged-in user profile *(Protected)*.

### 3. Analytics Endpoints *(Protected)*

#### `GET /api/analytics/summary`
```json
{
  "success": true,
  "data": {
    "totalRevenue": 456650,
    "totalExpenses": 107420.5,
    "netBalance": 349229.5,
    "transactionCount": 70
  }
}
```

#### `GET /api/analytics/trends`
```json
{
  "success": true,
  "data": [
    { "period": "Mar 26", "revenue": 70300, "expenses": 13630 },
    { "period": "Apr 26", "revenue": 61100, "expenses": 12200 },
    { "period": "May 26", "revenue": 55300, "expenses": 14800 },
    { "period": "Jun 26", "revenue": 71500, "expenses": 16900 },
    { "period": "Jul 26", "revenue": 67500, "expenses": 15950 },
    { "period": "Aug 26", "revenue": 74850, "expenses": 18700 },
    { "period": "Sep 26", "revenue": 56100, "expenses": 15240.5 }
  ]
}
```

#### `GET /api/analytics/categories`
```json
{
  "success": true,
  "data": [
    {
      "category": "Sales",
      "type": "Revenue",
      "amount": 327900,
      "count": 17,
      "percentage": 58.1
    },
    {
      "category": "Services",
      "type": "Revenue",
      "amount": 128750,
      "count": 16,
      "percentage": 22.8
    },
    {
      "category": "Software",
      "type": "Expense",
      "amount": 22740,
      "count": 9,
      "percentage": 4.0
    },
    {
      "category": "Marketing",
      "type": "Expense",
      "amount": 29700,
      "count": 7,
      "percentage": 5.3
    }
  ]
}
```

### 4. Transaction Endpoints *(Protected)*
- `GET /api/transactions` — Query paginated transactions with search, filter, and sort query parameters.
- `GET /api/transactions/:id` — Fetch a single transaction by ID.
- `GET /api/transactions/meta/users` — Fetch unique team members for filter dropdowns.
- `POST /api/transactions/export` — Stream custom CSV report matching active filters and selected columns.

---

## 8. CSV Export Feature

The CSV export allows analysts to download tailor-made reports:

1. Click **"Export CSV"** on the Dashboard or Transactions page.
2. An interactive modal displays:
   - Total matching records based on your current search/filters.
   - Checkboxes for all columns (`Date`, `Amount`, `Category`, `Status`, `Description`, `User Profile`, etc.).
   - "Select All" and "Clear All" toggles.
   - Live CSV header preview.
3. Click **"Download CSV Report"**.
4. The backend streams the file with headers:
   ```http
   Content-Type: text/csv; charset=utf-8
   Content-Disposition: attachment; filename="financial_transactions_YYYY-MM-DD.csv"
   ```
5. The browser automatically downloads the file without displaying raw text.

---

## 9. Automated QA Verification

The codebase includes an automated end-to-end QA test suite (`verify-qa.js`) verifying all 15 functional checkpoints:

```bash
node verify-qa.js
```

**Output:**
```
=====================================================
🧪 FINANCIAL ANALYTICS DASHBOARD - END-TO-END QA SUITE
=====================================================
✅ [1/15] Health check passed: status = "ok"
✅ [2/15] Invalid credentials rejected with HTTP 401 (Unauthorized)
✅ [3/15] JWT Login succeeded. Authenticated as: Demo Financial Analyst
✅ [4/15] Protected /api/auth/me verified: demo@loopr-dashboard.com
✅ [5/15] Analytics Summary: Revenue = $456,650, Expenses = $107,420.5, Net = $349,229.5, Total = 70
✅ [6/15] Trends: 7 chronological periods aggregated
✅ [7/15] Categories: 8 categories breakdown ready for charts
✅ [8/15] User Filter Meta: 6 distinct team members
✅ [9/15] Search "Enterprise": Found 22 matching transactions
✅ [10/15] Multi-Filter (Sales + Paid + Revenue): 15 matches
✅ [11/15] Sorting by Amount Descending: Top amount = $34,500
✅ [12/15] Pagination: Page 2 of 7 (Total records: 70)
✅ [13/15] CSV Export Header: attachment; filename="financial_transactions_2026-09-15.csv"
✅ [14/15] CSV Data Generated: 16 rows formatted with UTF-8 BOM
✅ [15/15] Frontend Single Page Application verified live
=====================================================
🎉 ALL 15 AUTOMATED QA CHECKPOINTS VERIFIED 100% PASS
=====================================================
```

---

## 10. Demo Video Checklist (3–5 Minutes)

When recording your demo video, follow this smooth flow:

1. **Introduction (0:00 - 0:30):** Open the live URL ([Vercel](https://financial-analytics-dashboard-self-nine.vercel.app/)), show the login page, and click **"Auto-Fill"** to demonstrate fast authentication.
2. **Dashboard Overview (0:30 - 1:30):** Explain the 4 summary metrics (Total Revenue, Total Expenses, Net Balance, Total Transactions), demonstrate the **Revenue vs Expenses Chart** and **Category Breakdown Doughnut**, and review the recent transactions ledger.
3. **Transactions Exploration (1:30 - 2:30):** Navigate to the **Transactions** page. Show real-time search (e.g. search for `"Enterprise"` or `"Cloud"`), expand the **Filters** drawer (filter by Category: *Sales*, Status: *Paid*), click column headers to showcase 3-state sorting (Ascending / Descending), and browse pages with pagination.
4. **CSV Export Modal (2:30 - 3:15):** Click **"Export CSV"**, toggle columns on/off, click "Select All" / "Clear All", show the live header preview, and click **"Download CSV Report"** to show the browser auto-downloading the `.csv` file.
5. **Advanced Analytics & Postman (3:15 - 4:00):** Show the **Analytics** page with operating margins, and briefly display the [Postman Documentation](https://documenter.getpostman.com/view/58309406/2sBYB1N8gR) showing live 200 OK responses from Render.

---

## 11. Author

**Piyush Miniyar**
- **GitHub:** [@Pminiyar](https://github.com/Pminiyar)
- **Live Demo:** [https://financial-analytics-dashboard-self-nine.vercel.app/](https://financial-analytics-dashboard-self-nine.vercel.app/)
- **API Documentation:** [https://documenter.getpostman.com/view/58309406/2sBYB1N8gR](https://documenter.getpostman.com/view/58309406/2sBYB1N8gR)
