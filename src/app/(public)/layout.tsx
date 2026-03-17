import Header  from "@/components/layout/header";   
import Footer  from "@/components/layout/footer";   

export default function PublicLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>  
                <Header/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}