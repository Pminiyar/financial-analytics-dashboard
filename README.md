# Financial Analytics Dashboard

A modern, full-stack, fintech-inspired web application designed for financial analysts to monitor corporate liquidity, revenue, expenses, and multi-entity transaction flows with server-side pagination, advanced filtering, multi-field sorting, interactive Chart.js analytics, and customizable backend-streamed CSV reporting.

---

## 1. Overview

The **Financial Analytics Dashboard** is an enterprise-grade platform built specifically for financial analysts, finance leads, and executive teams. It consolidates disparate revenue streams and operational expenditures into real-time metrics, dynamic visualizations, and searchable audit logs.

- **Frontend**: Single Page Application built with React 19, TypeScript, Vite, and Tailwind CSS.
- **Backend**: Express REST API built with Node.js and TypeScript, incorporating JWT authentication and RFC-4180 CSV generation.
- **Database**: MongoDB (supporting cloud MongoDB Atlas as well as seamless local in-memory fallback for zero-config evaluation).

---

## 2. Problem Statement

Corporate finance teams frequently struggle with fragmented transactional spreadsheets, opaque revenue-to-expense allocations, and cumbersome export workflows. Analysts need a responsive, secure portal that allows them to:
- Instantly assess cash flow health and operating margins.
- Trace transactions by team member, vendor category, payment status, and date range.
- Customize export reports to pull only pertinent data columns without revealing sensitive internal identifiers.

---

## 3. Features

### Core Capabilities
- **JWT Authentication**: Secure login, registration, token persistence, and route protection.
- **Top Financial Summary Cards**: Real-time Total Revenue, Total Expenses, Net Balance, and Total Transactions.
- **Trend Visualizations**: Monthly comparison bar chart of Revenue vs. Expenses with formatted currency tooltips.
- **Category Allocation**: Doughnut chart illustrating percentage allocation across budget categories.
- **Recent Transactions Ledger**: Instant view of recent inflows and outflows with positive/negative color indicators.
- **Full Transaction Management**:
  - **Live Search**: Instant text search across transaction IDs, descriptions, categories, statuses, and user profiles.
  - **Multi-Dimensional Filters**: Filter by Category, Settlement Status, Transaction Type (Revenue/Expense), User/Analyst, Date Range, and Amount Range.
  - **Server-Side Sorting**: Three-state toggle (Ascending $\rightarrow$ Descending $\rightarrow$ Default) on Date, Amount, Category, Status, and User.
  - **Server-Side Pagination**: Efficient limit/offset pagination with customizable page sizes (10, 20, 50).
- **Configurable CSV Export**:
  - Interactive modal enabling granular selection of columns (`id`, `date`, `amount`, `category`, `status`, `user`, `user_profile`, `transaction_type`, `description`).
  - Select All / Clear All toggles with live header previews.
  - Automated browser download with RFC-4180 compliance, quote escaping, and UTF-8 BOM for Microsoft Excel compatibility.
- **Error & Notification System**: Non-blocking toast notifications, alert chips, empty states, and skeleton loading screens.

---

## 4. Visual Design & Screenshots

The design language adopts a modern fintech SaaS aesthetic:
- Clean neutral surface backgrounds (`#f8fafc`).
- Primary financial blue accents (`#2563eb`).
- Semantic colors for cash flow: Emerald (`#10b981`) for revenue/positive values and Rose (`#f43f5e`) for expenses.
- Subtle borders, rounded container cards (`rounded-2xl`), and responsive desktop/tablet/mobile layouts.

---

## 5. Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, React Router v6, Axios, Chart.js, react-chartjs-2, Lucide React |
| **Backend** | Node.js, Express, TypeScript, Mongoose, JSON Web Tokens (JWT), BcryptJS, Morgan, CORS |
| **Database** | MongoDB / MongoDB Atlas (with automatic in-memory fallback for local testing) |
| **Testing/Tooling** | Postman Collection, Concurrently, Rimraf |

---

## 6. Architecture

```
                                  +-----------------------+
                                  |  Browser Client       |
                                  |  (React + Vite + TS)  |
                                  +-----------+-----------+
                                              |
                             REST API (JSON)  |  HTTP 200 (CSV Attachment)
                             Bearer JWT       |  Auto-download
                                              v
                                  +-----------------------+
                                  |  Express.js API       |
                                  |  (Node.js + TS)       |
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
          | JWT / Bcrypt    |        | CSV Service     |        | Aggregation     |
          +--------+--------+        +--------+--------+        +--------+--------+
                   |                          |                          |
                   +--------------------------+--------------------------+
                                              | Mongoose ODM
                                              v
                                  +-----------------------+
                                  | MongoDB Atlas / Local |
                                  +-----------------------+
```

---

## 7. Project Structure

```
financial-analytics-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts         # Resilient DB connector with Atlas & memory fallback
│   │   │   └── env.ts              # Strongly-typed environment variables
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── transactionController.ts
│   │   │   └── analyticsController.ts
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts   # JWT validation & user attachment
│   │   │   └── errorMiddleware.ts  # Centralized error handler & 404 router
│   │   ├── models/
│   │   │   ├── User.ts             # User schema with bcrypt password hashing
│   │   │   └── Transaction.ts      # Indexed transaction schema
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── transactionRoutes.ts
│   │   │   └── analyticsRoutes.ts
│   │   ├── seed/
│   │   │   └── seedData.ts         # Multi-month balanced financial dataset generator
│   │   ├── services/
│   │   │   ├── analyticsService.ts # MongoDB aggregation pipelines
│   │   │   ├── csvService.ts       # RFC-4180 compliant CSV stream builder
│   │   │   └── transactionService.ts# Filter, search, and pagination engine
│   │   ├── types/
│   │   │   └── index.ts            # Shared backend TypeScript contracts
│   │   ├── app.ts                  # Express configuration & CORS
│   │   └── server.ts               # Server startup & automatic seeder
│   ├── package.json
│   ├── tsconfig.json
│   ├── render.yaml                 # Render cloud deployment blueprint
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/             # Button, Modal, Loader, Alert, Toast
│   │   │   ├── dashboard/          # SummaryCard, RevenueExpenseChart, CategoryChart, RecentTransactions
│   │   │   ├── layout/             # Sidebar, Header, Layout
│   │   │   └── transactions/       # SearchBar, TransactionFilters, TransactionTable, Pagination, ExportModal
│   │   ├── context/
│   │   │   ├── AuthContext.tsx     # Session management & user state
│   │   │   └── ToastContext.tsx    # Toast notifications provider
│   │   ├── pages/
│   │   │   ├── Login.tsx           # Authentication page with 1-click demo filler
│   │   │   ├── Register.tsx        # Analyst onboarding page
│   │   │   ├── Dashboard.tsx       # Core financial analytics page
│   │   │   ├── Transactions.tsx    # Transaction audit ledger with filters
│   │   │   ├── Analytics.tsx       # Deep-dive ratio and category analysis
│   │   │   └── Settings.tsx        # System diagnostics and profile settings
│   │   ├── services/
│   │   │   └── api.ts              # Axios client with JWT interceptor & CSV download
│   │   ├── types/
│   │   │   └── index.ts            # Frontend TypeScript contracts
│   │   ├── utils/
│   │   │   └── formatters.ts       # Currency, date, and badge styling utilities
│   │   ├── App.tsx                 # Route declarations & route guards
│   │   ├── main.tsx                # React DOM root entrypoint
│   │   └── index.css               # Tailwind CSS declarations
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── vercel.json                 # Vercel deployment configuration
│   └── .env.example
│
├── postman/
│   └── Financial-Analytics-Dashboard.postman_collection.json # Complete API collection
├── package.json                    # Root orchestration script runner
└── README.md
```

---

## 8. Installation

### Prerequisites
- **Node.js**: v18+ (tested on v24.14.1)
- **npm**: v9+ (tested on v11.11.0)
- **Git**

### Clone and Install
```bash
git clone <repository-url>
cd financial-analytics-dashboard

# Install all dependencies (backend + frontend)
cd backend && npm install
cd ../frontend && npm install
cd ..
```

---

## 9. Environment Variables

### Backend (`backend/.env`)
Create `backend/.env` (or copy from `backend/.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/financial-dashboard
JWT_SECRET=super-secret-jwt-token-financial-analytics-dashboard-key-2026
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
Create `frontend/.env` (or copy from `frontend/.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 10. MongoDB Setup

The application features **Dual-Mode Database Connectivity**:
1. **Local MongoDB or MongoDB Atlas**: If a valid `MONGODB_URI` connection is provided, the backend connects directly to it.
2. **Instant Zero-Config In-Memory Fallback**: If local MongoDB daemon is not currently active on your operating system, the backend automatically initializes an in-memory database instance. This allows evaluators to run and test the complete application instantly with zero manual database setup.

---

## 11. Seed Data

The project includes an automatic and manual seeder with 70+ balanced, multi-month corporate transactions spanning:
- Revenue categories: `Sales`, `Services`
- Expense categories: `Software`, `Marketing`, `Operations`, `Travel`, `Office`, `Other`
- Settlement states: `Paid`, `Pending`, `Failed`
- Real-world figures across 6 fiscal months.

To manually re-seed the dataset:
```bash
cd backend
npm run seed
```

---

## 12. Demo Credentials

A pre-configured analyst account is seeded into the database for immediate evaluation:

| Field | Value |
|---|---|
| **Email** | `demo@loopr-dashboard.com` |
| **Password** | `Demo@123` |

> **Pro Tip**: On the login page, simply click the **"Auto-Fill"** button to automatically populate these credentials.

---

## 13. Running Backend

From the `backend` directory:
```bash
cd backend
npm run dev
```

The backend server starts on port `5000`:
- Base URL: `http://localhost:5000`
- Health Check: `http://localhost:5000/health`

---

## 14. Running Frontend

From the `frontend` directory:
```bash
cd frontend
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 15. API Documentation

### Authentication Endpoints
- `POST /api/auth/register` — Register new analyst account.
- `POST /api/auth/login` — Authenticate and receive JWT token.
- `POST /api/auth/logout` — Invalidate user session.
- `GET /api/auth/me` — Retrieve profile of currently authenticated user.

### Transaction Endpoints
- `GET /api/transactions` — Query paginated transactions with search, filters, and sorting.
  - Query parameters: `search`, `category`, `status`, `user`, `transactionType`, `startDate`, `endDate`, `minAmount`, `maxAmount`, `sortBy`, `sortOrder`, `page`, `limit`.
- `GET /api/transactions/:id` — Fetch detailed transaction object by ID.
- `GET /api/transactions/meta/users` — Fetch unique team member list for filter dropdowns.
- `POST /api/transactions/export` — Generate customized CSV file matching current active filters and column choices.

### Analytics Endpoints
- `GET /api/analytics/summary` — Returns `totalRevenue`, `totalExpenses`, `netBalance`, and `transactionCount`.
- `GET /api/analytics/trends` — Returns monthly periods with aggregated revenue and expenses for time-series charts.
- `GET /api/analytics/categories` — Returns category distribution, total capital, and percentage shares.

### Health Endpoint
- `GET /health` — Returns `{"status": "ok"}` for deployment health monitors.

---

## 16. Postman Collection

A full Postman collection is included at:
`postman/Financial-Analytics-Dashboard.postman_collection.json`

It contains pre-configured requests with environment variables for:
- Register, Login, Me, Logout.
- Paginated transactions, full-text search, multi-field filters, and column sorting.
- CSV export endpoint.
- Analytics summary, monthly trends, and category distribution.
- System health check.

---

## 17. CSV Export Workflow

1. Open the **Transactions** page.
2. Apply any combination of search terms or filters (e.g., Category: *Sales*, Status: *Paid*).
3. Click **"Export CSV"** in the upper right.
4. An interactive modal opens displaying:
   - Total number of matching records in scope.
   - Column checkboxes (`Date`, `Amount`, `Category`, `Status`, `Description`, `Type`, `User Profile`, etc.).
   - "Select All" and "Clear All" buttons.
   - Live CSV header preview.
5. Click **"Download CSV Report"**.
6. The backend generates the formatted CSV, adds the UTF-8 BOM, sets `Content-Disposition: attachment; filename="financial_transactions_YYYY-MM-DD.csv"`, and the browser automatically initiates the file download without opening raw text.

---

## 18. Deployment Guide

### Architecture
- **Frontend**: Deployed to Vercel.
- **Backend**: Deployed to Render.
- **Database**: MongoDB Atlas.

### Backend Deployment (Render)
1. Push repository to GitHub.
2. Create a new **Web Service** on Render pointing to the repository.
3. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. Set Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGODB_URI`: `<Your MongoDB Atlas Connection String>`
   - `JWT_SECRET`: `<Secure Random String>`
   - `JWT_EXPIRES_IN`: `7d`
   - `FRONTEND_URL`: `<Your Vercel Domain>`

### Frontend Deployment (Vercel)
1. Import repository on Vercel.
2. Set Root Directory: `frontend`
3. Framework Preset: `Vite`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Set Environment Variables:
   - `VITE_API_URL`: `<Your Render Backend URL>/api`
7. Deploy. Single page application routing is automatically handled via `vercel.json`.

---

## 19. Testing & Verification

### Verified Test Cases
1. **Authentication**: Register new user, login with demo credentials, invalid password rejection, JWT protection on private endpoints.
2. **Dashboard**: Summary cards calculate exact amounts ($456,650.00 revenue, $107,420.50 expenses, $349,229.50 net balance), Chart.js trends render monthly bars, category doughnut displays proper percentages.
3. **Transactions**:
   - Search across terms ("Cloud", "Audit", "Sales") returns accurate subset.
   - Filtering by category, status, and transaction type works dynamically.
   - Sorting toggles ascending, descending, and default.
   - Server-side pagination accurately traverses pages.
4. **CSV Generation**: Requested column filtering respected, UTF-8 BOM present, automated browser download triggers seamlessly.
5. **UI & Responsiveness**: Verified on mobile, tablet, and desktop viewports; toast notifications appear on all user actions.

---

## 20. Future Improvements

- Multi-currency support (EUR, GBP, JPY) with real-time exchange rates.
- Role-Based Access Control (Admin, Lead Auditor, Read-Only Analyst).
- Scheduled recurring email reports of monthly financial summaries.
- PDF executive report generation with embedded charts.
