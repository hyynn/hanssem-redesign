import styles from "./Footer.module.css";

const TOP_LINKS = [
    { label: "회사소개", href: "https://company.hanssem.com/main.do" },
    { label: "이용약관", href: "https://mall.hanssem.com/customer/customerAgreement.do" },
    { label: "위치정보이용약관", href: "https://mall.hanssem.com/customer/locationAgreement.do", emphasized: true },
    { label: "개인정보처리방침", href: "https://mall.hanssem.com/customer/customerPrivacy.do", emphasized: true },
    { label: "이메일무단수집거부", href: "#" },
    { label: "사이버감사실", href: "https://company.hanssem.com/company_info/management_policy/cyber_inspection.do" },
    { label: "공지사항", href: "https://mall.hanssem.com/csCenter/csNotice.do" },
    { label: "고객센터", href: "https://mall.hanssem.com/csCenter/csMain.do" },
];

const CONTACT_BOXES = [
    {
        title: "한샘몰 문의",
        desc: "상품, 배송, 사이트 이용문의",
        phone: "1688-4945",
        buttonLabel: "채팅 상담",
        icon: "chat",
    },
    {
        title: "A/S 문의",
        desc: "A/S 신청 및 추가부품 문의",
        phone: "1588-0900",
        buttonLabel: "채팅 상담",
        icon: "chat",
    },
    {
        title: "한샘 이전설치",
        desc: "상품 이전설치/ 분리/ 재설치 서비스",
        phone: null,
        buttonLabel: "상담 신청",
        icon: "request",
    },
];

function ChatIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.99998 2C4.46527 2 1.59998 4.31154 1.59998 7.16308C1.59998 9.01921 2.81413 10.6456 4.63602 11.5558C4.50207 12.066 4.15129 13.4034 4.081 13.6897C3.99446 14.0449 4.20865 14.0402 4.3489 13.9444C4.45897 13.8697 6.10282 12.7295 6.81201 12.2372C7.19695 12.2954 7.59382 12.3262 7.99998 12.3262C11.5347 12.3262 14.4 10.0143 14.4 7.16308C14.4 4.31188 11.5347 2 7.99998 2Z"
                fill="#121212"
            />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.5303 6.96967C16.8232 7.26256 16.8232 7.73744 16.5303 8.03033L10.5303 14.0303C10.2374 14.3232 9.76256 14.3232 9.46967 14.0303L3.46967 8.03033C3.17678 7.73744 3.17678 7.26256 3.46967 6.96967C3.76256 6.67678 4.23744 6.67678 4.53033 6.96967L10 12.4393L15.4697 6.96967C15.7626 6.67678 16.2374 6.67678 16.5303 6.96967Z"
                fill="#121212"
            />
        </svg>
    );
}

function ChevronRightIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.14645 3.64645C7.34171 3.45118 7.65829 3.45118 7.85355 3.64645L13.8536 9.64645C14.0488 9.84171 14.0488 10.1583 13.8536 10.3536L7.85355 16.3536C7.65829 16.5488 7.34171 16.5488 7.14645 16.3536C6.95118 16.1583 6.95118 15.8417 7.14645 15.6464L12.7929 10L7.14645 4.35355C6.95118 4.15829 6.95118 3.84171 7.14645 3.64645Z"
                fill="#121212"
            />
        </svg>
    );
}

const FAMILY_SITES = [
    { label: "(주)한샘", href: "https://www.hanssem.com" },
    { label: "한샘서비스센터", href: "https://www.hanssemservice.com" },
    { label: "한샘오피스", href: "https://www.hanssemoffice.com" },
    { label: "도무스", href: "https://www.domus.co.kr" },
];

function RequestIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 18H15C15.5523 18 16 17.5523 16 17V10.1502L11.8033 14.3468C11.6158 14.5343 11.3615 14.6397 11.0962 14.6397H9.28423C9.01033 14.6397 8.78741 14.4193 8.78427 14.1454L8.76315 12.3085C8.76006 12.0393 8.86562 11.7803 9.05598 11.5899L11.4192 9.22673H6.5C6.22386 9.22673 6 9.00287 6 8.72673C6 8.45059 6.22386 8.22673 6.5 8.22673H12.4192L15.1009 5.54505L12.2988 2.34162C12.1089 2.12453 11.8346 2 11.5461 2H5C4.44772 2 4 2.44772 4 3V17C4 17.5523 4.44772 18 5 18ZM6.5 5.72673C6.22386 5.72673 6 5.95059 6 6.22673C6 6.50287 6.22386 6.72673 6.5 6.72673H9C9.27614 6.72673 9.5 6.50287 9.5 6.22673C9.5 5.95059 9.27614 5.72673 9 5.72673H6.5Z"
                fill="#121212"
            />
            <path
                d="M16.6459 5.41431L17.9838 6.75223L11.0962 13.6398H9.77845L9.76302 12.2971L16.6459 5.41431Z"
                fill="#121212"
            />
        </svg>
    );
}

function HanssemLogo() {
    return (
        <svg viewBox="0 0 356 34" width="160" height="16" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_footer_logo)">
                <path d="M322.95 1.20651L316.65 7.50684L331.329 22.1864L337.63 15.886L322.95 1.20651Z" fill="#FC8300" />
                <path d="M261.43 11.7197H241.64V20.5597H261.43V11.7197Z" fill="#FC8300" />
                <path d="M355.28 1.21973H345.99V32.5897H355.28V1.21973Z" fill="#CC0D0D" />
                <path d="M315.64 1.21973H306.35V32.5897H315.64V1.21973Z" fill="#0C27C1" />
                <path d="M276 1.21973H266.71V32.5897H276V1.21973Z" fill="#0C27C1" />
                <path d="M236.35 1.21973H227.06V32.5897H236.35V1.21973Z" fill="#CC0D0D" />
                <path d="M295.82 1.21973H286.53V32.5897H295.82V1.21973Z" fill="#CC0D0D" />
                <path d="M8.75 1.21973H0V32.5897H8.75V1.21973Z" fill="black" />
                <path d="M113.83 10.2898C113.71 8.37977 112.09 7.14977 110.01 7.14977C108.12 7.14977 106.28 7.88977 106.28 9.74977C106.26 12.1898 109.09 12.8998 110.4 13.2898C116.41 15.0798 123.01 16.5098 123.01 23.7198C123.01 30.3798 117.39 33.7998 110.49 33.7998C103.59 33.7998 96.97 30.0498 97.22 22.6798H105.42C105.59 24.9298 107.69 26.8098 110.36 26.8098C112.33 26.8098 114.38 25.9198 114.38 23.9598C114.38 20.7198 107.93 20.8598 103.44 18.4898C99.76 16.5498 97.93 13.3898 97.97 9.71977C97.97 3.62977 103.65 0.00976562 110.12 0.00976562C117.01 0.00976562 122.19 3.92977 122.14 10.2998H113.81L113.83 10.2898Z" fill="black" />
                <path d="M140.84 10.2898C140.72 8.37977 139.1 7.14977 137.02 7.14977C135.13 7.14977 133.29 7.88977 133.29 9.74977C133.27 12.1898 136.1 12.8998 137.41 13.2898C143.42 15.0798 150.02 16.5098 150.02 23.7198C150.02 30.3798 144.4 33.7998 137.5 33.7998C130.6 33.7998 123.98 30.0498 124.23 22.6798H132.43C132.6 24.9298 134.7 26.8098 137.37 26.8098C139.34 26.8098 141.39 25.9198 141.39 23.9598C141.39 20.7198 134.94 20.8598 130.45 18.4898C126.77 16.5498 124.94 13.3898 124.98 9.71977C124.98 3.62977 130.66 0.00976562 137.13 0.00976562C144.02 0.00976562 149.2 3.92977 149.15 10.2998H140.82L140.84 10.2898Z" fill="black" />
                <path d="M160.72 26.0497V19.7197H172.69V13.4097H160.72V7.72973H176.17V1.21973H152.36V32.5797H176.57V26.0497H160.72Z" fill="black" />
                <path d="M95.07 1.21973H86.77V17.6997H86.3L74.21 1.21973H66.37V32.5797H74.66V15.0497H75.08L87.61 32.5797H95.07V1.21973Z" fill="black" />
                <path d="M12.62 20.1897H22.7V32.5797H31.3V1.21973H22.7V12.9197H12.62V20.1897Z" fill="black" />
                <path d="M56.75 32.5797H65.1L53.99 1.21973H43.73L32.61 32.5897H40.82L43.15 25.3197H54.43L56.75 32.5897V32.5797ZM48.62 8.77973H48.99L52.25 18.6797H45.35L48.62 8.77973Z" fill="black" />
                <path d="M216.53 1.21973H207.8V32.5897H216.53V1.21973Z" fill="black" />
                <path d="M188.54 1.21973H179.44V32.5797H187.95V13.1097H188.26L197.29 21.8297L203.32 15.5997L188.54 1.21973Z" fill="black" />
            </g>
            <defs>
                <clipPath id="clip0_footer_logo">
                    <rect width="356" height="34" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.topBar}>
                <ul className={styles.topLinks}>
                    {TOP_LINKS.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={link.emphasized ? styles.emphasized : ""}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <details className={styles.familySite}>
                    <summary className={styles.familySiteTrigger}>
                        FAMILY SITE
                        <ChevronIcon />
                    </summary>
                    <ul className={styles.familySiteMenu}>
                        {FAMILY_SITES.map((site) => (
                            <li key={site.label}>
                                <a href={site.href} target="_blank" rel="noopener noreferrer">
                                    {site.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </details>
            </div>

            <div className={styles.mainSection}>
                <div className={styles.brandBlock}>
                    <div className={styles.logoWrap}>
                        <HanssemLogo />
                    </div>
                    <p className={styles.csTitle}>고객센터 이용안내</p>
                    <p className={styles.csTime}>
                        평일 09:00 - 18:00 , 토요일 09:00 - 13:00
                        <br />
                        (일요일,공휴일 휴무)
                    </p>
                </div>

                {CONTACT_BOXES.map((box) => (
                    <div className={styles.contactBox} key={box.title}>
                        <button className={styles.contactTitle}>
                            {box.title}
                            <ChevronRightIcon />
                        </button>
                        <div className={styles.contactDesc}>
                            <span>{box.desc}</span>
                            {box.phone && <span>({box.phone})</span>}
                        </div>
                        <button className={styles.contactBtn}>
                            {box.icon === "chat" ? <ChatIcon /> : <RequestIcon />}
                            {box.buttonLabel}
                        </button>
                    </div>
                ))}

                <div className={styles.qrBlock}>
                    <img src="/images/common/app-qr.png" alt="앱 다운 받기 QR 코드" />
                    <p>앱 다운 받기</p>
                </div>
            </div>

            <div className={styles.legalSection}>
                <p className={styles.legalRow}>
                    <span>㈜한샘 대표자: 김유진</span>
                    <span>경기도 안산시 성곡동 665</span>
                    <i className={styles.divider} />
                    <span>사업자등록번호 : 133-81-22865</span>
                    <i className={styles.divider} />
                    <span>
                        통신판매업신고 : 2010-경기안산-0512
                        <button className={styles.legalLink}>사업자정보확인</button>
                    </span>
                    <i className={styles.divider} />
                    <span>개인정보보호 최고 책임자 : 전무권</span>
                    <i className={styles.divider} />
                    <span>
                        한샘 매장
                        <button className={styles.legalLink}>위치보기</button>
                    </span>
                </p>
                <p className={styles.legalRow}>
                    <span>KEB하나은행 구매안전서비스(채무지급보증)</span>
                    <button className={styles.legalLink}>서비스 가입사실 확인</button>
                </p>
                <p>
                    고객님은 안전거래를 위해 현금결제 시 저희 쇼핑몰에서 가입한 KEB하나은행으로
                    구매안전서비스(채무지급보증)를 이용하실 수 있습니다.
                </p>
                <p className={styles.copyright}>(C) Hanssem Co., Ltd. All rights reserved.</p>
            </div>

            <div className={styles.disclaimerBar}>
                한샘몰 판매 상품 중 &apos;입점브랜드상품&apos;으로 명기된 상품의 경우, (주)한샘은 판매자가
                아닌 통신판매중개자이므로 판매자로서의 책임을 부담하지 아니합니다. 해당 상품, 거래정보
                및 거래에 대하여는 실제 판매자인 각 입점업체에게 책임이 있습니다.
            </div>
        </footer>
    );
}

