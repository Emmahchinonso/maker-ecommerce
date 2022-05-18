import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SANITY_TOKEN } from "./constants";

export const client = sanityClient({
  projectId: "kzg2b5gg",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token: SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
