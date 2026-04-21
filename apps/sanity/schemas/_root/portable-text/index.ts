import { defineArrayMember, defineField } from "sanity";
import { block } from "./block";
import { portableTextIframe } from "./iframe";
import { BsListColumns } from "react-icons/bs";

export default defineField({
  name: "portableText",
  type: "array",
  title: "Portable Text",
  of: [
    defineArrayMember(block),
    defineArrayMember({
      name: "portableTextImage",
      type: "imageObject",
      title: "Image",
    }),
    defineArrayMember({
      name: "portableTextVideo",
      title: "Video",
      type: "videoObject",
    }),
    defineArrayMember(portableTextIframe),
    defineArrayMember({
      name: "contentTableBlock",
      title: "Content Table",
      type: "object",
      icon: BsListColumns,
      fields: [
        {
          name: "title",
          type: "string",
          title: "Title",
          description:
            "This component will generate and render a table of contents for the richtext content BELOW it.",
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: { title: "title" },
        prepare: ({ title }) => ({
          title: title || "Invalid Setup",
        }),
      },
    }),
  ],
});
