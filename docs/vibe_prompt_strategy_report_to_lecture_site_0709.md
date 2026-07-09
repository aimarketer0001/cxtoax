# 바이브코딩 프롬프트: 전략 보고서 마이크로사이트에 15분 실행 워크숍 연결하기

## 0. 작업 대상

현재 운영 중인 CX to AX 프로젝트의 **하반기 마케팅 전략 보고서 마이크로사이트**를 확장한다.

운영 URL:

```txt
https://cxtoax.vercel.app/marketing-h2-2026#key-insights
```

로컬 개발 URL:

```txt
http://localhost:3000/marketing-h2-2026#key-insights
```

중요:

```txt
새로운 웹사이트를 만들지 않는다.
기존 /marketing-h2-2026 페이지의 #key-insights 섹션 이후 흐름을 확장한다.
기존 디자인, 레이아웃, 컴포넌트 구조, 라우팅 방식, 우측 플로팅 메뉴 동작을 최대한 유지한다.
```

---

## 1. 현재 프로젝트 구조 기준

작업 전에 반드시 아래 파일을 확인한다.

```txt
app/marketing-h2-2026/page.tsx
app/marketing-h2-2026/styles.css
app/marketing-h2-2026/MicrositeFloatingMenu.tsx
app/marketing-h2-2026/MicrositeContactForm.tsx
components/MarketingHeader.tsx
vercel.json
package.json
```

현재 프로젝트 특징:

- Next.js App Router 기반이다.
- 보고서 마이크로사이트 경로는 `/marketing-h2-2026`이다.
- 보고서 페이지 본문은 `app/marketing-h2-2026/page.tsx`에서 관리한다.
- 보고서 페이지 전용 CSS는 `app/marketing-h2-2026/styles.css`에 있다.
- 상단 보고서 내비게이션은 `page.tsx`의 `.micro-nav` 영역에 직접 작성되어 있다.
- 우측 플로팅 메뉴는 `MicrositeFloatingMenu.tsx`의 `floatingLinks` 배열로 관리한다.
- 문의 폼은 `MicrositeContactForm.tsx`이며, 개인정보 수집·이용 동의가 이미 적용되어 있으므로 새 폼을 만들지 않는다.
- 디자인은 Tailwind가 아니라 일반 CSS 클래스 기반이다.
- 재사용 우선 클래스: `microsite-section`, `alt`, `microsite-wrap`, `section-kicker`, `section-lead`, `micro-btn`, `micro-btn-primary`, `micro-btn-ghost`, `strategy-card`, `program-card`, `channel-card`.

---

## 2. 역할

당신은 Next.js/React 기반 마이크로사이트를 개선하는 프론트엔드 개발자이자 교육 콘텐츠 UX 설계자입니다.

사용자는 이미 `하반기 마케팅 캠페인 심층 전략 보고서`를 웹사이트로 구현했습니다.  
이제 이 웹사이트의 `#key-insights` 섹션 이후에 **강의교재로 자연스럽게 이동하는 실행형 학습 흐름**을 추가하려고 합니다.

작업의 핵심은 다음과 같습니다.

```txt
전략 보고서 웹사이트 = 왜 지금 바뀌어야 하는지 보여주는 근거와 큰 그림
15분 강의교재 = 그중 AI 검색 대응을 실제 행동으로 바꾸는 실행 워크숍
체크리스트 = 수강자가 자기 회사 페이지 1개를 직접 진단하는 도구
```

---

## 3. 프로젝트 배경

하반기 전략 보고서 마이크로사이트는 2026년 하반기 마케팅 전략을 설명하는 인사이트 리포트형 페이지다.

보고서의 핵심 축은 다음과 같다.

- 브랜드 신뢰 구축
- AI 검색 대응
- 영상 중심 콘텐츠 운영
- CRM 자동화
- 에이전트 기반 마케팅 실행 체계

강의교재는 이 중 **AI 검색 대응**을 15분 강의로 압축한 실행형 자료다.

강의 주제:

```txt
AI 검색 시대, 우리 회사 페이지부터 바꾸기
검색의 주체가 바뀐 시대, 마케터가 이번 주에 할 수 있는 단 하나의 일
```

웹사이트에서는 보고서 전체를 단순히 강의자료로 연결하지 말고, `#key-insights` 섹션에서 다음 흐름이 자연스럽게 보이도록 만든다.

```txt
하반기 전략 인사이트 이해
→ AI 검색 대응의 중요성 확인
→ 15분 실행 워크숍으로 이동
→ 우리 회사 페이지 1개 진단
→ 이번 주 실행 과제 확인
→ 필요 시 교육/컨설팅 문의(#report-contact)
```

---

## 4. 최종 목표

현재 사이트 `https://cxtoax.vercel.app/marketing-h2-2026#key-insights` 기준으로 다음을 구현한다.

1. 기존 `#key-insights` 섹션 하단에 **“보고서 인사이트를 실행으로 바꾸는 15분 워크숍”** CTA 블록을 추가한다.
2. 상단 보고서 내비게이션 `.micro-nav`에 **“실행 워크숍”** 메뉴를 추가하고 `#workshop`으로 이동하게 한다.
3. 우측 플로팅 메뉴 `MicrositeFloatingMenu.tsx`에도 `#workshop` 바로가기를 추가한다.
4. 기존 페이지 안에 신규 섹션 `#workshop`을 추가한다.
5. `#workshop` 안에 강의교재의 핵심 흐름을 웹사이트용 카드 UI로 재구성한다.
6. `Before / After` 비교 섹션을 추가한다.
7. `#checklist` 섹션을 추가해 페이지 진단 체크리스트를 제공한다.
8. 가능하면 체크리스트는 인터랙티브하게 구현한다. 단, 이 경우 체크리스트만 client component로 분리한다.
9. 마지막에 **“이번 주, 딱 한 페이지만 바꿔보세요”** 실행 섹션을 추가한다.
10. 수강자가 보고서 → 워크숍 → 체크리스트 → 실행 과제 → 상담 문의로 자연스럽게 이동하도록 CTA를 배치한다.

---

## 5. 작업 전 확인 사항

코드를 수정하기 전에 아래를 먼저 확인한다.

- `app/marketing-h2-2026/page.tsx`의 현재 섹션 순서
- `#key-insights`, `#strategy-framework`, `#campaign-roadmap`, `#channels`, `#ai-tools`, `#kpi-risk`, `#instructor`, `#related-programs`, `#faq`, `#report-contact` 앵커 존재 여부
- `.micro-nav`의 현재 메뉴 구조
- `MicrositeFloatingMenu.tsx`의 `floatingLinks` 배열
- `styles.css`의 기존 grid/card/button 스타일
- `MicrositeContactForm.tsx`의 개인정보 동의 구조

중요:

```txt
기존 구조를 무시하고 새 레이아웃을 덮어쓰지 말 것.
기존 #key-insights 섹션 아래에 자연스럽게 이어지는 방식으로 추가할 것.
MarketingHeader, MicrositeFloatingMenu, MicrositeContactForm을 제거하지 말 것.
새로운 상담 폼을 만들지 말고 기존 #report-contact로 연결할 것.
```

---

## 6. 추천 IA 수정안

현재 보고서 페이지 상단 메뉴는 아래 구조다.

```tsx
<a href="#overview">개요</a>
<a href="#key-insights">핵심 인사이트</a>
<a href="#strategy-framework">전략 프레임</a>
<a href="#campaign-roadmap">실행 로드맵</a>
<a href="#ai-tools">AI 활용</a>
<a href="#kpi-risk">KPI</a>
<a href="#report-contact" className="micro-nav-cta">문의</a>
```

수정 후 추천 구조:

```tsx
<a href="#overview">개요</a>
<a href="#key-insights">핵심 인사이트</a>
<a href="#workshop">실행 워크숍</a>
<a href="#strategy-framework">전략 프레임</a>
<a href="#campaign-roadmap">실행 로드맵</a>
<a href="#ai-tools">AI 활용</a>
<a href="#kpi-risk">KPI</a>
<a href="#report-contact" className="micro-nav-cta">문의</a>
```

우측 플로팅 메뉴 `floatingLinks`는 너무 길어지지 않게 아래처럼 조정한다.

```tsx
const floatingLinks = [
  { href: "#overview", label: "전략 개요", id: "overview" },
  { href: "#key-insights", label: "핵심 인사이트", id: "key-insights" },
  { href: "#workshop", label: "실행 워크숍", id: "workshop" },
  { href: "#campaign-roadmap", label: "캠페인 로드맵", id: "campaign-roadmap" },
  { href: "#ai-tools", label: "AI 활용 도구", id: "ai-tools" },
  { href: "#kpi-risk", label: "KPI·리스크", id: "kpi-risk" },
];
```

`#checklist`는 `#workshop` 내부 CTA와 실행 과제 CTA에서 이동할 수 있게 하되, 우측 플로팅 메뉴에는 꼭 넣지 않아도 된다.

---

## 7. `#key-insights` 하단 CTA 블록

기존 `#key-insights` 섹션의 `insight-grid` 아래에 CTA 블록을 추가한다.

### 섹션 성격

보고서의 인사이트를 단순히 읽는 데서 끝내지 않고, 수강자가 15분 워크숍으로 이동하도록 유도하는 연결 블록이다.

### 권장 제목

```txt
보고서 인사이트를 실행으로 바꾸는 15분 워크숍
```

### 권장 보조 제목

```txt
AI 검색 시대, 우리 회사 페이지부터 바꾸기
```

### 권장 설명 문구

```txt
하반기 전략 보고서가 보여주는 가장 중요한 변화는 검색의 주체가 사람에서 AI로 확장되었다는 점입니다.
이제 다음 단계는 이 인사이트를 우리 회사 페이지에 적용하는 것입니다.
15분 미니 워크숍을 따라가며 방문이 많은 페이지 1개를 AI가 읽고 인용하기 쉬운 구조로 바꿔보세요.
```

### CTA 버튼

```txt
[15분 워크숍 시작하기] → #workshop
[페이지 진단 체크리스트 보기] → #checklist
```

### UI 방향

- 기존 인사이트 카드와 자연스럽게 이어지는 하이라이트 박스 형태
- 광고 배너처럼 과하게 보이지 않게 구성
- “15분”, “페이지 1개”, “AI가 읽고 인용하기 쉬운 구조”를 시각적으로 강조
- 데스크톱: 텍스트 왼쪽, 버튼 오른쪽 가능
- 모바일: 텍스트 → 버튼 순서 세로 배치
- 기존 버튼 클래스 `micro-btn`, `micro-btn-primary`, `micro-btn-ghost` 우선 재사용

---

## 8. 신규 섹션 `#workshop`

`#key-insights` CTA 이후 또는 `#strategy-framework` 직전에 신규 섹션을 추가한다.

```tsx
<section className="microsite-section alt" id="workshop">
```

`#key-insights` 바로 다음에 추가할 경우 기존 섹션 배경 리듬을 고려해 `alt` 여부를 조정한다. 현재 `#strategy-framework`가 `alt`이므로, `#workshop`을 사이에 넣으면 배경 반복이 어색하지 않도록 인접 섹션의 `alt` 배치를 함께 확인한다.

### 섹션 제목

```txt
AI 검색 시대, 우리 회사 페이지부터 바꾸기
```

### 섹션 부제

```txt
하반기 마케팅 전략 보고서 기반 15분 실행 워크숍
```

### 섹션 설명

```txt
이 워크숍은 하반기 마케팅 전략 보고서의 핵심 주제 중 하나인 ‘AI 검색 대응’을 실무자가 바로 실행할 수 있도록 15분 실습 형태로 압축한 과정입니다.
보고서를 읽는 데서 끝내지 않고, 우리 회사 페이지 1개를 실제로 진단하고 개선하는 데 초점을 둡니다.
```

### 섹션 상단 미니 정보

작은 배지 또는 메타 정보로 표시한다.

```txt
대상: 홈페이지·콘텐츠를 직접 관리하는 마케팅 실무자
소요 시간: 15분
결과물: 우리 회사 페이지 1개 진단 결과와 개선 방향
난이도: 개발 지식 없이 가능
```

---

## 9. 워크숍 학습 흐름 카드

`#workshop` 섹션 안에 4단계 학습 카드를 추가한다.

| 단계 | 제목 | 설명 | 수강자 인식 |
|---|---|---|---|
| Step 1 | 왜 바뀌었나 | 검색의 주체가 사람에서 AI로 확장되었음을 이해 | “AI가 먼저 우리 페이지를 읽는구나” |
| Step 2 | 무엇을 진단하나 | AI가 읽기 어려운 페이지와 인용하기 쉬운 페이지 비교 | “우리 페이지에도 문제가 있을 수 있겠네” |
| Step 3 | 어떻게 고치나 | 질문형 소제목, 짧은 답, FAQ, 텍스트 표 구조 적용 | “개발 없이도 일부는 고칠 수 있겠다” |
| Step 4 | 이번 주 실행 | 방문 많은 페이지 1개를 골라 바로 개편 | “오늘 해야 할 일이 명확하다” |

### 카드별 실행 포인트

```txt
Step 1 실행 포인트: AI가 보는 첫 화면이 무엇인지 생각해 보기
Step 2 실행 포인트: 우리 회사 주요 페이지 1개를 떠올리기
Step 3 실행 포인트: 질문형 소제목과 FAQ가 있는지 확인하기
Step 4 실행 포인트: 이번 주에 바꿀 페이지 1개 정하기
```

### UI 요구사항

- 데스크톱: 4열 또는 2x2 그리드
- 태블릿: 2열
- 모바일: 1열 스택
- 카드마다 Step 번호를 명확히 표시
- 기존 `strategy-card`, `program-card`, `channel-card` 스타일과 어울리게 구성
- 카드 안 텍스트가 모바일에서 넘치지 않게 처리

---

## 10. Before / After 비교 섹션

`#workshop` 안에 다음 비교 섹션을 추가한다.

### 섹션 제목

```txt
AI가 못 읽는 페이지 vs AI가 인용하는 페이지
```

### BEFORE 카드

```txt
AI가 못 읽는 페이지

- 감성 카피 위주의 긴 서사형 소개문
- 핵심 스펙·가격이 이미지 안에만 존재
- 질문에 대한 답이 여러 문단에 흩어짐
- 최종 수정일·출처 표기 없음
```

### AFTER 카드

```txt
AI가 인용하기 쉬운 페이지

- 질문형 소제목 아래 2~3문장으로 바로 답변
- 스펙·가격을 이미지가 아닌 텍스트 표로 제공
- FAQ 섹션으로 질문과 답을 한곳에 정리
- 최종 업데이트 날짜와 데이터 출처 명시
```

### 강조 문구

```txt
AI는 ‘질문 → 짧은 답’ 구조를 가장 잘 인용합니다. 그래서 FAQ가 핵심입니다.
```

### UI 요구사항

- 데스크톱: 좌측 BEFORE, 우측 AFTER
- 모바일: BEFORE → AFTER 순서 세로 배치
- BEFORE는 문제 중심, AFTER는 해결 중심으로 시각적 대비
- 강조 문구는 비교 카드 아래 하이라이트 박스 처리
- 색상만으로 의미를 구분하지 말고 `BEFORE`, `AFTER` 텍스트 라벨을 함께 제공

---

## 11. 체크리스트 섹션 `#checklist`

`#workshop` 이후 또는 `#workshop` 내부 하단에 체크리스트 섹션을 추가한다.

```tsx
<section id="checklist">
```

### 섹션 제목

```txt
우리 회사 페이지 AI 가독성 체크리스트
```

### 설명 문구

```txt
아래 4가지 기준으로 방문이 많은 페이지 1개를 먼저 진단해 보세요.
X가 가장 많은 페이지가 이번 주에 가장 먼저 고칠 페이지입니다.
```

### 체크리스트 항목

```txt
1. 질문형 소제목이 있는가?
2. 질문 바로 아래에 2~3문장의 짧은 답이 있는가?
3. 가격, 스펙, 비교 정보가 이미지가 아니라 텍스트로 제공되는가?
4. FAQ, 최종 업데이트 날짜, 출처가 명시되어 있는가?
```

### 구현 방식

가능하면 체크박스 인터랙션을 추가한다.

- `app/marketing-h2-2026/WorkshopChecklist.tsx` 같은 client component를 새로 만든다.
- 이 컴포넌트에만 `'use client'`를 적용한다.
- `page.tsx` 전체를 client component로 바꾸지 않는다.
- 체크박스는 `label`과 연결한다.
- 체크 개수에 따라 진단 메시지를 표시한다.

진단 메시지:

```txt
0~1개 충족: AI가 읽기 어려운 페이지입니다. FAQ 구조부터 추가해 보세요.
2~3개 충족: 기본 구조는 있으나 인용 가능성을 높이려면 답변형 문단과 출처를 보강하세요.
4개 충족: AI 검색 대응 기본 구조가 잘 갖춰져 있습니다. 최신성 유지와 내부 링크를 점검하세요.
```

---

## 12. 실행 과제 섹션

체크리스트 다음에 실행 과제 섹션을 추가한다.

### 섹션 제목

```txt
이번 주, 딱 한 페이지만 바꿔보세요
```

### 설명 문구

```txt
20개를 한 번에 고치려고 하지 않아도 됩니다.
방문이 많은 페이지 1개를 골라 질문형 소제목, 짧은 답변, FAQ 구조를 추가하는 것부터 시작하세요.
작은 시작이 AI 검색 시대의 가장 확실한 준비입니다.
```

### 실행 단계

```txt
1. 찾기: GA에서 방문 많은 페이지 상위 20개를 확인한다. / 10분
2. 진단하기: 4가지 기준으로 O/X 체크한다. / 10분
3. 고치기: X가 가장 많은 페이지 1개부터 질문형 소제목과 FAQ를 추가한다. / 10분 이상
```

### CTA 버튼

```txt
[체크리스트로 진단 시작하기] → #checklist
[교육/컨설팅 문의하기] → #report-contact
[핵심 인사이트로 돌아가기] → #key-insights
```

---

## 13. 자료 섹션 처리

현재 마이크로사이트에는 별도 `#resources` 섹션이 없다.  
따라서 1차 구현에서는 `#resources`를 새로 만들지 않아도 된다.

대신 아래 중 하나로 처리한다.

1. `#workshop` 내부에 “수강자 자료” 미니 카드 3개를 둔다.
2. 또는 `#related-programs` 이전에 `#workshop-resources`를 추가한다.

자료 카드 예시:

| 자료명 | 설명 | 버튼 동작 |
|---|---|---|
| 하반기 전략 보고서 | 2026년 하반기 마케팅 변화와 실행 전략 전체 보기 | `#key-insights` |
| 15분 실행 워크숍 | AI 검색 대응을 실무자가 바로 실행하는 학습 흐름 | `#workshop` |
| 페이지 진단 체크리스트 | 우리 회사 페이지의 AI 가독성을 점검하는 4가지 기준 | `#checklist` |

실제 PDF/PPT 다운로드 파일이 프로젝트에 존재하지 않으면 다운로드 링크를 만들지 않는다. 버튼명은 `보기` 또는 `이동하기`로 처리한다.

---

## 14. 권장 컴포넌트 구조

현재 보고서 페이지는 `page.tsx` 중심 구조다. 따라서 무리하게 큰 구조 변경을 하지 않는다.

권장:

```txt
app/marketing-h2-2026/page.tsx
  - 정적 섹션 데이터와 마크업 추가
  - 상단 micro-nav 메뉴 추가

app/marketing-h2-2026/WorkshopChecklist.tsx
  - 체크리스트 인터랙션이 필요할 때만 추가
  - 'use client' 적용

app/marketing-h2-2026/MicrositeFloatingMenu.tsx
  - floatingLinks에 #workshop 추가

app/marketing-h2-2026/styles.css
  - 워크숍 CTA, step card, before/after, checklist, action section 스타일 추가
```

공통 컴포넌트 폴더를 새로 크게 만들지 않는다. 기존 프로젝트의 단순 구조를 우선한다.

---

## 15. 상태 관리와 인터랙션

체크리스트 인터랙션 예시:

```tsx
'use client';

import { useState } from 'react';

const checklistItems = [
  '질문형 소제목이 있는가?',
  '질문 바로 아래에 2~3문장의 짧은 답이 있는가?',
  '가격, 스펙, 비교 정보가 이미지가 아니라 텍스트로 제공되는가?',
  'FAQ, 최종 업데이트 날짜, 출처가 명시되어 있는가?',
];

export default function WorkshopChecklist() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false]);
  const checkedCount = checkedItems.filter(Boolean).length;

  const resultMessage =
    checkedCount <= 1
      ? 'AI가 읽기 어려운 페이지입니다. FAQ 구조부터 추가해 보세요.'
      : checkedCount <= 3
        ? '기본 구조는 있으나 인용 가능성을 높이려면 답변형 문단과 출처를 보강하세요.'
        : 'AI 검색 대응 기본 구조가 잘 갖춰져 있습니다. 최신성 유지와 내부 링크를 점검하세요.';

  return (
    <div className="workshop-checklist-card">
      {/* 기존 스타일 톤에 맞춰 구현 */}
    </div>
  );
}
```

---

## 16. 디자인 방향

기존 사이트의 디자인 톤을 유지한다.

### 전체 방향

- 전략 보고서 영역: 신뢰감, 전문성, 리포트형 톤
- 워크숍 영역: 실행감, 실습, 체크리스트 중심 톤
- 전체 톤: 전문가답지만 수강자가 부담 없이 따라갈 수 있는 구조

### 강조 키워드

```txt
15분
페이지 1개
AI 검색 대응
질문 → 짧은 답
FAQ
이번 주 실행
```

### 반응형 기준

- 데스크톱: 그리드와 비교 레이아웃 적극 활용
- 태블릿: 2열 카드 중심
- 모바일: 1열 스택, 버튼은 필요 시 전체 너비
- 텍스트가 버튼/카드 안에서 넘치지 않도록 확인

### 접근성

- 버튼은 실제 `<a href="#workshop">` 또는 라우팅 가능한 링크로 구현
- 섹션 제목은 `h2`, 카드 제목은 `h3` 등 의미 있는 heading 구조 사용
- 색상만으로 의미를 구분하지 말고 텍스트 라벨 제공
- 체크박스는 label과 연결

---

## 17. 구현 우선순위

### 1차 필수 구현

- [ ] `.micro-nav`에 `실행 워크숍` 추가
- [ ] `MicrositeFloatingMenu.tsx`에 `#workshop` 추가
- [ ] `#key-insights` 하단에 워크숍 연결 CTA 추가
- [ ] `#workshop` 섹션 추가
- [ ] 4단계 학습 카드 추가
- [ ] Before / After 비교 섹션 추가
- [ ] `#checklist` 체크리스트 섹션 추가
- [ ] “이번 주, 딱 한 페이지만 바꿔보세요” 실행 섹션 추가
- [ ] `#key-insights`, `#workshop`, `#checklist`, `#report-contact` 앵커 이동 확인
- [ ] 모바일 반응형 확인

### 2차 개선 구현

- [ ] 체크리스트 체크박스 인터랙션 추가
- [ ] 체크 개수별 진단 메시지 표시
- [ ] 수강자 자료 미니 카드 추가
- [ ] 체크리스트 결과 복사 버튼 추가
- [ ] 실제 PPT/PDF 다운로드 파일 연결

---

## 18. 검증 기준

작업 완료 후 아래를 확인한다.

```bash
npm test
npm run build:free
```

주의:

- Vercel 운영 배포는 이미 `npm run build:vercel`을 사용한다.
- 로컬에서 운영 DB를 직접 건드릴 필요가 없으면 `npm run build:free`로 빌드 검증한다.
- 자동 배포는 GitHub `main` 브랜치 push 후 Vercel에서 진행된다.

확인 항목:

- [ ] `https://cxtoax.vercel.app/marketing-h2-2026#key-insights`에서 핵심 인사이트 섹션으로 이동한다.
- [ ] `#key-insights` 하단에 15분 워크숍 연결 CTA가 보인다.
- [ ] CTA의 `15분 워크숍 시작하기` 버튼이 `#workshop`으로 이동한다.
- [ ] CTA의 `페이지 진단 체크리스트 보기` 버튼이 `#checklist`로 이동한다.
- [ ] 상단 메뉴에 `실행 워크숍`이 추가되어 있다.
- [ ] 우측 플로팅 메뉴에 `실행 워크숍`이 자연스럽게 보인다.
- [ ] 보고서 웹사이트와 강의교재의 관계가 명확하게 이해된다.
- [ ] Before / After 비교로 페이지 개선 방향을 이해할 수 있다.
- [ ] 체크리스트로 자기 회사 페이지를 진단할 수 있다.
- [ ] 마지막에 “이번 주 페이지 1개 개선”이라는 실행 과제가 남는다.
- [ ] 데스크톱과 모바일에서 모두 자연스럽게 보인다.
- [ ] 기존 사이트 디자인 톤과 충돌하지 않는다.

---

## 19. Codex / VS Code 실행용 최종 프롬프트

아래 내용을 Codex 또는 VS Code 기반 바이브코딩 도구에 그대로 입력해 작업한다.

```txt
현재 Next.js App Router 프로젝트에서 하반기 마케팅 전략 보고서 마이크로사이트를 개선해 주세요.
작업 대상은 /marketing-h2-2026 페이지이며, 현재 운영 URL 기준 위치는 https://cxtoax.vercel.app/marketing-h2-2026#key-insights 입니다.

새로운 사이트를 만들지 말고, 기존 app/marketing-h2-2026/page.tsx의 #key-insights 섹션 하단에 ‘보고서 인사이트를 실행으로 바꾸는 15분 워크숍’ CTA 블록을 추가해 주세요.
이 CTA는 보고서 인사이트를 읽은 수강자가 강의교재 기반 실행 워크숍으로 자연스럽게 이동하도록 만드는 연결 블록입니다.

현재 프로젝트 구조를 먼저 확인해 주세요.
- 페이지: app/marketing-h2-2026/page.tsx
- 스타일: app/marketing-h2-2026/styles.css
- 우측 플로팅 메뉴: app/marketing-h2-2026/MicrositeFloatingMenu.tsx
- 문의 폼: app/marketing-h2-2026/MicrositeContactForm.tsx

CTA 블록에는 아래 문구를 사용해 주세요.
제목: 보고서 인사이트를 실행으로 바꾸는 15분 워크숍
보조 제목: AI 검색 시대, 우리 회사 페이지부터 바꾸기
설명: 하반기 전략 보고서가 보여주는 가장 중요한 변화는 검색의 주체가 사람에서 AI로 확장되었다는 점입니다. 이제 다음 단계는 이 인사이트를 우리 회사 페이지에 적용하는 것입니다. 15분 미니 워크숍을 따라가며 방문이 많은 페이지 1개를 AI가 읽고 인용하기 쉬운 구조로 바꿔보세요.
버튼 1: 15분 워크숍 시작하기 → #workshop
버튼 2: 페이지 진단 체크리스트 보기 → #checklist

상단 보고서 내비게이션 .micro-nav에는 ‘실행 워크숍’ 메뉴를 추가하고 #workshop으로 이동하게 해 주세요.
현재 메뉴는 개요, 핵심 인사이트, 전략 프레임, 실행 로드맵, AI 활용, KPI, 문의 구조입니다. ‘실행 워크숍’은 ‘핵심 인사이트’ 다음에 배치해 주세요.

우측 플로팅 메뉴 MicrositeFloatingMenu.tsx의 floatingLinks에도 #workshop 항목을 추가해 주세요.
메뉴가 너무 길어지면 ‘전략 프레임워크’ 항목은 상단 nav에만 남기고, 우측 플로팅 메뉴는 개요, 핵심 인사이트, 실행 워크숍, 캠페인 로드맵, AI 활용 도구, KPI·리스크 중심으로 정리해 주세요.

기존 페이지 안에 새로운 #workshop 섹션을 추가해 주세요.
섹션 제목은 ‘AI 검색 시대, 우리 회사 페이지부터 바꾸기’로 하고, 부제는 ‘하반기 마케팅 전략 보고서 기반 15분 실행 워크숍’으로 해 주세요.
설명 문구는 다음과 같이 작성해 주세요.
‘이 워크숍은 하반기 마케팅 전략 보고서의 핵심 주제 중 하나인 AI 검색 대응을 실무자가 바로 실행할 수 있도록 15분 실습 형태로 압축한 과정입니다. 보고서를 읽는 데서 끝내지 않고, 우리 회사 페이지 1개를 실제로 진단하고 개선하는 데 초점을 둡니다.’

#workshop 섹션 안에는 4단계 학습 카드 UI를 추가해 주세요.
1) 왜 바뀌었나: 검색의 주체가 사람에서 AI로 확장되었음을 이해
2) 무엇을 진단하나: AI가 읽기 어려운 페이지와 인용하기 쉬운 페이지 비교
3) 어떻게 고치나: 질문형 소제목, 짧은 답, FAQ, 텍스트 표 구조 적용
4) 이번 주 실행: 방문 많은 페이지 1개를 골라 바로 개편
각 카드에는 실행 포인트 한 줄을 추가해 주세요.
데스크톱에서는 4열 또는 2x2 그리드, 모바일에서는 1열 스택으로 보여 주세요.

워크숍 안에는 ‘AI가 못 읽는 페이지 vs AI가 인용하는 페이지’ Before/After 비교 섹션을 추가해 주세요.
Before 카드에는 다음 항목을 넣어 주세요.
- 감성 카피 위주의 긴 서사형 소개문
- 핵심 스펙·가격이 이미지 안에만 존재
- 질문에 대한 답이 여러 문단에 흩어짐
- 최종 수정일·출처 표기 없음
After 카드에는 다음 항목을 넣어 주세요.
- 질문형 소제목 아래 2~3문장으로 바로 답변
- 스펙·가격을 이미지가 아닌 텍스트 표로 제공
- FAQ 섹션으로 질문과 답을 한곳에 정리
- 최종 업데이트 날짜와 데이터 출처 명시
비교 카드 아래에는 ‘AI는 질문 → 짧은 답 구조를 가장 잘 인용합니다. 그래서 FAQ가 핵심입니다.’라는 강조 문구를 넣어 주세요.

#checklist 섹션을 추가해 주세요.
섹션 제목은 ‘우리 회사 페이지 AI 가독성 체크리스트’입니다.
설명은 ‘아래 4가지 기준으로 방문이 많은 페이지 1개를 먼저 진단해 보세요. X가 가장 많은 페이지가 이번 주에 가장 먼저 고칠 페이지입니다.’로 해 주세요.
체크리스트 항목은 다음 4개입니다.
1. 질문형 소제목이 있는가?
2. 질문 바로 아래에 2~3문장의 짧은 답이 있는가?
3. 가격, 스펙, 비교 정보가 이미지가 아니라 텍스트로 제공되는가?
4. FAQ, 최종 업데이트 날짜, 출처가 명시되어 있는가?
가능하면 체크박스 인터랙션을 추가하고, 체크 개수에 따라 아래 진단 메시지를 표시해 주세요.
0~1개 충족: AI가 읽기 어려운 페이지입니다. FAQ 구조부터 추가해 보세요.
2~3개 충족: 기본 구조는 있으나 인용 가능성을 높이려면 답변형 문단과 출처를 보강하세요.
4개 충족: AI 검색 대응 기본 구조가 잘 갖춰져 있습니다. 최신성 유지와 내부 링크를 점검하세요.
Next.js 서버 컴포넌트 환경이므로 체크리스트 인터랙션은 app/marketing-h2-2026/WorkshopChecklist.tsx 같은 별도 client component로 분리하고, 그 컴포넌트에만 'use client'를 적용해 주세요.

체크리스트 다음에는 ‘이번 주, 딱 한 페이지만 바꿔보세요’ 실행 섹션을 추가해 주세요.
설명은 ‘20개를 한 번에 고치려고 하지 않아도 됩니다. 방문이 많은 페이지 1개를 골라 질문형 소제목, 짧은 답변, FAQ 구조를 추가하는 것부터 시작하세요. 작은 시작이 AI 검색 시대의 가장 확실한 준비입니다.’로 해 주세요.
실행 단계는 다음 3개 카드로 구성해 주세요.
1. 찾기: GA에서 방문 많은 페이지 상위 20개를 확인한다. / 10분
2. 진단하기: 4가지 기준으로 O/X 체크한다. / 10분
3. 고치기: X가 가장 많은 페이지 1개부터 질문형 소제목과 FAQ를 추가한다. / 10분 이상

마지막 CTA는 다음 링크로 구성해 주세요.
체크리스트로 진단 시작하기 → #checklist
교육/컨설팅 문의하기 → #report-contact
핵심 인사이트로 돌아가기 → #key-insights

기존 디자인 톤, 색상, 버튼 스타일, 카드 스타일을 최대한 유지해 주세요.
styles.css에 필요한 클래스만 추가하고, 기존 섹션을 크게 리팩터링하지 마세요.
문의 폼은 이미 MicrositeContactForm.tsx에 있으므로 새 폼을 만들지 말고 #report-contact로 연결하세요.
반응형 UI를 적용하고, 모바일에서는 카드와 비교 섹션이 1열로 자연스럽게 쌓이게 해 주세요.
접근성을 고려해 섹션 제목은 h2, 카드 제목은 h3 등 의미 있는 heading 구조를 사용하고, 버튼과 체크박스에는 명확한 라벨을 제공해 주세요.

작업 완료 후 아래를 실행하고 결과를 요약해 주세요.
npm test
npm run build:free

요약에는 아래를 포함해 주세요.
1. 수정한 파일 목록
2. 각 파일에서 변경한 내용
3. #key-insights, #workshop, #checklist, #report-contact 앵커 동작 확인 결과
4. 모바일 반응형 확인 여부
```

---

## 20. 추가 개선 아이디어

1차 구현 후 여유가 있다면 다음 기능을 추가한다.

1. 체크리스트 결과를 복사하는 버튼
2. “우리 회사 페이지 개선안 작성하기” 입력 폼
3. 수강자가 페이지 URL을 입력하면 개선 메모를 작성할 수 있는 템플릿
4. 강의자료 다운로드 버튼
5. 보고서 핵심 인사이트로 돌아가기 버튼
6. 강의 신청 또는 문의 CTA(`#report-contact`)
7. 실습 완료 체크 기능
8. 진행률 표시 바

---

## 21. 한 줄 요약

이 작업의 핵심은 `https://cxtoax.vercel.app/marketing-h2-2026#key-insights`의 핵심 인사이트 섹션을 확장하여, 수강자가 하반기 전략 보고서의 AI 검색 인사이트를 이해한 뒤 **15분 워크숍 → 체크리스트 → 이번 주 페이지 1개 개선 → 교육/컨설팅 문의**로 자연스럽게 이동하게 만드는 것이다.
