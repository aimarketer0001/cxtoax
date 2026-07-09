import fs from "fs";
import path from "path";
import { Area, CourseRecord, QuestionConfig, QuestionType } from "./types";
import { QUESTION_CONFIG, QUESTION_WEIGHT } from "./questionConfig";

interface SeedQuestion {
  no: number;
  question: string;
  type: QuestionType;
  area: Area;
  required: boolean;
}

interface SeedCourse {
  course_id: string;
  category: string;
  title: string;
  type: string;
  target: string;
  suggested_level: string;
  recommended_for: string;
  not_recommended_for: string;
  is_representative: boolean;
}

function dataDir() {
  return path.join(process.cwd(), "data");
}

/** Load the diagnosis questions from seed and merge in options/weight config. */
export function loadQuestions(): QuestionConfig[] {
  const raw = fs.readFileSync(
    path.join(dataDir(), "diagnosis_questions.seed.json"),
    "utf-8"
  );
  const seed: SeedQuestion[] = JSON.parse(raw);
  return seed
    .map((q) => ({
      no: q.no,
      question: q.question,
      type: q.type,
      area: q.area,
      required: q.required,
      maxScore: QUESTION_WEIGHT[q.no] ?? 5, // weight = max points for this question
      options: QUESTION_CONFIG[q.no]?.options,
    }))
    .sort((a, b) => a.no - b.no);
}

/** Public-facing question list (safe to expose — no scoring weights). */
export function loadPublicQuestions() {
  return loadQuestions().map((q) => ({
    no: q.no,
    question: q.question,
    type: q.type,
    area: q.area,
    required: q.required,
    options: q.options?.map((o) => ({ value: o.value, label: o.label })),
  }));
}

export function loadCourses(): CourseRecord[] {
  const raw = fs.readFileSync(
    path.join(dataDir(), "course_catalog.seed.json"),
    "utf-8"
  );
  const seed: SeedCourse[] = JSON.parse(raw);
  return seed.map((c) => ({
    courseId: c.course_id,
    category: c.category,
    title: c.title,
    type: c.type,
    target: c.target,
    suggestedLevel: c.suggested_level,
    recommendedFor: c.recommended_for,
    notRecommendedFor: c.not_recommended_for,
    isRepresentative: c.is_representative,
  }));
}
