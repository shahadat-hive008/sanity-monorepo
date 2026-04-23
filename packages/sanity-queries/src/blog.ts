import { defineQuery } from 'next-sanity'
export const BLOG_QUERY= defineQuery(`*[_type == 'blog'][0]{
  "author": blogAuthor -> fullName, blogContent, description, title
}`)