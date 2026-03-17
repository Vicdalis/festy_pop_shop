export default function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return(
        <button className={`bg-light-pink text-white px-4 py-2 text-lg hover:bg-secondary/90 cursor-pointer rounded-lg ${className}`} {...props}>{children}</button>
    )
}