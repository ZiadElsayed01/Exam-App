# Exam App

A Next.js 16 application for managing diplomas, exams, questions, and audit logs with role-based dashboards.

## Tech Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- NextAuth
- TanStack React Query
- Zod + React Hook Form

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file with the following values:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-api-url
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run start` – run the production build
- `npm run lint` – lint the project
