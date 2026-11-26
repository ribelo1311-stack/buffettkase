/* 버핏카세 /hotdeal 데이터 (2026-11-26 20:20 KST 실사 · 12차 업데이트 — 쿠팡 12건)
   ※ 2026-11-26 20:10 회차: 신규 4건 편입 — 깨끗한나라 순수 시그니처 3겹 화장지 27m·30롤(16,900원·39%, 20:05 단축링크 재사용),
      오뚜기옛날 사골곰탕 500g·10개(11,680원·46%), 액츠 퍼펙트 실내건조 3.2L(10,900원·39%), 일리윤 세라마이드 비건 핸드크림 50ml(6,060원·53%).
      오래됐거나 할인폭이 떨어진 9건(방한 장갑·브리타 필터·감귤 5kg·발받침대·하리보·한경희 가습기·오설록 티·쌀찐빵·코멧 화장지)을 정리해 쿠팡 12건 유지.
      지난 회차 배송일(내일(수) 11/25)이 박혀 있던 2건은 날짜 없는 문구로 정정. 토스 대표배너(dealsUrl·bannerLabel·jumpLabel)와 네이버 섹션은 그대로 보존.
   구조 확장 규칙: items[] 각 항목은
   { platform: "coupang" | "toss" | "naver", title, price, affiliate_url, note, updated_at, ... }
   platform 값만 늘리면 토스쇼핑 셰어링크·네이버 쇼핑커넥트를 같은 카드로 붙일 수 있게 설계했다.
   ※ 가격·재고는 확인 시점 기준. 링크는 쿠팡파트너스에서 직접 발급받은 단축링크(lptag=AF2387959)만 사용.
   ※ naverShop = 네이버 크리에이터샵(buffettlife) 고마진 섹션. 쿠팡파트너스 영역과 섞지 않도록 분리해 렌더한다.
   ※ tossShop/tossDeals = 토스쇼핑 쉐어링크 하루특가 섹션. 쿠팡·네이버와 대가성 고지가 다르므로 반드시 별도 섹션으로 렌더한다.
     링크는 sharelink.toss.im '링크 발급'으로 직접 발급한 공개용 쉐어링크(toss.shopping/_m/…)만 쓴다.
     단, 특가지면(SHOPPING_DEALS) 전체 링크는 쉐어링크 Open API `POST /openapi/links`로만 발급되므로
     상단 토스 배너(tossShop.dealsUrl)만 API 발급 링크를 쓴다 — API 키는 공개 저장소에 올리지 않는다.
   ※ 본문은 JSON 호환 형식(키·문자열 큰따옴표) — projects/build_hotdeal.py 가 그대로 파싱해 hotdeal.html 을 만든다. */
window.HOTDEAL = {
  "asOf": "2026-11-26 20:20 KST",
  "coupangTag": "AF2387959",
  "disclosure": "이 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.",
  "priceNotice": "표시된 가격 및 할인율은 확인 시점 기준이며, 쿠팡 실시간 판매가·재고에 따라 변동되거나 품절될 수 있습니다. '아낌 금액'은 쿠팡 상세페이지에 함께 표기된 정가(기준가)에서 현재 판매가를 뺀 값이고, 정가 표기가 없는 상품은 정가 대신 확인된 포인트만 적었습니다. '다음 날 도착 보장'은 확인 시점 기준 다음 영업일이며, 실제 도착일은 주문 시점의 결제 화면 안내를 따릅니다. 와우 가입 쿠폰가는 회원 조건이라 대표가로 쓰지 않았습니다.",
  "tossNotice": "토스쇼핑 하루특가·BEST 특가는 위쪽 토스 섹션에 모았습니다. 토스 링크는 토스쇼핑 쉐어링크에서 직접 발급한 공개용 링크이고, 수수료 고지는 그 섹션 안에 따로 적었습니다. 네이버 크리에이터샵 상품은 맨 아래 별도 섹션(쿠팡파트너스와 무관)에 모았습니다.",
  "items": [
    {
      "platform": "coupang",
      "cat": "생활",
      "title": "깨끗한나라 순수 시그니처 천연펄프 3겹 롤화장지 27m 30롤",
      "option": "27m · 30개입 · 1개 · 3겹 천연펄프",
      "price": 16900,
      "origin": 27900,
      "discount": 39,
      "unit": "10m당 209원",
      "reviews": "18만 7,073건 · 최고 81% · 좋음 13%",
      "badges": [
        "한 달 4만명 이상 구매",
        "10만명 이상 만족",
        "로켓배송"
      ],
      "delivery": "로켓배송 · 내일(금) 11/27 도착(오늘 자정 전 주문 시)",
      "shipping": "판매자 쿠팡(주) · 로켓배송 19,800원 이상 무료 — 단품 16,900원만 담으면 배송비가 붙습니다(장보기·다른 로켓상품과 묶으면 면제, 도서산간 추가비용 없음). 화면의 와우 가입 쿠폰가(12,870원)는 가입 조건이라 대표가로 쓰지 않았습니다.",
      "note": "겨울에 화장지 떨어지면 난리라 30롤씩 쟁여둔다 카더라. 27m×30롤이면 총 810m, 10m당 209원입니다. 상품평 18만 7천 건에 한 달 4만 명이 넘게 사 갔고, 후기에서 촉감 '정말 부드러워요' 66%·두께 '보통' 58%였습니다. 다만 매당 단가로는 코멧 순백 3겹(30m·30롤 2개 21,990원, 10m당 122원)·탐사 화이트밀크(30m·30롤 12,990원, 144원)가 더 싸서 '최저가'는 아닙니다.",
      "image": "/assets/hotdeal/toiletroll-kkeutnara.webp",
      "image_alt": "깨끗한나라 순수 시그니처 천연펄프 3겹 롤화장지 27m 30롤 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iZBEwIEqjI",
      "product_url": "https://www.coupang.com/vp/products/6570687310?itemId=17553901185&vendorItemId=76365551329",
      "updated_at": "2026-11-26 20:17 KST"
    },
    {
      "platform": "coupang",
      "cat": "식품",
      "title": "오뚜기옛날 사골곰탕 500g 10개",
      "option": "500g × 10개 · 1세트 · 실온보관",
      "price": 11680,
      "origin": 21800,
      "discount": 46,
      "unit": "100g당 234원",
      "reviews": "6만 2,615건 · 최고 83% · 좋음 12%",
      "badges": [
        "5만명 이상 만족",
        "한 달 3,000명 이상 구매",
        "로켓배송"
      ],
      "delivery": "로켓배송 · 내일(금) 11/27 도착(오늘 자정 전 주문 시)",
      "shipping": "판매자 쿠팡 · 로켓배송 19,800원 이상 무료 — 단품 11,680원은 배송비가 붙습니다(도서산간 추가비용 없음). 화면의 와우 가입 쿠폰할인가(0원·100%)는 가입 조건이라 대표가로 쓰지 않았습니다.",
      "note": "찬 바람 불 때 국물 한 그릇 값이라 카더라. 500g 10개 11,680원이면 100g당 234원이고, 상품평 6만 2,615건(최고 83%)에 맛 만족도 '맛있어요' 73%, 소비기한은 2027-01-04 이후입니다. 다만 비비고 사골곰탕 500g 10개 10,500원(100g당 210원)·양반 진국 사골곰탕 500g 20개 16,500원(165원)·오뚜기옛날 1kg 2개 4,120원(206원)이 100g당 더 싸서 '최저가'는 아닙니다.",
      "image": "/assets/hotdeal/gomtang-ottogi.webp",
      "image_alt": "오뚜기옛날 사골곰탕 500g 10개 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iZCxk5PoC4",
      "product_url": "https://www.coupang.com/vp/products/8107064523?itemId=228757418",
      "updated_at": "2026-11-26 20:17 KST"
    },
    {
      "platform": "coupang",
      "cat": "생활",
      "title": "액츠 퍼펙트 실내건조 액상세제 3.2L",
      "option": "3.2L · 1개 · 프레시 플로럴향 · 일반용",
      "price": 10900,
      "origin": 17900,
      "discount": 39,
      "unit": "100ml당 341원",
      "reviews": "11만 9,250건 · 최고 85% · 좋음 11%",
      "badges": [
        "한 달 4만명 이상 구매",
        "10만명 이상 만족",
        "로켓배송"
      ],
      "delivery": "로켓배송 · 내일(금) 11/27 도착(오늘 자정 전 주문 시)",
      "shipping": "판매자 쿠팡(주) · 로켓배송 19,800원 이상 무료 — 단품 10,900원은 배송비가 붙습니다(묶음배송 가능, 도서산간 추가비용 없음). 와우 가입 쿠폰할인가는 가입 조건이라 대표가로 쓰지 않았습니다.",
      "note": "실내건조용이라 겨울에 방 안에서 말려도 냄새가 덜하다 카더라. 3.2L 10,900원이면 100ml당 341원이고, 상품평 11만 9,250건에 한 달 4만 명 이상 구매입니다. 용량 단가로는 퍼플리 2.5L×4 7,620원(100ml당 76원)·탐사 파워워시 2.5L×4 10,990원(110원)이 훨씬 싸서 '최저가'는 아닙니다(농축도·브랜드 차이).",
      "image": "/assets/hotdeal/detergent-aekcheu.webp",
      "image_alt": "액츠 퍼펙트 실내건조 액상세제 3.2L 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iZCyPyWWwm",
      "product_url": "https://www.coupang.com/vp/products/9711973763?itemId=23804197823&vendorItemId=85574305199",
      "updated_at": "2026-11-26 20:17 KST"
    },
    {
      "platform": "coupang",
      "cat": "생활",
      "title": "일리윤 세라마이드 비건 핸드크림 무향 50ml",
      "option": "50ml · 1개 · 무향 · 세라마이드",
      "price": 6060,
      "origin": 12900,
      "discount": 53,
      "unit": "10ml당 1,212원",
      "reviews": "2,907건 · 최고 87% · 2,000명 이상 만족",
      "badges": [
        "한 달 5,000명 이상 구매",
        "로켓배송"
      ],
      "delivery": "로켓배송 · 내일(금) 11/27 도착(오늘 자정 전 주문 시)",
      "shipping": "판매자 쿠팡(주) · 로켓배송 19,800원 이상 무료 — 단품 6,060원은 배송비가 붙습니다. 사용기한 2028-04-05 이후 표기분입니다. 와우 가입 쿠폰할인가는 가입 조건이라 대표가로 쓰지 않았습니다.",
      "note": "손 트는 계절에 무향 핸드크림이 반값이라 카더라. 50ml 6,060원이면 10ml당 1,212원이고, 상품평 2,907건(최고 87%)에 향 만족도 '아주 만족' 86%·보습력 '아주 만족' 73%, 한 달 5,000명 이상 구매입니다. 단품만 담으면 배송비가 붙으니 다른 로켓상품과 같이 담으세요.",
      "image": "/assets/hotdeal/handcream-illiyoon.webp",
      "image_alt": "일리윤 세라마이드 비건 핸드크림 무향 50ml 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iZCzTTxSkT",
      "product_url": "https://www.coupang.com/vp/products/8254940545?itemId=24616923410",
      "updated_at": "2026-11-26 20:17 KST"
    },
    {
      "platform": "coupang",
      "cat": "IT",
      "title": "홈플래닛 LED 모니터 조명 터치식 스크린바",
      "option": "블랙 · 터치식 · 유선(동봉 케이블) · 모니터 두께 45mm 이하",
      "price": 16730,
      "origin": 28500,
      "discount": 41,
      "unit": "1개 · 블랙",
      "reviews": "760건 · 최고 85% · 700명 이상 만족",
      "badges": [
        "한 달 900명 이상 구매",
        "내일 도착 보장",
        "로켓배송"
      ],
      "delivery": "로켓배송 · 다음 날 도착 보장(주문 마감 전)",
      "shipping": "로켓배송 19,800원 이상 무료 — 단품 16,730원은 배송비가 붙습니다(와우 회원 제외). 판매자 쿠팡(주). 충전식이 아니라 동봉 케이블을 꽂아 쓰는 유선형이고, 모니터 두께 45mm 이하·후면이 평평한 모델에 거치됩니다.",
      "note": "모니터 위에 얹으면 책상만 밝혀주는 스크린바라 카더라. 상품평 760건(최고 85%)에 한 달 900명 이상 구매, 16,730원이면 정가 대비 41%입니다. 다만 상위 후기에 '고정이 약하다'·'수평이 안 맞는다'는 평이 있어 모니터 두께와 후면 형태를 먼저 확인하세요.",
      "image": "/assets/hotdeal/monitor-lightbar.webp",
      "image_alt": "홈플래닛 LED 모니터 조명 터치식 스크린바 블랙 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iVHflhZEnQ",
      "product_url": "https://www.coupang.com/vp/products/8561386520?itemId=24793590989&vendorItemId=91801392937",
      "updated_at": "2026-11-24 12:08 KST"
    },
    {
      "platform": "coupang",
      "cat": "IT",
      "title": "코딩 대용량 무드등 초음파 가습기 4.5L",
      "option": "4.5L · 올리브그린 · 2중 분무·상부급수 · kd001",
      "price": 13380,
      "origin": 24800,
      "discount": 46,
      "unit": "4.5L · 3W",
      "reviews": "332건 · 최고 83%",
      "badges": [
        "200명 이상 만족",
        "로켓배송",
        "무료배송(19,800원 이상)"
      ],
      "delivery": "로켓배송 · 다음 날 도착 보장(주문 마감 전)",
      "shipping": "로켓배송 19,800원 이상 무료 — 단품 13,380원은 배송비가 붙습니다. 모델명 kd001·KC 인증 R-R-8CD-kd07001, 판매자 주식회사 코딩. 같은 화면의 와우 가입 쿠폰가는 가입 조건이라 대표가로 쓰지 않았습니다.",
      "note": "4.5L 가습기가 1만 3천원대라 카더라. 후기 요약이 세척 편리성 91%·소음 85%·가습 용량 90%로 좋은 편이고 200명 이상 만족 표시가 붙었습니다. 다만 상부급수 초음파식이라 필터를 물에 적셔 관리해야 하고(문의 게시판에 분사가 안 된다는 질문과 판매자의 '필터를 물에 2분 담그라' 답변이 있습니다), 단품 구매 시 배송비가 붙습니다.",
      "image": "/assets/hotdeal/humidifier-4.5l.webp",
      "image_alt": "코딩 대용량 무드등 초음파 가습기 4.5L 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iVBnWRrj1E",
      "product_url": "https://www.coupang.com/vp/products/9037515464",
      "updated_at": "2026-11-24 10:12 KST"
    },
    {
      "platform": "coupang",
      "cat": "생활",
      "title": "코멧 오리지널 유아용 아기물티슈 캡형",
      "option": "50g · 100매 · 10개",
      "price": 10890,
      "origin": 18000,
      "discount": 39,
      "unit": "1매당 11원",
      "reviews": "49만 2,567건 · 최고 85%",
      "badges": [
        "한 달 10만명 이상 구매",
        "로켓배송"
      ],
      "delivery": "로켓배송 · 다음 날 도착 보장(주문 마감 전)",
      "shipping": "로켓배송 19,800원 이상 무료 — 단품 10,890원만 담으면 배송비가 붙습니다.",
      "note": "아기 있는 집은 이거 10팩 쌓아두고 겨울 난다 카더라. 1매당 11원이면 물티슈값 걱정은 접는 셈.",
      "image": "/assets/hotdeal/wetissue.webp",
      "image_alt": "코멧 오리지널 유아용 아기물티슈 캡형 10팩 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iR9DRSjjem",
      "product_url": "https://www.coupang.com/vp/products/188227098",
      "updated_at": "2026-11-23 19:41 KST"
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
      "reviews": "9,849건 · 최고 86% · 좋음 8%",
      "badges": [
        "한 달 1,000명 이상 구매",
        "로켓배송",
        "KC 인증"
      ],
      "delivery": "로켓배송 · 다음 날 도착 보장(주문 마감 전)",
      "shipping": "로켓배송 19,800원 이상 무료 — 1,000원 차이로 기준 미달입니다.",
      "note": "2만 밀리암페어를 2만 원 아래로 사는 건 흔한 일이 아니다 카더라. 잔량이 숫자로 보이는 것도 은근 편하고.",
      "image": "/assets/hotdeal/powerbank.webp",
      "image_alt": "KLIFE 고속충전 대용량 보조배터리 20000mAh 블랙 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iPtqGEgPvw",
      "product_url": "https://www.coupang.com/vp/products/7295770123",
      "updated_at": "2026-11-23 19:42 KST"
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
      "delivery": "로켓배송 · 다음 날 도착 보장(주문 마감 전)",
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
      "cat": "겨울",
      "title": "Mosashoe 발열조끼 20구역",
      "option": "S~XXXL · 블랙 · USB/DC 겸용 3단 온도조절",
      "price": 29520,
      "origin": 100000,
      "discount": 70,
      "unit": "무료배송 · 무료반품",
      "reviews": "757건 · 최고 80% · 600명 이상 만족",
      "badges": [
        "내일 도착 보장",
        "무료배송",
        "KCs 자율안전확인 PFg-20223"
      ],
      "delivery": "다음 날 도착 보장(주문 마감 전)",
      "shipping": "판매자 장부코퍼레이션 유한회사 · 순차배송 1~2일 · 무료배송. 와우 가입 쿠폰할인가 10,520원(89%)은 가입 조건이라 대표가로 쓰지 않았습니다.",
      "note": "보조배터리만 꽂으면 등판 20구역이 따뜻해진다 카더라. 보조배터리는 별매라 같이 담아야 하고, 후기 757건에 사이즈는 정사이즈라는 응답이 77%입니다.",
      "image": "/assets/hotdeal/vest-heating.webp",
      "image_alt": "Mosashoe 발열조끼 20구역 열선조끼 블랙 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iTWGrHcE8G",
      "product_url": "https://www.coupang.com/vp/products/8442643565",
      "updated_at": "2026-11-23 19:44 KST"
    },
    {
      "platform": "coupang",
      "cat": "생활",
      "title": "에스트라 아토베리어 365 하이드로 수딩크림",
      "option": "80ml · 1개 · 수부지·복합성용",
      "price": 20460,
      "origin": 33000,
      "discount": 38,
      "unit": "10ml당 2,558원",
      "reviews": "1,486건 · 최고 86% · 1,000명 이상 만족",
      "badges": [
        "한 달 1만명 이상 구매",
        "내일 도착 보장",
        "무료배송"
      ],
      "delivery": "다음 날 도착 보장(오후 9시 전 주문 시 새벽 7시 전)",
      "shipping": "판매자 쿠팡(주) · 20,460원이라 로켓 무료배송 기준(19,800원)을 넘겨 무료배송. 와우 카드 즉시할인 18,410원은 와우 전용이라 대표가로 쓰지 않았습니다.",
      "note": "유분 많은 피부용으로 나온 산뜻한 장벽 크림이라 카더라. 후기 1,486건 중 피부 자극 '없어요'가 97%, 유통기한은 2028-04-12 이후입니다.",
      "image": "/assets/hotdeal/aestura-cream.webp",
      "image_alt": "에스트라 아토베리어 365 하이드로 수딩크림 80ml 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iTWykgKGku",
      "product_url": "https://www.coupang.com/vp/products/9648097024",
      "updated_at": "2026-11-23 17:34 KST"
    },
    {
      "platform": "coupang",
      "cat": "반려동물",
      "title": "탐사 실속형 배변패드 50×40cm",
      "option": "100매입 × 4팩 · 총 400매",
      "price": 23200,
      "origin": 38690,
      "discount": 40,
      "unit": "1매당 58원",
      "reviews": "18만 6,849건 · 최고 86%",
      "badges": [
        "한 달 9,000명 이상 구매",
        "로켓배송",
        "내일 도착 보장"
      ],
      "delivery": "로켓배송 · 다음 날 도착 보장(주문 마감 전)",
      "shipping": "로켓배송 19,800원 이상 무료 — 23,200원 단독 주문도 무료배송입니다. 결제 화면에 와우 쿠폰할인가 4,200원(89%)이 함께 떠 있었지만 회원·쿠폰 조건이라 기본가는 일반판매가입니다.",
      "note": "400매면 하루 두 장 써도 두 달이다 카더라. 1매당 58원이면 배변패드값으로 고민할 일은 없음.",
      "image": "/assets/hotdeal/pad-tamsa.webp",
      "image_alt": "탐사 실속형 배변패드 50x40cm 100매 4팩 상품 이미지",
      "affiliate_url": "https://link.coupang.com/a/iSNgB3IREq",
      "product_url": "https://www.coupang.com/vp/products/7299719601",
      "updated_at": "2026-11-22 17:40 KST"
    }
  ],
  "naverShop": {
    "label": "네이버 쇼핑커넥트 · 크리에이터샵",
    "title": "월억버핏 네이버 크리에이터샵 추천 · 고마진",
    "disclosure": "이 섹션은 네이버 쇼핑 커넥트 활동의 일환으로, 구매가 발생하면 일정액의 수수료를 제공받습니다. 위 쿠팡파트너스 상품과는 다른 스토어이며, 가격은 네이버 크리에이터샵 표시가입니다.",
    "note": "쿠팡 핫딜과 별개로, 월억버핏이 직접 골라 크리에이터샵에 올린 고마진 상품입니다. 할인율이 아니라 스토어 표시가 그대로 적었습니다. 카테고리 필터는 이 5건을 모두 '생활·위생'으로 묶습니다.",
    "url": "https://cshop.naver.com/buffettlife",
    "shopLabel": "🛍️ 크리에이터샵 전체 보기 (buffettlife)",
    "checkedAt": "2026-11-22 12:15 KST",
    "items": [
      {
        "label": "슬립라인 경추베개 — 목디스크·거북목 기능성 베개",
        "cat": "생활",
        "price": 69000,
        "note": "트레이딩 데스크에서 목이 굳는 사람용",
        "url": "https://brandconnect.naver.com/affiliates/1018193119022803?channelProductNo=5059571514&ac=crtshp&cid=1017835745140128&ctid=1018193449229728&t=AWsCXUAAA523WgddoAAAAAEtku86DB_L72OGN_g"
      },
      {
        "label": "판테놀 5% PDRN 리쥬잇 장벽 크림 50ml",
        "cat": "생활",
        "price": 19900,
        "note": "겨울 장벽 크림 · 50ml 1개",
        "url": "https://brandconnect.naver.com/affiliates/1018193119022797?channelProductNo=13814131092&ac=crtshp&cid=1017835745140128&ctid=1018193449229728&t=AWsCXUAAA523WgddoAAAAAM3YumUX3mcMDUynYc"
      },
      {
        "label": "[잇퓨] 요철제로 3종 세트 (율무 크림 + 앰플 + 토너 패드)",
        "cat": "생활",
        "price": 65700,
        "note": "세트 구성 그대로",
        "url": "https://brandconnect.naver.com/affiliates/1018193119022796?channelProductNo=13279113795&ac=crtshp&cid=1017835745140128&ctid=1018193449229728&t=AWsCXUAAA523WgddoAAAAAMXfzJDSD9n8YajwOI"
      },
      {
        "label": "[잇퓨] 패스트 샴푸 — 모발 단백질 샴푸",
        "cat": "생활",
        "price": 24900,
        "note": "손상모·두피용 데일리 샴푸",
        "url": "https://brandconnect.naver.com/affiliates/1018193119022795?channelProductNo=5956679379&ac=crtshp&cid=1017835745140128&ctid=1018193449229728&t=AWsCXUAAA523WgddoAAAAAFjC7bTC_q8djMZvGI"
      },
      {
        "label": "대용량 스텐 빨대 텀블러 (보온·보냉 · 손잡이형)",
        "cat": "생활",
        "price": 10900,
        "note": "사무실 책상용 · 1개",
        "url": "https://brandconnect.naver.com/affiliates/1018193119022792?channelProductNo=13336447099&ac=crtshp&cid=1017835745140128&ctid=1018193449229728&t=AWsCXUAAA523WgddoAAAAAMa6gh78Zc23BsEqjg"
      }
    ]
  },
  "tossShop": {
    "label": "토스쇼핑 쉐어링크 · 매일 0시 선착순특가",
    "title": "토스 선착순특가 · 하루특가 8건 (11/23 확인분)",
    "disclosure": "광고 · 이 섹션은 토스쇼핑 쉐어링크 활동의 일환으로, 링크를 통한 구매 시 일정액의 수수료를 제공받습니다.",
    "note": "토스쇼핑 쉐어링크 '링크 발급'으로 발급한 공개용 상품 링크이고, 가격은 11/23 07:10에 상품 상세에서 직접 확인한 값(8건 모두 무료배송·품절 없음)입니다. 토스 하루특가는 매일 24:00에 끝나고 0시에 새 값으로 바뀌는데, 2026-11-24 12:10 확인 시점에 토스쇼핑 특가의 개별 가격은 토스 앱에서만 보여 웹에서 재확인할 수 없었습니다 — 아래 8건은 이미 기간이 끝났거나 가격이 바뀌었을 수 있으니 결제 전 위쪽 파란 배너(오늘의 선착순·하루특가 전체 지면)에서 오늘 가격을 꼭 확인하세요.",
    "checkedAt": "2026-11-23 07:10 KST (2026-11-24 재확인 불가 — 토스 앱 전용)",
    "leadLabel": "오늘 선착순특가 대표 상품 바로 보기 — 제주 서귀포 노지 조생 감귤 10kg 10,560원(78%)",
    "bannerUrl": "https://toss.shopping/_m/vsu59ely",
    "dealsUrl": "https://toss.shopping/_m/BNgoJEhv",
    "dealsOriginUrl": "https://toss.shopping/s/deals?k=b31985fa-a386-4a8f-9feb-9dfa8b68dba7&referrer=affiliate",
    "bannerLabel": "토스쇼핑 특가지면 전체 열기 — 오늘의 선착순·하루특가",
    "bannerTitle": "오늘 0시 선착순특가",
    "bannerSub": "매일 0시 새로 열립니다 — 오늘 특가는 배너에서 확인",
    "bannerCta": "선착순특가 바로 가기",
    "jumpLabel": "토스 8건 모아보기",
    "tabs": "토스 선착순특가"
  },
  "tossDeals": [
    {
      "platform": "toss",
      "cat": "식품",
      "title": "제주 서귀포 노지 조생 감귤 중대과 10kg",
      "option": "중대과 · 10kg · 1박스",
      "price": 10560,
      "origin": 50000,
      "discount": 78,
      "unit": "100g당 106원",
      "reviews": "4.1 · 367건",
      "limited": true,
      "badges": [
        "오늘 0시 선착순특가",
        "78% 특가",
        "판매자 콘술",
        "무료배송"
      ],
      "delivery": "무료배송 · 11/27(금) 도착 예정",
      "shipping": "무료배송(11/23 07:10 확인). 산지 직송이라 도착일은 결제 화면 안내를 따르세요.",
      "note": "10kg 한 상자에 10,560원이면 100g당 106원 카더라. 두 사람이 두어 달 먹는 양, 리뷰 367건은 적지만 평점 4.1.",
      "image": "/assets/hotdeal/toss-tangerine.webp",
      "image_alt": "제주 서귀포 노지 조생 감귤 10kg 상자 이미지",
      "affiliate_url": "https://toss.shopping/_m/vsu59ely",
      "updated_at": "2026-11-23 07:10 KST"
    },
    {
      "platform": "toss",
      "cat": "식품",
      "title": "파파네정육점 통삼겹살 수육용 1kg 2개",
      "option": "수육용 · 1kg · 2개",
      "price": 15900,
      "origin": 35600,
      "discount": 55,
      "unit": "100g당 795원",
      "reviews": "4.3 · 8,365건",
      "limited": true,
      "badges": [
        "오늘 0시 선착순특가",
        "베스트 판매자",
        "무료배송",
        "내일도착 · 늦으면 보상"
      ],
      "delivery": "도착 보장 · 늦으면 보상 · 무료배송(11/23 확인값)",
      "shipping": "무료배송(11/23 07:10 확인). 냉장 배송이라 받는 날 시간을 비워두세요.",
      "note": "1kg 두 덩이에 15,900원, 100g당 795원 카더라. 수육용이라 삶아서 썰면 끝, 겨울에 제일 많이 나가는 부위.",
      "image": "/assets/hotdeal/toss-samgyeop.webp",
      "image_alt": "파파네정육점 통삼겹살 수육용 1kg 2개 상품 이미지",
      "affiliate_url": "https://toss.shopping/_m/lQFpSczl",
      "updated_at": "2026-11-23 07:10 KST"
    },
    {
      "platform": "toss",
      "cat": "생활",
      "title": "메르헨트 딥 모이스춰 바세린 바디로션 1L 2개",
      "option": "1L · 2개 · 1개당 4,995원",
      "price": 9990,
      "origin": 40000,
      "discount": 75,
      "unit": "1개당 4,995원",
      "reviews": "4.6 · 2,272건",
      "limited": true,
      "badges": [
        "오늘 0시 선착순특가",
        "지금 30일 내 최저가",
        "바디로션 1위",
        "무료배송"
      ],
      "delivery": "도착 보장 · 늦으면 보상 · 무료배송(11/23 확인값)",
      "shipping": "무료배송(11/23 07:10 확인).",
      "note": "1L 두 통에 9,990원이면 통당 4,995원 카더라. 겨울에 다리 긁는 집은 한 통 놓고 씁니다.",
      "image": "/assets/hotdeal/toss-lotion.webp",
      "image_alt": "메르헨트 바세린 바디로션 1L 2개 상품 이미지",
      "affiliate_url": "https://toss.shopping/_m/N75znYyq",
      "updated_at": "2026-11-23 07:10 KST"
    },
    {
      "platform": "toss",
      "cat": "식품",
      "title": "애슐리 주먹밥 20개 세트 (4가지 맛)",
      "option": "버터와규·치즈케이준치킨·치즈갈릭스테이크·김치콘치즈 각 5개",
      "price": 24610,
      "origin": 42800,
      "discount": 42,
      "unit": "1개당 1,231원",
      "reviews": "4.7 · 1,063건",
      "limited": true,
      "badges": [
        "오늘 0시 선착순특가",
        "베스트 판매자",
        "냉장·냉동 즉석밥 4위",
        "무료배송"
      ],
      "delivery": "도착 보장 · 늦으면 보상 · 무료배송(11/23 확인값)",
      "shipping": "무료배송(11/23 07:10 확인).",
      "note": "한 개 1,231원이면 편의점 김밥값보다 싸다 카더라. 20개면 냉동실 한 칸, 전자레인지 2분이면 한 끼.",
      "image": "/assets/hotdeal/toss-ashley.webp",
      "image_alt": "애슐리 주먹밥 20개 세트 상품 이미지",
      "affiliate_url": "https://toss.shopping/_m/BCyucKUw",
      "updated_at": "2026-11-23 07:10 KST"
    },
    {
      "platform": "toss",
      "cat": "식품",
      "title": "쥬르본 종합 모나카 550g 1박스",
      "option": "550g · 1박스 · 1개당 203원",
      "price": 7900,
      "origin": 18000,
      "discount": 56,
      "unit": "1개당 203원",
      "reviews": "4.5 · 1,801건",
      "limited": true,
      "badges": [
        "오늘 0시 선착순특가",
        "화과자 1위",
        "베스트 판매자",
        "무료배송"
      ],
      "delivery": "도착 보장 · 늦으면 보상 · 무료배송(11/23 확인값)",
      "shipping": "무료배송(11/23 07:10 확인).",
      "note": "한 개 203원 카더라. 아이 간식·사무실 탕비실에 두면 하루 만에 사라지는 종류.",
      "image": "/assets/hotdeal/toss-monaka.webp",
      "image_alt": "쥬르본 종합 모나카 550g 1박스 상품 이미지",
      "affiliate_url": "https://toss.shopping/_m/vGvoRfLb",
      "updated_at": "2026-11-23 07:10 KST"
    },
    {
      "platform": "toss",
      "cat": "생활",
      "title": "에브리워터 무라벨 500ml 40개",
      "option": "무라벨 · 500ml · 40개",
      "price": 6290,
      "origin": 19800,
      "discount": 68,
      "unit": "100ml당 32원",
      "reviews": "4.8 · 7만 4,379건",
      "limited": true,
      "badges": [
        "오늘 68% 특가",
        "지금 30일 내 최저가",
        "오늘 베스트 11위",
        "무료배송"
      ],
      "delivery": "무료배송 · 12/3(목) 도착 예정",
      "shipping": "무료배송(11/23 07:10 확인). 물은 무게로 배송비가 붙기 쉬운데 여기는 무료입니다.",
      "note": "500ml 40병에 6,290원이면 한 병 157원 카더라. 20L 무게를 직접 안 들고 오는 게 핵심.",
      "image": "/assets/hotdeal/toss-water500.webp",
      "image_alt": "에브리워터 무라벨 500ml 40개 상품 이미지",
      "affiliate_url": "https://toss.shopping/_m/1vtoelH6",
      "updated_at": "2026-11-23 07:10 KST"
    },
    {
      "platform": "toss",
      "cat": "식품",
      "title": "프로프룻 껍질째 먹는 세척사과 3kg",
      "option": "3kg · 1박스",
      "price": 10900,
      "origin": 44900,
      "discount": 75,
      "unit": "100g당 364원",
      "reviews": "4.3 · 6,515건",
      "limited": true,
      "badges": [
        "오늘 0시 선착순특가",
        "75% 특가",
        "판매자 프로프룻",
        "무료배송"
      ],
      "delivery": "무료배송 · 11/26(수) 도착 예정",
      "shipping": "무료배송(11/23 07:10 확인).",
      "note": "3kg에 10,900원이면 100g당 364원 카더라. 껍질째 먹는 세척사과라 씻어서 바로 먹으면 됩니다.",
      "image": "/assets/hotdeal/toss-apple.webp",
      "image_alt": "프로프룻 껍질째 먹는 세척사과 3kg 상품 이미지",
      "affiliate_url": "https://toss.shopping/_m/DNWCY4Ig",
      "updated_at": "2026-11-23 07:10 KST"
    },
    {
      "platform": "toss",
      "cat": "생활",
      "title": "한예지 페르니 도톰 순수 3겹 화장지 30m 30롤입 2개",
      "option": "3겹 · 30m · 30롤입 × 2개(총 60롤)",
      "price": 17490,
      "origin": 38000,
      "discount": 53,
      "unit": "1롤당 292원",
      "reviews": "4.6 · 1만 2,491건",
      "limited": true,
      "badges": [
        "오늘 0시 선착순특가",
        "지금 30일 내 최저가",
        "고급롤화장지 17위",
        "무료배송"
      ],
      "delivery": "도착 보장 · 늦으면 보상 · 무료배송(11/23 확인값)",
      "shipping": "무료배송(11/23 07:10 확인). 60롤은 부피가 커서 직접 들기 버겁습니다.",
      "note": "60롤에 17,490원이면 1롤 292원 카더라. 3겹 30m라 두 겹짜리보다 확실히 도톰.",
      "image": "/assets/hotdeal/toss-tissue.webp",
      "image_alt": "한예지 페르니 3겹 화장지 30롤입 2개 상품 이미지",
      "affiliate_url": "https://toss.shopping/_m/J0WOWJGv",
      "updated_at": "2026-11-23 07:10 KST"
    }
  ]
};
