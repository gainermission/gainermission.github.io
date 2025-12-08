interface HeaderProps {
  username: string;
}

export function Header({ username }: HeaderProps) {
  return (
    <div className='w-full max-w-4xl flex flex-col items-center bg-bg text-fg text-center mx-4 sm:mx-8 my-4 sm:my-8 mb-0 p-4 rounded-lg'>
      <div className='text-fg font-bold text-xl sm:text-2xl text-shadow-md border border-bg2 p-3 px-6 sm:p-4 sm:px-8 mb-2 rounded-[999px]'>
        meal log
      </div>
      <div className='text-fg4 text-sm sm:text-base'>
        {username}
      </div>
    </div>
  );
}
