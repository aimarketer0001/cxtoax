# 현재 사이트 진단 요약

점검일: 2026-07-22
대상: https://cxtoax.vercel.app

## 확인된 장점

- 메인 콘텐츠가 이미지가 아닌 HTML 텍스트로 읽힙니다.
- 강사 전문성, 프로젝트 사례, 교육 과정, FAQ가 충분히 제공됩니다.
- `/marketing-h2-2026` 독립 리포트 페이지가 존재합니다.
- 대표 과정의 상세 커리큘럼 내용 자체는 이미 충분합니다.

## 우선 개선 항목

1. `robots.txt`, `sitemap.xml`의 정상 응답 여부를 보장합니다.
2. 대표 과정 상세 콘텐츠를 홈페이지 내부 화면 전환이 아니라 고유 URL로 분리합니다.
3. 페이지별 고유 `title`, `description`, canonical, Open Graph를 적용합니다.
4. `WebSite`, `Person`, `Course`, `Article`, `BreadcrumbList` JSON-LD를 적용합니다.
5. 사이트 소유권 인증을 환경변수로 받을 수 있게 준비합니다.
6. 검색 콘솔에서 직접 색인을 요청합니다.

## 대표 과정 URL 제안

| 과정 | URL |
|---|---|
| AI로 고객관리(CRM) 업무 자동화하기 | `/courses/crm-ai-automation` |
| 고객 상담 업무에 생성형 AI 적용하기 | `/courses/customer-service-generative-ai` |
| 영업 실무자를 위한 AI | `/courses/sales-ai-automation` |
