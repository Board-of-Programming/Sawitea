# 🎥 Streamer API

API endpoints untuk mengelola profil streamer.

## 📋 Endpoints

### Create Streamer Profile

Membuat profil streamer baru (requires authentication).

```http
POST /streamer
```

#### Headers
```http
Authorization: Bearer <token>
// or session cookie
```

#### Request Body
```typescript
{
  username: string;      // Unique, alphanumeric + underscore
  displayName: string;   // Max 50 chars
  bio?: string;          // Max 500 chars
  avatar?: string;       // URL to avatar image
  coverImage?: string;   // URL to cover image
}
```

#### Validation Rules
- `username`: 3-30 chars, alphanumeric + underscore only
- `displayName`: 1-50 chars
- `bio`: Max 500 chars

#### Response
```json
{
  "id": "uuid",
  "userId": "uuid",
  "username": "johndoe",
  "displayName": "John Doe",
  "bio": "Streamer gaming Indonesia",
  "avatar": null,
  "coverImage": null,
  "isActive": true,
  "totalDonations": "0",
  "totalDonors": 0,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Error Responses
```json
// 409 - Username taken
{
  "statusCode": 409,
  "message": "Username already exists",
  "error": "Conflict"
}

// 400 - Invalid username
{
  "statusCode": 400,
  "message": "Username can only contain letters, numbers, and underscores",
  "error": "Bad Request"
}
```

---

### Get Streamer Profile (Public)

Mendapatkan profil streamer beserta donasi terbaru.

```http
GET /streamer/profile/:username
```

#### URL Parameters
| Parameter | Type   | Description       |
|-----------|--------|-------------------|
| username  | string | Username streamer |

#### Response
```json
{
  "id": "uuid",
  "userId": "uuid",
  "username": "johndoe",
  "displayName": "John Doe",
  "bio": "Streamer gaming Indonesia",
  "avatar": "https://...",
  "coverImage": null,
  "isActive": true,
  "obsOverlayTheme": "default",
  "obsOverlayDuration": 10,
  "obsSoundEnabled": true,
  "totalDonations": "1500000",
  "totalDonors": 45,
  "createdAt": "2024-01-01T00:00:00Z",
  "recentDonations": [
    {
      "id": "uuid",
      "donorName": "Jane Doe",
      "amount": "50000",
      "donorMessage": "Great stream!",
      "status": "completed",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Error Responses
```json
// 404 - Streamer not found
{
  "statusCode": 404,
  "message": "Streamer not found",
  "error": "Not Found"
}
```

---

### Get My Profile

Mendapatkan profil streamer yang sedang login.

```http
GET /streamer/me
```

#### Headers
```http
Authorization: Bearer <token>
// or session cookie
```

#### Response
Same as `/streamer/profile/:username`

---

### Update Streamer Settings

Mengupdate pengaturan streamer (requires authentication).

```http
PUT /streamer/settings
```

#### Headers
```http
Authorization: Bearer <token>
// or session cookie
```

#### Request Body
```typescript
{
  displayName?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  obsOverlayTheme?: "default" | "dark" | "minimal";
  obsOverlayDuration?: number;    // Seconds
  obsSoundEnabled?: boolean;
  obsMinAmountShow?: number;      // Min amount to show in OBS
}
```

#### Response
```json
{
  "id": "uuid",
  "userId": "uuid",
  "username": "johndoe",
  "displayName": "John Doe Updated",
  "bio": "Updated bio",
  "obsOverlayTheme": "dark",
  "obsOverlayDuration": 15,
  "obsSoundEnabled": true,
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

---

## 📊 Database Schema

```typescript
interface Streamer {
  id: string;
  userId: string;              // Reference to user table
  username: string;            // Unique
  displayName: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  isActive: boolean;
  
  // OBS Settings
  obsOverlayTheme: string;     // "default" | "dark" | "minimal"
  obsOverlayDuration: number;  // Seconds
  obsSoundEnabled: boolean;
  obsMinAmountShow: string;    // Decimal as string
  
  // Mayar Integration
  mayarApiKey?: string;        // Encrypted
  mayarMode: "sandbox" | "production";
  
  // Stats
  totalDonations: string;      // Decimal as string
  totalDonors: number;
  
  createdAt: Date;
  updatedAt: Date;
}
```

---

**Related:**
- [Donation API](./DONATION.md)
- [Authentication](./AUTHENTICATION.md)
