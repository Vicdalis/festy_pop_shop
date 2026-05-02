export default function Subtitle({ title, color = 'hero-accent' }: { title: string, color?: string }) {
    return (
        <span className={` text-${color} inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] `}>
            <span className="h-0.5 w-5 rounded-full bg-current" />
            {title}
            <span className="h-0.5 w-5 rounded-full bg-current" />
        </span>
    );
}