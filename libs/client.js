import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PROJECT_ID, SANITY_TOKEN } from "./constants";

export const client = sanityClient({
  projectId: PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token: SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
