// Privacy masking for free-text input (docs/13_Security.md 마스킹 규칙).
// Applied BEFORE storing free text and BEFORE sending anything to the LLM.

const EMAIL = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
// Korean & general phone numbers: 010-1234-5678, 01012345678, +82 10 ..., 02-123-4567
const PHONE =
  /(\+?\d{1,3}[-.\s]?)?(01[016789]|0\d{1,2})[-.\s]?\d{3,4}[-.\s]?\d{4}/g;
// Korean resident/business registration style numbers: 6-7 or 3-2-5 digits
const RRN = /\b\d{6}[-\s]?\d{7}\b/g;
const BIZNO = /\b\d{3}[-\s]?\d{2}[-\s]?\d{5}\b/g;
// Common API key / token shapes (sk-..., long hex/base64 blobs)
const API_KEY = /\b(sk|pk|api|key|token|bearer)[-_ ]?[A-Za-z0-9_\-]{16,}\b/gi;
const LONG_TOKEN = /\b[A-Za-z0-9_\-]{32,}\b/g;
// Address keywords followed by details (시/도/구/동/로/길 + numbers)
const ADDRESS =
  /([가-힣]+(시|도|구|군)\s?)+[가-힣0-9]+(로|길|동|읍|면)\s?\d[\d\-]*(번지|호)?/g;

export function maskSensitiveText(input: string | null | undefined): string {
  if (!input) return "";
  let out = String(input);
  out = out.replace(EMAIL, "[email_removed]");
  out = out.replace(RRN, "[id_removed]");
  out = out.replace(BIZNO, "[id_removed]");
  out = out.replace(API_KEY, "[key_removed]");
  out = out.replace(PHONE, "[phone_removed]");
  out = out.replace(ADDRESS, "[address_removed]");
  // Catch remaining very long opaque tokens (potential keys) last.
  out = out.replace(LONG_TOKEN, "[key_removed]");
  return out.trim();
}

/** True if the text still appears to contain personal identifiers. */
export function containsSensitive(input: string | null | undefined): boolean {
  if (!input) return false;
  const s = String(input);
  // Masking replaces any identifier with a token; if the output differs the
  // input contained something sensitive. Avoids global-regex lastIndex bugs.
  return maskSensitiveText(s) !== s.trim();
}
