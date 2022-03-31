import { Container, Stack, Button } from "react-bootstrap";
import UserTagsList from "./UserTagsList"

import { store } from '../store/store'
//<div class="col-5"><div class="card tag-block">1</div></div>
function UserTags() {
    return (
        <div>
            <div className="p-2 my-4 mx-3">
                <Stack>
                        <h2 class="mb-3">User Tags</h2>
                        <UserTagsList />

                </Stack>
            </div>
        </div>
    );
}

export default UserTags;