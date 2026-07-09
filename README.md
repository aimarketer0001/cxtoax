# 수강 전 역량 진단 및 맞춤 교육 추천 서비스

수강자가 교육을 신청하기 전에 **AI 이해도 · 디지털 활용 · 업무 적용 · 기획/문제정의 · 학습 의지/실행력**을
진단하고, 30개 교육 과정 중 가장 적합한 과정을 1~3순위로 추천하는 웹 서비스입니다.

- 추천 결정은 **규칙 기반 엔진**이 수행하고, AI는 리포트 문장화에만 사용합니다.
- AI 호출이 실패해도 **기본(규칙) 리포트**로 항상 결과를 제공합니다.
- 진단 자유 입력값은 저장/AI 전달 전에 **개인정보 마스킹**을 거칩니다.
- 상담 신청 폼은 회신 목적에 필요한 이름·소속·연락처·문의 내용을 저장합니다.
- 교육 과정·진단 문항은 `data/*.seed.json` 시드로 관리합니다.

## 기술 스택

| 영역 | 사용 기술 |
|---|---|
| Frontend / Backend | Next.js 15 (App Router, TypeScript) + API Routes |
| DB / ORM | SQLite + Prisma *(프로덕션은 PostgreSQL로 전환 가능)* |
| AI | OpenAI 호환 LLM (`fetch`), 실패 시 규칙 리포트 fallback |
| UI | 순수 CSS (docs/11_design.md 디자인 토큰 기반) |
| Test | Vitest (단위 테스트) |

## 빠른 시작

```bash
# 1) 의존성 설치
npm install

# 2) 환경변수 준비 (.env)
cp .env.example .env
#   최소값: DATABASE_URL="file:./dev.db", ADMIN_PASSWORD, ADMIN_AUTH_SECRET
#   LLM_API_KEY를 비워두면 항상 규칙 기반 리포트를 사용합니다.

# 3) DB 생성 + 시드 (문항 20 / 과정 30)
npm run setup       # prisma generate && db push && db seed

# 4) 개발 서버
npm run dev         # http://localhost:3000
```

프로덕션 실행:

```bash
npm run build
npm start
```

## 주요 화면

| 경로 | 설명 |
|---|---|
| `/` | 마케팅 랜딩(강사 소개·강의 안내·상담 폼) — `public/index.html` |
| `/diagnosis` | 기본 정보 입력 + 20개 문항 단계형 진단 |
| `/result/{sessionId}` | 총점·유형·적합도, 영역별 점수, 추천 교육, 리포트, **강의안/상담 연결** |
| `/admin/login` | 관리자 로그인 |
| `/admin` | 통계 대시보드 · 응답 목록 |
| `/admin/sessions/{id}` | 응답 상세 · 상담 메모 · AI 리포트 재생성 |

관리자 로그인 비밀번호는 `.env`의 `ADMIN_PASSWORD` 입니다. 운영 배포 전에는 개발 기본값을 반드시 변경하세요.

### 진단 → 강의 → 상담 유기적 흐름

랜딩(`/`)과 진단·결과 화면은 하나의 앱으로 연결되어 순환합니다.

1. **랜딩** — 상단 네비게이션 "역량 진단", 히어로 CTA, `#diagnosis-cta` 배너에서 `/diagnosis`로 진입.
2. **진단 → 결과** — 제출 후 `/result/{id}`에서 유형·점수·추천 강의 확인.
3. **결과 → 강의안** — 추천 카드의 "강의안 보기"가 해당 강의 상세로 이동
   (대표 강의 CX-B-01·CX-B-02·CX-B-04 → `/#syllabus-1~3`, 그 외 → `/#courses-all`).
4. **강의 → 상담** — "이 강의로 상담 신청 →" 또는 강의안의 "이 강의 상담 신청하기"가
   `/?diag=1&course=..&title=..&type=..#contact`로 이동. 랜딩의 상담 폼이 쿼리를 읽어
   **진단 결과 배너 표시 + 문의 목적 선택 + 문의 내용 자동 채움**을 수행합니다(연락처만 입력하면 접수).

`public/index.html`은 Next 리라이트(`next.config.mjs`)로 `/`에 서빙됩니다. 정적 마케팅 페이지만
따로 배포할 경우 `public/index.html`을 그대로 사용할 수 있습니다.

## API 요약 (`docs/06_API.md`)

| Endpoint | Method | Auth |
|---|---|---|
| `/api/questions` | GET | No |
| `/api/courses` | GET | No |
| `/api/diagnosis/submit` | POST | No |
| `/api/diagnosis/{sessionId}` | GET | Optional |
| `/api/reports/generate` | POST | Admin |
| `/api/admin/login` | POST / DELETE | — / Admin |
| `/api/admin/sessions` | GET | Admin |
| `/api/admin/sessions/{sessionId}` | GET / POST(note) | Admin |
| `/api/admin/stats` | GET | Admin |
| `/api/admin/courses/{courseId}` | PATCH | Admin |

에러 형식: `{ "error": { "code", "message", "details" } }`

## 테스트

```bash
npm test            # Vitest 32개 단위 테스트
```

커버리지: 점수 계산, 유형 분류/보류 조건, 추천 로직(docs/12_Test.md 5개 시나리오),
개인정보 마스킹, AI 리포트 검증/가드레일(추천 ID·순위 변경 차단, 개인정보 포함 차단).

## 프로젝트 구조

```text
app/
  page.tsx                 시작 화면
  diagnosis/               진단 단계 폼
  result/[sessionId]/      결과 리포트
  admin/                   로그인 · 대시보드 · 상세
  api/                     API Routes
components/                UI 컴포넌트 (diagnosis / result / admin)
lib/
  domain/                  scoring · classification · recommendation · report · privacy
  auth.ts  api.ts  db.ts  sessionView.ts
prisma/                    schema.prisma · seed.ts
public/index.html          마케팅 랜딩(강사 소개·강의 30선·상담 폼), "/"에 서빙
data/                      course_catalog.seed.json · diagnosis_questions.seed.json
tests/                     Vitest
docs/                      기획/설계 문서
```

## 설계 원칙 (핵심)

- **점수/추천은 순수 함수**(`lib/domain/*`)로 분리해 AI 없이도 동작하고 테스트 가능합니다.
- **문항 옵션·배점·추천 태그**는 `lib/domain/questionConfig.ts` / `courseMeta.ts`에서 관리하며,
  문항 텍스트·과정 카탈로그는 seed JSON이 단일 소스입니다.
- **AI 리포트**는 진단 응답에서 개인정보를 마스킹한 입력만 전달하고, 출력은 JSON 스키마·추천 일치·개인정보 검사를
  통과해야 채택되며 그 외에는 규칙 리포트로 대체됩니다.

## 개인정보 / 보안

- 진단 서비스는 이름·전화·이메일·주소를 입력받지 않으며, 자유 입력은 저장 전 마스킹합니다.
- 상담 신청 폼은 회신을 위해 이름·소속·연락처·문의 내용을 저장합니다. 운영 시 개인정보 처리방침과 보존 기간을 별도로 고지해야 합니다.
- 관리자 API는 세션 쿠키(HMAC 서명) 인증이 필요하며 미인증 시 401/403을 반환합니다.
- 비밀·키는 `.env`에만 두고 코드/로그에 남기지 않습니다. `.env`는 `.gitignore`에 포함됩니다.
