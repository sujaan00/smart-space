import { ok, problem } from "@/lib/api-response";
import { requireAdmin } from "@/lib/admin";
import { logger } from "@/lib/logger";

const sampleReports = [
  { id: "report-1048", listing: "Unverified brokerage repost", reason: "Duplicate content", risk: "High", status: "Open" },
  { id: "report-1047", listing: "Garden apartment", reason: "Pricing looks misleading", risk: "Medium", status: "Reviewing" },
  { id: "report-1046", listing: "Office near metro", reason: "Contact spam", risk: "Medium", status: "Open" },
];

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    logger.warn("admin_reports_access_denied");
    return problem("Administrator access is required.", 403, "FORBIDDEN");
  }

  return ok({ reports: sampleReports });
}

