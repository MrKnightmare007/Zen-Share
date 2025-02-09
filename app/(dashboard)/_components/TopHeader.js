import { AlignJustify } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

function TopHeader({ onTrigger }) {
  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
      <AlignJustify className='md:hidden cursor-pointer' onClick={onTrigger} />
      <h1 className='text-2xl text-teal-300 md:hidden'>ZenShare</h1>
      <UserButton />
    </div>
  );
}

export default TopHeader;
