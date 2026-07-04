import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, X, Check, Copy, ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCopyToClipboard = () => {
    const emailBody = `Sender Name: ${formState.name}\nSender Email: ${formState.email}\n\nMessage:\n${formState.message}`;
    navigator.clipboard.writeText(emailBody).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 relative overflow-hidden bg-grid-cyber">
      {/* Decorative glows */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8A60F1]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#8A60F1] uppercase bg-[#8A60F1]/10 px-3 py-1.5 rounded-md border border-[#8A60F1]/20 inline-block shadow-[0_0_15px_rgba(138,96,241,0.1)]">
            06 // INITIATE
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Let's start a <br />
            <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-400 bg-clip-text text-transparent">conversation</span>
          </h2>
          <p className="text-stone-300 font-light leading-relaxed">
            Have a project in mind, need software engineering assistance, or just want to chat? Send a message and let's create something together.
          </p>
        </ScrollReveal>

        {/* Form and Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Panel (Left) */}
          <ScrollReveal variant="slide-in-left" className="lg:col-span-5 space-y-6 w-full">
            <div className="glass-card rounded-3xl p-8 space-y-8 hover:border-[#8A60F1]/30 transition-colors duration-500 shadow-[0_0_20px_rgba(138,96,241,0.02)]">
              <h4 className="text-xl font-bold text-white tracking-wide">Contact Details</h4>
              
              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-5 h-5 text-[#8A60F1]" />, title: "Email Me", value: "xyousefjoo@gmail.com", href: "mailto:xyousefjoo@gmail.com" },
                  { icon: <Phone className="w-5 h-5 text-[#8A60F1]" />, title: "Call Me", value: "01223466362", href: "tel:01223466362" },
                  { icon: <MapPin className="w-5 h-5 text-[#8A60F1]" />, title: "Location", value: "Al Minya, Egypt", href: null },
                ].map((detail, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 shadow-sm border border-white/10 group-hover:bg-[#8A60F1]/10 group-hover:border-[#8A60F1]/20 transition-all duration-300">
                      {detail.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#8A60F1] block uppercase tracking-widest">{detail.title}</span>
                      {detail.href ? (
                        <a href={detail.href} className="text-white font-medium hover:text-[#8A60F1] transition-colors text-sm md:text-base">
                          {detail.value}
                        </a>
                      ) : (
                        <span className="text-white font-medium text-sm md:text-base">{detail.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Banner */}
            <div className="glass-card text-white rounded-3xl p-8 flex gap-4 border-[#8A60F1]/25 hover:border-[#8A60F1]/50 shadow-[0_0_20px_rgba(138,96,241,0.05)] transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-[#8A60F1]/10 flex items-center justify-center flex-shrink-0 border border-[#8A60F1]/20">
                <MessageSquare className="w-6 h-6 text-[#8A60F1]" />
              </div>
              <div className="space-y-2">
                <h5 className="font-bold text-lg text-white">Quick Upwork Quote?</h5>
                <p className="text-stone-300 text-xs leading-relaxed font-light">
                  Describe your requirements and budget and I will compile an initial estimate for your system scope within 24 hours.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Panel (Right) */}
          <ScrollReveal variant="slide-in-right" delay={150} className="lg:col-span-7 w-full">
            <div className="glass-card rounded-3xl p-8 md:p-10 hover:border-[#8A60F1]/30 transition-colors duration-500 shadow-[0_0_20px_rgba(138,96,241,0.02)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[#8A60F1]">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:bg-[#8A60F1]/5 focus:border-[#8A60F1] focus:shadow-[0_0_15px_rgba(138,96,241,0.15)] text-sm transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[#8A60F1]">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:bg-[#8A60F1]/5 focus:border-[#8A60F1] focus:shadow-[0_0_15px_rgba(138,96,241,0.15)] text-sm transition-all"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-[#8A60F1]">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:bg-[#8A60F1]/5 focus:border-[#8A60F1] focus:shadow-[0_0_15px_rgba(138,96,241,0.15)] text-sm transition-all"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-[#8A60F1]">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-stone-500 focus:outline-none focus:bg-[#8A60F1]/5 focus:border-[#8A60F1] focus:shadow-[0_0_15px_rgba(138,96,241,0.15)] text-sm transition-all resize-none"
                    placeholder="Tell me about your project or system specifications..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 border bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 border-[#8A60F1] text-white hover:from-[#7b51e0] hover:to-fuchsia-700 shadow-[0_0_20px_rgba(138,96,241,0.3)] hover:shadow-[0_0_30px_rgba(138,96,241,0.5)] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Sending Method Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 relative text-white"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-white">
                  How would you like to <span className="bg-gradient-to-r from-[#8A60F1] to-fuchsia-400 bg-clip-text text-transparent">submit</span>?
                </h4>
                <p className="text-sm text-stone-300 font-light">
                  Choose your preferred email delivery client to submit this inquiry to <span className="font-semibold text-white">xyousefjoo@gmail.com</span>:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {/* Option 1: Gmail Web */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=xyousefjoo@gmail.com&su=${encodeURIComponent(`[Portfolio Contact] ${formState.subject}`)}&body=${encodeURIComponent(`Sender Name: ${formState.name}\nSender Email: ${formState.email}\n\nMessage:\n${formState.message}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#8A60F1] to-fuchsia-600 text-white hover:shadow-[0_0_15px_rgba(138,96,241,0.4)] transition-all shadow-md group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-grow">
                    <span className="font-bold text-sm block">Gmail (Web Browser)</span>
                    <span className="text-[10px] opacity-80 block font-light">Opens Google Mail in a new browser tab</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Option 2: Default Mail app */}
                <a
                  href={`mailto:xyousefjoo@gmail.com?subject=${encodeURIComponent(`[Portfolio Contact] ${formState.subject}`)}&body=${encodeURIComponent(`Sender Name: ${formState.name}\nSender Email: ${formState.email}\n\nMessage:\n${formState.message}`)}`}
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all shadow-sm group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#8A60F1]" />
                  </div>
                  <div className="text-left flex-grow">
                    <span className="font-bold text-sm block">Default Mail Client</span>
                    <span className="text-[10px] text-stone-400 block font-light">Opens Outlook, Mail app, Windows Mail</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Option 3: Copy to clipboard */}
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all shadow-sm text-left w-full group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-[#8A60F1]" />}
                  </div>
                  <div className="text-left flex-grow">
                    <span className="font-bold text-sm block">{copied ? "Copied!" : "Copy Details"}</span>
                    <span className="text-[10px] text-stone-400 block font-light">Copies form message string to clipboard</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
