import * as React from "react";
import { cn } from "../lib/utils";
import { AtSign, LockKeyhole, Eye, EyeOff, User } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const EmailInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { error?: boolean }
>(({ className, error, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`absolute inset-y-0 left-0 flex items-center pl-3 
          ${
            isFocused ? "text-black" : error ? "text-danger" : "text-slate-400"
          }`}
      >
        <AtSign className="h-4 w-4" />
      </div>
      <Input
        ref={ref}
        placeholder="masukkan email anda"
        className={cn(
          "pl-10 text-sm",
          error
            ? "border-danger focus-visible:ring-danger"
            : "border-neutral-200",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  );
});
EmailInput.displayName = "EmailInput";

const NameInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { error?: boolean }
>(({ className, error, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`absolute inset-y-0 left-0 flex items-center pl-3 
          ${
            isFocused ? "text-black" : error ? "text-danger" : "text-slate-400"
          }`}
      >
        <User className="h-4 w-4" />
      </div>
      <Input
        ref={ref}
        placeholder="nama anda"
        className={cn(
          "pl-10 text-sm",
          error
            ? "border-danger focus-visible:ring-danger"
            : "border-neutral-200",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  );
});
NameInput.displayName = "NameInput";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { error?: boolean }
>(({ className, error, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <div
        className={`absolute inset-y-0 left-0 flex items-center pl-3 
          ${
            isFocused ? "text-black" : error ? "text-danger" : "text-slate-400"
          }`}
      >
        <LockKeyhole className="h-4 w-4" />
      </div>
      <Input
        ref={ref}
        type={isPasswordVisible ? "text" : "password"}
        placeholder="masukkan password anda"
        className={cn(
          "pl-10 text-sm",
          error
            ? "border-danger focus-visible:ring-danger"
            : "border-neutral-200",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <button
        type="button"
        className={`absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer 
           text-slate-400`}
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { Input, EmailInput, PasswordInput, NameInput };
