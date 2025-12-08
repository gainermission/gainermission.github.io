import type { DayLog } from '../types/MealLog';
import { MealSection } from './MealSection';

interface DayCardProps {
  dayLog: DayLog;
}

export function DayCard({ dayLog }: DayCardProps) {
  return (
    <div className='w-full max-w-4xl bg-bg text-fg flex flex-col items-center p-4 sm:p-8 mx-4 sm:mx-8 my-4 sm:my-8 rounded-lg'>
      <div className='text-center mb-4'>
        <div>
          <div className='text-base sm:text-lg font-bold'>
            {dayLog.date}
          </div>
          <div className='mt-2 text-fg4 text-sm sm:text-base p-1 border border-bg2 rounded-[999px]'>
            <span>{dayLog.weight}</span> <span>lbs</span>
          </div>
        </div>
      </div>
      <div className='bg-bg1 p-4 sm:p-8 rounded-lg w-full max-w-md text-sm sm:text-base'>
        {dayLog.meals.map((meal, idx) => (
          <MealSection
            key={idx}
            location={meal.location}
            items={meal.items}
            isLast={idx === dayLog.meals.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
