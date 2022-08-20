import React from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/components/calendar.scss';

function Calendar({ startDay, events, handleForm }) {
  const day = startDay.clone().subtract(1, 'day');
  const calendar = [...Array(35)].map(() => day.add(1, 'day').clone());
  const isCurrent = (day) => moment().isSame(day, 'day');

  const dayArray = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];

  const handleClick = (event) => {
    let div = event.target.closest('div');

    if (!div) return;

    highlight(div);
  };

  let selectedDiv;

  function highlight(div) {
    if (selectedDiv) {
      selectedDiv.classList.remove('flex-grid__item--select');
    }
    selectedDiv = div;
    selectedDiv.classList.add('flex-grid__item--select');
  }

  return (
    <div className="calendar__grid flex-grid" onClick={handleClick}>
      {calendar.map((item, i) => (
        <div
          key={uuidv4()}
          className={
            isCurrent(item)
              ? 'flex-grid__item flex-grid__item--current'
              : 'flex-grid__item flex-grid__item--empty'
          }
        >
          <p onDoubleClick={() => handleForm('Создать', item)} >
            {i < 7 ? (
              <>
                <span>{`${dayArray.find((_, index) => i === index)}, `}</span>
                <span>{item.format('D')}</span>
              </>
            ) : (
              <span>{item.format('D')}</span>
            )}
          </p>
          {Object.values(events)
            ?.filter(
              (event) =>
                event.time >= item.format('X') &&
                event.time <= item.clone().endOf('day').format('X')
            )
            .map((event) => (
              <li key={uuidv4()} onDoubleClick={() => handleForm('Изменить', event)}>
                {event.title}
              </li>
            ))}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
