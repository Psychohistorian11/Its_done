export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="grid place-items-center min-h-scree bg-zinc-900">
            {children}
        </div>
          
   
    );  
  }