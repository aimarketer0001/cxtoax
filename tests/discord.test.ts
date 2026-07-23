import { afterEach, describe, expect, it, vi } from "vitest";
import { notifyDiscordOfInquiry } from "../lib/discord";

const inquiry = {
  id: "inquiry_123",
  createdAt: new Date("2026-07-23T12:34:00.000Z"),
  source: "contact",
  topic: "기업 AI 교육",
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("notifyDiscordOfInquiry", () => {
  it("skips the notification when no webhook is configured", async () => {
    vi.stubEnv("DISCORD_WEBHOOK_URL", "");
    const fetchMock = vi.spyOn(globalThis, "fetch");

    await expect(notifyDiscordOfInquiry(inquiry)).resolves.toBe("skipped");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends a privacy-preserving embed and waits for confirmation", async () => {
    vi.stubEnv(
      "DISCORD_WEBHOOK_URL",
      "https://discord.com/api/webhooks/123/token"
    );
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));

    await expect(notifyDiscordOfInquiry(inquiry)).resolves.toBe("sent");

    const [requestUrl, requestInit] = fetchMock.mock.calls[0];
    expect(String(requestUrl)).toContain("wait=true");
    expect(requestInit?.method).toBe("POST");

    const payload = JSON.parse(String(requestInit?.body));
    expect(payload.allowed_mentions).toEqual({ parse: [] });
    expect(payload.embeds[0].title).toBe("새 교육문의가 등록되었습니다");
    expect(payload.embeds[0].url).toContain("/admin/inquiries/inquiry_123");
    expect(payload.embeds[0].fields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "유입 경로", value: "contact" }),
        expect.objectContaining({ name: "문의 목적", value: "기업 AI 교육" }),
      ])
    );

    const serialized = JSON.stringify(payload);
    expect(serialized).not.toContain("phone");
    expect(serialized).not.toContain("email");
    expect(serialized).not.toContain("message");
  });

  it("rejects non-Discord webhook URLs", async () => {
    vi.stubEnv("DISCORD_WEBHOOK_URL", "https://example.com/api/webhooks/123/token");

    await expect(notifyDiscordOfInquiry(inquiry)).rejects.toThrow(
      "DISCORD_WEBHOOK_URL 형식이 올바르지 않습니다."
    );
  });

  it("reports Discord API failures", async () => {
    vi.stubEnv(
      "DISCORD_WEBHOOK_URL",
      "https://discord.com/api/webhooks/123/token"
    );
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("invalid webhook", { status: 404 })
    );

    await expect(notifyDiscordOfInquiry(inquiry)).rejects.toThrow(
      "Discord webhook 전송 실패 (404)"
    );
  });
});
