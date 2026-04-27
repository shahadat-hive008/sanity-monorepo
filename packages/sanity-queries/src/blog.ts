import { defineQuery } from 'next-sanity'
export const BLOG_QUERY= defineQuery(`*[_type == 'blog'][]{
  _id, "slug" : slug.current, "author": blogAuthor -> fullName, blogContent, description, title
}`)

export const SINGLE_BLOG_QUERY = defineQuery(`*[_type == "blog"  && slug.current == $slug ][0]{
  _id, "slug" : slug.current, "author": blogAuthor -> fullName, blogContent, description, title
}`)