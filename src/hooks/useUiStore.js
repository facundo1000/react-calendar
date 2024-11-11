import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { onCloseDateModal, onOpenModalDate } from "../store/ui/uiSlice";

export const useUiStore = () => {
    const { isDateModalOpen } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const openDateModal = () => {
        dispatch(onOpenModalDate());
    };

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    };

    const toggleDateModal = () => {
        (isDateModalOpen) ? closeDateModal() : openDateModal();

    };

    return {
        //* Propiedades
        isDateModalOpen,
        //* Métodos
        openDateModal,
        closeDateModal,
        toggleDateModal
    };
}
