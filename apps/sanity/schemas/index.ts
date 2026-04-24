import { DocumentDefinition, SchemaTypeDefinition } from "sanity";

// Pages
import generalPages from "./pages/general";
import homePage from "./pages/home";
import allBlogsPage from "./pages/all-blogs";

// Entities
import blog from "./blog";
import author from "./author";

// Page Sections
import faqSection from "./buildable-sections/faq";
import blogCarouselSection from "./buildable-sections/blog-carousel";


// Layouts
import header from "./layout/header";
import footer from "./layout/footer";

// Miscellaneous
// TODO: Import Miscellaneous schemas here



// Hoisted Objects
import portableText from "./_root/portable-text/index";
import imageObject from "./_root/media/image";
import videoObject from "./_root/media/video";
import pageSections from "./_root/sections";
import hero from "./buildable-sections/hero";

/**
 * Keep schemas in the correct category of arrays.
 * This will make it easier to manage the studio layout
 * structure.
 *
 * Except for globalSchemas, the schemas will render in a folder
 * with a similar name to the array that contains them.
 *
 * i.e header and footer will be placed in a folder named Layout
 *
 * Each schema in globalSchemas will render separately at the top.
 */
export const dynamicPages: DocumentDefinition[] = [generalPages];
export const fixedPages: DocumentDefinition[] = [homePage, allBlogsPage];

export const layouts: DocumentDefinition[] = [header, footer];

export const entities: DocumentDefinition[] = [blog, author];

/**
 * Some documents are only created as tools, to be reused in other documents.
 * They cannot be classified as entities, so we place them here.
 * The schemas used here should be kept in a `miscellaneous` folder.
 */
export const miscellaneous: DocumentDefinition[] = [];

const hoistedObjects: SchemaTypeDefinition[] = [
  portableText,
  imageObject,
  videoObject,

  pageSections,

  // Page Sections
  faqSection,
  blogCarouselSection,
  hero

];

/**
 * Export schema types.
 */
export const schemaTypes = [
  ...layouts,
  ...fixedPages,
  ...dynamicPages,
  ...entities,
  ...miscellaneous,
  ...hoistedObjects,
];
