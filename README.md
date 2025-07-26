#  Authentication System – Next.js + Prisma + JWT

A full-stack authentication system built with **Next.js App Router**, **Prisma**, **JWT**, and **Tailwind CSS**. Includes user registration, login, protected routes, admin role-based access, and user management features.

---

##  Features

* User registration and login with JWT-based authentication
* Protected routes using `cookies()` and middleware
* Admin role with access to promote and delete users
* Tailwind CSS styled UI
* Dynamic navbar based on authentication state
* Prisma ORM with SQLite or PostgreSQL (configurable)
* Logout and session handling
* Responsive design

---

##  Tech Stack

* **Framework**: Next.js 14+ (App Router)
* **Database**: Prisma ORM with SQLite (default)
* **Auth**: JWT (JSON Web Tokens)
* **Styling**: Tailwind CSS
* **UI**: React + Lucide Icons

---
 **Clone the repo**
https://github.com/Shivakumar-Nyamagoud/AuhhentictionSystem.git

 **install Dipendencies**
npm install

 **Run the app**
npm run dev

Visit: [http://localhost:3000](http://localhost:3000)

---

##  API Routes

* `POST /api/auth/register` — Register new user
* `POST /api/auth/login` — Authenticate and issue token
* `POST /api/auth/logout` — Clears auth cookie
* `GET /api/auth/me` — Returns authenticated user
* `PUT /api/users/:id/role` — Promote user to admin (admin only)

---

##  Roles

* **User**: Default registered users
* **Admin**: Can manage users (promote)

---

##  Security Notes

* JWT stored in `httpOnly` cookies for secure auth
* Server-side route protection using `cookies()` and token verification
* Passwords are hashed with `bcryptjs`

---

