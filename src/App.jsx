import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, ArrowLeft, Download, Mail } from "lucide-react";

/* ──────────────────────────────
   Tiny UI primitives (Tailwind)
────────────────────────────── */
const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl shadow-lg bg-white border p-6 ${className}`}>{children}</div>
);
const Button = ({ className = "", disabled, onClick, children, type = "button" }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`px-4 py-2 rounded-2xl shadow-md hover:shadow-lg transition disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);
const Input = ({ className = "", ...props }) => (
  <input className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring ${className}`} {...props} />
);
const Select = ({ className = "", children, ...props }) => (
  <select className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring ${className}`} {...props}>
    {children}
  </select>
);
const Textarea = ({ className = "", ...props }) => (
  <textarea className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring ${className}`} {...props} />
);
const Chip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border
      ${active ? "bg-black text-white border-black" : "bg-white text-black"}`}
  >
    {children}
  </button>
);

/* ──────────────────────────────
   Multi-select dropdown (checkbox)
────────────────────────────── */
function LabeledMultiSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select all that apply"
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const toggle = (opt) => {
    const set = new Set(value || []);
    set.has(opt) ? set.delete(opt) : set.add(opt);
    onChange(Array.from(set));
  };

  const clearAll = () => onChange([]);
  const selectAll = () => onChange(options.slice());

  return (
    <div ref={ref} className="relative">
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-xl border px-3 py-2 text-left flex items-center justify-between"
      >
        <div className="flex gap-2 flex-wrap">
          {value?.length ? (
            value.map((v) => (
              <span key={v} className="text-xs px-2 py-0.5 rounded-full border bg-white">
                {v}
              </span>
            ))
          ) : (
            <span className="opacity-60">{placeholder}</span>
          )}
        </div>
        <span className="opacity-60 text-xs">{value?.length || 0} selected</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg p-3 max-h-64 overflow-auto">
          <div className="flex items-center justify-between mb-2 text-xs">
            <button type="button" className="underline" onClick={selectAll}>Select all</button>
            <button type="button" className="underline" onClick={clearAll}>Clear</button>
          </div>
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 py-1 cursor-pointer">
              <input type="checkbox" checked={value?.includes(opt)} onChange={() => toggle(opt)} />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────
   Sliders with labels
────────────────────────────── */
function LabeledSlider({ label, min=0, max=5, step=1, value, onChange, suffix="", help }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-xs opacity-70">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-black"
      />
      {help && <div className="text-xs opacity-70 mt-1">{help}</div>}
    </div>
  );
}

/* ──────────────────────────────
   Catalog & Content (editable)
────────────────────────────── */
const PROGRAMS = [
  {
    id: "ba_ppl",
    name: "B.A. in Public Policy & Leadership",
    level: "Undergraduate",
    summary: "Broad leadership + policy foundation with experiential learning and strong writing/communication focus.",
    nextSteps: [
      "Review major requirements & plan an 8-semester map.",
      "Join policy/leadership orgs and pursue service or internships.",
      "Meet with advising to align electives to interests."
    ]
  },
  {
    id: "minor_ppl",
    name: "Minor in Public Policy & Leadership",
    level: "Undergraduate",
    summary: "Add a policy & leadership lens alongside another major; flexible path to complement your strengths.",
    nextSteps: [
      "Pair the minor with your main major’s goals.",
      "Choose policy electives that fit your interests.",
      "Seek short internships or research projects."
    ]
  },
  {
    id: "accel_mpp",
    name: "Accelerated B.A./B.S. + MPP (Five-Year)",
    level: "Accelerated/Combined",
    summary: "Earn your bachelor’s plus the MPP in five years—best for strong quant prep and clear policy goals.",
    nextSteps: [
      "Confirm math/econ/statistics prep and timeline.",
      "Discuss fit & prerequisites with an advisor.",
      "Plan internships that align with policy goals."
    ]
  },
  {
    id: "mpp",
    name: "Master of Public Policy (MPP)",
    level: "Graduate",
    summary: "Professional degree emphasizing analysis, evidence, and leadership for public problem-solving.",
    nextSteps: [
      "Map skill gaps (micro, stats, writing) and address them.",
      "Network with career services & alumni in your areas.",
      "Prep application materials keyed to target roles."
    ]
  }
];

const INTERESTS = [
  "Education", "Health", "Environment", "Economic Policy",
  "National Security", "Data/Analytics", "Social Entrepreneurship",
  "Behavioral Policy", "International Development"
];

const EXPERIENCES = [
  "Intro Micro/Macro Economics",
  "Statistics",
  "Calculus",
  "Research Methods / RA",
  "Policy Internship / Work",
  "Student Org Leadership / Service",
  "Community Engagement / Volunteering"
];

const GOALS = [
  "Policy analysis / evidence-based decision-making",
  "Leadership / management in organizations",
  "Public or social sector career",
  "Consulting / advisory",
  "Data-driven product / program evaluation"
];

const PRIORITIES = [
  "Smaller classes / faculty access",
  "Experiential learning (client projects, internships)",
  "Research opportunities with faculty",
  "Quant/analytics rigor",
  "Career services & employer pipelines",
  "Flexibility to double major or minor"
];

const FUNDING_NEEDS = [
  "Need-based aid",
  "Merit scholarships",
  "Graduate assistantships (for MPP)",
  "Work-study / part-time work"
];

const ADVISING_QUESTIONS = [
  "How do my current courses map to prerequisites or recommended prep?",
  "What internships or client projects fit my interests this year?",
  "How common is double majoring / minoring with Batten programs?",
  "What quantitative preparation is expected—and how can I build it?",
  "What are typical class sizes and cohort collaboration norms?",
  "How does career services support internships and full-time roles?",
  "What scholarships, assistantships, or funding options could I pursue?",
  "Can I study abroad or participate in policy labs without delaying graduation?"
];

/* ──────────────────────────────
   Steps
────────────────────────────── */
const STEPS = [
  { id: "intro",     label: "Start" },
  { id: "profile",   label: "Profile" },
  { id: "interests", label: "Interests" },
  { id: "skills",    label: "Skills & Prep" },
  { id: "experience",label: "Experiences" },
  { id: "priorities",label: "Priorities" },
  { id: "funding",   label: "Logistics & Funding" },
  { id: "results",   label: "Match & Checklist" }
];

/* ──────────────────────────────
   Scoring (transparent & editable)
────────────────────────────── */
function scorePrograms(a) {
  const s = { ba_ppl: 0, minor_ppl: 0, accel_mpp: 0, mpp: 0 };

  // Academic level & timeline
  if (a.level === "Undergraduate") { s.ba_ppl += 4; s.minor_ppl += 3; }
  if (a.level === "Graduate") { s.mpp += 5; }
  if (a.gradTimeline >= 3) { s.mpp += 2; s.accel_mpp += 2; } // wants grad study soon

  // GPA + accelerated interest
  if (a.gpa >= 3.4 && a.accelInterest >= 3) s.accel_mpp += 5;
  if (a.gpa >= 3.2) { s.mpp += 2; s.accel_mpp += 1; }

  // Core prep (econ/calc/stats) & quant skill
  const hasExp = (x) => a.experiences.includes(x);
  const quantBoost =
    (a.skills.quant || 0) * 1.4 +
    (hasExp("Statistics") ? 1.2 : 0) +
    (hasExp("Calculus") ? 1.0 : 0) +
    (hasExp("Intro Micro/Macro Economics") ? 1.0 : 0);

  s.mpp += quantBoost * 0.9;
  s.accel_mpp += quantBoost * 0.8;

  // Interests alignment
  const hasInt = (x) => a.policyAreas.includes(x);
  if (hasInt("Data/Analytics")) { s.mpp += 2.5; s.accel_mpp += 1.0; }
  if (hasInt("Economic Policy")) { s.mpp += 2.0; s.ba_ppl += 1.0; }
  if (hasInt("Education")) { s.ba_ppl += 2.0; s.minor_ppl += 1.0; }
  if (hasInt("Environment")) { s.ba_ppl += 1.0; s.mpp += 1.0; }
  if (hasInt("Health")) { s.mpp += 1.0; s.ba_ppl += 1.0; }
  if (hasInt("National Security")) { s.mpp += 1.0; }
  if (hasInt("Social Entrepreneurship")) { s.ba_ppl += 1.0; }
  if (hasInt("International Development")) { s.mpp += 1.0; }

  // Goals
  const hasGoal = (x) => a.goals.includes(x);
  if (hasGoal("Policy analysis / evidence-based decision-making")) s.mpp += 3.0;
  if (hasGoal("Leadership / management in organizations")) s.ba_ppl += 2.0;
  if (hasGoal("Public or social sector career")) { s.mpp += 1.0; s.ba_ppl += 1.0; }
  if (hasGoal("Consulting / advisory")) s.mpp += 1.0;
  if (hasGoal("Data-driven product / program evaluation")) { s.mpp += 1.0; s.accel_mpp += 0.5; }

  // Priorities (softer weights)
  const hasPri = (p) => a.priorities.includes(p);
  if (hasPri("Quant/analytics rigor")) { s.mpp += 1.2; s.accel_mpp += 0.8; }
  if (hasPri("Experiential learning (client projects, internships)")) { s.ba_ppl += 1.0; s.mpp += 1.0; }
  if (hasPri("Research opportunities with faculty")) s.mpp += 0.8;
  if (hasPri("Flexibility to double major or minor")) s.minor_ppl += 1.0;

  // Normalize 0–10
  const max = Math.max(1, ...Object.values(s));
  return Object.entries(s).reduce((out, [k, v]) => {
    out[k] = Math.round((v / max) * 10);
    return out;
  }, {});
}

/* Personalized advising prompts */
function buildAdvisingChecklist(a, topPrograms) {
  const qs = [...ADVISING_QUESTIONS];

  if (a.gpa < 3.2) qs.unshift("What GPA range is typical, and what can I do now to strengthen my application?");
  if (a.skills.quant < 3) qs.unshift("How can I build quantitative readiness (workshops, tutoring, course sequencing)?");
  if (a.accelInterest >= 3) qs.unshift("For the accelerated 5-year path, what timeline and prerequisites should I plan?");
  if (a.priorities.includes("Experiential learning (client projects, internships)"))
    qs.unshift("Which client projects and internships align with my interests this year?");

  if (topPrograms.includes("mpp")) qs.unshift("What does a compelling MPP application look like for my background?");
  if (topPrograms.includes("ba_ppl")) qs.unshift("How do PPL electives line up with my interests and career goals?");
  if (topPrograms.includes("minor_ppl")) qs.unshift("How can I combine the PPL minor with my primary major effectively?");
  if (topPrograms.includes("accel_mpp")) qs.unshift("How competitive is the accelerated B.A./B.S. + MPP and how do I prepare?");

  // De-duplicate while preserving order
  const seen = new Set(); const final = [];
  for (const q of qs) { if (!seen.has(q)) { seen.add(q); final.push(q); } }
  return final.slice(0, 10);
}

function formatEmailSummary(a, recs) {
  const top = recs.slice(0, 2).map(r => r.name).join("; ");
  const lines = [
    `Prospective Student Summary`,
    `———————————————`,
    `Level: ${a.level || "—"}`,
    `Status: ${a.profileStatus || "—"}`,
    `GPA (approx): ${a.gpa?.toFixed ? a.gpa.toFixed(2) : a.gpa || "—"}`,
    `Timeline to grad study: ${a.gradTimeline}/5`,
    `Interests: ${a.policyAreas.join(", ") || "—"}`,
    `Skills (0–5): Quant ${a.skills.quant}, Writing ${a.skills.writing}, Comm ${a.skills.communication}, Leadership ${a.skills.leadership}, DataViz ${a.skills.dataViz}`,
    `Experiences: ${a.experiences.join(", ") || "—"}`,
    `Goals: ${a.goals.join(", ") || "—"}`,
    `Priorities: ${a.priorities.join(", ") || "—"}`,
    `Funding needs: ${a.fundingNeeds.join(", ") || "—"}; Budget intent: ~$${a.budgetK}k/yr`,
    `Top Recommendations: ${top || "—"}`,
    ``,
    `Notes: ${a.notes || "—"}`
  ];
  return lines.join("\n");
}

/* ──────────────────────────────
   Main app
────────────────────────────── */
export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({
    // Profile
    level: "",                        // Undergraduate | Graduate
    profileStatus: "",                // HS Jr/Sr, Current UVA, Transfer, Working professional, etc.
    residency: "",                    // VA | Non-VA | International
    gpa: 3.4,                         // slider 2.0–4.0
    accelInterest: 0,                 // slider 0–5
    gradTimeline: 0,                  // slider 0–5

    // Interests & Skills
    policyAreas: [],
    skills: { quant: 0, writing: 0, communication: 0, leadership: 0, dataViz: 0 },

    // Experience & Priorities
    experiences: [],
    goals: [],
    priorities: [],

    // Funding & Logistics
    fundingNeeds: [],
    budgetK: 20,                      // per year target budget (in thousands)
    workHours: 0,                     // intended work hours during study

    // Contact / notes
    name: "", email: "", optIn: false,
    notes: ""
  });

  const step = STEPS[stepIndex];
  const scores = useMemo(() => scorePrograms(answers), [answers]);

  const ranked = useMemo(() => {
    const list = PROGRAMS.map(p => ({ ...p, score: scores[p.id] || 0 }))
      .sort((a, b) => b.score - a.score);
    return list;
  }, [scores]);

  const next = () => setStepIndex(i => Math.min(i + 1, STEPS.length - 1));
  const back = () => setStepIndex(i => Math.max(i - 1, 0));
  const canNext = useMemo(() => {
    if (step.id === "profile") return !!answers.level;
    if (step.id === "results") return true;
    return true;
  }, [step.id, answers.level]);

  /* UI */
  return (
    <div className="min-h-screen" style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', background: '#f6f7fb' }}>
      <div className="max-w-5xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">UVA Frank Batten — Major & Program Match (Advising-Ready)</h1>
          <p className="text-sm opacity-70 mt-1">Answer detailed questions to see program fit, an advising checklist, and a shareable summary.</p>
        </header>

        {/* Progress chips */}
        <div className="flex items-center gap-2 mb-4 text-sm flex-wrap">
          {STEPS.map((s, i) => (
            <span key={s.id} className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border ${i <= stepIndex ? "bg-black text-white border-black" : "bg-white text-black"}`}>
              {s.label}
            </span>
          ))}
        </div>

        <Card>
          {/* START */}
          {step.id === "intro" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-medium mb-3">Welcome!</h2>
              <p className="mb-4">We’ll ask about your background, interests, skills, and goals. You’ll get ranked program matches and a customized advising checklist.</p>
              <Button className="bg-black text-white" onClick={next}>
                Start <ChevronRight className="inline-block ml-2" size={16} />
              </Button>
            </motion.div>
          )}

          {/* PROFILE */}
          {step.id === "profile" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5">
              <h2 className="text-xl font-medium">Your Profile</h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-1 block">Academic Level<span className="text-red-500">*</span></label>
                  <Select value={answers.level} onChange={e => setAnswers(a => ({ ...a, level: e.target.value }))}>
                    <option value="">Select…</option>
                    <option>Undergraduate</option>
                    <option>Graduate</option>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Current Status</label>
                  <Select value={answers.profileStatus} onChange={e => setAnswers(a => ({ ...a, profileStatus: e.target.value }))}>
                    <option value="">Select…</option>
                    <option>High school junior/senior</option>
                    <option>Current UVA student</option>
                    <option>Transfer student</option>
                    <option>Working professional</option>
                    <option>Other/Not sure</option>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Residency</label>
                  <Select value={answers.residency} onChange={e => setAnswers(a => ({ ...a, residency: e.target.value }))}>
                    <option value="">Select…</option>
                    <option>Virginia</option>
                    <option>Non-Virginia (US)</option>
                    <option>International</option>
                  </Select>
                </div>
                <div />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <LabeledSlider
                  label="GPA (approximate)"
                  min={2.0} max={4.0} step={0.1}
                  value={answers.gpa}
                  onChange={v => setAnswers(a => ({ ...a, gpa: Number(v.toFixed(2)) }))}
                  help="Move the slider to your current or estimated GPA."
                />
                <LabeledSlider
                  label="Interest in accelerated 5-year or combined options"
                  min={0} max={5} step={1}
                  value={answers.accelInterest}
                  onChange={v => setAnswers(a => ({ ...a, accelInterest: v }))}
                  help="0 = not interested, 5 = very interested"
                />
              </div>

              <LabeledSlider
                label="How soon do you want to pursue graduate study?"
                min={0} max={5} step={1}
                value={answers.gradTimeline}
                onChange={v => setAnswers(a => ({ ...a, gradTimeline: v }))}
                help="0 = unsure / not soon, 5 = very soon"
              />

              <div className="mt-2">
                <label className="text-sm font-medium mb-1 block">Notes (optional)</label>
                <Textarea rows={3} value={answers.notes} onChange={e => setAnswers(a => ({ ...a, notes: e.target.value }))} placeholder="Anything else we should know?" />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Button onClick={back}><ArrowLeft className="inline-block mr-2" size={16} />Back</Button>
                <Button className="bg-black text-white" onClick={next} disabled={!canNext}>
                  Next <ChevronRight className="inline-block ml-2" size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* INTERESTS */}
          {step.id === "interests" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5">
              <h2 className="text-xl font-medium">Academic & Policy Interests</h2>
              <LabeledMultiSelect
                label="Choose your interests"
                options={INTERESTS}
                value={answers.policyAreas}
                onChange={vals => setAnswers(a => ({ ...a, policyAreas: vals }))}
              />
              <div className="mt-2">
                <label className="text-sm font-medium mb-1 block">Current / Intended Major (optional)</label>
                <Input placeholder="e.g., Economics, Government" onChange={e => setAnswers(a => ({ ...a, major: e.target.value }))} />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={back}><ArrowLeft className="inline-block mr-2" size={16} />Back</Button>
                <Button className="bg-black text-white" onClick={next}>
                  Next <ChevronRight className="inline-block ml-2" size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* SKILLS */}
          {step.id === "skills" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5">
              <h2 className="text-xl font-medium">Skills & Preparation</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <LabeledSlider label="Quantitative analysis / comfort with math" value={answers.skills.quant} onChange={v => setAnswers(a => ({ ...a, skills: { ...a.skills, quant: v } }))} />
                <LabeledSlider label="Academic or professional writing" value={answers.skills.writing} onChange={v => setAnswers(a => ({ ...a, skills: { ...a.skills, writing: v } }))} />
                <LabeledSlider label="Public speaking / communication" value={answers.skills.communication} onChange={v => setAnswers(a => ({ ...a, skills: { ...a.skills, communication: v } }))} />
                <LabeledSlider label="Team leadership / project management" value={answers.skills.leadership} onChange={v => setAnswers(a => ({ ...a, skills: { ...a.skills, leadership: v } }))} />
                <LabeledSlider label="Data visualization / coding tools" value={answers.skills.dataViz} onChange={v => setAnswers(a => ({ ...a, skills: { ...a.skills, dataViz: v } }))} />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={back}><ArrowLeft className="inline-block mr-2" size={16} />Back</Button>
                <Button className="bg-black text-white" onClick={next}>
                  Next <ChevronRight className="inline-block ml-2" size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* EXPERIENCES */}
          {step.id === "experience" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5">
              <h2 className="text-xl font-medium">Coursework & Experiences</h2>
              <LabeledMultiSelect
                label="Select any you’ve completed"
                options={EXPERIENCES}
                value={answers.experiences}
                onChange={vals => setAnswers(a => ({ ...a, experiences: vals }))}
              />
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={back}><ArrowLeft className="inline-block mr-2" size={16} />Back</Button>
                <Button className="bg-black text-white" onClick={next}>
                  Next <ChevronRight className="inline-block ml-2" size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* PRIORITIES */}
          {step.id === "priorities" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5">
              <h2 className="text-xl font-medium">Learning Priorities</h2>
              <LabeledMultiSelect
                label="What matters most to you?"
                options={PRIORITIES}
                value={answers.priorities}
                onChange={vals => setAnswers(a => ({ ...a, priorities: vals }))}
              />
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={back}><ArrowLeft className="inline-block mr-2" size={16} />Back</Button>
                <Button className="bg-black text-white" onClick={next}>
                  Next <ChevronRight className="inline-block ml-2" size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* FUNDING & LOGISTICS */}
          {step.id === "funding" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5">
              <h2 className="text-xl font-medium">Logistics & Funding</h2>
              <LabeledMultiSelect
                label="Funding you’re interested in"
                options={FUNDING_NEEDS}
                value={answers.fundingNeeds}
                onChange={vals => setAnswers(a => ({ ...a, fundingNeeds: vals }))}
              />
              <div className="grid md:grid-cols-2 gap-5">
                <LabeledSlider
                  label="Target total budget per year (tuition+living)"
                  min={10} max={90} step={5}
                  value={answers.budgetK}
                  onChange={v => setAnswers(a => ({ ...a, budgetK: v }))}
                  suffix="k"
                />
                <LabeledSlider
                  label="Planned work hours during study"
                  min={0} max={30} step={5}
                  value={answers.workHours}
                  onChange={v => setAnswers(a => ({ ...a, workHours: v }))}
                  suffix=" hrs/wk"
                />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={back}><ArrowLeft className="inline-block mr-2" size={16} />Back</Button>
                <Button className="bg-black text-white" onClick={next}>
                  See Match <ChevronRight className="inline-block ml-2" size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* RESULTS & CHECKLIST */}
          {step.id === "results" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-medium">Your Program Match</h2>
              <p className="text-sm opacity-70 mb-4">Based on your inputs, here’s how programs rank today. Click a badge to view typical next steps.</p>

              <div className="flex flex-wrap gap-3 mb-5">
                {ranked.map(p => (
                  <Chip key={p.id} active={false} onClick={() => {}}>
                    {p.name} <span className="opacity-70">Score {p.score}</span>
                  </Chip>
                ))}
              </div>

              <Card className="mb-5">
                <h3 className="font-medium mb-2">Top Suggestions</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {ranked.slice(0, 2).map(p => (
                    <span key={p.id} className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border bg-black text-white border-black">
                      {p.name}
                    </span>
                  ))}
                </div>
                <p className="text-sm opacity-80 mb-3">{ranked[0]?.summary}</p>
                <ul className="list-disc pl-5 space-y-2">
                  {(ranked[0]?.nextSteps || PROGRAMS[0].nextSteps).map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </Card>

              <Card className="mb-5">
                <h3 className="font-medium mb-2">Advising Checklist (personalized)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {buildAdvisingChecklist(answers, ranked.slice(0,2).map(p => p.id)).map((q,i) => <li key={i}>{q}</li>)}
                </ul>
              </Card>

              <Card>
                <h3 className="font-medium mb-2">Share with an Advisor</h3>
                <p className="text-sm opacity-80 mb-3">Copy the summary below into an email or bring it to your advising meeting.</p>
                <pre className="text-xs bg-gray-50 border rounded-xl p-3 overflow-auto whitespace-pre-wrap">
{formatEmailSummary(answers, ranked)}
                </pre>
                <div className="mt-3 flex gap-3">
                  <Button className="border" onClick={() => navigator.clipboard.writeText(formatEmailSummary(answers, ranked))}>
                    Copy Summary
                  </Button>
                  <Button className="bg-black text-white" onClick={() => window.print()}>
                    <Download className="inline-block mr-2" size={16} /> Save/Print
                  </Button>
                </div>
              </Card>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Card>
                  <h3 className="font-medium mb-2">Stay in Touch</h3>
                  <div className="grid gap-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Name</label>
                      <Input value={answers.name} onChange={e => setAnswers(a => ({ ...a, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <Input type="email" value={answers.email} onChange={e => setAnswers(a => ({ ...a, email: e.target.value }))} />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={answers.optIn} onChange={e => setAnswers(a => ({ ...a, optIn: e.target.checked }))} className="h-5 w-5" />
                      <span>Yes, send me tailored info sessions, deadlines, and scholarship updates.</span>
                    </label>
                    <Button className="bg-black text-white" onClick={() => alert("Saved locally. In production, submit to your form/endpoint.")}>
                      <Mail className="inline-block mr-2" size={16} /> Submit
                    </Button>
                  </div>
                </Card>

                <Card>
                  <h3 className="font-medium mb-2">What’s Next (quick plan)</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Skim sample coursework for your top program(s).</li>
                    <li>Book advising to confirm fit and timeline.</li>
                    <li>Line up one experience (internship, RA, service) this term.</li>
                    <li>Note funding deadlines; gather materials early.</li>
                  </ol>
                </Card>
              </div>

              <div className="mt-6">
                <Button onClick={back}><ArrowLeft className="inline-block mr-2" size={16} />Back</Button>
              </div>
            </motion.div>
          )}
        </Card>

        <div className="text-xs opacity-60 mt-6">Step {stepIndex + 1} of {STEPS.length}</div>
      </div>
    </div>
  );
}
