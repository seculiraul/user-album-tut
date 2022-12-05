import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import useThunk from "../hooks/useThunk";
import { Fragment } from "react";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumsList";

const UsersListItem = ({ user }) => {

    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user);
    }

    const header = <Fragment>
        <Button className='mr-3' loading={isLoading} onClick={handleClick}>
            <GoTrashcan />
        </Button>
        {error && <div>Error deleteing</div>}
        {user.name}
    </Fragment>

    return (
        <ExpandablePanel header={header}>
            <AlbumList user={user} />
        </ExpandablePanel>
    )
}

export default UsersListItem;