import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };


  const startSavingEvent = async (calendarEvent) => {

    try {
      if (calendarEvent.id) {
        //Actualizar
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //Agregar
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

    } catch (error) {
      // console.log(error);
      Swal.fire('Error', error.response.data?.msg, 'error');
    }
  };

  const startDeleteEvent = async () => {

    try {
      if (activeEvent.id) {
        await calendarApi.delete(`/events/${activeEvent.id}`);
        dispatch(onDeleteEvent());
        return;
      }

    } catch (error) {
      // console.log(error);
      Swal.fire('Error al eliminar', error.response.data?.msg, 'error');

    }




  };


  const startLoadingEvents = async () => {
    try {

      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);
      const filterData = events.filter(e => e.active === true);
      dispatch(onLoadEvents(filterData));
    } catch (error) {
      // console.log(error);
      Swal.fire('Error en la carga de eventos', error.response.data?.msg, 'error');
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
