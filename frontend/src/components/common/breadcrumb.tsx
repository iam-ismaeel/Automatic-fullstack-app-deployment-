"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const localActive = useLocale();
  const router = useRouter();

  const handleNavigate = (index: number) => {
    // If only one item, do nothing
    if (items.length <= 1) return;

    // If specific href is provided, use that
    if (items[index].href) {
      router.push(`/${localActive}${items[index].href}`);
      return;
    }

    // If no href, go back the number of steps needed
    const stepsBack = items.length - 1 - index;
    router.back();
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-5">
      <ol className="list-reset flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {items.length > 1 && index < items.length - 1 ? (
              <button
                onClick={() => handleNavigate(index)}
                className="text-xl text-[#49454F] font-semibold hover:underline"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-xl text-[#49454F] font-semibold">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
