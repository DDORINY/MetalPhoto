# WordPress 백엔드 유지·프론트엔드 리디자인 통합 분석

작성일: 2026-10-29 (KST) · 상태: 사전 분석 / 구현·배포 미승인

**확인**은 로컬 코드 또는 기존 audit의 수집 사실, **후보/추정**은 구조 일치에 따른 해석, **미확인**은 운영 설정·DB·실행 검증이 필요한 항목이다. Holiday의 실제 활성 여부는 미확인이다. 서버·DB에 접속하거나 PHP를 실행하지 않았으며 새 백엔드·테마·UI를 구현하지 않았다.

## 핵심 결론

기존 PHP의 동적 출력·필터·편집 경로를 유지한 표시 변경이 목표다. 정적 preview를 운영 테마로 복사하는 방식은 적합하지 않다. Holiday에는 CPT·ACF·예약·쇼트코드·메일/DB 처리까지 함께 들어 있어 외형 테마를 바꾸는 것만으로 '백엔드 유지'를 달성했다고 볼 수 없다.

새 기능·새 DB·새 접수 API·새 기능 플러그인은 이번 범위에 없다. 기존 기능을 보존하기 위해 이동/재작성까지 필요해지면 별도 범위 판단이 필요하다.

## 문서 목록

| 파일 | 내용 |
|---|---|
| [01-theme-architecture.md](01-theme-architecture.md) | 테마 구조·실제로 읽은 PHP 목록·활성 확인 절차 |
| [02-template-page-mapping.md](02-template-page-mapping.md) | 20개 URL별 9개 연결 항목·후보/미확인 |
| [03-backend-dependencies.md](03-backend-dependencies.md) | CPT·ACF·본문·첨부·폼·예약·CSS/JS 계약 |
| [04-frontend-modification-boundaries.md](04-frontend-modification-boundaries.md) | 표시 변경 후보와 보존할 기능 경계·mock 이전 금지 |
| [05-development-strategy-comparison.md](05-development-strategy-comparison.md) | 직접 수정·Child·독립 테마 비교·조건부 권장 |
| [06-regression-test-plan.md](06-regression-test-plan.md) | 관리 편집·페이지/제품/미디어·폼·메일·롤백 회귀 계획 |
| [07-implementation-readiness.md](07-implementation-readiness.md) | 착수 전 자료·AP 컨펌·남은 질문 |

## 확인된 사실과 한계

- Holiday 로컬 메타데이터는 1.2.0, 내장 ACF 헤더는 4.3.8이다. 실제 운영 버전과 같다고 단정하지 않는다.
- room_post/room, service_post/service, room_categories 및 동적 분류 코드가 있다.
- homePage/aboutUsPage/roomsPage/singleRoomPage/singleRoomWidePage/defaultPage 등 기존 HTML과 로컬 출력 구조가 일치하는 후보를 찾았다.
- P18 /contact/는 About Us 구조와 일치하고 P20은 roomBig와 CF7 출력 정황이다. 페이지 이름만으로 Contact 템플릿을 배정하면 안 된다.
- P19는 이메일 주문 안내다. 코드에 예약 기능이 있다는 이유로 현재 사이트의 주문·문의를 예약 기능으로 바꾸지 않는다.
- 목록 title과 상세 room_name, 본문 shortcode와 플러그인 form, 홈 위젯과 본문을 구분해야 관리자 편집을 보존할 수 있다.
- 모든 실제 활성/페이지 배정·저장값·필드 사용·전송·정상 동작은 미확인이다. 로컬 PHP 실행도 하지 않았다.

## 조사 자료와 범위

[PHASE A](../audit/00-audit-index.md)의 20개 페이지 수집 정보·DOM/본문/폼/리소스 기록, [PHASE B](../evaluation/00-evaluation-index.md)의 가설, [PHASE C](../proposal/00-proposal-index.md)의 구성·컨펌, [명세](../13-frontend-specification.md), [v1.0](../../design/metalphoto_mobile_redesign.html), [preview](../../preview/index.html)와 [검증 기록](../../preview/VALIDATION.md)을 대조했다.

PHP 29개 파일의 전체 또는 관련 구간을 읽었으며 파일별 범위는 01 문서에 명시했다. 다른 테마는 메타데이터만 재확인했다. JS 선택자는 main_script/rooms_script/um_booking/um_lightbox와 preview.js를 비교했고, CSS 등록은 functions.php 기준으로 조사했다. 공개 HTML과 미리보기 검증이 WordPress 기능 회귀 검증을 대신하지 않는다. 민감 설정·고객 값·분석 서비스 식별값은 기록하지 않았다.

## 조건부 권장

활성 테마가 Holiday 부모로 확인되고 표시 파일 override가 충분하면 Child Theme를 우선 검토한다. PHP·필드·폼 계약은 유지한다. 활성 테마가 다른 경우 재평가한다. 독립 테마는 기존 기능 제공 주체와 보존 경로가 증명되기 전 선택하지 않는다. 새로운 백엔드 개발을 전제로 한 분리는 기본 제안에 없다.

## 착수 전 미확인 목록

활성 부모/자식·운영본 차이, 각 URL ID/type/template, DB/별도 테이블/플러그인/미디어 복사본, ACF 키/반환 형식·옵션·관리 UI, 실제 폼 제공자/nonce/action/첨부/메일·저장, WP/PHP/jQuery·캐시/외부 연동, 원본 이미지·콘텐츠 승인, 격리 환경·회귀·백업/복구, 내부 디자인 컨펌이 필요하다. 구체적 우선순위는 07 문서에 기록했다.

## 이번 작업에서 하지 않은 일

HTML/CSS/JS/PHP/테마/기존 문서 수정, 신규 테마·백엔드·진단 코드 생성, 운영 서버·DB 접속, 실제 편집·발송·배포·Git 커밋/Push를 하지 않았다. 이번 새 파일은 이 폴더의 Markdown 8개뿐이다.

