import { Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from "axios";
import { store } from "../store/store.js";
 
function BanUserButton(props: any) {
    const [retHtml, setRetHtml] = useState("");
    const url = "/admin-panel/ban-user/";
    var username = window.location.pathname;
    console.log(username);
    useEffect(async () => {
        if (username != undefined && store.getState().app.isAdmin) {
            username = username.substring(username.lastIndexOf("/") + 1)
            console.log(username);
            var usernameIsAdmin = await axios.get("http://localhost:3001/api/users/isadmin/" + username);
            console.log(usernameIsAdmin.data);
            if (!usernameIsAdmin.data.isAdmin) {
                var temp = <div className="mt-3">
                                <Button href={url} className="btn-sm" variant="outline-primary">
                                    Ban User
                                </Button>
                            </div>;
                setRetHtml(temp);
            }
            else {
                var temp = <div></div>;
                setRetHtml(temp);
            }
        }
        else {
            var temp = <div></div>;
            setRetHtml(temp);
        }
        console.log(retHtml);
    }, []);

    return (
        <div>
            {retHtml}
        </div>
    );
}
 
 export default BanUserButton;