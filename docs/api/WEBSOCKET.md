# 🔌 WebSocket Events

Dokumentasi real-time communication via WebSocket.

## 🔗 Connection

```javascript
import { io } from "socket.io-client";

const socket = io("ws://localhost:3001", {
  path: "/socket.io",
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
```

## 📡 Events

### Client → Server

#### Join Streamer Room
Bergabung ke room streamer untuk menerima notifikasi donasi.

```javascript
socket.emit("join-streamer", "streamer-id");
```

#### Leave Streamer Room
Meninggalkan room streamer.

```javascript
socket.emit("leave-streamer", "streamer-id");
```

#### Mark Donation as Displayed
Memberitahu server bahwa donasi sudah ditampilkan di OBS.

```javascript
socket.emit("donation-displayed", {
  donationId: "uuid",
  streamerId: "streamer-id",
});
```

---

### Server → Client

#### Joined
Konfirmasi berhasil join room.

```javascript
socket.on("joined", (data) => {
  console.log("Joined room:", data.streamerId);
});
```

#### New Donation
Event saat ada donasi baru (payment completed).

```javascript
socket.on("new-donation", (data) => {
  console.log("New donation:", data);
  // Show in OBS overlay
});
```

**Data Structure:**
```typescript
{
  id: string;              // Donation ID
  donorName: string;       // Name of donor
  amount: string;          // Amount (as string)
  message?: string;        // Donor message
  createdAt: string;       // ISO date string
}
```

#### Donation Displayed
Konfirmasi donasi sudah ditampilkan.

```javascript
socket.on("donation-displayed", (data) => {
  console.log("Donation displayed:", data.donationId);
});
```

---

## 💻 Usage Examples

### OBS Overlay Page
```typescript
// apps/web/src/app/obs/page.tsx
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function ObsOverlay() {
  useEffect(() => {
    const socket = io("ws://localhost:3001");
    const streamerId = "streamer-uuid"; // from URL params
    
    // Join room
    socket.emit("join-streamer", streamerId);
    
    // Listen for donations
    socket.on("new-donation", (donation) => {
      // Show animation
      showDonationAnimation(donation);
      
      // Mark as displayed
      socket.emit("donation-displayed", {
        donationId: donation.id,
        streamerId,
      });
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);
  
  return <div>{/* OBS overlay content */}</div>;
}
```

### Dashboard Real-time Updates
```typescript
// In streamer dashboard
useEffect(() => {
  const socket = getSocket();
  
  socket.emit("join-streamer", streamerId);
  
  socket.on("new-donation", (donation) => {
    // Show toast notification
    toast.success(`Donasi baru dari ${donation.donorName}!`);
    
    // Refresh donation list
    queryClient.invalidateQueries({ queryKey: ["donations"] });
  });
  
  return () => {
    socket.off("new-donation");
  };
}, [streamerId]);
```

---

## 🔐 Authentication

WebSocket connections use the same session authentication as HTTP requests. The session cookie is automatically sent during the WebSocket handshake.

```javascript
// No additional auth needed - uses session cookie
const socket = io("ws://localhost:3001", {
  withCredentials: true, // Important for cookies
});
```

---

**Related:**
- [Donation API](./DONATION.md)
- [System Overview](../architecture/SYSTEM_OVERVIEW.md)
