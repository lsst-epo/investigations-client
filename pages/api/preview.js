import { getPageUrlByUid } from "@/api/pages";

export default async (req, res) => {
  const { query } = req;
  const isCraftPreview =
    query["x-craft-preview"] || query["x-craft-live-preview"];

  if (!query.entryUid) {
    return res
      .status(401)
      .json({ message: "Not allowed to access this route" });
  }

  let site = "default";
  if (query.site === "ES") {
    site = "es";
  }

  // Fetch the headless CMS to check if the provided entry exists
  const entry = await getPageUrlByUid(query.entryUid, site);

  if (!entry?.url) {
    return res.status(401).json({
      message: `URL of the entry "${query.entryUid}" could not be fetched`,
    });
  }

  // Enable Preview Mode by setting the cookies
  if (isCraftPreview) {
    res.setPreviewData({
      previewToken: query.token ?? null,
    });
  }

  const fixedUrl = entry.url.replace("/es/es", "/es");
  const parsedUrl = new URL(fixedUrl);

  // Redirect to the path from the fetched url
  res.writeHead(307, { Location: parsedUrl.pathname });
  res.end();
};
