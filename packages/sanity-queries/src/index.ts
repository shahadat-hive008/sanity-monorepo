/***
*Here we export all the queries that are used in the app and we done that because next-sanity automatically *imports them using one public import.
*Like when import BLOG_QUERY it will show like this
*
*import { BLOG_QUERY } from '@repo/sanity-queries';
*
***/
export * from './blog';
export * from './home';
export * from './allBlogs'