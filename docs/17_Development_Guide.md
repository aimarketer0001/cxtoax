# Development Guide

## 개발 목표
수강 전 역량 진단 및 맞춤 교육 추천 서비스 MVP를 구현한다.

## 구현 순서
1. 프로젝트 초기화
2. DB schema 작성
3. course/question seed 작성
4. 시작 화면 구현
5. 기본 정보 입력 구현
6. 20개 문항 Step Form 구현
7. 점수 계산 로직 구현
8. 유형 분류 로직 구현
9. 추천 엔진 구현
10. 결과 화면 구현
11. AI 리포트 생성 및 fallback 구현
12. 관리자 로그인/목록/상세/통계 구현
13. 테스트 작성
14. 배포 준비

## 권장 폴더 구조
```text
project-root/
  app/
    diagnosis/
    admin/
    api/
  components/
    diagnosis/
    result/
    admin/
  lib/
    scoring/
    classification/
    recommendation/
    report/
    privacy/
    db/
  prisma/
  data/
  docs/
  tests/
```

## 핵심 함수
- maskSensitiveText
- calculateQuestionScore
- calculateAreaScores
- calculateTotalScore
- checkHoldConditions
- classifyLearner
- recommendCourses
- buildRuleBasedReport
- generateAIReport
- validateAIReport

## 완료 조건
- 진단 시작부터 결과 표시까지 동작
- 20개 문항 데이터 기반 렌더링
- 점수 계산 정확
- 유형 분류와 보류 조건 동작
- 추천 교육 1~3순위 표시
- AI 실패 시 fallback
- 관리자 통계 표시
- 개인정보 마스킹 테스트 통과
