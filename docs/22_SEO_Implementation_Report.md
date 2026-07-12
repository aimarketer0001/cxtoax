# CX to AX SEO 적용 결과

## 1. 프로젝트 분석 결과

- 프레임워크: Next.js 15.5.x, React 19
- 라우팅 방식: App Router와 `public/index.html` 정적 홈 혼합 구조
- TypeScript: 사용
- 루트 페이지: `next.config.mjs` rewrite로 `/` 요청을 `public/index.html`에 연결
- 기존 메타데이터: `app/layout.tsx`, `app/marketing-h2-2026/page.tsx`, `public/index.html`
- 배포 설정: `vercel.json`에서 Next.js 프레임워크와 `npm run build:vercel` 사용
- 루트 404 상태: 배포 URL과 로컬 프로덕션 서버 모두 `/` 200 응답
- 기존 SEO 상태: 홈 정적 HTML에는 일부 OG 메타가 있었으나 canonical, robots, JSON-LD, 독립 섹션 URL, sitemap, robots route가 부족했음

## 2. 변경한 파일

| 파일 | 변경 내용 |
|---|---|
| `lib/site.ts` | 사이트 URL, 기본 SEO 문구, 공개 라우트, JSON-LD 공통 상수 추가 |
| `app/layout.tsx` | 기본 metadata, canonical, robots, OG, Twitter, 인증 환경변수 연결 |
| `app/robots.ts` | 검색엔진 크롤링 허용 및 관리자/API 제외 설정 |
| `app/sitemap.ts` | 실제 공개 URL 기반 sitemap 생성 |
| `app/profile/page.tsx` | AX 전문강사 프로필 독립 페이지 추가 |
| `app/courses/page.tsx` | AI·AX 실무 교육 과정 독립 페이지 추가 |
| `app/portfolio/page.tsx` | AI·CRM 프로젝트 및 강의 포트폴리오 페이지 추가 |
| `app/insights/page.tsx` | CRM·AI·AX 인사이트 페이지 추가 |
| `app/contact/page.tsx` | 기업 교육 및 강의 문의 페이지 추가 |
| `app/diagnosis/layout.tsx` | 진단 페이지 고유 메타데이터와 canonical 추가 |
| `app/result/layout.tsx` | 개인 진단 결과 페이지 noindex 명시 |
| `app/admin/layout.tsx` | 관리자 영역 noindex 명시 |
| `app/marketing-h2-2026/page.tsx` | 리포트 페이지 canonical, OG, Twitter 보강 |
| `public/index.html` | canonical, robots, OG/Twitter, JSON-LD, 내부 링크 보강 |
| `public/og-image.png` | 1200 x 630 규격의 Open Graph 대표 이미지 추가 |
| `components/MarketingHeader.tsx` | 주요 메뉴를 독립 공개 URL로 연결 |
| `components/ServiceHeader.tsx` | 교육 과정/문의 링크를 독립 공개 URL로 연결 |
| `.env.example` | 사이트 URL 및 Google/Naver 인증 환경변수 추가 |
| `.env.free.example` | 무료 배포 예시 환경변수 추가 |

## 3. 적용한 항목

- 루트 URL 200 응답 확인
- 공개 페이지별 title, description, canonical 적용
- `robots.txt` 생성
- `sitemap.xml` 생성
- 공개 페이지 index/follow, 관리자/결과 페이지 noindex 분리
- Open Graph 및 Twitter Card 적용
- 1200 x 630 PNG Open Graph 이미지 적용
- Google/Naver 소유권 인증값 환경변수 연결
- `WebSite`, `Person`, `Course`, `BlogPosting` JSON-LD 적용
- 해시 기반 섹션 일부를 독립 URL로 분리
- 내부 링크를 의미 있는 공개 URL로 보강

## 4. 테스트 결과

- TypeScript: `npx tsc --noEmit` 통과
- Lint: `npm run lint` 통과
- Unit test: `npm test` 통과, 5 files / 32 tests
- Build: `DATABASE_URL=postgresql://user:pass@localhost:5432/db npm run build:vercel` 통과
- 로컬 프로덕션 URL 확인:
  - `/` 200
  - `/robots.txt` 200
  - `/sitemap.xml` 200
  - `/profile` 200
  - `/courses` 200
  - `/portfolio` 200
  - `/insights` 200
  - `/contact` 200
  - `/diagnosis` 200
  - `/marketing-h2-2026` 200
- 홈 HTML 확인:
  - `lang="ko"` 존재
  - `<title>` 존재
  - `meta description` 존재
  - canonical 존재
  - `meta robots` 존재
  - Open Graph 존재
  - Twitter Card 존재
  - JSON-LD 존재
  - 주요 `h1` 1개

## 5. Vercel에서 사용자가 해야 할 작업

1. Production Branch가 실제 운영 브랜치와 일치하는지 확인
2. `cxtoax.vercel.app` 도메인이 현재 프로젝트에 연결되어 있는지 확인
3. Deployment Protection이 운영 도메인을 막지 않는지 확인
4. Production 환경변수 등록
   - `NEXT_PUBLIC_SITE_URL=https://cxtoax.vercel.app`
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `ADMIN_AUTH_SECRET`
5. 재배포 후 `/robots.txt`, `/sitemap.xml` 200 응답 확인

## 6. 검색엔진 등록 후속 작업

1. Google Search Console에 `https://cxtoax.vercel.app` 등록
2. Google 소유권 인증값을 Vercel 환경변수에 등록 후 재배포
3. `https://cxtoax.vercel.app/sitemap.xml` 제출
4. 홈페이지 URL 검사 및 색인 요청
5. 네이버 서치어드바이저에 사이트 등록
6. 네이버 소유권 인증값을 Vercel 환경변수에 등록 후 재배포
7. 네이버에 sitemap 제출 및 수집 요청

## 7. 추가 개선 권장사항

- `/contact`에서 홈 폼으로 이동하는 구조를 향후 React 폼 컴포넌트로 통합하면 전환 추적과 접근성이 더 좋아짐
- 인사이트 글이 늘어나면 `/insights/[slug]` 구조로 분리해 Article JSON-LD를 확장하는 것이 좋음
