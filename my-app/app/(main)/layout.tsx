
export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="w-full h-full felxt items-center justify-center">
      {children}
    </section>
  );
}