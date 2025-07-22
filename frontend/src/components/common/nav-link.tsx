"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  handleClick?: () => void;
}

const NavLink = ({ href, children, handleClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className="flex items-center gap-x-2 group-hover:!bg-primary group-hover:text-white py-3"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
