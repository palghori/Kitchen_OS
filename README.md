# 🍳 KitchenOS (Enterprise Cloud Kitchen Platform)

KitchenOS is a comprehensive, multi-tenant Software-as-a-Service (SaaS) platform engineered specifically for modern dark kitchens, cloud kitchens, and global restaurant franchises. 

It acts as the central nervous system for food operations, replacing legacy POS systems, spreadsheets, and manual inventory counting with a unified, real-time ecosystem.

## 🚀 Ecosystem Architecture

KitchenOS is composed of three interconnected codebases running on a shared Postgres database:

1. **`kitchenos-frontend` (Next.js / React)**
   - The web-based Command Center.
   - Dashboards for Global Franchise Management, Real-time Financial Analytics, CRM, and the No-Code Automation Builder.
2. **`kitchenos-backend` (NestJS / Node.js)**
   - The heavily secured, enterprise API layer.
   - Features Role-Based Access Control (RBAC), WebSocket Order Gateways (`socket.io`), and a global Audit Interceptor logging all mutations.
3. **`kitchenos-mobile` (Flutter / Dart)**
   - Native iOS and Android applications.
   - Modules for Chef KDS (Kitchen Display System), Owner Push Notifications, and Barcode-based Inventory Management.

## ✨ Core Features

- **Automated Inventory & Procurement:** Uses FIFO logic to auto-deduct ingredients based on precise recipe mapping. Automatically drafts purchase orders to vendors when thresholds drop.
- **Real-Time KDS:** Orders placed flow instantly to digital screens in the kitchen via WebSockets. No more paper tickets.
- **AI Business Copilot:** Built-in generative AI that analyzes sales, labor costs, and vendor pricing to answer complex queries (e.g., "Why did profit drop this week?").
- **No-Code Automation Builder:** Drag-and-drop rule engine (e.g., *If Inventory < 10kg → Notify Kitchen Manager*).
- **Franchise Cloud & White Label:** Multi-tenant architecture allowing enterprise clients to isolate data, inject custom brand colors, and monitor compliance across 100+ kitchens globally.
- **Enterprise Security:** Enforces Zero-Trust architecture with TOTP 2FA, Active Device/IP Session tracking, and Strict Role assignments.

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), React, Vanilla CSS.
- **Backend:** NestJS, WebSockets, Prisma ORM.
- **Mobile:** Flutter, Riverpod.
- **Database/Cache:** PostgreSQL, Redis.
- **DevOps:** Docker, GitHub Actions CI/CD.

## 📦 Deployment
- **Frontend:** Optimized for Vercel edge deployment.
- **Backend:** Containerized via Docker for deployment on Render, AWS ECS, or DigitalOcean.
