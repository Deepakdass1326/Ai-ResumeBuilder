import Link from "next/link";
import { FileText } from "lucide-react";

export function BrandLogo({ href = "/", compact = false, inverse = false }: { href?: string; compact?: boolean; inverse?: boolean }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2.5 font-semibold tracking-[-0.02em] ${inverse ? "text-white" : "text-slate-900"}`} aria-label="Careerly home">
      <span className="grid size-8 place-items-center rounded-[10px] bg-[#6558e8] text-white shadow-[0_8px_18px_-10px_#6558e8]">
        <FileText className="size-4" strokeWidth={2.4} />
      </span>
      {!compact && <span className="text-[17px]">ATSReady</span>}
    </Link>
  );
}
