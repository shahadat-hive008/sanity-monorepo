import Link from "next/link";




export default async function Home() {
   

  return (
    <div className="bg-white h-screen text-black w-full">
     <h2 className="text-2xl md:text-4xl">Home page here</h2>
     <Link href="/blog" className="text-blue-500 underline mt-5 inline-block">
        Go to blog page
      </Link>
    </div>
  );
}
