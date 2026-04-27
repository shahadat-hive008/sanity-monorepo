import { defineQuery } from 'next-sanity';
export const ALL_BLOG_QUERY= defineQuery(`*[_type == "allBlogsPage"][0]{
  _createdAt, _id, afterBlogListSections[0]{
    description, title
  }, beforeBlogListSections[0]{
    "bgImage": bgImage.file.asset->url,
    description,
    title
  }
}`)