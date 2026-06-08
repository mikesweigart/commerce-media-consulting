import { MetadataRoute } from "next";

// AI assistants and answer engines we explicitly want to read and cite the
// site (ChatGPT, Claude, Perplexity, Gemini/Google AI, Apple, Common Crawl,
// etc.). Don WANTS to surface in AI answers, so these are allowed, not blocked.
const aiAndSearchBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "DuckAssistBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiAndSearchBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://www.cmcgco.com/sitemap.xml",
    host: "https://www.cmcgco.com",
  };
}
