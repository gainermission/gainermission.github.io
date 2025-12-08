interface MealSectionProps {
  location: string;
  items: string[];
  isLast: boolean;
}

export function MealSection({ location, items, isLast }: MealSectionProps) {
  return (
    <>
      <div className='text-fg4'>
        {location}
      </div>
      {items.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
      {!isLast && <hr className='my-4 text-bg4' />}
    </>
  );
}
