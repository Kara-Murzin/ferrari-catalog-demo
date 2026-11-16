// Landing page behaviour, shared by / (English) and /ja/ (Japanese).
// Company details live in assets/company.js (shared with the legal pages).
(function () {
  const TEXT = {
    en: {
      invalid: "Please enter your name and a valid email.",
      noEmail: "Requests will open soon. Please message us on WhatsApp or Telegram for now.",
      subject: "Car request — ",
      labels: ["Name", "Email", "Phone / WhatsApp", "Destination", "Car"],
      opened: "Your email app should open with the request ready to send.",
      openedWa: "WhatsApp should open with your request ready to send.",
    },
    ja: {
      invalid: "お名前と正しいメールアドレスを入力してください。",
      noEmail: "フォームは準備中です。WhatsAppまたはTelegramでご連絡ください。",
      subject: "車両のお問い合わせ — ",
      labels: ["お名前", "メールアドレス", "電話番号・WhatsApp", "仕向国", "ご希望の車両"],
      opened: "メールアプリが開き、お問い合わせ内容が入力されます。",
      openedWa: "WhatsAppが開き、お問い合わせ内容が入力されます。",
    },
  };
  const T = TEXT[document.documentElement.lang] || TEXT.en;
  const COMPANY = window.COMPANY, filled = window.COMPANY_HAS;
  const $ = (id) => document.getElementById(id);
  const TBA = '<span class="tba">未設定 / To be announced</span>';

  $("jp-addr").innerHTML = filled(COMPANY.addressJa) ? (filled(COMPANY.postalCode) ? "〒" + COMPANY.postalCode + " " : "") + COMPANY.addressJa.replace(/[<>&]/g, "") : TBA;
  $("jp-lic").innerHTML = filled(COMPANY.licenceCommissionJa) && filled(COMPANY.licenceNo)
    ? `${COMPANY.licenceCommissionJa} 許可 第${COMPANY.licenceNo}号` : TBA;
  // Contact cards, footer icons: shown only for the channels that are set.
  const C = (k) => (filled(COMPANY[k]) ? COMPANY[k] : "");
  const channels = [
    [["ch-wa", "soc-wa"], C("whatsapp") && "https://wa.me/" + C("whatsapp"), COMPANY.whatsappLabel || "+" + C("whatsapp")],
    [["ch-tg"], C("telegram") && "https://t.me/" + C("telegram"), "@" + C("telegram")],
    [["ch-ig", "soc-ig"], C("instagram") && "https://www.instagram.com/" + C("instagram") + "/", "@" + C("instagram")],
    [["ch-mail"], C("email") && "mailto:" + C("email"), C("email")],
  ];
  channels.forEach(([ids, url, label]) => {
    ids.forEach((id) => { $(id).hidden = !url; if (url) $(id).href = url; });
    if (url) $(ids[0] + "-t").textContent = label;
  });
  $("year").textContent = new Date().getFullYear();

  // Header: transparent over the hero, solid after it. Burger menu on phones.
  const nav = $("nav");
  const hero = document.querySelector(".hero");
  const onScroll = () => nav.classList.toggle("solid", window.scrollY > hero.offsetHeight - 80);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  $("burger").addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    $("burger").setAttribute("aria-expanded", open);
  });
  $("links").addEventListener("click", (e) => { if (e.target.closest("a")) { nav.classList.remove("open"); $("burger").setAttribute("aria-expanded", false); } });

  // Reveal sections as they scroll into view.
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }) : null;
  document.querySelectorAll(".rv").forEach((el) => io ? io.observe(el) : el.classList.add("in"));

  // Request form: opens WhatsApp (or, without a number, the email app) with the request filled in.
  $("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target, note = $("form-note");
    if (!f.name.value.trim() || !f.email.checkValidity() || !f.email.value.trim()) {
      note.textContent = T.invalid; note.style.color = "var(--danger)"; return;
    }
    if (!filled(COMPANY.whatsapp) && !filled(COMPANY.email)) {
      note.textContent = T.noEmail; note.style.color = "var(--danger)"; return;
    }
    const [lName, lEmail, lPhone, lDest, lCar] = T.labels;
    const body = [
      `${lName}: ${f.name.value}`, `${lEmail}: ${f.email.value}`, `${lPhone}: ${f.phone.value}`,
      `${lDest}: ${f.country.value}`, `${lCar}: ${f.car.value}`, "", f.message.value,
    ].join("\n");
    if (filled(COMPANY.whatsapp)) {
      window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
      note.textContent = T.openedWa; note.style.color = "";
      return;
    }
    location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(T.subject + (f.car.value || f.name.value))}&body=${encodeURIComponent(body)}`;
    note.textContent = T.opened; note.style.color = "";
  });
})();
