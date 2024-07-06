# Boilerplate Template

Admin Dashboard UI crafted with Shadcn and Vite. Built with responsiveness and accessibility in mind.

## Tech Stack

- **UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)
- **State Management:** [Jotai](https://github.com/pmndrs/jotai)
- **Data Fetching:** [React Query](https://react-query.tanstack.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router](https://reactrouter.com/en/main)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org/)
- **Linting/Formatting:** [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Icons:** [Tabler Icons](https://tabler.io/icons)

## Requirements

- Runtime Environment: Node v18 or high
- OS: Windows, Linux, MacOS.

## Getting Started

1. **Environment Setup**
   - **Node.js**: Ensure you have Node.js installed (version 18 or higher). Visit [Node.js](https://nodejs.org/) for installation instructions.

2. **Environment Variables**

   Create a `.env` file in the root of your project based on `.env.example` with the following variables:

   ```plaintext
   # URL of the application
   VITE_APP_URL=localhost:3000

   # Enable or disable cookie-based authentication
   VITE_COOKIE_BASED_AUTHENTICATION=false
   ```

3. **Running the Project**
   - Install dependencies using npm:

     ```bash
     npm install
     ```

   - Start the development server:

     ```bash
     npm run dev
     ```

4. **Environment Variables**

   - Adjust `.env` file as needed for different environments (development, staging, production).

   - Ensure variables like `VITE_APP_URL` match your environment setup.

5. **Notes**

   - Update environment variables (`VITE_APP_URL`, etc.) according to your deployment and development environment needs.

---

## Quick Link

- [STANDARDS](docs/STANDARDS.md)
- [STRUCTURE](docs/STRUCTURE.md)
