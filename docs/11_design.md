# design.md

## 디자인 방향
- 신뢰감 있는 교육 진단 서비스
- 주요 대상: 20~50대 재직자·실무자 (모바일 우선)
- 20~50대가 편하게 읽을 수 있는 충분한 가독성과 명확한 대비 (50대까지 고려한 본문 크기 하한 유지)
- 결과 리포트는 전문적이지만 부담 없는 톤
- 관리자 화면은 데이터 중심 대시보드

## Color Tokens
```css
:root {
  --color-primary-900: #1E293B;
  --color-primary-700: #334155;
  --color-accent-600: #2563EB;
  --color-accent-100: #DBEAFE;
  --color-success-600: #16A34A;
  --color-warning-600: #D97706;
  --color-danger-600: #DC2626;
  --color-bg: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-text: #0F172A;
  --color-muted: #64748B;
  --color-border: #E2E8F0;
}
```

## Typography
| 토큰 | 크기 | 용도 |
|---|---:|---|
| display | 36px | 시작 화면 |
| h1 | 30px | 결과 제목 |
| h2 | 24px | 섹션 제목 |
| h3 | 20px | 카드 제목 |
| body-lg | 18px | 주요 설명 |
| body | 16px | 본문 |
| caption | 14px | 보조 설명 |

권장 폰트: Pretendard, Noto Sans KR, system-ui.

## Components
| 컴포넌트 | 용도 |
|---|---|
| SummaryCard | 총점/유형/적합도 |
| ScoreChart | 영역별 점수 |
| RecommendationCard | 추천 교육 |
| NoticeCard | 개인정보 안내 |
| AdminMetricCard | 관리자 지표 |
| QuestionCard | 진단 문항 |

## Responsive
- Mobile: 단일 컬럼, 하단 CTA
- Tablet: 카드 2열
- Desktop: 좌측 단계 + 우측 폼
- Admin: 차트와 표 병렬 배치

## Accessibility
- 모든 입력 요소에 label 제공
- 그래프는 텍스트 대체 정보 제공
- 키보드 탐색 지원
- 색상만으로 상태 구분 금지
