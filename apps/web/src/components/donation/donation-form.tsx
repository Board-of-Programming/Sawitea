"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { donationApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { donationSchema, DonationFormData } from "@/lib/validations/donation";

interface DonationFormProps {
  username: string;
}

const PRESET_AMOUNTS = [
  { value: 10000, label: "10k", color: "bg-cyan-400 hover:bg-cyan-500" },
  { value: 50000, label: "50k", color: "bg-blue-500 hover:bg-blue-600" },
  { value: 100000, label: "100k", color: "bg-amber-400 hover:bg-amber-500" },
  { value: 300000, label: "300k", color: "bg-purple-400 hover:bg-purple-500" },
];

export function DonationForm({ username }: DonationFormProps) {
  const [customAmount, setCustomAmount] = useState("");

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 0,
      donorName: "",
      donorEmail: "",
      donorMessage: "",
      isAnonymous: false,
      agreed: false,
    },
  });

  const { watch, setValue, formState } = form;
  const amount = watch("amount");
  const isAnonymous = watch("isAnonymous");

  const donationMutation = useMutation({
    mutationFn: (data: DonationFormData) =>
      donationApi.create(username, {
        amount: data.amount,
        donorName: data.donorName,
        donorEmail: data.donorEmail,
        donorMessage: data.donorMessage,
        isAnonymous: data.isAnonymous,
      }),
    onSuccess: (data) => {
      toast.success("Donasi berhasil dibuat! Mengarahkan ke halaman pembayaran...");
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal membuat donasi");
    },
  });

  const handleAmountSelect = (value: number) => {
    setValue("amount", value, { shouldValidate: true });
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = value.replace(/[^0-9]/g, "");
    setCustomAmount(numValue);
    const parsed = numValue ? parseInt(numValue) : 0;
    setValue("amount", parsed, { shouldValidate: true });
  };

  const onSubmit = (data: DonationFormData) => {
    donationMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Dukung {username}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Nominal */}
            <FormField
              control={form.control}
              name="amount"
              render={() => (
                <FormItem>
                  <FormLabel>
                    Nominal: <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        Rp
                      </span>
                      <Input
                        type="text"
                        placeholder="Ketik jumlah dukungan"
                        value={customAmount || (amount > 0 ? amount.toString() : "")}
                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {PRESET_AMOUNTS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => handleAmountSelect(preset.value)}
                        className={`${preset.color} text-black font-medium py-2 px-3 rounded-md transition-colors ${
                          amount === preset.value
                            ? "ring-2 ring-offset-2 ring-primary"
                            : ""
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dari */}
            <FormField
              control={form.control}
              name="donorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Dari: <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama kamu"
                      {...field}
                      disabled={isAnonymous}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Anonymous Checkbox */}
            <FormField
              control={form.control}
              name="isAnonymous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-muted-foreground font-normal">
                      Sembunyikan nama saya (Hamba Allah)
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="donorEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email: <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pesan */}
            <FormField
              control={form.control}
              name="donorMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pesan:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tulis pesan dukungan..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Terms */}
            <FormField
              control={form.control}
              name="agreed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-muted-foreground font-normal leading-relaxed">
                      Saya menyetujui bahwa dukungan ini saya berikan secara
                      sukarela untuk mendukung kreator, tidak dapat dikembalikan,
                      bukan transaksi komersial, tidak digunakan untuk aktivitas
                      ilegal.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold bg-amber-600 hover:bg-amber-700"
              disabled={donationMutation.isPending || formState.isSubmitting}
            >
              {donationMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Lanjutkan ke Pembayaran"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
