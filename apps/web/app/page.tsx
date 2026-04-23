import { sanityClient } from "@/lib/sanity.client";
import { BLOG_QUERY } from "@repo/sanity-queries";
import { PortableText } from "next-sanity";



export default async function Home() {
   const {author, blogContent} = await sanityClient.fetch(BLOG_QUERY);

  return (
    <div className="bg-white h-screen text-black w-full">
      <div className="container mx-auto py-5 md:py-10">
        <p className="text-lg pb-5">Editor name: {author}</p>
        <PortableText value={blogContent} />
      </div>
    </div>
  );
}
