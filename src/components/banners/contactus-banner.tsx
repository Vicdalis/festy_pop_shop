import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/button";
import Title from "../ui/title";
import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import { CONTACT } from '@/config/site';

export default function ContactUsBanner() {
    const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((s) => ({ ...s, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder: replace with real submit logic
        console.log("Contact form submitted:", formState);
    };

    return (
        <section className="py-20 container-custom">
            <Title mainTitle="Vísitanos" subtitle="Descubre cómo podemos hacer que tu próxima celebración sea inolvidable" />

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 max-w-[1200px] mx-auto px-4"
            >
                <div className="grid grid-cols-1  md:grid-cols-2 gap-8 items-start text-black text-foreground ">
                    {/* Left: Contact form */}
                    <div className="bg-card/50 rounded-2xl p-6 bg-[#FFF6EE]">
                        <h3 className="text-xl font-semibold mb-4 text-orange">Escríbenos</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <label className="text-sm">Nombre</label>
                            <input name="name" value={formState.name} onChange={handleChange} required className="px-3 py-2 rounded-lg border border-input bg-transparent" />

                            <label className="text-sm">Correo</label>
                            <input type="email" name="email" value={formState.email} onChange={handleChange} required className="px-3 py-2 rounded-lg border border-input bg-transparent" />

                            <label className="text-sm">Teléfono</label>
                            <input name="phone" value={formState.phone} onChange={handleChange} className="px-3 py-2 rounded-lg border border-input bg-transparent" />

                            <label className="text-sm">Consulta</label>
                            <textarea name="message" value={formState.message} onChange={handleChange} rows={5} className="px-3 py-2 rounded-lg border border-input bg-transparent resize-none" />

                            <div className="pt-2">
                                <Button type="submit" className="rounded-full">Enviar</Button>
                            </div>
                        </form>
                    </div>

                    {/* Right: Cards */}
                    <div className="flex flex-col gap-6 h-full">
                        <div className="bg-main text-white rounded-2xl p-6 flex items-center gap-6 shadow-lg">
                            <div className="p-4 rounded-lg bg-white/10">
                                <Phone className="h-12 w-12 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase opacity-90">Comunícate con nosotros </p>
                                    <p className="text-2xl md:text-3xl font-extrabold text-[#ffedfc] mt-1">{CONTACT.PHONE}</p>
                                    <p className="text-sm mt-2 opacity-90">{CONTACT.ATTENTION_HOUR}</p>
                                    <p className="text-sm mt-2 opacity-90">{CONTACT.ATTENTION_WEEKENDS}</p>
                            </div>
                        </div>

                        <div className="bg-pink-500 text-white rounded-2xl p-6 flex items-center gap-6 shadow-lg">
                            <div className="p-4 rounded-lg bg-white/10">
                                <Mail className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase opacity-90">Email Address</p>
                                <p className="text-xl font-extrabold mt-1">{CONTACT.SUPPORT_EMAIL}</p>
                                <p className="text-sm mt-2 opacity-90">Envíanos información adicional sobre el tema de decoración</p>
                            </div>
                        </div>
                        {/* Google Maps embed for contact address (basic config) */}
                        <div className="mt-6 rounded-2xl overflow-hidden h-full">
                            <iframe
                                title="Ubicación VVVS"
                                src={
                                    `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.ADDRESS)}&output=embed`
                                }
                                className="w-full h-full md:h-64 border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}