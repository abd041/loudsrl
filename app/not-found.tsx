import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlitchText from "@/components/GlitchText";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505]">
        <div className="noise-overlay absolute inset-0" aria-hidden />
        <GlitchText
          text="404"
          className="huge-title text-[clamp(8rem,25vw,20rem)]"
        />
        <p className="mt-6 text-xl text-white/60">Page not found</p>
        <Link
          href="/"
          className="mt-12 border border-white/20 px-8 py-4 text-sm uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
