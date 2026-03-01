"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getSocket, joinStreamerRoom } from "@/lib/socket";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Howl } from "howler";

interface Donation {
  id: string;
  donorName: string;
  amount: string;
  message?: string;
}

function ObsOverlayContent() {
  const searchParams = useSearchParams();
  const streamerId = searchParams.get("streamerId");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [currentDonation, setCurrentDonation] = useState<Donation | null>(null);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    // Initialize notification sound
    const notificationSound = new Howl({
      src: ["/sounds/notification.mp3"],
      volume: 0.5,
    });
    setSound(notificationSound);
  }, []);

  useEffect(() => {
    if (!streamerId) return;

    const socket = getSocket();
    joinStreamerRoom(streamerId);

    socket.on("new-donation", (donation: Donation) => {
      setDonations((prev) => [...prev, donation]);
    });

    return () => {
      socket.off("new-donation");
    };
  }, [streamerId]);

  useEffect(() => {
    if (donations.length > 0 && !currentDonation) {
      const next = donations[0];
      setCurrentDonation(next);
      setDonations((prev) => prev.slice(1));

      // Play sound
      sound?.play();

      // Auto hide after 10 seconds
      const timer = setTimeout(() => {
        setCurrentDonation(null);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [donations, currentDonation, sound]);

  if (!streamerId) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p>Please add ?streamerId=YOUR_ID to the URL</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-transparent flex items-end justify-end p-8">
      <AnimatePresence mode="wait">
        {currentDonation && (
          <motion.div
            key={currentDonation.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -300, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 shadow-2xl max-w-md"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-4 border-white">
                <AvatarFallback className="text-2xl bg-white text-amber-600">
                  {currentDonation.donorName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-white">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-lg font-bold">{currentDonation.donorName}</p>
                  <p className="text-2xl font-black">
                    Rp {parseInt(currentDonation.amount).toLocaleString("id-ID")}
                  </p>
                </motion.div>
              </div>
            </div>

            {currentDonation.message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 pt-4 border-t border-white/30"
              >
                <p className="text-white/90 italic">
                  &ldquo;{currentDonation.message}&rdquo;
                </p>
              </motion.div>
            )}

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 text-4xl">&#10024;</div>
            <div className="absolute -bottom-2 -left-2 text-2xl">&#128142;</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Queue indicator */}
      {donations.length > 0 && !currentDonation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/50 text-white px-4 py-2 rounded-full text-sm"
        >
          {donations.length} donasi dalam antrian
        </motion.div>
      )}
    </div>
  );
}

export default function ObsOverlayPage() {
  return (
    <Suspense fallback={null}>
      <ObsOverlayContent />
    </Suspense>
  );
}
