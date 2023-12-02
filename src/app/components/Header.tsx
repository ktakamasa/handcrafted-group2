import Link from "next/link";

export default function Header() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "shop", label: "Shop" },
    { href: "/cart", label: "Cart" },
    { href: "login", label: "Login" },
    { href: "signup", label: "Sign Up" },
  ];

  return (
    <nav className="bg-white flex justify-between items-center h-18 p-4">
      <a href="/">
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
          <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </a>
      <a href="/" className="font-bold text-inherit mr-auto">
        Handcrafted
      </a>
      <ul className="flex gap-6 list-none">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
