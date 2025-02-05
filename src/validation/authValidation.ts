import { z } from "zod";

// Login Validation
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email tidak boleh kosong")
    .email("Format email tidak valid")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .max(32, { message: "Password maksimal 32 karakter" })
    .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf besar")
    .regex(/[a-z]/, "Password harus mengandung minimal 1 huruf kecil")
    .regex(/[0-9]/, "Password harus mengandung minimal 1 angka")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password harus mengandung minimal 1 karakter spesial"
    ),
});
export type LoginValues = z.infer<typeof loginSchema>;

// Register Validation
export const registrationSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email tidak boleh kosong")
      .email("Format email tidak valid")
      .toLowerCase()
      .trim(),
    first_name: z
      .string()
      .min(2, "Nama depan minimal 2 karakter")
      .max(50, "Nama depan maksimal 50 karakter")
      .regex(/^[a-zA-Z\s]*$/, "Nama depan hanya boleh berisi huruf dan spasi")
      .trim(),
    last_name: z
      .string()
      .min(2, "Nama belakang minimal 2 karakter")
      .max(50, "Nama belakang maksimal 50 karakter")
      .regex(
        /^[a-zA-Z\s]*$/,
        "Nama belakang hanya boleh berisi huruf dan spasi"
      )
      .trim()
      .optional()
      .or(z.literal("")), 
    password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" })
      .max(32, { message: "Password maksimal 32 karakter" })
      .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf besar")
      .regex(/[a-z]/, "Password harus mengandung minimal 1 huruf kecil")
      .regex(/[0-9]/, "Password harus mengandung minimal 1 angka")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password harus mengandung minimal 1 karakter spesial"
      ),
    confirm_password: z
      .string()
      .min(1, "Konfirmasi password tidak boleh kosong"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password dan konfirmasi password tidak sama",
    path: ["confirm_password"],
  });

export type RegistrationValues = z.infer<typeof registrationSchema>;
