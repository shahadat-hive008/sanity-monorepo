import { defineField, defineType } from "sanity";
import { RiFoldersFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { SiSanity } from "react-icons/si";

export default defineType({
  name: "generalPage",
  type: "document",
  title: "General Page",
  icon: RiFoldersFill,
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
        subtitle: "General Page",
        media: CgWebsite,
      };
    },
  },
  orderings: [
    {
      title: "A to Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
