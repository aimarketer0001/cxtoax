# API

## 공통
- Base URL: `/api`
- Request/Response: JSON
- 관리자 API는 인증 필요
- Error Format: `{ "error": { "code": "...", "message": "...", "details": {} } }`

## Endpoint
| Endpoint | Method | 설명 | Auth |
|---|---|---|---|
| /api/questions | GET | 진단 문항 조회 | No |
| /api/courses | GET | 교육 과정 조회 | No |
| /api/diagnosis/submit | POST | 진단 제출 및 결과 생성 | No |
| /api/diagnosis/{sessionId} | GET | 진단 결과 조회 | Optional |
| /api/reports/generate | POST | AI 리포트 재생성 | Admin |
| /api/admin/sessions | GET | 응답 목록 | Admin |
| /api/admin/sessions/{sessionId} | GET | 응답 상세 | Admin |
| /api/admin/stats | GET | 통계 | Admin |
| /api/admin/courses/{courseId} | PATCH | 과정 수정 | Admin |

## POST /api/diagnosis/submit Request
```json
{
  "profile": {
    "jobRole": "영업",
    "interestAreas": ["CRM", "고객관리"],
    "learningPurpose": "업무효율",
    "desiredOutput": "실제 업무 적용 결과물"
  },
  "answers": [
    { "questionNo": 1, "value": 4 },
    { "questionNo": 11, "value": "제안서 작성 시간이 오래 걸립니다." }
  ],
  "consent": { "privacyNoticeAccepted": true }
}
```

## Response
```json
{
  "sessionId": "diag_123",
  "summary": {
    "totalScore": 78,
    "learnerType": "업무 적용형",
    "fitLevel": "높음"
  },
  "areaScores": [],
  "recommendations": [],
  "report": {
    "strengths": [],
    "improvements": [],
    "preparation": [],
    "message": ""
  }
}
```

## Error Code
| Code | HTTP | 설명 |
|---|---:|---|
| VALIDATION_ERROR | 400 | 필수 응답 누락 |
| UNAUTHORIZED | 401 | 관리자 인증 필요 |
| FORBIDDEN | 403 | 권한 없음 |
| SCORING_ERROR | 500 | 점수 계산 실패 |
| AI_REPORT_FAILED | 200 | AI 실패, 기본 리포트로 대체 |
