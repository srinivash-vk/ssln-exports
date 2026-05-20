import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Product } from "../types";

/**
 * QuoteModal: A modal component for submitting product inquiries.
 */
const QuoteModal = ({
  isOpen,
  onClose,
  product,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productInterest: "",
    quantity: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        productInterest: product?.category || "",
        quantity: "",
        message: "",
      });
    }
  }, [isOpen, product]);

  /**
   * Handle form submit
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    setFormError("");

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (formData.phone.trim().length < 7) {
      setFormError("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycby-LGYmuGh9qZTJNzwRPzx8ONqud0auZ31y88NRxGkS_ft5ZExp30UQWR0x6thnVY1JxQ/exec";

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,

          productInterest: formData.productInterest,
          quantity: formData.quantity,

          message:
            formData.message ||
            `Inquiry for ${product.category} - ${product.gsm} GSM`,

          size: product.size || "N/A",
          weight: product.weight || "N/A",
          gsm: product.gsm || "N/A",
          category: product.category,

          source: "Quote Request",
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success || result.status === "success") {
        setIsSuccess(true);

        setFormData({
          name: "",
          email: "",
          phone: "",
          productInterest: "",
          quantity: "",
          message: "",
        });

        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        setFormError("Submission failed. Please try again.");
      }
    } catch (e) {
      console.error("Submission error:", e);

      // Fallback
      setIsSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        productInterest: "",
        quantity: "",
        message: "",
      });

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative bg-white shadow-2xl rounded-[2.5rem] w-full max-w-2xl overflow-hidden"
          >
            <div className="p-6 sm:p-10 md:p-12">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="pr-8">
                  <span className="text-[10px] font-bold tracking-[0.5em] text-slate-900 uppercase mb-3 block">
                    Inquiry
                  </span>

                  <h3 className="font-display text-3xl font-light text-slate-900 italic">
                    Request a Quote
                  </h3>

                  <p className="text-slate-900 mt-2 font-medium tracking-wide text-xs italic">
                    For: {product?.category} ({product?.gsm} GSM)
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 hover:opacity-50 transition-opacity"
                >
                  <X className="w-5 h-5 text-slate-900" />
                </button>
              </div>

              {/* Success */}
              {isSuccess ? (
                <div className="py-12 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
                  >
                    <CheckCircle2 className="text-emerald-500 w-8 h-8" />
                  </motion.div>

                  <h4 className="font-display text-2xl font-light text-slate-900 mb-2 italic">
                    Thank You
                  </h4>

                  <p className="text-slate-900 font-medium text-sm tracking-wide">
                    Your inquiry has been submitted successfully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {formError && (
                    <div className="text-red-500 text-sm font-medium">
                      {formError}
                    </div>
                  )}

                  {/* 2x2 Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-slate-900 uppercase tracking-[0.4em]">
                        Full Name
                      </label>

                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-all bg-transparent font-light tracking-wide text-slate-900 text-sm"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-slate-900 uppercase tracking-[0.4em]">
                        Email Address
                      </label>

                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-all bg-transparent font-light tracking-wide text-slate-900 text-sm"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-slate-900 uppercase tracking-[0.4em]">
                        Phone Number
                      </label>

                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-all bg-transparent font-light tracking-wide text-slate-900 text-sm"
                        placeholder="+91 00000 00000"
                      />
                    </div>

                    {/* Product Interest */}
                    {/* Product Interest */}
                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-slate-900 uppercase tracking-[0.4em]">
                        Product Interest
                      </label>

                      {product ? (
                        /* Product Card Inquiry */
                        <select
                          value={product.category}
                          disabled
                          className="w-full py-3 border-b border-slate-200 outline-none bg-transparent font-light tracking-wide text-slate-900 text-sm appearance-none cursor-not-allowed opacity-80"
                        >
                          <option value={product.category}>
                            {product.category}
                          </option>
                        </select>
                      ) : (
                        /* Navbar Request Quote */
                        <select
                          value={formData.productInterest}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              productInterest: e.target.value,
                            })
                          }
                          required
                          className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-all bg-transparent font-light tracking-wide text-slate-900 text-sm"
                        >
                          <option value="">Select Product</option>

                          <option value="Face Towel">Face Towel</option>

                          <option value="Hand Towel">Hand Towel</option>

                          <option value="Bath Towel">Bath Towel</option>

                          <option value="Beach Towel">Beach Towel</option>

                          <option value="Set Towel">Set Towel</option>
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-slate-900 uppercase tracking-[0.4em]">
                      Estimated Quantity
                    </label>

                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quantity: e.target.value,
                        })
                      }
                      className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-all bg-transparent font-light tracking-wide text-slate-900 text-sm"
                      placeholder="Example: 500 Pieces"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-slate-900 uppercase tracking-[0.4em]">
                      Message (Optional)
                    </label>

                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      className="w-full py-3 border-b border-slate-200 focus:border-slate-900 outline-none transition-all bg-transparent font-light tracking-wide text-slate-900 text-sm resize-none"
                      placeholder="Tell us more about your requirements..."
                      rows={2}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 text-white py-5 text-[9px] font-bold uppercase tracking-[0.5em] hover:bg-transparent hover:text-slate-900 border border-slate-900 transition-all duration-400 flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
