import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';

export const useCalendarStore = () => {

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };


  const startSavingEvent = async (calendarEvent) => {

    if (calendarEvent._id) {
      //Actualizar
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //Agregar
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    }
  };

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent());
  };


  const startLoadingEvents = async () => {
    try {

      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    hastEventSelected: !!activeEvent,

    //* Metodos
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  }
}
