# MetalPhoto 현재 상태 분석

작성일: 2026-10-26 (한국 시간)

## 문서 범위와 증거 구분

이 문서는 이전 대화에서 수행한 로컬 소스 조사와 공개 페이지 HTTP 조회 결과를 정리한 최초 분석 문서다. 이번 작성에서는 운영 서버에 접속하지 않았으며, 실제 화면을 시각적으로 평가하지 않았다.

- **확인:** 로컬 파일에서 읽었거나 이전 공개 HTTP 응답에서 확인한 내용.
- **제공 정보:** 사용자가 알려준 환경 및 업무 조건.
- **추정:** 근거가 있으나 검증되지 않은 해석.
- **미확인:** 현재 자료만으로 결정할 수 없는 내용.

## 개발 환경

| 항목 | 상태 | 근거 및 한계 |
|---|---|---|
| 운영 환경 | 카페24 Linux 웹호스팅 기반 WordPress | 사용자 제공 정보 |
| 운영 주소 | http://gomemo.net/ | 이전 공개 HTTP 조회 성공 |
| 작업 폴더 | `C:\MetalPhoto` | 로컬 확인 |
| 테마 원본 | `C:\MetalPhoto\themes` | 읽기 전용 다운로드 원본으로 취급 |
| 편집 환경 | VS Code 설정 폴더 존재 | `.vscode/sftp.json` 존재; 접속 정보는 문서화하지 않음 |
| 로컬 실행 환경 | 구축 미확인 | 최초 조사 당시 PHP·Git·Node.js·npm·Composer·Docker를 PATH에서 찾지 못함. 현재 설치 여부를 재확인한 결과가 아님 |
| 전체 WordPress | 미확보 | 코어·DB·전체 uploads·플러그인 소스가 확보되지 않음 |
| 버전 관리 | 최초 조사 당시 Git 저장소 없음 | 이후 상태는 별도 확인 필요 |

이전에 확인한 SFTP 설정은 저장 시 업로드와 열기 시 다운로드가 꺼져 있었다. 이 값은 향후 설정의 안전성을 보증하지 않는다. 이번 작업에서는 SFTP 도구를 사용하지 않았다.

## 기존 WordPress 구조

현재 확보된 것은 WordPress 전체 설치본이 아닌 테마 모음이다. 일반적인 표시 경로는 `header.php` → 페이지별 PHP 템플릿 → 콘텐츠 부분 템플릿 → `footer.php`이며, `functions.php`에서 CSS·JS·커스터마이저·기능 파일을 등록한다.

실제 메뉴, 본문, 위젯, 테마 설정, 추가 CSS, 쇼트코드와 첨부 이미지 정보는 DB 또는 플러그인에 존재할 수 있다. 테마 파일만으로 운영 홈페이지를 완전히 복원할 수 없다.

**활성 테마는 미확인이다.** 이전 공개 HTML에서 `/wp-content/themes/holiday/` 리소스와 `page-template-template-home-php` 클래스가 관찰되었다. 이는 Holiday 사용 정황이지만 관리자 활성 테마 정보 또는 `template`·`stylesheet` 옵션을 확인한 결과는 아니며, 부모·자식 관계를 포함한 실제 활성 구성을 확정하지 않는다.

## 테마 10개 분석

버전과 제작자는 다운로드된 `style.css`의 자기 선언이다. 공식 배포본과 동일하거나 현재 최신이라는 의미는 아니다. 모든 항목에서 실제 사용 여부는 미확인이다.

| 폴더 | 이름 / 버전 | 제작자 | 구조 및 분석 |
|---|---|---|---|
| blogrid | Blogrid 2.7 | themeeverest | 블로그형. `template-parts/content*.php`, `inc/`, `js/`, 주 스타일 `style.css`. FlexSlider·메뉴·접근성 스크립트 사용 |
| holiday | Holiday 1.2.0 | Umbrella | 숙박·예약형 복합 테마. 다수 페이지 템플릿, 내장 ACF, 게시물 유형, 예약·AJAX·쇼트코드 기능 포함 |
| masonry | Masonry 1.3.4 | devrix | 사진·게시물 그리드형. `home.php`, `content*.php`, WordPress Masonry 및 메뉴 스크립트 사용 |
| messina-blog | Messina Blog 1.0.1 | elegantblogthemes | 블로그형. 홈 템플릿에서 캐러셀·중간 섹션 분리. Bootstrap·Slick·별도 반응형 CSS 포함 |
| notes-and-photos | Notes and Photos 1.1 | Superbthemescom | `Template: blogrid`가 명시된 자식 테마. 자체 헤더·콘텐츠·스타일·커스터마이저 확장 |
| twentyfifteen | Twenty Fifteen 3.0 | the WordPress team | 사이드바 중심 클래식 PHP 테마. 일반 페이지·게시물·검색·댓글 구조 |
| twentyfourteen | Twenty Fourteen 3.2 | the WordPress team | 매거진형. 추천 콘텐츠·슬라이더·전체 너비 및 기여자 템플릿 포함 |
| twentynineteen | Twenty Nineteen 2.1 | the WordPress team | 블록 편집기 스타일을 지원하는 PHP 테마. SCSS·package.json·기존 node-sass 빌드 구성 |
| twentyseventeen | Twenty Seventeen 2.4 | the WordPress team | `front-page.php`, 다중 홈 섹션, 헤더 이미지·영상, `template-parts/` 구조 |
| twentysixteen | Twenty Sixteen 2.5 | the WordPress team | 가로 헤더·선택적 사이드바. 콘텐츠 부분 템플릿과 별도 블록·편집기 CSS |

### 전용 테마와 변경 흔적

폴더명과 조사한 PHP·CSS에서 `metalphoto`, `metal.photo`, `메탈포토`, `메탈 포토`에 대응하는 전용 코드를 발견하지 못했다. 이름을 유지한 직접 수정, DB 설정 또는 플러그인 기반 맞춤 구현은 배제할 수 없다.

Twenty Seventeen의 `functions.php.orig`, `inc/customizer.php.orig`와 현재 파일을 비교했을 때 확인된 차이는 주석·문서 표기 수준이었다. `.orig`가 공식 원본이라는 보장은 없으며 전체 테마의 무수정을 증명하지 않는다.

## 확인된 기술적 문제와 검증 과제

| 관찰 | 영향 / 검증 과제 |
|---|---|
| Holiday `functions.php`가 ACF·게시물 유형·예약 코드를 직접 include | 테마 교체 시 표시뿐 아니라 기능 등록이 사라질 가능성. 실제 데이터 사용 여부 확인 필요 |
| Holiday `includes/backend-booking.php`가 초기화 시 예약 테이블 존재를 확인하고 생성하는 코드 포함 | 단순 프론트엔드 테마로 취급 불가. 운영 DB와 분리한 로컬 복원이 필요 |
| Holiday `header.php`에 확대 제한 viewport 설정 | 접근성 개선 대상. 실제 모바일 화면 평가는 아직 수행하지 않음 |
| Holiday가 옵션의 `custom_css`, `custom_js`를 출력 | 로컬 소스 외의 디자인·동작 의존성이 존재할 수 있음 |
| Masonry `js/helpers.js`가 Sidr API 호출 | 해당 의존성이 실제 로딩되는지 로컬 실행 확인 필요 |
| Twenty Nineteen 빌드가 node-sass 기반 | 개발 도구와의 호환성 검증 필요. 이번에 빌드하지 않음 |
| 공개 메뉴에 www / 비www 주소 혼재 | 대표 도메인·리다이렉트·canonical 실측 필요. 중복 색인을 확정한 것은 아님 |
| 테마별 CSS에 반응형 규칙 존재 | 규칙 존재만 확인. 모바일 품질·실제 레이아웃 정상 동작은 미검증 |

기존 공개 응답의 버전 문자열은 실제 설치 버전과 일치하는지 확인되지 않았다. 취약점 존재나 현재 보안 상태를 이 자료만으로 단정하지 않는다.

## 근거 파일

- 각 테마 루트 `style.css`: 이름·버전·제작자·부모 선언.
- `../themes/holiday/functions.php`, `header.php`, `template-home.php`, `page.php`: 리소스·화면·옵션 연결.
- `../themes/holiday/includes/post-types.php`, `custom-fields.php`, `backend-booking.php`: 데이터 및 기능 의존성.
- `../themes/notes-and-photos/functions.php`: 부모 스타일 및 커스터마이저 확장.
- `../themes/masonry/js/helpers.js`: Sidr 호출.
- `../themes/messina-blog/page-templates/template-home.php`: 홈 부분 템플릿 연결.
- `../themes/twentynineteen/package.json`: 빌드 구성.
- 이전 공개 조사: http://gomemo.net/ 메뉴와 연결 페이지의 HTTP 응답. 상세 경로는 [요구사항](03-redesign-requirements.md)에 기록.

## 추가 확인 및 결정

1. 관리자에서 활성 테마·부모 테마·버전을 확인한다.
2. DB 복사본, 플러그인 목록 및 소스, uploads 원본의 안전한 확보 범위를 결정한다.
3. 홈 설정·페이지 템플릿 배정·메뉴·위젯·추가 CSS를 확인한다.
4. Holiday 게시물 유형·예약 기능·ACF 필드가 실제 사용되는지 확인한다.
5. 운영 화면의 PC·모바일 캡처와 주요 사용자 흐름을 확보한다.
6. 로컬 실행 방식과 테마 개발 방식을 결정한다. 현재는 기존 원본 보존과 개발 경로 분리만 확정한다.
