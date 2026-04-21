import { defineField, defineType } from "sanity";
import { CgWebsite } from "react-icons/cg";
import { SiSanity } from "react-icons/si";

export default defineType({
  name: "homePage",
  type: "document",
  title: "Home",
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
      name: "pageSections",
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
        subtitle: "Home Page",
        media: CgWebsite,
      };
    },
  },
});
