import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import SelectedCheckBox from "./components/selectedCheckBox";
import { motion } from "framer-motion";
import BackGroundImage from "@/components/ui/BackGroundImage";
import { useTranslation } from "next-i18next";

export default function ContactUs() {
    const { t } = useTranslation("common");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [customLabel, setCustomLabel] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("loading");
        setCustomLabel(t("contactForm.sending"));
        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            nationality: formData.get("nationality"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            travelDates: formData.get("travelDates"),
            travelers: formData.get("travelers"),
            stayLength: formData.get("stayLength"),
            experiences: formData.getAll("experiences"),
            travelStyle: formData.getAll("travelStyle"),
            specialText: formData.get("specialText")
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setStatus("success");
                setCustomLabel(t("contactForm.sent"));
                form.reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    useEffect(() => {
        if (status === "success") {
            const timer = setTimeout(() => {
                setCustomLabel(null);
                setStatus("idle");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const experiences = [
        { value: "Cultural & Historical Exploration", label: t("contactForm.expCultural") },
        { value: "Nile Cruise / Dahabiya", label: t("contactForm.expNile") },
        { value: "Desert Experiences", label: t("contactForm.expDesert") },
        { value: "Red Sea & Coastal Retreats", label: t("contactForm.expRedSea") },
        { value: "Spiritual Journeys", label: t("contactForm.expSpiritual") },
        { value: "Family Holidays", label: t("contactForm.expFamily") },
        { value: "Honeymoon", label: t("contactForm.expHoneymoon") }
    ];

    const travelStyle = [
        { value: "Luxury", label: t("contactForm.styleLuxury") },
        { value: "Boutique", label: t("contactForm.styleBoutique") },
        { value: "Comfort", label: t("contactForm.styleComfort") },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const displayLabel = customLabel || t("contactForm.button");

    return (
        <BackGroundImage image="/images/category_weekend-main_banner-ar-dt_2.jpg" opacity={0.8}>
            <section className="flex flex-col items-center backdrop-blur-md bg-black/55 border border-white/10 shadow-2xl w-[92%] md:w-[70%] py-6 md:py-8 rounded-2xl overflow-hidden" id="contact">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-sm md:text-3xl md:my-4 text-white font-semibold drop-shadow-lg w-[100%] md:w-[90%] font-kaisei"
                >
                    {t("contactForm.title")}
                </motion.h3>

                <motion.form
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    onSubmit={handleSubmit}
                    className="w-[90%] md:w-[75%] lg:w-[60%] flex flex-col gap-6 mt-4 md:mt-12"
                >
                    <motion.div variants={itemVariants} className="flex flex-col gap-4">
                        <h4 className="text-white text-xl font-semibold font-kaisei border-b border-white/40 pb-2">{t("contactForm.section1")}</h4>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                required
                                type="text"
                                name="name"
                                placeholder={t("contactForm.name")}
                                className="flex-1 px-4 py-2 md:py-3 rounded-xl bg-black/30 border border-white/40 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
                            />
                            <input
                                type="text"
                                name="nationality"
                                placeholder={t("contactForm.nationality")}
                                className="flex-1 px-4 py-2 md:py-3 rounded-xl bg-black/30 border border-white/40 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder={t("contactForm.email")}
                                className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
                            />
                            <input
                                name="phone"
                                type="tel"
                                placeholder={t("contactForm.phone")}
                                className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col gap-4">
                        <h4 className="text-white text-xl font-semibold font-kaisei border-b border-white/40 pb-2 mt-2">{t("contactForm.section2")}</h4>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex flex-col gap-1">
                                <span className="text-white/90 text-sm font-medium ml-1">{t("contactForm.dates")}</span>
                                <input
                                    type="date"
                                    name="travelDates"
                                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all text-sm"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <span className="text-white/90 text-sm font-medium ml-1">{t("contactForm.travelers")}</span>
                                <input
                                    type="number"
                                    name="travelers"
                                    placeholder="e.g. 2"
                                    min="1"
                                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <span className="text-white/90 text-sm font-medium ml-1">{t("contactForm.stay")}</span>
                                <input
                                    type="number"
                                    name="stayLength"
                                    placeholder="e.g. 7"
                                    min="1"
                                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col gap-3">
                        <h4 className="text-white text-xl font-semibold font-kaisei border-b border-white/40 pb-2 mt-2">{t("contactForm.section3")}</h4>
                        <p className="text-white/90 text-base">{t("contactForm.inspireText")}</p>
                        <div className="flex flex-wrap gap-3">
                            {experiences.map((exp) => (
                                <SelectedCheckBox key={exp.value} label={exp.label} value={exp.value} name="experiences" />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col gap-3">
                        <h4 className="text-white text-xl font-semibold font-kaisei border-b border-white/40 pb-2 mt-2">{t("contactForm.section4")}</h4>
                        <div className="flex flex-wrap gap-3">
                            {travelStyle.map((style) => (
                                <SelectedCheckBox key={style.value} label={style.label} value={style.value} name="travelStyle" />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col gap-3">
                        <h4 className="text-white text-xl font-semibold font-kaisei border-b border-white/40 pb-2 mt-2">{t("contactForm.section5")}</h4>
                        <p className="text-white/90 text-base">{t("contactForm.specialText")}</p>
                        <textarea
                            name="specialText"
                            rows={3}
                            placeholder="..."
                            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/40 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all resize-none"
                        ></textarea>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mt-6">
                        <Button
                            type="submit"
                            disabled={status === "loading"}
                            className="px-12 py-4 rounded-full text-primary-500 font-bold tracking-wider uppercase text-sm transition-all hover:scale-105 cursor-pointer"
                        >
                            {displayLabel}
                        </Button>

                        {status === "error" && (
                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-300 text-base font-medium text-center"
                            >
                                {t("contactForm.error")}
                            </motion.span>
                        )}
                    </motion.div>
                </motion.form>
            </section>
        </BackGroundImage>
    );
}
