# 💰 Donation API

API endpoints untuk mengelola donasi.

## 📋 Endpoints

### Create Donation

Membuat donasi baru untuk streamer.

```http
POST /donation/:username
```

#### URL Parameters
| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| username  | string | Username streamer    |

#### Request Body
```typescript
{
  amount: number;        // Min: 1000, Max: 10000000
  donorName: string;     // Max: 50 chars
  donorEmail: string;    // Valid email
  donorMessage?: string; // Max: 500 chars
  isAnonymous?: boolean; // Default: false
}
```

#### Response
```json
{
  "donation": {
    "id": "uuid",
    "streamerId": "uuid",
    "donorName": "Jane Doe",
    "donorEmail": "jane@example.com",
    "donorMessage": "Great stream!",
    "amount": "50000",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "paymentUrl": "https://payment.mayar.id/..."
}
```

#### Example Request
```bash
curl -X POST http://localhost:3001/donation/johndoe \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "donorName": "Jane Doe",
    "donorEmail": "jane@example.com",
    "donorMessage": "Great stream!",
    "isAnonymous": false
  }'
```

#### Error Responses
```json
// 404 - Streamer not found
{
  "statusCode": 404,
  "message": "Streamer not found",
  "error": "Not Found"
}

// 400 - Invalid amount
{
  "statusCode": 400,
  "message": ["amount must not be less than 1000"],
  "error": "Bad Request"
}
```

---

### Get Donations by Streamer

Mendapatkan daftar donasi untuk streamer.

```http
GET /donation/:username?limit=20
```

#### URL Parameters
| Parameter | Type   | Description       |
|-----------|--------|-------------------|
| username  | string | Username streamer |

#### Query Parameters
| Parameter | Type   | Default | Description          |
|-----------|--------|---------|----------------------|
| limit     | number | 20      | Jumlah donasi        |

#### Response
```json
[
  {
    "id": "uuid",
    "streamerId": "uuid",
    "donorName": "Jane Doe",
    "donorEmail": "jane@example.com",
    "amount": "50000",
    "status": "completed",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

---

### Webhook Callback (Mayar.id)

Menerima notifikasi dari Mayar.id saat status pembayaran berubah.

```http
POST /donation/webhook/mayar
```

#### Headers
| Header              | Description                   |
|---------------------|-------------------------------|
| x-mayar-signature   | Signature untuk verifikasi    |

#### Request Body
```json
{
  "event": "payment.paid",
  "data": {
    "transactionId": "txn_xxx",
    "externalId": "donation-uuid",
    "status": "paid",
    "amount": 50000,
    "paymentMethod": "qris",
    "paidAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Events
| Event            | Description              |
|------------------|--------------------------|
| payment.paid     | Pembayaran berhasil      |
| payment.expired  | Pembayaran kadaluarsa    |
| payment.failed   | Pembayaran gagal         |
| payment.pending  | Menunggu pembayaran      |

#### Response
```json
{
  "received": true
}
```

---

### Payment Success Callback

Redirect setelah pembayaran berhasil (frontend redirect).

```http
GET /donation/callback/success?transactionId=xxx&externalId=yyy
```

#### Query Parameters
| Parameter     | Type   | Description              |
|---------------|--------|--------------------------|
| transactionId | string | Mayar transaction ID     |
| externalId    | string | Donation ID (internal)   |

#### Response
```json
{
  "success": true,
  "message": "Payment successful",
  "transactionId": "txn_xxx",
  "externalId": "donation-uuid"
}
```

---

## 🔄 Donation Status Flow

```
pending → [webhook: paid] → completed
   ↓
[webhook: expired] → expired
   ↓
[webhook: failed] → failed
```

## 📊 Database Schema

```typescript
interface Donation {
  id: string;
  streamerId: string;
  donorName: string;
  donorEmail: string;
  donorMessage?: string;
  isAnonymous: boolean;
  amount: string;           // Decimal as string
  status: "pending" | "processing" | "completed" | "failed" | "expired";
  mayarTransactionId?: string;
  mayarPaymentUrl?: string;
  mayarPaymentMethod?: string;
  paidAt?: Date;
  expiredAt?: Date;
  isDisplayed: boolean;     // For OBS overlay
  displayedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

**Related:**
- [Streamer API](./STREAMER.md)
- [WebSocket Events](./WEBSOCKET.md)
- [Database Schema](../architecture/DATABASE_SCHEMA.md)
