# 정보 구조·사이트맵 제안

작성일: 2026-10-26 (KST) · 상태: **내부 검토용 Draft / 미승인**

**AS-IS**는 수집 소스의 사실, **ISSUE**는 기존 평가의 문제/가설, **TO-BE**는 제안, **APPROVAL REQUIRED**는 컨펌 필요, **UNVERIFIED**는 추가 검증 필요를 뜻한다. 승인 전 구현·최종안으로 취급하지 않는다.

## AS-IS

[기존 URL 목록](../03-redesign-requirements.md)과 [audit 색인](../audit/00-audit-index.md)에 20개 공개 경로가 기록돼 있다. 이 목록은 전체 DB·메뉴 미노출 페이지 목록이 아니다. 모든 20개 경로는 수집 당시 HTTP 200이며 현재 응답을 다시 확인하지 않았다.

## ISSUE

[공통 평가 G01~G07](../evaluation/01-global-navigation-evaluation.md)은 긴 메뉴·독립 문의 진입·URL 혼용·복귀 의미를 검토 대상으로 기록했다. [제품 PR01~04](../evaluation/04-product-information-evaluation.md)는 상세/문의/스토어 역할 구분을 요구한다.

## TO-BE — IA01 전체 사이트맵

페이지 ID는 audit 번호와 일치한다. 아래 URL은 원본 표기를 유지한다. www/비www·인코딩·HTTP를 자동 정규화하지 않으며 canonical·보안 정책은 별도 조사/승인 대상이다. 그룹명은 새 페이지 URL이 아닌 내비게이션 분류다.

| ID | 페이지 | 기존 URL 그대로 유지 | 제안 탐색 경로 | 처리 구분 | 개별 구성안 |
|---|---|---|---|---|---|
| P01 | 홈 | http://gomemo.net/ | 홈 | 유지 + 메뉴/내용 재배치 후보 | [P01](06-homepage-layout.md#p01) |
| P02 | 회사소개 / Portfolio | http://gomemo.net/about/ | 회사·기술 > 회사소개 | 유지 + 메뉴/내용 재배치 후보 | [P02](07-company-pages-layout.md#p02) |
| P03 | 기술소개 | http://gomemo.net/introduce/ | 회사·기술 > 기술소개 | 유지 + 메뉴/내용 재배치 후보 | [P03](07-company-pages-layout.md#p03) |
| P04 | 증명서 & 수상 | http://gomemo.net/improve_price/ | 회사·기술 > 증명서·수상 | 유지 + 메뉴/내용 재배치 후보 | [P04](07-company-pages-layout.md#p04) |
| P05 | 추모용 메탈포토 전체 | http://gomemo.net/modern/ | 추모용 > 전체 제품 | 유지 + 메뉴/내용 재배치 후보 | [P05](08-memorial-products-layout.md#p05) |
| P06 | 모던 | http://www.gomemo.net/room/modern2/ | 추모용 > 모던 | 유지 + 메뉴/내용 재배치 후보 | [P06](08-memorial-products-layout.md#p06) |
| P07 | 스페셜 | http://www.gomemo.net/room/special1/ | 추모용 > 스페셜 | 유지 + 메뉴/내용 재배치 후보 | [P07](08-memorial-products-layout.md#p07) |
| P08 | VIP폴 | http://www.gomemo.net/room/vip1/ | 추모용 > VIP폴 | 유지 + 메뉴/내용 재배치 후보 | [P08](08-memorial-products-layout.md#p08) |
| P09 | 위패 / 스탠드 | http://gomemo.net/room/t-1/ | 추모용 > 위패·스탠드 | 유지 + 메뉴/내용 재배치 후보 | [P09](08-memorial-products-layout.md#p09) |
| P10 | 앵글 | http://gomemo.net/room/%ed%94%84%eb%a6%ac%eb%af%b8%ec%97%84-%ec%95%b5%ea%b8%80/ | 추모용 > 앵글 | 유지 + 메뉴/내용 재배치 후보 | [P10](08-memorial-products-layout.md#p10) |
| P11 | 자연장 / 수목장 | http://www.gomemo.net/room/nature/ | 추모용 > 자연장·수목장 | 유지 + 메뉴/내용 재배치 후보 | [P11](08-memorial-products-layout.md#p11) |
| P12 | 기록물 / 기념물 전체 | http://gomemo.net/metalphoto/ | 기록물·기념물 > 전체 분야 | 유지 + 메뉴/내용 재배치 후보 | [P12](09-records-projects-layout.md#p12) |
| P13 | 상패·감사패 등 | http://www.gomemo.net/room/certification/ | 기록물·기념물 > 상패·감사패 등 | 유지 + 메뉴/내용 재배치 후보 | [P13](09-records-projects-layout.md#p13) |
| P14 | 정부조달·인테리어 등 | http://www.gomemo.net/room/government/ | 기록물·기념물 > 정부조달·인테리어 등 | 유지 + 메뉴/내용 재배치 후보 | [P14](09-records-projects-layout.md#p14) |
| P15 | 전시·기념관·박물관 | http://www.gomemo.net/room/memorial-hall/ | 기록물·기념물 > 전시·기념관·박물관 | 유지 + 메뉴/내용 재배치 후보 | [P15](09-records-projects-layout.md#p15) |
| P16 | 신제품 / R&D | http://gomemo.net/%ec%8b%a0%ec%a0%9c%ed%92%88-%ec%97%b0%ea%b5%ac%ea%b0%9c%eb%b0%9c/ | 신제품·신사업 > 신제품·R&D | 유지 + 메뉴/내용 재배치 후보 | [P16](07-company-pages-layout.md#p16) |
| P17 | 테마파크 | http://gomemo.net/room/테마파크-theme-park/ | 신제품·신사업 > 테마파크 | 유지 + 메뉴/내용 재배치 후보 | [P17](09-records-projects-layout.md#p17) |
| P18 | 오시는길 | http://gomemo.net/contact/ | 회사·기술 > 오시는길 | 유지 + 메뉴/내용 재배치 후보 | [P18](07-company-pages-layout.md#p18) |
| P19 | 주문하기 | http://www.gomemo.net/order_question/ | 주문·문의 > 주문 방법 | 유지 + 메뉴/내용 재배치 후보 | [P19](10-order-inquiry-layout.md#p19) |
| P20 | 문의하기 | http://www.gomemo.net/room/qu/ | 주문·문의 > 문의하기 | 유지 + 메뉴/내용 재배치 후보 | [P20](10-order-inquiry-layout.md#p20) |

### IA02 유지·재배치·통합·추가의 구분

- **유지:** 20개 페이지/URL·기존 이미지·본문·연락처/정책 원문을 출처별로 보존한다. 가격·사양·이미지 속 글씨를 새로 만들어 채우지 않는다.
- **재배치:** 회사·기술·오시는길을 묶고 주문·문의를 명시한다. 테마파크는 신사업에서 접근하되 사례형 공통 구성도 활용한다.
- **통합 후보:** 반복 기술/지식재산권/문의 준비 안내를 공통 구성요소로 관리하는 표현 통합이다. 페이지 병합·삭제·301 이동은 제안하지 않는다.
- **추가 후보:** 판독된 모델 설명·사례명·요약·확대 버튼·문의 상태·목차. 사실 콘텐츠는 원본/담당자 승인 후 확보한다. 서비스 약속·가격·납기·인증을 임의 추가하지 않는다.

### IA03 연결·복귀

홈→제품군 목록→각 상세→주문 방법/문의 또는 확인된 외부 스토어를 구분한다. 회사·기술·신사업에서도 헤더/푸터로 주문·문의 접근이 가능해야 한다. 모든 상세는 상위 목록·그룹과 홈 복귀 경로를 제공한다. 메뉴 미노출·추가 발견 페이지는 별도 조사 목록에 등록하고 삭제로 간주하지 않는다.

## APPROVAL REQUIRED

IA01 메뉴 그룹·라벨·순서, IA02 표현 통합 범위, IA03 주문/문의·외부 스토어의 역할. 메뉴 라벨 「주문 방법」은 현재 「주문하기」 URL을 유지하는 제안이며 구매 절차 변경이 아니다.

## UNVERIFIED

전체 게시물 수·페이지 ID·동적 콘텐츠·숨겨진 페이지·redirect chain·canonical·SEO 유입은 미확인이다. 메뉴 재배치가 검색 유입 보존을 보장하지 않는다.

