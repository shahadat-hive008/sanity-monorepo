import { defineField, defineType } from "sanity";
import { CgWebsite } from "react-icons/cg";
import { SiSanity } from "react-icons/si";

export default defineType({
  name: "allBlogsPage",
  type: "document",
  title: "All Blogs",
  icon: CgWebsite,
  groups: [
    {
      name: "content",
      title: "Content",
      icon: SiSanity,
      default: true,
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    {
      name: "beforeBlogListSections",
      type: "pageSections",
      group: "content",
    },
    {
      name: "afterBlogListSections",
      type: "pageSections",
      group: "content",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: "All Blogs Page",
        media: CgWebsite,
      };
    },
  },
});
