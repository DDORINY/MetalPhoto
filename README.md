# MetalPhoto WordPress Redesign

카페24 Linux 웹호스팅에서 운영 중인 메탈포토 WordPress 홈페이지의 프론트엔드 리디자인 프로젝트입니다.

- 운영 홈페이지: http://gomemo.net/
- 저장소: https://github.com/DDORINY/MetalPhoto
- 기본 브랜치: `main`

## 목적

기존 콘텐츠·URL·게시판·문의 및 서버 기능을 보존하면서 CSS, PHP 템플릿, 페이지 구성과 반응형 UI/UX를 개선합니다. 현재 단계는 조사 및 기획이며 실제 활성 테마와 콘텐츠 의존성은 추가 확인이 필요합니다.

## 문서

1. [현재 상태 분석](docs/01-current-state-analysis.md)
2. [테마 아키텍처 평가](docs/02-theme-architecture-evaluation.md)
3. [리디자인 요구사항](docs/03-redesign-requirements.md)
4. [개발 로드맵](docs/04-development-roadmap.md)
5. [위험 및 의존성](docs/05-risks-and-dependencies.md)

## 개발 원칙

- `themes/`는 다운로드한 원본이며 수정하거나 커밋하지 않습니다.
- 운영 서버·DB와 분리된 환경에서 개발합니다.
- FTP/SFTP를 통한 운영 파일 업로드·수정·삭제를 하지 않습니다.
- 운영 배포는 별도 명시적 승인 후 진행합니다.
- 확인된 사실·추정·미확인을 구분하고 활성 테마를 임의로 확정하지 않습니다.
- DB 덤프·백업·uploads·접속 설정·비밀번호·인증키·토큰·개인정보를 커밋하지 않습니다.
- 스테이징 파일을 명시적으로 선택하고 커밋 전 내용과 민감정보를 검토합니다. `.gitignore`만으로 모든 비밀정보를 탐지할 수는 없습니다.
- 기존 원격 기록을 보존하며 force push를 사용하지 않습니다.

이 저장소는 문서와 향후 개발 소스를 관리합니다. WordPress 전체 실행본, 운영 데이터 또는 이미지 원본을 포함하지 않습니다.
