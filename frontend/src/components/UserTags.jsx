import { Stack } from 'react-bootstrap';
import UserTagsList from './UserTagsList';

function UserTags() {
    return (
        <div>
            <div className='p-2 my-4 mx-3'>
                <Stack>
                    <h2 class='mb-3'>User Tags</h2>
                    <UserTagsList />
                </Stack>
            </div>
        </div>
    );
}

export default UserTags;
