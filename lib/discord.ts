import { absoluteUrl } from "./site";

type InquiryNotification = {
  id: string;
  createdAt: Date;
  source?: string;
  topic?: string;
};

const DISCORD_COLOR = 0x1c3d5a;
const WEBHOOK_TIMEOUT_MS = 5_000;

function text(value: string | undefined, max = 160): string {
  const normalized = value?.trim().replace(/\s+/g, " ");
  return normalized ? normalized.slice(0, max) : "미입력";
}

function webhookUrl(rawUrl: string): URL {
  const url = new URL(rawUrl);
  const allowedHosts = new Set([
    "discord.com",
    "discordapp.com",
    "ptb.discord.com",
    "canary.discord.com",
  ]);

  if (
    url.protocol !== "https:" ||
    !allowedHosts.has(url.hostname) ||
    !/^\/api\/webhooks\/[^/]+\/[^/]+/.test(url.pathname)
  ) {
    throw new Error("DISCORD_WEBHOOK_URL 형식이 올바르지 않습니다.");
  }

  url.searchParams.set("wait", "true");
  return url;
}

function formatKoreanTime(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export async function notifyDiscordOfInquiry(
  inquiry: InquiryNotification
): Promise<"sent" | "skipped"> {
  const configuredUrl = process.env.DISCORD_WEBHOOK_URL?.trim();
  if (!configuredUrl) return "skipped";

  const url = webhookUrl(configuredUrl);
  const adminUrl = absoluteUrl(`/admin/inquiries/${encodeURIComponent(inquiry.id)}`);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "CX to AX 알림",
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: "새 교육문의가 등록되었습니다",
          description:
            "개인정보와 문의 내용은 Discord에 표시하지 않습니다. 관리자 화면에서 확인해 주세요.",
          url: adminUrl,
          color: DISCORD_COLOR,
          fields: [
            { name: "접수 번호", value: text(inquiry.id, 100), inline: false },
            { name: "유입 경로", value: text(inquiry.source, 80), inline: true },
            { name: "문의 목적", value: text(inquiry.topic, 160), inline: true },
            {
              name: "접수 시각",
              value: formatKoreanTime(inquiry.createdAt),
              inline: false,
            },
          ],
          footer: { text: "CX to AX 교육문의 알림" },
          timestamp: inquiry.createdAt.toISOString(),
        },
      ],
    }),
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });

  if (!response.ok) {
    const responseText = (await response.text()).slice(0, 300);
    throw new Error(
      `Discord webhook 전송 실패 (${response.status})${responseText ? `: ${responseText}` : ""}`
    );
  }

  return "sent";
}
