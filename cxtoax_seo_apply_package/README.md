# CX to AX 검색·AI 노출 개선 적용 패키지

대상 사이트: `https://cxtoax.vercel.app`

## 먼저 적용할 순서

1. `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/og-image.png`를 프로젝트의 공개 정적 파일 폴더에 반영합니다.
2. 프로젝트가 Next.js App Router라면 `nextjs-app-router` 폴더의 코드를 현재 구조에 맞춰 병합합니다.
3. 프로젝트가 React/Vite SPA라면 `react-vite` 폴더의 코드를 현재 구조에 맞춰 병합합니다.
4. 대표 교육 과정 3개를 고유 URL로 노출합니다.
5. 배포 후 `/robots.txt`, `/sitemap.xml`, 대표 과정 URL이 HTTP 200인지 확인합니다.
6. Google Search Console과 네이버 서치어드바이저에 사이트맵을 제출하고 색인을 요청합니다.

## 권장 공개 URL

- `/`
- `/marketing-h2-2026`
- `/instructor/jeon-seonhee`
- `/courses/crm-ai-automation`
- `/courses/customer-service-generative-ai`
- `/courses/sales-ai-automation`

## 중요

- `public/robots.txt`와 Next.js의 `app/robots.ts`를 동시에 사용하지 마세요. 프로젝트 방식에 맞는 하나만 선택합니다.
- `public/sitemap.xml`과 Next.js의 `app/sitemap.ts`도 하나만 선택합니다.
- React/Vite에서 경로별 HTML이 모두 같은 `index.html`로만 제공되면 검색엔진이 페이지별 메타데이터를 안정적으로 받지 못할 수 있습니다. 가능하면 SSR/SSG 또는 프리렌더링을 적용합니다.
- Google·네이버 소유권 인증값은 소스에 직접 기록하지 않고 환경변수로 관리합니다.
