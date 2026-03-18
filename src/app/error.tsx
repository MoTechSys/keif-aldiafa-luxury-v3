'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#121212]">
      <div className="text-center max-w-md">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05))",
            border: "2px solid rgba(212, 175, 55, 0.3)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h2
          className="font-cairo text-[#F2F2F2] mb-4"
          style={{ fontSize: "1.8rem", fontWeight: 800 }}
        >
          عذراً، حدث خطأ ما
        </h2>
        <p className="text-[#E0E0E0]/60 text-sm mb-8 leading-relaxed">
          نعتذر عن هذا الإزعاج. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full font-cairo font-bold text-sm"
            style={{
              background: "linear-gradient(90deg, #D4AF37, #F9E488, #B8860B)",
              color: "#0A0A0A",
              boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
            }}
          >
            المحاولة مرة أخرى
          </button>
          <a
            href="https://wa.me/966508252134?text=مرحباً، واجهت مشكلة في الموقع."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-[#D4AF37] text-sm font-bold"
            style={{
              border: "1.5px solid rgba(212, 175, 55, 0.4)",
              background: "rgba(212, 175, 55, 0.08)",
            }}
          >
            تواصل معنا
          </a>
        </div>
      </div>
    </div>
  );
}
