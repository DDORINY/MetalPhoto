# 기존 테마 구조 및 활성 구성 확인

작성일: 2026-10-29 (KST) · 상태: 사전 분석 / 구현·배포 미승인

**확인**은 로컬 코드 또는 기존 audit의 수집 사실, **후보/추정**은 구조 일치에 따른 해석, **미확인**은 운영 설정·DB·실행 검증이 필요한 항목이다. Holiday의 실제 활성 여부는 미확인이다. 서버·DB에 접속하거나 PHP를 실행하지 않았으며 새 백엔드·테마·UI를 구현하지 않았다.

## 조사 범위

현재 테마 10개의 style.css 메타데이터를 다시 확인했다. Blogrid 2.7, Holiday 1.2.0, Masonry 1.3.4, Messina Blog 1.0.1, Notes and Photos 1.1, Twenty Fifteen 3.0, Twenty Fourteen 3.2, Twenty Nineteen 2.1, Twenty Seventeen 2.4, Twenty Sixteen 2.5다. Notes and Photos는 Template: blogrid로 선언된다. 설치·다운로드 존재는 활성 상태의 근거가 아니다. 상세 연결 분석은 Holiday에 한정하며 다른 테마의 기능 구조를 동일하다고 가정하지 않는다.

## 실제 분석한 PHP 파일과 읽기 범위

아래 링크는 로컬 원본 기준이다. themes/는 Git 제외 대상이므로 공개 저장소에 원본이 있다는 의미가 아니다. 줄 번호는 다운로드본 기준이며 파일별 전체 보안 감사나 PHP 실행을 의미하지 않는다.

| PHP 파일 | 읽기 범위 | 핵심 근거 |
|---|---|---|
| [functions.php](../../themes/holiday/functions.php) | 전체 읽기 | L8~30 ACF·기능 include, L118 메뉴, L162 위젯, L215~314 CSS/JS |
| [header.php](../../themes/holiday/header.php) | 전체 읽기 | L4~5 JS 전역, L20~33 옵션·wp_head, L98~109 메뉴 |
| [footer.php](../../themes/holiday/footer.php) | 전체 읽기 | L3 템플릿 메타, L5~21 위젯, L37~46 옵션·wp_footer; 후반 외부 분석 코드 존재(식별값 미기록) |
| [index.php](../../themes/holiday/index.php) | 전체 읽기 | template-blog 호출 |
| [home.php](../../themes/holiday/home.php) | 전체 읽기 | template-blog 호출 |
| [page.php](../../themes/holiday/page.php) | 전체 읽기 | L24 제목, L30~32 필터된 본문 |
| [single.php](../../themes/holiday/single.php) | 전체 읽기 | L46 포맷 부분, L64~67 제목·본문·분할, 속성·댓글·사이드바 |
| [single-room_post.php](../../themes/holiday/single-room_post.php) | 전체 읽기 | layout=big 분기와 roomBig/roomSmall 호출 |
| [template-home.php](../../themes/holiday/template-home.php) | 전체 읽기 | L12~15 필드, L37 슬라이더, L66~69 제품/위젯 분기 |
| [template-about_us.php](../../themes/holiday/template-about_us.php) | 전체 읽기 | L28 제목·L36 본문, L47 members와 이미지 출력 |
| [template-custom_rooms.php](../../themes/holiday/template-custom_rooms.php) | 쿼리·출력·페이지 처리 분기 읽기 | L14~50 및 L172~257 display/categories/custom·목록 |
| [template-rooms.php](../../themes/holiday/template-rooms.php) | 쿼리·필터·출력 분기 읽기 | L58~79·L148~166 room_post/필터/Loop |
| [template-blog.php](../../themes/holiday/template-blog.php) | 쿼리·제목·카드 출력 구간 | L67~88 display_posts와 post 조회 Loop |
| [content-roomBig.php](../../themes/holiday/content-roomBig.php) | 전체 구조·출력 구간 | L2 wide class, L9 slider, L81~91 필드 CTA, L115~125 본문·속성 |
| [content-roomSmall.php](../../themes/holiday/content-roomSmall.php) | 전체 구조·출력 구간 | L5 class, L21~30 제목/CTA, L50 slider, L120~131 본문·속성 |
| [content-homeSlider.php](../../themes/holiday/content-homeSlider.php) | 슬라이드 데이터/이미지·영상 분기 | L1 slider, L9 wp_get_attachment_image_src |
| [content-homeRooms.php](../../themes/holiday/content-homeRooms.php) | 쿼리·카드·필드 참조 구간 | L2 display_options, L30 filter, L68~70 Loop |
| [content-filters.php](../../themes/holiday/content-filters.php) | 분류·옵션 참조 구간 | L6 category_on_filter, L66 custom_categories |
| [content-booking.php](../../themes/holiday/content-booking.php) | 필드 생성·name/data 속성·날짜/약관 구간 | L3~6 um_fields/options, L38~44 동적 입력, L128/135 날짜 |
| [template-contact.php](../../themes/holiday/template-contact.php) | 자체 처리·폼/CF7 분기 읽기 | L12~38 요청→wp_mail, L125~178 자체폼/shortcode |
| [includes/post-types.php](../../themes/holiday/includes/post-types.php) | 전체 읽기 | L15~17 홈 editor 제어, L27~36 CPT, L41~58 분류, L65~74 service |
| [includes/custom-fields.php](../../themes/holiday/includes/custom-fields.php) | 필드 정의·location 선택 구간 및 참조 검색 | register_field_group; L6271 이후 Rooms·L6284 layout·L6499 redirect_to·L6579 slider |
| [includes/advanced-custom-fields/acf.php](../../themes/holiday/includes/advanced-custom-fields/acf.php) | 헤더/버전만 | 로컬 내장본 헤더 Version 4.3.8. 내부 전체 감사 아님 |
| [includes/branding.php](../../themes/holiday/includes/branding.php) | 브랜딩·배경 함수 구간 | L1 doBranding, L537 setBgImg·첨부 참조 |
| [includes/ajax-filters.php](../../themes/holiday/includes/ajax-filters.php) | 전체 읽기 | um_filter hooks·room_post WP_Query·카드 출력 |
| [includes/ajax_lightbox.php](../../themes/holiday/includes/ajax_lightbox.php) | hook·post_id·슬라이드/미디어 분기 | L3~10 action·slider; 미디어 전체 런타임 검증 아님 |
| [includes/ajax-booking.php](../../themes/holiday/includes/ajax-booking.php) | hook·요청·DB/메일 함수 구간 | L19/78 action, L136~138 처리, L260~274 DB, L317~379 메일 |
| [includes/backend-booking.php](../../themes/holiday/includes/backend-booking.php) | 전체 읽기 | L4~7 삭제 처리, L12~28 테이블 생성, L34 관리자 메뉴 |
| [includes/shortcodes/shortcodes.php](../../themes/holiday/includes/shortcodes/shortcodes.php) | 등록·출력 구간 | accordion/group 및 레이아웃·버튼 등 add_shortcode 검색 |

추가 JS 선택자/전송 구간: assets/js/main_script.js, rooms_script.js, um_lightbox.js, um_booking.js. CSS는 functions.php의 enqueue와 파일 경로를 분석했으며 모든 선언의 렌더링 검증은 하지 않았다. ACF add-on·WooCommerce 호환 include는 호출 존재만 확인했고 내부 전체 구현·버전 호환은 미검증이다.

## 호출 구조

functions.php → 내장 ACF와 필드 정의 → post-types/branding/shortcodes/AJAX/예약/위젯 include → 초기화 hook·리소스 등록으로 이어진다. 표시 파일과 데이터 기능이 같은 테마에 결합되어 있다.

- 홈 후보: template-home.php → content-homeSlider.php + inner_content_type에 따라 content-homeRooms.php 또는 sidebar-home.
- 일반 페이지 후보: page.php 또는 지정 페이지 템플릿 → the_title/the_content. template-about_us.php는 members 반복 구간도 있다.
- 제품 후보: single-room_post.php → layout 값에 따라 roomBig/roomSmall → slider·room_name·본문·attributes.
- 글 기본: index.php/home.php → template-blog.php. single.php는 일반 글·포맷·댓글·속성 구조다.
- 공통: get_header/get_footer → 메뉴 main_menu, 옵션/위젯, wp_head/wp_footer.
- 본문은 get_the_content의 존재 조건 후 the_content로 출력되는 구간이 있다. 원문 필터·쇼트코드까지 포함한 의미를 정적 문자열로 대체하면 안 된다.

## 활성 테마 확인 절차 — 아직 실행하지 않음

1. 운영 담당자가 제공한 관리자 활성 테마/부모 정보와 대상 사이트 식별을 확인한다. 활성화·설정 저장은 하지 않는다.
2. 승인된 DB 복사본의 대상 options에서 template·stylesheet를 확인한다. 멀티사이트면 사이트별 테이블과 네트워크 플러그인 상태를 구분한다.
3. 지정 페이지의 _wp_page_template, show_on_front/page_on_front/page_for_posts, 메뉴 위치·위젯 배정을 대조한다.
4. 활성 플러그인·MU 플러그인·드롭인·커스텀 템플릿 필터와 다운로드본/운영본 차이를 확인한다.
5. 로컬 복원 후 실제 template_include 결과를 일시적 로컬 진단으로 확인하는 방법을 검토한다. 이번에는 진단 코드도 생성하지 않았다.

관리자 페이지 열람도 테마 hook를 실행할 수 있다. backend-booking.php에는 초기화 중 테이블 생성 코드가 있어 엄격한 무변경 조사는 기존 DB 복사본 확인을 우선한다. 접속 권한은 요청하지 않았고 서버 작업은 수행하지 않았다.

## 렌더링 외의 영향

header는 custom_css/custom_js·doBranding, footer는 옵션·위젯·외부 분석 코드를 출력한다. 외부 분석 코드의 식별값은 기록하지 않는다. footer의 짧은 PHP 시작 태그가 실행 환경의 short_open_tag 설정과 연관될 가능성이 있어 PHP 버전/설정 확인이 필요하다. 활성·정상 실행 여부는 단정하지 않는다.

## 근거와 미확인

[기존 구조 평가](../02-theme-architecture-evaluation.md), [audit](../audit/00-audit-index.md), [매핑](02-template-page-mapping.md). 관리자·DB·플러그인 소스·운영 PHP/jQuery·실제 현재 템플릿은 전부 미확인이다.

