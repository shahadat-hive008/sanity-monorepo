import { defineField } from "sanity";
import { FaRegFileVideo } from "react-icons/fa";
import { ImEmbed2 } from "react-icons/im";


interface IVideo {
  type: "file" | "embed";
}

export default defineField({
  name: "videoObject",
  title: "Video Object",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      description:
        "Please select if you want to upload a file or use an embedded link",
      options: {
        layout: "radio",
        list: [
          {
            title: "Embed",
            value: "embed",
          },
          {
            title: "File",
            value: "file",
          },
        ],
      },
      initialValue: "embed",
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      icon: FaRegFileVideo,
      hidden: ({ parent }) => {
        const typedParent = parent as IVideo | undefined;

        if (typedParent?.type == "file") {
          return false;
        }

        return true;
      },
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "embed",
      title: "Video URL",
      type: "url",
      icon: ImEmbed2,
      hidden: ({ parent }) => {
        const typedParent = parent as IVideo | undefined;

        if (typedParent?.type == "embed") {
          return false;
        }

        return true;
      },
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
  ],
  preview: {
    select: {
      type: "type",
      embed: "embed",
      file: "file.asset.url",
    },
    prepare(select) {
      let title;

      if (select.type == "embed") {
        title = "Video | URL";
      }

      if (select.type == "file") {
        title = "Video | File";
      }

      return {
        title,
        subtitle: select.type == "embed" ? select.embed : select.file,
        media: select.type == "embed" ? ImEmbed2 : FaRegFileVideo,
      };
    },
  },
});
