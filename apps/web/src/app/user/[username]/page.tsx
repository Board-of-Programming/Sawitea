"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { streamerApi } from "@/lib/api";
import { DonationForm } from "@/components/donation/donation-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function StreamerPage() {
  const params = useParams();
  const username = params.username as string;

  const { data: profile, isLoading } = useQuery({
    queryKey: ["streamer", username],
    queryFn: () => streamerApi.getProfile(username),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-2">Streamer tidak ditemukan</h1>
            <p className="text-muted-foreground">
              Username &quot;{username}&quot; tidak ditemukan.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src={profile.avatar || undefined} />
            <AvatarFallback className="text-3xl">
              {profile.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{profile.displayName}</h1>
            <p className="text-muted-foreground">@{profile.username}</p>
          </div>
          {profile.bio && (
            <p className="text-muted-foreground max-w-md mx-auto">{profile.bio}</p>
          )}
          
          {/* Stats */}
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold">
                Rp {parseInt(profile.totalDonations || 0).toLocaleString("id-ID")}
              </div>
              <div className="text-sm text-muted-foreground">Total Dukungan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{profile.totalDonors || 0}</div>
              <div className="text-sm text-muted-foreground">Donor</div>
            </div>
          </div>
        </div>

        {/* Donation Form */}
        <DonationForm username={username} />

        {/* Recent Donations */}
        {profile.recentDonations && profile.recentDonations.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Dukungan Terbaru</h2>
              <div className="space-y-3">
                {profile.recentDonations.slice(0, 5).map((donation: any) => (
                  <div
                    key={donation.id}
                    className="flex items-start gap-3 p-3 bg-muted rounded-lg"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>
                        {donation.donorName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{donation.donorName}</p>
                          <p className="text-sm text-muted-foreground">
                            Rp {parseInt(donation.amount).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                      {donation.donorMessage && (
                        <p className="text-sm mt-1">{donation.donorMessage}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
