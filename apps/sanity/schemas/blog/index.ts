import { StringRule, defineField, defineType } from "sanity";
import { FaBlog, FaStar } from "react-icons/fa";
import { SiSanity } from "react-icons/si";

export default defineType({
  name: "blog",
  type: "document",
  title: "Blog",
  icon: FaBlog,
  groups: [
    {
      name: "content",
      title: "Content",
      icon: SiSanity,
      default: true,
    },
    {
      name: "featured",
      title: "Featured",
      icon: FaStar,
    },
  ],
  fields: [
   defineField({
     name: "slug",
     title: "Slug",
     type: "slug",
     options: {
       source: "title",
       maxLength: 96,
     },
     validation: (rule) =>
       rule.required().error("Please provide a slug."),
   }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "The title of the entity. This is used to generate the slug.",
      validation: (rule: StringRule) =>
        rule.required().error("Please provide the title."),
      group: ["content"],
    }),
    defineField({
      name: "isFeaturedBlog",
      title: "Featured Blog",
      description: "This blog will be featured in the blogs page.",
      type: "boolean",
      initialValue: false,
      group: "featured",
    }),
    defineField({
      name: "blogAuthor",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "A short description of the blog to be used in blog cards.",
      validation: (rule: StringRule) =>
        rule.required().error("Please provide a short description."),
      group: "content",
    }),
    {
      name: "beforeBlogContentSections",
      type: "pageSections",
      group: "content",
    },
    defineField({
      name: "blogContent",
      title: "Blog Content",
      type: "portableText",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    {
      name: "afterBlogContentSections",
      type: "pageSections",
      group: "content",
    },
  ],
  preview: {
    select: {
      title: "title",
      isFeaturedBlog: "isFeaturedBlog",
    },
    prepare({ title, isFeaturedBlog }) {
      return {
        title: title,
        media: FaBlog,
        subtitle: isFeaturedBlog ? "Featured Blog" : "",
      };
    },
  },
});
