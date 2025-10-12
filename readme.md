# 🍽️ Fullstack Restaurant Order System

A full-featured restaurant management system with a client-facing web app and an admin panel.
Built with Next.js 15, .NET 8.0, PostgreSQL, Docker, and MinIO S3.

---

## 🚀 Features

- .NET 8.0 REST API — order management service
- Admin Panel (Next.js 15) — manage menu, orders, and users
- Restaurant Frontend (Next.js 15) — customer-facing web app for placing orders
- PostgreSQL — main relational database
- MinIO S3 — object storage for dish photos and media files
- Docker Compose — easy deployment with a single command

---

## Setup 

1. Setup backend

```bash
cd backend/api
docker-compose up --build
```

2. Setup Minio S3


Open minio console in 9001 port



Set up the access keys



Create bucket and add access policy



```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": ["*"]
      },
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::bucket-name", "arn:aws:s3:::bucket-name/*"]
    }
  ]
}
```



3. Setup frontend

```bash
cd frontend
docker-compose up --build
```

4. Service Access

| Service               | URL                                                            |
| --------------------- | -------------------------------------------------------------- |
| Restaurant App     | [http://localhost:3001](http://localhost:3001)                 |
|  Admin Panel     | [http://localhost:3000](http://localhost:3000)                 |
|  Order API (.NET 8) | [http://localhost:8080/swagger](http://localhost:8080/swagger) |
|  MinIO Console      | [http://localhost:9001](http://localhost:9001)                 |
| PostgreSQL        | localhost:5432                                                 |



flowchart LR
  subgraph Frontend
    A1[Restaurant App] -->|HTTP| B[Order API]
    A2[Admin Panel] -->|HTTP| B
  end

  subgraph Backend
    B[Order API (.NET 8)]
    D[(PostgreSQL)]
    E[(MinIO S3)]
  end

  B --> D
  B --> E
