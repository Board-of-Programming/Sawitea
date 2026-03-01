import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl font-bold tracking-tight">
            Sawitria
          </h1>
          <p className="text-xl text-muted-foreground">
            Platform donasi untuk streamer Indonesia. Alternatif open source untuk Saweria.co
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg">Mulai sebagai Streamer</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Masuk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🎥 OBS Overlay</CardTitle>
                <CardDescription>
                  Tampilkan donasi real-time di stream dengan overlay yang menarik
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Integrasi mudah dengan OBS Studio menggunakan Browser Source.
                  Animasi smooth dengan notifikasi suara.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💳 Multiple Payment</CardTitle>
                <CardDescription>
                  Berbagai metode pembayaran untuk donor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>QRIS</Badge>
                  <Badge>GoPay</Badge>
                  <Badge>OVO</Badge>
                  <Badge>DANA</Badge>
                  <Badge>LinkAja</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📊 Real-time Dashboard</CardTitle>
                <CardDescription>
                  Pantau donasi masuk secara real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Dashboard lengkap dengan statistik, riwayat donasi,
                  dan pengaturan overlay.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Cara Kerja</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-5xl">1️⃣</div>
              <h3 className="text-xl font-bold">Buat Profil</h3>
              <p className="text-muted-foreground">
                Daftar dan buat profil streamer dengan username unik
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl">2️⃣</div>
              <h3 className="text-xl font-bold">Setup OBS</h3>
              <p className="text-muted-foreground">
                Tambahkan overlay URL ke OBS Studio
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl">3️⃣</div>
              <h3 className="text-xl font-bold">Terima Donasi</h3>
              <p className="text-muted-foreground">
                Bagikan link dan terima donasi dari penonton
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary">Next.js 16</Badge>
            <Badge variant="secondary">NestJS 11</Badge>
            <Badge variant="secondary">PostgreSQL</Badge>
            <Badge variant="secondary">Drizzle ORM</Badge>
            <Badge variant="secondary">Better Auth</Badge>
            <Badge variant="secondary">Bull Queue</Badge>
            <Badge variant="secondary">Socket.io</Badge>
            <Badge variant="secondary">TanStack Query</Badge>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-t from-background to-muted">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Siap menerima dukungan?</h2>
          <p className="text-muted-foreground">
            Bergabung sekarang dan mulai terima donasi dari penonton setiamu.
          </p>
          <Link href="/register">
            <Button size="lg" className="w-full md:w-auto">
              Daftar Gratis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
