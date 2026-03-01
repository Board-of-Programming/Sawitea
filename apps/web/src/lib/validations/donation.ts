import { z } from "zod";

export const donationSchema = z.object({
  amount: z
    .number()
    .min(1000, "Minimal donasi Rp 1.000")
    .max(10000000, "Maksimal donasi Rp 10.000.000"),
  donorName: z
    .string()
    .min(1, "Nama wajib diisi")
    .max(50, "Nama maksimal 50 karakter"),
  donorEmail: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Email tidak valid"),
  donorMessage: z
    .string()
    .max(500, "Pesan maksimal 500 karakter")
    .optional(),
  isAnonymous: z.boolean().default(false),
  agreed: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui syarat dan ketentuan",
  }),
});

export type DonationFormData = z.infer<typeof donationSchema>;
