import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };


  const startSavingEvent = async (calendarEvent) => {
    //TODO: Grabar en la base de datos

    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {

      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    hastEventSelected: !!activeEvent,

    //* Metodos
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent
  }
}
