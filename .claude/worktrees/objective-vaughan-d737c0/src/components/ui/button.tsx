type ButtonVariant = 'solid' | 'outlined';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    color?: string;
};

export default function Button({
    children,
    className = '',
    variant = 'solid',
    color,
    style,
    ...props
}: ButtonProps) {
    const outlinedStyles = color
        ? ({
            '--button-accent': color,
            borderColor: 'var(--button-accent)',
            ...style,
        } as React.CSSProperties)
        : style;

    const outlinedClassName = color
        ? 'border bg-transparent text-[var(--button-accent)] hover:bg-[var(--button-accent)] hover:text-white'
        : 'border border-current bg-transparent hover:bg-current hover:text-white';

    return (
        <button
            className={`inline-flex items-center justify-center cursor-pointer rounded-full px-7 py-3 font-display font-extrabold transition duration-150 hover:scale-[1.02] ${
                variant === 'outlined'
                    ? outlinedClassName
                    : `bg-light-pink text-[var(--button-accent)] text-white hover:text-white hover:bg-secondary/90`
            } ${className}`}
            style={variant === 'outlined' ? outlinedStyles : color ? ({'--button-accent': color, ...style} as React.CSSProperties) : style}
            {...props}
        >
            {children}
        </button>
    );
}
