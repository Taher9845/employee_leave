# Employee Leave Backend

## Setup

1. Copy `.env.example` to `.env` and fill values (do not commit `.env`).
2. `npm install`
3. `npm run dev`

## APIs
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/leaves
- GET /api/leaves/my-requests
- DELETE /api/leaves/:id
- GET /api/leaves/balance
- GET /api/leaves/all (manager)
- GET /api/leaves/pending (manager)
- PUT /api/leaves/:id/approve (manager)
- PUT /api/leaves/:id/reject (manager)
