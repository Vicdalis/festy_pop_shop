export default function Title({mainTitle, subtitle, version = 'dark', as: Heading = 'h1'}: {mainTitle: string, subtitle?: string, version?: 'dark' | 'light', as?: 'h1' | 'h2'}) {
    return (
        <section>
            <Heading className={`text-4xl md:text-5xl font-display font-bold text-center mt-2 mb-4 ${version === 'dark' ? 'text-light-pink text-foreground' : 'text-white'}`}>{mainTitle}</Heading>
            <p className={`text-center text-lg mb-12 ${version === 'dark' ? 'text-[#6F5B65]' : 'text-white/80'}`}>
                {subtitle}
            </p>
        </section>
    );
}