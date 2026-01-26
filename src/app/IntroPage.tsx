
import Image from 'next/image';
import HomeBackGround from '@/assets/ACK1VT002.jpg'
import Link from 'next/link';

export default function IntroPage() {
  return (
    <div className='relative h-screen'>
      <Image src={HomeBackGround} alt='' fill priority className='object-cover -z-10'/>
      <div className='flex h-full justify-center items-end pb-20'>
        <Link href="/main" className='transform rounded-full bg-white/30 px-8 py-3 font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/40'>
            진입</Link>
      </div>
    </div>
  );
}