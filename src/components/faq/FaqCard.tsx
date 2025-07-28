import Link from "next/link";
import { FaqMeta } from "@/types/faq";

interface FaqCardProps {
  faq: FaqMeta;
}

export default function FaqCard({ faq }: FaqCardProps) {
  return (
    <Link href={`/faq/${faq.slug}`} className="block group">
      <div className="flex items-start gap-3 py-9 hover:bg-gray-50 rounded-md px-2 transition-colors duration-200">
        {/* Orange Dot */}
        <div className="flex-shrink-0 mt-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#FFA015" }}
          />
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-black transition-colors group-hover:text-[#FFA015]"
            style={{
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            {faq.question}
          </h3>
        </div>
      </div>
    </Link>
  );
}
