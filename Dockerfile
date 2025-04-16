FROM node:20-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /stoodo
COPY package*.json ./

FROM base as builder
WORKDIR /stoodo
COPY . .
RUN npm install
RUN npm run build


FROM base as production
WORKDIR /stoodo

ENV NODE_ENV=production
RUN npm ci

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs


COPY --from=builder --chown=nextjs:nodejs /stoodo/.next ./.next
COPY --from=builder /stoodo/node_modules ./node_modules
COPY --from=builder /stoodo/package.json ./package.json
COPY --from=builder /stoodo/public ./public

CMD npm start
