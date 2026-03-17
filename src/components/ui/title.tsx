import { section } from "framer-motion/client"

export default function Title({mainTitle, subtitle, version = 'dark'}: {mainTitle: string, subtitle?: string, version?: 'dark' | 'light'}) {
    return (
        <section>
            <h1 className={`text-4xl md:text-5xl font-display text-center mb-4 ${version === 'dark' ? 'text-main text-foreground' : 'text-white'}`}>{mainTitle}</h1>
            <p className={`text-center text-lg mb-12 ${version === 'dark' ? 'text-[#6F5B65]' : 'text-white/80'}`}>
                {subtitle}
            </p>
        </section>
    );
}