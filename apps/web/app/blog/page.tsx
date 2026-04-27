import { sanityClient } from "@/lib/sanity.client";
import { BLOG_QUERY } from "@repo/sanity-queries";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { BLOG_QUERY_RESULT } from "@repo/sanity-types";



export default async function Home() {
   const blogs:BLOG_QUERY_RESULT = await sanityClient.fetch(BLOG_QUERY);
  return (
    <div className="bg-white h-screen text-black w-full">
      <h2 className="text-2xl md:text-4xl pb-5">Blog page here</h2>
      {blogs.map(blog => <Link key = {blog._id} href={`/blog/${blog.slug}`} >
        <div className="border p-4 container mx-auto py-5 my-5 rounded-lg">
          <h4 className="text-xl ">{blog.title}</h4>
          {blog.blogContent && <div className="line-clamp-6"><PortableText  value={blog.blogContent} /></div>}
        </div>
      </Link>)}
    </div>
  );
}
