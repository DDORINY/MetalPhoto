# PHASE D 검증·차이·파일 목록

작성일: 2026-10-29 (KST). 모든 화면 미승인. 실제 WordPress 개발·운영 배포와 무관한 정적 프로토타입이다.

## 결과

- 허브 1개 + pages/의 페이지별 HTML 20개 생성.
- HTML 20개는 PHASE A의 실제 텍스트 노드와 이미지 참조를 개별 하단 자료 기록에 보존한다. 태그/배치/새 제목/요약은 시안이며 원문을 대체하는 운영 확정안이 아니다.
- CSS 1개·동작 JS 1개·임시 SVG 3개. 외부 웹폰트·분석·라이브러리·이미지 자동 요청 없음.
- 실제 이미지의 내용·사용 허가가 미확인이라 임시 이미지 사용. 원본 링크를 직접 클릭하면 외부 주소로 이동한다.
- 기존 문서·테마·시안은 SHA-256 집계 기준 변경 없음. Git·운영 서버·DB 접속/변경 없음.

## 실제 브라우저 검증

설치된 Windows Chrome 헤드리스, file:// 및 로컬 파일 접근 허용 모드에서 qa/verify.html 실행. qa/browser-results.json에 결과를 보존한다.

- 390px 및 1280px iframe 내부 뷰포트에서 20개 모두 로딩: 361개 assertion 통과, 실패 0, 수집된 실행 오류 0.
- 스크립트 준비, H1 1개, 로컬 이미지 로딩, 본문 18px 이상, 가로 넘침 없는지 검사.
- 390px 메뉴 열림·첫 링크 포커스·Escape 닫기·토글 복귀 확인.
- 갤러리가 있는 페이지에서 모달 열기·다음·닫기·트리거 포커스 복귀 확인. 닫기 이벤트의 포커스 복귀 문제는 명시적 복귀로 보완 후 재검증.
- P19 비전송 주문 단계, P20 빈 입력 오류·테스트 값 입력 확인·실패 예시·입력 지우기 확인.
- 허브 필터(추모용 7개)·검토 표시(승인 저장 아님) 확인.
- P06 320px 리플로우와 780px 프레임에서 루트 글꼴 200% 확대 시 가로 넘침 검사 통과. **실제 브라우저 200% zoom 전체 검증과 다르다.**
- 홈 넓은 창 캡처 qa/home-desktop.png 및 390px iframe 캡처 qa/home-mobile-390.png를 시각 확인. 창 폭 스크린샷은 Chrome 최소 viewport/캡처 폭 차이가 있어, 모바일 근거는 390px iframe 캡처를 사용한다.

자동 검사는 DOM 이벤트/속성과 소스 경로 확인이며 모든 키 입력이 실사용자 입력은 아니다. 테스트 과정은 실제 개인정보·접수·첨부 발송 없이 수행했다.

## 코드상 검증

- 원래 요구사항의 20개 정확한 URL을 page-map.json 및 각 페이지에 대응.
- 허브/20페이지의 상대 href/src·앵커·공통 CSS/JS·로컬 이미지 경로 검사.
- 실제 form 태그·운영 action·mailto 실행 링크·네트워크 요청 API·영구 저장 API 미사용. CSP는 connect-src none, form-action none으로 추가 제한.
- 모든 문의 버튼 type=button이며 엔터로 기본 form 전송이 발생하지 않는 role=form 입력 영역이다.
- 기존 docs/design/themes 해시 집계는 작업 전후 동일.

## 아직 검증하지 않은 항목

실제 iOS/Android·Safari/Firefox/Edge, VoiceOver/TalkBack, 실제 브라우저 200/400% 확대 전체 화면, 모든 Tab 이동·실제 마우스/터치 조작, 자동복사 성공(브라우저 권한 필요), 모든 색상 상태의 대비·반응형 경우의 수, 제품/증빙 사진 실물, 실제 주문·메일·플러그인 처리. 정상이라고 단정하지 않는다. 문의 JPG 선택은 파일명 형식만 모의 검사하며 실제 파일 내용·업로드 보안 검사가 아니다.

## PHASE C와의 차이 및 이유

| 항목 | 현재 미리보기 | 이유·컨펌 필요 |
|---|---|---|
| 파일 위치 | preview/pages/01-page.html ~ 20-page.html | 사용자 TASK 2 구조를 우선. C의 preview/01-page.html 후보와 위치만 다름 |
| 원본 사진·갤러리 | 대부분 첫 3개 참조에 임시 이미지, P16은 1개 | 사용권·내용·모델 대응 미확인. 모든 이미지 출처 목록은 보존 |
| 회사/모델/사례 요약 | 확인 필요 영역과 고유한 페이지 목적·원문을 함께 표시 | 실제 실적·사양·가격을 임의 생성하지 않음 |
| 연락 행동 | 주소·주문 양식 복사, 이메일 단계는 비전송 안내 | 실제 메일·전화 실행·문의 전송을 연결하지 않는 범위 |
| 문의 입력 | 여러 줄 문의 후보, 시연용 필수 검사·JPG 선택·모의 결과 | 운영의 필수 여부·제한·결과문 미확인. 실제 승인 규칙으로 취급 금지 |
| 로고·회사정보 | 임시 문자 로고, 기존 연락처 인용·최신성 확인 표시 | 공식 로고·사업자·개인정보 정책 미확보 |
| 메뉴 | 1200px부터 가로 메뉴·명시적 하위 그룹, 그 미만 전체 메뉴 | C 후보를 구현한 것이며 최종 승인값 아님 |
| 승인 표시 | AP01~AP11 메모용 체크, 새로고침 초기화 | 영구 저장·실제 승인 기능 아님 |
| 원문 | 페이지 하단 펼침 기록 | 원문 보존/추적을 위한 내부 검토 UI이며 최종 고객용 배치 미확정 |

## 컨펌 필요

AP01~AP11 모두 미승인이다. 메뉴명·페이지 순서·브랜드·타이포·버튼·갤러리·하단바·운영 연락처·정책·사양/사진·기술 주장·주문/문의 역할을 검토해야 한다. 실사이트 콘텐츠가 추가 확보되면 이미지 판독·문구 검증을 거쳐 별도 수정한다.

## 20개 페이지 대응표

| 번호 | 페이지 | 미리보기 | 기존 URL |
|---|---|---|---|
| 01 | 홈 | [pages/01-page.html](pages/01-page.html) | http://gomemo.net/ |
| 02 | 회사소개 · 포트폴리오 | [pages/02-page.html](pages/02-page.html) | http://gomemo.net/about/ |
| 03 | 기술소개 | [pages/03-page.html](pages/03-page.html) | http://gomemo.net/introduce/ |
| 04 | 증명서 · 수상 | [pages/04-page.html](pages/04-page.html) | http://gomemo.net/improve_price/ |
| 05 | 추모용 메탈포토 | [pages/05-page.html](pages/05-page.html) | http://gomemo.net/modern/ |
| 06 | 모던 | [pages/06-page.html](pages/06-page.html) | http://www.gomemo.net/room/modern2/ |
| 07 | 스페셜 | [pages/07-page.html](pages/07-page.html) | http://www.gomemo.net/room/special1/ |
| 08 | VIP폴 | [pages/08-page.html](pages/08-page.html) | http://www.gomemo.net/room/vip1/ |
| 09 | 위패 · 스탠드 | [pages/09-page.html](pages/09-page.html) | http://gomemo.net/room/t-1/ |
| 10 | 앵글 | [pages/10-page.html](pages/10-page.html) | http://gomemo.net/room/%ed%94%84%eb%a6%ac%eb%af%b8%ec%97%84-%ec%95%b5%ea%b8%80/ |
| 11 | 자연장 · 수목장 | [pages/11-page.html](pages/11-page.html) | http://www.gomemo.net/room/nature/ |
| 12 | 기록물 · 기념물 | [pages/12-page.html](pages/12-page.html) | http://gomemo.net/metalphoto/ |
| 13 | 상패 · 감사패 · 기념품 | [pages/13-page.html](pages/13-page.html) | http://www.gomemo.net/room/certification/ |
| 14 | 정부조달 · 인테리어 | [pages/14-page.html](pages/14-page.html) | http://www.gomemo.net/room/government/ |
| 15 | 전시 · 기념관 · 박물관 | [pages/15-page.html](pages/15-page.html) | http://www.gomemo.net/room/memorial-hall/ |
| 16 | 신제품 · R&D | [pages/16-page.html](pages/16-page.html) | http://gomemo.net/%ec%8b%a0%ec%a0%9c%ed%92%88-%ec%97%b0%ea%b5%ac%ea%b0%9c%eb%b0%9c/ |
| 17 | 테마파크 | [pages/17-page.html](pages/17-page.html) | http://gomemo.net/room/테마파크-theme-park/ |
| 18 | 오시는길 | [pages/18-page.html](pages/18-page.html) | http://gomemo.net/contact/ |
| 19 | 주문 방법 | [pages/19-page.html](pages/19-page.html) | http://www.gomemo.net/order_question/ |
| 20 | 문의하기 | [pages/20-page.html](pages/20-page.html) | http://www.gomemo.net/room/qu/ |

## 실제 파일 목록

- index.html
- pages/01-page.html ~ pages/20-page.html (위 표의 20개 파일)
- assets/css/preview.css
- assets/js/preview.js
- assets/images/product-placeholder.svg
- assets/images/project-placeholder.svg
- assets/images/document-placeholder.svg
- page-map.json
- README.md, VALIDATION.md
- qa/verify.html, qa/verify.js: 로컬 브라우저 QA 도구
- qa/mobile-snapshot.html: 390px 캡처용 iframe
- qa/browser-results.json, qa/browser-results.html: 자동 검사 근거
- qa/home-desktop.png, qa/home-mobile-390.png: 대표 렌더링 근거

## 실행

preview/index.html을 브라우저에서 열면 된다. 서버/패키지 설치 없이 동작한다. 파일 묶음 전체를 유지해야 한다. PC 파일 경로로 휴대폰 접속은 불가능하므로 실기기 테스트는 폴더 복사 또는 별도 허용된 로컬 서버가 필요하다.

