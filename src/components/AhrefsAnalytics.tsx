import Script from "next/script";

export function AhrefsAnalytics() {
  return (
    <Script id="ahrefs-analytics" strategy="afterInteractive">
      {`(function () {
  var s = document.createElement("script");
  s.src = "https://analytics.ahrefs.com/analytics.js";
  s.setAttribute("data-key", "wCIfy7b80K+MZzEVyskB/w");
  s.async = true;
  document.head.appendChild(s);
})();`}
    </Script>
  );
}
