# Google·네이버 검색 등록 체크리스트

코드 배포가 끝난 뒤 계정 권한이 있는 사용자가 직접 진행해야 합니다.

## Google Search Console

- [ ] 속성 추가: `https://cxtoax.vercel.app`
- [ ] HTML 태그 방식 인증값을 Vercel 환경변수 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`에 입력
- [ ] 재배포 후 소유권 확인
- [ ] Sitemaps 메뉴에 `sitemap.xml` 제출
- [ ] URL 검사에서 홈페이지 색인 요청
- [ ] URL 검사에서 `/marketing-h2-2026` 색인 요청
- [ ] 강사 프로필과 대표 과정 3개 색인 요청
- [ ] 페이지 색인 생성 보고서에서 `크롤링됨 - 현재 색인 생성되지 않음`, canonical, robots 오류 확인

## 네이버 서치어드바이저

- [ ] 사이트 등록
- [ ] HTML 태그 인증값을 Vercel 환경변수 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`에 입력
- [ ] 재배포 후 소유 확인
- [ ] 요청 → 사이트맵 제출: `https://cxtoax.vercel.app/sitemap.xml`
- [ ] 요청 → 웹 페이지 수집에서 주요 URL 요청
- [ ] 검증 → robots.txt 확인
- [ ] 콘텐츠 노출/진단에서 제목·설명 중복 확인

## 배포 직후 URL 확인

- [ ] `https://cxtoax.vercel.app/robots.txt`
- [ ] `https://cxtoax.vercel.app/sitemap.xml`
- [ ] `https://cxtoax.vercel.app/llms.txt`
- [ ] `https://cxtoax.vercel.app/og-image.png`
