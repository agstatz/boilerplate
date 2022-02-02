/**
 *  Home.tsx
 *  The home page for the application. Primary landing
 *  page.
 */

import { Stack } from "react-bootstrap";

function Home() {
  return (
    <div className="p-3 my-4 mx-4 bg-light border rounded">
        <Stack gap={2}>
            <h1>Home Page</h1>
            <div>Welcome to the home page.</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </Stack>
    </div>
  );
}

export default Home;
