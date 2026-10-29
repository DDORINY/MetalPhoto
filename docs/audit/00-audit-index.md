# 공개 URL 20개 객관적 콘텐츠 조사

## 방법 및 한계

- 기준 목록: ../03-redesign-requirements.md. 각 파일에 실제 조사 시각(KST), 출처, 최종 응답 주소와 상태를 기록.
- 공개 GET만 수행. 폼 제출·로그인·운영 서버/DB 변경·테마 수정·Git 커밋/Push 없음.
- HTML 응답 소스만 조사. 브라우저 렌더링, CSS 계산, JavaScript 실행, 이미지 다운로드 및 시각 판독은 수행하지 않음.
- 등장 순서는 HTML 소스 기준이며 실제 화면 순서나 노출 여부를 보장하지 않음. 숨김 요소·중복도 원문대로 기록.
- 본문은 entity 해제 및 공백 정규화만 적용. script/style/noscript/주석 제외. 숨김 입력값·인라인 JS 원문은 보관하지 않음.
- 이미지 내용은 alt/title 원문만 기록하며 없으면 미기재로 남김. 파일명으로 제품·사진 내용을 추정하지 않음.
- 참조 리소스 URL은 로딩 성공 또는 해당 플러그인 활성의 증거가 아님.
- 원본 HTML은 별도 저장하지 않으며, 수집한 문자열의 UTF-8 SHA-256과 추출 근거를 기록. 원시 HTTP 바이트 해시는 아님.
- 전체 body 순서 기록은 구역 추출 밖 요소를 포함한 보완 근거. 정규식 추출은 브라우저 HTML 오류 복구 결과와 다를 수 있음.

| 번호 | 페이지 | HTTP / 결과 | 실제 title | 본문 이미지 참조 | 문서 |
|---|---|---|---|---|---|
| 1 | 홈 | 200 / HTML 확보 | MetalPhoto – 메탈포토 | 3 | [01-page.md](01-page.md) |
| 2 | 회사소개 / Portfolio | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 회사소개 (Portfolio) | 45 | [02-page.md](02-page.md) |
| 3 | 기술소개 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 기술소개 | 2 | [03-page.md](03-page.md) |
| 4 | 증명서 & 수상 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 증명서&수상 | 6 | [04-page.md](04-page.md) |
| 5 | 추모용 메탈포토 전체 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 추모용 메탈포토 (Memorial Photo) | 6 | [05-page.md](05-page.md) |
| 6 | 모던 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 모던 8제품 | 16 | [06-page.md](06-page.md) |
| 7 | 스페셜 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 스페셜 8제품 | 16 | [07-page.md](07-page.md) |
| 8 | VIP폴 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » VIP 폴 6제품 | 15 | [08-page.md](08-page.md) |
| 9 | 위패 / 스탠드 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 위패/스탠드 | 19 | [09-page.md](09-page.md) |
| 10 | 앵글 — 상단 / 하단형 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 앵글 8제품 | 16 | [10-page.md](10-page.md) |
| 11 | 자연장 / 수목장 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 자연장, 수목장 14제품 | 20 | [11-page.md](11-page.md) |
| 12 | 기록물 / 기념물 전체 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 메탈포토 기록물·기념물 (Metal Records) | 3 | [12-page.md](12-page.md) |
| 13 | 상패 / 감사패 / 수료증 / 기념액자 및 선물 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 상패, 감사패, 수료증, 기념액자 및 선물 (certificate, gift) | 11 | [13-page.md](13-page.md) |
| 14 | 명예의전당 / 정부조달 / 인테리어 / 엘리베이터도어 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 명예의전당, 정부조달, 인테리어, 엘리베이터 도어 (government, interior decoration, elevator door) | 10 | [14-page.md](14-page.md) |
| 15 | 전시 / 기념관 / 박물관 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 전시, 기념관, 박물관 (memorial hall) | 12 | [15-page.md](15-page.md) |
| 16 | 신제품 / R&D | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 신제품 / R&D (Innovation) | 1 | [16-page.md](16-page.md) |
| 17 | 테마파크 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 테마파크 (theme park) | 7 | [17-page.md](17-page.md) |
| 18 | 오시는길 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 오시는길 | 0 | [18-page.md](18-page.md) |
| 19 | 주문하기 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » 주문하기 | 0 | [19-page.md](19-page.md) |
| 20 | 문의하기 | 200 / HTML 확보 | MetalPhoto – 메탈포토 » qu | 0 | [20-page.md](20-page.md) |

## 공통 영역 문자열 비교

원문 문자열이 같은 경우만 묶었다. 차이는 현재 메뉴 상태 클래스·공백 때문일 수도 있으므로 다른 디자인이라고 해석하지 않는다.
- 헤더 동일 그룹: 1, 6, 7, 8, 10, 11, 13, 14, 15, 19, 20 / SHA-256 09080cf3308c5b600c52e734229fa09900c4ea077b1f1ad46cc32ad53e164fcb
- 헤더 동일 그룹: 2 / SHA-256 ffc8267311ce028869b0f2fe2a53d86527843ed9baa9e0940d0e5f845925638c
- 헤더 동일 그룹: 3 / SHA-256 18d7f86381207f833bd5c195b7f8d85eb6ee64a64a24d587974450c9d61b03ed
- 헤더 동일 그룹: 4 / SHA-256 840ae1fe01bd374d5fd0aa167d4279d1e9ae8124a5af2c82a714c109a31da443
- 헤더 동일 그룹: 5 / SHA-256 d7b8e6b209550a80ef3cf1731890cddb9ec9abeddb5a726cca090b73e2e2f7ff
- 헤더 동일 그룹: 9 / SHA-256 78d7f5eddc7ff3e07abbfc41aaec6fa814895404e1de79994bb02ef886b7d6fb
- 헤더 동일 그룹: 12 / SHA-256 9e90a46a86e2d25b22fc5d8297777f1e86d3b929642d144b6f5d071aea865ebb
- 헤더 동일 그룹: 16 / SHA-256 5da87632581f8fdf9ad2b4732e59201b7a66cc0b79e3567e7a6509182ca55940
- 헤더 동일 그룹: 17 / SHA-256 52eb4da19b81e5754a091165399cc1140499bf95d8a9609bf4631a827850d5ff
- 헤더 동일 그룹: 18 / SHA-256 0734a2de208d5679a73b9c24ce4dbee97576a38778cc7ed8b5bfcc8be76d4aff
- 푸터 동일 그룹: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 / SHA-256 95577f214b00f3dfbd01bf04d95b354d26943b6962f81195d9b7ef5e65a0af1f

## 후속 평가 단계에 필요한 자료

- PC·모바일 브라우저 캡처와 뷰포트·조사 시각·최종 URL 기록.
- 이미지 실제 내용과 이미지 내 텍스트 확인, 원본 이미지 및 로딩 결과.
- CSS 계산·숨김 상태·JS 실행, 메뉴·슬라이더·갤러리·문의/주문 화면 동작 확인.
- 접수·메일·첨부 등 상태 변경 시험은 별도 승인된 격리 환경에서 수행.
- 평가 의견은 후속 docs/evaluation/에 작성. 이번에는 평가·제안·HTML 미리보기를 생성하지 않음.
