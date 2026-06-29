"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/app/store/cartStore";
import { ArrowIcon } from "@/app/components/Icon";
import styles from "./page.module.css";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const originalTotal = items.reduce((sum, i) => sum + (i.originalPrice ?? i.price) * i.quantity, 0);
  const totalDiscount = originalTotal - subtotal;
  const shipping = 0;
  const total = subtotal + shipping;

  function handleCheckout() {
    sessionStorage.setItem("hanssem-checkout", JSON.stringify(items));
    router.push("/checkout");
  }

  return (
    <div className={styles.page}>
      {/* 브레드크럼 */}
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>홈</Link>
        <span className={styles.sep}><ArrowIcon direction="right" size={14} /></span>
        <span>장바구니</span>
      </div>

      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>
          장바구니
          {items.length > 0 && (
            <span className={styles.pageTitleCount}>{items.length}</span>
          )}
        </h1>

        {items.length === 0 ? (
          /* 빈 장바구니 */
          <div className={styles.empty}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.3884 7H5.61133L4.15596 17L15.8438 17L14.3884 7ZM14.3884 6C14.8851 6 15.3065 6.3645 15.378 6.85598L16.8334 16.856C16.9212 17.4592 16.4534 18 15.8438 18H4.15596C3.54635 18 3.07859 17.4592 3.16638 16.856L4.62176 6.85598C4.69329 6.3645 5.11468 6 5.61133 6H14.3884Z" stroke="var(--color-gray-light)" strokeWidth="0.5" fill="none"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M7.99988 4.86267V6H6.99988V4.86267C6.99988 3.2801 8.34392 2 9.99988 2C11.6584 2 12.9999 3.28252 12.9999 4.86267V6H11.9999V4.86267C11.9999 3.8779 11.1502 3 9.99988 3C8.85097 3 7.99988 3.87656 7.99988 4.86267Z" stroke="var(--color-gray-light)" strokeWidth="0.5" fill="none"/>
            </svg>
            <p className={styles.emptyTitle}>장바구니가 비어있습니다</p>
            <p className={styles.emptyBody}>마음에 드는 상품을 담아보세요</p>
            <Link href="/category/bedroom" className={styles.emptyBtn}>상품 보러가기</Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* 상품 목록 */}
            <div className={styles.itemsSection}>
              <div className={styles.itemsHeader}>
                <span>상품정보</span>
                <span>수량</span>
                <span>금액</span>
              </div>

              <ul className={styles.itemList}>
                {items.map((item) => {
                  const key = item.optionLabel
                    ? `${item.productId}__${item.optionLabel}`
                    : item.productId;
                  return (
                    <li key={key} className={styles.item}>
                      {/* 썸네일 */}
                      <Link href={`/products/${item.productId}`} className={styles.itemThumb}>
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          width={100}
                          height={100}
                          className={styles.thumbImg}
                        />
                      </Link>

                      {/* 상품 정보 */}
                      <div className={styles.itemInfo}>
                        <Link href={`/products/${item.productId}`} className={styles.itemName}>
                          {item.name}
                        </Link>
                        {item.optionLabel && (
                          <span className={styles.itemOption}>{item.optionLabel}</span>
                        )}
                        <div className={styles.itemPriceGroup}>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className={styles.itemOriginalPrice}>
                              {item.originalPrice.toLocaleString()}원
                            </span>
                          )}
                          <span className={styles.itemUnitPrice}>
                            {item.price.toLocaleString()}원
                          </span>
                        </div>
                      </div>

                      {/* 수량 */}
                      <div className={styles.itemQty}>
                        <div className={styles.stepper}>
                          <button
                            type="button"
                            className={styles.stepBtn}
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.optionLabel)}
                            disabled={item.quantity <= 1}
                            aria-label="수량 줄이기"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M200-440v-80h560v80H200Z"/></svg>
                          </button>
                          <span className={styles.stepCount}>{item.quantity}</span>
                          <button
                            type="button"
                            className={styles.stepBtn}
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.optionLabel)}
                            aria-label="수량 늘리기"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                          </button>
                        </div>
                      </div>

                      {/* 금액 */}
                      <div className={styles.itemPrice}>
                        {(item.price * item.quantity).toLocaleString()}원
                      </div>

                      {/* 삭제 */}
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => remove(item.productId, item.optionLabel)}
                        aria-label="상품 삭제"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* 계속 쇼핑 */}
              <div className={styles.continueShopping}>
                <Link href="/category/bedroom" className={styles.continueBtn}>
                  ← 쇼핑 계속하기
                </Link>
              </div>
            </div>

            {/* 주문 요약 */}
            <aside className={styles.summary}>
              <div className={styles.summaryInner}>
                <h2 className={styles.summaryTitle}>주문 금액</h2>

                <div className={styles.summaryRows}>
                  <div className={styles.summaryRow}>
                    <span>정상가</span>
                    <span>{originalTotal.toLocaleString()}원</span>
                  </div>
                  {totalDiscount > 0 && (
                    <div className={`${styles.summaryRow} ${styles.summaryDiscount}`}>
                      <span>상품 할인</span>
                      <span>−{totalDiscount.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className={styles.summaryRow}>
                    <span>배송비</span>
                    <span className={styles.summaryFree}>무료</span>
                  </div>
                </div>

                <div className={styles.summaryDivider} />

                <div className={styles.summaryTotal}>
                  <span>총 결제금액</span>
                  <div className={styles.summaryTotalGroup}>
                    <span className={styles.summaryTotalPrice}>{total.toLocaleString()}원</span>
                    {totalDiscount > 0 && (
                      <span className={styles.summaryTotalSaving}>
                        {Math.round(totalDiscount / originalTotal * 100)}% 할인 적용
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.checkoutBtn}
                  onClick={handleCheckout}
                >
                  주문하기
                </button>

                <p className={styles.summaryNote}>
                  쿠폰 및 패키지 할인은 주문서에서 적용됩니다.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
