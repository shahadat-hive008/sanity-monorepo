import { defineArrayMember, defineField, defineType } from "sanity";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import faqItem from "./faq-item";

export default defineType({
  name: "faqSection",
  type: "object",
  title: "FAQ Section",
  icon: MdOutlineQuestionAnswer,
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
      name: "faqItems",
      title: "Faq Items",
      type: "array",
      of: [defineArrayMember(faqItem)],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error("Please provide at least one FAQ for the FAQ section"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      faqItems: "faqItems",
    },
    prepare({ title, faqItems }) {
      const faqItemCount =
        faqItems && faqItems.length
          ? String(faqItems.length).padStart(2, "0")
          : 0;
      return {
        media: MdOutlineQuestionAnswer,
        title: title,
        subtitle: `FAQ | Item Count: ${faqItemCount}`,
      };
    },
  },
});
