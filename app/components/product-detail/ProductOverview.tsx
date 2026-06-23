"use client";

import { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfoPanel from "./ProductInfoPanel";
import ProductVariantPicker from "./ProductVariantPicker";
import DeliveryInfoBox from "./DeliveryInfoBox";
import { ProductDetail, assembleGallery } from "../../lib/types";
import styles from "./ProductOverview.module.css";

export default function ProductOverview({ product }: { product: ProductDetail }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className={styles.overview}>
      <div className={styles.galleryColumn}>
        <ProductGallery
          images={assembleGallery(product)}
          activeIndex={activeImageIndex}
          onSelectThumbnail={setActiveImageIndex}
        />
      </div>

      <div className={styles.infoColumn}>
        <ProductInfoPanel
          brand={product.brand}
          name={product.name}
          rating={product.rating}
          reviewCount={product.reviewCount}
          originalPrice={product.originalPrice}
          price={product.price}
          discountRate={product.discountRate}
          badge={product.badge}
        />

        <ProductVariantPicker
          siblings={product.siblings}
          selectedId={product.id}
        />

        <DeliveryInfoBox
          method={product.deliveryInfo.method}
          region={product.deliveryInfo.region}
        />
      </div>
    </div>
  );
}
