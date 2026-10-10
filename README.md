# 🛒 বাজার দর | BazarDor

**বাজারদর জানুন, সচেতনভাবে কেনাকাটা করুন।**  
BazarDor is a Bengali-language marketplace price tracker that helps people browse daily product prices, compare categories, and see which prices are rising or falling.

## ✨ Features

- Browse a catalog of everyday market products and their latest prices.
- Explore products by category, with a dedicated page for each category.
- Quickly find products with search and sort controls.
- See products whose prices have increased or decreased.
- Open product detail pages with price and market information.
- Create an account and sign in with email and password.
- Sign in with Google or GitHub.
- Get clear toast notifications for authentication actions and protected product links.
- Use responsive layouts on mobile, tablet, and desktop screens.
- See helpful loading states and a friendly Bengali 404 page for invalid routes.

## 🧰 Technologies

- **Next.js 16** — App Router and server-rendered pages
- **Tailwind CSS 4** — responsive styling
- **HeroUI** — form and interface components
- **Better Auth** — email/password and social authentication
- **MongoDB** — authentication data storage
- **BazarDor Open API** — categories and product price data

## 🚀 Getting Started

### Requirements

- Node.js (LTS recommended)
- npm
- A MongoDB connection string
- BazarDor API access

### Install and run

```bash
npm install
npm run dev
```

Open [https://bazar-dor-flame.vercel.app/](https://bazar-dor-flame.vercel.app/) in your browser.

### Environment variables

Create a `.env` file in the project root and configure the authentication values:

```env
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB=your-mongodb-connection-string
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

Google and GitHub credentials are needed only when enabling those social sign-in options. Keep real secrets in `.env`; do not commit them.

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Check the project with ESLint |

