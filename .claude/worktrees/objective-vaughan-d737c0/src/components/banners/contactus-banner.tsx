import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import Title from "../ui/title";
import { useState } from "react";
import { Phone, Mail, MapPinned } from "lucide-react";
import { CONTACT } from '@/config/site';
import Image from 'next/image';
import Subtitle from "../ui/subtitle";

export default function ContactUsBanner() {
    const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((s) => ({ ...s, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Contact form submitted:", formState);
    };

    return (
        <section className="py-15 container-custom">
            <div className="text-center">
                <Subtitle title="Estamos aquí" color="main-purple" />
            </div>
            <Title mainTitle="Vísitanos" subtitle="Descubre cómo podemos hacer que tu próxima celebración sea inolvidable" />

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 max-w-[1200px] mx-auto px-4"
            >
                <div className="grid grid-cols-1  md:grid-cols-2 gap-8 items-start text-black text-foreground ">
                    {/* Left: Contact form */}
                    <div className="bg-card/50 rounded-2xl p-6 bg-[#FFF6EE] h-full">
                        <h3 className="text-xl font-semibold mb-4 text-light-pink">Escríbenos</h3>
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
                        <div className="bg-[#F89651] text-white rounded-2xl p-6 flex flex-wrap md:flex-nowrap items-center gap-6 shadow-lg">
                            <a href={CONTACT.PHONE_LINK} target="_blank" aria-label="WhatsApp" className="group">
                                <div className="p-4 rounded-lg bg-white/10 transition duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:shadow-lg">
                                    <Image
                                        src="/whatsapp.png"
                                        alt="Whatssap logo"
                                        width={40}
                                        height={40}
                                        className="object-contain transition duration-300 group-hover:rotate-6"
                                    />
                                </div>
                            </a>
                            <div>
                                <p className="text-sm font-semibold uppercase opacity-90">Comunícate con nosotros </p>
                                <p className="text-2xl md:text-3xl font-extrabold text-[#ffedfc] mt-1">{CONTACT.PHONE}</p>
                                <p className="text-sm mt-2 opacity-90">{CONTACT.ATTENTION_HOUR}</p>
                                <p className="text-sm mt-2 opacity-90">{CONTACT.ATTENTION_WEEKENDS}</p>
                            </div>
                        </div>

                        <div className="bg-pink-500 text-white rounded-2xl p-6 flex flex-wrap md:flex-nowrap items-center gap-6 shadow-lg">
                            <div className="p-4 rounded-lg bg-white/10">
                                <MapPinned className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase opacity-90">Dirección</p>
                                <p className="text-xl font-extrabold mt-1">{CONTACT.SHORT_ADDRESS}</p>
                                <p className="text-sm mt-2 opacity-90">Visítanos o envíanos más información sobre tu pedido</p>
                            </div>
                        </div>
                        {/* Google Maps embed for contact address (basic config) */}
                        <div className="mt-6 rounded-2xl overflow-hidden h-full">
                            <iframe
                                title="Ubicación VVVS"
                                src={
                                    `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1744.4644711256465!2d-66.91133952018944!3d10.502057115494615!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a5f26a33236d3%3A0x4d876962fdb1f63a!2sPi%C3%B1ateria%20VVVS!5e0!3m2!1sen!2sus!4v1774144317078!5m2!1sen!2sus`
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
