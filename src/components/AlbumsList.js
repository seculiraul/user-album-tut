import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Sketeton";


const AlbumList = ({ user }) => {


    const { data, error, isLoading } = useFetchAlbumsQuery(user);
    const [ addAlbum, results] = useAddAlbumMutation();
    console.log(data, error, isLoading);

    const handleClick = () => {
        addAlbum(user);
    }

    let content;
    if(isLoading) {
        return <Skeleton times={3}/>
    } else if(error) {
        content = <div>Error loading albums.</div>
    } else {
        content = data.map(album => {
            const header = <div>{album.title}</div>
            return <ExpandablePanel key={album.id} header={header}>
                List of photos
            </ExpandablePanel>
        })
    }
    return (
        <div>
            <div>
                Albums for {user.name}
                <Button onClick={handleClick}>
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