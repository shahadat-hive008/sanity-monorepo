import { defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineField({
  name: "imageObject",
  title: "Image",
  icon: ImageIcon,
  type: "object",
  fields: [
    defineField({
      name: "file",
      title: "Image File",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) =>
        rule.custom((value, { parent }) => {
          const typedParent = parent as { alt?: string };

          if (typedParent?.alt && !value) {
            return "Please provide an image or remove the alt text.";
          }

          return true;
        }),
    }),
    defineField({
      name: "alt",
      title: "Alt",
      type: "string",
    }),
  ],
  preview: {
    select: {
      file: "file",
      alt: "alt",
    },
    prepare(select) {
      return {
        title: select.alt || "Image",
        media: select.file,
      };
    },
  },
});
