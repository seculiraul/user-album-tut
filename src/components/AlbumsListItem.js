import { Fragment } from "react";
import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import PhotoList from "./PhotoList";

const AlbumListItem = ({ album }) => {

    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleClick =  () => {
        removeAlbum(album)
    }

    const header = (
        <Fragment>
            <Button onClick={handleClick} loading={results.isLoading}>
                <GoTrashcan />
            </Button>
            {album.title}
        </Fragment>)

    return (
        <ExpandablePanel key={album.id} header={header}>
            <PhotoList album={album} />
        </ExpandablePanel>
    )
}

export default AlbumListItem;