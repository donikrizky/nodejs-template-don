# Define Base Image
FROM playcourt/nodejs:22-alpine
USER root
# Install LibreOffice & Common Fonts
RUN apk --no-cache add bash
RUN apk --no-cache add libreoffice
RUN apk --no-cache add util-linux
RUN apk --no-cache add font-droid-nonlatin
RUN apk --no-cache add font-droid
RUN apk --no-cache add ttf-dejavu
RUN apk --no-cache add ttf-freefont
RUN apk --no-cache add ttf-liberation
RUN apk --no-cache add libcrypto3=3.1.4-r6
RUN apk --no-cache add libssl3=3.1.4-r6
RUN rm -rf /var/cache/apk/*

WORKDIR /usr/src/app
COPY package*.json ./
COPY --chown=user:root . .
RUN chmod -R 0775 bin/hasil_template/
RUN npm i --omit=dev && npm cache clean --force
USER user
EXPOSE 9000
CMD ["npm", "start"]

# # Build stage
# FROM playcourt/nodejs:14-alpine as builder
# WORKDIR /usr/src/app
# USER root
# COPY package*.json ./
# RUN npm install --omit=dev && npm cache clean --force
# COPY . .

# # Final stage
# FROM playcourt/nodejs:14-alpine
# WORKDIR /usr/src/app
# USER root
# COPY --from=builder /usr/src/app .
# USER user
# EXPOSE 9000
# CMD ["npm", "start"]
