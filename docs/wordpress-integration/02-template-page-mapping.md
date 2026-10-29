# 20개 URL과 PHP 템플릿 연결 후보

작성일: 2026-10-29 (KST) · 상태: 사전 분석 / 구현·배포 미승인

**확인**은 로컬 코드 또는 기존 audit의 수집 사실, **후보/추정**은 구조 일치에 따른 해석, **미확인**은 운영 설정·DB·실행 검증이 필요한 항목이다. Holiday의 실제 활성 여부는 미확인이다. 서버·DB에 접속하거나 PHP를 실행하지 않았으며 새 백엔드·테마·UI를 구현하지 않았다.

## 증거의 강도

실제 연결은 20개 모두 **미확인**이다. audit DOM 클래스와 로컬 템플릿의 출력 구조를 대조해 후보를 좁혔을 뿐이다. 관리자 _wp_page_template·post_type·ID·실제 template_include·플러그인 템플릿 필터가 있어야 확정할 수 있다. URL이 /contact/라고 Contact 템플릿, /room/이라고 무조건 room_post라고 판단하지 않는다.

공통 R0: header/footer 및 functions.php L215~314의 등록 CSS/JS 묶음. main/style.css·Bootstrap·global.css/main_stylesheet.css·아이콘/폰트·jQuery·mainScript/roomsScript 등이다. 등록과 리소스 참조는 실행 성공/필요성을 증명하지 않는다. 실제 요청·플러그인·옵션 스타일은 별도 대조한다. [의존성](03-backend-dependencies.md) 참조.

## 전체 매핑표

| ID | 페이지 | 출처 URL 그대로 유지 | DOM 관찰 | PHP 후보 | 실제 배정 |
|---|---|---|---|---|---|
| P01 | 홈 | http://gomemo.net/ | content homePage hasWidgets | template-home.php | 미확인 |
| P02 | 회사소개 · 포트폴리오 | http://gomemo.net/about/ | content aboutUsPage bgImg | template-about_us.php | 미확인 |
| P03 | 기술소개 | http://gomemo.net/introduce/ | content aboutUsPage bgImg | template-about_us.php | 미확인 |
| P04 | 증명서 · 수상 | http://gomemo.net/improve_price/ | content aboutUsPage bgImg | template-about_us.php | 미확인 |
| P05 | 추모용 메탈포토 | http://gomemo.net/modern/ | content roomsPage bgImg | template-custom_rooms.php | 미확인 |
| P06 | 모던 | http://www.gomemo.net/room/modern2/ | content singleRoomPage headerImg | single-room_post.php → content-roomSmall.php | 미확인 |
| P07 | 스페셜 | http://www.gomemo.net/room/special1/ | content singleRoomPage headerImg | single-room_post.php → content-roomSmall.php | 미확인 |
| P08 | VIP폴 | http://www.gomemo.net/room/vip1/ | content singleRoomPage headerImg | single-room_post.php → content-roomSmall.php | 미확인 |
| P09 | 위패 · 스탠드 | http://gomemo.net/room/t-1/ | content singleRoomPage headerImg | single-room_post.php → content-roomSmall.php | 미확인 |
| P10 | 앵글 | http://gomemo.net/room/%ed%94%84%eb%a6%ac%eb%af%b8%ec%97%84-%ec%95%b5%ea%b8%80/ | content singleRoomPage headerImg | single-room_post.php → content-roomSmall.php | 미확인 |
| P11 | 자연장 · 수목장 | http://www.gomemo.net/room/nature/ | content singleRoomPage headerImg | single-room_post.php → content-roomSmall.php | 미확인 |
| P12 | 기록물 · 기념물 | http://gomemo.net/metalphoto/ | content roomsPage bgImg | template-custom_rooms.php | 미확인 |
| P13 | 상패 · 감사패 · 기념품 | http://www.gomemo.net/room/certification/ | content singleRoomPage headerImg | single-room_post.php → content-roomSmall.php | 미확인 |
| P14 | 정부조달 · 인테리어 | http://www.gomemo.net/room/government/ | content singleRoomPage headerImg | single-room_post.php → content-roomSmall.php | 미확인 |
| P15 | 전시 · 기념관 · 박물관 | http://www.gomemo.net/room/memorial-hall/ | content singleRoomPage headerImg | single-room_post.php → content-roomSmall.php | 미확인 |
| P16 | 신제품 · R&D | http://gomemo.net/%ec%8b%a0%ec%a0%9c%ed%92%88-%ec%97%b0%ea%b5%ac%ea%b0%9c%eb%b0%9c/ | content defaultPage bgImg | page.php | 미확인 |
| P17 | 테마파크 | http://gomemo.net/room/테마파크-theme-park/ | content singleRoomPage headerImg | single-room_post.php → content-roomSmall.php | 미확인 |
| P18 | 오시는길 | http://gomemo.net/contact/ | content aboutUsPage bgImg | template-about_us.php | 미확인 |
| P19 | 주문 방법 | http://www.gomemo.net/order_question/ | content defaultPage headerImg | page.php | 미확인 |
| P20 | 문의하기 | http://www.gomemo.net/room/qu/ | content singleRoomWidePage headerImg | single-room_post.php → content-roomBig.php | 미확인 |

## 후보별 주의

- H: homePage hasWidgets는 home 템플릿의 widget 분기와 일치한다. 실제 show_on_front/page_on_front 값은 미확인.
- A: aboutUsPage는 About Us 템플릿과 일치한다. P02/P03/P04/P18을 모두 회사 직원 페이지라고 해석하지 않는다. members가 비어도 본문은 출력된다.
- L: roomsPage이고 hasFilter가 기록되지 않아 Custom Rooms가 우선 후보다. template-rooms.php는 hasFilter roomsPage·content-filters를 출력하는 다른 후보이며, 커스텀/플러그인 변형도 배제하지 않는다.
- S/B: singleRoomPage와 singleRoomWidePage는 small/big 출력과 각각 일치한다. layout 저장값이나 post_type을 확인한 것은 아니다.
- G: defaultPage는 page.php와 일치하지만 이름 기반 page-{slug}.php 또는 템플릿 필터를 포함한 실제 우선순위는 미확인.
- P20은 CF7 마크업 정황이며 template-contact.php로 단정하면 안 된다. P19는 이메일 안내 본문으로 관찰됐으며 예약 처리와 동일시하지 않는다.

## 페이지별 9개 연결·보존 항목

<a id="p01"></a>

### P01 — 홈

- **URL:** http://gomemo.net/
- **1. 현재 템플릿:** 실제 미확인. 후보 template-home.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 01](../audit/01-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content homePage hasWidgets; 로컬 Holiday L12~15·L31·L37·L66~69. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** slider 반복과 content-homeSlider, inner_content_type=widgets이면 dynamic_sidebar('sidebar-home'); rooms이면 content-homeRooms.
- **4. DB/ACF:** 홈 지정 page ID·slider·inner_content_type·auto_play_*·위젯 배정. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + RoyalSlider/mainScript·위젯 Isotope. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 상단 배치·제품군 진입·글꼴·그리드 후보. 기획 [P01](../proposal/06-homepage-layout.md#p01)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 홈 지정·위젯 저장값·슬라이드 이미지/영상·JS 전역·편집 조건. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** 기존 홈의 슬라이드/위젯 문구를 로컬에서 각각 바꾸고 새 화면에 반영·복원 확인. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p02"></a>

### P02 — 회사소개 · 포트폴리오

- **URL:** http://gomemo.net/about/
- **1. 현재 템플릿:** 실제 미확인. 후보 template-about_us.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 02](../audit/02-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content aboutUsPage bgImg; 로컬 Holiday L13 aboutUsPage·L28·L34~36·L43~54. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** the_title/the_content + members가 있을 때 반복 출력.
- **4. DB/ACF:** page title/content·_wp_page_template·background_image_type·members/columns·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + 배경/Isotope 후보; 본문 플러그인은 별도 미확인. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 본문 외곽·자료 목차·이미지 설명 배치 후보. 기획 [P02](../proposal/07-company-pages-layout.md#p02)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필터된 본문·members/이미지 조건·배경 데이터·관리 템플릿 배정. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** 페이지 제목·본문·이미지와 members(실제 사용 시)를 각각 바꾸고 반영·복원 확인. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p03"></a>

### P03 — 기술소개

- **URL:** http://gomemo.net/introduce/
- **1. 현재 템플릿:** 실제 미확인. 후보 template-about_us.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 03](../audit/03-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content aboutUsPage bgImg; 로컬 Holiday L13 aboutUsPage·L28·L34~36·L43~54. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** the_title/the_content + members가 있을 때 반복 출력.
- **4. DB/ACF:** page title/content·_wp_page_template·background_image_type·members/columns·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + 배경/Isotope 후보; 본문 플러그인은 별도 미확인. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 본문 외곽·자료 목차·이미지 설명 배치 후보. 기획 [P03](../proposal/07-company-pages-layout.md#p03)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필터된 본문·members/이미지 조건·배경 데이터·관리 템플릿 배정. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** 페이지 제목·본문·이미지와 members(실제 사용 시)를 각각 바꾸고 반영·복원 확인. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p04"></a>

### P04 — 증명서 · 수상

- **URL:** http://gomemo.net/improve_price/
- **1. 현재 템플릿:** 실제 미확인. 후보 template-about_us.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 04](../audit/04-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content aboutUsPage bgImg; 로컬 Holiday L13 aboutUsPage·L28·L34~36·L43~54. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** the_title/the_content + members가 있을 때 반복 출력.
- **4. DB/ACF:** page title/content·_wp_page_template·background_image_type·members/columns·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + 배경/Isotope 후보; 본문 플러그인은 별도 미확인. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 본문 외곽·자료 목차·이미지 설명 배치 후보. 기획 [P04](../proposal/07-company-pages-layout.md#p04)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필터된 본문·members/이미지 조건·배경 데이터·관리 템플릿 배정. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** 페이지 제목·본문·이미지와 members(실제 사용 시)를 각각 바꾸고 반영·복원 확인. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p05"></a>

### P05 — 추모용 메탈포토

- **URL:** http://gomemo.net/modern/
- **1. 현재 템플릿:** 실제 미확인. 후보 template-custom_rooms.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 05](../audit/05-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content roomsPage bgImg; 로컬 Holiday L147 roomsPage·L172~257 display/categories/custom·Loop. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** room_post WP_Query 또는 custom의 post 객체 foreach/setup_postdata, title/thumbnail/price_label.
- **4. DB/ACF:** 목록 page ID·display/categories/custom·room_categories·제품 post ID·menu_order/date·paged. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsScript·um_filter·um_lightbox·조건부 um_booking. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 카드·카테고리 선택 UI·여백 후보. 기획 [P05](../proposal/08-memorial-products-layout.md#p05)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 조회 범위·지정 항목/순서·페이지 변수·data-postID·확대/CTA·permalink. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** 제품 title/대표 이미지/price_label을 바꾸고 해당 목록의 항목·정렬·다음 페이지와 상세를 대조. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p06"></a>

### P06 — 모던

- **URL:** http://www.gomemo.net/room/modern2/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomSmall.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 06](../audit/06-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomPage headerImg; 로컬 Holiday single-room_post의 layout 분기, roomSmall L5·L21~30·L120~131. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF room_name/price_label/slider·the_content·attributes·redirect 조건.
- **4. DB/ACF:** room_post 후보 ID·layout·room_name·price_label·slider·attributes·redirect_to/shop_link·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsSlider/mainScript·확대/예약은 실제 연결 시. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 제품 정보 계층·사진·속성 표·CTA 외관 후보. 기획 [P06](../proposal/08-memorial-products-layout.md#p06)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필드 문맥·본문 필터·첨부·data-postID·um_book 조건·CTA 목적지. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** post title과 room_name을 따로 수정해 목록/상세 차이를 확인하고 본문·사진·attributes 변경도 검증. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p07"></a>

### P07 — 스페셜

- **URL:** http://www.gomemo.net/room/special1/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomSmall.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 07](../audit/07-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomPage headerImg; 로컬 Holiday single-room_post의 layout 분기, roomSmall L5·L21~30·L120~131. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF room_name/price_label/slider·the_content·attributes·redirect 조건.
- **4. DB/ACF:** room_post 후보 ID·layout·room_name·price_label·slider·attributes·redirect_to/shop_link·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsSlider/mainScript·확대/예약은 실제 연결 시. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 제품 정보 계층·사진·속성 표·CTA 외관 후보. 기획 [P07](../proposal/08-memorial-products-layout.md#p07)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필드 문맥·본문 필터·첨부·data-postID·um_book 조건·CTA 목적지. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** post title과 room_name을 따로 수정해 목록/상세 차이를 확인하고 본문·사진·attributes 변경도 검증. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p08"></a>

### P08 — VIP폴

- **URL:** http://www.gomemo.net/room/vip1/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomSmall.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 08](../audit/08-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomPage headerImg; 로컬 Holiday single-room_post의 layout 분기, roomSmall L5·L21~30·L120~131. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF room_name/price_label/slider·the_content·attributes·redirect 조건.
- **4. DB/ACF:** room_post 후보 ID·layout·room_name·price_label·slider·attributes·redirect_to/shop_link·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsSlider/mainScript·확대/예약은 실제 연결 시. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 제품 정보 계층·사진·속성 표·CTA 외관 후보. 기획 [P08](../proposal/08-memorial-products-layout.md#p08)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필드 문맥·본문 필터·첨부·data-postID·um_book 조건·CTA 목적지. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** post title과 room_name을 따로 수정해 목록/상세 차이를 확인하고 본문·사진·attributes 변경도 검증. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p09"></a>

### P09 — 위패 · 스탠드

- **URL:** http://gomemo.net/room/t-1/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomSmall.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 09](../audit/09-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomPage headerImg; 로컬 Holiday single-room_post의 layout 분기, roomSmall L5·L21~30·L120~131. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF room_name/price_label/slider·the_content·attributes·redirect 조건.
- **4. DB/ACF:** room_post 후보 ID·layout·room_name·price_label·slider·attributes·redirect_to/shop_link·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsSlider/mainScript·확대/예약은 실제 연결 시. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 제품 정보 계층·사진·속성 표·CTA 외관 후보. 기획 [P09](../proposal/08-memorial-products-layout.md#p09)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필드 문맥·본문 필터·첨부·data-postID·um_book 조건·CTA 목적지. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** post title과 room_name을 따로 수정해 목록/상세 차이를 확인하고 본문·사진·attributes 변경도 검증. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p10"></a>

### P10 — 앵글

- **URL:** http://gomemo.net/room/%ed%94%84%eb%a6%ac%eb%af%b8%ec%97%84-%ec%95%b5%ea%b8%80/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomSmall.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 10](../audit/10-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomPage headerImg; 로컬 Holiday single-room_post의 layout 분기, roomSmall L5·L21~30·L120~131. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF room_name/price_label/slider·the_content·attributes·redirect 조건.
- **4. DB/ACF:** room_post 후보 ID·layout·room_name·price_label·slider·attributes·redirect_to/shop_link·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsSlider/mainScript·확대/예약은 실제 연결 시. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 제품 정보 계층·사진·속성 표·CTA 외관 후보. 기획 [P10](../proposal/08-memorial-products-layout.md#p10)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필드 문맥·본문 필터·첨부·data-postID·um_book 조건·CTA 목적지. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** post title과 room_name을 따로 수정해 목록/상세 차이를 확인하고 본문·사진·attributes 변경도 검증. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p11"></a>

### P11 — 자연장 · 수목장

- **URL:** http://www.gomemo.net/room/nature/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomSmall.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 11](../audit/11-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomPage headerImg; 로컬 Holiday single-room_post의 layout 분기, roomSmall L5·L21~30·L120~131. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF room_name/price_label/slider·the_content·attributes·redirect 조건.
- **4. DB/ACF:** room_post 후보 ID·layout·room_name·price_label·slider·attributes·redirect_to/shop_link·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsSlider/mainScript·확대/예약은 실제 연결 시. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 제품 정보 계층·사진·속성 표·CTA 외관 후보. 기획 [P11](../proposal/08-memorial-products-layout.md#p11)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필드 문맥·본문 필터·첨부·data-postID·um_book 조건·CTA 목적지. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** post title과 room_name을 따로 수정해 목록/상세 차이를 확인하고 본문·사진·attributes 변경도 검증. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p12"></a>

### P12 — 기록물 · 기념물

- **URL:** http://gomemo.net/metalphoto/
- **1. 현재 템플릿:** 실제 미확인. 후보 template-custom_rooms.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 12](../audit/12-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content roomsPage bgImg; 로컬 Holiday L147 roomsPage·L172~257 display/categories/custom·Loop. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** room_post WP_Query 또는 custom의 post 객체 foreach/setup_postdata, title/thumbnail/price_label.
- **4. DB/ACF:** 목록 page ID·display/categories/custom·room_categories·제품 post ID·menu_order/date·paged. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsScript·um_filter·um_lightbox·조건부 um_booking. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 카드·카테고리 선택 UI·여백 후보. 기획 [P12](../proposal/09-records-projects-layout.md#p12)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 조회 범위·지정 항목/순서·페이지 변수·data-postID·확대/CTA·permalink. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** 제품 title/대표 이미지/price_label을 바꾸고 해당 목록의 항목·정렬·다음 페이지와 상세를 대조. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p13"></a>

### P13 — 상패 · 감사패 · 기념품

- **URL:** http://www.gomemo.net/room/certification/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomSmall.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 13](../audit/13-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomPage headerImg; 로컬 Holiday single-room_post의 layout 분기, roomSmall L5·L21~30·L120~131. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF room_name/price_label/slider·the_content·attributes·redirect 조건.
- **4. DB/ACF:** room_post 후보 ID·layout·room_name·price_label·slider·attributes·redirect_to/shop_link·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsSlider/mainScript·확대/예약은 실제 연결 시. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 제품 정보 계층·사진·속성 표·CTA 외관 후보. 기획 [P13](../proposal/09-records-projects-layout.md#p13)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필드 문맥·본문 필터·첨부·data-postID·um_book 조건·CTA 목적지. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** post title과 room_name을 따로 수정해 목록/상세 차이를 확인하고 본문·사진·attributes 변경도 검증. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p14"></a>

### P14 — 정부조달 · 인테리어

- **URL:** http://www.gomemo.net/room/government/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomSmall.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 14](../audit/14-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomPage headerImg; 로컬 Holiday single-room_post의 layout 분기, roomSmall L5·L21~30·L120~131. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF room_name/price_label/slider·the_content·attributes·redirect 조건.
- **4. DB/ACF:** room_post 후보 ID·layout·room_name·price_label·slider·attributes·redirect_to/shop_link·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsSlider/mainScript·확대/예약은 실제 연결 시. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 제품 정보 계층·사진·속성 표·CTA 외관 후보. 기획 [P14](../proposal/09-records-projects-layout.md#p14)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필드 문맥·본문 필터·첨부·data-postID·um_book 조건·CTA 목적지. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** post title과 room_name을 따로 수정해 목록/상세 차이를 확인하고 본문·사진·attributes 변경도 검증. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p15"></a>

### P15 — 전시 · 기념관 · 박물관

- **URL:** http://www.gomemo.net/room/memorial-hall/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomSmall.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 15](../audit/15-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomPage headerImg; 로컬 Holiday single-room_post의 layout 분기, roomSmall L5·L21~30·L120~131. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF room_name/price_label/slider·the_content·attributes·redirect 조건.
- **4. DB/ACF:** room_post 후보 ID·layout·room_name·price_label·slider·attributes·redirect_to/shop_link·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsSlider/mainScript·확대/예약은 실제 연결 시. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 제품 정보 계층·사진·속성 표·CTA 외관 후보. 기획 [P15](../proposal/09-records-projects-layout.md#p15)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필드 문맥·본문 필터·첨부·data-postID·um_book 조건·CTA 목적지. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** post title과 room_name을 따로 수정해 목록/상세 차이를 확인하고 본문·사진·attributes 변경도 검증. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p16"></a>

### P16 — 신제품 · R&D

- **URL:** http://gomemo.net/%ec%8b%a0%ec%a0%9c%ed%92%88-%ec%97%b0%ea%b5%ac%ea%b0%9c%eb%b0%9c/
- **1. 현재 템플릿:** 실제 미확인. 후보 page.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 16](../audit/16-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content defaultPage bgImg; 로컬 Holiday L9 defaultPage·L24·L30~32. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** the_title + get_the_content 존재 조건 → the_content.
- **4. DB/ACF:** page title/content·지정 템플릿/배경 메타·본문 이미지/링크·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0; 본문 플러그인·추가 JS는 미확인. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 일반 정보·주문 안내 섹션·본문 가독성 후보. 기획 [P16](../proposal/07-company-pages-layout.md#p16)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 본문/쇼트코드/이메일 안내·정책·첨부·permalink. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** 제목·본문·본문 이미지/링크를 로컬 편집 후 표시와 원문 보존·복원 확인. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p17"></a>

### P17 — 테마파크

- **URL:** http://gomemo.net/room/테마파크-theme-park/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomSmall.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 17](../audit/17-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomPage headerImg; 로컬 Holiday single-room_post의 layout 분기, roomSmall L5·L21~30·L120~131. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF room_name/price_label/slider·the_content·attributes·redirect 조건.
- **4. DB/ACF:** room_post 후보 ID·layout·room_name·price_label·slider·attributes·redirect_to/shop_link·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + roomsSlider/mainScript·확대/예약은 실제 연결 시. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 제품 정보 계층·사진·속성 표·CTA 외관 후보. 기획 [P17](../proposal/09-records-projects-layout.md#p17)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필드 문맥·본문 필터·첨부·data-postID·um_book 조건·CTA 목적지. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** post title과 room_name을 따로 수정해 목록/상세 차이를 확인하고 본문·사진·attributes 변경도 검증. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p18"></a>

### P18 — 오시는길

- **URL:** http://gomemo.net/contact/
- **1. 현재 템플릿:** 실제 미확인. 후보 template-about_us.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 18](../audit/18-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content aboutUsPage bgImg; 로컬 Holiday L13 aboutUsPage·L28·L34~36·L43~54. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** the_title/the_content + members가 있을 때 반복 출력.
- **4. DB/ACF:** page title/content·_wp_page_template·background_image_type·members/columns·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + 배경/Isotope 후보; 본문 플러그인은 별도 미확인. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 본문 외곽·자료 목차·이미지 설명 배치 후보. 기획 [P18](../proposal/07-company-pages-layout.md#p18)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 필터된 본문·members/이미지 조건·배경 데이터·관리 템플릿 배정. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** 페이지 제목·본문·이미지와 members(실제 사용 시)를 각각 바꾸고 반영·복원 확인. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p19"></a>

### P19 — 주문 방법

- **URL:** http://www.gomemo.net/order_question/
- **1. 현재 템플릿:** 실제 미확인. 후보 page.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 19](../audit/19-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content defaultPage headerImg; 로컬 Holiday L9 defaultPage·L24·L30~32. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** the_title + get_the_content 존재 조건 → the_content.
- **4. DB/ACF:** page title/content·지정 템플릿/배경 메타·본문 이미지/링크·첨부. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0; 본문 플러그인·추가 JS는 미확인. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 일반 정보·주문 안내 섹션·본문 가독성 후보. 기획 [P19](../proposal/10-order-inquiry-layout.md#p19)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** 본문/쇼트코드/이메일 안내·정책·첨부·permalink. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** 제목·본문·본문 이미지/링크를 로컬 편집 후 표시와 원문 보존·복원 확인. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

<a id="p20"></a>

### P20 — 문의하기

- **URL:** http://www.gomemo.net/room/qu/
- **1. 현재 템플릿:** 실제 미확인. 후보 single-room_post.php → content-roomBig.php; DOM 구조 일치에 따른 추정.
- **2. 코드·소스 근거:** [audit 20](../audit/20-page.md) 「개별 콘텐츠 — 소스 등장 순서」의 content singleRoomWidePage headerImg; 로컬 Holiday single-room_post layout=big; roomBig L2·L81~91·L115~125. [소스 목록](01-theme-architecture.md)에서 실제 파일로 연결.
- **3. 콘텐츠 출력:** ACF·the_content를 통해 플러그인 폼이 출력됐을 가능성.
- **4. DB/ACF:** room_post 후보 ID·layout/description_text·본문 shortcode·CF7 폼 ID/설정·플러그인. 운영 값/필드 활성 여부는 미확인.
- **5. CSS/JS:** R0 + CF7 리소스 정황; 실제 폼 JS/API/첨부 처리 미확인. 실제 플러그인·추가 CSS/JS·캐시·로딩 순서는 미확인.
- **6. 디자인 후보:** 문의 화면 외곽·제목·가독성·라벨/오류 표현 후보. 기획 [P20](../proposal/10-order-inquiry-layout.md#p20)의 승인 전 구조를 참고.
- **7. 유지할 기능 연결:** CF7 form/필드·숨김 입력·nonce·action·첨부·서버 결과·필터. 공통 wp_head/wp_footer·메뉴·기존 필터도 유지.
- **8. URL 보존:** 기존 post ID·post_type·post_name·상위 관계·고유주소/정적 홈 설정·rewrite를 유지하고 get_permalink/the_permalink 기반 링크와 기존 요청 URL을 대조. 위 주소의 host/scheme을 임의 정규화하거나 새 slug를 만들지 않음.
- **9. 관리자 반영 검증:** 로컬에서 제목/본문 shortcode와 기존 플러그인 폼 설정을 변경해 표시 확인; 시험 수신함으로 허가된 회귀 별도. 대상 ID와 편집 UI를 먼저 식별하고 격리된 로컬 복사본의 합성 테스트 값만 사용. 캐시 전후와 원복까지 기록. 이번에는 편집·실행하지 않음.

## 미확인 연결을 확정하는 데 필요한 자료

각 URL의 ID/post_type/post_name/post_parent, _wp_page_template, 실제 선택 PHP 경로, 쿼리/필터·메뉴·위젯·ACF 문맥을 기록한다. 리소스 URL·폼 action은 값이 아닌 구조 중심으로 비식별화한다. 운영 DB를 직접 수정하거나 퍼머링크를 저장해 확인하지 않는다.

