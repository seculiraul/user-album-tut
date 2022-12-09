import { useAddPhotoMutation, useFetchPhotosQuery, useRemovePhotoMutation,  } from "../store";
import Button from "./Button";
import PhotoListItem from "./PhotoListItem";
import Skeleton from "./Sketeton";

const PhotoList = ( {album} ) => {

    const { data, isFetching, error } =useFetchPhotosQuery(album);
    const [addPhoto, addPhotoResults] = useAddPhotoMutation();

    const handleClick = () => {
        addPhoto(album);
    }

    let content;

    if(isFetching) {
        content = <Skeleton className='h-8 w-8' times={4}/>
    } else if(error) {
        content = <div>Error</div>
    } else {
        content = data.map(photo => {
            return (
                <PhotoListItem key={photo.id} photo={photo} />
            )
        });
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg front-bold">Photo in {album.title}</h3>
                <Button loading={addPhotoResults.isLoading} onClick={handleClick}>
                    Add Photo
                </Button>
            </div>
            <div className="mx-8 flex flex-row flex-wrap justify-center">
                {content}
            </div>
        </div>
    )
}

export default PhotoList;