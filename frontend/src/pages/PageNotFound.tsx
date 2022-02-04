/**
 *  Home.tsx
 *  The home page for the application. Primary landing
 *  page.
 * 
 * @author Ashton Statz
 */

 function PageNotFound() {
   return (
        <div className="p-3 my-4 mx-4 bg-light border rounded">
            <h1 className="text-center">
                <br />
                <br />
                <i className="bi bi-exclamation-octagon"></i> Oops! Page Not Found <i className="bi bi-exclamation-octagon"></i>
                <br />
                <br />
                <br />
            </h1>
        </div>
   );
 }
 
 export default PageNotFound;