import { defineQuery } from 'next-sanity';
export const HOME_PAGE_QUERY= defineQuery(`*[_type == "homePage"][0]{
  pageSections[0]{
    "bgImage": bgImage.file.asset->url,
    description,
    title
  }
}`)