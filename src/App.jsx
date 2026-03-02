import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { ArrowRight, ExternalLink, Send, Menu, X } from "lucide-react";

const SectionHeading = ({ title, subtitle }) => (
  <div className="relative mb-12 md:mb-20">
    <motion.span
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-[10px] font-black tracking-[0.5em] text-[#D46A4C] uppercase block mb-4"
    >
      {subtitle}
    </motion.span>
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase italic leading-none text-[#2D2D2D]">
      {title.split(" ")[0]} <br />
      <span className="text-black/10">{title.split(" ").slice(1).join(" ")}</span>
    </h2>
  </div>
);

const HeroImage = ({ src, index, progress }) => {
  const direction = index % 2 === 0 ? -1 : 1;
  const factor = Math.ceil(index / 2);
  const x = useTransform(progress, [0, 1], [0, direction * (factor * 400)]);
  const y = useTransform(progress, [0, 1], [0, (index % 3 === 0 ? -150 : 150) * factor]);
  const rotate = useTransform(progress, [0, 1], [0, direction * (index * 20)]);
  const scale = useTransform(progress, [0, 0.5], [1, 0.5]);
  const opacity = useTransform(progress, [0, 0.7], [1, 0]);
  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
    >
      <div className="w-[160px] h-[100px] sm:w-[240px] sm:h-[155px] md:w-[500px] md:h-[320px] bg-white rounded-2xl overflow-hidden shadow-2xl border border-black/5">
        <img src={src} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
      </div>
    </motion.div>
  );
};

const FinalBackgroundReveal = ({ src, progress }) => {
  const scale = useTransform(progress, [0, 0.4, 1], [0.2, 0.5, 1.5]);
  const opacity = useTransform(progress, [0.3, 0.8], [0, 1]);
  const blur = useTransform(progress, [0.3, 0.7], ["blur(20px)", "blur(0px)"]);
  const y = useTransform(progress, [0.6, 1], [0, -200]);
  const overlayOpacity = useTransform(progress, [0.8, 1], [0, 0.4]);
  return (
    <motion.div
      style={{ scale, opacity, filter: blur, y }}
      className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
    >
      <div className="relative w-[90vw] h-[55vh] md:w-[70vw] md:h-[80vh] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.2)]">
        <img src={src} className="w-full h-full object-cover" alt="Core Background" />
        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black" />
      </div>
    </motion.div>
  );
};

const TECH_STACK = [
  { name: "React", icon: "react.png" },
  { name: "JavaScript", icon: "Javascript.jpg" },
  { name: "Node.js", icon: "nodejs.jpg" },
  { name: "Express.js", icon: "Expressjs.jpg" },
  { name: "MySQL", icon: "MySql.jpg" },
  { name: "Tailwind CSS", icon: "TailwindCss.jpg" },
  { name: "BootStrap", icon: "bootstrap.png" },
  { name: "Git", icon: "Git.jpg" },
  { name: "GitHub", icon: "GitHub.jpg" },
  { name: "Vercel", icon: "Vercel.jpg" },
];

const PROJECTS = [
  {
    title: "Digital Menu Platform",
    tag: "SaaS",
    url: "https://customerdigitalmenu.experiencecart.net/",
    desc: "QR-based digital ordering system for high-volume restaurants.",
  },
  {
    title: "Online Store Branding Website",
    tag: "E-Commerce",
    url: "https://starhalalmeat.vercel.app/",
    desc: "A production-grade meat delivery platform for branding.",
  },
];

const AboutVisual = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -5]);
  return (
    <div ref={container} className="relative group mx-auto w-full max-w-sm md:max-w-none">
      <div className="absolute -inset-4 border border-black/5 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e0e0e0]">
        <motion.img
          style={{ y, scale: 1.1 }}
          src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800"
          className="w-full h-full object-cover transition-all duration-1000"
          alt="Me"
        />
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      </div>
      <motion.div style={{ rotate }} className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 bg-[#2D2D2D] text-white p-4 md:p-8 shadow-2xl">
        <div className="flex flex-col gap-1">
          <span className="text-[28px] md:text-[40px] font-black italic leading-none text-[#D46A4C]">10+</span>
          <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase leading-tight">Artifacts <br /> Deployed</span>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <motion.div
      ref={container}
      style={{ opacity }}
      className={`relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
    >
      <div className={`lg:col-span-5 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
        <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
          <span className="text-[10px] font-black tracking-[0.5em] text-[#D46A4C] uppercase block mb-4">{project.tag}</span>
          <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 tracking-tighter uppercase italic leading-[0.9] text-[#2D2D2D]">{project.title}</h3>
          <p className="text-[#2D2D2D]/60 mb-8 leading-relaxed text-base md:text-lg max-w-sm">{project.desc}</p>
          <motion.a href={project.url} target="_blank" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 px-8 py-4 bg-[#2D2D2D] text-white rounded-full font-black text-[10px] tracking-[0.3em] uppercase hover:bg-[#D46A4C] transition-colors shadow-xl">
            Launch System <ExternalLink size={14} />
          </motion.a>
        </motion.div>
      </div>
      <div className={`lg:col-span-7 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
        <motion.div style={{ y, scale }}
          className="relative h-[280px] sm:h-[380px] md:h-[550px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-black/5 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group">
          <div className="absolute top-0 w-full h-10 bg-[#FDFBF7] border-b border-black/5 flex items-center px-6 gap-2 z-20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-[#FF5F56] rounded-full" />
              <div className="w-2.5 h-2.5 bg-[#FFBD2E] rounded-full" />
              <div className="w-2.5 h-2.5 bg-[#27C93F] rounded-full" />
            </div>
            <div className="mx-auto bg-black/5 px-4 py-1 rounded-md text-[8px] font-bold text-black/30 tracking-widest uppercase truncate max-w-[60%]">
              {project.url.replace("https://", "")}
            </div>
          </div>
          <div className="w-full h-full pt-10 overflow-hidden">
            <motion.div className="w-full h-full transition-all duration-1000 ease-out" whileHover={{ scale: 1.05 }}>
              <iframe src={project.url} className="w-[200%] h-[200%] origin-top-left scale-50 border-none pointer-events-none" title={project.title} />
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="bg-white p-3 md:p-4 shadow-2xl">
              <p className="text-[10px] font-black uppercase tracking-tighter text-[#2D2D2D]">Project_Status: Deployed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ContactSection = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("idle");
  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formRef.current, "YOUR_PUBLIC_KEY")
      .then(() => setStatus("success"), (error) => { console.log(error.text); setStatus("error"); setTimeout(() => setStatus("idle"), 3000); });
  };
  return (
    <section id="contact" className="py-20 md:py-40 px-4 md:px-8 bg-[#2D2D2D] text-white rounded-[2rem] md:rounded-[4rem] mx-2 md:mx-4 mb-2 md:mb-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8 md:mb-10">
            Ready to start <br /> the <span className="text-[#D46A4C]">Transmission?</span>
          </h2>
          <div className="space-y-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
            <p className="flex items-center gap-4"><span className="w-2 h-2 bg-[#D46A4C] rounded-full flex-shrink-0" />Based in Gurugram, India</p>
            <p className="flex items-center gap-4"><span className="w-2 h-2 bg-white rounded-full flex-shrink-0" />Working worldwide (UTC +5:30)</p>
          </div>
        </motion.div>
        <div className="relative">
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form key="contact-form" ref={formRef} onSubmit={sendEmail}
                exit={{ opacity: 0, y: -20, skewX: 10, filter: "blur(10px)" }} className="space-y-10 md:space-y-12">
                {[
                  { label: "Identification (Name)", name: "user_name", type: "text", placeholder: "J. DOE" },
                  { label: "Transmission Channel (Email)", name: "user_email", type: "email", placeholder: "HELLO@WORLD.COM" },
                ].map((field) => (
                  <div key={field.name} className="group border-b-2 border-white/10 focus-within:border-[#D46A4C] transition-all duration-500 pb-4">
                    <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-50 group-focus-within:opacity-100 group-focus-within:text-[#D46A4C]">{field.label}</label>
                    <input name={field.name} required type={field.type} className="w-full bg-transparent outline-none text-xl md:text-2xl font-bold italic placeholder:text-white/5" placeholder={field.placeholder} />
                  </div>
                ))}
                <div className="group border-b-2 border-white/10 focus-within:border-[#D46A4C] transition-all duration-500 pb-4">
                  <label className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-50 group-focus-within:opacity-100 group-focus-within:text-[#D46A4C]">Message Payload</label>
                  <textarea name="message" required rows="1" className="w-full bg-transparent outline-none text-xl md:text-2xl font-bold italic placeholder:text-white/5 resize-none" placeholder="DESCRIBE THE MISSION..." />
                </div>
                <motion.button disabled={status === "sending"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="relative w-full py-6 md:py-8 bg-white text-[#2D2D2D] font-black text-xs tracking-[0.5em] uppercase overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-white transition-colors duration-300">
                    {status === "sending" ? "Encrypting..." : "Send Transmission"}
                    <Send size={16} className={status === "sending" ? "animate-pulse" : "group-hover:translate-x-2 transition-transform"} />
                  </span>
                  <div className="absolute inset-0 bg-[#D46A4C] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div key="success-message" initial={{ opacity: 0, scale: 0.9, rotateX: -20 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 md:p-12 border-2 border-[#D46A4C] bg-[#D46A4C]/5">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#D46A4C] rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_50px_rgba(214,106,76,0.4)]">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-4">Transmission Received</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Signal logged in the archives. Expect a reply soon.</p>
                <button onClick={() => setStatus("idle")} className="mt-10 md:mt-12 text-[10px] font-black uppercase tracking-widest border-b border-white/20 hover:border-[#D46A4C] transition-colors">
                  Reset Terminal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// ── CRITICAL FIX: Extracted into its own component (no hooks in loops) ──
const TechOrbitItem = ({ tech, index, total, smoothRotation }) => {
  const RADIUS = 420;
  const DEPTH = 380;
  const initialAngle = index * (360 / total);
  const x = useTransform(smoothRotation, (r) => {
    const rad = ((r + initialAngle) * Math.PI) / 180;
    return Math.sin(rad) * RADIUS;
  });
  const z = useTransform(smoothRotation, (r) => {
    const rad = ((r + initialAngle) * Math.PI) / 180;
    return Math.cos(rad) * DEPTH;
  });
  const opacity = useTransform(z, [-DEPTH, -DEPTH * 0.3, DEPTH * 0.3, DEPTH], [0.08, 0.3, 0.7, 1]);
  const scale = useTransform(z, [-DEPTH, DEPTH], [0.5, 1.15]);
  return (
    <motion.div style={{ x, z, opacity, scale, transformStyle: "preserve-3d" }} className="absolute flex flex-col items-center">
      <motion.div
        whileHover={{ scale: 1.45, y: -16 }}
        transition={{ type: "spring", stiffness: 280, damping: 16 }}
        className="w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white rounded-xl md:rounded-3xl shadow-2xl border border-black/5 flex items-center justify-center p-2 md:p-6 cursor-pointer"
      >
        <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
      </motion.div>
      <span className="mt-2 md:mt-4 text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#2D2D2D]">{tech.name}</span>
    </motion.div>
  );
};

/* ───────────── UPDATED TECH STACK (ARC BELT) ───────────── */
const ArcTechBelt = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const rotation = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 0, 360, 360]);
  const smoothRotation = useSpring(rotation, { stiffness: 50, damping: 25, restDelta: 0.001 });
  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-[#FDFBF7]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-[25vw] font-black text-black/[0.02] uppercase italic">Arsenal</h2>
        </div>
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
          {TECH_STACK.map((tech, i) => (
            <TechOrbitItem key={tech.name} tech={tech} index={i} total={TECH_STACK.length} smoothRotation={smoothRotation} />
          ))}
        </div>
        <div className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <span className="text-[10px] font-black opacity-20 uppercase tracking-widest">0°</span>
          <div className="w-24 md:w-40 h-[2px] bg-black/5 relative">
            <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 bg-[#D46A4C] origin-left" />
          </div>
          <span className="text-[10px] font-black opacity-20 uppercase tracking-widest">360°</span>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  const navItems = ["About", "Stack", "Work", "Contact"];

  return (
    <div className="bg-[#FDFBF7] text-[#2D2D2D] selection:bg-[#D46A4C] selection:text-white font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D46A4C]/5 blur-[120px] rounded-full" />
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 w-full z-[100] px-5 md:px-8 py-5 md:py-8 flex justify-between items-center mix-blend-difference">
        <motion.span className="text-sm font-black tracking-tighter text-white">MOHIT.DEV</motion.span>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-all hover:tracking-[0.5em]">{item}</a>
          ))}
        </div>

        {/* Mobile Hamburger — sits outside mix-blend-difference so it stays visible */}
        <div className="md:hidden" style={{ mixBlendMode: "normal" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center bg-[#2D2D2D] text-white rounded-full shadow-lg"
            aria-label="Toggle menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] bg-[#2D2D2D] flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-white/10 text-white rounded-full"
            >
              <X size={18} />
            </button>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-black tracking-tighter text-white/30 mb-4"
            >
              MOHIT.DEV
            </motion.span>

            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, ease: [0.76, 0, 0.24, 1] }}
                className="text-5xl sm:text-6xl font-black tracking-tighter uppercase italic text-white hover:text-[#D46A4C] transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section ref={containerRef} className="h-[400vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-[#FDFBF7]">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-50 text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 md:mb-8 inline-flex items-center gap-3 bg-white border border-black/5 px-4 md:px-6 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping flex-shrink-0" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#2D2D2D]/60">Available for 2026 Projects</span>
            </motion.div>
            <h1 className="text-[18vw] sm:text-[16vw] md:text-[14vw] font-black leading-[0.8] tracking-tighter uppercase italic text-[#2D2D2D]">
              Software <br /> <span className="text-[#D46A4C]">Developer</span>
            </h1>
          </motion.div>
          {[
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
            "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
          ].map((url, i) => (
            <HeroImage key={i} index={i} progress={smoothProgress} src={`${url}?auto=format&fit=crop&q=80&w=1400`} />
          ))}
          <FinalBackgroundReveal progress={smoothProgress} src="/hero_background.jpg" />
          <motion.div style={{ opacity: heroOpacity }} className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-50">
            <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to Unpack</span>
            <div className="w-px h-8 md:h-12 bg-gradient-to-b from-[#2D2D2D] to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ME ── */}
      <section id="about" className="py-24 md:py-40 px-5 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center relative">
        <AboutVisual />
        <div className="flex flex-col justify-center mt-16 md:mt-0">
          <div className="mb-10 md:mb-12 overflow-hidden">
            <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }}
              className="text-[10px] font-black tracking-[0.6em] text-[#D46A4C] uppercase block mb-6">
              // Architect.Core
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] text-[#2D2D2D]">
                Building <br /><span className="opacity-10">The Future.</span>
              </motion.h2>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="space-y-8">
            <p className="text-lg md:text-2xl text-[#2D2D2D] font-medium leading-tight italic border-l-4 border-[#D46A4C] pl-6">
              "I don't just build websites; I engineer digital legacies that balance performance with soul."
            </p>
            <p className="text-[#2D2D2D]/60 leading-relaxed text-base md:text-lg max-w-md">
              Based in India, I specialize in full-stack engineering with a heavy focus on interactive frontend experiences that feel physical.
            </p>
            <motion.button whileHover={{ x: 15 }} className="group flex items-center gap-6 text-black">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-[#D46A4C] group-hover:text-white transition-all duration-300">
                <ArrowRight size={18} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em]">Read the full story</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="stack" className="relative">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-20">
          <SectionHeading title="System Core" subtitle="// The Arsenal" />
        </div>
        <ArcTechBelt />
      </section>

      {/* ── WORK ── */}
      <section id="work" className="py-16 md:py-20 px-5 md:px-8 max-w-7xl mx-auto space-y-32 md:space-y-64">
        <div className="flex flex-col items-center text-center mb-10">
          <SectionHeading title="Selected Artifacts" subtitle="Case Studies" />
        </div>
        {PROJECTS.map((project, i) => <ProjectCard key={i} project={project} index={i} />)}
      </section>

      <ContactSection />

      <footer className="py-16 md:py-20 px-5 md:px-8 text-center bg-[#FDFBF7]">
        <p className="text-[10px] font-black tracking-[0.5em] md:tracking-[0.8em] text-[#2D2D2D]/20 uppercase">
          © 2026 Mohit — Engineering New Frontiers
        </p>
      </footer>
    </div>
  );
}