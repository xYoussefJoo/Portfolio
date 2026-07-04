import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, X, Check, Copy, ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

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
    <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <ScrollReveal variant="fade-in-up" className="space-y-4 max-w-xl">
          <span className="text-sm font-mono text-stone-900 dark:text-stone-100 bg-white/20 dark:bg-white/10 px-3 py-1 rounded-md inline-block border border-white/10">
            CONTACT
          </span>
          <h3 className="text-4xl md:text-5xl font-light tracking-tight font-serif text-stone-950 dark:text-white">
            Let's start a <span className="font-semibold italic">conversation</span>
          </h3>
          <p className="text-stone-850 dark:text-stone-300">
            Have a project in mind, need software engineering assistance, or just want to chat? Send a message and let's create something together.
          </p>
        </ScrollReveal>

        {/* Form and Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Panel (Left) */}
          <ScrollReveal variant="slide-in-left" className="lg:col-span-5 space-y-6 w-full">
            <div className="bg-white/20 dark:bg-white/5 border border-white/25 dark:border-white/10 backdrop-blur-md rounded-3xl p-8 space-y-8">
              <h4 className="text-xl font-semibold text-stone-950 dark:text-white">Contact Details</h4>
              
              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-5 h-5 text-stone-900 dark:text-stone-100" />, title: "Email Me", value: "xyousefjoo@gmail.com", href: "mailto:xyousefjoo@gmail.com" },
                  { icon: <Phone className="w-5 h-5 text-stone-900 dark:text-stone-100" />, title: "Call Me", value: "01223466362", href: "tel:01223466362" },
                  { icon: <MapPin className="w-5 h-5 text-stone-900 dark:text-stone-100" />, title: "Location", value: "Al Minya, Egypt", href: null },
                ].map((detail, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/35 dark:bg-white/10 flex items-center justify-center flex-shrink-0 shadow-sm border border-white/20 dark:border-white/10">
                      {detail.icon}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-stone-800 dark:text-stone-300 block uppercase tracking-wider">{detail.title}</span>
                      {detail.href ? (
                        <a href={detail.href} className="text-stone-950 dark:text-white font-medium hover:underline text-sm md:text-base">
                          {detail.value}
                        </a>
                      ) : (
                        <span className="text-stone-950 dark:text-white font-medium text-sm md:text-base">{detail.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Banner */}
            <div className="bg-stone-900 dark:bg-stone-950 text-white rounded-3xl p-8 flex gap-4 shadow-xl shadow-stone-950/10 border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h5 className="font-semibold text-lg text-stone-100">Quick Upwork Quote?</h5>
                <p className="text-stone-300 text-xs leading-relaxed font-normal">
                  Describe your requirements and budget and I will compile an initial estimate for your system scope within 24 hours.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Panel (Right) */}
          <ScrollReveal variant="slide-in-right" delay={150} className="lg:col-span-7 w-full">
            <div className="bg-white/20 dark:bg-white/5 border border-white/25 dark:border-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/25 dark:bg-white/5 border border-white/25 dark:border-white/10 text-stone-950 dark:text-white placeholder-stone-700/60 dark:placeholder-stone-300/40 focus:outline-none focus:bg-white/40 dark:focus:bg-white/10 focus:border-stone-900/40 text-sm transition-all shadow-inner"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/25 dark:bg-white/5 border border-white/25 dark:border-white/10 text-stone-950 dark:text-white placeholder-stone-700/60 dark:placeholder-stone-300/40 focus:outline-none focus:bg-white/40 dark:focus:bg-white/10 focus:border-stone-900/40 text-sm transition-all shadow-inner"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/25 dark:bg-white/5 border border-white/25 dark:border-white/10 text-stone-950 dark:text-white placeholder-stone-700/60 dark:placeholder-stone-300/40 focus:outline-none focus:bg-white/40 dark:focus:bg-white/10 focus:border-stone-900/40 text-sm transition-all shadow-inner"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-200">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/25 dark:bg-white/5 border border-white/25 dark:border-white/10 text-stone-950 dark:text-white placeholder-stone-700/60 dark:placeholder-stone-300/40 focus:outline-none focus:bg-white/40 dark:focus:bg-white/10 focus:border-stone-900/40 text-sm transition-all shadow-inner resize-none"
                    placeholder="Tell me about your project or system specifications..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold tracking-wider text-xs uppercase flex items-center justify-center gap-2 border shadow-lg transition-all duration-350 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-white hover:bg-stone-850 dark:hover:bg-stone-200 hover:shadow-stone-900/20 active:scale-[0.99]"
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in">
          <div className="bg-[#B2A2A1] dark:bg-[#1E1B1A] border border-white/25 dark:border-white/10 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 animate-scale-in relative text-stone-900 dark:text-stone-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/15 dark:hover:bg-white/5 text-stone-900 dark:text-stone-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <h4 className="text-2xl font-serif font-light text-stone-950 dark:text-white">
                How would you like to <span className="font-semibold italic">send</span>?
              </h4>
              <p className="text-sm text-stone-850 dark:text-stone-300">
                Choose your preferred email client to submit this message to <span className="font-semibold">xyousefjoo@gmail.com</span>:
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
                className="flex items-center gap-4 p-4 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-850 dark:hover:bg-stone-200 transition-all shadow-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/15 dark:bg-stone-900/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white dark:text-stone-900" />
                </div>
                <div className="text-left flex-grow">
                  <span className="font-semibold text-sm block">Gmail (Web Browser)</span>
                  <span className="text-xs opacity-80 block font-normal">Opens Google Mail in a new tab</span>
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
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/25 dark:bg-white/5 border border-white/20 dark:border-white/10 text-stone-950 dark:text-white hover:bg-white/40 dark:hover:bg-white/10 transition-all shadow-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left flex-grow">
                  <span className="font-semibold text-sm block">Default Mail Client</span>
                  <span className="text-xs text-stone-800 dark:text-stone-400 block font-normal">Opens Outlook, Mail, etc.</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* Option 3: Copy to clipboard */}
              <button
                onClick={handleCopyToClipboard}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/25 dark:bg-white/5 border border-white/20 dark:border-white/10 text-stone-950 dark:text-white hover:bg-white/40 dark:hover:bg-white/10 transition-all shadow-sm text-left w-full group"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center">
                  {copied ? <Check className="w-5 h-5 text-green-600 dark:text-green-400" /> : <Copy className="w-5 h-5" />}
                </div>
                <div className="text-left flex-grow">
                  <span className="font-semibold text-sm block">{copied ? "Copied!" : "Copy Details"}</span>
                  <span className="text-xs text-stone-800 dark:text-stone-400 block font-normal">Copies mail contents to clipboard</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
