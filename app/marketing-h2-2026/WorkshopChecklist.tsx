"use client";

import { useState } from "react";

const checklistItems = [
  "질문형 소제목이 있는가?",
  "질문 바로 아래에 2~3문장의 짧은 답이 있는가?",
  "가격, 스펙, 비교 정보가 이미지가 아니라 텍스트로 제공되는가?",
  "FAQ, 최종 업데이트 날짜, 출처가 명시되어 있는가?",
];

export default function WorkshopChecklist() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    checklistItems.map(() => false)
  );
  const checkedCount = checkedItems.filter(Boolean).length;
  const resultMessage =
    checkedCount <= 1
      ? "AI가 읽기 어려운 페이지입니다. FAQ 구조부터 추가해 보세요."
      : checkedCount <= 3
        ? "기본 구조는 있으나 인용 가능성을 높이려면 답변형 문단과 출처를 보강하세요."
        : "AI 검색 대응 기본 구조가 잘 갖춰져 있습니다. 최신성 유지와 내부 링크를 점검하세요.";

  function toggleItem(index: number) {
    setCheckedItems((current) =>
      current.map((checked, itemIndex) =>
        itemIndex === index ? !checked : checked
      )
    );
  }

  return (
    <div className="workshop-checklist-card">
      <div className="checklist-score" aria-live="polite">
        <span>충족 기준</span>
        <strong>{checkedCount} / {checklistItems.length}</strong>
      </div>

      <div className="checklist-items">
        {checklistItems.map((item, index) => {
          const id = `workshop-check-${index}`;

          return (
            <label className="checklist-item" htmlFor={id} key={item}>
              <input
                id={id}
                checked={checkedItems[index]}
                onChange={() => toggleItem(index)}
                type="checkbox"
              />
              <span>{index + 1}</span>
              <strong>{item}</strong>
            </label>
          );
        })}
      </div>

      <div className="checklist-result" role="status" aria-live="polite">
        <span>진단 결과</span>
        <p>{resultMessage}</p>
      </div>
    </div>
  );
}
