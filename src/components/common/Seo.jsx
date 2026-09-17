import { useEffect } from "react";

export function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    if (title) document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (description && descriptionTag)
      descriptionTag.setAttribute("content", description);

    const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
    if (!siteUrl) return undefined;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = `${siteUrl}${path}`;
    return undefined;
  }, [title, description, path]);

  return null;
}
