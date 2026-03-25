"use client";

export function WhatsAppBtn() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
  const url = `https://wa.me/${number}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:-translate-y-1 hover:scale-110 animate-float"
      aria-label="Falar no WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8"
      >
        <path d="M12.01 2.014c-5.46 0-9.89 4.43-9.89 9.89 0 1.76.46 3.44 1.34 4.93L2.01 22.01l5.31-1.39c1.45.81 3.09 1.25 4.79 1.25 5.46 0 9.89-4.43 9.89-9.89 0-5.46-4.43-9.89-9.89-9.89zm0 18.15c-1.52 0-3.02-.39-4.35-1.12l-.31-.18-3.23.85.86-3.15-.2-.32c-.8-1.28-1.22-2.77-1.22-4.31 0-4.57 3.73-8.3 8.3-8.3 4.58 0 8.3 3.73 8.3 8.3 0 4.58-3.73 8.3-8.3 8.3zm4.56-6.22c-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.13-.17.25-.66.82-.8.99-.15.17-.3.19-.55.06-2.02-.99-3.48-2.61-4.04-3.56-.06-.11.06-.11.18-.35.13-.25.25-.38.38-.63.13-.25.06-.48-.06-.72-.13-.25-.57-1.38-.8-1.89-.22-.51-.43-.43-.57-.43-.13 0-.3 0-.48 0-.17 0-.48.06-.72.34-.25.27-.92.89-.92 2.18 0 1.28.94 2.53 1.07 2.7 1.22 1.63 3.32 3.61 5.48 4.48 1.94.78 2.65.68 3.16.57.65-.13 1.49-.61 1.7-1.2.22-.59.22-1.09.15-1.2-.06-.11-.22-.17-.48-.3z" />
      </svg>
    </a>
  );
}
