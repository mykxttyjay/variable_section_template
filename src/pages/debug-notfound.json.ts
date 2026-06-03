import type { APIRoute } from "astro";
import { getEmDashEntry } from "emdash";
import { getEntry } from "~/lib/content";

export const prerender = false;

export const GET: APIRoute = async () => {
  const out: Record<string, unknown> = {};
  try {
    const r = await getEmDashEntry("locations", "nowhere");
    out.raw = { hasEntry: Boolean(r.entry), hasError: Boolean(r.error), errName: (r.error as any)?.name };
  } catch (err: any) {
    out.rawThrew = { name: err?.name, message: err?.message };
  }
  try {
    const e = await getEntry("locations", "nowhere");
    out.helper = e === null ? "null (good)" : "got entry";
  } catch (err: any) {
    out.helperThrew = { name: err?.name, message: err?.message };
  }
  return new Response(JSON.stringify(out, null, 2), {
    headers: { "content-type": "application/json" },
  });
};
