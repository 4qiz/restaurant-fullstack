FROM node:20.12.0-alpine3.19 AS dependencies
WORKDIR /restaurant
COPY package.json ./
RUN npm install

FROM node:20.12.0-alpine3.19 AS builder
WORKDIR /restaurant
COPY . .
COPY --from=dependencies /restaurant/node_modules ./node_modules

# build time variables
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG NEXT_PUBLIC_DADATA_TOKEN
ENV NEXT_PUBLIC_DADATA_TOKEN=${NEXT_PUBLIC_DADATA_TOKEN}

ARG NEXT_PUBLIC_ORDER_SERVICE_URL
ENV NEXT_PUBLIC_ORDER_SERVICE_URL=${NEXT_PUBLIC_ORDER_SERVICE_URL}

RUN npx prisma generate && npm run build
##RUN npx prisma generate && npx prisma db push && npx prisma db seed && npm run build

FROM node:20.12.0-alpine3.19 AS runner
WORKDIR /restaurant
ENV NODE_ENV production

COPY --from=builder /restaurant/public ./public
COPY --from=builder /restaurant/package.json ./package.json
COPY --from=builder /restaurant/.next ./.next
COPY --from=builder /restaurant/node_modules ./node_modules

EXPOSE 3001
CMD ["npm", "start"]

