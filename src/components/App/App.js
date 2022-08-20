import { useState, useReducer, useEffect } from 'react';
import { reducer } from '../../reducer/reducer';
import globalContext from '../../context/context';
import moment from 'moment';

import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Calendar from '../Calendar/Calendar';
import ModalForm from '../ModalForm/ModalForm';

import '../../styles/components/calendar.scss';

function App() {
  const [state, dispatch] = useReducer(reducer, { events: [] });

  localStorage.setItem('events', JSON.stringify({...state?.events}));

  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')));

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem('events')))
  }, [state])
 
  moment.updateLocale('ru', { week: { dow: 1 } });

  const [event, setEvent] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  const [method, setMethod] = useState(null);

  const handleClose = () => {
    setShowForm(false);
    setEvent(null);
  };

  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');

  const prevMonth = () => {
    setToday((prev) => prev.clone().subtract(1, 'month'));
  };
  const nextMonth = () => {
    setToday((prev) => prev.clone().add(1, 'month'));
  };
  const nowDay = () => {
    setToday(moment());
  };

  const handleForm = (methodName, eventForUpdate) => {
    setShowForm(true);
    setEvent(eventForUpdate);
    setMethod(methodName);
  };

  return (
    <globalContext.Provider value={{ state, dispatch }}>
     
        <ModalForm
          isShowForm={isShowForm}
          handleClose={handleClose}
          method={method}
          event={event}
        />
   
      <div className="calendar">
        <Header today={today} nowDay={nowDay} />
        <Nav
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          nowDay={nowDay}
          today={today}
        />
        <Calendar startDay={startDay} events={events} handleForm={handleForm} />
      </div>
    </globalContext.Provider>
  );
}

export default App;
