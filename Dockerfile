FROM node:lts as dependencies
WORKDIR /blow-web
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /blow-web
COPY . .
COPY --from=dependencies /blow-web/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /blow-web
ENV NODE_ENV production

COPY --from=builder /blow-web/public ./public
COPY --from=builder /blow-web/package.json ./package.json
COPY --from=builder /blow-web/.next ./.next
COPY --from=builder /blow-web/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]