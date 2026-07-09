# Architecture

## 전체 시스템 구조

```mermaid
flowchart LR
    U[예비 수강자] --> WEB[Web App]
    ADMIN[관리자] --> DASH[Admin Dashboard]
    WEB --> API[API Server]
    DASH --> API
    API --> SCORE[Scoring Service]
    API --> CLASSIFY[Classification Service]
    API --> REC[Recommendation Engine]
    API --> MASK[Privacy Masking]
    MASK --> LLM[AI Report Service]
    API --> DB[(PostgreSQL)]
```

## 권장 기술 스택
| 영역 | 권장 |
|---|---|
| Frontend | Next.js 또는 React |
| UI | Tailwind CSS, shadcn/ui 또는 자체 컴포넌트 |
| Backend | Next.js API Routes 또는 FastAPI |
| DB | PostgreSQL 또는 Supabase |
| ORM | Prisma 또는 SQLAlchemy |
| AI | OpenAI-compatible LLM API |
| Chart | Recharts 또는 Chart.js |
| Test | Vitest/Jest, Playwright |

## 데이터 흐름

```mermaid
sequenceDiagram
    participant User
    participant Web
    participant API
    participant Score
    participant Rec
    participant AI
    participant DB

    User->>Web: 진단 응답
    Web->>API: POST /api/diagnosis/submit
    API->>DB: 응답 저장
    API->>Score: 점수 계산
    Score-->>API: 영역별 점수, 총점
    API->>Rec: 유형 분류 및 교육 추천
    Rec-->>API: 추천 결과
    API->>AI: 익명화 리포트 생성 요청
    AI-->>API: AI 리포트 또는 실패
    API->>DB: 결과 저장
    API-->>Web: 결과 반환
```

## 핵심 설계 원칙
- 추천 결정은 규칙 기반 엔진이 수행한다.
- AI는 리포트 문장화에만 사용한다.
- AI 실패 시 전체 결과가 실패하면 안 된다.
- 교육 과정과 진단 문항은 seed/config 데이터로 관리한다.
