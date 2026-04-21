import { defineField, defineType } from "sanity";
import { FaQuestion } from "react-icons/fa";

export default defineType({
  name: "faqItem",
  type: "object",
  title: "FAQ",
  fields: [
    defineField({
      name: "question",
      type: "string",
      title: "Question",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "portableText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      question: "question",
    },
    prepare({ question }) {
      return {
        title: question,
        media: FaQuestion,
      };
    },
  },
});
