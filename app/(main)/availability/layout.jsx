import { Children, Suspense } from "react";

export default function AvailabilityLayout({ children }) {
  return (
    <div className="mx-auto">
      <Suspense fallback={<h3>Loading Ui</h3>}>{children}</Suspense>
    </div>
  );
}
