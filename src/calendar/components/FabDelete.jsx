import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {

    const { startDeleteEvent, hastEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeleteEvent();
    }

    return (
        <>
            <button className="btn btn-danger fab-delete" style={{ display: hastEventSelected ? '' : 'none' }} onClick={handleDelete}>
                <i className="fas fa-trash-alt"></i>
            </button>
        </>
    )
};
