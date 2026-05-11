# LionsBank

A full-stack fintech-style web application built with Laravel, React, Vite, Tailwind CSS, and Inertia.js. LionsBank simulates a modern digital banking system for learning, portfolio, and rapid prototyping.

## Features

- **User authentication**
  - Secure session handling with Laravel Sanctum
  - Login, registration, and protected user areas
- **Accounts management**
  - View account balances and details
  - Manage multiple banking accounts
- **Transactions system**
  - Track transfers, payments, withdrawals, and deposits
  - Transaction history display with summaries
- **Dashboard with statistics**
  - Overview pages with financial metrics
  - Visual charts and quick action panels
- **AI Banking Agent**
  - Chat assistant to help users with banking queries
  - Conversational support embedded in the app
- **Responsive modern UI**
  - Tailwind CSS styling for mobile and desktop
  - Clean, minimal banking dashboard experience
- **Inertia.js integration**
  - Seamless Laravel + React page rendering
  - Single-page app feel with server-side routing

## Tech Stack

- **Backend**: Laravel
- **Frontend**: React
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Authentication**: Laravel Sanctum
- **Routing & SSR Bridge**: Inertia.js
- **Database**: MySQL / SQLite (configurable)
- **Testing**: Pest / PHPUnit

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/LionsBank.git
   cd LionsBank
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   pnpm install
   ```

4. Copy the environment file and configure it:
   ```bash
   cp .env.example .env
   ```

5. Generate the application key:
   ```bash
   php artisan key:generate
   ```

6. Configure the database in `.env`.

7. Run migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```

8. Start the local development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   pnpm dev
   ```

## Environment Setup

Update the `.env` file with your local configuration:

- `APP_NAME` – Project name
- `APP_URL` – Local application URL
- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` – Database settings
- `SANCTUM_STATEFUL_DOMAINS` – Required for Laravel Sanctum authentication
- `VITE_API_URL` or frontend-related env variables if applicable

Example database section:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lionsbank
DB_USERNAME=root
DB_PASSWORD=
```

## Project Structure

```text
LionsBank/
├── app/              # Laravel application logic and models
├── bootstrap/        # Framework bootstrap files
├── config/           # Application configuration
├── database/         # Migrations, factories, seeders
├── public/           # Public web entrypoint and compiled assets
├── resources/        # React components, views, styles
│   ├── js/           # Frontend React components and pages
│   └── views/        # Blade / Inertia view files
├── routes/           # API and web route definitions
├── storage/          # Logs, cache, and compiled files
├── tests/            # Automated tests
├── vite.config.ts    # Vite configuration
├── composer.json     # PHP dependencies
└── package.json      # JavaScript dependencies
```

## Screenshots

> Add project screenshots here once available.

- Dashboard overview
- Account list
- Transaction history
- AI Banking Agent chat
- Responsive mobile view

## API / Backend Overview

The backend is powered by Laravel and exposes routes for authentication, account management, transactions, and dashboard data. API routes are secured with Sanctum for authenticated access.

Primary backend responsibilities:

- User registration and login
- Account CRUD and balance retrieval
- Transaction logging and history
- Dashboard metrics and summaries
- AI assistant integration endpoints

## AI Agent

LionsBank includes an AI Banking Agent designed to simulate a conversational banking assistant. It helps users with general finance questions, account guidance, and navigation support inside the app.

The AI Agent is built as a chat assistant layer integrated into the frontend and backed by endpoint logic in Laravel.

## Future Improvements

- Add real-time notifications and live transaction updates
- Implement transaction categorization and budgeting tools
- Add account statements export (PDF / CSV)
- Enhance AI assistant with deeper banking workflows
- Add multi-currency support
- Improve accessibility and internationalization

---

Built for portfolio use and fintech learning, LionsBank demonstrates full-stack Laravel + React capabilities with a clean, modern banking experience.
