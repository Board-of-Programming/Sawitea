"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { streamerApi } from "@/lib/api";
import { getSocket, joinStreamerRoom } from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, Eye } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth/client";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const [overlayUrl, setOverlayUrl] = useState("");
  const [donationPageUrl, setDonationPageUrl] = useState("");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["streamer-profile"],
    queryFn: streamerApi.getMyProfile,
    enabled: !!session?.user,
  });

  useEffect(() => {
    if (profile?.id) {
      const baseUrl = window.location.origin;
      setOverlayUrl(`${baseUrl}/obs?streamerId=${profile.id}`);
      setDonationPageUrl(`${baseUrl}/user/${profile.username}`);

      // Connect to WebSocket for real-time updates
      const socket = getSocket();
      joinStreamerRoom(profile.id);

      socket.on("new-donation", (donation: any) => {
        toast.success(`Donasi baru dari ${donation.donorName}!`, {
          description: `Rp ${parseInt(donation.amount).toLocaleString("id-ID")}`,
        });
      });

      return () => {
        socket.off("new-donation");
      };
    }
  }, [profile]);

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    redirect("/login");
  }

  if (!profile) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Buat Profil Streamer</h1>
              <p className="text-muted-foreground mb-4">
                Anda belum memiliki profil streamer. Buat sekarang untuk mulai menerima donasi.
              </p>
              <Button onClick={() => window.location.href = "/dashboard/create"}>
                Buat Profil
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} disalin ke clipboard`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={() => window.open(donationPageUrl, "_blank")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Lihat Halaman Donasi
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Donasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                Rp {parseInt(profile.totalDonations || 0).toLocaleString("id-ID")}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Donor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{profile.totalDonors || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Donasi Bulan Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                Rp {parseInt(profile.totalDonations || 0).toLocaleString("id-ID")}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overlay" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overlay">OBS Overlay</TabsTrigger>
            <TabsTrigger value="donations">Riwayat Donasi</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          <TabsContent value="overlay" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>OBS Browser Source URL</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>URL untuk OBS Browser Source</Label>
                  <div className="flex gap-2">
                    <Input value={overlayUrl} readOnly />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(overlayUrl, "URL OBS")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="font-medium">Cara penggunaan:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Buka OBS Studio</li>
                    <li>Tambahkan source &quot;Browser&quot;</li>
                    <li> Paste URL di atas ke kolom URL</li>
                    <li>Set width: 1920, height: 1080</li>
                    <li>Custom CSS (opsional): <code>body &#123; background-color: transparent; &#125;</code></li>
                  </ol>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(overlayUrl, "_blank")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Overlay
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Donasi</CardTitle>
              </CardHeader>
              <CardContent>
                {profile.recentDonations?.length > 0 ? (
                  <div className="space-y-4">
                    {profile.recentDonations.map((donation: any) => (
                      <div
                        key={donation.id}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{donation.donorName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(donation.createdAt).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            Rp {parseInt(donation.amount).toLocaleString("id-ID")}
                          </p>
                          <p className={`text-xs ${
                            donation.status === "completed"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}>
                            {donation.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Belum ada donasi
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Streamer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input value={profile.username} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Display Name</Label>
                  <Input value={profile.displayName} />
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Input value={profile.bio || ""} />
                </div>
                <Button>Simpan Perubahan</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
