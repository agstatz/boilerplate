/**
 *  Home.tsx
 *  The home page for the application. Primary landing
 *  page.
 */

 function PageNotFound() {
   return (
        <div className="p-3 my-4 mx-4 bg-light border rounded">
            <h1 className="text-center">
                <i className="bi bi-exclamation-octagon"></i> Oops! Page Not Found <i className="bi bi-exclamation-octagon"></i>
            </h1>
        </div>
   );
 }
 
 export default PageNotFound;