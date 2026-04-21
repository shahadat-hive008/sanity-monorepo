import { defineArrayMember, defineField, defineType } from "sanity";
import { MdOutlineViewCarousel } from "react-icons/md";

export default defineType({
  name: "blogCarouselSection",
  type: "object",
  title: "Blog Carousel Section",
  icon: MdOutlineViewCarousel,
  fields: [
    defineField({
      name: "overline",
      type: "string",
      title: "Overline",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 6,
    }),
    defineField({
      name: "items",
      title: "Carousel Items",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "blog" }] })],
      validation: (rule) => [
        rule
          .required()
          .min(1)
          .error(
            "Please provide at least one blog for the Blog Carousel section"
          ),
        rule.unique(),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      carouselItems: "items",
    },
    prepare({ title, carouselItems }) {
      const carouselItemsCount =
        carouselItems && carouselItems.length
          ? String(carouselItems.length).padStart(2, "0")
          : 0;
      return {
        media: MdOutlineViewCarousel,
        title: title,
        subtitle: `Blog Carousel | Item Count: ${carouselItemsCount}`,
      };
    },
  },
});
