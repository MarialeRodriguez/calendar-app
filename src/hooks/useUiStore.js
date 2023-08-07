import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

   const {
    isDateModalOpen
   } = useSelector( state => state.ui ); 

   const OpenDateModal = () => {
    dispatch( onOpenDateModal() )
   }

   const closeDateModal = () => {
    dispatch( onCloseDateModal() )
   }

   const toggleDateModal = () => {
        (isDateModalOpen)
            ? closeDateModal()
            : onOpenDateModal();
   }


   return {
    //Propiedades
    isDateModalOpen,

    //Metodos
    OpenDateModal,
    closeDateModal,
    toggleDateModal,
   }
}