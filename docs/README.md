# 수강 전 역량 진단 및 맞춤 교육 추천 서비스 개발 문서

생성일: 2026-07-07

## 프로젝트 목적
수강자가 교육을 신청하기 전에 AI 이해도, 디지털 활용 역량, 업무 적용 역량, 기획·문제정의 역량, 학습 의지와 실행력을 진단하고, 30개 교육 과정 중 가장 적합한 과정을 추천하는 웹 서비스를 개발한다.

## 첨부 템플릿 확인 결과
- 00_Project_Rules.md
- 01_PRD.md
- 02_Requirement.md
- 03_Function_Spec.md
- 04_UI_UX.md
- 05_API.md
- 06_DB.md
- 07_Agent.md
- 08_Prompt.md
- 09_Workflow.md
- 10_Architecture.md
- 11_design.md
- 12_Test.md
- 13_Deploy.md
- 14_Development_Guide.md

## 생성 문서
PRD, Requirements, Architecture, Function Spec, UI/UX, API, DB, Prompt, Agent, Workflow, design, Test, Security, Deploy, Operation, AI Evaluation, Development Guide, Vibe Coding Execution Prompt를 포함한다.

## 핵심 MVP
1. 진단 시작 및 개인정보 비저장 안내
2. 기본 정보 입력
3. 20개 문항 응답
4. 영역별 점수와 총점 계산
5. 자동 보류 조건 판단
6. 수강자 유형 분류
7. 교육 과정 1~3순위 추천
8. 기본 리포트 및 AI 보강 리포트 생성
9. 관리자 응답 목록과 통계 대시보드

## 데이터 시드
- `data/course_catalog.seed.json`
- `data/diagnosis_questions.seed.json`
