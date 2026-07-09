import { describe, it, expect } from "vitest";
import { maskSensitiveText, containsSensitive } from "../lib/domain/privacy";

describe("maskSensitiveText", () => {
  it("masks email addresses", () => {
    const out = maskSensitiveText("연락처는 hong@example.com 입니다.");
    expect(out).toContain("[email_removed]");
    expect(out).not.toContain("example.com");
  });

  it("masks Korean phone numbers", () => {
    expect(maskSensitiveText("전화 010-1234-5678")).toContain("[phone_removed]");
    expect(maskSensitiveText("전화 01012345678")).toContain("[phone_removed]");
  });

  it("masks resident registration numbers", () => {
    expect(maskSensitiveText("주민번호 900101-1234567")).toContain("[id_removed]");
  });

  it("masks API keys / long tokens", () => {
    const out = maskSensitiveText("키는 sk-abcdefghijklmnop1234 입니다");
    expect(out).toContain("[key_removed]");
  });

  it("masks addresses", () => {
    const out = maskSensitiveText("서울시 강남구 테헤란로 123번지");
    expect(out).toContain("[address_removed]");
  });

  it("leaves ordinary text untouched", () => {
    const text = "제안서 작성에 시간이 오래 걸립니다.";
    expect(maskSensitiveText(text)).toBe(text);
  });

  it("handles empty / nullish input", () => {
    expect(maskSensitiveText("")).toBe("");
    expect(maskSensitiveText(undefined)).toBe("");
    expect(maskSensitiveText(null)).toBe("");
  });
});

describe("containsSensitive", () => {
  it("detects sensitive content", () => {
    expect(containsSensitive("hong@example.com")).toBe(true);
    expect(containsSensitive("010-1234-5678")).toBe(true);
  });
  it("returns false for clean text", () => {
    expect(containsSensitive("업무 자동화를 배우고 싶습니다.")).toBe(false);
    expect(containsSensitive("")).toBe(false);
  });
});
