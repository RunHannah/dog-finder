# Dog Finder

Find your new best friend! Browse dogs from our network of shelters and rescues.

## Features

### Authentication

- **Login and Logout:** Users can log in and log out using the provided login and logout functions.
- **Session Management:** Sessions are managed using cookies. The session is created with `createSession` and deleted with `deleteSession`.
- **Protected Routes:** Middleware in `middleware.ts` protects `/search` and `/favorites` routes and redirects users based on their authentication status.

### Cookies and Sessions

- **Session Storage:** Sessions are stored in cookies with HTTP-only, secure, and same-site attributes.
- **Authentication Check:** The middleware checks for the session cookie to determine if a user is authenticated.

### Liking and Matching

- **Favorites:** Users can like dogs and view their favorite dogs on the Favorites page (`app/favorites/page.tsx`).
- **Matching:** Users can get a match from their favorite dogs using the `getMatch` function.
- **Match Details:** The Favorites page displays a drawer with match details when a match is found.

### Searching, Filtering and Sorting

- **Search:** By city and state
- **Filter:** By breed, minimum age, and maximum age
- **Sort:** By breed, name, age, and desc or asc order

## Technologies

- **TypeScript**
- **React 19**
- **Next.js 15**
- **React Hook Form**
- **Zodm**
- **Tailwind**
- **Shadcn/ui**

## Getting Started

To run this application locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

**Clone the repository, install packages, start server:**

```bash
git clone https://github.com/RunHannah/dog-finder

npm install

npm run dev
```
