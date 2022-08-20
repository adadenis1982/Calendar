import '../../styles/components/calendar.scss';

function Nav({ prevMonth, nextMonth, nowDay, today }) {

  const monthsArray = [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];

  return (
    <div className="calendar__navigation">
      <button className="arrow arrow__left" onClick={prevMonth}></button>
      <span>{monthsArray.find((_, i) => Number(today.format("M")) === (i + 1))} {today.format("YYYY")}</span>
      <button className="arrow arrow__right" onClick={nextMonth}></button>
      <button onClick={nowDay}>Сегодня</button>
    </div>
  );
}

export default Nav;
