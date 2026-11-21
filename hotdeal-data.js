/* 버핏카세 /hotdeal 데이터 (2026-11-22 08:45 KST 실사)
   구조 확장 규칙: items[] 각 항목은
   { platform: "coupang" | "toss" | "naver", title, price, affiliate_url, note, updated_at, ... }
   platform 값만 늘리면 토스쇼핑 셰어링크·네이버 쇼핑커넥트를 같은 카드로 붙일 수 있게 설계했다.
   ※ 가격·재고는 확인 시점 기준. 링크는 쿠팡파트너스에서 직접 발급받은 단축링크(lptag=AF2387959)만 사용.
   ※ 본문은 JSON 호환 형식(키·문자열 큰따옴표) — projects/build_hotdeal.py 가 그대로 파싱해 hotdeal.html 을 만든다. */
window.HOTDEAL = {
  "asOf": "2026-11-22 08:52 KST",
  "coupangTag": "AF2387959",
  "disclosure": "이 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.",
  "priceNotice": "표시된 가격 및 할인율은 확인 시점 기준이며, 쿠팡 실시간 판매가·재고에 따라 변동되거나 품절될 수 있습니다. '아낌 금액'은 쿠팡 상세페이지에 함께 표기된 정가(기준가)에서 현재 판매가를 뺀 값이고, 정가 표기가 없는 상품은 정가 대신 확인된 포인트만 적었습니다.",
  "tossNotice": "토스쇼핑 셰어링크 · 네이버 쇼핑커넥트 상품은 다음 업데이트부터 같은 카드 형식으로 추가됩니다.",
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
    }
  ]
};
