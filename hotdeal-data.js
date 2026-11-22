/* 버핏카세 /hotdeal 데이터 (2026-11-22 12:20 KST 실사 · 2차 업데이트)
   구조 확장 규칙: items[] 각 항목은
   { platform: "coupang" | "toss" | "naver", title, price, affiliate_url, note, updated_at, ... }
   platform 값만 늘리면 토스쇼핑 셰어링크·네이버 쇼핑커넥트를 같은 카드로 붙일 수 있게 설계했다.
   ※ 가격·재고는 확인 시점 기준. 링크는 쿠팡파트너스에서 직접 발급받은 단축링크(lptag=AF2387959)만 사용.
   ※ naverShop = 네이버 크리에이터샵(buffettlife) 고마진 섹션. 쿠팡파트너스 영역과 섞지 않도록 분리해 렌더한다.
   ※ 본문은 JSON 호환 형식(키·문자열 큰따옴표) — projects/build_hotdeal.py 가 그대로 파싱해 hotdeal.html 을 만든다. */
window.HOTDEAL = {
  "asOf": "2026-11-22 12:20 KST",
  "coupangTag": "AF2387959",
  "disclosure": "이 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.",
  "priceNotice": "표시된 가격 및 할인율은 확인 시점 기준이며, 쿠팡 실시간 판매가·재고에 따라 변동되거나 품절될 수 있습니다. '아낌 금액'은 쿠팡 상세페이지에 함께 표기된 정가(기준가)에서 현재 판매가를 뺀 값이고, 정가 표기가 없는 상품은 정가 대신 확인된 포인트만 적었습니다.",
  "tossNotice": "토스쇼핑 셰어링크 상품은 다음 업데이트부터 같은 카드 형식으로 추가됩니다. 네이버 크리에이터샵 상품은 아래 별도 섹션(쿠팡파트너스와 무관)에 모았습니다.",
  "items": [
    {
      "platform": "coupang",
      "cat": "생활",
      "title": "코멧 오리지널 유아용 아기물티슈 캡형",
      "option": "50g · 100매 · 10개",
      "price": 10890,
      "origin": 18000,
      "discount": 39,
      "unit": "1매당 11원",
      "reviews": "49만 2,028건 · 최고 85%",
      "badges": [
        "한 달 10만명 이상 구매",
        "로켓배송"
      ],
      "delivery": "내일(월) 11/23 도착 보장",
      "shipping": "로켓배송 19,800원 이상 무료 — 단품 10,890원만 담으면 배송비가 붙습니다.",
      "note": "아기 있는 집은 이거 10팩 쌓아두고 겨울 난다 카더라. 1매당 11원이면 물티슈값 걱정은 접는 셈.",
      "image": "/assets/hotdeal/wetissue.webp",
      "image_alt": "코멧 오리지널 유아용 아기물티슈 캡형 10팩 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iR9DRSjjem",
      "product_url": "https://www.coupang.com/vp/products/188227098",
      "updated_at": "2026-11-22 08:33 KST"
    },
    {
      "platform": "coupang",
      "cat": "겨울",
      "title": "해피데이 찜질패드 목어깨용 핫팩",
      "option": "60g · 30개",
      "price": 17280,
      "origin": null,
      "discount": null,
      "unit": "1개당 576원",
      "reviews": "3,569건 · 최고 83%",
      "badges": [
        "로켓배송",
        "한 달 800명 이상 구매"
      ],
      "delivery": "내일(월) 11/23 도착 보장",
      "shipping": "로켓배송 19,800원 이상 무료 — 2,520원 차이로 기준 미달입니다.",
      "note": "목·어깨에 붙이고 다니면 난방비가 아깝지 않다 카더라. 30개면 한 달은 버팁니다.",
      "image": "/assets/hotdeal/hotpack-neck.webp",
      "image_alt": "해피데이 찜질패드 목어깨용 핫팩 60g 30개 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iR9NwKyVMq",
      "product_url": "https://www.coupang.com/vp/products/9673444790",
      "updated_at": "2026-11-22 08:35 KST"
    },
    {
      "platform": "coupang",
      "cat": "겨울",
      "title": "국산 브렌스 김중사 대용량 핫팩 160g",
      "option": "40개 + 핫팩주머니 증정",
      "price": 22900,
      "origin": null,
      "discount": null,
      "unit": "1개당 573원",
      "reviews": "183건 · 최고 83%",
      "badges": [
        "무료배송",
        "26년 1월 제조"
      ],
      "delivery": "모레(화) 11/24 도착 예정",
      "shipping": "판매자 무료배송(브렌스 코퍼레이션 · CJ대한통운).",
      "note": "주머니까지 얹어준다니 이건 뭐 거의 서비스다 카더라. 160g 대용량은 주머니에 넣고 다니기 딱.",
      "image": "/assets/hotdeal/hotpack-brens.webp",
      "image_alt": "국산 브렌스 김중사 대용량 핫팩 160g 40개 + 핫팩주머니 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iR9OzS16gS",
      "product_url": "https://www.coupang.com/vp/products/8730553142",
      "updated_at": "2026-11-22 08:37 KST"
    },
    {
      "platform": "coupang",
      "cat": "식품",
      "title": "핫앤쿡 발열도시락 발열전투식량 5종",
      "option": "쇠고기+제육+김치비빔밥+라면애밥 짬뽕맛+김치찌개 · 1세트 580g",
      "price": 25900,
      "origin": 28000,
      "discount": 7,
      "unit": "100g당 4,466원",
      "reviews": "203건 · 최고 65% · 좋음 22%",
      "badges": [
        "무료배송",
        "물만 부으면 따뜻한 밥"
      ],
      "delivery": "수요일 11/25 도착 예정",
      "shipping": "무료배송(CJ대한통운). 도서산간·제주는 추가 배송비.",
      "note": "전기 없이 물만 부으면 김이 오른다 카더라. 캠핑·등산·정전 대비용으로 한 세트 채워두면 든든.",
      "image": "/assets/hotdeal/meal-kit.webp",
      "image_alt": "핫앤쿡 발열도시락 발열전투식량 5종 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iR9Ppq7nWK",
      "product_url": "https://www.coupang.com/vp/products/8502868916",
      "updated_at": "2026-11-22 08:38 KST"
    },
    {
      "platform": "coupang",
      "cat": "IT",
      "title": "KLIFE 고속충전 대용량 보조배터리 20000mAh",
      "option": "PD 22.5W QC3.0 잔량표시 · PD-Q2 블랙",
      "price": 18800,
      "origin": 56800,
      "discount": 66,
      "unit": "3포트 · LCD 잔량표시",
      "reviews": "9,837건 · 최고 86% · 좋음 8%",
      "badges": [
        "한 달 1,000명 이상 구매",
        "로켓배송",
        "KC 인증"
      ],
      "delivery": "내일(월) 11/23 도착 보장",
      "shipping": "로켓배송 19,800원 이상 무료 — 1,000원 차이로 기준 미달입니다.",
      "note": "2만 밀리암페어를 2만 원 아래로 사는 건 흔한 일이 아니다 카더라. 잔량이 숫자로 보이는 것도 은근 편하고.",
      "image": "/assets/hotdeal/powerbank.webp",
      "image_alt": "KLIFE 고속충전 대용량 보조배터리 20000mAh 블랙 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iPtqGEgPvw",
      "product_url": "https://www.coupang.com/vp/products/7295770123",
      "updated_at": "2026-11-22 08:40 KST"
    },
    {
      "platform": "coupang",
      "cat": "겨울",
      "title": "한일의료기 1인용 전기방석 HL-100(20)",
      "option": "45 × 45cm · 황토",
      "price": 14360,
      "origin": 30800,
      "discount": 53,
      "unit": "코드분리형 · 인조가죽",
      "reviews": "7,645건 · 최고 79%",
      "badges": [
        "한 달 3,000명 이상 구매",
        "국산 탄소열선",
        "KC 인증"
      ],
      "delivery": "내일(월) 11/23 도착 보장",
      "shipping": "로켓배송 19,800원 이상 무료 — 단품은 배송비가 붙습니다.",
      "note": "큰 전기장판 켜기 애매할 때 의자에 하나 깔면 그게 난로다 카더라. 색상·옵션에 따라 가격이 다를 수 있습니다.",
      "image": "/assets/hotdeal/heating-pad.webp",
      "image_alt": "한일의료기 1인용 전기방석 HL-100(20) 45x45 황토 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iQIJeI4JKC",
      "product_url": "https://www.coupang.com/vp/products/7415456989",
      "updated_at": "2026-11-22 08:42 KST"
    },
    {
      "platform": "coupang",
      "cat": "생활",
      "title": "에르먼 국내 제조 PIO 2단 쿠션 발받침대 기본형",
      "option": "네이비 · 460 × 320 × 330mm · 국내 제조((주)디에스피)",
      "price": 29800,
      "origin": 50000,
      "discount": 40,
      "unit": "쿠팡 BEST AWARDS",
      "reviews": "7,971건 · 최고 84% · 좋음 10%",
      "badges": [
        "한 달 3,000명 이상 구매",
        "로켓배송",
        "무료배송"
      ],
      "delivery": "내일(월) 11/23 도착 보장",
      "shipping": "로켓배송 19,800원 이상 무료 — 29,800원이라 기준 충족(무료배송). 색상 네이비·그레이·베이지, 패드형은 39,800원.",
      "note": "책상 아래 발 하나 올려두면 허리가 편하다 카더라. 국내 제조에 2단 쿠션, 후기 7,970건이 붙은 물건.",
      "image": "/assets/hotdeal/footrest.webp",
      "image_alt": "에르먼 국내 제조 PIO 2단 쿠션 발받침대 네이비 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iSnB4jam5Y",
      "product_url": "https://www.coupang.com/vp/products/7830616996?itemId=21259952418",
      "updated_at": "2026-11-22 12:08 KST"
    },
    {
      "platform": "coupang",
      "cat": "식품",
      "title": "하리보 골드베어 사우어 젤리",
      "option": "55개입 · 870g · 1개",
      "price": 10710,
      "origin": 18480,
      "discount": 42,
      "unit": "10g당 123원",
      "reviews": "2,542건 · 최고 90%",
      "badges": [
        "한 달 2,000명 이상 구매",
        "로켓배송",
        "소비기한 2027-03-01 이후"
      ],
      "delivery": "내일(월) 11/23 도착 보장",
      "shipping": "로켓배송 19,800원 이상 무료 — 단품 10,710원은 배송비가 붙습니다.",
      "note": "새콤한 골드베어 55봉지가 한 통에 온다 카더라. 간식 서랍 하나는 이걸로 채워두면 됩니다.",
      "image": "/assets/hotdeal/haribo.webp",
      "image_alt": "하리보 골드베어 사우어 젤리 870g 55개입 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iSp3zSrtQW",
      "product_url": "https://www.coupang.com/vp/products/7780930280?itemId=22731283377",
      "updated_at": "2026-11-22 12:06 KST"
    },
    {
      "platform": "coupang",
      "cat": "식품",
      "title": "팔도 비빔장 저칼로리",
      "option": "185g × 2개 · 100g당 1,397원",
      "price": 5170,
      "origin": 10000,
      "discount": 48,
      "unit": "100g당 1,397원",
      "reviews": "8,636건 · 평점 4.5",
      "badges": [
        "로켓배송",
        "기간한정 할인",
        "소비기한 2027-02-09"
      ],
      "delivery": "내일(월) 11/23 도착 보장",
      "shipping": "로켓배송 19,800원 이상 무료 — 단품이라 배송비가 붙습니다. 1개 2,740원보다 2개 묶음이 개당 155원 쌉니다.",
      "note": "비빔면에 두 숟갈이면 끝나는 장맛 카더라. 다만 목록에 '할인' 표시가 붙은 기간한정가라 언제 끝날지는 모릅니다.",
      "image": "/assets/hotdeal/bibimjang.webp",
      "image_alt": "팔도 비빔장 저칼로리 185g 2개 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iSp4ODGTyS",
      "product_url": "https://www.coupang.com/vp/products/7193811446?itemId=18316571407",
      "updated_at": "2026-11-22 12:07 KST"
    },
    {
      "platform": "coupang",
      "cat": "겨울",
      "title": "MIFAN 극세사 USB 온열 담요",
      "option": "그레이 · 80 × 150cm · USB 전원(무선 휴대용)",
      "price": 22900,
      "origin": 68900,
      "discount": 66,
      "unit": "무릎 담요 겸용",
      "reviews": "1,952건",
      "badges": [
        "무료배송",
        "캠핑·차량 USB"
      ],
      "delivery": "수요일 11/25 도착 예정",
      "shipping": "판매자 무료배송(소담무역 · CJ대한통운). 베이지·브라운은 일시품절이라 지금은 그레이만 고를 수 있습니다.",
      "note": "콘센트 없이 보조배터리로 켜는 담요 카더라. 캠핑이나 차 안에서 무릎 덮개로 쓰기엔 22,900원이 아깝지 않은 값.",
      "image": "/assets/hotdeal/electric-blanket.webp",
      "image_alt": "MIFAN 극세사 USB 온열 담요 그레이 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iSp5P996Bg",
      "product_url": "https://www.coupang.com/vp/products/8409016423",
      "updated_at": "2026-11-22 12:09 KST"
    },
    {
      "platform": "coupang",
      "cat": "식품",
      "title": "오설록 블루밍 티 기프트",
      "option": "티백 9종 × 5p + 쇼핑백 · 1세트(티백 45개)",
      "price": 27970,
      "origin": 45000,
      "discount": 37,
      "unit": "1세트당 27,970원",
      "reviews": "12,986건 · 최고 88%",
      "badges": [
        "한 달 1,000명 이상 구매",
        "무료배송",
        "쇼핑백 포함"
      ],
      "delivery": "내일(월) 11/23 도착 보장",
      "shipping": "무료배송.",
      "note": "선물용으로 물어보면 늘 나오는 이름 카더라. 쇼핑백까지 세트라 연말 인사에 손이 덜 갑니다.",
      "image": "/assets/hotdeal/tea-gift.webp",
      "image_alt": "오설록 블루밍 티 기프트 티백 9종 세트 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iSp7NiIF8S",
      "product_url": "https://www.coupang.com/vp/products/8776291010?itemId=25532636984",
      "updated_at": "2026-11-22 12:10 KST"
    },
    {
      "platform": "coupang",
      "cat": "생활",
      "title": "세타필 모이스춰라이징 크림",
      "option": "100g · 1개",
      "price": 9900,
      "origin": 14700,
      "discount": 32,
      "unit": "와우 할인가 9,800원",
      "reviews": "4,656건 · 최고 85% · 4,000명 이상 만족",
      "badges": [
        "한 달 1,000명 이상 구매",
        "로켓배송",
        "내일 새벽 도착"
      ],
      "delivery": "내일(월) 11/23 새벽 7시 전 도착 보장",
      "shipping": "로켓배송 — 단품 9,900원은 무료배송 기준(19,800원)에 못 미쳐 배송비가 붙을 수 있습니다(와우 회원은 할인가 9,800원).",
      "note": "겨울 되면 손등이 먼저 아는 크림 카더라. 100g은 가방에 넣고 다니기 좋은 사이즈.",
      "image": "/assets/hotdeal/cetaphil.webp",
      "image_alt": "세타필 모이스춰라이징 크림 100g 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iSp8Fw6x3I",
      "product_url": "https://www.coupang.com/vp/products/9304032433",
      "updated_at": "2026-11-22 12:11 KST"
    }
  ],
  "naverShop": {
    "label": "네이버 쇼핑커넥트 · 크리에이터샵",
    "title": "월억버핏 네이버 크리에이터샵 추천 · 고마진",
    "disclosure": "이 섹션은 네이버 쇼핑 커넥트 활동의 일환으로, 구매가 발생하면 일정액의 수수료를 제공받습니다. 위 쿠팡파트너스 상품과는 다른 스토어이며, 가격은 네이버 크리에이터샵 표시가입니다.",
    "note": "쿠팡 핫딜과 별개로, 월억버핏이 직접 골라 크리에이터샵에 올린 고마진 상품입니다. 할인율이 아니라 스토어 표시가 그대로 적었습니다.",
    "url": "https://cshop.naver.com/buffettlife",
    "shopLabel": "🛍️ 크리에이터샵 전체 보기 (buffettlife)",
    "checkedAt": "2026-11-22 12:15 KST",
    "items": [
      {
        "label": "슬립라인 경추베개 — 목디스크·거북목 기능성 베개",
        "price": 69000,
        "note": "트레이딩 데스크에서 목이 굳는 사람용",
        "url": "https://brandconnect.naver.com/affiliates/1018193119022803?channelProductNo=5059571514&ac=crtshp&cid=1017835745140128&ctid=1018193449229728&t=AWsCXUAAA523WgddoAAAAAEtku86DB_L72OGN_g"
      },
      {
        "label": "판테놀 5% PDRN 리쥬잇 장벽 크림 50ml",
        "price": 19900,
        "note": "겨울 장벽 크림 · 50ml 1개",
        "url": "https://brandconnect.naver.com/affiliates/1018193119022797?channelProductNo=13814131092&ac=crtshp&cid=1017835745140128&ctid=1018193449229728&t=AWsCXUAAA523WgddoAAAAAM3YumUX3mcMDUynYc"
      },
      {
        "label": "[잇퓨] 요철제로 3종 세트 (율무 크림 + 앰플 + 토너 패드)",
        "price": 65700,
        "note": "세트 구성 그대로",
        "url": "https://brandconnect.naver.com/affiliates/1018193119022796?channelProductNo=13279113795&ac=crtshp&cid=1017835745140128&ctid=1018193449229728&t=AWsCXUAAA523WgddoAAAAAMXfzJDSD9n8YajwOI"
      },
      {
        "label": "[잇퓨] 패스트 샴푸 — 모발 단백질 샴푸",
        "price": 24900,
        "note": "손상모·두피용 데일리 샴푸",
        "url": "https://brandconnect.naver.com/affiliates/1018193119022795?channelProductNo=5956679379&ac=crtshp&cid=1017835745140128&ctid=1018193449229728&t=AWsCXUAAA523WgddoAAAAAFjC7bTC_q8djMZvGI"
      },
      {
        "label": "대용량 스텐 빨대 텀블러 (보온·보냉 · 손잡이형)",
        "price": 10900,
        "note": "사무실 책상용 · 1개",
        "url": "https://brandconnect.naver.com/affiliates/1018193119022792?channelProductNo=13336447099&ac=crtshp&cid=1017835745140128&ctid=1018193449229728&t=AWsCXUAAA523WgddoAAAAAMa6gh78Zc23BsEqjg"
      }
    ]
  }
};
