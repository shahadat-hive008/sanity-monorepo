import { defineType } from "sanity";

export default defineType({
  name: "pageSections",
  title: "Page Sections",
  type: "array",
  of: [
    {
      title: "Faq",
      type: "faqSection",
    },
    {
      title: "Blog Carousel",
      type: "blogCarouselSection",
    },
    {
      title: "Hero",
      type: "heroSection",
    },
  ],
  options: {
    insertMenu: {
      filter: true,
      views: [
        {
          name: "grid",
          previewImageUrl: (schemaTypeName) =>
            `/static/preview-images/${schemaTypeName}.png`,
        },
      ],
      groups: [
        {
          name: "hero",
          of: ["heroSection"],
        },
        {
          name: "sections",
          of: ["faqSection", "richTextSection", "blogCarouselSection"],
        },
      ],
    },
  },
});
