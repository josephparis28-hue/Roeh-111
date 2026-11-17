/* ROEH 111 public site configuration. The Formspree form ID below is a public
   submission endpoint, not a private API key. It receives all three branches.
   Before real use: verify your Formspree account/inbox, send a test inquiry
   from Live Server and the published site, and review privacy.html.
   NEVER commit private API keys, passwords, or Formspree account tokens. */
window.ROEH_CONFIG = Object.freeze({
  formEndpoint: "https://formspree.io/f/xvkaawre", // Public Formspree POST endpoint
  businessEmail: "", // Optional verified public contact address for mailto fallback
  restoreServiceArea: "Pampa, Texas region — verify service availability before publishing"
});
