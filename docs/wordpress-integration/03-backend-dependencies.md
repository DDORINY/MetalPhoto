# 백엔드·콘텐츠·플러그인 의존성

작성일: 2026-10-29 (KST) · 상태: 사전 분석 / 구현·배포 미승인

**확인**은 로컬 코드 또는 기존 audit의 수집 사실, **후보/추정**은 구조 일치에 따른 해석, **미확인**은 운영 설정·DB·실행 검증이 필요한 항목이다. Holiday의 실제 활성 여부는 미확인이다. 서버·DB에 접속하거나 PHP를 실행하지 않았으며 새 백엔드·테마·UI를 구현하지 않았다.

## 보존 범위

기존 CMS·MySQL·페이지/게시물 ID·CPT·ACF·분류·첨부 ID·원문·폼 처리·관리 편집 경로를 보존한다. 새 DB 스키마·새 접수 API·예약/주문 기능·대체 저장소를 개발하지 않는다. 코드의 위치를 바꾸는 것도 의존성 재구성이므로 자동으로 범위에 포함하지 않는다.

## CPT·분류

[includes/post-types.php](../../themes/holiday/includes/post-types.php) L27~36은 room_post를 public/has_archive와 rewrite slug=room, with_front=TRUE로 등록한다. title/editor/thumbnail/page-attributes를 지원한다. L65~74는 service_post를 service로 등록한다. 실제 데이터/사용 URL 존재는 미확인이다.

room_categories와 옵션 custom_categories에서 만든 um_ 접두 분류를 등록한다(L41~58). 필드의 name을 바꾸거나 등록 주체를 제거하면 기존 데이터가 남아도 조회·관리·URL이 달라질 수 있다. 표준 category로 임의 치환하지 않는다.

## ACF 데이터 계약

| 문맥 | 실제 참조 필드/함수 | 보존해야 할 의미 | 근거 |
|---|---|---|---|
| 공통 옵션 | logo_type/logo_image/logo_text, custom_css/custom_js, footer_text_1/2, disable_footer | 옵션과 페이지별 값 구분·관리 UI·출력 | header/footer |
| 홈 | slider, auto_play_slider/video, inner_content_type | 위젯/제품 분기·슬라이드 순서·영상 데이터 | template-home L12~15, L66~69 |
| 홈 제품 | display_options, room_categories, filter | 전체/분류/지정 콘텐츠 선택 | content-homeRooms |
| 제품 목록 | display, categories, custom | 정렬·분류·선택 게시물과 페이지 ID 문맥 | template-custom_rooms |
| 상세 | layout, room_name, price_label, description_text, attributes_title, attributes, disable_attributes | 상세 레이아웃·제목·설명·부가 표 | roomBig/Small |
| CTA | redirect_to, redirect_title, shop_link | booking이면 이벤트, 아니면 지정 링크 | roomBig L86~91, roomSmall L25~30 |
| 이미지/배경 | slider, background_image_type, background_image, 대표 이미지 | 첨부 ID·이미지/영상 구분·원본/파생 크기 | homeSlider, branding, roomBig/Small |
| 회사 | members, columns 및 반복 구성 | 기존 편집과 데이터가 있을 때 출력 | template-about_us L47 이후 |
| 문의 후보 | contact_form, contact_form_7_shortcode, email_receiver, success_message/fail_message | 자체 폼/플러그인 분기와 결과 | template-contact |
| 예약 후보 | um_fields, terms, check_in/out, calculate_price, disable_dates 등 | 동적 입력·날짜·계산·저장·메일 | content-booking, ajax-booking |

필드 정의는 [includes/custom-fields.php](../../themes/holiday/includes/custom-fields.php)의 register_field_group와 location 규칙에서 발견했다. Rooms는 post_type=room_post 조건이다. 로컬 내장 ACF 헤더는 4.3.8이지만 운영 버전은 미확인이다. DB 저장 필드명·대응 field key·반복 필드 인덱스·이미지 반환 형식·location 조건을 보존하고 값은 문서에 기록하지 않는다. 최신 ACF를 별도로 설치·동시 로딩하지 않는다.

중요: 목록의 the_title과 상세의 the_field('room_name')는 다른 출력이다. 관리자 제목만 수정했을 때 상세 제목까지 바뀐다고 가정하지 않는다. 실제 편집 검증은 두 항목을 분리한다.

## 콘텐츠·Loop·첨부

page.php와 template-about_us.php, 상세 부분은 the_content를 사용한다. CF7/테마 쇼트코드/본문 이미지가 이 필터를 통해 출력될 수 있다. 미리보기의 원문 배열로 대체하면 관리자 수정이 반영되지 않는다.

목록은 WP_Query→have_posts→the_post, 지정 항목 분기는 setup_postdata를 사용한다. 기본 page/single 코드에 명시적 while Loop가 보이지 않는 구간도 있으므로 사용 중인 주 쿼리·전역 post와 wp_reset_postdata 위치를 실행 환경에서 확인해야 한다. Loop를 있다고 가정하거나 임의로 추가/제거하지 않는다.

wp_get_attachment_image_src·the_post_thumbnail·get_post_thumbnail_id와 blogMasonry 등 이미지 크기 등록이 있다. 첨부 URL 하드코딩·재업로드·일괄 썸네일 재생성을 기본 변경에 포함하지 않는다.

## 실제 전송 계약 — 혼동 금지

| 경로/코드 | 확인된 구조 | 운영 실사용 상태 |
|---|---|---|
| P19 주문 | [audit 19](../audit/19-page.md)의 이메일·사진 전달 안내 | 안내 확인; 사이트 주문 폼 처리로 단정하지 않음 |
| P20 문의 | [audit 20](../audit/20-page.md)에 wpcf7 action·필드명 존재 | CF7 출력 정황. 실제 플러그인 구성·발송·저장 미확인 |
| Holiday 자체 Contact | form.contactForm의 #full_name/#email/#comment → main_script.js L301~340에서 um_name/um_email/um_message → 현재 document.URL로 POST → template-contact L12~38 → wp_mail | 코드 확인; /contact/나 P20에서 실제 사용한다고 확정하지 않음 |
| 예약 불러오기 | .um_book + data-postID → um_booking/post_id → admin-ajax → content-booking | 코드 확인; 사이트 예약 사용 미확인 |
| 예약 완료 | button.um_bookBtn → um_booking_completed/post_id/booking_data → sendEmail·insertIntoDB·receiveEmail | 코드 확인; 현재 주문/문의와 동일 기능으로 단정하지 않음 |
| 필터/확대 | um_filter/um_cat/post_id, um_lightbox/post_id | 코드 확인; 사용 페이지·실행 미확인 |

자체 폼의 HTML name(full_name/email/comment)과 AJAX payload 이름(um_name/um_email/um_message)은 다르다. 둘을 같게 정리하면 동작이 바뀔 수 있다. 플러그인의 폼 필드·숨김 입력·nonce·action은 실제 생성 방식 그대로 유지한다. 기존 nonce 값·세션 값·수신 주소 설정값은 복사하거나 문서화하지 않는다.

## 예약 DB·관리 및 보안 검토 경계

backend-booking.php는 after_setup_theme에서 고정 이름 um_bookingTable 생성 여부를 확인하고, 별도 Booking 관리 메뉴·um_Delete 입력에 따른 삭제 코드를 가진다. ajax-booking.php는 같은 테이블에 JSON 형태의 fields를 저장하고 메일 함수를 호출한다. 이 테이블은 일반 WordPress 접두사로 시작하지 않으므로 자료 확보 시 테이블명 범위 누락을 주의한다. 실제 테이블·레코드가 있는지는 미확인이다.

선택해 읽은 자체 전송/예약/삭제 처리 구간에서 nonce 검증 호출은 발견하지 못했다. 전체 플러그인·서버 보안의 부재나 취약점 악용 가능성을 확정한 것은 아니다. 기존 취약할 수 있는 부분을 무조건 새 코드로 복제하는 것도 금지하며, 확인 시 보안 담당 검토와 별도 범위 결정을 요청한다. 이번에는 기능·보안 코드 모두 수정하지 않았다.

## CSS/JS·플러그인 의존성

functions.php L215~314는 main/style.css, Bootstrap, RoyalSlider, Owl Carousel, FontAwesome, select, datetimepicker, shortcodes, scrollbar, widgets, global.css/main_stylesheet.css 등과 jQuery·isotope·imagesloaded·mainScript/roomsScript/um_booking/um_lightbox를 등록한다. 많은 스크립트가 명시적 의존 배열 없이 등록돼 있어 순서 변경·비동기화·dequeue는 실행 검증 전 금지다.

Bootstrap data-toggle/data-target, .um_shadow, .homeSlider/.roomsSlider/.roomsWideSlider, .um_expand_lightbox, .um_book, data-postID, .selectpicker, .articles와 페이지 변수·폼 선택자가 실행 계약이다. JS의 .live 호출은 로컬에서 확인되며 현재 jQuery 호환성은 미확인이다.

WooCommerce 지원/호환 include는 있으나 활성·사용 여부 미확인이다. 공개 소스의 CF7·팝업·추가 CSS 등 리소스 정황도 설치·활성·필요성을 확정하지 않는다. 활성/MU/네트워크 플러그인과 드롭인 목록·필터 우선순위가 필요하다.

## 필요한 자료

기존 DB 복사본·메타 이름/형식·옵션·플러그인 소스·미디어·실제 제출 요청의 비식별 계약·관리자 편집 위치·운영 버전. 보존 검증 계획은 [회귀 테스트](06-regression-test-plan.md)를 따른다.

