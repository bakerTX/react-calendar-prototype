import React from 'react';
import './App.css';

function App() {
  const [startDay, setStartDay] = React.useState('tue');
  const [days, setDays] = React.useState(28);

  return (
    <div className="calendar">
      <Calendar monthTitle={'February'} start={startDay} days={days} />

      <CustomControls 
        startDay={startDay}
        setStartDay={setStartDay}
        days={days}
        setDays={setDays}
      />
    </div>
  );
}

function Calendar({ monthTitle, start, days }) {
    const dayMap = {
        'sun': 0,
        'mon': 1,
        'tue': 2,
        'wed': 3,
        'thu': 4,
        'fri': 5,
        'sat': 6
    };

    const startIndex = dayMap[start];

    const blocks = [];

    // push blanks
    for (var i = 0; i < startIndex; i++) {
        blocks.push(
            <Block key={`blank-first-${i}`} />
        )
    }
    // push days
    for (var j = 0; j < days; j++) {
        blocks.push(
            <Block 
                key={`day-block-${j}`} 
                dayIndex={j + 1} 
                isToday={new Date().getDate() === j + 1}
            />
        );
    }
    // push leftover blanks
    const length = blocks.length;
    const leftovers = (7 - (length % 7));
    if (leftovers < 7) {
      for (var k = 0; k < leftovers; k++) {
        blocks.push(
            <Block key={`blank-last-${k}`} />
        );
      }
    }

    return (
        <div>
            <h1>{monthTitle}</h1>
            <Labels />
            {blocks.map((block, i) => {
                const result = [block]
                // add a newline break for end-of-week
                if ((i+1) % 7 === 0) {
                    result.push(<br key={`br--${i}`} />)
                }
                return result;
            })}
        </div>
    )
}

function Block({ dayIndex, isToday }) {
    return (
        <div className={`block ${isToday && 'highlighted'}`}>
            <span>{dayIndex}</span>
        </div>
    )
}

function Labels() {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    return (
        <div>
            {days.map(day => (
                <div key={`label--${day}`} className="day-label">{day}</div>
            ))}
        </div>
    )
}

function CustomControls({
  startDay,
  setStartDay,
  days,
  setDays
}) {
  return (
    <>
      <h2>Custom controls:</h2>
        <i>changing these will make the 'current day' highlight inaccurate :)</i>
        <div className="control-wrapper">
          <label htmlFor="days">Number of days (28-31):</label>

          <input 
            type="number"
            id="days"
            name="days"
            min="28"
            max="31"
            value={days} 
            onChange={(e) => {
              setDays(e.target.value);
            }}></input>
        </div>
        <div className="control-wrapper">
          {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => {
            return (
              <div key={`startday-control-${day}`}>
                <input type="radio" id={day} name="startDay" value={day} checked={day === startDay} onChange={e => {
                  console.log(e.target);
                  setStartDay(e.target.value)
                }} />
                <label htmlFor={day}>{day}</label>
              </div>
            )
          })}
        </div>
      </>
  )
}

export default App;
