FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY . /usr/share/nginx/html/

RUN rm -rf /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/nginx.conf \
           /usr/share/nginx/html/vercel.json \
           /usr/share/nginx/html/failover.yaml \
           /usr/share/nginx/html/README.md \
           /usr/share/nginx/html/LICENSE \
           /usr/share/nginx/html/.git \
           /usr/share/nginx/html/.dockerignore

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -q --spider http://127.0.0.1:8080/favicon.ico || exit 1
