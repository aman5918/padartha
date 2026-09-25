import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select option...",
  disabled = false,
  className = "",
  buttonClassName = "",
  size = "md", // 'sm' | 'md'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize options into { value, label, sublabel, badge }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "string" || typeof opt === "number") {
      return { value: opt, label: String(opt) };
    }
    return {
      value: opt.value,
      label: opt.label || opt.name || opt.value,
      sublabel: opt.sublabel || opt.sub || "",
      badge: opt.badge || "",
      icon: opt.icon || null,
    };
  });

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value),
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const pyClass =
    size === "sm" ? "py-1.5 px-3 text-xs" : "py-2.5 px-3.5 text-xs";

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-2.5 rounded-xl border font-medium text-left transition-all duration-150 outline-none
          ${
            isOpen
              ? "border-indigo-500/80 ring-2 ring-indigo-500/20 shadow-md shadow-indigo-900/10"
              : "border-zinc-200 dark:border-white/[0.08] hover:border-zinc-300 dark:hover:border-zinc-700"
          }
          ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-900 text-zinc-400"
              : "bg-white dark:bg-[#0c0c0e] text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/70"
          }
          ${pyClass}
          ${buttonClassName}
        `}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption?.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          {selectedOption ? (
            <span className="truncate font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {selectedOption.label}
              {selectedOption.sublabel && (
                <span className="ml-2 font-normal text-zinc-500 dark:text-zinc-400 text-[11px]">
                  {selectedOption.sublabel}
                </span>
              )}
            </span>
          ) : (
            <span className="text-zinc-400 dark:text-zinc-500">
              {placeholder}
            </span>
          )}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-zinc-400 dark:text-zinc-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-indigo-500" : ""
          }`}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 z-50 mt-1.5 max-h-60 overflow-y-auto rounded-xl
            bg-white dark:bg-[#09090b]
            border border-zinc-200/90 dark:border-white/[0.12]
            shadow-2xl shadow-black/30 dark:shadow-black/80
            backdrop-blur-xl p-1 animate-in fade-in-50 zoom-in-95
          "
        >
          {normalizedOptions.length === 0 ? (
            <div className="py-3 px-3 text-xs text-zinc-400 text-center italic">
              No options available
            </div>
          ) : (
            normalizedOptions.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <div
                  key={String(opt.value)}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs cursor-pointer transition-all duration-100
                    ${
                      isSelected
                        ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/70 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }
                  `}
                >
                  <div className="flex items-center gap-2 truncate">
                    {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                    <span className="truncate">{opt.label}</span>
                    {opt.sublabel && (
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                        {opt.sublabel}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {opt.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {opt.badge}
                      </span>
                    )}
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
