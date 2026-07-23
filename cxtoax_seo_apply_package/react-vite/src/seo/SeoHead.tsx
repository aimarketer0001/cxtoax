import { Helmet } from "react-helmet-async";

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const SITE_URL = "https://cxtoax.vercel.app";

export default function SeoHead({
  title,
  description,
  path,
  type = "website",
  jsonLd,
}: SeoHeadProps) {
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const safeJson = jsonLd
    ? JSON.stringify(jsonLd).replace(/</g, "\\u003c")
    : null;

  return (
    <Helmet>
      <html lang="ko" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="CX to AX" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

      {safeJson ? (
        <script type="application/ld+json">{safeJson}</script>
      ) : null}
    </Helmet>
  );
}
