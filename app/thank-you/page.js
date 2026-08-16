"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "+91 98765 43210";
  const request = searchParams.get("request") || "callback";
  const course = searchParams.get("course") || "your selected course";

  return (
    <main className="thank-you-shell">
      <section className="thank-you-card">
        <span className="eyebrow">Submission received</span>
        <h1>Hola Amigo!</h1>
        <h2>Thank you for signing up</h2>
        <p>An Expert from our team will soon connect with you.</p>
        <p>
          {request === "brochure"
            ? `If the brochure for ${course} did not download automatically, our team will share it with you as well.`
            : "Your callback request has been shared with our team."}
        </p>
        <p>If you want to reach out to us instantly</p>
        <a href={`tel:${phone}`} className="thank-you-call">
          Call us on : {phone}
        </a>
        <a href="/" className="thank-you-back">
          Back to website
        </a>
      </section>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<main className="thank-you-shell"><section className="thank-you-card"><h1>Thank you!</h1></section></main>}>
      <ThankYouContent />
    </Suspense>
  );
}
