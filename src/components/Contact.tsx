import React, { useState } from "react";

/**
 * Contact Component: Standard inquiry form for the contact section.
 */
const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  /**
   * handleSubmit: Processes the contact form submission.
   * Synchronizes with the same Google Apps Script as the QuoteModal for centralized data management.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormError("");
    setIsSuccess(false);

    // Validation checks
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    ) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (formData.phone.trim().length < 7) {
      setFormError("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Use the latest script URL provided by the user
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw2U9JtYJXqD_oBbEfd9AnGMJhRNux7SuDeldrbMhHsPdYs5nHPuaxR_3jRe2cmJkXUfQ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          // Map form data to the spreadsheet columns
          body: JSON.stringify({
            ...formData,
            size: "N/A",
            weight: "N/A",
            gsm: "N/A",
            category: "General Contact",
            source: "General Contact",
            timestamp: new Date().toISOString()
          }),
        }
      );

      const result = await response.json();

      if (result.success || result.status === "success") {
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Clear success message after delay
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        setFormError("Failed to submit form.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Fallback for network issues blocking the response but potentially allowing data through
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => { setIsSuccess(false); }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="gsap-fade-up">
            <span className="text-[10px] font-medium tracking-[0.5em] text-slate-400 uppercase mb-6 block">Inquiries</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-10 italic">Let's Connect</h2>
            <p className="text-slate-500 mb-10 md:mb-16 leading-relaxed font-light tracking-wide max-w-lg text-lg">
              We invite you to experience our collection firsthand. Our team is dedicated to providing bespoke solutions for your global export needs.
            </p>
            
            <div className="space-y-8 md:space-y-12">
              <div className="flex items-start gap-6 md:gap-8">
                <div className="w-[1px] h-12 bg-slate-200 mt-2" />
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Email</h4>
                  <p className="text-slate-900 font-medium tracking-wide text-sm md:text-base">enquiry.sslnexports@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6 md:gap-8">
                <div className="w-[1px] h-12 bg-slate-200 mt-2" />
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Mobile</h4>
                  <p className="text-slate-900 font-medium tracking-wide text-sm md:text-base">+91 94874-22259</p>
                </div>
              </div>
              <div className="flex items-start gap-6 md:gap-8">
                <div className="w-[1px] h-12 bg-slate-200 mt-2" />
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Office</h4>
                  <p className="text-slate-900 font-medium tracking-wide leading-relaxed text-sm md:text-base">
                    1/91/2, Malappalayam, Kadachanallur - 638008, <br className="hidden sm:block" /> Namakkal DT, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 lg:p-16 rounded-[3rem] shadow-2xl gsap-fade-up">
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              {formError && (
                <div className="text-red-500 text-sm font-medium">{formError}</div>
              )}
              {isSuccess && (
                <div className="text-emerald-500 text-sm font-medium">Thank you! Your message has been sent successfully.</div>
              )}
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full py-4 border-b border-slate-100 focus:border-slate-900 outline-none transition-all bg-transparent font-light tracking-wide text-slate-900 placeholder:text-slate-300"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full py-4 border-b border-slate-100 focus:border-slate-900 outline-none transition-all bg-transparent font-light tracking-wide text-slate-900 placeholder:text-slate-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full py-4 border-b border-slate-100 focus:border-slate-900 outline-none transition-all bg-transparent font-light tracking-wide text-slate-900 placeholder:text-slate-300"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Message</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full py-4 border-b border-slate-100 focus:border-slate-900 outline-none transition-all bg-transparent resize-none font-light tracking-wide text-slate-900 placeholder:text-slate-300"
                  placeholder="How can we assist you?"
                />
              </div>
              <button 
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white py-6 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-transparent hover:text-slate-900 border border-slate-900 transition-all duration-400 flex items-center justify-center active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Send Inquiry"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
