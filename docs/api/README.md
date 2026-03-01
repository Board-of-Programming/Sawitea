# 🔌 API Reference

Dokumentasi lengkap API Sawitea.

## 📚 Endpoints Overview

### Authentication
- [Authentication](./AUTHENTICATION.md) - Better Auth endpoints

### Core Features
- [Donation API](./DONATION.md) - Donation creation & management
- [Streamer API](./STREAMER.md) - Streamer profile & settings

### Real-time
- [WebSocket Events](./WEBSOCKET.md) - Real-time communication

## 🌐 Base URL

```
Development: http://localhost:3001
Production:  https://api.sawitea.id
```

## 🔐 Authentication

Most endpoints require authentication via session cookie.

```http
GET /api/protected-endpoint
Cookie: better-auth.session=xxx
```

Or use Bearer token (if configured):
```http
Authorization: Bearer <token>
```

## 📋 Response Format

### Success Response
```json
{
  "data": { /* response data */ },
  "message": "Success message (optional)"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

## 🔄 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Not authenticated |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

## 🧪 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3001/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Create Donation
```bash
curl -X POST http://localhost:3001/donation/johndoe \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "donorName": "Jane Doe",
    "donorEmail": "jane@example.com",
    "donorMessage": "Great stream!"
  }'
```

### Get Streamer Profile
```bash
curl http://localhost:3001/streamer/profile/johndoe
```

## 📦 Postman Collection

Import collection dari:
```
docs/api/postman/sawitea-api-collection.json
```

## 🔌 WebSocket Connection

```javascript
const socket = io("ws://localhost:3001/donations");

socket.emit("join-streamer", "streamer-id");

socket.on("new-donation", (data) => {
  console.log("New donation:", data);
});
```

---

**Related:**
- [System Overview](../architecture/SYSTEM_OVERVIEW.md)
- [Getting Started](../guides/GETTING_STARTED.md)
