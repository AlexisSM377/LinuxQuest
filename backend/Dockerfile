FROM node:20-alpine

# Instalar binarios necesarios para las misiones
RUN apk add --no-cache \
    bash \
    coreutils \
    findutils \
    grep \
    sed \
    gawk \
    procps \
    util-linux \
    iproute2 \
    net-tools \
    iputils \
    bind-tools \
    iptables \
    openssh-client \
    curl \
    less \
    gzip \
    tar \
    acl \
    shadow \
    sudo \
    mandoc \
    man-pages \
    usbutils \
    file \
    su-exec \
    tini

# Renombrar dmesg real para que el wrapper pueda llamarlo
RUN if [ -x /bin/dmesg ]; then mv /bin/dmesg /bin/dmesg.real; fi

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# Instalar mocks educativos en /usr/local/bin (alta prioridad en PATH)
# Comandos sin soporte en container + comandos administrativos peligrosos
RUN cp /app/sandbox-bin/* /usr/local/bin/ && \
    chmod 755 /usr/local/bin/journalctl \
              /usr/local/bin/auditctl \
              /usr/local/bin/ausearch \
              /usr/local/bin/semanage \
              /usr/local/bin/iptables \
              /usr/local/bin/lsusb \
              /usr/local/bin/dmesg \
              /usr/local/bin/sudo \
              /usr/local/bin/su \
              /usr/local/bin/useradd \
              /usr/local/bin/usermod \
              /usr/local/bin/groupadd \
              /usr/local/bin/groupdel \
              /usr/local/bin/userdel \
              /usr/local/bin/passwd \
              /usr/local/bin/visudo \
              /usr/local/bin/vi \
              /usr/local/bin/nano \
              /usr/local/bin/htop \
              /usr/local/bin/finger \
              /usr/local/bin/newgrp \
              /usr/local/bin/chage \
              /usr/local/bin/which \
              /usr/local/bin/locate \
              /usr/local/bin/lscpu \
              /usr/local/bin/lsblk \
              /usr/local/bin/hostnamectl \
              /usr/local/bin/free \
              /usr/local/bin/apropos \
              /usr/local/bin/whatis \
              /usr/local/bin/host \
              /usr/local/bin/nslookup \
              /usr/local/bin/last \
              /usr/local/bin/lastlog \
              /usr/local/bin/groups

# Crear usuario sandbox sin privilegios para ejecutar Node
RUN addgroup -S linuxquest -g 1001 && \
    adduser -S -D -H -u 1001 -G linuxquest -s /bin/bash sandbox && \
    chown -R sandbox:linuxquest /app && \
    mkdir -p /tmp/linuxquest-sandbox /tmp/linuxquest-audit && \
    chown -R sandbox:linuxquest /tmp/linuxquest-sandbox /tmp/linuxquest-audit && \
    chmod 700 /tmp/linuxquest-sandbox /tmp/linuxquest-audit

# Bloquear lectura de archivos sensibles del sistema desde el sandbox
RUN chmod 600 /etc/shadow 2>/dev/null || true && \
    chmod 640 /etc/passwd 2>/dev/null || true

USER sandbox

EXPOSE 3000

# Tini maneja señales correctamente y previene zombies
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/server.js"]
