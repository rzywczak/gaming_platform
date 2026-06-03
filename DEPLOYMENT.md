# Deployment

Recommended setup: deploy the Node server and serve the React build from `server/public`.

## Build command

```sh
npm run build
```

## Start command

```sh
npm start
```

## Required server environment variables

- `PORT` - provided by most hosts; local default is `5000`.
- `MONGO_URL` - MongoDB connection string.
- `JWT_SECRET` - long random secret used for JWT signing.
- `CORS_ORIGINS` - comma-separated external frontend origins when the frontend is hosted separately.

## Optional client build variables

- `REACT_APP_API_URL` - full API origin when the frontend is hosted separately. Leave empty for same-origin Node hosting.
- `REACT_APP_SOCKET_URL` - Socket.IO backend origin when hosted separately. Leave empty for same-origin Node hosting.

## Render free web service

1. Commit and push this repository to GitHub.
2. In Render, create a new Web Service from the GitHub repository.
3. Use:
   - Runtime: `Node`
   - Build command: `npm run build`
   - Start command: `npm start`
   - Node version: `20.18.0`
4. Add environment variables:
   - `MONGO_URL=mongodb+srv://USER:PASSWORD@HOST/gaming_platform?retryWrites=true&w=majority&appName=Cluster0`
   - `JWT_SECRET=replace-with-a-long-random-secret`
   - `CORS_ORIGINS=https://YOUR-RENDER-SERVICE.onrender.com`
5. In MongoDB Atlas, allow network access for the Render service. For a free Render instance with dynamic outbound IP, `0.0.0.0/0` is the simplest option for testing, but a fixed trusted IP is safer for production.
6. Deploy. After Render gives you the final `onrender.com` URL, update `CORS_ORIGINS` to that exact URL and redeploy.
