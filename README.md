## Admin Dashboard

Admin Dashboard UI crafted with Shadcn and Vite. Built with responsiveness and accessibility in mind.

### Tech Stack

- **UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)
- **State Management:** [Jotai](https://github.com/pmndrs/jotai)
- **Data Fetching:** [React Query](https://react-query.tanstack.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router](https://reactrouter.com/en/main)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org/)
- **Linting/Formatting:** [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Icons:** [Tabler Icons](https://tabler.io/icons)

#### Project Configuration

1. **Environment Setup**

   - **Node.js**: Ensure you have Node.js installed (version 18 or higher). Visit [Node.js](https://nodejs.org/) for installation instructions.

   - **Package Manager**: This project uses npm as the package manager. If npm is not already installed, you can install it by following the instructions on [npm's website](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

2. **Environment Variables**

   Create a `.env` file in the root of your project based on `.env.example` with the following variables:

   ```plaintext
   # URL of the application
   VITE_APP_URL=localhost:3000

   # Enable or disable cookie-based authentication
   VITE_COOKIE_BASED_AUTHENTICATION=false
   ```

3. **Running the Project**

   - Clone the repository:

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

   - If you add a new variable to .env, ensure it is also added to .env.example and README.md for consistency

5. **Notes**

   - Update environment variables (`VITE_APP_URL`, etc.) according to your deployment and development environment needs.

   - Always use npm for managing packages in this project.

---

### Project Structure

#### `api/`

- **`api.service.ts`**: Contains services for handling backend API communication using `fetch`.
- **`auth.service.ts`**: Manages authentication-related services like login, registration, and token management.
- **`index.ts`**: Acts as an entry point, exporting modules from the `api` directory.

#### `app/`

- **`index.css`**: Global CSS styles for the application.
- **`main.tsx`**: Main entry point for your React application, rendering the root component.
- **`index.tsx`**: Entry point for the apps section of your application.

#### `pages/`

- Directory containing different pages of the application:
  - **`apps/`**: Pages related to various apps.
  - **`auth/`**: Authentication-related pages and components.
  - **`dashboard/`**: Pages and components for the main dashboard.
  - **`errors/`**: Error handling pages and components.
  - **`extra-components/`**: Additional reusable components.
  - **`settings/`**: Pages and components for user settings.
  - **`tasks/`**: Pages and components related to task management.

#### `components/`

- Reusable UI components used across the application, organized into directories (`custom/`, `ui/`) based on functionality.

#### `assets/`

- Contains assets such as images, logos, etc., used in the application.

#### `hooks/`

- Custom hooks used for managing state, authentication, localStorage operations, etc.
- `note`: use hook for handling the jotai atom.

#### `lib/`

- **`utils.ts`**: Utility functions for data manipulation, date formatting, etc.

#### `models/`

- **`user.model.ts`**: Defines the structure for user data include the request type and response type.

#### `store/`

- **`store.ts`**: Centralized state management setup using `Jotai`.
- **`token.ts`**: Handles token management.

#### `utilities/`

- **`routes.ts`**: Defines routes or navigation paths used throughout the application.

---

### Additional Notes

- `Prefer named exports throughout the project for better code readability and maintainability.`

- `When creating a new route, mention its path in utilities/routes.ts to maintain a centralized location for route definitions.`
