"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CartItem } from "@/app/lib/types";
import { ArrowIcon } from "@/app/components/Icon";
import styles from "./page.module.css";

const PAYMENT_METHODS = [
  { id: "card", label: "신용/체크카드" },
  { id: "transfer", label: "실시간 계좌이체" },
  { id: "virtual", label: "가상계좌" },
  { id: "phone", label: "휴대폰 결제" },
];

const MEMO_OPTIONS = [
  "문 앞에 놓아주세요",
  "경비실에 맡겨주세요",
  "부재 시 연락주세요",
  "직접 받겠습니다",
];

const SAVED_INFO_KEY = "hanssem-delivery-info";

type FormKey = "name" | "phone" | "address" | "addressDetail" | "memo";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function validateField(key: FormKey, value: string): string {
  switch (key) {
    case "name":
      if (!value.trim()) return "이름을 입력해 주세요";
      if (value.trim().length < 2) return "최소 2자 이상 입력해 주세요";
      if (value.length > 20) return "최대 20자까지 입력 가능합니다";
      return "";
    case "phone":
      if (!value) return "연락처를 입력해 주세요";
      if (value.replace(/\D/g, "").length < 10) return "올바른 연락처를 입력해 주세요 (예: 010-1234-5678)";
      return "";
    case "address":
      if (!value) return "배송 주소를 검색해 주세요";
      return "";
    case "addressDetail":
      if (value.length > 100) return "최대 100자까지 입력 가능합니다";
      return "";
    default:
      return "";
  }
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    addressDetail: "",
    memo: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FormKey, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FormKey, boolean>>>({});
  const [agreed, setAgreed] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [memoOpen, setMemoOpen] = useState(false);
  const memoRef = useRef<HTMLDivElement>(null);

  /* ── 초기 데이터 로드 ── */
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("hanssem-checkout");
      if (stored) setItems(JSON.parse(stored));
    } catch { /* 무시 */ }

    try {
      const saved = localStorage.getItem(SAVED_INFO_KEY);
      if (saved) {
        const info = JSON.parse(saved);
        setForm((prev) => ({ ...prev, ...info }));
        setSaveInfo(true);
      }
    } catch { /* 무시 */ }
  }, []);

  /* ── 카카오 우편번호 스크립트 ── */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  /* ── 메모 드롭다운 바깥 클릭 닫기 ── */
  useEffect(() => {
    if (!memoOpen) return;
    function handleOutside(e: MouseEvent) {
      if (memoRef.current && !memoRef.current.contains(e.target as Node)) {
        setMemoOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [memoOpen]);

  /* ── 배송정보 저장 ── */
  useEffect(() => {
    if (saveInfo) {
      try {
        localStorage.setItem(SAVED_INFO_KEY, JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          addressDetail: form.addressDetail,
        }));
      } catch { /* 무시 */ }
    }
  }, [saveInfo, form.name, form.phone, form.address, form.addressDetail]);

  function openAddressSearch() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const daum = (window as any).daum;
    if (!daum?.Postcode) return;
    new daum.Postcode({
      oncomplete(data: { roadAddress: string; jibunAddress: string }) {
        const addr = data.roadAddress || data.jibunAddress;
        setForm((prev) => ({ ...prev, address: addr, addressDetail: "" }));
        setErrors((prev) => ({ ...prev, address: "" }));
        setTouched((prev) => ({ ...prev, address: true }));
      },
    }).open();
  }

  function handleField(key: FormKey, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
    }
  }

  function handleBlur(key: FormKey) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key, form[key]) }));
  }

  function handlePhoneInput(raw: string) {
    const formatted = formatPhone(raw);
    handleField("phone", formatted);
  }

  function selectMemo(option: string) {
    handleField("memo", option);
    setMemoOpen(false);
  }

  function handleSaveInfoChange(checked: boolean) {
    setSaveInfo(checked);
    if (!checked) {
      try { localStorage.removeItem(SAVED_INFO_KEY); } catch { /* 무시 */ }
    }
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const originalTotal = items.reduce((sum, i) => sum + (i.originalPrice ?? i.price) * i.quantity, 0);
  const totalDiscount = originalTotal - subtotal;
  const total = subtotal;

  const hasFormErrors = (["name", "phone", "address", "addressDetail"] as FormKey[])
    .some((k) => validateField(k, form[k]) !== "");
  const canSubmit = agreed && !hasFormErrors && items.length > 0;

  return (
    <div className={styles.page}>
      {/* 브레드크럼 */}
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>홈</Link>
        <span className={styles.sep}><ArrowIcon direction="right" size={14} /></span>
        <Link href="/cart" className={styles.breadcrumbLink}>장바구니</Link>
        <span className={styles.sep}><ArrowIcon direction="right" size={14} /></span>
        <span>주문/결제</span>
      </div>

      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>주문/결제</h1>

        <div className={styles.layout}>
          {/* ── 왼쪽: 폼 영역 ── */}
          <div className={styles.formArea}>

            {/* 주문 상품 */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>주문 상품</h2>
              {items.length === 0 ? (
                <p className={styles.noItems}>
                  주문할 상품이 없습니다.{" "}
                  <Link href="/cart" className={styles.backLink}>장바구니로 돌아가기</Link>
                </p>
              ) : (
                <ul className={styles.orderItems}>
                  {items.map((item) => {
                    const key = item.optionLabel
                      ? `${item.productId}__${item.optionLabel}`
                      : item.productId;
                    return (
                      <li key={key} className={styles.orderItem}>
                        <div className={styles.orderThumb}>
                          <Image src={item.thumbnail} alt={item.name} width={72} height={72} className={styles.orderThumbImg} />
                        </div>
                        <div className={styles.orderInfo}>
                          <span className={styles.orderName}>{item.name}</span>
                          {item.optionLabel && <span className={styles.orderOption}>{item.optionLabel}</span>}
                          <span className={styles.orderQtyPrice}>
                            {item.quantity}개 · {(item.price * item.quantity).toLocaleString()}원
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* 배송 정보 */}
            <section className={styles.section}>
              <div className={styles.sectionTitleRow}>
                <h2 className={styles.sectionTitle}>배송 정보</h2>
                <label className={styles.saveInfoLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={saveInfo}
                    onChange={(e) => handleSaveInfoChange(e.target.checked)}
                  />
                  <span>배송정보 저장</span>
                </label>
              </div>

              <div className={styles.formGrid}>
                {/* 이름 */}
                <div className={styles.formRow}>
                  <div className={styles.labelRow}>
                    <label className={styles.label}>
                      받으시는 분 <span className={styles.required}>*</span>
                    </label>
                    <span className={`${styles.charCount} ${form.name.length > 20 ? styles.charCountOver : ""}`}>
                      {form.name.length}/20
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ""}`}
                    placeholder="성함을 입력해 주세요 (2–20자)"
                    value={form.name}
                    maxLength={20}
                    onChange={(e) => handleField("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                  />
                  {touched.name && errors.name && (
                    <span className={styles.errorMsg}>{errors.name}</span>
                  )}
                </div>

                {/* 연락처 */}
                <div className={styles.formRow}>
                  <label className={styles.label}>
                    연락처 <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    className={`${styles.input} ${touched.phone && errors.phone ? styles.inputError : ""}`}
                    placeholder="010-0000-0000"
                    value={form.phone}
                    onChange={(e) => handlePhoneInput(e.target.value)}
                    onBlur={() => handleBlur("phone")}
                  />
                  {touched.phone && errors.phone && (
                    <span className={styles.errorMsg}>{errors.phone}</span>
                  )}
                </div>

                {/* 배송 주소 */}
                <div className={styles.formRow}>
                  <label className={styles.label}>
                    배송 주소 <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.addressGroup}>
                    <input
                      type="text"
                      className={`${styles.input} ${styles.inputReadonly} ${touched.address && errors.address ? styles.inputError : ""}`}
                      placeholder="주소 검색 버튼을 눌러주세요"
                      value={form.address}
                      readOnly
                      onClick={openAddressSearch}
                    />
                    <button type="button" className={styles.addrBtn} onClick={openAddressSearch}>
                      주소 검색
                    </button>
                  </div>
                  {touched.address && errors.address && (
                    <span className={styles.errorMsg}>{errors.address}</span>
                  )}
                  {form.address && (
                    <>
                      <div className={styles.labelRow} style={{ marginTop: 8 }}>
                        <span />
                        <span className={`${styles.charCount} ${form.addressDetail.length > 100 ? styles.charCountOver : ""}`}>
                          {form.addressDetail.length}/100
                        </span>
                      </div>
                      <input
                        type="text"
                        className={`${styles.input} ${touched.addressDetail && errors.addressDetail ? styles.inputError : ""}`}
                        placeholder="상세 주소를 입력해 주세요 (최대 100자)"
                        value={form.addressDetail}
                        maxLength={100}
                        onChange={(e) => handleField("addressDetail", e.target.value)}
                        onBlur={() => handleBlur("addressDetail")}
                      />
                      {touched.addressDetail && errors.addressDetail && (
                        <span className={styles.errorMsg}>{errors.addressDetail}</span>
                      )}
                    </>
                  )}
                </div>

                {/* 배송 메모 — 커스텀 드롭다운 */}
                <div className={styles.formRow}>
                  <label className={styles.label}>배송 메모</label>
                  <div ref={memoRef} className={styles.memoWrap}>
                    <button
                      type="button"
                      className={`${styles.memoToggle} ${memoOpen ? styles.memoToggleOpen : ""}`}
                      onClick={() => setMemoOpen((o) => !o)}
                    >
                      <span className={`${styles.memoLabel} ${!form.memo ? styles.memoPlaceholder : ""}`}>
                        {form.memo || "배송 메모를 선택해 주세요"}
                      </span>
                      <ArrowIcon direction={memoOpen ? "up" : "down"} size={16} aria-hidden />
                    </button>
                    {memoOpen && (
                      <ul className={styles.memoList}>
                        {form.memo && (
                          <li>
                            <button type="button" className={styles.memoItem} onClick={() => selectMemo("")}>
                              선택 안 함
                            </button>
                          </li>
                        )}
                        {MEMO_OPTIONS.map((opt) => (
                          <li key={opt}>
                            <button
                              type="button"
                              className={`${styles.memoItem} ${form.memo === opt ? styles.memoItemActive : ""}`}
                              onClick={() => selectMemo(opt)}
                            >
                              {opt}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 결제 수단 */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>결제 수단</h2>
              <div className={styles.paymentMethods}>
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`${styles.paymentBtn} ${paymentMethod === m.id ? styles.paymentBtnActive : ""}`}
                    onClick={() => setPaymentMethod(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </section>

            {/* 동의 */}
            <section className={styles.section}>
              <label className={styles.agreeRow}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span className={styles.agreeText}>
                  구매조건 확인 및 결제 진행에 동의합니다 <span className={styles.required}>(필수)</span>
                </span>
              </label>
            </section>
          </div>

          {/* ── 오른쪽: 주문 요약 ── */}
          <aside className={styles.summary}>
            <div className={styles.summaryInner}>
              <h2 className={styles.summaryTitle}>결제 금액</h2>

              <div className={styles.summaryItems}>
                {items.map((item) => {
                  const key = item.optionLabel
                    ? `${item.productId}__${item.optionLabel}`
                    : item.productId;
                  return (
                    <div key={key} className={styles.summaryItem}>
                      <span className={styles.summaryItemName}>
                        {item.name}{item.optionLabel && ` (${item.optionLabel})`}
                      </span>
                      <span className={styles.summaryItemPrice}>
                        {(item.price * item.quantity).toLocaleString()}원
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className={styles.summaryDivider} />

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
                className={`${styles.submitBtn} ${!canSubmit ? styles.submitBtnDisabled : ""}`}
                disabled={!canSubmit}
              >
                {total.toLocaleString()}원 결제하기
              </button>

              <p className={styles.summaryNote}>
                위 내용을 확인하였으며 결제에 동의합니다.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
