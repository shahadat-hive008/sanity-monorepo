import { sanityClient } from "@/lib/sanity.client";
import { SINGLE_BLOG_QUERY } from "@repo/sanity-queries";
import { SINGLE_BLOG_QUERY_RESULT } from "@repo/sanity-types";
import { PortableText } from "next-sanity";
import Link from "next/link";

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const blog: SINGLE_BLOG_QUERY_RESULT = await sanityClient.fetch(
    SINGLE_BLOG_QUERY,
    { slug },
  );
  return (
    <section className="bg-white h-screen text-black w-full py-5 text-lg">
      <Link href="/blogs" className="text-blue-500 underline pb-5">
        Back to blogs
      </Link>
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl pb-5">{blog?.title}</h2>
        {blog?.blogContent && <PortableText value={blog.blogContent} />}
      </div>
    </section>
  );
}
