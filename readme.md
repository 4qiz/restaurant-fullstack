1. Go to ./backend

2. Make MiniO Bucket public, replace _your-bucket-name_

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
      "Resource": ["arn:aws:s3:::pickme", "arn:aws:s3:::pickme/*"]
    }
  ]
}
```
