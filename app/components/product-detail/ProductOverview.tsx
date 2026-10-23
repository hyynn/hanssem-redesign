// 서버 컴포넌트 — 인터랙션이 있는 Gallery·VariantPicker·OrderArea만 클라이언트 leaf로 두고,
// 상품명·가격(ProductInfoPanel)과 배송 요약(DeliveryInfoBox)은 서버에서 렌더링
import ProductGallery from "./ProductGallery";
import ProductInfoPanel from "./ProductInfoPanel";
import ProductVariantPicker from "./ProductVariantPicker";
import DeliveryInfoBox from "./DeliveryInfoBox";
import OrderArea from "./OrderArea";
import { ProductDetail, assembleGallery } from "../../lib/types";
import { calcDiscountRate } from "@/lib/format";
import styles from "./ProductOverview.module.css";

export default function ProductOverview({ product }: { product: ProductDetail }) {
  return (
    <div className={styles.overview}>
      <div className={styles.galleryColumn}>
        <ProductGallery images={assembleGallery(product)} />
      </div>

      <div className={styles.infoColumn}>
        <ProductInfoPanel
          brand={product.brand}
          name={product.name}
          rating={product.rating}
          reviewCount={product.reviewCount}
          originalPrice={product.originalPrice}
          price={product.price}
          discountRate={calcDiscountRate(product.price, product.originalPrice)}
          badge={product.badge}
        />

        <ProductVariantPicker
          siblings={product.siblings}
          selectedId={product.id}
        />

        <OrderArea
          productId={product.id}
          name={product.name}
          thumbnail={product.thumbnail}
          price={product.price}
          originalPrice={product.originalPrice}
          variantLabel={product.variantLabel}
          colors={product.colors}
          priceOptionGroups={product.priceOptionGroups}
          category={product.category}
          filterAttributes={product.filterAttributes}
        />

        <DeliveryInfoBox
          method={product.deliveryInfo.method}
          region={product.deliveryInfo.region}
        />
      </div>
    </div>
  );
}
