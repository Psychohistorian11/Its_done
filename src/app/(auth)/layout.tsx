export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="min-h-scree bg-zinc-900">
            {children}
        </div>
          
   
    );  
  }