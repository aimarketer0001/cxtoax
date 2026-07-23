# CX to AX SEO 개선 실제 반영 프롬프트

현재 프로젝트의 배포 주소는 `https://cxtoax.vercel.app`이다.

## 목표

기존 디자인과 기능을 유지하면서 검색엔진과 AI 검색 서비스가 사이트를 쉽게 수집·이해·인용할 수 있도록 기술 SEO와 콘텐츠 URL 구조를 개선한다.

## 반드시 먼저 확인할 항목

- 프레임워크와 버전
- Next.js App Router / Pages Router / React Vite 여부
- 현재 라우트 목록
- 홈페이지 대표 과정의 상세보기가 상태 기반 화면 전환인지 실제 URL인지
- 기존 robots, sitemap, noindex, canonical, Open Graph, JSON-LD
- 빌드 명령과 Vercel Output Directory
- 현재 배포 브랜치

## 적용 순서

### 1. 크롤링 기반
- `/robots.txt`가 200으로 응답하게 한다.
- 모든 공개 페이지를 허용한다.
- `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot` 접근을 허용한다.
- sitemap 주소를 명시한다.
- `/sitemap.xml`이 200으로 응답하게 한다.
- 실제 존재하는 공개 URL만 sitemap에 넣는다.

### 2. 공통 메타데이터
- 사이트명: CX to AX
- 기본 제목: `CX to AX | CRM·AI·AX 실무 교육 및 컨설팅`
- 기본 설명: `CRM·Salesforce 컨설팅 경험을 바탕으로 기업과 실무자를 위한 AI·AX 전환 교육, 생성형 AI 활용 교육, CRM 업무 자동화 교육을 제공합니다.`
- 언어: `ko-KR`
- canonical, robots index/follow, Open Graph, Twitter Card를 적용한다.
- `public/og-image.png`를 공유 이미지로 사용한다.

### 3. 대표 과정 고유 URL
홈페이지에 이미 존재하는 상세 콘텐츠를 재사용해 다음 URL을 만든다.

- `/courses/crm-ai-automation`
- `/courses/customer-service-generative-ai`
- `/courses/sales-ai-automation`

홈페이지의 `상세 커리큘럼 보기` 버튼은 위 URL을 가리키는 실제 링크로 변경한다. 기존 모달이나 상태 기반 상세 화면은 삭제하지 않아도 되지만, 검색용 대표 URL은 반드시 별도로 존재해야 한다.

### 4. 강사 프로필 고유 URL
- `/instructor/jeon-seonhee`
- 기존 홈페이지의 강사 소개·경력·전문 분야를 재사용한다.
- 개인 전화번호, 개인 이메일, 주소는 JSON-LD에 포함하지 않는다.

### 5. 구조화 데이터
- 홈페이지: `WebSite`, `Organization`, `Person`
- 강사 프로필: `ProfilePage`, `Person`
- 과정 상세: `Course`, `BreadcrumbList`
- `/marketing-h2-2026`: `Article`, `BreadcrumbList`
- 화면의 실제 정보와 JSON-LD가 일치해야 한다.

### 6. 사이트 인증 환경변수
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`
- `NEXT_PUBLIC_SITE_URL`
- 값이 비어 있으면 빈 인증 태그를 출력하지 않는다.

### 7. 내부 링크
- 홈페이지 → 강사 프로필
- 홈페이지 → 각 과정
- 과정 → 상담
- 인사이트 → 관련 과정
- 링크 텍스트는 `자세히 보기` 대신 과정명을 포함한다.

### 8. 검증
- 프로덕션 빌드를 실행한다.
- 다음 주소가 모두 200인지 확인한다.
  - `/`
  - `/robots.txt`
  - `/sitemap.xml`
  - `/marketing-h2-2026`
  - `/instructor/jeon-seonhee`
  - 대표 과정 3개
- 페이지당 h1 하나를 원칙으로 한다.
- canonical이 자기 URL을 가리키는지 확인한다.
- JSON-LD 구문 오류가 없는지 확인한다.
- 모바일 메뉴와 기존 상담 폼이 정상 작동하는지 회귀 테스트한다.

## 참고 파일

이 패키지의 다음 파일을 현재 프로젝트 구조에 맞춰 병합한다.

- `public/`
- `nextjs-app-router/` 또는 `react-vite/`
- `SEARCH_CONSOLE_CHECKLIST.md`

프레임워크가 다르면 코드를 그대로 복사하지 말고 동일한 결과가 나오도록 현재 구조에 맞춰 구현한다.
