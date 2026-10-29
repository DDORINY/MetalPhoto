# 페이지·구성 유형·미리보기 대응표

작성일: 2026-10-26 (KST) · 상태: **내부 검토용 Draft / 미승인**

**AS-IS**는 수집 소스의 사실, **ISSUE**는 기존 평가의 문제/가설, **TO-BE**는 제안, **APPROVAL REQUIRED**는 컨펌 필요, **UNVERIFIED**는 추가 검증 필요를 뜻한다. 승인 전 구현·최종안으로 취급하지 않는다.

## AS-IS

20개 URL은 [원래 요구사항](../03-redesign-requirements.md), 본문 근거는 [audit 색인](../audit/00-audit-index.md), 평가는 [평가 색인](../evaluation/00-evaluation-index.md)에 기록됐다. 실제 활성 테마와 각 게시물 유형·템플릿 배정은 미확인이다.

## ISSUE

화면 구조가 같다고 같은 WordPress 데이터 유형이라고 가정하면 room_post·ACF·문의 의존성을 놓칠 수 있다. [아키텍처 평가](../02-theme-architecture-evaluation.md)와 [제품/전환 평가](../evaluation/05-order-inquiry-evaluation.md)를 근거로 화면 유형과 구현 템플릿을 구분한다.

## TO-BE — MAP01 유형·화면 목록

아래 '유형'은 정적 미리보기의 기획 단위다. PHP 파일 생성·배정은 이 단계에서 하지 않는다. PHASE D 파일명은 후속 승인 시 후보이며 이번에는 파일이 존재하지 않는다.

| ID | 기존 URL | 공통 구성 유형 후보 | 개별 기획 | PHASE D 화면 파일 후보 |
|---|---|---|---|---|
| P01 | http://gomemo.net/ | HOME | [P01](06-homepage-layout.md#p01) | preview/01-page.html |
| P02 | http://gomemo.net/about/ | COMPANY | [P02](07-company-pages-layout.md#p02) | preview/02-page.html |
| P03 | http://gomemo.net/introduce/ | TECH | [P03](07-company-pages-layout.md#p03) | preview/03-page.html |
| P04 | http://gomemo.net/improve_price/ | CERT | [P04](07-company-pages-layout.md#p04) | preview/04-page.html |
| P05 | http://gomemo.net/modern/ | MEMORIAL-LIST | [P05](08-memorial-products-layout.md#p05) | preview/05-page.html |
| P06 | http://www.gomemo.net/room/modern2/ | MEMORIAL-DETAIL | [P06](08-memorial-products-layout.md#p06) | preview/06-page.html |
| P07 | http://www.gomemo.net/room/special1/ | MEMORIAL-DETAIL | [P07](08-memorial-products-layout.md#p07) | preview/07-page.html |
| P08 | http://www.gomemo.net/room/vip1/ | MEMORIAL-DETAIL | [P08](08-memorial-products-layout.md#p08) | preview/08-page.html |
| P09 | http://gomemo.net/room/t-1/ | MEMORIAL-DETAIL | [P09](08-memorial-products-layout.md#p09) | preview/09-page.html |
| P10 | http://gomemo.net/room/%ed%94%84%eb%a6%ac%eb%af%b8%ec%97%84-%ec%95%b5%ea%b8%80/ | MEMORIAL-DETAIL | [P10](08-memorial-products-layout.md#p10) | preview/10-page.html |
| P11 | http://www.gomemo.net/room/nature/ | MEMORIAL-DETAIL | [P11](08-memorial-products-layout.md#p11) | preview/11-page.html |
| P12 | http://gomemo.net/metalphoto/ | RECORDS-LIST | [P12](09-records-projects-layout.md#p12) | preview/12-page.html |
| P13 | http://www.gomemo.net/room/certification/ | PROJECT-DETAIL | [P13](09-records-projects-layout.md#p13) | preview/13-page.html |
| P14 | http://www.gomemo.net/room/government/ | PROJECT-DETAIL | [P14](09-records-projects-layout.md#p14) | preview/14-page.html |
| P15 | http://www.gomemo.net/room/memorial-hall/ | PROJECT-DETAIL | [P15](09-records-projects-layout.md#p15) | preview/15-page.html |
| P16 | http://gomemo.net/%ec%8b%a0%ec%a0%9c%ed%92%88-%ec%97%b0%ea%b5%ac%ea%b0%9c%eb%b0%9c/ | INNOVATION | [P16](07-company-pages-layout.md#p16) | preview/16-page.html |
| P17 | http://gomemo.net/room/테마파크-theme-park/ | PROJECT-DETAIL | [P17](09-records-projects-layout.md#p17) | preview/17-page.html |
| P18 | http://gomemo.net/contact/ | CONTACT | [P18](07-company-pages-layout.md#p18) | preview/18-page.html |
| P19 | http://www.gomemo.net/order_question/ | ORDER | [P19](10-order-inquiry-layout.md#p19) | preview/19-page.html |
| P20 | http://www.gomemo.net/room/qu/ | INQUIRY | [P20](10-order-inquiry-layout.md#p20) | preview/20-page.html |

모든 화면은 동일한 헤더·푸터·DS·C01/C08을 사용한다. 제품 상세(06~11)는 공통 틀과 모델별 차이를, 프로젝트(13~15·17)는 사례별 차이를 유지한다. P16은 신제품 유형, P17은 신사업 메뉴에 연결된 프로젝트 유형이므로 메뉴 분류와 화면 유형을 혼동하지 않는다.

### MAP02 PHASE D 상태 화면 후보

20개 페이지 외에 preview/index.html 컨펌 허브 후보를 둔다. 허브에는 화면 목록·상태·근거·모바일/PC 확인 방법을 표시한다. 별도 오류 URL을 추가하지 않고 갤러리 열림/닫힘·메뉴 열림·이미지 미확보·문의 입력/오류/모의 성공 상태를 각 화면에서 확인하는 후보다.

미리보기 내부 이동은 로컬 화면으로 연결하고, 원문 출처는 별도 「운영 원문」 링크로 구분한다. 실제 운영 폼 action·메일 발송·첨부 업로드·WordPress/DB 연결은 사용하지 않는다. 새 HTML 개발은 후속 지시 전 금지다.

## APPROVAL REQUIRED

MAP01 20개 화면·공통 유형·차이 범위, MAP02 허브와 상태 화면, 사용 가능한 실제 이미지 및 시안 표시 방식. 일부 대표만 먼저 검토하더라도 나머지 20개 경로 대응을 삭제하지 않는다.

## UNVERIFIED

PHP 템플릿·ACF 필드 매핑·게시물 ID·플러그인 API·프런트엔드 빌드 구조는 미확정이다. 이 표를 활성 WordPress 구조로 해석하지 않는다.

