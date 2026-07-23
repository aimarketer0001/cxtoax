export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "https://cxtoax.vercel.app";

export const SITE_NAME = "CX to AX";

export const DEFAULT_DESCRIPTION =
  "CRM·Salesforce 컨설팅 경험을 바탕으로 기업과 실무자를 위한 AI·AX 전환 교육, 생성형 AI 활용 교육, CRM 업무 자동화 교육을 제공합니다.";

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
