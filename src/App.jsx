import { useState, useEffect, useRef, useCallback } from "react";

const SUBJECTS = {
  "Biology 1P": {
    color: "#10b981", glow: "#10b98140",
    chapters: [
      { id: "b1c1", num: 1, name: "Cell & Its Structure", partial: false },
      { id: "b1c2", num: 2, name: "Cell Division", partial: false },
      { id: "b1c3", num: 3, name: "Cell Chemistry (Biomolecules)", partial: false },
      { id: "b1c4", num: 4, name: "Microorganisms", partial: false },
      { id: "b1c5", num: 5, name: "Algae & Fungi", partial: false },
      { id: "b1c6", num: 6, name: "Bryophytes & Pteridophytes", partial: false },
      { id: "b1c7", num: 7, name: "Gymnosperms & Angiosperms", partial: false },
      { id: "b1c8", num: 8, name: "Tissue & Tissue System", partial: false },
      { id: "b1c9", num: 9, name: "Plant Physiology", partial: false },
      { id: "b1c10", num: 10, name: "Plant Reproduction", partial: false },
      { id: "b1c11", num: 11, name: "Biotechnology", partial: false },
      { id: "b1c12", num: 12, name: "Organism & Environment", partial: false },
    ]
  },

  "Biology 2P": {
    color: "#34d399", glow: "#34d39940",
    chapters: [
      { id: "b2c1", num: 1, name: "Animal Diversity", partial: false },
      { id: "b2c2", num: 2, name: "Animal Identification", partial: false },
      { id: "b2c3", num: 3, name: "Digestion & Absorption", partial: false },
      { id: "b2c4", num: 4, name: "Blood & Circulation", partial: false },
      { id: "b2c5", num: 5, name: "Respiration", partial: false },
      { id: "b2c6", num: 6, name: "Excretion", partial: false },
      { id: "b2c7", num: 7, name: "Movement & Skeleton", partial: false },
      { id: "b2c8", num: 8, name: "Coordination", partial: false },
      { id: "b2c9", num: 9, name: "Human Reproduction", partial: false },
      { id: "b2c10", num: 10, name: "Human Genetics & Evolution", partial: false },
      { id: "b2c11", num: 11, name: "Animal Behavior", partial: false },
      { id: "b2c12", num: 12, name: "Biotechnology & Applications", partial: false },
    ]
  },

  "Chemistry 1P": {
    color: "#f59e0b", glow: "#f59e0b40",
    chapters: [
      { id: "ch1c1", num: 1, name: "Introduction & Laboratory Safety", partial: false },
      { id: "ch1c2", num: 2, name: "Qualitative Chemistry", partial: false },
      { id: "ch1c3", num: 3, name: "Mole Concept & Chemical Calculation", partial: false },
      { id: "ch1c4", num: 4, name: "Atomic Structure", partial: false },
      { id: "ch1c5", num: 5, name: "Chemical Bonding", partial: false },
    ]
  },

  "Chemistry 2P": {
    color: "#fbbf24", glow: "#fbbf2440",
    chapters: [
      { id: "ch2c1", num: 1, name: "Environmental Chemistry", partial: false },
      { id: "ch2c2", num: 2, name: "Organic Chemistry", partial: false },
      { id: "ch2c3", num: 3, name: "Stoichiometry & Quantitative Chemistry", partial: false },
      { id: "ch2c4", num: 4, name: "Electrochemistry", partial: false },
      { id: "ch2c5", num: 5, name: "Economic Chemistry", partial: false },
    ]
  },

 "Physics 1P": {
  color: "#818cf8", glow: "#818cf840",
  chapters: [
    { id: "ph1c1", num: 1, name: "Physical World & Measurement", partial: false },
    { id: "ph1c2", num: 2, name: "Vector", partial: false },
    { id: "ph1c3", num: 3, name: "Dynamics", partial: false },
    { id: "ph1c4", num: 4, name: "Newtonian Mechanics", partial: false },
    { id: "ph1c5", num: 5, name: "Work, Energy & Power", partial: false },
    { id: "ph1c6", num: 6, name: "Gravitation", partial: false },
    { id: "ph1c7", num: 7, name: "Mechanical Properties of Matter", partial: false },
    { id: "ph1c8", num: 8, name: "Periodic Motion", partial: false },
    { id: "ph1c9", num: 9, name: "Wave", partial: false },
    { id: "ph1c10", num: 10, name: "Ideal Gas & Thermodynamics Basics", partial: false },
  ]
},

  "Physics 2P": {
    color: "#a78bfa", glow: "#a78bfa40",
    chapters: [
      { id: "ph2c1", num: 1, name: "Thermodynamics", partial: false },
      { id: "ph2c2", num: 2, name: "Static Electricity", partial: false },
      { id: "ph2c3", num: 3, name: "Current Electricity", partial: false },
      { id: "ph2c4", num: 4, name: "Magnetism", partial: false },
      { id: "ph2c5", num: 5, name: "Electromagnetic Induction", partial: false },
      { id: "ph2c6", num: 6, name: "Alternating Current", partial: false },
      { id: "ph2c7", num: 7, name: "Geometrical Optics", partial: false },
      { id: "ph2c8", num: 8, name: "Physical Optics", partial: false },
      { id: "ph2c9", num: 9, name: "Modern Physics", partial: false },
      { id: "ph2c10", num: 10, name: "Atomic Model & Nuclear Physics", partial: false },
      { id: "ph2c11", num: 11, name: "Semiconductor & Electronics", partial: false },
    ]
  },

  "Math 1P": {
    color: "#f43f5e", glow: "#f43f5e40",
    chapters: [
      { id: "m1c1", num: 1, name: "Matrix & Determinant", partial: false },
      { id: "m1c2", num: 2, name: "Straight Line", partial: false },
      { id: "m1c3", num: 3, name: "Circle", partial: false },
      { id: "m1c4", num: 4, name: "Conic Section", partial: false },
      { id: "m1c5", num: 5, name: "Linear Programming", partial: false },
      { id: "m1c6", num: 6, name: "Differential Calculus", partial: false },
      { id: "m1c7", num: 7, name: "Integral Calculus", partial: false },
      { id: "m1c8", num: 8, name: "Coordinate Geometry", partial: false },
      { id: "m1c9", num: 9, name: "Trigonometry", partial: false },
      { id: "m1c10", num: 10, name: "Probability", partial: false },
    ]
  },

  "Math 2P": {
    color: "#fb7185", glow: "#fb718540",
    chapters: [
      { id: "m2c1", num: 1, name: "Complex Number", partial: false },
      { id: "m2c2", num: 2, name: "Polynomial & Equation", partial: false },
      { id: "m2c3", num: 3, name: "Inverse Trigonometric Functions", partial: false },
      { id: "m2c4", num: 4, name: "Statics", partial: false },
      { id: "m2c5", num: 5, name: "Plane Motion", partial: false },
      { id: "m2c6", num: 6, name: "Vector", partial: false },
      { id: "m2c7", num: 7, name: "Transformation", partial: false },
      { id: "m2c8", num: 8, name: "Differential Equation", partial: false },
      { id: "m2c9", num: 9, name: "Numerical Methods", partial: false },
    ]
  },

  "ICT": {
    color: "#06b6d4", glow: "#06b6d440",
    chapters: [
      { id: "ict1", num: 1, name: "World & Bangladesh Perspective", partial: false },
      { id: "ict2", num: 2, name: "Communication Systems & Networking", partial: false },
      { id: "ict3", num: 3, name: "Number System & Digital Device", partial: false },
      { id: "ict4", num: 4, name: "Web Design Introduction", partial: false },
      { id: "ict5", num: 5, name: "Programming Language", partial: false },
      { id: "ict6", num: 6, name: "Database Management System", partial: false },
    ]
  },

  "Bangla 1P": {
    color: "#ec4899", glow: "#ec489940",
    chapters: [
      { id: "bn1c1", num: 1, name: "Prose (Gadya)", partial: false },
      { id: "bn1c2", num: 2, name: "Poetry (Poddyo)", partial: false },
      { id: "bn1c3", num: 3, name: "Drama", partial: false },
      { id: "bn1c4", num: 4, name: "Novel", partial: false },
    ]
  }
};

const STATUS_CONFIG = {
  "Not Revised": { color: "#374151", bg: "#1f293780", icon: "○" },
  "Revised Once": { color: "#3b82f6", bg: "#1d40af40", icon: "◔" },
  "Revised Multiple": { color: "#8b5cf6", bg: "#5b21b640", icon: "◑" },
  "Strong": { color: "#10b981", bg: "#06643640", icon: "●" },
  "Weak": { color: "#f59e0b", bg: "#92400e40", icon: "◐" },
  "Critical": { color: "#ef4444", bg: "#7f1d1d40", icon: "⚠" },
  "Forgotten": { color: "#6b7280", bg: "#11182740", icon: "✕" },
};

const CONFIDENCE_COLORS = ["#ef4444","#f97316","#f59e0b","#84cc16","#10b981"];
const BADGES = [
  { id:"first_rev", name:"First Blood", desc:"Complete first revision", icon:"🎯", xp:50 },
  { id:"streak3", name:"Momentum", desc:"3-day streak", icon:"🔥", xp:100 },
  { id:"streak7", name:"Iron Will", desc:"7-day streak", icon:"⚡", xp:250 },
  { id:"strong5", name:"Scholar", desc:"5 Strong chapters", icon:"📚", xp:150 },
  { id:"subject_done", name:"Subject Master", desc:"Complete a subject", icon:"🏆", xp:300 },
  { id:"perfect_week", name:"Perfect Week", desc:"Revise 7 days straight", icon:"💎", xp:500 },
  { id:"comeback", name:"Comeback Kid", desc:"Revise after 3-day gap", icon:"🌅", xp:200 },
  { id:"pomodoro5", name:"Focus Machine", desc:"Complete 5 pomodoros", icon:"⏱", xp:100 },
  { id:"xp1000", name:"Rising Star", desc:"Earn 1000 XP", icon:"⭐", xp:200 },
  { id:"all_revised", name:"HSC Beast", desc:"Revise all chapters once", icon:"👑", xp:1000 },
];

const SRS_INTERVALS = [1, 3, 7, 14, 30, 60];

function getDayKey(date = new Date()) {
  return date.toISOString().split('T')[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return getDayKey(d);
}

function daysDiff(a, b = getDayKey()) {
  const diff = new Date(b) - new Date(a);
  return Math.round(diff / 86400000);
}

function initChapterState() {
  const state = {};
  Object.entries(SUBJECTS).forEach(([subj, data]) => {
    data.chapters.forEach(ch => {
      state[ch.id] = {
        id: ch.id, subject: subj, num: ch.num, name: ch.name, partial: ch.partial,
        status: "Not Revised",
        confidence: 0,
        difficulty: 3,
        revisionCount: 0,
        lastRevised: null,
        nextRevision: getDayKey(),
        srsLevel: 0,
        selfTest: false,
        mcqPractice: false,
        writtenPractice: false,
        formulaRevision: false,
        timeSpent: 0,
        notes: "",
        mistakes: "",
      };
    });
  });
  return state;
}

function loadState() {
  try {
    const raw = localStorage.getItem("hsc_revision_os_v3");
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveState(state) {
  try { localStorage.setItem("hsc_revision_os_v3", JSON.stringify(state)); } catch {}
}

const TABS = ["Dashboard","Chapters","Analytics","Planner","Achieve","Focus"];

export default function App() {
  const [chapters, setChapters] = useState(() => {
    const saved = loadState();
    return saved?.chapters || initChapterState();
  });
  const [meta, setMeta] = useState(() => {
    const saved = loadState();
    return saved?.meta || {
      xp: 0, level: 1, streak: 0, lastStudyDay: null,
      totalPomodoros: 0, earnedBadges: [], studyDays: [],
      examDate: "2026-07-02", dailyGoal: 5,
    };
  });
  const [tab, setTab] = useState("Dashboard");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [pomState, setPomState] = useState({ active: false, seconds: 25*60, mode: "focus", count: 0 });
  const [notification, setNotification] = useState(null);
  const [celebrationXP, setCelebrationXP] = useState(null);
  const [emergencyMode, setEmergencyMode] = useState(false);

  useEffect(() => {
    saveState({ chapters, meta });
  }, [chapters, meta]);

  const notify = useCallback((msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const awardXP = useCallback((amount, reason) => {
    setCelebrationXP({ amount, reason });
    setTimeout(() => setCelebrationXP(null), 2500);
    setMeta(m => {
      const newXP = m.xp + amount;
      const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1;
      return { ...m, xp: newXP, level: newLevel };
    });
  }, []);

  const checkAndAwardBadge = useCallback((badgeId, condition) => {
    if (!condition) return;
    setMeta(m => {
      if (m.earnedBadges.includes(badgeId)) return m;
      const badge = BADGES.find(b => b.id === badgeId);
      awardXP(badge.xp, badge.name);
      notify(`🏅 Badge Unlocked: ${badge.name}!`, "badge");
      return { ...m, earnedBadges: [...m.earnedBadges, badgeId] };
    });
  }, [awardXP, notify]);

  const markRevised = useCallback((chId, updates = {}) => {
    setChapters(prev => {
      const ch = prev[chId];
      const today = getDayKey();
      const newCount = ch.revisionCount + 1;
      const srsLevel = Math.min(ch.srsLevel + 1, SRS_INTERVALS.length - 1);
      const nextRevision = addDays(today, SRS_INTERVALS[srsLevel]);
      let status = ch.status;
      if (updates.confidence >= 4) status = "Strong";
      else if (updates.confidence >= 2) status = newCount >= 3 ? "Revised Multiple" : "Revised Once";
      else if (updates.confidence === 1) status = "Weak";
      else if (updates.confidence === 0 && newCount > 0) status = "Critical";
      return {
        ...prev,
        [chId]: { ...ch, ...updates, revisionCount: newCount, lastRevised: today, nextRevision, srsLevel, status }
      };
    });
    setMeta(m => {
      const today = getDayKey();
      const studyDays = m.studyDays.includes(today) ? m.studyDays : [...m.studyDays, today];
      const yesterday = addDays(today, -1);
      const streak = m.lastStudyDay === yesterday || m.lastStudyDay === today
        ? (m.lastStudyDay === today ? m.streak : m.streak + 1) : 1;
      return { ...m, lastStudyDay: today, studyDays, streak };
    });
    awardXP(20, "Chapter Revised");
    setTimeout(() => {
      setChapters(cur => {
        const allChapters = Object.values(cur);
        const revised = allChapters.filter(c => c.revisionCount > 0).length;
        const strong = allChapters.filter(c => c.status === "Strong").length;
        checkAndAwardBadge("first_rev", revised >= 1);
        checkAndAwardBadge("strong5", strong >= 5);
        checkAndAwardBadge("all_revised", revised === allChapters.length);
        return cur;
      });
      setMeta(m => {
        checkAndAwardBadge("streak3", m.streak >= 3);
        checkAndAwardBadge("streak7", m.streak >= 7);
        checkAndAwardBadge("perfect_week", m.streak >= 7);
        checkAndAwardBadge("pomodoro5", m.totalPomodoros >= 5);
        checkAndAwardBadge("xp1000", m.xp >= 1000);
        return m;
      });
    }, 100);
  }, [awardXP, checkAndAwardBadge]);

  const pomRef = useRef(null);
  useEffect(() => {
    if (pomState.active) {
      pomRef.current = setInterval(() => {
        setPomState(p => {
          if (p.seconds <= 1) {
            clearInterval(pomRef.current);
            const newCount = p.mode === "focus" ? p.count + 1 : p.count;
            setMeta(m => ({ ...m, totalPomodoros: m.totalPomodoros + (p.mode === "focus" ? 1 : 0) }));
            notify(p.mode === "focus" ? "🍅 Pomodoro done! Take a break." : "⚡ Break over! Time to focus.");
            return { active: false, seconds: p.mode === "focus" ? 5*60 : 25*60, mode: p.mode === "focus" ? "break" : "focus", count: newCount };
          }
          return { ...p, seconds: p.seconds - 1 };
        });
      }, 1000);
    } else {
      clearInterval(pomRef.current);
    }
    return () => clearInterval(pomRef.current);
  }, [pomState.active, notify]);

  const daysToExam = daysDiff(getDayKey(), meta.examDate);
  const allChapters = Object.values(chapters);
  const totalChapters = allChapters.length;
  const revisedCount = allChapters.filter(c => c.revisionCount > 0).length;
  const strongCount = allChapters.filter(c => c.status === "Strong").length;
  const todayRevised = allChapters.filter(c => c.lastRevised === getDayKey()).length;
  const dueToday = allChapters.filter(c => c.nextRevision <= getDayKey() && c.revisionCount > 0).length;
  const overallProgress = Math.round((revisedCount / totalChapters) * 100);
  const xpToNext = ((meta.level) * (meta.level) * 100);
  const xpProgress = Math.round((meta.xp % xpToNext) / xpToNext * 100);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #050816 0%, #0a0f2e 50%, #060b1e 100%)", color: "#e2e8f0", fontFamily: "'Plus Jakarta Sans', 'Syne', system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* Ambient bg blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, #3730a360 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, #0f766e40 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "40%", right: "20%", width: "30vw", height: "30vw", borderRadius: "50%", background: "radial-gradient(circle, #be185d30 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* Notification */}
      {notification && (
        <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999, background: notification.type === "badge" ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "linear-gradient(135deg, #065f46, #10b981)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: "14px 22px", fontSize: 14, fontWeight: 600, boxShadow: "0 20px 60px rgba(0,0,0,0.5)", animation: "slideIn 0.3s ease", backdropFilter: "blur(20px)" }}>
          {notification.msg}
        </div>
      )}

      {/* XP Celebration */}
      {celebrationXP && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 9998, textAlign: "center", pointerEvents: "none", animation: "celebrate 2.5s ease forwards" }}>
          <div style={{ fontSize: 52, fontFamily: "'Syne', sans-serif", fontWeight: 800, background: "linear-gradient(135deg, #f59e0b, #fbbf24, #fcd34d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>+{celebrationXP.amount} XP</div>
          <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}>{celebrationXP.reason}</div>
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes celebrate { 0% { opacity:0; transform:translate(-50%,-50%) scale(0.5); } 20% { opacity:1; transform:translate(-50%,-60%) scale(1.1); } 80% { opacity:1; transform:translate(-50%,-65%) scale(1); } 100% { opacity:0; transform:translate(-50%,-80%) scale(0.9); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Top Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(30px)", background: "rgba(5,8,22,0.7)", padding: "0 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 0, height: 60 }}>
          <div style={{ marginRight: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📖</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, background: "linear-gradient(135deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>HSC RevisionOS</span>
          </div>

          {/* XP Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 30, padding: "6px 14px" }}>
            <span style={{ fontSize: 12, color: "#a78bfa", fontWeight: 700 }}>Lv.{meta.level}</span>
            <div style={{ width: 80, height: 6, background: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${xpProgress}%`, background: "linear-gradient(90deg, #7c3aed, #a855f7)", borderRadius: 3, transition: "width 0.5s ease" }} />
            </div>
            <span style={{ fontSize: 12, color: "#64748b" }}>{meta.xp} XP</span>
          </div>

          {/* Streak */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 30, padding: "6px 14px" }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: meta.streak > 0 ? "#f97316" : "#475569" }}>{meta.streak}d</span>
          </div>

          {/* Exam countdown */}
          <div style={{ background: daysToExam < 30 ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.15)", border: `1px solid ${daysToExam < 30 ? "rgba(239,68,68,0.3)" : "rgba(99,102,241,0.3)"}`, borderRadius: 30, padding: "6px 14px", fontSize: 12, fontWeight: 700, color: daysToExam < 30 ? "#f87171" : "#818cf8" }}>
            ⏳ {daysToExam}d to Exam
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 2, paddingBottom: 0 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 18px", fontSize: 13, fontWeight: tab === t ? 700 : 500, color: tab === t ? "#a78bfa" : "#64748b", borderBottom: tab === t ? "2px solid #8b5cf6" : "2px solid transparent", transition: "all 0.2s", letterSpacing: "0.01em" }}>
              {t}
            </button>
          ))}
          <button onClick={() => setEmergencyMode(e => !e)} style={{ marginLeft: "auto", background: emergencyMode ? "linear-gradient(135deg, #dc2626, #ef4444)" : "rgba(239,68,68,0.1)", border: `1px solid ${emergencyMode ? "transparent" : "rgba(239,68,68,0.3)"}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, color: emergencyMode ? "#fff" : "#f87171", cursor: "pointer", marginBottom: 4 }}>
            {emergencyMode ? "🚨 EMERGENCY MODE ON" : "🚨 Emergency Mode"}
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px", position: "relative", zIndex: 1 }}>
        {tab === "Dashboard" && <DashboardTab chapters={allChapters} meta={meta} setMeta={setMeta} subjects={SUBJECTS} overallProgress={overallProgress} revisedCount={revisedCount} totalChapters={totalChapters} strongCount={strongCount} todayRevised={todayRevised} dueToday={dueToday} emergencyMode={emergencyMode} setTab={setTab} notify={notify} />}
        {tab === "Chapters" && <ChaptersTab chapters={chapters} setChapters={setChapters} subjects={SUBJECTS} subjectFilter={subjectFilter} setSubjectFilter={setSubjectFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter} markRevised={markRevised} notify={notify} />}
        {tab === "Analytics" && <AnalyticsTab chapters={allChapters} subjects={SUBJECTS} meta={meta} />}
        {tab === "Planner" && <PlannerTab chapters={allChapters} subjects={SUBJECTS} meta={meta} setMeta={setMeta} notify={notify} />}
        {tab === "Achieve" && <AchieveTab meta={meta} chapters={allChapters} />}
        {tab === "Focus" && <FocusTab pomState={pomState} setPomState={setPomState} meta={meta} />}
      </main>
    </div>
  );
}

function StatCard({ label, value, sub, color = "#818cf8", glow = false }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 22px", position: "relative", overflow: "hidden", transition: "transform 0.2s", cursor: "default" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
      {glow && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at top left, ${color}15 0%, transparent 60%)`, pointerEvents: "none" }} />}
      <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Syne', sans-serif", color }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function GlowProgress({ value, color = "#8b5cf6", height = 8, label }) {
  return (
    <div>
      {label && <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#64748b" }}>
        <span>{label}</span><span style={{ color }}>{value}%</span>
      </div>}
      <div style={{ height, background: "#1e293b", borderRadius: height, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: `linear-gradient(90deg, ${color}90, ${color})`, borderRadius: height, transition: "width 1s ease", boxShadow: `0 0 8px ${color}60` }} />
      </div>
    </div>
  );
}

function DashboardTab({ chapters, meta, setMeta, subjects, overallProgress, revisedCount, totalChapters, strongCount, todayRevised, dueToday, emergencyMode, setTab, notify }) {
  const weakChapters = chapters.filter(c => ["Weak","Critical","Forgotten"].includes(c.status));
  const overdueChapters = chapters.filter(c => c.nextRevision < getDayKey() && c.revisionCount > 0).sort((a,b) => a.nextRevision.localeCompare(b.nextRevision));
  const subjectStats = Object.entries(subjects).map(([name, data]) => {
    const chs = data.chapters.map(ch => chapters.find(c => c.id === ch.id)).filter(Boolean);
    const done = chs.filter(c => c.revisionCount > 0).length;
    return { name, done, total: chs.length, pct: Math.round(done/chs.length*100), color: data.color };
  });
  const todayGoalPct = Math.min(100, Math.round(todayRevised / meta.dailyGoal * 100));
  const examReadiness = Math.round((strongCount * 0.5 + revisedCount * 0.3 + (totalChapters - weakChapters.length) * 0.2) / totalChapters * 100);

  const aiSuggestions = (() => {
    const overdue = overdueChapters.slice(0,2);
    const weak = weakChapters.filter(c => !overdue.find(o => o.id === c.id)).slice(0,2);
    const notDone = chapters.filter(c => c.revisionCount === 0).slice(0,1);
    return [...overdue, ...weak, ...notDone].slice(0,4);
  })();

  return (
    <div>
      {emergencyMode && (
        <div style={{ background: "linear-gradient(135deg, rgba(220,38,38,0.2), rgba(239,68,68,0.1))", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 16, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>🚨</span>
          <div>
            <div style={{ fontWeight: 700, color: "#f87171", fontSize: 15 }}>Emergency Exam Mode Active</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>Focus only on Critical & Weak chapters. All other chapters deprioritized. Exam in {Math.round((new Date(meta.examDate) - new Date()) / 86400000)} days.</div>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 28 }}>
        <StatCard label="Overall Progress" value={`${overallProgress}%`} sub={`${revisedCount}/${totalChapters} chapters`} color="#818cf8" glow />
        <StatCard label="Today's Revisions" value={todayRevised} sub={`Goal: ${meta.dailyGoal}`} color="#10b981" glow />
        <StatCard label="Due Today" value={dueToday} sub="spaced repetition" color={dueToday > 0 ? "#f59e0b" : "#10b981"} glow />
        <StatCard label="Strong Chapters" value={strongCount} sub={`of ${totalChapters} total`} color="#a78bfa" glow />
        <StatCard label="Exam Readiness" value={`${examReadiness}%`} sub="estimated" color={examReadiness > 70 ? "#10b981" : examReadiness > 40 ? "#f59e0b" : "#ef4444"} glow />
        <StatCard label="Study Streak" value={`${meta.streak}🔥`} sub="consecutive days" color="#f97316" glow />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Today's Goal */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>Today's Mission</h3>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: todayGoalPct >= 100 ? "#10b981" : "#818cf8" }}>{todayRevised}/{meta.dailyGoal}</div>
          </div>
          <GlowProgress value={todayGoalPct} color={todayGoalPct >= 100 ? "#10b981" : "#8b5cf6"} height={12} />
          <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[3,5,8,10].map(g => (
              <button key={g} onClick={() => { setMeta(m => ({...m, dailyGoal: g})); notify(`Daily goal set to ${g} chapters`); }} style={{ background: meta.dailyGoal === g ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.03)", border: `1px solid ${meta.dailyGoal === g ? "#8b5cf6" : "rgba(255,255,255,0.07)"}`, borderRadius: 8, padding: "4px 12px", fontSize: 12, color: meta.dailyGoal === g ? "#c4b5fd" : "#64748b", cursor: "pointer", fontWeight: 600 }}>
                {g}/day
              </button>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#e2e8f0", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 6, padding: "2px 6px", fontSize: 10, fontWeight: 700, color: "#fff" }}>AI</span>
            Revise These Next
          </h3>
          {aiSuggestions.length === 0 ? (
            <div style={{ color: "#10b981", fontSize: 14, fontWeight: 600 }}>🎉 You're all caught up!</div>
          ) : aiSuggestions.map(ch => (
            <div key={ch.id} onClick={() => { setTab("Chapters"); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: subjects[ch.subject]?.color || "#64748b", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Ch.{ch.num} {ch.name}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{ch.subject}</div>
              </div>
              <div style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: STATUS_CONFIG[ch.status]?.bg, color: STATUS_CONFIG[ch.status]?.color, fontWeight: 700, flexShrink: 0 }}>{ch.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Progress */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24, marginBottom: 24 }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700 }}>Subject Completion</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {subjectStats.map(s => (
            <div key={s.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                <span style={{ fontWeight: 600, color: "#e2e8f0" }}>{s.name}</span>
                <span style={{ color: s.color, fontWeight: 700 }}>{s.done}/{s.total}</span>
              </div>
              <GlowProgress value={s.pct} color={s.color} height={6} />
            </div>
          ))}
        </div>
      </div>

      {/* Weak chapters alert */}
      {weakChapters.length > 0 && (
        <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 20, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#f87171", display: "flex", alignItems: "center", gap: 8 }}>⚠️ Chapters Needing Attention ({weakChapters.length})</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {weakChapters.map(ch => (
              <div key={ch.id} style={{ background: STATUS_CONFIG[ch.status]?.bg, border: `1px solid ${STATUS_CONFIG[ch.status]?.color}40`, borderRadius: 8, padding: "4px 10px", fontSize: 12, color: STATUS_CONFIG[ch.status]?.color, fontWeight: 600 }}>
                {ch.subject} Ch.{ch.num}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ChaptersTab({ chapters, setChapters, subjects, subjectFilter, setSubjectFilter, statusFilter, setStatusFilter, selectedChapter, setSelectedChapter, markRevised, notify }) {
  const [editingNotes, setEditingNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState("");

  const filteredChapters = Object.values(chapters).filter(ch => {
    if (subjectFilter !== "All" && ch.subject !== subjectFilter) return false;
    if (statusFilter !== "All" && ch.status !== statusFilter) return false;
    return true;
  });

  const selected = selectedChapter ? chapters[selectedChapter] : null;

  const doRevise = (confidence) => {
    if (!selectedChapter) return;
    const ch = chapters[selectedChapter];
    markRevised(selectedChapter, {
      confidence,
      selfTest: ch.selfTest,
      mcqPractice: ch.mcqPractice,
      writtenPractice: ch.writtenPractice,
      formulaRevision: ch.formulaRevision,
      notes: localNotes || ch.notes,
    });
    notify(`✅ ${ch.name} revised! +20 XP`);
  };

  useEffect(() => {
    if (selected) setLocalNotes(selected.notes || "");
  }, [selectedChapter]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, height: "calc(100vh - 160px)", minHeight: 600 }}>
      {/* Chapter List */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Filters */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#e2e8f0", cursor: "pointer" }}>
            <option value="All">All Subjects</option>
            {Object.keys(subjects).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#e2e8f0", cursor: "pointer" }}>
            <option value="All">All Status</option>
            {Object.keys(STATUS_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#64748b", alignSelf: "center" }}>{filteredChapters.length} chapters</span>
        </div>

        {/* Chapter list */}
        <div style={{ overflow: "auto", flex: 1 }}>
          {Object.entries(subjects).map(([subjName, subjData]) => {
            const subjChapters = filteredChapters.filter(c => c.subject === subjName);
            if (subjChapters.length === 0) return null;
            return (
              <div key={subjName}>
                <div style={{ padding: "10px 20px", fontSize: 11, fontWeight: 700, color: subjData.color, background: `${subjData.glow}`, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {subjName}
                </div>
                {subjChapters.map(ch => {
                  const isDue = ch.nextRevision <= getDayKey() && ch.revisionCount > 0;
                  const isSelected = selectedChapter === ch.id;
                  return (
                    <div key={ch.id} onClick={() => setSelectedChapter(ch.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", cursor: "pointer", background: isSelected ? "rgba(139,92,246,0.12)" : "transparent", borderLeft: isSelected ? "3px solid #8b5cf6" : "3px solid transparent", borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "all 0.15s" }}
                      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${subjData.glow}`, border: `1px solid ${subjData.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: subjData.color, flexShrink: 0 }}>{ch.num}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {ch.name}
                          {ch.partial && <span style={{ fontSize: 10, color: "#f59e0b", marginLeft: 6, background: "rgba(245,158,11,0.15)", borderRadius: 4, padding: "1px 5px" }}>partial</span>}
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 2, alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: STATUS_CONFIG[ch.status]?.color, fontWeight: 600 }}>{ch.status}</span>
                          {ch.revisionCount > 0 && <span style={{ fontSize: 10, color: "#475569" }}>×{ch.revisionCount}</span>}
                          {isDue && <span style={{ fontSize: 10, color: "#f59e0b", fontWeight: 700 }}>DUE</span>}
                        </div>
                      </div>
                      {/* Confidence dots */}
                      <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                        {[0,1,2,3,4].map(i => (
                          <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: i < ch.confidence ? CONFIDENCE_COLORS[ch.confidence-1] : "#1e293b" }} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter Detail Panel */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "auto", display: "flex", flexDirection: "column" }}>
        {!selected ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#475569", gap: 12 }}>
            <div style={{ fontSize: 40 }}>📖</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Select a chapter to review</div>
          </div>
        ) : (
          <div style={{ padding: 24 }}>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: subjects[selected.subject]?.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{selected.subject}</div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: 4 }}>Ch.{selected.num}: {selected.name}</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 6, background: STATUS_CONFIG[selected.status]?.bg, color: STATUS_CONFIG[selected.status]?.color, fontWeight: 700 }}>{selected.status}</span>
                {selected.partial && <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 6, background: "rgba(245,158,11,0.15)", color: "#f59e0b", fontWeight: 700 }}>Partial</span>}
                {selected.revisionCount > 0 && <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 6, background: "rgba(99,102,241,0.15)", color: "#818cf8", fontWeight: 700 }}>×{selected.revisionCount} revised</span>}
              </div>
            </div>

            {/* SRS Info */}
            {selected.revisionCount > 0 && (
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 14, marginBottom: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>Last Revised</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginTop: 2 }}>{selected.lastRevised}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>Next Revision</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: selected.nextRevision <= getDayKey() ? "#f59e0b" : "#10b981", marginTop: 2 }}>{selected.nextRevision}</div>
                </div>
              </div>
            )}

            {/* Confidence Selector */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 10 }}>CONFIDENCE LEVEL</div>
              <div style={{ display: "flex", gap: 6 }}>
                {["None","Low","Fair","Good","Strong"].map((label, i) => (
                  <button key={i} onClick={() => markRevised(selected.id, { ...selected, confidence: i+1 })} style={{ flex: 1, padding: "8px 4px", border: `1px solid ${selected.confidence === i+1 ? CONFIDENCE_COLORS[i] : "rgba(255,255,255,0.08)"}`, borderRadius: 8, background: selected.confidence === i+1 ? `${CONFIDENCE_COLORS[i]}20` : "rgba(255,255,255,0.03)", cursor: "pointer", fontSize: 11, color: selected.confidence === i+1 ? CONFIDENCE_COLORS[i] : "#64748b", fontWeight: selected.confidence === i+1 ? 700 : 500, transition: "all 0.15s" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Practice Checklist */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 10 }}>ACTIVE RECALL CHECKLIST</div>
              {[["selfTest","Self-Test Done"],["mcqPractice","MCQ Practice"],["writtenPractice","Written Practice"],["formulaRevision","Formula Revision"]].map(([key, label]) => (
                <label key={key} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.04)" }} onClick={() => {
                  const updatedData = { ...selected, [key]: !selected[key] };
                  setChapters(prev => ({ ...prev, [selectedChapter]: updatedData }));
                }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${selected[key] ? "#8b5cf6" : "#334155"}`, background: selected[key] ? "#8b5cf6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                    {selected[key] && <span style={{ color: "#fff", fontSize: 12, lineHeight: 1 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 13, color: selected[key] ? "#e2e8f0" : "#64748b", fontWeight: selected[key] ? 600 : 400 }}>{label}</span>
                </label>
              ))}
            </div>

            {/* Notes */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginBottom: 8 }}>QUICK NOTES / MISTAKES</div>
              <textarea value={localNotes} onChange={e => setLocalNotes(e.target.value)} placeholder="Key formulas, mistakes, mnemonics..." rows={3} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 10, fontSize: 12, color: "#e2e8f0", resize: "none", fontFamily: "inherit", outline: "none" }} />
            </div>

            {/* Mark as Revised buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button onClick={() => doRevise(3)} style={{ padding: "12px 0", background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", transition: "opacity 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                ✅ Mark Revised
              </button>
              <button onClick={() => doRevise(1)} style={{ padding: "12px 0", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "#f59e0b", cursor: "pointer" }}>
                ⚠️ Mark Weak
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AnalyticsTab({ chapters, subjects, meta }) {
  const subjectData = Object.entries(subjects).map(([name, data]) => {
    const chs = data.chapters.map(ch => chapters.find(c => c.id === ch.id)).filter(Boolean);
    const done = chs.filter(c => c.revisionCount > 0).length;
    const strong = chs.filter(c => c.status === "Strong").length;
    const weak = chs.filter(c => ["Weak","Critical","Forgotten"].includes(c.status)).length;
    const avgConf = chs.filter(c=>c.confidence>0).reduce((a,b)=>a+b.confidence,0)/Math.max(1,chs.filter(c=>c.confidence>0).length);
    return { name, done, total: chs.length, strong, weak, avgConf: Math.round(avgConf*10)/10, color: data.color, pct: Math.round(done/chs.length*100) };
  });

  const statusDist = Object.keys(STATUS_CONFIG).map(s => ({ status: s, count: chapters.filter(c => c.status === s).length, color: STATUS_CONFIG[s].color })).filter(s => s.count > 0);
  const mostNeglected = chapters.filter(c => c.revisionCount === 0).sort((a,b)=>a.subject.localeCompare(b.subject)).slice(0,8);
  const examReadiness = Math.round(
    (chapters.filter(c=>c.status==="Strong").length * 0.5 +
     chapters.filter(c=>c.revisionCount>0).length * 0.3 +
     (chapters.length - chapters.filter(c=>["Weak","Critical","Forgotten"].includes(c.status)).length) * 0.2) / chapters.length * 100
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Exam Readiness Big Number */}
      <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 20, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "#818cf8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Predicted Exam Readiness</div>
        <div style={{ fontSize: 72, fontFamily: "'Syne',sans-serif", fontWeight: 800, background: `linear-gradient(135deg, ${examReadiness > 70 ? "#10b981,#34d399" : examReadiness > 40 ? "#f59e0b,#fbbf24" : "#ef4444,#f87171"})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {examReadiness}%
        </div>
        <div style={{ fontSize: 14, color: "#64748b", marginTop: 8 }}>
          {examReadiness > 70 ? "You're on track! Keep the momentum." : examReadiness > 40 ? "Good progress — double down on weak chapters." : "Critical phase — prioritize revision immediately!"}
        </div>
      </div>

      {/* Subject bars */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700 }}>Subject-wise Retention Overview</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {subjectData.map(s => (
            <div key={s.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontWeight: 600, color: "#e2e8f0" }}>{s.name}</span>
                  <span style={{ fontSize: 11, color: "#10b981" }}>💪 {s.strong} strong</span>
                  {s.weak > 0 && <span style={{ fontSize: 11, color: "#ef4444" }}>⚠ {s.weak} weak</span>}
                </div>
                <span style={{ color: s.color, fontWeight: 700 }}>{s.pct}%</span>
              </div>
              <div style={{ height: 10, background: "#1e293b", borderRadius: 10, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", height: "100%", width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}80, ${s.color})`, borderRadius: 10, boxShadow: `0 0 10px ${s.color}60`, transition: "width 1s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 4, fontSize: 11, color: "#475569" }}>
                <span>Avg confidence: {s.avgConf}/5</span>
                <span>{s.done}/{s.total} revised</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Status Distribution */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Status Distribution</h3>
          {statusDist.map(s => (
            <div key={s.status} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13, color: "#94a3b8" }}>{s.status}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.count}</span>
              <div style={{ width: 60, height: 4, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round(s.count/chapters.length*100)}%`, background: s.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Most neglected */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#f87171" }}>Most Neglected Chapters</h3>
          {mostNeglected.length === 0 ? (
            <div style={{ color: "#10b981", fontSize: 14, fontWeight: 600 }}>🎉 All chapters revised at least once!</div>
          ) : mostNeglected.map(ch => (
            <div key={ch.id} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: subjects[ch.subject]?.color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.subject} — Ch.{ch.num} {ch.name}</span>
              <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 700 }}>0×</span>
            </div>
          ))}
        </div>
      </div>

      {/* Study Calendar heatmap simulation */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Study Consistency (Last 30 Days)</h3>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {Array.from({length:30},(_,i)=>{
            const d = new Date(); d.setDate(d.getDate()-29+i);
            const key = getDayKey(d);
            const isStudied = meta.studyDays?.includes(key);
            const isToday = key === getDayKey();
            return (
              <div key={i} title={key} style={{ width: 20, height: 20, borderRadius: 4, background: isStudied ? "#7c3aed" : "#1e293b", border: isToday ? "2px solid #8b5cf6" : "none", boxShadow: isStudied ? "0 0 8px #7c3aed60" : "none", transition: "all 0.2s" }} />
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 12, color: "#64748b", alignItems: "center" }}>
          <span style={{ display: "flex", gap: 4, alignItems: "center" }}><span style={{ width: 12, height: 12, borderRadius: 2, background: "#7c3aed", display: "inline-block" }} /> Studied</span>
          <span style={{ display: "flex", gap: 4, alignItems: "center" }}><span style={{ width: 12, height: 12, borderRadius: 2, background: "#1e293b", border: "1px solid #334155", display: "inline-block" }} /> Not studied</span>
          <span style={{ marginLeft: "auto" }}>Total: {meta.studyDays?.length || 0} days</span>
        </div>
      </div>
    </div>
  );
}

function PlannerTab({ chapters, subjects, meta, setMeta, notify }) {
  const [planMode, setPlanMode] = useState("daily");
  const today = getDayKey();

  const dueToday = chapters.filter(c => c.nextRevision <= today && c.revisionCount > 0).sort((a,b) => a.nextRevision.localeCompare(b.nextRevision));
  const notRevised = chapters.filter(c => c.revisionCount === 0);
  const weakChapters = chapters.filter(c => ["Weak","Critical"].includes(c.status));

  const crashPlan = (() => {
    const total = 7;
    const perDay = Math.ceil(chapters.length / total);
    const plan = [];
    const sorted = [...chapters].sort((a,b) => {
      if (a.status === "Critical" && b.status !== "Critical") return -1;
      if (b.status === "Critical" && a.status !== "Critical") return 1;
      if (a.status === "Weak" && b.status !== "Weak") return -1;
      return a.revisionCount - b.revisionCount;
    });
    for (let i = 0; i < total; i++) {
      const d = new Date(); d.setDate(d.getDate() + i);
      const dayChapters = sorted.slice(i * perDay, (i+1) * perDay);
      plan.push({ date: getDayKey(d), chapters: dayChapters });
    }
    return plan;
  })();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Mode selector */}
      <div style={{ display: "flex", gap: 8 }}>
        {[["daily","📅 Daily Plan"],["crash","⚡ 7-Day Crash Plan"],["weak","🔥 Weak Recovery"]].map(([mode, label]) => (
          <button key={mode} onClick={() => setPlanMode(mode)} style={{ padding: "10px 20px", border: `1px solid ${planMode===mode ? "#8b5cf6" : "rgba(255,255,255,0.08)"}`, borderRadius: 10, background: planMode===mode ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.03)", cursor: "pointer", fontSize: 13, fontWeight: planMode===mode ? 700 : 500, color: planMode===mode ? "#c4b5fd" : "#64748b", transition: "all 0.2s" }}>
            {label}
          </button>
        ))}
      </div>

      {planMode === "daily" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#f59e0b" }}>⏰ Due for Revision Today ({dueToday.length})</h3>
            {dueToday.length === 0 ? <div style={{ color: "#10b981", fontSize: 13 }}>✅ Nothing due! You're ahead.</div> : dueToday.map(ch => (
              <div key={ch.id} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: subjects[ch.subject]?.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>Ch.{ch.num} {ch.name}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{ch.subject} · Due: {ch.nextRevision}</div>
                </div>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: STATUS_CONFIG[ch.status]?.bg, color: STATUS_CONFIG[ch.status]?.color, fontWeight: 700 }}>{ch.status}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#ef4444" }}>📚 Never Revised ({notRevised.length})</h3>
            {notRevised.length === 0 ? <div style={{ color: "#10b981", fontSize: 13 }}>🎉 All chapters revised!</div> : notRevised.slice(0,10).map(ch => (
              <div key={ch.id} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: subjects[ch.subject]?.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>Ch.{ch.num} {ch.name}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{ch.subject}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {planMode === "crash" && (
        <div>
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 16, padding: "14px 20px", marginBottom: 20, fontSize: 13, color: "#fca5a5" }}>
            ⚡ 7-Day Crash Plan — prioritizes Critical &gt; Weak &gt; Not Revised chapters. Estimated ~{Math.ceil(chapters.length/7)} chapters/day.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {crashPlan.map((day, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: i===0?"linear-gradient(135deg,#7c3aed,#8b5cf6)":"rgba(255,255,255,0.06)", display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:i===0?"#fff":"#64748b" }}>{i+1}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>Day {i+1} — {day.date}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{day.chapters.length} chapters</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {day.chapters.map(ch => (
                    <span key={ch.id} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 6, background: `${subjects[ch.subject]?.glow || "rgba(255,255,255,0.06)"}`, border: `1px solid ${subjects[ch.subject]?.color || "#334155"}30`, color: subjects[ch.subject]?.color || "#64748b", fontWeight: 600 }}>
                      {ch.subject.split(" ")[0]} Ch.{ch.num}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {planMode === "weak" && (
        <div>
          <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 16, padding: "14px 20px", marginBottom: 20, fontSize: 13, color: "#fde68a" }}>
            🔥 Weak Subject Recovery — focus exclusively on Weak, Critical, and Forgotten chapters until they reach Strong status.
          </div>
          {weakChapters.length === 0 ? (
            <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 16, padding: 24, textAlign: "center", fontSize: 16, fontWeight: 700, color: "#10b981" }}>
              🎉 No weak chapters! All good.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {weakChapters.map(ch => (
                <div key={ch.id} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${STATUS_CONFIG[ch.status]?.color}30`, borderRadius: 16, padding: 18 }}>
                  <div style={{ fontSize: 11, color: subjects[ch.subject]?.color, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>{ch.subject}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>Ch.{ch.num}: {ch.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: STATUS_CONFIG[ch.status]?.color, fontWeight: 700 }}>{ch.status}</span>
                    <span style={{ color: "#64748b" }}>×{ch.revisionCount} revised</span>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <GlowProgress value={ch.confidence * 20} color={STATUS_CONFIG[ch.status]?.color} height={4} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AchieveTab({ meta, chapters }) {
  const xpToNext = (meta.level * meta.level * 100);
  const xpProgress = Math.round((meta.xp % xpToNext) / xpToNext * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Level Card */}
      <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(139,92,246,0.15))", border: "1px solid rgba(139,92,246,0.4)", borderRadius: 24, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>⚔️</div>
        <div style={{ fontSize: 13, color: "#a78bfa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Level {meta.level} Scholar</div>
        <div style={{ fontSize: 48, fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#f1f5f9", margin: "8px 0" }}>{meta.xp.toLocaleString()} XP</div>
        <div style={{ maxWidth: 300, margin: "0 auto" }}>
          <GlowProgress value={xpProgress} color="#a78bfa" height={10} />
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>{meta.xp % xpToNext} / {xpToNext} XP to Level {meta.level+1}</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
        <StatCard label="Study Streak" value={`${meta.streak}🔥`} color="#f97316" />
        <StatCard label="Total Study Days" value={meta.studyDays?.length || 0} color="#818cf8" />
        <StatCard label="Pomodoros Done" value={meta.totalPomodoros} color="#10b981" />
        <StatCard label="Badges Earned" value={`${meta.earnedBadges.length}/${BADGES.length}`} color="#f59e0b" />
      </div>

      {/* Badges */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700 }}>Achievement Badges</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {BADGES.map(badge => {
            const earned = meta.earnedBadges.includes(badge.id);
            return (
              <div key={badge.id} style={{ background: earned ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.02)", border: `1px solid ${earned ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center", transition: "all 0.2s", opacity: earned ? 1 : 0.4 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{earned ? badge.icon : "🔒"}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: earned ? "#e2e8f0" : "#64748b" }}>{badge.name}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{badge.desc}</div>
                  <div style={{ fontSize: 11, color: "#a78bfa", marginTop: 2, fontWeight: 600 }}>+{badge.xp} XP</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FocusTab({ pomState, setPomState, meta }) {
  const mins = Math.floor(pomState.seconds / 60).toString().padStart(2,'0');
  const secs = (pomState.seconds % 60).toString().padStart(2,'0');
  const totalSecs = pomState.mode === "focus" ? 25*60 : 5*60;
  const progress = ((totalSecs - pomState.seconds) / totalSecs) * 100;
  const circumference = 2 * Math.PI * 90;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, paddingTop: 20 }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: "0 0 8px", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, background: "linear-gradient(135deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Focus Mode</h2>
        <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>Pomodoro Technique — 25 min focus, 5 min break</p>
      </div>

      {/* Timer circle */}
      <div style={{ position: "relative", width: 220, height: 220 }}>
        <svg width={220} height={220} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={110} cy={110} r={90} fill="none" stroke="#1e293b" strokeWidth={8} />
          <circle cx={110} cy={110} r={90} fill="none" stroke={pomState.mode === "focus" ? "#8b5cf6" : "#10b981"} strokeWidth={8} strokeDasharray={circumference} strokeDashoffset={circumference - (progress/100)*circumference} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease", filter: `drop-shadow(0 0 12px ${pomState.mode === "focus" ? "#8b5cf6" : "#10b981"})` }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 48, fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-2px" }}>{mins}:{secs}</div>
          <div style={{ fontSize: 13, color: pomState.mode === "focus" ? "#a78bfa" : "#34d399", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{pomState.mode === "focus" ? "Focus" : "Break"}</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => setPomState(p => ({...p, active: !p.active}))} style={{ padding: "14px 36px", background: pomState.active ? "rgba(239,68,68,0.2)" : "linear-gradient(135deg, #7c3aed, #8b5cf6)", border: pomState.active ? "1px solid rgba(239,68,68,0.4)" : "none", borderRadius: 14, fontSize: 16, fontWeight: 700, color: pomState.active ? "#f87171" : "#fff", cursor: "pointer", transition: "all 0.2s" }}>
          {pomState.active ? "⏸ Pause" : "▶ Start"}
        </button>
        <button onClick={() => setPomState(p => ({...p, active: false, seconds: p.mode === "focus" ? 25*60 : 5*60}))} style={{ padding: "14px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, fontSize: 16, color: "#64748b", cursor: "pointer" }}>
          ↺ Reset
        </button>
      </div>

      {/* Mode selector */}
      <div style={{ display: "flex", gap: 8 }}>
        {[["focus", "🧠 Focus", 25*60], ["break", "☕ Break", 5*60]].map(([mode, label, secs]) => (
          <button key={mode} onClick={() => setPomState(p => ({...p, mode, active: false, seconds: secs}))} style={{ padding: "8px 20px", border: `1px solid ${pomState.mode===mode?"#8b5cf6":"rgba(255,255,255,0.08)"}`, borderRadius: 10, background: pomState.mode===mode?"rgba(139,92,246,0.2)":"rgba(255,255,255,0.03)", cursor:"pointer", fontSize:13, fontWeight:pomState.mode===mode?700:500, color:pomState.mode===mode?"#c4b5fd":"#64748b" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#a78bfa" }}>{pomState.count}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>Today's Sessions</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#10b981" }}>{meta.totalPomodoros}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>Total Pomodoros</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#f59e0b" }}>{Math.round(meta.totalPomodoros * 25 / 60)}h</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>Total Focus Hours</div>
        </div>
      </div>

      {/* Ambient tips */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "16px 20px", maxWidth: 480, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
          💡 <strong style={{ color: "#94a3b8" }}>Pro tip:</strong> During a Pomodoro, focus on ONE chapter only. Close all distractions. After 4 Pomodoros, take a 15-minute long break.
        </div>
      </div>
    </div>
  );
}
