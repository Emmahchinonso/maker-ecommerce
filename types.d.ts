// type SanityImage = {
//   _key?: string;
//   _type: string;
//   asset: {
//     _ref: string;
//     _type: string;
//   };
// };

// export interface IProduct {
//   _createdAt: string;
//   _id: string;
//   _rev: string;
//   _type: string;
//   _updatedAt: string;
//   details: string;
//   image: SanityImage[];
//   name: string;
//   price: number;
//   slug: {
//     _type: string;
//     current: string;
//   };
// }

// export interface Banner {
//   _createdAt: string;
//   _id: string;
//   _rev: string;
//   _type: "banner";
//   _updatedAt: string;
//   buttonText: string;
//   desc: string;
//   discount: string;
//   image: SanityImage;
//   largeText1: string;
//   largeText2: string;
//   midText: string;
//   product: string;
//   saleTime: string;
//   smallText: string;
// }

import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Product
 *
 *
 */
export interface IProduct extends SanityDocument {
  _type: "product";

  /**
   * image — `array`
   *
   *
   */
  image?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * price — `number`
   *
   *
   */
  price?: number;

  /**
   * Details — `string`
   *
   *
   */
  details?: string;
}

/**
 * Banner
 *
 *
 */
export interface Banner extends SanityDocument {
  _type: "banner";

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * ButtonText — `string`
   *
   *
   */
  buttonText?: string;

  /**
   * Product — `string`
   *
   *
   */
  product?: string;

  /**
   * Desc — `string`
   *
   *
   */
  desc?: string;

  /**
   * SmallText — `string`
   *
   *
   */
  smallText?: string;

  /**
   * MidText — `string`
   *
   *
   */
  midText?: string;

  /**
   * LargeText1 — `string`
   *
   *
   */
  largeText1?: string;

  /**
   * LargeText2 — `string`
   *
   *
   */
  largeText2?: string;

  /**
   * Discount — `string`
   *
   *
   */
  discount?: string;

  /**
   * SaleTime — `string`
   *
   *
   */
  saleTime?: string;
}

export type Documents = Product | Banner;
