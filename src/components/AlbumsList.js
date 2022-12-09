import { useAddAlbumMutation, useFetchAlbumsQuery, useRemoveAlbumMutation } from "../store";
import AlbumListItem from "./AlbumsListItem";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Sketeton";


const AlbumList = ({ user }) => {


    const { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [ addAlbum, results] = useAddAlbumMutation();
    const [ removeAlbum, removeAlbumResults] = useRemoveAlbumMutation();
    const handleClick = () => {
        addAlbum(user);
    }

    let content;
    if(isFetching) {
        return <Skeleton className='h-10 w-full' times={3}/>
    } else if(error) {
        content = <div>Error loading albums.</div>
    } else {
        content = data.map(album => {
            return (
                <AlbumListItem key={album.id} album={album}/>
            )
        })
    }
    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg front-bold">Albums for {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleClick}>
                    Add Album
                </Button>
            </div>
            <div>
            {content}
            </div>
        </div>
    )
}

export default AlbumList;