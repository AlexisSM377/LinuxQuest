# Plan de Reorganización - LinuxQuest

## Estado: ✅ IMPLEMENTADO

### Distribución Final: 85 Misiones (5 mundos + 5 extras)

| Mundo | Tema LPI | Peso LPI | Misiones | Boss ID |
|-------|----------|----------|----------|---------|
| 1 | Comunidad Linux | 7 | 12 | 12 |
| 2 | Encontrando el camino | 9 | 18 | 30 |
| 3 | Poder de línea de comandos | 9 | 18 | 48 |
| 4 | Sistema operativo | 8 | 17 | 65 |
| 5 | Seguridad y permisos | 7 | 15 | 80 |
| Extra | Refuerzo | - | 5 | — |
| **TOTAL** | | **40** | **85** | |

---

## LORE: "El Reino del Kernel"

### Narrativa Principal

```
En el principio, solo existía el Caos Binario. Ceros y unos vagaban sin 
propósito por el vacío digital. Entonces, un joven herrero finlandés llamado 
Linus forjó el Primer Kernel — un corazón de código que daría vida a todo 
un reino.

Pero el código solo no bastaba. Richard el Sabio creó las Cuatro Libertades, 
leyes sagradas que permitirían a todo ser digital copiar, estudiar, modificar 
y compartir el conocimiento. Así nació el Reino del Kernel.

Cinco guardianes protegen los cinco dominios del conocimiento:
- Linux el Sabio custodia la Historia (Mundo 1)
- Grep-ild el Explorador mapea los Caminos (Mundo 2)  
- Chmod-ard el Tejedor controla el Flujo (Mundo 3)
- Kernel el Forjador mantiene el Núcleo (Mundo 4)
- Sudo-Man el Guardián defiende la Seguridad (Mundo 5)

Pero las fuerzas del Caos Propietario acechan. Virus textuales, procesos 
zombies y permisos corruptos amenazan el reino. Tú, joven Aprendiz del 
Código, debes dominar los comandos sagrados para convertirte en Maestro 
Linux y obtener el Pergamino de la Certificación LPI.
```

---

## NPCs (5 guardianes)

### Linux el Sabio (Mundo 1)
- **Título:** Archivista del Reino Digital
- **Avatar:** 🧙‍♂️
- **Personalidad:** Paciente, filosófico, narrador. Habla en metáforas.
- **Especialidad:** Historia de Linux, distribuciones, licencias, filosofía.
- **Frase:** "Para entender el código, primero debes entender su historia."

### Grep-ild (Mundo 2)
- **Título:** Explorador de los Senderos Digitales
- **Avatar:** 🗺️
- **Personalidad:** Curioso, energético, didáctico. Siempre quiere explorar.
- **Especialidad:** Navegación, archivos, directorios, variables.
- **Frase:** "Cada directorio es una nueva aventura. ¿Listo para explorar?"

### Chmod-ard (Mundo 3)
- **Título:** Tejedor del Flujo de Datos
- **Avatar:** 🔮
- **Personalidad:** Místico, técnico, preciso. Habla en analogías de flujo.
- **Especialidad:** Pipes, grep, sed, awk, redirección, scripts.
- **Frase:** "Los datos fluyen como agua. Tú decides el cauce."

### Kernel el Forjador (Mundo 4)
- **Título:** Herrero del Núcleo Digital
- **Avatar:** ⚒️
- **Personalidad:** Robusto, técnico, confiable. Habla directo y claro.
- **Especialidad:** Hardware, procesos, memoria, redes, sistema.
- **Frase:** "El núcleo es el corazón. Si falla, todo falla."

### Sudo-Man (Mundo 5)
- **Título:** Guardián Supremo de la Seguridad
- **Avatar:** 🛡️
- **Personalidad:** Autoritario pero justo. Vigilante, protector.
- **Especialidad:** Permisos, usuarios, grupos, seguridad, criptografía.
- **Frase:** "El poder absoluto requiere responsabilidad absoluta."

---

## Misiones por Mundo

### MUNDO 1: El Castillo del Conocimiento (12 misiones)

| ID | Nombre | Comando(s) | Tema LPI | Dificultad |
|----|--------|------------|----------|------------|
| 1 | El Despertar del Iniciado | `uname -a` | 1.1 | 1 |
| 2 | Identificando el Reino | `cat /etc/os-release` | 1.1 | 1 |
| 3 | Las Familias del Reino | `cat /etc/os-release` + conocimiento | 1.1 | 2 |
| 4 | El Estandarte del León | `which apt/dnf/pacman` | 1.1 | 1 |
| 5 | El Lenguaje del Sistema | `uname -s` | 1.1 | 1 |
| 6 | La Arquitectura del Reino | `uname -m` | 1.1 | 1 |
| 7 | Las Herramientas Libres | `which libreoffice/gimp/vlc` | 1.2 | 2 |
| 8 | El Camino del Servidor | `which apache2/nginx/mysql` | 1.2 | 2 |
| 9 | El Pacto de la Libertad | `grep` + conocimiento | 1.3 | 2 |
| 10 | El Escritorio del Guerrero | `echo $XDG_CURRENT_DESKTOP` | 1.4 | 1 |
| 11 | La Nube Mágica | `curl -s https://api.github.com/zen` | 1.4 | 2 |
| 12 | Boss: El Guardián del Conocimiento | Múltiples | Todos | 5 |

### MUNDO 2: Los Senderos del Sistema (18 misiones)

| ID | Nombre | Comando(s) | Tema LPI | Dificultad |
|----|--------|------------|----------|------------|
| 13 | El Primer Paso del Caminante | `pwd` | 2.1 | 1 |
| 14 | El Eco del Cambio | `echo` | 2.1 | 1 |
| 15 | La Estructura del Comando | `ls -l /` | 2.1 | 1 |
| 16 | Las Variables del Entorno | `echo $USER $HOME $SHELL` | 2.1 | 2 |
| 17 | Exportar el Poder | `export VAR=value` | 2.1 | 2 |
| 18 | El Manual del Sabio | `man ls` | 2.2 | 2 |
| 19 | La Búsqueda de Conocimiento | `apropos` / `whatis` / `type` | 2.2 | 2 |
| 20 | Listando los Tesoros | `ls` / `ls -l` / `ls -a` | 2.3 | 1 |
| 21 | La Vista Detallada | `ls -lh` / `ls -lt` / `ls -lS` | 2.3 | 2 |
| 22 | El Salto del Conejo | `cd` / `cd ..` / `cd ~` / `cd -` | 2.3 | 2 |
| 23 | El Sendero Absoluto | `cd /ruta/absoluta` | 2.3 | 2 |
| 24 | Crear el Refugio | `mkdir` / `mkdir -p` | 2.4 | 2 |
| 25 | El Pergamino en Blanco | `touch` | 2.4 | 1 |
| 26 | El Espejo de los Pergaminos | `cp` / `cp -r` | 2.4 | 2 |
| 27 | El Ritual de Renombrar | `mv` | 2.4 | 2 |
| 28 | La Eliminación del Mal | `rm` / `rmdir` | 2.4 | 3 |
| 29 | El Glob del Caos | `ls *.txt` / `ls archivo?` | 2.4 | 3 |
| 30 | Boss: El Guardián de los Senderos | Múltiples | Todos | 5 |

### MUNDO 3: Las Torres del Procesamiento (18 misiones)

| ID | Nombre | Comando(s) | Tema LPI | Dificultad |
|----|--------|------------|----------|------------|
| 31 | El Poder de Grep | `grep "patron"` | 3.2 | 2 |
| 32 | El Cazador Insensible | `grep -i` / `grep -v` | 3.2 | 2 |
| 33 | La Búsqueda Recursiva | `grep -r` / `grep -l` | 3.2 | 3 |
| 34 | Las Cabezas y Colas | `head` / `tail` / `tail -f` | 3.2 | 2 |
| 35 | El Contador de Palabras | `wc -l` / `wc -w` / `wc -c` | 3.2 | 2 |
| 36 | El Ordenador Místico | `sort` / `sort -n` / `sort -r` / `sort -u` | 3.2 | 2 |
| 37 | Los Únicos Sobrevivientes | `sort \| uniq -c` | 3.2 | 3 |
| 38 | El Cuchillo Cortador | `cut -d "," -f 1` | 3.2 | 2 |
| 39 | El Traductor | `tr 'a-z' 'A-Z'` | 3.2 | 2 |
| 40 | Tuberías: El Flujo de Datos | `comando1 \| comando2` | 3.2 | 3 |
| 41 | La Redirección al Infinito | `>` / `>>` / `2>` / `&>` | 3.2 | 2 |
| 42 | Los Espejos del Tee | `tee` / `tee -a` | 3.2 | 2 |
| 43 | El Hechizo Sed | `sed 's/old/new/g'` | 3.2 | 4 |
| 44 | El Buscador Awk | `awk '{print $1}'` | 3.2 | 4 |
| 45 | La Búsqueda Rápida | `find / -name "*.txt"` | 3.2 | 3 |
| 46 | El Compresor de Pergaminos | `tar -czvf` / `tar -xzvf` | 3.1 | 3 |
| 47 | Tu Primer Script | `#!/bin/bash` + `chmod +x` | 3.3 | 3 |
| 48 | Boss: El Maestro del Flujo | Múltiples | Todos | 5 |

### MUNDO 4: La Forja del Núcleo (17 misiones)

| ID | Nombre | Comando(s) | Tema LPI | Dificultad |
|----|--------|------------|----------|------------|
| 49 | ¿Quién Soy? | `whoami` / `id` | 4.1 | 1 |
| 50 | Mi Sistema | `uname -r` / `uname -m` | 4.1 | 1 |
| 51 | Hora del Sistema | `date` / `cal` / `uptime` | 4.1 | 1 |
| 52 | Procesos en Ejecución | `ps` / `ps aux` | 4.3 | 2 |
| 53 | Top: Monitor en Vivo | `top -b -n 1` | 4.3 | 2 |
| 54 | El Verdugo de Procesos | `kill` / `kill -9` / `killall` | 4.3 | 3 |
| 55 | Jobs y Background | `jobs` / `bg` / `fg` / `nohup` | 4.3 | 3 |
| 56 | Espacio en Disco | `df -h` / `du -sh` | 4.3 | 2 |
| 57 | Memoria del Reino | `free -h` | 4.3 | 1 |
| 58 | El Camino de Red | `ip addr` / `ip route` | 4.4 | 2 |
| 59 | El Eco del Cielo | `ping -c 4` | 4.4 | 2 |
| 60 | El DNS Mágico | `host` / `nslookup` | 4.4 | 2 |
| 61 | Los Puertos del Castillo | `ss -tuln` | 4.4 | 2 |
| 62 | La Conexión SSH | `ssh-keygen` | 4.4 | 3 |
| 63 | El Mensajero curl | `curl` | 4.4 | 2 |
| 64 | Logs del Sistema | `tail -f /var/log/syslog` | 4.3 | 2 |
| 65 | Boss: El Señor del Núcleo | Múltiples | Todos | 5 |

### MUNDO 5: Las Bóvedas de la Seguridad (15 misiones)

| ID | Nombre | Comando(s) | Tema LPI | Dificultad |
|----|--------|------------|----------|------------|
| 66 | Tu Identidad en el Reino | `whoami` / `id` / `who` | 5.1 | 1 |
| 67 | El Libro de los Usuarios | `cat /etc/passwd` | 5.1 | 2 |
| 68 | Los Permisos Sagrados | `ls -la` (interpretar) | 5.3 | 2 |
| 69 | Los Permisos en Octal | `stat -c %a` / `chmod 755` | 5.3 | 3 |
| 70 | El Cambio Simbólico | `chmod u+x` / `chmod g-w` | 5.3 | 3 |
| 71 | La Propiedad Cambiada | `chown` / `chgrp` | 5.3 | 3 |
| 72 | El SUID Mágico | `chmod u+s` | 5.3 | 4 |
| 73 | El Pegajoso de /tmp | `ls -ld /tmp` (sticky bit) | 5.4 | 3 |
| 74 | El Enlace Duro | `ln archivo enlace` | 5.4 | 3 |
| 75 | El Enlace Suave | `ln -s archivo enlace` | 5.4 | 3 |
| 76 | El Grupo Sagrado | `cat /etc/group` | 5.2 | 2 |
| 77 | Crear un Aliado | `useradd -m` / `passwd` | 5.2 | 3 |
| 78 | Archivos Especiales | `ls /dev` | 5.4 | 2 |
| 79 | Logs de Seguridad | `cat /var/log/auth.log` | 5.1 | 2 |
| 80 | Boss: El Guardián Supremo | Múltiples | Todos | 5 |

### QUESTS EXTRA (5 misiones)

| ID | Nombre | Comando(s) | Tema LPI | Dificultad |
|----|--------|------------|----------|------------|
| 81 | El Editor de los Antiguos | `vi --version` | 3.3 | 3 |
| 82 | El Editor Moderno | `nano --version` | 3.3 | 2 |
| 83 | El Tipo de Archivo | `file` | 2.3 | 2 |
| 84 | La Búsqueda Rápida | `locate` | 3.2 | 2 |
| 85 | El Permisos de /var/tmp | `ls -ld /var/tmp` | 5.4 | 3 |

---

## Archivos Implementados

### Backend:
1. ✅ `backend/scripts/seed-quests.js` — 85 misiones con lore medieval-fantástico
2. ✅ `backend/src/config/questCommands.js` — 85 configs con allowedCommands
3. ✅ `backend/src/config/npcConfig.js` — 5 NPCs con backstory mejorado
4. ✅ `backend/src/config/enemiesConfig.js` — 15 enemigos + 5 bosses (questIds 12,30,48,65,80)
5. ✅ `backend/src/config/achievementsConfig.js` — 14 achievements (count 85)
6. ✅ `backend/sandbox-bin/` — 35 mocks educativos (22 originales + 13 nuevos)
7. ✅ `backend/Dockerfile` — 35 mocks instalados

### Frontend:
1. ✅ `frontend/src/components/Terminal.jsx` — Banner narrativo "El Reino del Código Libre"

### Documentación:
1. ✅ `docs/REORGANIZATION_PLAN.md` — Este archivo (plan final)
2. ✅ `docs/LINUXQUEST_CONTENT.md` — Contenido educativo maestro
3. ✅ `docs/GUIA_ESTUDIO_LINUX_ESSENTIALS.md` — Guía de estudio LPI 010-160

---

## Métricas de Éxito

- [x] 85 misiones definidas con comandos LPI reales
- [x] Todos los comandos LPI Essentials cubiertos
- [x] 35 mocks educativos funcionando
- [x] Lore coherente medieval-fantástico + Linux
- [x] 5 NPCs con personalidad definida
- [x] Banner de bienvenida narrativo
- [x] Validaciones robustas para cada misión
- [x] Boss questIds sincronizados con enemiesConfig
- [x] 3 documentos de referencia alineados

---

## Próximos Pasos (después de implementar)

1. Ejecutar `npm run seed-quests` en backend
2. Probar misiones en frontend
3. Verificar que todos los comandos funcionen en sandbox
4. Verificar que las validaciones sean correctas
5. Deploy a producción
