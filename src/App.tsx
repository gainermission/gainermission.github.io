import { mealData } from 'virtual:meal-data';
import { Header } from './components/Header';
import { DayCard } from './components/DayCard';
import './App.css'

function App() {
  // Get username from first day (or fallback)
  const username = mealData[0]?.username || 'User';

  return (
    <div className='flex flex-col w-full min-h-screen bg-bg0-h items-center px-2 sm:px-4'>
      <Header username={username} />
      {mealData.map((dayLog) => (
        <DayCard key={dayLog.filename} dayLog={dayLog} />
      ))}
    </div>
  );
}

export default App
