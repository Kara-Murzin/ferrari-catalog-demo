// =====================================================================
//  Hayate Motors (demo) — company details used by every page of the site.
//  The company is fictional; WhatsApp and Telegram lead to the developer.
//  Fill in the empty strings; leave a field "" until the data is known
//  and the page shows "未設定 / To be announced" in its place.
// =====================================================================
window.COMPANY = {
  // --- Legal entity -------------------------------------------------
  nameEn: "HAYATE MOTORS Co., Ltd. (demo)",
  nameJa: "株式会社HAYATE MOTORS（デモ）",
  representativeEn: "Taro Yamada",
  representativeJa: "代表取締役 山田 太郎",
  postalCode: "100-0001",
  addressEn: "1-1 Chiyoda, Chiyoda-ku, Tokyo",
  addressJa: "東京都千代田区千代田1-1",
  phone: "03-0000-0000",          // shown on the Japanese pages
  phoneIntl: "+81 3-0000-0000",   // shown to visitors from abroad; used for tel: links
  email: "",             // e.g. "info@example.com" — also enables the request form
  hours: "Mon–Sat, 10:00–19:00 JST",
  hoursJa: "月〜土 10:00〜19:00(日本時間)",

  // --- Secondhand dealer licence (古物営業法) -------------------------
  licenceCommissionJa: "", // 許可をした公安委員会, e.g. "東京都公安委員会"
  licenceCommissionEn: "", // e.g. "Tokyo Metropolitan Public Safety Commission"
  licenceNo: "",           // 12-digit 許可証番号, e.g. "301234567890"
  goodsCategoryJa: "自動車",
  goodsCategoryEn: "Automobiles",

  // --- Messaging ------------------------------------------------------
  whatsapp: "818085228017",           // digits only; receives car orders from the catalog
  whatsappLabel: "+81 80 8522 8017",   // how the number is shown on the site
  telegram: "Zhosek",   // username without @
  instagram: "",   // username without @

  // --- Sales terms for 特定商取引法に基づく表記 --------------------------
  // Leave "" until the CEO confirms; suggested wording is in the comments.
  paymentMethodJa: "会社名義の法人口座への銀行振込(SWIFT/海外送金)",
  paymentMethodEn: "Bank transfer (SWIFT) to the company's corporate account",
  paymentTimingJa: "車両の購入前に代金の100%を前払いでお支払いいただきます。請求書(インボイス)発行後3銀行営業日以内にお振込みください。",
  paymentTimingEn: "100% prepayment before we purchase the vehicle, within 3 banking days after the invoice is issued.",
  deliveryJa: "ご入金確認後、キルギス・カザフスタン向けは概ね45日以内にお届けします(船便のスケジュールにより前後します)。その他の国は個別にご案内します。",
  deliveryEn: "Approximately up to 45 days to Kyrgyzstan and Kazakhstan after payment is received, depending on shipping schedules. Other destinations are quoted individually.",
  returnsJa: "車両購入前のキャンセル：協議のうえ対応いたします。車両購入後のキャンセル：実際に発生した費用および契約書に定める違約金を差し引いて精算いたします。",
  returnsEn: "Before the vehicle is purchased: by agreement. After the vehicle is purchased: the actual costs incurred and the penalty set out in the contract are deducted.",

  // --- Pricing ---------------------------------------------------------
  // Catalog prices in USD use the live market USD/JPY rate minus this many yen
  // (market 157.98 -> 155.98 yen per dollar). The rate itself is never shown.
  fxMarginYen: 2,

  // --- Policy dates -----------------------------------------------------
  privacyDate: "",      // 制定日, e.g. "2026年11月1日"
  privacyDateEn: "",    // e.g. "1 November 2026"
};

// Fills every element with data-co="field" (and data-co-href="mailto|tel|wa|tg").
(function () {
  const C = window.COMPANY;
  const has = (v) => typeof v === "string" && v.trim() !== "";
  window.COMPANY_HAS = has;
  const TBA = '<span class="tba">未設定 / To be announced</span>';
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function fill() {
    document.querySelectorAll("[data-co]").forEach((el) => {
      const keys = el.dataset.co.split("+");
      const vals = keys.map((k) => C[k]).filter(has);
      if (vals.length) el.textContent = vals.join(" ");
      else el.innerHTML = el.dataset.coEmpty ? esc(el.dataset.coEmpty) : TBA;
    });
    document.querySelectorAll("[data-co-href]").forEach((el) => {
      const [kind, key] = el.dataset.coHref.split(":");
      const v = C[key];
      if (!has(v)) return;
      el.href = { mailto: "mailto:" + v, tel: "tel:" + v.replace(/[^\d+]/g, ""), wa: "https://wa.me/" + v, tg: "https://t.me/" + v, ig: "https://www.instagram.com/" + v + "/" }[kind];
    });
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fill) : fill();
})();
