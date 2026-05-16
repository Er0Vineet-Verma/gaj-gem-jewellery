import Icon from './Icon';

export default function WhatsAppFAB() {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Expanding pulse ring */}
      <div className="absolute inset-0 rounded-full wa-pulse bg-[#25D366]/40 dark:bg-[#25D366]/50" />
      <a
        href="https://wa.me/919816024887"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-ink text-ivory dark:bg-[#25D366] dark:text-white shadow-[0_4px_24px_rgba(0,0,0,.28)] flex items-center justify-center hover:scale-110 transition-transform duration-200"
      >
        <Icon name="whatsapp" size={26} />
      </a>
    </div>
  );
}
