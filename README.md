# Dashboard-SMMS — Social Media Management System

A unified social media management dashboard for **Sanggaluri Park Purbalingga**, built with **Next.js & Supabase**.

The core problem we set out to solve: managing social media presence across different platforms like Instagram and TikTok is often disjointed, making it difficult to maintain consistent content schedules and track overall performance.

---

## ✨ Technologies

- `Next.js 16`
- `Supabase`
- `Prisma ORM`
- `Tailwind CSS v4`

---

## 🚀 Features

- **Centralized Authentication** — secure login process that eliminates the need for shared passwords across multiple social accounts.
- **Multi-Workspace Management** — dedicated workspaces for Instagram and TikTok to keep platform-specific content organized and prevent mix-ups.
- **Streamlined Database Management** — robust data handling using Prisma, ensuring reliable content storage and retrieval without manual database administration.

---

## 📍 The Process

**The problem:** Managing multiple social media accounts for Sanggaluri Park Purbalingga involved constantly switching between apps, leading to inconsistent posting schedules and difficulty in maintaining a cohesive brand voice. The lack of a centralized system caused friction and wasted time.

**Our approach:** We developed a unified dashboard to serve as the single source of truth for social media management. We implemented dedicated workspaces for key platforms (Instagram and TikTok) and integrated Supabase for robust authentication and data management, providing administrators with a secure and efficient tool to handle their online presence.

---

## 🚦 Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Setup environment: Copy `.env.example` to `.env.local` and configure your Supabase URL, publishable key, pooled database URL, and direct database URL.
4. Run database migrations: `npx prisma migrate dev`
5. Start the development server: `npm run dev`
6. Open `http://localhost:3000` in your browser

---

## 📦 Preview

<video src="preview.mp4" controls="controls" width="100%">
  Your browser does not support the video tag.
</video>

---

## 📝 License

This project was built for commercial purposes.
Licensed under the [MIT License](https://opensource.org/licenses/MIT).
