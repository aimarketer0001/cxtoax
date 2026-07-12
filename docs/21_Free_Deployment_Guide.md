# 무료 배포 구성 가이드

## 권장 조합

| 영역 | 무료 서비스 | 이유 |
|---|---|---|
| 웹 호스팅 | Vercel Hobby | Next.js App Router와 API Routes 배포가 간단함 |
| DB | Supabase Free Postgres | 상담 신청/진단 결과를 영속 저장할 수 있음 |
| AI 리포트 | 비활성화 | `AI_REPORT_ENABLED=false`로 비용 없이 규칙 기반 리포트 사용 |
| 도메인 | Vercel 기본 도메인 | 커스텀 도메인 없이 무료 사용 가능 |

Vercel Hobby는 공식 가격표 기준 $0 플랜이 있으며, Supabase Free는 공식 가격표 기준 500MB DB, 5GB egress, 50,000 MAU를 제공한다.

## 무료 운영 구조

```text
사용자
  -> Vercel Hobby
      -> Next.js page / API route
      -> Prisma Client
          -> Supabase Free Postgres
```

현재 로컬 개발은 SQLite를 사용한다. 무료 배포 환경에서는 `prisma/schema.free.prisma`를 사용해 Supabase Postgres에 연결한다.

## Supabase 준비

1. Supabase에서 새 프로젝트를 만든다.
2. Project Settings > Database > Connection string에서 Postgres URL을 복사한다.
3. 비밀번호가 포함된 URL을 `DATABASE_URL`로 사용한다.
4. 무료 한도 안에서 운영하려면 업로드 파일 저장, 대량 로그 저장, 과도한 AI 호출은 사용하지 않는다.

## Vercel 준비

1. GitHub 저장소를 Vercel에 연결한다.
2. Framework Preset은 Next.js로 둔다.
3. Build Command를 아래처럼 설정한다.

```bash
npm run build:vercel
```

4. Install Command는 기본값 또는 아래처럼 둔다.

```bash
npm install
```

5. 환경변수는 `.env.free.example` 기준으로 등록한다.

운영 배포에서는 `.env` 파일을 올리지 않고 Vercel Project Settings > Environment Variables에 아래 변수명을 등록한다. `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_AUTH_SECRET`, `LLM_API_KEY`는 클라이언트에 노출되면 안 되므로 `NEXT_PUBLIC_` 접두사를 붙이지 않는다.

```env
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=운영용_강한_비밀번호
ADMIN_AUTH_SECRET=운영용_긴_랜덤_문자열
LLM_API_KEY=
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
APP_BASE_URL=https://프로젝트명.vercel.app
AI_REPORT_ENABLED=false
PUBLIC_DIAGNOSIS_ENABLED=true
ADMIN_EDIT_ENABLED=false
```

## DB 생성과 시드

배포 전에 로컬 터미널에서 Supabase DB에 스키마와 시드를 넣는다.

```bash
copy .env.free.example .env.free
```

`.env.free`에 Supabase `DATABASE_URL`을 채운 뒤, PowerShell에서 실행한다.

```powershell
$env:DATABASE_URL="postgresql://..."
npm run deploy:db:free
```

이 명령은 다음을 수행한다.

- Postgres용 Prisma Client 생성
- Supabase DB에 테이블 생성
- 진단 문항, 과정, 관리자 기본 사용자 시드 입력

Vercel Build Command는 `npm run build:vercel`을 사용한다. 이 명령은 `DATABASE_URL` 값에서 따옴표나 `DATABASE_URL=` 접두사가 섞여 들어온 경우를 보정하고, Postgres URL 형식이 아니면 빌드를 중단한다.

## 무료 운영을 위한 설정값

| 설정 | 권장값 | 설명 |
|---|---|---|
| `AI_REPORT_ENABLED` | `false` | OpenAI API 비용 방지 |
| `LLM_API_KEY` | 비움 | AI 호출 비활성화 |
| `ADMIN_EDIT_ENABLED` | `false` | 운영 중 과정 데이터 임의 수정 방지 |
| `PUBLIC_DIAGNOSIS_ENABLED` | `true` | 진단 서비스 공개 |

## 배포 후 확인

```text
/                         랜딩 페이지
/diagnosis                진단 페이지
/marketing-h2-2026        마이크로사이트
/admin/login              관리자 로그인
/admin/inquiries          상담 신청 목록
```

확인 순서:

1. 랜딩 페이지에서 상담 신청이 저장되는지 확인한다.
2. `/admin/login`에서 로그인한다.
3. `/admin/inquiries`에서 상담 신청 내역을 확인한다.
4. `/diagnosis`에서 진단을 제출하고 결과 페이지가 열리는지 확인한다.

## 무료 플랜 주의사항

- Vercel Hobby는 개인/비상업 용도 제한이 있을 수 있으므로 실제 영업용 장기 운영 전 약관을 확인한다.
- Supabase Free 프로젝트는 장기간 미사용 시 일시 중지될 수 있다.
- 무료 DB 500MB를 넘지 않도록 상담/진단 데이터 보존 기간을 정한다.
- AI 리포트를 켜면 OpenAI API 비용이 발생할 수 있다.
- 공개 상담 API는 허니팟을 적용했지만, 스팸이 많아지면 CAPTCHA 또는 추가 rate limit이 필요하다.
