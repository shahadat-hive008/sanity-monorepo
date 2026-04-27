import { defineField, defineType } from "sanity";
import { RxSection } from "react-icons/rx";
import { link } from "../../_root/link";
import { LinkIcon } from "@sanity/icons";
import { IoIosColorPalette } from "react-icons/io";

export default defineType({
  name: "heroSection",
  type: "object",
  title: "Hero",
  icon: RxSection,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaLinks",
      title: "CTA Links",
      type: "array",
      of: [
        defineField({
          type: "object",
          name: "heroLink",
          title: "Hero Link",
          icon: LinkIcon,
          groups: [
            {
              name: "link",
              title: "Link",
              icon: LinkIcon,
              default: true,
            },
            {
              name: "theme",
              title: "Theme",
              icon: IoIosColorPalette,
            },
          ],
          fields: [
            link({
              name: "link",
              title: "Link",
              isOptional: false,
              group: "link",
            }),
            defineField({
              name: "theme",
              type: "string",
              title: "Theme",
              options: {
                list: [
                  { title: "Primary", value: "primary" },
                  { title: "Secondary", value: "secondary" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              initialValue: "primary",
              group: "theme",
            }),
          ],
          preview: {
            select: {
              title: "link.label",
              subtitle: "theme",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "bgImage",
      title: "Background Image",
      type: "imageObject",
    }),
  ],
  preview: {
    select: {
      title: "title",
      image: "bgImage.file",
    },
    prepare({ title, image }) {
      return {
        title: title,
        media: image,
        subtitle: "Hero",
      };
    },
  },
});
