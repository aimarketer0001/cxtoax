# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

수강 전 역량 진단(20문항) 후 30개 교육 과정 중 1~3순위를 추천하는 Next.js 15(App Router, TypeScript) 서비스.
추천 결정은 규칙 기반 엔진(`lib/domain/*` 순수 함수)이 수행하고, AI(LLM)는 리포트 문장화에만 사용하며
실패 시 항상 규칙 리포트로 fallback한다. 마케팅 랜딩 + 진단 + 결과 + 관리자 대시보드가 한 앱이다.

## 명령어

```bash
npm run dev                          # 개발 서버 (localhost:3000)
npm test                             # Vitest 전체 (32개)
npx vitest run tests/scoring.test.ts # 단일 테스트 파일
npx tsc --noEmit                     # 타입체크 (별도 스크립트 없음)
npm run lint                         # ESLint
npm run build                        # 로컬 빌드 검증용 (Vercel 배포 빌드는 build:vercel)
```

## DB / 배포 (핵심 주의사항)

- **운영 DB는 Supabase(Postgres) 단일**이며 배포는 Vercel(`cxtoax.vercel.app`)이 유일한 환경.
  Vercel은 서버리스라 SQLite 파일 DB를 쓸 수 없다. 로컬 `.env`도 Supabase를 가리키는 것이 기준 구성.
- 구 주소 `cxtoax.netlify.app`은 Vercel로 301 포워딩만 한다(`netlify-redirect/` 참조). Netlify에 사이트를 다시 배포하지 않는다.
- 스키마는 둘: `prisma/schema.free.prisma`(Postgres, **운영 기준** — Vercel 빌드 `scripts/vercel-build.mjs`가 사용)와
  `prisma/schema.prisma`(SQLite, 오프라인 개발 대비용). **모델 변경 시 두 스키마를 함께 수정.**
- 현재 환경에서 `db:push`·`db:seed`·`setup`(SQLite용)은 실패한다. `:free` 접미사 변형(`db:push:free` 등)이
  맞는 명령이지만 **원격 Supabase DB를 변경하므로 사용자 확인 없이 실행 금지.**
- 배포 절차: @docs/21_Free_Deployment_Guide.md

## 프로젝트 구조

- `app/` — 페이지 + API Routes. `/`는 `next.config.mjs` rewrite로 `public/index.html`(정적 마케팅 랜딩)을 서빙 — React 페이지가 아니므로 랜딩 수정은 `public/index.html`에서.
- `lib/domain/` — 점수(scoring)·유형 분류(classification)·추천(recommendation)·리포트(report)·마스킹(privacy). DB/AI 의존 없는 순수 함수. 테스트 대상은 전부 여기.
- `lib/domain/questionConfig.ts` / `courseMeta.ts` — 문항 옵션·배점·추천 태그. 문항/과정 텍스트의 단일 소스는 `data/*.seed.json`.
- `lib/site.ts` — 사이트 URL·SEO 메타 중앙 관리 (`app/robots.ts`, `app/sitemap.ts`가 참조).
- `lib/auth.ts` — 관리자 인증(HMAC 서명 세션 쿠키). Admin API는 이 인증 필수.
- `app/marketing-h2-2026/` — 하반기 마케팅 전략 보고서 마이크로사이트(유지 대상). 정의: @docs/20_Marketing_Microsite_Service_Definition.md

## 문서 (docs/)

- **구현 기준 문서**: 00~17 (규칙·PRD·요구사항·아키텍처·기능·UI·API·DB·프롬프트·에이전트·워크플로·디자인·테스트·보안·배포·운영·AI평가·개발가이드), 20(마이크로사이트 정의), 21(무료 배포 가이드). 자주 쓰는 것: API 스펙 @docs/06_API.md, 테스트 시나리오 @docs/12_Test.md, AI 리포트 원칙 @docs/08_Prompt.md
- **이력용(구현 기준 아님)**: 18, 19, 22, codex_predeploy_review_prompt.md, vibe_prompt_*.md — 일회성 실행 프롬프트·분석/결과 보고. 참고만 하고 규칙으로 삼지 않는다.

## 작업 규칙

- 코드 변경 후 `npx tsc --noEmit`과 `npm test` 실행. dev 서버 실행 중에는 `npm run build` 금지(`.next` 손상) — 검증은 tsc/vitest로.
- 요청받지 않은 리팩터링 금지, 최소 변경 원칙.
- 논리 단위별로 커밋 분리. **커밋 메시지는 한글**로 작성.
- 두 접근이 모두 타당하면 임의 결정하지 말고 양쪽 설명 후 질문.
- 의존성 추가는 제안 후 승인받고 설치. 현재 런타임 의존성은 next/react/prisma뿐 — 이 최소 구성을 유지한다.
- docs에 없는 기능을 임의로 추가하지 않는다 (docs/00_Project_Rules.md).

## 코딩 컨벤션

- 점수·분류·추천 로직은 UI/API에서 분리해 `lib/domain/`에 순수 함수로 작성. 예시: `lib/domain/scoring.ts`
- AI(LLM) 호출은 서버 측에서만. AI 입력은 개인정보 마스킹(`lib/domain/privacy.ts`)을 거치고, 출력은 스키마·추천 일치·개인정보 검사를 통과해야 채택(`lib/domain/aiReport.ts`).
- 문항·과정 데이터 변경은 `data/*.seed.json` + `questionConfig.ts`/`courseMeta.ts`에서. DB에 직접 하드코딩하지 않는다.

## 테스트

- Vitest, `tests/*.test.ts`, node 환경. 도메인 순수 함수 단위 테스트만 존재(컴포넌트/E2E 없음).
- 도메인 로직 변경 시 해당 테스트 파일을 함께 갱신. 추천 로직은 docs/12_Test.md의 5개 시나리오를 기준으로.

## 금지 사항

- `.env`·`.env.*`(example 제외) 읽기/커밋 금지. 환경변수 키 이름은 `.env.example`에만 추가.
- 원격 DB를 변경하는 명령(`db:push:free`, `db:seed:free`, `setup:free`, `deploy:db:free`) 사용자 확인 없이 실행 금지.
- 진단 기본 입력에 이름·전화·이메일·주소 등 직접 식별 정보 추가 금지. 자유 입력값은 저장/AI 전달 전 마스킹 필수.
- AI 리포트가 규칙 엔진의 추천 ID·순위를 변경하도록 허용하는 코드 금지.
