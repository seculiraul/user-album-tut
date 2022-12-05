import { useEffect } from "react";
import { useSelector} from 'react-redux';
import useThunk from "../hooks/useThunk";
import { fetchUsers } from "../store";
import addUser from "../store/thunks/addUser";
import Button from "./Button";
import Skeleton from "./Sketeton";
import UsersListItem from "./UsersListItem";


const UsersList = () => {

    const [doFetch, isLoadingUsers, errorLoadingUsers] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    const {data} = useSelector((state) => {
        return state.users
    })

    useEffect(() => {
        doFetch();
    }, [doFetch])

    const handleUserAdd = () => {
        doCreateUser();
    }

    let content;
    if(isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />
    } else if(errorLoadingUsers) {
        content = <div>Error</div>
    } else {
        content = data.map(user => {
            return <UsersListItem key={user.id} user={user} />
        })
    }

    return (
        <div>
            <div className="flex row justify-between m-3 items-center">
                <h2 className="m-2 text-xl">Users</h2>
                    <Button
                    onClick={handleUserAdd}
                    loading={isCreatingUser}
                    >
                        + Add User
                    </Button>
                {creatingUserError && 'error creating user'}
            </div>
            {content}
        </div>
    )
}

export default UsersList;