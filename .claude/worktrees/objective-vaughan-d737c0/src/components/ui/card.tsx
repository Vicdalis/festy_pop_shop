export default function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return(
        <div className="bg-white rounded-lg shadow-md p-4" {...props}>
            <div className="card-content">
                {children}
            </div>
        </div>
    )
}