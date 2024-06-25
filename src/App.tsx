import dayjs from 'dayjs';

import Calendar from './Calendar';

function App() {
  return (
    <div className="App">
      <Calendar value={dayjs('2024-06-21')} onChange={(date)=>{
        console.log(date,999999);
      }}></Calendar>
    </div>
  );
}

export default App;
