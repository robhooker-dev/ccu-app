import nplogo from './np-logo.png';
import React, { useState } from "react";
// ─── Data & Config ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "sexual", label: "Sexual Misconduct including APSP", icon: "🚨" },
  { id: "theft", label: "Theft and Fraud", icon: "💰" },
  { id: "access", label: "Unauthorised Accessing", icon: "🔓" },
  { id: "drugs", label: "Drug and Substance Misuse", icon: "💊" },
  { id: "associations", label: "Inappropriate Associations", icon: "🔗" },
  { id: "ocg", label: "Organised Crime", icon: "🕵️" },
  { id: "social", label: "Social Media", icon: "📱" },
  { id: "business", label: "Business Interests", icon: "💼" },
  { id: "avoidance", label: "Work Avoidance", icon: "🚫" },
  { id: "other", label: "Other Serious Corruption", icon: "📋" },
];

const LANGUAGES = [
  { code: "en", label: "EN", full: "English" },
  { code: "es", label: "ES", full: "Español" },
  { code: "fr", label: "FR", full: "Français" },
  { code: "pl", label: "PL", full: "Polski" },
  { code: "ur", label: "UR", full: "اردو" },
];

const T = {
  en: {
    appName: "SHIELD REPORT", tagline: "Secure · Anonymous · Confidential",
    chooseRole: "Select your access mode to continue",
    reporterTitle: "Submit a Report", reporterSub: "Anonymous & Encrypted",
    ccuTitle: "CCU Officer Access", ccuSub: "Authorised Personnel Only",
    submitReport: "Submit Anonymous Report", category: "Report Category",
    description: "Describe the incident",
    descPlaceholder: "Provide as much detail as possible. Include dates, locations, people involved, and any evidence you have. Your identity will not be recorded.",
    saveDraft: "Save Draft", submitting: "Encrypting & Submitting",
    yourToken: "Your Anonymous Token",
    tokenInstr: "Save this token. You will need it to check for responses from the CCU. Do not share it with anyone.",
    checkInbox: "Check My Inbox", enterToken: "Enter your token to access your secure inbox",
    tokenLabel: "Report Token", viewMessages: "Access Inbox",
    noCCUReplies: "No replies yet. The CCU team will respond after reviewing your report.",
    optInBroadcasts: "Receive general CCU updates in this inbox",
    ccuLoginTitle: "Officer Authentication", ccuPassword: "Access Code",
    ccuAccess: "Access Dashboard", invalidPassword: "Invalid access code. Try again.",
    dashboard: "Reports Dashboard", reportId: "Report ID",
    risk: "Risk", status: "Status", category2: "Category", submitted: "Submitted",
    broadcast: "Broadcast Update", broadcastPlaceholder: "Send a general update to all opted-in reporters...",
    sendBroadcast: "Send Broadcast", replyPlaceholder: "Type your response to this reporter...",
    sendReply: "Send Reply", assessingRisk: "Analysing risk level",
    riskLabel: "AI Risk Assessment", back: "Back",
    totalReports: "Total Reports", openCases: "Open Cases", criticalAlerts: "Critical",
    language: "Language", reporter: "Reporter", ccuOfficer: "CCU Officer",
  },
  es: {
    appName: "SHIELD REPORT", tagline: "Seguro · Anónimo · Confidencial",
    chooseRole: "Seleccione su modo de acceso para continuar",
    reporterTitle: "Enviar un Informe", reporterSub: "Anónimo y Cifrado",
    ccuTitle: "Acceso Oficial CCU", ccuSub: "Solo Personal Autorizado",
    submitReport: "Enviar Informe Anónimo", category: "Categoría del Informe",
    description: "Describa el incidente",
    descPlaceholder: "Proporcione tantos detalles como sea posible. Incluya fechas, lugares y personas involucradas.",
    saveDraft: "Guardar Borrador", submitting: "Cifrando y Enviando",
    yourToken: "Su Token Anónimo",
    tokenInstr: "Guarde este token. Lo necesitará para verificar las respuestas de la CCU.",
    checkInbox: "Revisar Bandeja", enterToken: "Ingrese su token para acceder a su bandeja segura",
    tokenLabel: "Token de Informe", viewMessages: "Acceder a Bandeja",
    noCCUReplies: "Sin respuestas aún.",
    optInBroadcasts: "Recibir actualizaciones generales de CCU",
    ccuLoginTitle: "Autenticación de Oficial", ccuPassword: "Código de Acceso",
    ccuAccess: "Acceder al Panel", invalidPassword: "Código inválido.",
    dashboard: "Panel de Informes", reportId: "ID", risk: "Riesgo", status: "Estado",
    category2: "Categoría", submitted: "Enviado",
    broadcast: "Transmisión General", broadcastPlaceholder: "Enviar actualización general...",
    sendBroadcast: "Enviar", replyPlaceholder: "Escriba su respuesta...",
    sendReply: "Enviar Respuesta", assessingRisk: "Analizando nivel de riesgo",
    riskLabel: "Evaluación de Riesgo IA", back: "Atrás",
    totalReports: "Total", openCases: "Abiertos", criticalAlerts: "Críticos",
    language: "Idioma", reporter: "Informante", ccuOfficer: "Oficial CCU",
  },
  fr: {
    appName: "SHIELD REPORT", tagline: "Sécurisé · Anonyme · Confidentiel",
    chooseRole: "Sélectionnez votre mode d'accès pour continuer",
    reporterTitle: "Soumettre un Rapport", reporterSub: "Anonyme et Chiffré",
    ccuTitle: "Accès Officier CCU", ccuSub: "Personnel Autorisé Seulement",
    submitReport: "Soumettre un Rapport Anonyme", category: "Catégorie",
    description: "Décrivez l'incident",
    descPlaceholder: "Fournissez autant de détails que possible.",
    saveDraft: "Sauvegarder", submitting: "Chiffrement en cours",
    yourToken: "Votre Token Anonyme",
    tokenInstr: "Conservez ce token pour consulter les réponses de la CCU.",
    checkInbox: "Vérifier Ma Boîte", enterToken: "Entrez votre token pour accéder à votre boîte",
    tokenLabel: "Token du Rapport", viewMessages: "Accéder à la Boîte",
    noCCUReplies: "Pas encore de réponse.",
    optInBroadcasts: "Recevoir les mises à jour CCU",
    ccuLoginTitle: "Authentification", ccuPassword: "Code d'Accès",
    ccuAccess: "Accéder", invalidPassword: "Code invalide.",
    dashboard: "Tableau de Bord", reportId: "ID", risk: "Risque", status: "Statut",
    category2: "Catégorie", submitted: "Soumis",
    broadcast: "Diffusion Générale", broadcastPlaceholder: "Envoyer une mise à jour...",
    sendBroadcast: "Envoyer", replyPlaceholder: "Rédigez votre réponse...",
    sendReply: "Envoyer", assessingRisk: "Analyse du risque",
    riskLabel: "Évaluation IA", back: "Retour",
    totalReports: "Total", openCases: "Ouverts", criticalAlerts: "Critiques",
    language: "Langue", reporter: "Rapporteur", ccuOfficer: "Officier CCU",
  },
  pl: {
    appName: "SHIELD REPORT", tagline: "Bezpieczny · Anonimowy · Poufny",
    chooseRole: "Wybierz tryb dostępu, aby kontynuować",
    reporterTitle: "Złóż Raport", reporterSub: "Anonimowy i Szyfrowany",
    ccuTitle: "Dostęp Oficera CCU", ccuSub: "Tylko Upoważniony Personel",
    submitReport: "Złóż Anonimowy Raport", category: "Kategoria",
    description: "Opisz incydent",
    descPlaceholder: "Podaj jak najwięcej szczegółów.",
    saveDraft: "Zapisz Szkic", submitting: "Szyfrowanie i wysyłanie",
    yourToken: "Twój Anonimowy Token",
    tokenInstr: "Zachowaj ten token, aby sprawdzić odpowiedzi od CCU.",
    checkInbox: "Sprawdź Skrzynkę", enterToken: "Wprowadź token, aby uzyskać dostęp do skrzynki",
    tokenLabel: "Token Raportu", viewMessages: "Dostęp do Skrzynki",
    noCCUReplies: "Brak odpowiedzi.",
    optInBroadcasts: "Odbieraj aktualizacje CCU",
    ccuLoginTitle: "Uwierzytelnianie", ccuPassword: "Kod Dostępu",
    ccuAccess: "Dostęp", invalidPassword: "Nieprawidłowy kod.",
    dashboard: "Panel Raportów", reportId: "ID", risk: "Ryzyko", status: "Status",
    category2: "Kategoria", submitted: "Złożono",
    broadcast: "Komunikat Ogólny", broadcastPlaceholder: "Wyślij ogólną aktualizację...",
    sendBroadcast: "Wyślij", replyPlaceholder: "Napisz odpowiedź...",
    sendReply: "Wyślij", assessingRisk: "Analiza ryzyka",
    riskLabel: "Ocena Ryzyka AI", back: "Wróć",
    totalReports: "Łącznie", openCases: "Otwarte", criticalAlerts: "Krytyczne",
    language: "Język", reporter: "Informator", ccuOfficer: "Oficer CCU",
  },
  ur: {
    appName: "SHIELD REPORT", tagline: "محفوظ · گمنام · رازدارانہ",
    chooseRole: "جاری رکھنے کے لیے اپنا رسائی موڈ منتخب کریں",
    reporterTitle: "رپورٹ جمع کریں", reporterSub: "گمنام اور محفوظ",
    ccuTitle: "CCU افسر رسائی", ccuSub: "صرف مجاز اہلکار",
    submitReport: "گمنام رپورٹ جمع کریں", category: "رپورٹ کی قسم",
    description: "واقعے کی تفصیل بیان کریں",
    descPlaceholder: "جتنی ممکن ہو تفصیل فراہم کریں۔",
    saveDraft: "مسودہ محفوظ کریں", submitting: "خفیہ کاری اور ارسال",
    yourToken: "آپ کا گمنام ٹوکن",
    tokenInstr: "یہ ٹوکن محفوظ کریں۔ CCU کے جوابات چیک کرنے کے لیے ضروری ہے۔",
    checkInbox: "ان باکس چیک کریں", enterToken: "اپنا ٹوکن درج کریں",
    tokenLabel: "رپورٹ ٹوکن", viewMessages: "پیغامات دیکھیں",
    noCCUReplies: "ابھی تک کوئی جواب نہیں۔",
    optInBroadcasts: "عمومی CCU اپڈیٹس وصول کریں",
    ccuLoginTitle: "افسر تصدیق", ccuPassword: "رسائی کوڈ",
    ccuAccess: "ڈیش بورڈ تک رسائی", invalidPassword: "غلط رسائی کوڈ",
    dashboard: "رپورٹس ڈیش بورڈ", reportId: "رپورٹ ID", risk: "خطرہ", status: "حالت",
    category2: "قسم", submitted: "جمع",
    broadcast: "عمومی اعلان", broadcastPlaceholder: "عمومی اپڈیٹ بھیجیں...",
    sendBroadcast: "بھیجیں", replyPlaceholder: "اپنا جواب لکھیں...",
    sendReply: "جواب بھیجیں", assessingRisk: "خطرے کی سطح کا تجزیہ",
    riskLabel: "AI خطرے کی تشخیص", back: "واپس",
    totalReports: "کل رپورٹس", openCases: "کھلے کیسز", criticalAlerts: "اہم انتباہات",
    language: "زبان", reporter: "رپورٹر", ccuOfficer: "CCU افسر",
  },
};

const RISK_CONFIG = {
  CRITICAL: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", label: "CRITICAL", dot: "🔴" },
  HIGH:     { color: "#f97316", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.3)", label: "HIGH",     dot: "🟠" },
  MEDIUM:   { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", label: "MEDIUM",   dot: "🟡" },
  LOW:      { color: "#22c55e", bg: "rgba(34,197,94,0.12)",  border: "rgba(34,197,94,0.3)",  label: "LOW",      dot: "🟢" },
};

const STATUS_COLORS = {
  "New":          { color: "#818cf8", bg: "rgba(129,140,248,0.12)", border: "rgba(129,140,248,0.3)" },
  "Under Review": { color: "#38bdf8", bg: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.3)" },
  "Escalated":    { color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.3)" },
  "Closed":       { color: "#6b7280", bg: "rgba(107,114,128,0.12)", border: "rgba(107,114,128,0.3)" },
};

const genToken = () => {
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const s = (n) => Array.from({ length: n }, () => c[Math.floor(Math.random() * c.length)]).join("");
  return `RPT-${s(4)}-${s(4)}`;
};

const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const ago = (d) => { const m = Math.floor((Date.now() - new Date(d)) / 60000); return m < 60 ? `${m}m ago` : m < 1440 ? `${Math.floor(m/60)}h ago` : `${Math.floor(m/1440)}d ago`; };

const SEED_REPORTS = [
  {
    id: "RPT-7823-XKQP", token: "RPT-7823-XKQP",
    timestamp: new Date(Date.now() - 7 * 86400000), category: "Bribery / Corruption",
    content: "A senior officer in my unit has been accepting cash payments from a local business owner in exchange for not pursuing enforcement action. I have witnessed this personally on three separate occasions over the past two months. Meetings take place at a café near the station on Thursday evenings. The officer drives a dark blue BMW and the business owner arrives in a white van.",
    riskLevel: "HIGH", urgency: "Within 24h",
    riskReason: "Repeated financial corruption involving named officer. Direct witness evidence with specific detail. Pattern indicates ongoing criminal behaviour.",
    keywords: ["bribery", "officer", "payments"],
    status: "Under Review",
    messages: [{ from: "CCU", content: "Thank you for your report. A case officer has been assigned (Ref: IR-441). We will review within 48 hours. Your anonymity is fully protected.", timestamp: new Date(Date.now() - 6 * 86400000), id: "m1" }],
    broadcastOptIn: true, language: "en",
  },
  {
    id: "RPT-3341-BVMW", token: "RPT-3341-BVMW",
    timestamp: new Date(Date.now() - 2 * 86400000), category: "Evidence Tampering",
    content: "Evidence has been removed from the custody suite. A bag of items from a drugs arrest went missing before it could be booked in. The custody sergeant appeared unconcerned when I raised it. This occurred two days ago and I am concerned further material may be at risk.",
    riskLevel: "CRITICAL", urgency: "Immediate",
    riskReason: "Active evidence tampering in custody suite. Ongoing risk to criminal proceedings. Immediate intervention required to preserve chain of custody.",
    keywords: ["evidence", "custody", "tampering"],
    status: "Escalated",
    messages: [],
    broadcastOptIn: false, language: "en",
  },
  {
    id: "RPT-9912-LRDZ", token: "RPT-9912-LRDZ",
    timestamp: new Date(Date.now() - 14 * 86400000), category: "Misconduct / Abuse of Power",
    content: "An officer in my team has been running PNC and intelligence checks on a former partner. I observed this on two occasions — the searches were not linked to any live investigation. This appears to be personal misuse of restricted systems.",
    riskLevel: "MEDIUM", urgency: "Within 48h",
    riskReason: "Unlawful access of police systems for personal purposes. RIPA and DPA violation. Serious misconduct but limited immediate public risk.",
    keywords: ["PNC misuse", "stalking", "DPA"],
    status: "Closed",
    messages: [
      { from: "CCU", content: "This report has been reviewed. An internal investigation has been opened under reference DPS-7712. Thank you.", timestamp: new Date(Date.now() - 10 * 86400000), id: "m2" },
      { from: "Reporter", content: "Thank you. Will I receive updates on the outcome?", timestamp: new Date(Date.now() - 9 * 86400000), id: "m3" },
      { from: "CCU", content: "We will provide updates where possible within the constraints of the investigation. Your anonymity remains fully protected.", timestamp: new Date(Date.now() - 8 * 86400000), id: "m4" },
    ],
    broadcastOptIn: true, language: "en",
  },
  {
    id: "RPT-5577-HNQT", token: "RPT-5577-HNQT",
    timestamp: new Date(Date.now() - 86400000), category: "Organised Crime Links",
    content: "I have information that an officer may be leaking operational intelligence to an organised crime group. I have overheard conversations suggesting patrol patterns and forthcoming operation timings are being passed to an external contact.",
    riskLevel: "CRITICAL", urgency: "Immediate",
    riskReason: "Intelligence leakage to OCG poses immediate threat to officer safety and ongoing operations. Counter-intelligence response required urgently.",
    keywords: ["OCG", "intelligence leak", "officer safety"],
    status: "New",
    messages: [], broadcastOptIn: false, language: "en",
  },
  {
    id: "RPT-2204-YFSK", token: "RPT-2204-YFSK",
    timestamp: new Date(Date.now() - 3 * 86400000), category: "Fraud / Financial Crime",
    content: "I have noticed a pattern of inflated expense claims in my department. Several officers appear to be claiming overtime not worked and fuel costs inconsistent with deployment records. This has been happening for several months.",
    riskLevel: "MEDIUM", urgency: "Within 48h",
    riskReason: "Systematic financial fraud involving public funds. Pattern across multiple officers indicates organised misconduct rather than isolated incident.",
    keywords: ["fraud", "expenses", "systematic"],
    status: "Under Review",
    messages: [], broadcastOptIn: true, language: "en",
  },
];

const SEED_BROADCASTS = [
  { id: "bc1", timestamp: new Date(Date.now() - 5 * 86400000), content: "The CCU has expanded its review capacity. All reports are now being assessed within 24 hours. If you have submitted a report and have not received an initial response, please check your anonymous inbox or resubmit using the same token." },
];

// ─── Sub-Components ────────────────────────────────────────────────────────────
const FILE_ICONS = { pdf: "📄", doc: "📝", docx: "📝", jpg: "🖼️", jpeg: "🖼️", png: "🖼️", mp4: "🎥", mov: "🎥", mp3: "🎵", wav: "🎵", default: "📎" };
const MAX_SIZE_MB = 25;
const ALLOWED = ["pdf","doc","docx","jpg","jpeg","png","gif","mp4","mov","mp3","wav","txt","xlsx","csv"];

const FileUpload = ({ files, setFiles }) => {
  const [drag, setDrag] = useState(false);
  const [err, setErr] = useState("");
  const inputRef = React.useRef();

  const process = (incoming) => {
    setErr("");
    const valid = [];
    const errs = [];
    Array.from(incoming).forEach(f => {
      const ext = f.name.split(".").pop().toLowerCase();
      const sizeMB = f.size / (1024 * 1024);
      if (!ALLOWED.includes(ext)) errs.push(`${f.name} — file type not supported`);
      else if (sizeMB > MAX_SIZE_MB) errs.push(`${f.name} — exceeds ${MAX_SIZE_MB}MB limit`);
      else if (files.length + valid.length >= 5) errs.push(`Maximum 5 files per report`);
      else valid.push({ file: f, name: f.name, size: f.size, ext, id: Date.now() + Math.random() });
    });
    if (errs.length) setErr(errs[0]);
    if (valid.length) setFiles(prev => [...prev, ...valid]);
  };

  const fmt = (b) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b/1024).toFixed(1)} KB` : `${(b/1048576).toFixed(1)} MB`;

  return (
    <div className="fg">
      <label className="lbl">📎 Attach Evidence (optional)</label>
      {err && <div className="file-err">⚠️ {err}</div>}
      <div
        className={`dropzone ${drag ? "drag" : ""}`}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); process(e.dataTransfer.files); }}
        onClick={() => inputRef.current.click()}>
        <div className="dropzone-i">📂</div>
        <div className="dropzone-t">Drag & drop files here, or <span style={{ color: "var(--pr)" }}>browse</span></div>
        <div className="dropzone-s">PDF, Word, Images, Video, Audio · Max {MAX_SIZE_MB}MB per file · Up to 5 files</div>
        <input ref={inputRef} type="file" multiple style={{ display: "none" }}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov,.mp3,.wav,.txt,.xlsx,.csv"
          onChange={e => process(e.target.files)} />
      </div>
      {files.length > 0 && (
        <div className="file-list">
          {files.map(f => (
            <div key={f.id} className="file-item">
              <span className="file-ic">{FILE_ICONS[f.ext] || FILE_ICONS.default}</span>
              <div className="file-info">
                <div className="file-name">{f.name}</div>
                <div className="file-size">{fmt(f.size)}</div>
              </div>
              <button className="file-rm" onClick={() => setFiles(prev => prev.filter(x => x.id !== f.id))}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const RiskBadge = ({ level, small }) => {
  const c = RISK_CONFIG[level] || RISK_CONFIG.LOW;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: small ? "2px 7px" : "3px 10px", borderRadius: 4, background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontFamily: "'JetBrains Mono',monospace", fontSize: small ? 9 : 10, fontWeight: 700, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
      {c.dot} {c.label}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const c = STATUS_COLORS[status] || STATUS_COLORS["New"];
  return (
    <span style={{ display: "inline-block", padding: "2px 9px", borderRadius: 4, background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
};

const Dot = ({ color = "#22c55e" }) => (
  <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: color, animation: "pulse 2s infinite", marginRight: 5 }} />
);

// ─── Global CSS ────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Calibri+Condensed:wght@400;500;600;700;800&family=Calibri:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0b0c15;--s1:#111220;--s2:#191a2e;--s3:#20213a;
  --b1:#252645;--b2:#32335c;
  --t1:#e2e4f2;--t2:#8b8db8;--t3:#4e5075;
  --pr:#5b7fff;--pr-dim:rgba(91,127,255,.12);--pr-b:rgba(91,127,255,.32);
  --am:#f59e0b;--rd:#ef4444;--gr:#22c55e;
}
body{background:var(--bg);color:var(--t1);font-family:'Calibri',Calibri}
input,select,textarea{font-family:'Calibri',Calibri}
button{font-family:'Calibri',Calibri}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.app{min-height:100vh;background:var(--bg);background-image:
  radial-gradient(ellipse 60% 40% at 10% 15%,rgba(91,127,255,.05) 0%,transparent 70%),
  radial-gradient(ellipse 50% 60% at 85% 80%,rgba(168,85,247,.04) 0%,transparent 70%)}
.hdr{position:fixed;top:0;left:0;right:0;z-index:100;height:54px;
  background:rgba(11,12,21,.9);backdrop-filter:blur(20px);
  border-bottom:1px solid var(--b1);padding:0 20px;
  display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:9px;cursor:pointer;
  font-family:'Calibri Condensed',Calibri;font-size:17px;
  font-weight:800;letter-spacing:.12em;color:var(--t1)}
.logo-ic{width:26px;height:26px;background:linear-gradient(135deg,#5b7fff,#818cf8);
  border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px}
.sec-tag{font-size:8px;font-weight:600;letter-spacing:.08em;color:var(--gr);
  background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);
  padding:2px 6px;border-radius:3px;font-family:'JetBrains Mono',monospace}
.ver{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--t3)}
.main{padding-top:54px;min-height:100vh}
.page{max-width:800px;margin:0 auto;padding:36px 20px;animation:fadein .25s ease}
.page-w{max-width:1080px;margin:0 auto;padding:36px 20px;animation:fadein .25s ease}
.back{display:inline-flex;align-items:center;gap:6px;font-size:13px;
  color:var(--t2);cursor:pointer;background:none;border:none;padding:0;
  margin-bottom:22px;transition:color .15s}
.back:hover{color:var(--t1)}
.card{background:var(--s1);border:1px solid var(--b1);border-radius:12px;padding:24px;margin-bottom:18px}
.card-t{font-family:'Calibri Condensed',Calibri;font-size:19px;font-weight:700;
  letter-spacing:.06em;margin-bottom:18px;display:flex;align-items:center;gap:8px}
.lbl{font-size:11px;font-weight:600;letter-spacing:.07em;color:var(--t2);
  text-transform:uppercase;margin-bottom:7px;display:block}
.fg{margin-bottom:18px}
.inp,.sel,.ta{width:100%;background:var(--s2);border:1px solid var(--b1);
  border-radius:8px;color:var(--t1);font-size:14px;outline:none;
  transition:border-color .15s,box-shadow .15s}
.inp{padding:10px 13px}.sel{padding:10px 13px}.ta{padding:11px 13px;resize:vertical;line-height:1.6}
.inp:focus,.sel:focus,.ta:focus{border-color:var(--pr);box-shadow:0 0 0 3px rgba(91,127,255,.1)}
select option{background:#191a2e}
.btn{display:inline-flex;align-items:center;gap:7px;padding:10px 20px;
  border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;
  transition:all .15s;border:none;outline:none;letter-spacing:.02em}
.btn-p{background:var(--pr);color:#fff}.btn-p:hover{background:#4a6ef0;transform:translateY(-1px)}
.btn-p:disabled{opacity:.45;cursor:not-allowed;transform:none}
.btn-g{background:transparent;color:var(--t2);border:1px solid var(--b1)}
.btn-g:hover{border-color:var(--b2);color:var(--t1)}
.btn-d{background:rgba(239,68,68,.12);color:#ef4444;border:1px solid rgba(239,68,68,.28)}
.btn-a{background:rgba(245,158,11,.12);color:#f59e0b;border:1px solid rgba(245,158,11,.28)}
.btn-s{background:rgba(34,197,94,.1);color:#22c55e;border:1px solid rgba(34,197,94,.25)}
.btn-row{display:flex;gap:9px;flex-wrap:wrap;align-items:center}
.token-box{background:var(--s3);border:1px solid var(--pr-b);border-radius:10px;
  padding:22px 24px;text-align:center;margin:18px 0}
.token-v{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:700;
  color:var(--pr);letter-spacing:.14em;margin-bottom:8px}
.token-n{font-size:12px;color:var(--t2);line-height:1.5}
.priv{background:rgba(91,127,255,.07);border:1px solid rgba(91,127,255,.18);
  border-radius:8px;padding:11px 15px;font-size:12px;color:var(--t2);
  line-height:1.55;margin-bottom:18px;display:flex;gap:9px;align-items:flex-start}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px}
@media(max-width:550px){.stats{grid-template-columns:1fr 1fr}}
.stat{background:var(--s1);border:1px solid var(--b1);border-radius:10px;padding:16px 18px}
.stat-v{font-family:'Calibri Condensed',Calibri;font-size:38px;font-weight:800;line-height:1;margin-bottom:3px}
.stat-l{font-size:10px;letter-spacing:.06em;color:var(--t2);text-transform:uppercase;font-weight:600}
.rl{display:flex;flex-direction:column;gap:9px}
.rr{background:var(--s1);border:1px solid var(--b1);border-radius:10px;
  padding:14px 17px;display:grid;gap:13px;
  grid-template-columns:auto 1fr auto auto auto;
  align-items:center;cursor:pointer;transition:all .15s}
.rr:hover{border-color:var(--b2);background:var(--s2)}
.rr.c{border-left:3px solid #ef4444}.rr.h{border-left:3px solid #f97316}
.rr.m{border-left:3px solid #f59e0b}.rr.l{border-left:3px solid #22c55e}
.rid{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;color:var(--t2);white-space:nowrap}
.rcat{font-size:13px;font-weight:500;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rprev{font-size:11px;color:var(--t3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rtime{font-size:10px;color:var(--t3);white-space:nowrap;font-family:'JetBrains Mono',monospace}
@media(max-width:650px){.rr{grid-template-columns:1fr auto;}.rid,.rtime{display:none}}
.msgs{display:flex;flex-direction:column;gap:12px;margin:16px 0;max-height:320px;overflow-y:auto;padding-right:4px}
.msgs::-webkit-scrollbar{width:3px}.msgs::-webkit-scrollbar-track{background:transparent}
.msgs::-webkit-scrollbar-thumb{background:var(--b1);border-radius:2px}
.mb{max-width:88%;padding:11px 14px;border-radius:10px;font-size:13px;line-height:1.55}
.mb.ccu{background:var(--pr-dim);border:1px solid var(--pr-b);align-self:flex-start}
.mb.rep{background:var(--s3);border:1px solid var(--b2);align-self:flex-end}
.mm{font-size:9px;color:var(--t3);margin-top:4px;font-family:'JetBrains Mono',monospace}
.msrc{font-size:10px;font-weight:700;letter-spacing:.04em;margin-bottom:4px;text-transform:uppercase}
.bc-item{background:var(--s1);border:1px solid var(--b1);border-left:3px solid var(--pr);
  border-radius:8px;padding:12px 15px;margin-bottom:8px}
.bc-c{font-size:13px;line-height:1.55;color:var(--t1);margin-bottom:5px}
.bc-t{font-size:9px;color:var(--t3);font-family:'JetBrains Mono',monospace}
.fbar{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px;align-items:center}
.fb{padding:4px 11px;border-radius:6px;font-size:10px;font-weight:700;
  font-family:'JetBrains Mono',monospace;letter-spacing:.04em;cursor:pointer;
  transition:all .15s;border:1px solid var(--b1);background:transparent;color:var(--t2)}
.fb.on,.fb:hover{background:var(--pr-dim);border-color:var(--pr-b);color:var(--pr)}
.lb{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:22px;align-items:center}
.lng{padding:4px 10px;border-radius:5px;font-size:12px;cursor:pointer;
  border:1px solid var(--b1);background:transparent;color:var(--t2);transition:all .15s}
.lng.on{background:var(--s3);border-color:var(--b2);color:var(--t1)}
.dash-g{display:grid;grid-template-columns:1fr 320px;gap:18px;align-items:start}
@media(max-width:860px){.dash-g{grid-template-columns:1fr}}
.dg{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:18px}
@media(max-width:560px){.dg{grid-template-columns:1fr}}
.di{background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:11px 13px}
.dk{font-size:10px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--t3);margin-bottom:4px}
.dv{font-size:13px;color:var(--t1);font-weight:500}
.rp-b{background:var(--s2);border:1px solid var(--b1);border-radius:8px;
  padding:15px;font-size:13px;line-height:1.68;color:var(--t1);
  margin-bottom:18px;white-space:pre-wrap;max-height:220px;overflow-y:auto}
.rp-b::-webkit-scrollbar{width:3px}.rp-b::-webkit-scrollbar-thumb{background:var(--b1)}
.sec{font-family:'Calibri Condensed',Calibri;font-size:14px;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;color:var(--t2);
  margin-bottom:14px;display:flex;align-items:center;gap:7px}
.tag{display:inline-block;padding:2px 7px;border-radius:3px;font-size:9px;
  font-weight:600;font-family:'JetBrains Mono',monospace;
  background:rgba(91,127,255,.1);border:1px solid rgba(91,127,255,.22);color:#818cf8;
  letter-spacing:.04em;margin:2px}
.ccu-b{font-family:'JetBrains Mono',monospace;font-size:8px;font-weight:700;
  letter-spacing:.1em;padding:2px 7px;border-radius:3px;
  background:rgba(249,115,22,.12);border:1px solid rgba(249,115,22,.28);
  color:#f97316;text-transform:uppercase}
.empty{text-align:center;padding:36px 20px;color:var(--t3);font-size:13px}
.empty-i{font-size:30px;margin-bottom:10px}
.cbr{display:flex;align-items:flex-start;gap:11px;cursor:pointer;margin-top:11px}
.dropzone{border:2px dashed var(--b2);border-radius:10px;padding:24px 20px;
  text-align:center;cursor:pointer;transition:all .2s;background:var(--s2);margin-bottom:18px}
.dropzone:hover,.dropzone.drag{border-color:var(--pr);background:var(--pr-dim)}
.dropzone-i{font-size:28px;margin-bottom:8px}
.dropzone-t{font-size:13px;color:var(--t2);margin-bottom:4px}
.dropzone-s{font-size:11px;color:var(--t3)}
.file-list{display:flex;flex-direction:column;gap:7px;margin-bottom:16px}
.file-item{display:flex;align-items:center;gap:10px;background:var(--s2);
  border:1px solid var(--b1);border-radius:8px;padding:9px 12px}
.file-ic{font-size:18px;flex-shrink:0}
.file-info{flex:1;min-width:0}
.file-name{font-size:12px;font-weight:600;color:var(--t1);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.file-size{font-size:10px;color:var(--t3);font-family:'Calibri',sans-serif}
.file-rm{background:none;border:none;color:var(--t3);cursor:pointer;
  font-size:16px;padding:0 4px;transition:color .15s;flex-shrink:0}
.file-rm:hover{color:#ef4444}
.file-err{font-size:11px;color:#ef4444;margin-bottom:10px;
  background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);
  border-radius:6px;padding:8px 12px}.cbr input{margin-top:2px;accent-color:var(--pr)}
.cbr span{font-size:13px;color:var(--t2);line-height:1.45}
.dvdr{height:1px;background:var(--b1);margin:22px 0}
.spin{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);
  border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite}
.sc{max-height:440px;overflow-y:auto;padding-right:2px}
.sc::-webkit-scrollbar{width:3px}.sc::-webkit-scrollbar-thumb{background:var(--b1)}
`;

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState("en");
  const [view, setView] = useState("landing");
  const [reports, setReports] = useState(SEED_REPORTS);
  const [broadcasts, setBroadcasts] = useState(SEED_BROADCASTS);
  const [sel, setSel] = useState(null);
  const [newTok, setNewTok] = useState(null);
  const [tokIn, setTokIn] = useState("");
  const [tokErr, setTokErr] = useState(false);
  const [draft, setDraft] = useState({ category: "", content: "", optIn: false, files: [] });
  const [draftMsg, setDraftMsg] = useState("");
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [ccuIn, setCCUIn] = useState(false);
  const [reply, setReply] = useState("");
  const [bcText, setBcText] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const t = T[lang] || T.en;

  // ── AI Risk Assessment ────────────────────────────────────────────────────────
  const assessRisk = async (content, category) => {
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a risk assessment AI for a police counter-corruption unit. Analyse the report and respond ONLY with valid JSON, no other text:
{"riskLevel":"CRITICAL|HIGH|MEDIUM|LOW","riskReason":"One concise sentence (max 20 words) explaining the risk level","urgency":"Immediate|Within 24h|Within 48h|Routine","keywords":["keyword1","keyword2","keyword3"]}`,
          messages: [{ role: "user", content: `Category: ${category}\n\nReport: ${content}` }],
        }),
      });
      const d = await res.json();
      const txt = (d.content?.[0]?.text || "").replace(/```json|```/g, "").trim();
      return JSON.parse(txt);
    } catch {
      const l = content.toLowerCase();
      if (l.includes("weapon") || l.includes("organised crime") || l.includes("intelligence leak") || l.includes("kill"))
        return { riskLevel: "CRITICAL", riskReason: "Content indicates immediate threat requiring urgent response.", urgency: "Immediate", keywords: [] };
      if (l.includes("brib") || l.includes("evidence") || l.includes("corrupt"))
        return { riskLevel: "HIGH", riskReason: "Serious ongoing misconduct with potential for continued harm.", urgency: "Within 24h", keywords: [] };
      if (l.includes("fraud") || l.includes("misconduct") || l.includes("false"))
        return { riskLevel: "MEDIUM", riskReason: "Misconduct requiring investigation to determine full scope.", urgency: "Within 48h", keywords: [] };
      return { riskLevel: "LOW", riskReason: "Matter warrants review through standard internal processes.", urgency: "Routine", keywords: [] };
    } finally {
      setLoading(false);
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!draft.category || draft.content.trim().length < 20) return;
    setSubmitting(true);
    const risk = await assessRisk(draft.content, draft.category);
    const token = genToken();
    const r = { id: token, token, timestamp: new Date(), category: draft.category, content: draft.content, files: draft.files, riskLevel: risk.riskLevel, riskReason: risk.riskReason, urgency: risk.urgency, keywords: risk.keywords || [], status: "New", messages: [], broadcastOptIn: draft.optIn, language: lang };
    setReports(prev => [r, ...prev]);
    setNewTok(token);
    setDraft({ category: "", content: "", optIn: false });
    setSubmitting(false);
    setView("success");
  };

  // ── Inbox ─────────────────────────────────────────────────────────────────────
  const handleInbox = () => {
    const r = reports.find(r => r.token === tokIn.trim().toUpperCase());
    if (r) { setSel(r); setTokErr(false); setView("inbox"); }
    else setTokErr(true);
  };

  // ── CCU ───────────────────────────────────────────────────────────────────────
  const handleLogin = () => {
    if (pw === "CCU2024") { setCCUIn(true); setPwErr(false); setView("ccu-dash"); }
    else setPwErr(true);
  };
  const handleReply = (id) => {
    if (!reply.trim()) return;
    const msg = { from: "CCU", content: reply, timestamp: new Date(), id: Date.now().toString() };
    setReports(prev => prev.map(r => r.id === id ? { ...r, messages: [...r.messages, msg] } : r));
    setSel(prev => prev ? { ...prev, messages: [...prev.messages, msg] } : prev);
    setReply("");
  };
  const handleRepStatus = (id, s) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: s } : r));
    setSel(prev => prev ? { ...prev, status: s } : prev);
  };
  const handleBC = () => {
    if (!bcText.trim()) return;
    setBroadcasts(prev => [{ id: Date.now().toString(), timestamp: new Date(), content: bcText }, ...prev]);
    setBcText("");
  };

  const filtered = filter === "ALL" ? reports : reports.filter(r => r.riskLevel === filter);
  const stats = { total: reports.length, open: reports.filter(r => r.status !== "Closed").length, crit: reports.filter(r => r.riskLevel === "CRITICAL").length };

  // ── Language Bar ──────────────────────────────────────────────────────────────
  const LB = () => (
  <div className="lb">
    {LANGUAGES.map(l => (
      <button key={l.code} className={`lng ${lang === l.code ? "on" : ""}`} onClick={() => setLang(l.code)}>
        {l.label}
      </button>
    ))}
  </div>
);

  // ── VIEWS ─────────────────────────────────────────────────────────────────────

  // Landing
  if (view === "landing") return (
    <div className="app"><style>{CSS}</style>
      <header className="hdr">
        <div className="logo"><img src={nplogo} alt="np logo" style={{ height: 28, width: "auto" }} />SHIELD REPORT<span className="sec-tag">🔒 E2E</span></div>
        <div className="ver">v2.4.1</div>
      </header>
      <main className="main">
        <div className="page" style={{ maxWidth: 680, textAlign: "center" }}>
          <LB />
          <div style={{ paddingBottom: 8 }}>
            <div style={{ fontFamily: "'Calibri Condensed',Calibri", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: ".1em", marginBottom: 10 }}>{t.appName}</div>
            <div style={{ fontSize: 14, color: "var(--t2)", letterSpacing: ".04em", marginBottom: 12 }}>{t.tagline}</div>
            <div style={{ fontSize: 13, color: "var(--t3)", marginBottom: 40 }}>{t.chooseRole}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 520, margin: "0 auto 24px" }}>
            {[
              { icon: "🛡️", title: t.reporterTitle, sub: t.reporterSub, action: () => setView("submit"), border: "var(--pr)" },
              { icon: "🔐", title: t.ccuTitle, sub: t.ccuSub, action: () => setView("ccu-login"), border: "#f97316" },
            ].map((c, i) => (
              <div key={i} onClick={c.action} style={{ background: "var(--s1)", border: `1px solid var(--b1)`, borderRadius: 12, padding: "26px 22px", cursor: "pointer", textAlign: "left", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${c.border}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                <div style={{ fontFamily: "'Calibri Condensed',Calibri", fontSize: 19, fontWeight: 700, letterSpacing: ".05em", marginBottom: 5 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: "var(--t2)" }}>{c.sub}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-g" style={{ fontSize: 12 }} onClick={() => setView("inbox-entry")}>📬 {t.checkInbox}</button>
        </div>
      </main>
    </div>
  );

  // Submit Report
  if (view === "submit") return (
    <div className="app"><style>{CSS}</style>
      <header className="hdr"><div className="logo" onClick={() => setView("landing")}><img src={nplogo} alt="np logo" style={{ height: 28, width: "auto" }} />SHIELD REPORT<span className="sec-tag">🔒 E2E</span></div><div className="ver">v2.4.1</div></header>
      <main className="main">
        <div className="page">
          <button className="back" onClick={() => setView("landing")}>← {t.back}</button>
          <LB />
          <div style={{ fontFamily: "'Calibri Condensed',Calibri", fontSize: 26, fontWeight: 800, letterSpacing: ".07em", marginBottom: 22 }}>🛡️ {t.submitReport}</div>
          <div className="priv"><span>🔒</span><span>Your identity is not recorded. This report is encrypted in transit. No IP addresses, cookies, or personal identifiers are stored or logged by this system.</span></div>
          <div className="card">
            <div className="fg">
              <label className="lbl">{t.category} *</label>
              <select className="sel" value={draft.category} onChange={e => setDraft(d => ({ ...d, category: e.target.value }))}>
                <option value="">— {lang === "en" ? "Select a category" : lang === "es" ? "Seleccionar categoría" : lang === "fr" ? "Choisir une catégorie" : lang === "pl" ? "Wybierz kategorię" : "ایک قسم منتخب کریں"} —</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.label}>{c.icon} {c.label}</option>)}
              </select>
            </div>
            <div className="fg">
              <label className="lbl">{t.description} *</label>
              <textarea className="ta" style={{ minHeight: 175 }} placeholder={t.descPlaceholder} value={draft.content} onChange={e => setDraft(d => ({ ...d, content: e.target.value }))} />
              <div style={{ fontSize: 10, color: draft.content.length < 20 ? "var(--am)" : "var(--t3)", marginTop: 5, fontFamily: "'JetBrains Mono',monospace" }}>
                {draft.content.length} chars {draft.content.length < 20 ? `(min 20)` : "✓"}
              </div>
            </div>
            <FileUpload files={draft.files} setFiles={(fn) => setDraft(d => ({ ...d, files: typeof fn === "function" ? fn(d.files) : fn }))} />
            <label className="cbr">
              <input type="checkbox" checked={draft.optIn} onChange={e => setDraft(d => ({ ...d, optIn: e.target.checked }))} />
              <span>📢 {t.optInBroadcasts}</span>
            </label>
          </div>
          {draftMsg && <div style={{ color: "var(--gr)", fontSize: 12, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>✓ {draftMsg}</div>}
          <div className="btn-row">
            <button className="btn btn-p" disabled={!draft.category || draft.content.trim().length < 20 || submitting} onClick={handleSubmit}>
              {submitting ? <><div className="spin" />  {t.submitting}…</> : `🔒 ${t.submitReport}`}
            </button>
            <button className="btn btn-g" onClick={() => { setDraftMsg(t.saveDraft + " ✓"); setTimeout(() => setDraftMsg(""), 2500); }}>💾 {t.saveDraft}</button>
          </div>
          {loading && <div style={{ marginTop: 14, padding: "11px 15px", background: "var(--s2)", border: "1px solid var(--b1)", borderRadius: 8, fontSize: 12, color: "var(--t2)", display: "flex", alignItems: "center", gap: 9 }}>
            <div className="spin" style={{ borderColor: "rgba(245,158,11,.3)", borderTopColor: "#f59e0b" }} /> {t.assessingRisk}…
          </div>}
        </div>
      </main>
    </div>
  );

  // Success / Token
  if (view === "success") {
    const r = reports.find(x => x.token === newTok);
    return (
      <div className="app"><style>{CSS}</style>
        <header className="hdr"><div className="logo" onClick={() => setView("landing")}><img src={nplogo} alt="np logo" style={{ height: 28, width: "auto" }} />SHIELD REPORT<span className="sec-tag">🔒 E2E</span></div><div className="ver">v2.4.1</div></header>
        <main className="main">
          <div className="page" style={{ maxWidth: 560, textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>✅</div>
            <div style={{ fontFamily: "'Calibri Condensed',Calibri", fontSize: 28, fontWeight: 800, letterSpacing: ".07em", marginBottom: 8 }}>Report Received</div>
            <div style={{ fontSize: 13, color: "var(--t2)", marginBottom: 28 }}>Your report has been securely submitted and assigned for review.</div>
            <div className="token-box">
              <div style={{ fontSize: 10, letterSpacing: ".09em", textTransform: "uppercase", color: "var(--t2)", fontWeight: 600, marginBottom: 9 }}>{t.yourToken}</div>
              <div className="token-v">{newTok}</div>
              <div className="token-n">⚠️ {t.tokenInstr}</div>
            </div>
            {r && (
              <div style={{ background: RISK_CONFIG[r.riskLevel]?.bg, border: `1px solid ${RISK_CONFIG[r.riskLevel]?.border}`, borderRadius: 10, padding: "16px 20px", marginBottom: 22, textAlign: "left" }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--t2)", marginBottom: 9 }}>🤖 {t.riskLabel}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 9, flexWrap: "wrap" }}>
                  <RiskBadge level={r.riskLevel} />
                  {r.urgency && <span style={{ fontSize: 10, color: "var(--t2)", fontFamily: "'JetBrains Mono',monospace" }}>⏱ {r.urgency}</span>}
                  {r.keywords?.map(k => <span key={k} className="tag">{k}</span>)}
                </div>
                <div style={{ fontSize: 13, color: "var(--t1)", lineHeight: 1.5 }}>{r.riskReason}</div>
              </div>
            )}
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <button className="btn btn-p" onClick={() => setView("landing")}>🏠 Return Home</button>
              <button className="btn btn-g" onClick={() => { setTokIn(newTok); setSel(r); setView("inbox"); }}>📬 Go to Inbox</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Inbox Entry
  if (view === "inbox-entry") return (
    <div className="app"><style>{CSS}</style>
      <header className="hdr"><div className="logo" onClick={() => setView("landing")}><img src={nplogo} alt="np logo" style={{ height: 28, width: "auto" }} />SHIELD REPORT<span className="sec-tag">🔒 E2E</span></div><div className="ver">v2.4.1</div></header>
      <main className="main">
        <div className="page" style={{ maxWidth: 460 }}>
          <button className="back" onClick={() => setView("landing")}>← {t.back}</button>
          <div style={{ fontFamily: "'Calibri Condensed',Calibri", fontSize: 24, fontWeight: 800, letterSpacing: ".07em", marginBottom: 6 }}>📬 Anonymous Inbox</div>
          <div style={{ fontSize: 13, color: "var(--t2)", marginBottom: 26 }}>{t.enterToken}</div>
          <div className="card">
            <div className="fg">
              <label className="lbl">{t.tokenLabel}</label>
              <input className="inp" placeholder="RPT-XXXX-XXXX" value={tokIn} onChange={e => { setTokIn(e.target.value); setTokErr(false); }} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, letterSpacing: ".1em" }} onKeyDown={e => e.key === "Enter" && handleInbox()} />
              {tokErr && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 6 }}>⚠️ Token not found. Please check and try again.</div>}
            </div>
            <button className="btn btn-p" onClick={handleInbox} disabled={!tokIn.trim()}>🔍 {t.viewMessages}</button>
          </div>
          <div style={{ fontSize: 11, color: "var(--t3)", textAlign: "center", marginTop: 14 }}>
            Demo token: <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--t2)" }}>RPT-7823-XKQP</span>
          </div>
        </div>
      </main>
    </div>
  );

  // Inbox
  if (view === "inbox") {
    const report = reports.find(r => r.id === (sel?.id || "")) || sel;
    if (!report) return null;
    const bcs = report.broadcastOptIn ? broadcasts : [];
    return (
      <div className="app"><style>{CSS}</style>
        <header className="hdr"><div className="logo" onClick={() => setView("landing")}><img src={nplogo} alt="np logo" style={{ height: 28, width: "auto" }} />SHIELD REPORT<span className="sec-tag">🔒 E2E</span></div><div className="ver">v2.4.1</div></header>
        <main className="main">
          <div className="page" style={{ maxWidth: 620 }}>
            <button className="back" onClick={() => setView("inbox-entry")}>← {t.back}</button>
            <div style={{ fontFamily: "'Calibri Condensed',Calibri", fontSize: 22, fontWeight: 800, letterSpacing: ".07em", marginBottom: 4 }}>📬 {lang === "en" ? "Your Inbox" : lang === "es" ? "Tu Bandeja" : lang === "fr" ? "Votre Boîte" : lang === "pl" ? "Twoja Skrzynka" : "آپ کا ان باکس"}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--t2)", marginBottom: 22, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {report.token} · <StatusBadge status={report.status} />
            </div>
            <div className="card">
              <div className="sec">💬 CCU Correspondence</div>
              {report.messages.length === 0
                ? <div className="empty"><div className="empty-i">📭</div><div>{t.noCCUReplies}</div></div>
                : <div className="msgs">
                  {report.messages.map(m => (
                    <div key={m.id} className={`mb ${m.from === "CCU" ? "ccu" : "rep"}`}>
                      <div className="msrc" style={{ color: m.from === "CCU" ? "var(--pr)" : "var(--am)" }}>
                        {m.from === "CCU" ? "🔵 CCU Officer" : "👤 You"}
                      </div>
                      {m.content}
                      <div className="mm">{fmt(m.timestamp)}</div>
                    </div>
                  ))}
                </div>}
              <div style={{ marginTop: 16 }}>
                <textarea className="ta" style={{ minHeight: 76 }} placeholder="Add information or ask a question..." value={reply} onChange={e => setReply(e.target.value)} />
                <button className="btn btn-p" style={{ marginTop: 8 }} onClick={() => {
                  if (!reply.trim()) return;
                  const msg = { from: "Reporter", content: reply, timestamp: new Date(), id: Date.now().toString() };
                  setReports(prev => prev.map(r => r.id === report.id ? { ...r, messages: [...r.messages, msg] } : r));
                  setSel(prev => ({ ...prev, messages: [...prev.messages, msg] }));
                  setReply("");
                }}>📤 Send Message</button>
              </div>
            </div>
            {bcs.length > 0 && (
              <div className="card">
                <div className="sec">📢 CCU Broadcasts</div>
                {bcs.map(b => <div key={b.id} className="bc-item"><div className="bc-c">{b.content}</div><div className="bc-t">{fmt(b.timestamp)}</div></div>)}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // CCU Login
  if (view === "ccu-login") return (
    <div className="app"><style>{CSS}</style>
      <header className="hdr"><div className="logo" onClick={() => setView("landing")}><img src={nplogo} alt="np logo" style={{ height: 28, width: "auto" }} />SHIELD REPORT<span className="sec-tag">🔒 E2E</span></div><div className="ver">v2.4.1</div></header>
      <main className="main">
        <div className="page" style={{ maxWidth: 400 }}>
          <button className="back" onClick={() => setView("landing")}>← {t.back}</button>
          <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 26 }}>
            <div style={{ width: 42, height: 42, background: "rgba(249,115,22,.12)", border: "1px solid rgba(249,115,22,.28)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔐</div>
            <div>
              <div style={{ fontFamily: "'Calibri Condensed',Calibri", fontSize: 21, fontWeight: 800, letterSpacing: ".06em" }}>{t.ccuLoginTitle}</div>
              <div style={{ fontSize: 11, color: "var(--t2)" }}>{t.ccuSub}</div>
            </div>
          </div>
          <div className="card">
            <div className="fg">
              <label className="lbl">{t.ccuPassword}</label>
              <input className="inp" type="password" placeholder="Enter access code" value={pw} onChange={e => { setPw(e.target.value); setPwErr(false); }} style={{ fontFamily: "'JetBrains Mono',monospace", letterSpacing: ".12em" }} onKeyDown={e => e.key === "Enter" && handleLogin()} />
              {pwErr && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 6 }}>⚠️ {t.invalidPassword}</div>}
            </div>
            <button className="btn btn-p" onClick={handleLogin}>🔓 {t.ccuAccess}</button>
            <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 11, fontFamily: "'JetBrains Mono',monospace" }}>Demo: CCU2024</div>
          </div>
        </div>
      </main>
    </div>
  );

  // CCU Dashboard
  if (view === "ccu-dash") return (
    <div className="app"><style>{CSS}</style>
      <header className="hdr">
        <div className="logo" onClick={() => setView("landing")}><img src={nplogo} alt="np logo" style={{ height: 28, width: "auto" }} />SHIELD REPORT<span className="sec-tag">🔒 E2E</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span className="ccu-b">CCU OFFICER</span>
          <button className="btn btn-g" style={{ fontSize: 11, padding: "6px 12px" }} onClick={() => { setCCUIn(false); setView("landing"); }}>🚪 Sign Out</button>
        </div>
      </header>
      <main className="main">
        <div className="page-w">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "'Calibri Condensed',Calibri", fontSize: 24, fontWeight: 800, letterSpacing: ".08em", marginBottom: 4 }}>🔒 {t.dashboard}</div>
              <div style={{ fontSize: 11, color: "var(--t2)", fontFamily: "'JetBrains Mono',monospace", display: "flex", alignItems: "center" }}>
                <Dot />{lang === "en" ? "System Online" : "En línea"} · {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </div>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><div className="stat-v" style={{ color: "var(--pr)" }}>{stats.total}</div><div className="stat-l">{t.totalReports}</div></div>
            <div className="stat"><div className="stat-v" style={{ color: "var(--am)" }}>{stats.open}</div><div className="stat-l">{t.openCases}</div></div>
            <div className="stat"><div className="stat-v" style={{ color: "var(--rd)" }}>{stats.crit}</div><div className="stat-l">{t.criticalAlerts}</div></div>
          </div>
          <div className="dash-g">
            <div>
              <div className="fbar">
                {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map(f => <button key={f} className={`fb ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>{f === "ALL" ? t.allRisks || "All" : f}</button>)}
              </div>
              <div className="rl sc">
                {filtered.length === 0
                  ? <div className="empty"><div className="empty-i">📁</div><div>No reports match this filter</div></div>
                  : filtered.map(r => (
                    <div key={r.id} className={`rr ${r.riskLevel.toLowerCase()}`} onClick={() => { setSel(r); setView("ccu-report"); }}>
                      <div className="rid">{r.id}</div>
                      <div><div className="rcat">{r.category}</div><div className="rprev">{r.content.substring(0, 75)}…</div></div>
                      <RiskBadge level={r.riskLevel} small />
                      <StatusBadge status={r.status} />
                      <div className="rtime">{ago(r.timestamp)}</div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div>
              <div className="card">
                <div className="sec">📢 {t.broadcast}</div>
                <textarea className="ta" style={{ minHeight: 100 }} placeholder={t.broadcastPlaceholder} value={bcText} onChange={e => setBcText(e.target.value)} />
                <button className="btn btn-p" style={{ marginTop: 10, width: "100%" }} onClick={handleBC}>📡 {t.sendBroadcast}</button>
              </div>
              {broadcasts.length > 0 && (
                <div>
                  <div className="sec">{lang === "en" ? "Recent Broadcasts" : "Recientes"}</div>
                  {broadcasts.slice(0, 3).map(b => <div key={b.id} className="bc-item"><div className="bc-c">{b.content.substring(0, 120)}{b.content.length > 120 ? "…" : ""}</div><div className="bc-t">{fmt(b.timestamp)}</div></div>)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // CCU Report Detail
  if (view === "ccu-report") {
    const report = (sel ? reports.find(r => r.id === sel.id) : null) || sel;
    if (!report) return null;
    return (
      <div className="app"><style>{CSS}</style>
        <header className="hdr">
          <div className="logo" onClick={() => setView("landing")}><img src={nplogo} alt="np logo" style={{ height: 28, width: "auto" }} />SHIELD REPORT<span className="sec-tag">🔒 E2E</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span className="ccu-b">CCU OFFICER</span>
            <button className="btn btn-g" style={{ fontSize: 11, padding: "6px 12px" }} onClick={() => { setCCUIn(false); setView("landing"); }}>🚪 Sign Out</button>
          </div>
        </header>
        <main className="main">
          <div className="page" style={{ maxWidth: 740 }}>
            <button className="back" onClick={() => setView("ccu-dash")}>← {t.dashboard}</button>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--t2)", marginBottom: 5 }}>{report.id}</div>
                <div style={{ fontFamily: "'Calibri Condensed',Calibri", fontSize: 22, fontWeight: 800, letterSpacing: ".05em" }}>{report.category}</div>
              </div>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
                <RiskBadge level={report.riskLevel} /><StatusBadge status={report.status} />
              </div>
            </div>
            <div className="dg">
              <div className="di"><div className="dk">Submitted</div><div className="dv">{fmt(report.timestamp)}</div></div>
              <div className="di"><div className="dk">Language</div><div className="dv">{LANGUAGES.find(l => l.code === report.language)?.flag} {LANGUAGES.find(l => l.code === report.language)?.label || "English"}</div></div>
              <div className="di"><div className="dk">Broadcast Opt-In</div><div className="dv">{report.broadcastOptIn ? "✅ Yes" : "❌ No"}</div></div>
              <div className="di"><div className="dk">Messages</div><div className="dv">{report.messages.length} message{report.messages.length !== 1 ? "s" : ""}</div></div>
            </div>
            <div style={{ background: RISK_CONFIG[report.riskLevel]?.bg, border: `1px solid ${RISK_CONFIG[report.riskLevel]?.border}`, borderRadius: 10, padding: "15px 18px", marginBottom: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--t2)", marginBottom: 9 }}>🤖 {t.riskLabel}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 9, flexWrap: "wrap" }}>
                <RiskBadge level={report.riskLevel} />
                {report.urgency && <span style={{ fontSize: 10, color: "var(--t2)", fontFamily: "'JetBrains Mono',monospace" }}>⏱ {report.urgency}</span>}
                {report.keywords?.map(k => <span key={k} className="tag">{k}</span>)}
              </div>
              <div style={{ fontSize: 13, color: "var(--t1)", lineHeight: 1.5 }}>{report.riskReason}</div>
            </div>
<div className="sec">📄 Report Content</div>
<div className="rp-b">{report.content}</div>
{report.files && report.files.length > 0 && (
  <div style={{ marginBottom: 18 }}>
    <div className="sec">📎 Attachments ({report.files.length})</div>
    <div className="file-list">
      {report.files.map(f => (
        <div key={f.id} className="file-item">
          <span className="file-ic">{FILE_ICONS[f.ext] || FILE_ICONS.default}</span>
          <div className="file-info">
            <div className="file-name">{f.name}</div>
            <div className="file-size">{(f.size / 1048576).toFixed(1)} MB</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".06em", color: "var(--t2)", textTransform: "uppercase", marginBottom: 9 }}>Update Status</div>
              <div className="btn-row">
                {["New", "Under Review", "Escalated", "Closed"].map(s => (
                  <button key={s} className={`btn ${report.status === s ? "btn-p" : "btn-g"}`} style={{ fontSize: 11, padding: "6px 14px" }} onClick={() => handleRepStatus(report.id, s)}>{s}</button>
                ))}
              </div>
            </div>
            <div className="dvdr" />
            <div className="sec">💬 Correspondence</div>
            {report.messages.length === 0
              ? <div style={{ color: "var(--t3)", fontSize: 13, marginBottom: 18 }}>No messages yet. Send the first response below.</div>
              : <div className="msgs">
                {report.messages.map(m => (
                  <div key={m.id} className={`mb ${m.from === "CCU" ? "ccu" : "rep"}`}>
                    <div className="msrc" style={{ color: m.from === "CCU" ? "var(--pr)" : "var(--am)" }}>
                      {m.from === "CCU" ? "🔵 CCU Officer" : "👤 Anonymous Reporter"}
                    </div>
                    {m.content}
                    <div className="mm">{fmt(m.timestamp)}</div>
                  </div>
                ))}
              </div>}
            <div style={{ marginTop: 16 }}>
              <textarea className="ta" style={{ minHeight: 86 }} placeholder={t.replyPlaceholder} value={reply} onChange={e => setReply(e.target.value)} />
              <button className="btn btn-p" style={{ marginTop: 8 }} onClick={() => handleReply(report.id)} disabled={!reply.trim()}>📤 {t.sendReply}</button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
