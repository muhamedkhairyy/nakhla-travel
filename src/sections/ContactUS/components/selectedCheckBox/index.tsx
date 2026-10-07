import { motion } from "motion/react";

export default function SelectedCheckBox({ label, name, value }: { label: string, name: string, value?: string }) {
    return (
        <motion.label 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 cursor-pointer group"
        >
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    name={name}
                    value={value || label}
                    className="peer appearance-none w-5 h-5 border-2 border-white/70 bg-black/20 rounded-md checked:bg-white/40 transition-all cursor-pointer"

                />
                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <span className="text-white text-base font-medium group-hover:text-white transition-colors">{label}</span>
        </motion.label>
    )
}