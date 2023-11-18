import { NOPAGE_ERROR_CONTENT } from "../constants/StringVietnamese";

export default function NoPage() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='text-center'>
        <p className='text-[100px]'>404</p>
        <p className='mt-10 text-[30px]'>{NOPAGE_ERROR_CONTENT}</p>
      </div>
    </div>
  )
}
