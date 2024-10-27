import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
export default async function Home() {
  const { userId } = await auth();

  let href = userId ? '/journal' : '/new-user';
  return (
    <div className=" h-screen w-screen bg-black text-white  flex items-center justify-center px-20 mx-auto">
      <div className="w-full max-w-[700px] mx-auto">
        <h1 className="text-4xl md:text-6xl mb-4">Mood Sense</h1>
        <h2 className="text-white/85 font-semibold mb-4 text-2xl">
          Track, Analyze, and Understand Your Emotions Over Time.
        </h2>
        <p className="text-lg md:text-xl text-white/60  mb-4">
          A smart mood tracker that lets users log their emotions, view daily
          and monthly trends, and get insights to better understand how their
          mood changes over time.
        </p>
        <div>
          <Link href={href}>
            <button className="text-lg md:text-xl px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
