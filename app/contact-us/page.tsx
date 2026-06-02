import { Suspense } from "react";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata = {
  title: "Contact us | LOUD",
};

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageClient />
    </Suspense>
  );
}
