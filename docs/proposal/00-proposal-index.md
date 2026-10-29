# PHASE C 신규 리디자인 기획 색인

작성일: 2026-10-26 (KST) · 상태: **내부 검토용 Draft / 미승인**

**AS-IS**는 수집 소스의 사실, **ISSUE**는 기존 평가의 문제/가설, **TO-BE**는 제안, **APPROVAL REQUIRED**는 컨펌 필요, **UNVERIFIED**는 추가 검증 필요를 뜻한다. 승인 전 구현·최종안으로 취급하지 않는다.

## AS-IS

PHASE A 21개 문서와 PHASE B 8개 문서가 존재하며 공개 URL 20개를 다룬다. PHASE A는 2026-10-26 수집된 소스 기준이다. [기존 명세](../13-frontend-specification.md)와 [HTML v1.0](../../design/metalphoto_mobile_redesign.html)은 참고 자료이며 수정하지 않는다.

## ISSUE

[평가 색인](../evaluation/00-evaluation-index.md)에 제품 식별·이미지 중심 설명·탐색·주문 채널·문의 상태 가설이 있다. 브라우저 화면과 이미지 실물은 미검증이다. 이 제안은 가설을 확정 결함으로 바꾸지 않고 검토 후보를 연결한다.

## TO-BE — 문서 목록

- [정보 구조·20 URL 사이트맵](01-information-architecture.md)
- [공통 디자인 토큰·수치 후보](02-design-system.md)
- [헤더·메뉴·홈 복귀](03-global-header-navigation.md)
- [푸터 정보·연락처 확인](04-global-footer.md)
- [C01~C10 구성요소](05-shared-components.md)
- [홈 P01](06-homepage-layout.md)
- [회사·기술·증빙·신제품·방문 P02~04/P16/P18](07-company-pages-layout.md)
- [추모용 P05~11](08-memorial-products-layout.md)
- [기록물·사례 P12~15/P17](09-records-projects-layout.md)
- [주문·문의 P19~20](10-order-inquiry-layout.md)
- [7가지 모바일 사용자 과업](11-mobile-senior-ux.md)
- [20화면·유형·PHASE D 목록](12-page-to-template-matrix.md)
- [내부 컨펌·단계별 조건](13-approval-checklist.md)

### 근거·제안 추적 규칙

각 P번호는 audit 번호와 일치한다. 개별 페이지에는 PHASE A의 개별 콘텐츠/이미지 섹션과 PHASE B의 A번호 링크를 붙였다. 공통 결정은 G/PR/OI/M/V 평가와 연결했다. 원문은 해당 audit에서 확인하고 새 요약·캡션·규격을 승인 전 원문으로 취급하지 않는다.

### 공통/개별 규칙 및 기존 명세와의 차이 후보

공통 수치는 02, 메뉴는 03, 회사정보는 04, 컴포넌트는 05가 기준안이다. 06~10은 페이지별 콘텐츠 순서만 정의하며 다른 수치를 만들지 않는다. 기존 시안의 최대 폭·청록 계열은 참고하고 14px 메뉴 축소·홈 전용 앵커·금색 포커스·고정 푸터 패딩은 그대로 확정하지 않는다. 18px 중심·1200px 전환·새 포커스·56px 버튼도 검증 전 후보다.

PHASE D는 허브 1개와 기존 20페이지 대응 화면 후보, 메뉴·갤러리·폼 모의 상태를 제안한다. 코드 파일은 아직 생성하지 않았다.

## APPROVAL REQUIRED

[AP01~AP11 목록](13-approval-checklist.md)에 정보 구조·디자인·운영 정보·모델/사례·원문 변경·CTA·미리보기 범위를 모았다. 모든 항목은 미승인이다. 페이지 통합은 공통 안내 표현 통합만 후보이며 URL 변경·페이지 삭제는 기본 제안에 없다.

## UNVERIFIED

시각·이미지·실기기·실제 기능·사양/가격·권리·운영정보·활성 테마는 추가 확인 대상이다. 서버·DB 접속, 테마/시안/audit/evaluation 수정, 새 HTML/CSS/JS, Git 커밋/Push는 이번 범위에서 수행하지 않는다.

