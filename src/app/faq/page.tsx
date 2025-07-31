import { getAllFaqs } from "@/lib/faq-server";
import { FaqPageClient } from "@/components/faq/FaqPageClient";

export default function FaqPage() {
  const faqs = getAllFaqs();

  return <FaqPageClient initialFaqs={faqs} />;
}
