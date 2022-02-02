/**
 *  Home.tsx
 *  The home page for the application. Primary landing
 *  page.
 */

 import { Stack } from "react-bootstrap";

 function PageNotFound() {
   return (
        <div className="p-3 my-4 bg-light border rounded">
            <h1 className="text-center">
                <i className="bi bi-exclamation-octagon"></i> Oops! Page Not Found <i className="bi bi-exclamation-octagon"></i>
            </h1>
        </div>
   );
 }
 
 export default PageNotFound;