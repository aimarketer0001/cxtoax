import {
  AreaScore,
  ClassificationResult,
  RecommendationItem,
  ReportContent,
} from "./types";

export interface ReportInput {
  totalScore: number;
  areaScores: AreaScore[];
  classification: ClassificationResult;
  recommendations: RecommendationItem[];
  consultationRecommended: boolean;
}

const AREA_TIP: Record<string, string> = {
  "AI 이해도": "생성형 AI의 기본 개념과 활용 범위를 먼저 익히면 좋습니다.",
  "디지털 활용 역량": "문서·스프레드시트 등 기본 디지털 도구 사용에 익숙해지면 학습 효과가 커집니다.",
  "업무 적용 역량": "교육에서 만들 결과물을 구체적으로 정해두면 적용 효과가 높아집니다.",
  "기획 및 문제정의 역량": "목표·대상·문제·결과물을 구분해 정리하는 연습을 권장합니다.",
  "학습 의지 및 실행력": "교육 후 스스로 반복 실습할 시간을 미리 확보하는 것이 중요합니다.",
};

/** Deterministic, always-available report (fallback when AI is unavailable). */
export function buildRuleBasedReport(input: ReportInput): ReportContent {
  const { totalScore, areaScores, classification, recommendations } = input;
  const sorted = [...areaScores].sort((a, b) => b.score / b.max - a.score / a.max);
  const strong = sorted.slice(0, 2);
  const weak = [...sorted].reverse().slice(0, 2);

  const strengths = strong.map(
    (a) => `${a.area}이(가) 상대적으로 우수합니다 (${a.score}/${a.max}점).`
  );

  const improvements = weak.map(
    (a) => `${a.area} 보완이 필요합니다 (${a.score}/${a.max}점). ${AREA_TIP[a.area] ?? ""}`.trim()
  );

  const preparation: string[] = [
    "교육에서 다루고 싶은 실제 업무 사례를 1~2개 준비해 오세요.",
    "학습한 내용을 적용할 수 있는 시간을 주 1~2회 확보하는 것을 권장합니다.",
  ];
  if (classification.learnerType === "입문 체험형") {
    preparation.unshift("AI 도구(ChatGPT 등)를 미리 한 번 사용해 보면 수업 이해가 빠릅니다.");
  }

  const cautions: string[] = [];
  if (classification.onHold) {
    cautions.push(...classification.holdReasons);
    cautions.push("현재는 무리한 수강보다 상담을 통한 방향 설정을 권장합니다.");
  }

  const summary = buildSummarySentence(totalScore, classification, recommendations);
  const consultationMessage = buildConsultationMessage(classification, recommendations);

  return {
    source: "rule",
    summary,
    strengths,
    improvements,
    recommendations: recommendations.map((r) => ({
      rank: r.rank,
      courseId: r.courseId,
      courseTitle: r.courseTitle,
      reason: r.reason,
      expectedEffect: `${r.category} 영역의 실무 역량을 강화할 수 있습니다.`,
    })),
    preparation,
    consultationMessage,
    cautions,
  };
}

function buildSummarySentence(
  totalScore: number,
  classification: ClassificationResult,
  recommendations: RecommendationItem[]
): string {
  const top = recommendations[0];
  const base = `진단 총점은 100점 중 ${totalScore}점이며, 수강자 유형은 '${classification.learnerType}'(교육 적합도: ${classification.fitLevel})입니다.`;
  if (classification.onHold) {
    return `${base} 자동 보류 조건에 해당하여, 정확한 방향 설정을 위한 상담을 먼저 권장합니다.`;
  }
  if (top) {
    return `${base} 가장 적합한 과정은 '${top.courseTitle}'입니다.`;
  }
  return base;
}

function buildConsultationMessage(
  classification: ClassificationResult,
  recommendations: RecommendationItem[]
): string {
  const top = recommendations[0];
  if (classification.onHold) {
    return "안녕하세요. 진단 결과 현재 학습 준비도를 함께 점검하면 좋겠습니다. 목표와 활용 계획을 바탕으로 적합한 과정을 상담을 통해 안내드리겠습니다.";
  }
  const course = top ? `'${top.courseTitle}' 과정` : "적합한 과정";
  return `안녕하세요. 진단 결과 '${classification.learnerType}'으로 분류되어 ${course}을(를) 우선 추천드립니다. 학습 목표와 일정에 맞춰 세부 내용을 안내드리겠습니다.`;
}
