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
                    {/* Left: FAQ section */}
                    <div className="bg-card/50 rounded-2xl p-6 bg-[#FFF6EE] h-full">
                        <h3 className="text-xl font-semibold mb-4 text-light-pink">Preguntas frecuentes</h3>
                        <div className="flex flex-col gap-3">
                            <details className="bg-white/10 p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">1. ¿Puedo pedir un diseño personalizado?</summary>
                                <p className="mt-2 text-sm">Sí, aceptamos diseños personalizados. Dependiendo de la complejidad puede haber cargos adicionales. Contáctanos, envíanos tu foto de referencia y confirmaremos los detalles contigo.</p>
                            </details>
                            <details className="bg-white/10 p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">2. ¿Con cuánto tiempo de anticipación debo hacer un pedido?</summary>
                                <p className="mt-2 text-sm">Los pedidos deben realizar con al menos 5 días de anticipación para piñatas y 10 días de anticipación para chupeteras y figuras de anime.</p>
                            </details>

                            <details className="bg-white/10 p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">3. ¿Tienen Delivery?</summary>
                                <p className="mt-2 text-sm">Sí, ofrecemos delivery en zonas seleccionadas. Los costos y tiempos dependen de la ubicación.</p>
                            </details>
                            <details className="bg-white/10 p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">4. ¿Tienen precios por mayor?</summary>
                                <p className="mt-2 text-sm">Sí, tenemos precios por mayor a partir de 5 unidades dependiendo del producto. (No válido para pedidos personalizados)</p>
                            </details>
                            <details className="bg-white/10 p-4 rounded-lg">
                                <summary className="font-semibold cursor-pointer">5. ¿Hacen envíos nacionales?</summary>
                                <p className="mt-2 text-sm">Sí hacemos envios nacionales a través de zoom con cargo a destino.</p>
                            </details>
                        </div>
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
                            <a href={CONTACT.ADDRESS_LINK} target="_blank" aria-label="direccion_mapa" className="group ">
                                <div className="p-4 rounded-lg bg-white/10  transition duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:shadow-lg">
                                    <MapPinned className="h-10 w-10 text-white" />
                                </div>
                            </a>
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
