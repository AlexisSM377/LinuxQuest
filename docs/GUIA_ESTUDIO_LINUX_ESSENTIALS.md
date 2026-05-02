# 📘 Guía de Estudio LPI Linux Essentials 010-160

> Resumen completo y detallado del manual oficial LPI · ~80 horas de contenido condensadas para certificación · Versión 1.6

---

## 📋 Índice

- [Información del examen](#información-del-examen)
- [Tabla de pesos por tema](#tabla-de-pesos-por-tema)
- [TEMA 1: Comunidad Linux y código abierto](#tema-1-comunidad-linux-y-código-abierto-peso-7)
- [TEMA 2: Encontrando el camino](#tema-2-encontrando-el-camino-peso-9-más-importante)
- [TEMA 3: Poder de la línea de comandos](#tema-3-poder-de-la-línea-de-comandos-peso-9)
- [TEMA 4: Sistema operativo Linux](#tema-4-sistema-operativo-linux-peso-8)
- [TEMA 5: Seguridad y permisos](#tema-5-seguridad-y-permisos-peso-7)
- [Comandos esenciales (cheatsheet)](#cheatsheet-comandos-esenciales)
- [Estrategia de estudio](#estrategia-de-estudio-recomendada)
- [Trampas comunes del examen](#trampas-comunes-del-examen)

---

## Información del examen

| Dato | Valor |
|------|-------|
| **Código** | 010-160 |
| **Versión** | 1.6 |
| **Duración** | 60 minutos |
| **Preguntas** | 40 |
| **Aprobación** | 500/800 (~62%) |
| **Tipos** | Opción múltiple y rellenar |
| **Validez** | De por vida |
| **Idiomas** | Inglés, español, alemán, japonés, portugués |

**Examina pre-requisito:** Ninguno. Ideal para principiantes.

---

## Tabla de pesos por tema

El "peso" indica cuántas preguntas aproximadas saldrán de cada subtema. Suma total = 40 puntos.

```
TEMA 1: Comunidad Linux                    Peso total: 7
├─ 1.1 Sistemas operativos populares       Peso 2
├─ 1.2 Aplicaciones de código abierto      Peso 2
├─ 1.3 Software libre y licencias          Peso 1
└─ 1.4 Destrezas TIC                       Peso 2

TEMA 2: Encontrando el camino              Peso total: 9 ← MÁS IMPORTANTE
├─ 2.1 Línea de comandos básica            Peso 3
├─ 2.2 Ayuda en línea de comandos          Peso 2
├─ 2.3 Directorios y listado de archivos   Peso 2
└─ 2.4 Crear, mover y borrar archivos      Peso 2

TEMA 3: Poder de la línea de comandos      Peso total: 9
├─ 3.1 Archivar ficheros                   Peso 2
├─ 3.2 Buscar y extraer datos              Peso 3
└─ 3.3 Scripts sencillos                   Peso 4 ← Tema individual más pesado

TEMA 4: Sistema operativo Linux            Peso total: 8
├─ 4.1 Elección del sistema operativo      Peso 1
├─ 4.2 Conocer el hardware                 Peso 2
├─ 4.3 Donde se almacenan los datos        Peso 3
└─ 4.4 Tu ordenador en la red              Peso 2

TEMA 5: Seguridad y permisos               Peso total: 7
├─ 5.1 Seguridad básica e identificación   Peso 2
├─ 5.2 Crear usuarios y grupos             Peso 2
├─ 5.3 Gestión de permisos                 Peso 2
└─ 5.4 Directorios y archivos especiales   Peso 1
```

**Estrategia:** Domina Temas 2 y 3 (peso 18 = 45% del examen). Estos son los que más cuentan.

---

# TEMA 1: Comunidad Linux y código abierto (peso 7)

## 1.1 Sistemas operativos populares y evolución de Linux (peso 2)

### Historia clave

- **1991**: Linus Torvalds (estudiante finlandés) crea Linux inspirado en Unix (1970s, AT&T Bell Labs).
- Linux NO contiene código de Unix — es un proyecto independiente.
- Mantenido por **comunidad internacional** de programadores, no una empresa.
- Disponible **gratuitamente** sin restricciones.

### Distribuciones (¡súper importantes para el examen!)

Una **distribución** = kernel Linux + selección de aplicaciones + herramientas de instalación/administración.

#### Familia Debian (gestor: `dpkg`, formato: `.deb`)
| Distro | Características |
|--------|-----------------|
| **Debian GNU/Linux** | La más grande de la familia. Lanzada 1993 por Ian Murdock. Solo software libre por defecto. Muy estable. |
| **Ubuntu** | Creada en 2004 por Mark Shuttleworth. Fácil de usar. Lanzamientos cada 6 meses, **LTS cada 2 años**. |
| **Linux Mint** | Basada en Ubuntu. Familiar para usuarios de Windows. |
| **Kali Linux** | Para pruebas de penetración y seguridad. |

#### Familia Red Hat (gestor: `rpm`, `yum`/`dnf`, formato: `.rpm`)
| Distro | Características |
|--------|-----------------|
| **RHEL** (Red Hat Enterprise Linux) | Comercial. Adquirida por IBM en 2019. Para servidores empresariales. |
| **CentOS** | Compilada del código fuente de RHEL. Gratuita pero **sin soporte comercial**. |
| **Fedora** | Mantenida por Red Hat. Para escritorio. **Banco de pruebas** para tecnologías que luego entran a RHEL. |

#### Familia SUSE (gestor: `rpm`, `zypper`)
| Distro | Características |
|--------|-----------------|
| **SUSE Linux Enterprise Server** | Comercial. Empresa fundada en 1992 en Alemania. |
| **openSUSE** | Versión libre y abierta lanzada en 2004. |
| **YaST** | Herramienta característica de SUSE para configuración. |

### Sistemas embebidos

Combinación de hardware + software con función específica.

- **Android**: Sistema operativo móvil desarrollado por Google (adquirido en 2005). Usa **kernel Linux modificado** + componentes propietarios de Google (Play Store, Chrome, Maps).
- **Raspberry Pi**: Computadora del tamaño de tarjeta de crédito. Procesador **ARM**. Sistema desde tarjeta SD.
- **Raspbian**: Distribución basada en **Debian**, optimizada para Raspberry Pi. +35,000 paquetes.
- Otras: Kodi (centro multimedia), distros para Docker/contenedores.

**Examen tip:** Android usa kernel Linux MODIFICADO, no es Linux puro.

### Linux y Cloud Computing

- **90% de la carga de trabajo de la nube pública** corre Linux.
- Proveedores: **AWS, Azure, GCP** (todos ofrecen Linux).
- Linux generalmente se ofrece como **IaaS** (Infrastructure as a Service).
- Las **imágenes** son plantillas pre-instaladas que se despliegan en minutos.

**Ventajas del cloud computing:**
- Escalabilidad
- Pago por uso
- Alta disponibilidad
- Reducción de costes iniciales

---

## 1.2 Aplicaciones de código abierto (peso 2)

### Aplicaciones de escritorio principales

| Categoría | Software libre | Equivalente propietario |
|-----------|----------------|--------------------------|
| Suite ofimática | LibreOffice, Apache OpenOffice | Microsoft Office |
| Procesador de texto | LibreOffice Writer | Microsoft Word |
| Hoja de cálculo | LibreOffice Calc | Microsoft Excel |
| Presentaciones | LibreOffice Impress | Microsoft PowerPoint |
| Navegador | Firefox, Chromium | Chrome (Chromium-based pero con tracking) |
| Edición foto | GIMP | Photoshop |
| Vectores | Inkscape | Adobe Illustrator |
| 3D/Animación | Blender | 3DS Max, Maya |
| Audio | Audacity | Adobe Audition |
| Multimedia | VLC | Windows Media Player |

### Aplicaciones de servidor

- **Apache** y **Nginx**: servidores web
- **MySQL** y **PostgreSQL**: bases de datos relacionales
- **Postfix**, **Sendmail**, **Exim**: servidores de correo
- **Samba**: compartir archivos con Windows (CIFS/SMB)
- **NFS**: compartir archivos entre sistemas Unix/Linux
- **OpenSSH**: acceso remoto seguro
- **CUPS**: impresión

### Lenguajes de programación

- **C/C++**: bajo nivel, sistemas (Linux mismo está en C)
- **Python**: versátil, muy popular
- **Perl**: el padre de los scripts del sistema
- **PHP**: web dinámica
- **Java**: multiplataforma, empresarial
- **Bash**: shell scripting
- **Ruby, Go, Rust**: modernos

### Herramientas de gestión de paquetes

| Familia | Bajo nivel | Alto nivel |
|---------|------------|------------|
| Debian | `dpkg` | `apt`, `apt-get` |
| Red Hat | `rpm` | `yum`, `dnf` |
| SUSE | `rpm` | `zypper` |
| Universal | — | `snap`, `flatpak` |

**Comandos básicos `apt`:**
```bash
sudo apt update                # Actualiza lista de paquetes
sudo apt install paquete       # Instala
sudo apt remove paquete        # Desinstala
sudo apt search palabra        # Busca
sudo apt upgrade               # Actualiza todo
```

**Comandos básicos `yum`:**
```bash
sudo yum install paquete
sudo yum remove paquete
sudo yum search palabra
sudo yum update
```

---

## 1.3 Software libre y licencias (peso 1)

### Las 4 libertades del software libre (Stallman/FSF)

1. **Libertad 0**: Usar el programa para cualquier propósito
2. **Libertad 1**: Estudiar cómo funciona el programa y modificarlo (requiere acceso al código fuente)
3. **Libertad 2**: Distribuir copias para ayudar a otros
4. **Libertad 3**: Distribuir versiones modificadas

> Memorización rápida: **U**sar, **E**studiar, **D**istribuir, **M**odificar (UEDM)

### Open Source (OSI) vs Free Software (FSF)

| | FSF (Free Software) | OSI (Open Source) |
|---|---|---|
| Énfasis | Libertad y ética | Pragmatismo y desarrollo |
| Fundador | Richard Stallman (1985) | Eric Raymond (1998) |
| Filosofía | Software libre como derecho | Software abierto como modelo |
| Práctica | Misma cosa con diferente nombre | |

### Tipos de licencias

#### Copyleft (GPL family)
**Idea:** El software derivado DEBE permanecer libre.

- **GPL v2**: Linux la usa. Cualquiera puede modificar pero las modificaciones deben distribuirse bajo GPL.
- **GPL v3**: Versión moderna, cierra agujeros legales sobre patentes y DRM.
- **AGPL**: Como GPL pero también para servicios web (closes the "ASP loophole").
- **LGPL** (Lesser GPL): Para librerías. Permite enlazar desde software propietario.

#### Permisivas
**Idea:** Mucha libertad, incluso de hacer cierres comerciales.

- **MIT**: Mínimas restricciones. Solo conserva aviso de copyright.
- **BSD**: Similar a MIT (varias variantes: 2-cláusulas, 3-cláusulas, 4-cláusulas).
- **Apache 2.0**: Más detallada. Incluye cláusula explícita de patentes.

### Modelos de negocio del software libre

- **Soporte y servicios profesionales** (Red Hat)
- **Suscripciones empresariales**
- **Modelo "freemium"** (versión libre + premium)
- **Crowdfunding** y patrocinios
- **Hardware con software libre** (Raspberry Pi)

### Creative Commons

Para contenido NO software (textos, imágenes, música, video).

| Modificador | Significado |
|-------------|-------------|
| BY | Atribución (citar autor) |
| SA | Compartir igual (mismo tipo de licencia) |
| ND | Sin derivadas (no modificar) |
| NC | No comercial |

Ejemplo: **CC BY-NC-ND 4.0** = atribuye, no comercial, no modifiques.

---

## 1.4 Destrezas TIC y trabajo con Linux (peso 2)

### Interfaces gráficas (entornos de escritorio)

| Entorno | Características |
|---------|-----------------|
| **GNOME** | Predeterminado en Ubuntu, Fedora. Moderno, simple. |
| **KDE Plasma** | Configurable, potente, muchas opciones. |
| **XFCE** | Ligero, rápido, ideal para hardware antiguo. |
| **Cinnamon** | Mint. Familiar para usuarios de Windows. |
| **MATE** | Continuación de GNOME 2 clásico. |
| **LXDE/LXQt** | Ultra ligeros. |

### Privacidad en internet

**Cookies:** Pequeños archivos de seguimiento. Pueden usarse para tracking entre sitios.

**HTTPS:** Versión cifrada de HTTP. Obligatorio para datos sensibles. El candado en el navegador.

**VPN (Virtual Private Network):** Crea túnel cifrado. Oculta tu IP real.

**Tor:** Red de anonimato. Tráfico pasa por múltiples nodos cifrados. **Slow but very anonymous.**

### Cifrado (encriptación)

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Simétrico** | Misma llave para cifrar y descifrar | AES, DES |
| **Asimétrico** | Llave pública (cifrar) + privada (descifrar) | RSA, ECC |
| **Hash** | Función unidireccional. No se puede "descifrar" | SHA-256, MD5 |

**GPG/PGP:** Implementación práctica de criptografía asimétrica.
- Firmar archivos/emails
- Cifrar comunicaciones
- Verificar identidad

### Usos de Linux en la industria

- **Servidores web** (90%+ de internet corre Linux)
- **Supercomputación** (top 500: 100% Linux)
- **Cloud computing** (AWS, Azure, GCP)
- **Embebidos** (routers, smart TVs, IoT)
- **Móvil** (Android = Linux modificado)
- **Investigación científica**
- **Cine** (efectos especiales — DreamWorks, Pixar usan Linux)

---

# TEMA 2: Encontrando el camino (peso 9 - MÁS IMPORTANTE)

## 2.1 Línea de comandos básica (peso 3)

### Shells disponibles

- **Bash** (Bourne-Again Shell) — el más común en Linux
- **csh / tcsh** (C Shell)
- **ksh** (Korn Shell)
- **zsh** (Z Shell) — popular en macOS y power users
- **sh** (Bourne Shell) — el original

### Estructura del prompt

```
username@hostname:current_directory$
```

| Símbolo | Significado |
|---------|-------------|
| `~` | Directorio home del usuario |
| `$` | Usuario normal |
| `#` | Usuario root (superusuario) |

**Ejemplo Ubuntu/Debian:** `carol@mycomputer:~$`
**Ejemplo CentOS/RHEL:** `[dave@mycomputer ~]$`

### Estructura de un comando

```
comando [opciones/parámetros] [argumentos]
```

**Ejemplo:** `ls -l /home`
- `ls` = comando
- `-l` = opción (formato largo)
- `/home` = argumento

### Reglas de opciones

```bash
# Forma corta y larga son equivalentes
ls -l         # Corta
ls --format=long   # Larga

# Combinables (para opciones cortas)
ls -al        # Igual que -a -l
ls -a -l      # Igual que -al

# La mayoría tienen --help
ls --help
```

### Tipos de comandos

#### Internos (built-in)
- Son parte del shell mismo
- ~30 comandos
- Ejemplos: `cd`, `set`, `export`, `echo`, `pwd`, `unset`

#### Externos
- Archivos individuales en disco
- El shell los busca usando la variable `$PATH`
- Ejemplos: `ls`, `cat`, `grep`, `man`

#### Comando `type` (¡importante!)
```bash
$ type echo
echo is a shell builtin
$ type ls
ls is /usr/bin/ls
```

### Comillas (Quoting)

#### Comillas dobles `"..."`
- Interpreta texto como caracteres regulares
- **Conserva**: `$` (variables), `\` (escape), `` ` `` (backticks)
- Espacios pierden significado de separador

```bash
$ echo "I am $USER"
I am tom
```

#### Comillas simples `'...'`
- Texto literal **TODO** se conserva como texto
- **NO** expande variables ni nada

```bash
$ echo 'I am $USER'
I am $USER
```

#### Backslash `\`
- Escapa el siguiente carácter

```bash
$ echo \$USER
$USER
$ touch new\ file       # Crea archivo "new file"
```

### Variables

#### Variables locales
Solo viven en el shell actual.

```bash
$ greeting=hello
$ echo $greeting
hello
$ bash -c 'echo $greeting'   # Subshell no la ve
                              # (vacío)
```

#### Variables de entorno
Disponibles en subprocesos.

```bash
$ export greeting=hello
# o equivalente:
$ greeting=hello
$ export greeting

$ bash -c 'echo $greeting'
hello
```

#### Eliminar variables
```bash
$ unset greeting
```

#### Ver variables
```bash
env       # Solo variables de entorno
set       # Todas las variables (locales + entorno)
echo $VAR # Una específica
```

### La variable PATH (¡CRÍTICA!)

Lista de directorios separados por `:` donde se buscan comandos.

```bash
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

**Agregar directorio al PATH:**
```bash
$ PATH=$PATH:/home/user/bin
```

**El orden importa:** se ejecuta el primer match encontrado.

**Comando `which`** muestra dónde se encuentra un comando:
```bash
$ which ls
/usr/bin/ls
```

### Variables de entorno importantes

| Variable | Descripción |
|----------|-------------|
| `$PATH` | Dónde buscar ejecutables |
| `$HOME` | Directorio personal del usuario |
| `$USER` | Nombre del usuario actual |
| `$SHELL` | Shell del usuario |
| `$PWD` | Directorio de trabajo actual |
| `$EDITOR` | Editor de texto preferido |
| `$LANG` | Idioma/locale del sistema |
| `$HOSTNAME` | Nombre del equipo |
| `$TZ` | Zona horaria |

### Variables especiales

| Variable | Significado |
|----------|-------------|
| `$0` | Nombre del script |
| `$1`, `$2`... | Argumentos posicionales |
| `$#` | Número de argumentos |
| `$@` | Todos los argumentos como lista |
| `$*` | Todos los argumentos como string |
| `$?` | Código de salida del último comando |
| `$$` | PID del shell actual |

### Historia (history)

```bash
history              # Ver historial
history 10           # Últimos 10
!!                   # Repetir último comando
!5                   # Repetir comando #5
!grep                # Repetir último que empieza con grep
Ctrl+R               # Búsqueda inversa interactiva
```

---

## 2.2 Ayuda en línea de comandos (peso 2)

### Manual pages (`man`)

```bash
man ls               # Manual de ls
man -k palabra       # Buscar manuales por palabra clave
man -f comando       # Mostrar descripción corta
man 5 passwd         # Sección específica
```

### Secciones del manual

| Sección | Contenido |
|---------|-----------|
| 1 | Comandos de usuario |
| 2 | Llamadas al sistema (system calls) |
| 3 | Funciones de biblioteca |
| 4 | Dispositivos y archivos especiales |
| 5 | **Formatos de archivos** (ej: `/etc/passwd`) |
| 6 | Juegos |
| 7 | Convenciones miscellaneous |
| 8 | Comandos de administración |
| 9 | Rutinas del kernel |

**Ejemplo conflicto:** Existe `man passwd` (comando, sección 1) y `man 5 passwd` (formato del archivo, sección 5).

### Otros comandos de ayuda

```bash
info comando         # Documentación info (más extensa)
help comando         # Para builtins del shell
comando --help       # Help específico del comando
apropos palabra      # Igual que man -k
whatis comando       # Igual que man -f
```

### Localizando archivos

```bash
which comando        # Ruta del ejecutable
whereis comando      # Ejecutable + manuales + fuente
locate archivo       # Búsqueda rápida (DB pre-indexada)
sudo updatedb        # Actualiza la DB de locate
find /path -name "x" # Búsqueda recursiva en tiempo real
type comando         # Tipo (builtin/externo/alias)
```

### Documentación del sistema

| Ubicación | Contenido |
|-----------|-----------|
| `/usr/share/doc/` | Documentación de paquetes instalados |
| `/usr/share/man/` | Páginas de manual |
| `/usr/share/info/` | Páginas de info |

---

## 2.3 Directorios y listado de archivos (peso 2)

### Filesystem Hierarchy Standard (FHS)

Estructura jerárquica desde la raíz `/`.

| Directorio | Contenido |
|------------|-----------|
| `/` | **Raíz** del sistema |
| `/bin` | Binarios esenciales (`ls`, `cp`, `mv`...) |
| `/sbin` | Binarios de administración (`ifconfig`, `fdisk`...) |
| `/etc` | **Configuración** del sistema |
| `/home` | Directorios personales de usuarios |
| `/root` | Home del **root** (NO en /home) |
| `/tmp` | Archivos temporales (se borran al reiniciar) |
| `/var` | Datos variables (logs, mail, cola de impresión) |
| `/var/log` | Logs del sistema |
| `/usr` | Programas y datos de usuario |
| `/usr/bin` | Binarios de usuario adicionales |
| `/usr/local` | Software instalado localmente |
| `/opt` | Software opcional (paquetes de terceros) |
| `/proc` | Pseudo-FS con info de procesos y kernel |
| `/sys` | Pseudo-FS con info del sistema |
| `/dev` | **Archivos de dispositivos** |
| `/mnt` | Puntos de montaje temporales |
| `/media` | Medios extraíbles (USB, CD) |
| `/boot` | Kernel y bootloader (GRUB) |
| `/lib`, `/lib64` | Librerías compartidas esenciales |

### Nombres de archivos

**Reglas:**
- **Case-sensitive**: `archivo.txt` ≠ `Archivo.txt`
- Pueden contener letras, números, guiones, puntos, underscores
- **Evitar** espacios y caracteres especiales (`* ? & | ` `;` `$`)
- Archivos que empiezan con `.` están **ocultos** (`.bashrc`)
- Sin "extensión" obligatoria (a diferencia de Windows)

### Navegación

```bash
pwd                  # Print Working Directory (dónde estoy)
cd /path             # Cambiar a ruta absoluta
cd directorio        # Cambiar a ruta relativa
cd                   # Ir a $HOME
cd ~                 # Igual que cd
cd -                 # Volver al directorio anterior
cd ..                # Subir un nivel
cd ../..             # Subir dos niveles
cd ~usuario          # Home de otro usuario
```

### Rutas absolutas vs relativas

**Absoluta** (siempre comienza con `/`):
```bash
cd /home/carol/Documents
```

**Relativa** (depende de dónde estás):
```bash
cd Documents         # Si estás en /home/carol
cd ../tom            # Sube un nivel y entra a tom
cd ./scripts         # ./ = directorio actual
```

### Listado: `ls`

```bash
ls                   # Listado simple
ls -l                # Formato largo (long)
ls -a                # Incluye ocultos (all)
ls -la / -al         # Combinado largo + ocultos
ls -lh               # Tamaños humanos (K, M, G)
ls -lt               # Ordenado por tiempo
ls -lS               # Ordenado por tamaño
ls -lr               # Orden inverso
ls -R                # Recursivo
ls -d directorio     # Info del directorio (no su contenido)
ls /path/*.txt       # Con globbing
```

### Salida de `ls -l` desglosada

```
-rw-r--r-- 1 carol carol 1881 Dec 10 15:57 text.txt
│└─┬┘└┬┘└┬┘ │ └─┬─┘ └─┬─┘ └─┬┘ └────┬────┘ └──┬──┘
│  │  │  │  │   │     │     │       │         └── Nombre
│  │  │  │  │   │     │     │       └──────────── Fecha modificación
│  │  │  │  │   │     │     └──────────────────── Tamaño (bytes)
│  │  │  │  │   │     └────────────────────────── Grupo propietario
│  │  │  │  │   └──────────────────────────────── Usuario propietario
│  │  │  │  └──────────────────────────────────── Número de hard links
│  │  │  └─────────────────────────────────────── Permisos otros
│  │  └────────────────────────────────────────── Permisos grupo
│  └───────────────────────────────────────────── Permisos usuario
└──────────────────────────────────────────────── Tipo de archivo
```

### Tipos de archivos (primer carácter de `ls -l`)

| Carácter | Tipo |
|----------|------|
| `-` | Archivo normal |
| `d` | Directorio |
| `l` | Enlace simbólico (symlink) |
| `b` | Dispositivo de bloques |
| `c` | Dispositivo de caracteres |
| `s` | Socket |
| `p` | Pipe (FIFO) |

### Directorios especiales

| Símbolo | Significado |
|---------|-------------|
| `.` | Directorio actual |
| `..` | Directorio padre |
| `~` | Home del usuario actual |
| `~usuario` | Home de otro usuario |
| `-` | Directorio anterior (con `cd -`) |

---

## 2.4 Crear, mover y borrar archivos (peso 2)

### Crear

```bash
touch archivo.txt           # Crea archivo vacío (o actualiza fecha)
touch -t 202404271200 a.txt # Cambia fecha a 2024-04-27 12:00
mkdir directorio            # Crear directorio
mkdir -p a/b/c              # Crea ruta completa (-p = parents)
mkdir dir1 dir2 dir3        # Múltiples directorios
```

### Copiar

```bash
cp origen destino                 # Copiar archivo
cp -r dir_origen dir_destino      # Recursivo (directorios)
cp -i origen destino              # Pregunta antes sobrescribir
cp -p origen destino              # Preserva permisos y timestamps
cp -v origen destino              # Verbose (muestra qué hace)
cp file1 file2 directorio/        # Múltiples a destino
```

### Mover/Renombrar

```bash
mv origen destino                 # Mover (también renombra)
mv archivo.txt nuevo.txt          # Renombrar
mv archivo.txt /otro/lugar/       # Mover
mv -i origen destino              # Pregunta antes
mv -v origen destino              # Verbose
```

### Borrar

```bash
rm archivo.txt                    # Borrar archivo
rm -i archivo.txt                 # Pregunta antes
rm -f archivo.txt                 # Forzar (no preguntar)
rm -r directorio                  # Recursivo (directorio + contenido)
rm -rf directorio                 # ⚠️ ¡PELIGROSO! Recursivo + forzar
rmdir directorio                  # Solo borra directorio VACÍO
```

> **⚠️ ADVERTENCIA:** En Linux **no hay papelera de reciclaje** desde la línea de comandos. `rm` borra permanentemente.

### Globbing (patrones de archivos)

| Patrón | Significado |
|--------|-------------|
| `*` | Cualquier número de caracteres (incluso 0) |
| `?` | Exactamente un carácter |
| `[abc]` | Cualquier carácter dentro de los corchetes |
| `[a-z]` | Rango de caracteres |
| `[!abc]` | Cualquiera EXCEPTO los listados |
| `{a,b,c}` | Expansión de llaves (a OR b OR c) |

**Ejemplos:**
```bash
ls *.txt              # Todos los archivos .txt
ls archivo?.log       # archivo + 1 char + .log
ls [abc]*             # Empieza con a, b, o c
ls archivo[1-9]       # archivo1 hasta archivo9
ls *.{jpg,png}        # Todos los .jpg o .png
```

---

# TEMA 3: Poder de la línea de comandos (peso 9)

## 3.1 Archivar ficheros (peso 2)

### `tar` (Tape ARchiver) — el rey

**Opciones principales:**

| Opción | Significado |
|--------|-------------|
| `-c` | **C**reate (crear) |
| `-x` | E**x**tract (extraer) |
| `-t` | Lis**t** (listar contenido) |
| `-v` | **V**erbose |
| `-f` | **F**ilename (especifica archivo) |
| `-z` | Comprime con **g**z**i**p |
| `-j` | Comprime con **b**zip2 |
| `-J` | Comprime con xz |
| `-r` | Append (agregar) |
| `-u` | Update (actualizar) |

**Ejemplos clave (memoriza esto):**

```bash
# Crear archivo .tar (sin compresión)
tar -cvf backup.tar mis_archivos/

# Crear archivo .tar.gz (gzip)
tar -czvf backup.tar.gz mis_archivos/

# Crear archivo .tar.bz2 (bzip2, mejor compresión)
tar -cjvf backup.tar.bz2 mis_archivos/

# Extraer .tar
tar -xvf backup.tar

# Extraer .tar.gz
tar -xzvf backup.tar.gz

# Extraer .tar.bz2
tar -xjvf backup.tar.bz2

# Listar contenido (sin extraer)
tar -tvf backup.tar
```

### Compresión individual

#### gzip / gunzip
```bash
gzip archivo                # Comprime → archivo.gz
                            # ⚠️ ELIMINA el original
gzip -k archivo             # -k = keep, conserva original
gunzip archivo.gz           # Descomprime
gzip -d archivo.gz          # Igual que gunzip
zcat archivo.gz             # Lee sin descomprimir
```

#### bzip2 / bunzip2
```bash
bzip2 archivo               # → archivo.bz2 (mejor compresión que gzip, más lento)
bunzip2 archivo.bz2         # Descomprimir
bzcat archivo.bz2           # Lee sin descomprimir
```

#### xz / unxz
```bash
xz archivo                  # → archivo.xz (mejor compresión moderna)
unxz archivo.xz             # Descomprimir
xzcat archivo.xz            # Lee sin descomprimir
```

### zip / unzip (compatibilidad Windows)

```bash
zip archivo.zip file1 file2          # Crear zip
zip -r archivo.zip directorio/       # Recursivo
unzip archivo.zip                    # Extraer
unzip -l archivo.zip                 # Listar sin extraer
unzip -d /destino archivo.zip        # Extraer a destino
```

### Comparativa de compresión

| Formato | Velocidad | Compresión | Compatibilidad |
|---------|-----------|------------|----------------|
| zip | Rápido | Media | Universal (Windows) |
| gzip | Rápido | Buena | Linux/Unix |
| bzip2 | Lento | Muy buena | Linux/Unix |
| xz | Más lento | Excelente | Linux moderno |

---

## 3.2 Buscar y extraer datos (peso 3)

### Redirección

```bash
comando > archivo            # Stdout → archivo (sobrescribe)
comando >> archivo           # Stdout → archivo (append)
comando 2> error.log         # Stderr → archivo
comando &> all.log           # Stdout + Stderr al mismo archivo
comando > out 2> err         # Por separado
comando < archivo            # Stdin desde archivo
comando << EOF               # Heredoc
texto multilinea
EOF
```

**Numeración de file descriptors:**
- `0` = stdin (entrada)
- `1` = stdout (salida)
- `2` = stderr (errores)

**Tirar a la basura:**
```bash
comando > /dev/null          # Descartar stdout
comando 2> /dev/null         # Descartar stderr
comando &> /dev/null         # Descartar todo
```

### Pipes `|`

Conecta la salida de un comando con la entrada del siguiente.

```bash
ls -la | grep ".txt"                     # ls a grep
cat archivo.log | sort | uniq -c | sort -rn   # Encadenar
```

### `tee` — duplicar salida

Manda salida a archivo Y a pantalla simultáneamente.

```bash
ls | tee listado.txt          # Pantalla + archivo
ls | tee -a listado.txt       # Append en lugar de sobrescribir
```

### Comandos de procesamiento de texto

#### `cat`
```bash
cat archivo                  # Mostrar todo
cat archivo1 archivo2        # Concatenar (de ahí su nombre)
cat -n archivo               # Con números de línea
cat -A archivo               # Mostrar caracteres especiales
```

#### `less` / `more` (paginadores)
```bash
less archivo                 # Pager interactivo
                              # Espacio = página siguiente
                              # b = página anterior
                              # /palabra = buscar
                              # q = salir
more archivo                  # Pager simple (más antiguo)
```

#### `head` / `tail`
```bash
head archivo                 # Primeras 10 líneas
head -n 5 archivo            # Primeras 5
head -5 archivo              # Igual
tail archivo                 # Últimas 10 líneas
tail -n 20 archivo           # Últimas 20
tail -f archivo              # Follow (sigue en tiempo real)
tail -F archivo              # Follow + reabrir si rota
```

#### `wc` (Word Count)
```bash
wc archivo                   # líneas palabras bytes
wc -l archivo                # Solo líneas
wc -w archivo                # Solo palabras
wc -c archivo                # Solo bytes
wc -m archivo                # Caracteres (UTF-8)
```

#### `sort`
```bash
sort archivo                 # Ordena alfabéticamente
sort -r archivo              # Inverso
sort -n archivo              # Numérico (no alfabético)
sort -k 2 archivo            # Por segunda columna
sort -t ',' -k 2 archivo     # Separador coma, columna 2
sort -u archivo              # Único (ordena y elimina duplicados)
```

#### `uniq`
**⚠️ Solo funciona en líneas adyacentes ya ordenadas.**
```bash
uniq archivo                 # Elimina duplicados consecutivos
sort archivo | uniq          # Pattern típico
sort archivo | uniq -c       # Con conteo
sort archivo | uniq -d       # Solo duplicados
sort archivo | uniq -u       # Solo únicos
```

#### `cut`
```bash
cut -d ',' -f 1 archivo.csv  # Columna 1 separado por coma
cut -d ':' -f 1,3 /etc/passwd # Columnas 1 y 3
cut -c 1-10 archivo          # Caracteres 1 al 10
cut -c 5- archivo            # Desde el 5 en adelante
```

#### `tr` (translate)
**Solo lee de stdin** (usa pipes).
```bash
echo "hola" | tr 'a-z' 'A-Z'         # → HOLA
echo "h e l l o" | tr -d ' '         # Elimina espacios
cat archivo | tr -s ' '              # Squash espacios duplicados
echo "hello" | tr 'el' 'ip'          # h→h, e→i, l→p
```

### `grep` (¡el más usado del examen!)

```bash
grep "patrón" archivo                # Buscar
grep -i "patrón" archivo             # Case insensitive
grep -v "patrón" archivo             # Inverso (no contiene)
grep -r "patrón" directorio/         # Recursivo
grep -n "patrón" archivo             # Con número de línea
grep -c "patrón" archivo             # Contar coincidencias
grep -l "patrón" *.txt               # Solo nombres de archivos
grep -A 2 "patrón" archivo           # 2 líneas DESPUÉS
grep -B 2 "patrón" archivo           # 2 líneas ANTES
grep -C 2 "patrón" archivo           # 2 líneas alrededor (Context)
grep -w "palabra" archivo            # Palabra completa
grep -E "patron1|patron2" archivo    # Extended regex (OR)
grep -F "literal" archivo            # Fixed string (no regex)
```

### Expresiones regulares básicas (regex)

| Símbolo | Significado |
|---------|-------------|
| `.` | Cualquier carácter individual |
| `*` | Cero o más del anterior |
| `+` | Una o más (extended) |
| `?` | Cero o una (extended) |
| `^` | Inicio de línea |
| `$` | Fin de línea |
| `[abc]` | Cualquiera de a, b, c |
| `[^abc]` | NO a, b, ni c |
| `[a-z]` | Rango de letras minúsculas |
| `\d` | Dígito (en algunos contextos) |
| `\s` | Espacio |
| `\b` | Borde de palabra |
| `(...)` | Grupo |
| `\|` | OR (extended) |

**Ejemplos:**
```bash
grep "^Hello" archivo        # Líneas que empiezan con Hello
grep "world$" archivo        # Líneas que terminan con world
grep "^$" archivo            # Líneas vacías
grep "a.b" archivo           # a + cualquier char + b
grep "[0-9]" archivo         # Líneas con números
grep -E "cat|dog" archivo    # cat O dog
grep "^[A-Z]" archivo        # Líneas que empiezan con mayúscula
```

### `sed` (Stream EDitor)

```bash
sed 's/old/new/' archivo            # Reemplaza PRIMERA ocurrencia
sed 's/old/new/g' archivo           # Reemplaza TODAS (global)
sed 's/old/new/2' archivo           # Reemplaza la 2da
sed -i 's/old/new/g' archivo        # In-place (modifica archivo)
sed '1d' archivo                    # Elimina línea 1
sed '/patrón/d' archivo             # Elimina líneas con patrón
sed -n '5,10p' archivo              # Imprime líneas 5-10
sed 's|/|-|g' archivo               # Diferente delimitador
```

### `awk`

Procesador de datos por columnas.

```bash
awk '{print $1}' archivo            # Primera columna
awk '{print $1, $3}' archivo        # Columnas 1 y 3
awk -F ',' '{print $2}' archivo     # Separador coma
awk '{print NF}' archivo            # Número de campos por línea
awk '{print NR, $0}' archivo        # Número de línea + línea entera
awk '$1 > 100 {print}' archivo      # Filtrar
awk '/patrón/ {print}' archivo      # Filtrar por patrón
awk '{sum += $1} END {print sum}'   # Sumar columna 1
```

### `find`

Búsqueda potente en tiempo real.

```bash
find /path -name "archivo.txt"       # Por nombre exacto
find /path -name "*.log"             # Patrón
find /path -iname "ARCHIVO"          # Case insensitive
find /path -type f                   # Solo archivos
find /path -type d                   # Solo directorios
find /path -size +100M               # Más de 100 MB
find /path -size -10k                # Menos de 10 KB
find /path -mtime -7                 # Modificados últimos 7 días
find /path -mtime +30                # Modificados hace +30 días
find /path -user juan                # Por usuario
find /path -perm 755                 # Por permisos exactos
find /path -name "*.bak" -delete     # ⚠️ Borra encontrados
find /path -name "*.tmp" -exec rm {} \;     # Ejecutar comando
find /path -name "*.txt" -exec cat {} +     # Forma optimizada
```

### `xargs`

Construye comandos a partir de stdin.

```bash
echo "file1 file2" | xargs rm       # rm file1 file2
find . -name "*.bak" | xargs rm     # Borra todos los .bak
find . -name "*.txt" | xargs grep "TODO"  # Busca en encontrados
```

---

## 3.3 Scripts sencillos (peso 4 - el más pesado)

### Anatomía de un script

```bash
#!/bin/bash                         # 1. Shebang (línea bang)
# Este es un comentario             # 2. Comentarios
echo "Hello $1"                     # 3. Código

```

### Hacer ejecutable

```bash
chmod +x script.sh
./script.sh                         # ⚠️ Necesita ./
```

### Shebang (`#!`)

Primera línea del script. Le dice al sistema con qué intérprete ejecutar.

```bash
#!/bin/bash                         # Bash
#!/bin/sh                           # Sh genérico
#!/usr/bin/env python3              # Python (busca en PATH)
#!/usr/bin/perl                     # Perl
```

### Por qué se necesita `./`

Cuando ejecutas un comando, Bash busca en `$PATH`. Tu directorio actual probablemente no está ahí. `./script.sh` significa "ejecuta este archivo en el directorio actual".

### Variables en scripts

```bash
#!/bin/bash
NAME="LinuxQuest"
echo "Hola $NAME"
echo "Hola ${NAME}!"      # Llaves para evitar ambigüedad
```

### Argumentos posicionales

```bash
#!/bin/bash
echo "Script: $0"          # Nombre del script
echo "Primer arg: $1"
echo "Segundo arg: $2"
echo "Todos: $@"
echo "Cantidad: $#"
echo "Como string: $*"
```

**Ejemplo de uso:**
```bash
$ ./script.sh hola mundo
Script: ./script.sh
Primer arg: hola
Segundo arg: mundo
Todos: hola mundo
Cantidad: 2
```

### Códigos de salida (Exit codes)

```bash
$ ls archivo_existente
$ echo $?
0                          # Éxito

$ ls noexiste
ls: cannot access 'noexiste'...
$ echo $?
2                          # Error
```

| Código | Significado convencional |
|--------|--------------------------|
| `0` | Éxito |
| `1` | Error general |
| `2` | Error de uso |
| `126` | Comando no ejecutable |
| `127` | Comando no encontrado |
| `128+N` | Terminado por señal N |

**En tu script:**
```bash
exit 0                     # Éxito
exit 1                     # Error
```

### Condicionales `if`

```bash
if [ condición ]; then
    comando
elif [ otra_condición ]; then
    comando
else
    comando
fi
```

#### Pruebas de archivo

| Test | Verdadero si |
|------|--------------|
| `-f archivo` | Es archivo regular |
| `-d archivo` | Es directorio |
| `-e archivo` | Existe (cualquier tipo) |
| `-r archivo` | Legible |
| `-w archivo` | Escribible |
| `-x archivo` | Ejecutable |
| `-s archivo` | No vacío (size > 0) |
| `-L archivo` | Es symlink |

#### Pruebas de strings

| Test | Verdadero si |
|------|--------------|
| `-z "$VAR"` | Vacío (zero length) |
| `-n "$VAR"` | NO vacío |
| `"$A" = "$B"` | Strings iguales |
| `"$A" == "$B"` | Iguales (Bash) |
| `"$A" != "$B"` | Diferentes |

#### Pruebas numéricas

| Test | Significado |
|------|-------------|
| `-eq` | Equal (igual) |
| `-ne` | Not equal |
| `-lt` | Less than (menor) |
| `-le` | Less or equal |
| `-gt` | Greater than (mayor) |
| `-ge` | Greater or equal |

> **⚠️ TRAMPA:** Para números usa `-eq`, NO `==`. `==` compara strings.
> `1 == 1` ✅ pero `1+1 == 2` ❌ (compara strings)

#### Operadores lógicos

```bash
if [ "$A" = "x" ] && [ "$B" = "y" ]; then ...
if [ "$A" = "x" ] || [ "$B" = "y" ]; then ...
if [ ! -f archivo ]; then ...                   # Negación
```

### Bucles `for`

#### Sintaxis básica
```bash
for var in lista; do
    comando $var
done
```

#### Ejemplos
```bash
# Iterar sobre lista literal
for i in 1 2 3 4 5; do
    echo $i
done

# Iterar sobre archivos
for f in *.txt; do
    echo "Procesando $f"
done

# Iterar sobre argumentos
for username in $@; do
    echo "Hello $username!"
done

# Iterar sobre rango (Bash)
for i in {1..10}; do
    echo $i
done

# Estilo C (Bash)
for ((i=0; i<10; i++)); do
    echo $i
done
```

### Bucles `while`

```bash
while [ condición ]; do
    comando
done

# Ejemplo: contador
i=0
while [ $i -lt 5 ]; do
    echo $i
    i=$((i+1))
done

# Leer línea por línea
while read line; do
    echo "Línea: $line"
done < archivo.txt
```

### Bucle `until` (lo opuesto a while)

```bash
until [ condición ]; do
    comando
done
```

### Sustitución de comandos

```bash
# Sintaxis moderna (preferida)
hoy=$(date)
archivos=$(ls)

# Sintaxis antigua (backticks)
hoy=`date`
archivos=`ls`

# Uso
echo "Hoy es $(date)"
echo "Hay $(ls | wc -l) archivos"
```

### Aritmética

```bash
# Con $(( ))
resultado=$((2 + 3))
echo $resultado            # 5

a=10
b=3
echo $((a + b))            # 13
echo $((a - b))            # 7
echo $((a * b))            # 30
echo $((a / b))            # 3 (división entera)
echo $((a % b))            # 1 (módulo)

# Con expr (antiguo)
resultado=$(expr 2 + 3)
```

### Funciones

```bash
saludar() {
    echo "Hola $1, tienes $2 años"
}

# Llamar
saludar "Juan" 25
```

### Editores de texto

#### `vi` / `vim` (3 modos)

| Modo | Para qué |
|------|----------|
| **Comando** (default) | Navegación, comandos |
| **Inserción** | Escribir texto |
| **Ex/Línea** | Comandos de archivo |

**Comandos esenciales:**
```
i           Entrar a modo inserción
ESC         Salir de inserción
:w          Guardar
:q          Salir
:wq         Guardar y salir
:q!         Salir sin guardar
dd          Borrar línea
yy          Copiar línea
p           Pegar
u           Deshacer
/palabra    Buscar
:%s/old/new/g    Reemplazar todo
h j k l     Navegación (izquierda, abajo, arriba, derecha)
```

#### `nano` (más fácil)

```
Ctrl+O      Guardar
Ctrl+X      Salir
Ctrl+W      Buscar
Ctrl+K      Cortar línea
Ctrl+U      Pegar
Ctrl+G      Ayuda
```

---

# TEMA 4: Sistema operativo Linux (peso 8)

## 4.1 Elección del sistema operativo (peso 1)

### Diferencias Windows / macOS / Linux

| Característica | Windows | macOS | Linux |
|----------------|---------|-------|-------|
| **Filesystem** | NTFS | APFS, HFS+ | ext4, btrfs, xfs, zfs |
| **Case sensitive** | No | Depende | **Sí** |
| **Separador rutas** | `\` | `/` | `/` |
| **Ejecutables** | `.exe`, `.bat` | `.app`, `.sh` | Permiso `x` (sin extensión) |
| **Open Source** | No | No | **Sí** |
| **Base** | Windows NT | Unix (BSD) | Linux kernel |
| **Costo** | Pagado | Pagado | Gratis |

### Ciclo de vida de distribuciones

| Tipo | Soporte | Ejemplo |
|------|---------|---------|
| **LTS** (Long Term Support) | 5+ años | Ubuntu LTS, RHEL, Debian Stable |
| **Stable** | 2-3 años | Fedora, openSUSE Leap |
| **Rolling release** | Continuo (siempre actualizada) | Arch, openSUSE Tumbleweed, Gentoo |
| **EOL** (End of Life) | Sin soporte | Ubuntu 16.04, CentOS 6 |

### Versiones LTS de Ubuntu (memoriza)

- Ubuntu 18.04 LTS — soporte hasta 2023 (estándar) / 2028 (ESM)
- Ubuntu 20.04 LTS — soporte hasta 2025 / 2030
- Ubuntu 22.04 LTS — soporte hasta 2027 / 2032
- Ubuntu 24.04 LTS — soporte hasta 2029 / 2034

---

## 4.2 Conocer el hardware (peso 2)

### CPU

```bash
lscpu                       # Info detallada CPU
cat /proc/cpuinfo           # Info raw del kernel
nproc                       # Solo número de cores
```

**Datos importantes:**
- Architecture: x86_64, aarch64 (ARM)...
- Cores
- Threads per core
- Velocidad MHz
- Cache L1/L2/L3

### Memoria

```bash
free                        # RAM y swap (en KB por defecto)
free -h                     # Humano (GB, MB)
free -m                     # En megabytes
cat /proc/meminfo           # Info detallada
```

**Salida típica de `free -h`:**
```
              total        used        free      shared  buff/cache   available
Mem:           15Gi       4.5Gi       2.1Gi       400Mi       8.9Gi        10Gi
Swap:         2.0Gi          0B       2.0Gi
```

### Almacenamiento

```bash
lsblk                       # Bloques de almacenamiento
df                          # Espacio usado en filesystems
df -h                       # Humano
df -i                       # Inodes
du -sh /path                # Tamaño de directorio
du -h --max-depth=1         # Tamaños de subdirectorios
fdisk -l                    # Particiones (necesita sudo)
parted -l                   # Alternativa moderna
```

### USB y PCI

```bash
lsusb                       # Dispositivos USB
lsusb -v                    # Verbose
lspci                       # Dispositivos PCI
lspci | grep VGA            # Tarjetas gráficas
lspci | grep -i ethernet    # Tarjetas de red
```

### Información general del hardware

```bash
sudo dmidecode              # Info BIOS y hardware (DMI)
hwinfo                      # Hardware info (instalable)
inxi                        # Info elegante (instalable)
sudo hdparm /dev/sda        # Info de disco específico
sudo smartctl -a /dev/sda   # SMART (estado de disco)
```

### Dispositivos en `/dev`

| Archivo | Descripción |
|---------|-------------|
| `/dev/sda`, `/dev/sdb` | Discos SATA/SCSI |
| `/dev/sda1`, `/dev/sda2` | Particiones |
| `/dev/nvme0n1` | SSD NVMe |
| `/dev/nvme0n1p1` | Partición NVMe |
| `/dev/cdrom`, `/dev/sr0` | CD/DVD |
| `/dev/usb...` | USB |
| `/dev/null` | "Agujero negro" (descarta todo) |
| `/dev/zero` | Genera ceros infinitos |
| `/dev/random` | Datos aleatorios (lento) |
| `/dev/urandom` | Pseudo-aleatorios (rápido) |
| `/dev/tty1`...`tty6` | Terminales virtuales |

### Drivers/Módulos del kernel

```bash
lsmod                       # Módulos cargados
modprobe módulo             # Cargar módulo
rmmod módulo                # Descargar módulo
modinfo módulo              # Info del módulo
```

---

## 4.3 Donde se almacenan los datos (peso 3)

### Información del sistema

```bash
uname -a                    # Info kernel + sistema completa
uname -r                    # Solo versión kernel
uname -m                    # Arquitectura (x86_64, etc.)
hostnamectl                 # Hostname e info del sistema
uptime                      # Tiempo encendido + carga
date                        # Fecha y hora actuales
cal                         # Calendario del mes
cal 2026                    # Calendario del año
```

### Procesos

#### Conceptos clave

- **Proceso**: instancia de un programa en ejecución
- **PID**: Process ID (número único)
- **PPID**: Parent Process ID
- **Daemon**: proceso de fondo (servicios)
- **Init/systemd**: PID 1, padre de todos

#### Comandos

```bash
ps                          # Procesos del shell actual
ps aux                      # TODOS los procesos del sistema
ps auxf                     # Con árbol jerárquico
ps -ef                      # Otra forma común
ps -u usuario               # De un usuario específico
ps -p PID                   # Proceso específico
pstree                      # Árbol de procesos
top                         # Monitor en vivo
htop                        # Top mejorado (instalable)
```

**Columnas importantes de `ps aux`:**
```
USER  PID  %CPU  %MEM  VSZ  RSS  TTY  STAT  START  TIME  COMMAND
```

- **VSZ**: Virtual Size (memoria virtual)
- **RSS**: Resident Set Size (memoria física real)
- **TTY**: Terminal asociado
- **STAT**: Estado (R=running, S=sleeping, Z=zombie, etc.)

### Matar procesos (señales)

```bash
kill PID                    # Termina (SIGTERM, default)
kill -9 PID                 # Mata forzosamente (SIGKILL)
kill -15 PID                # Igual que default (SIGTERM)
kill -1 PID                 # Recargar config (SIGHUP)
killall nombre_proceso      # Mata por nombre
pkill nombre_proceso        # Igual
pgrep nombre                # Encuentra PIDs por nombre
```

#### Señales importantes

| # | Nombre | Significado |
|---|--------|-------------|
| 1 | SIGHUP | Hangup (reload config) |
| 2 | SIGINT | Interrupt (Ctrl+C) |
| 9 | SIGKILL | Mata (no se puede ignorar) |
| 15 | SIGTERM | Termina (default) |
| 19 | SIGSTOP | Pausa |
| 18 | SIGCONT | Continúa |

### Background y foreground

```bash
comando &                   # Ejecuta en background
jobs                        # Lista jobs en background
fg %1                       # Trae job 1 a foreground
bg %1                       # Manda job 1 a background
Ctrl+Z                      # Pausa job actual
Ctrl+C                      # Mata job actual
nohup comando &             # Resiste cierre de sesión
disown                      # Desasocia job del shell
```

### Logs del sistema

#### systemd-journal (moderno)

```bash
journalctl                  # Todo el journal
journalctl -n 50            # Últimas 50 líneas
journalctl -u nginx         # Por servicio (unit)
journalctl -f               # Follow (tiempo real)
journalctl --since "1 hour ago"
journalctl --since today
journalctl --since "2024-01-01" --until "2024-01-31"
journalctl -p err           # Por prioridad
journalctl -k               # Solo kernel
journalctl -b               # Boot actual
journalctl -b -1            # Boot anterior
```

#### Logs tradicionales (`/var/log/`)

| Archivo | Contenido |
|---------|-----------|
| `/var/log/syslog` | General (Debian/Ubuntu) |
| `/var/log/messages` | General (Red Hat) |
| `/var/log/auth.log` | Autenticación (Debian) |
| `/var/log/secure` | Autenticación (Red Hat) |
| `/var/log/kern.log` | Kernel |
| `/var/log/dmesg` | Mensajes de boot |
| `/var/log/boot.log` | Logs de arranque |
| `/var/log/cron` | Cron jobs |
| `/var/log/mail.log` | Correo |
| `/var/log/apache2/` | Apache |
| `/var/log/nginx/` | Nginx |

```bash
tail -f /var/log/syslog     # Seguir log en tiempo real
dmesg                       # Mensajes del kernel
dmesg -T                    # Con timestamps humanos
```

### Configuración del sistema (`/etc/`)

| Archivo | Propósito |
|---------|-----------|
| `/etc/passwd` | **Usuarios** (público, no contraseñas) |
| `/etc/shadow` | **Hashes de contraseñas** (solo root) |
| `/etc/group` | Grupos |
| `/etc/hostname` | Nombre del equipo |
| `/etc/hosts` | Resolución de nombres local |
| `/etc/fstab` | Sistemas a montar al boot |
| `/etc/resolv.conf` | Servidores DNS |
| `/etc/sudoers` | Permisos de sudo |
| `/etc/crontab` | Tareas programadas del sistema |
| `/etc/profile` | Configuración login shell global |
| `/etc/bashrc` | Configuración bash global |
| `/etc/os-release` | Info de la distribución |
| `/etc/issue` | Mensaje pre-login |
| `/etc/motd` | Mensaje del día (post-login) |

### Procesos init / systemd

**`systemd`** es el sistema de inicio moderno (reemplaza al SysV init).

```bash
systemctl status                # Estado general
systemctl status nginx          # Estado de servicio
systemctl start nginx           # Iniciar
systemctl stop nginx            # Detener
systemctl restart nginx         # Reiniciar
systemctl reload nginx          # Recargar config
systemctl enable nginx          # Habilitar al boot
systemctl disable nginx         # Deshabilitar al boot
systemctl list-units            # Listar units activas
systemctl list-unit-files       # Listar todas las units
```

### Memoria virtual y swap

```bash
free -h                     # Ver swap usado
swapon                      # Mostrar swap activos
sudo swapon /swapfile       # Activar swap
sudo swapoff /swapfile      # Desactivar swap
vmstat                      # Stats memoria virtual
```

### Pseudo-filesystems importantes

```bash
# /proc - Info del kernel y procesos
cat /proc/cpuinfo
cat /proc/meminfo
cat /proc/version
cat /proc/uptime
ls /proc/PID/               # Info de proceso específico

# /sys - Info del sistema y dispositivos
ls /sys/class/net/          # Interfaces de red
ls /sys/block/              # Dispositivos de bloque
```

---

## 4.4 Tu ordenador en la red (peso 2)

### Conceptos básicos

#### IP Addressing

| | IPv4 | IPv6 |
|---|---|---|
| Formato | `192.168.1.1` | `2001:db8::1` |
| Tamaño | 32 bits (4 octetos) | 128 bits (8 grupos hex) |
| Total direcciones | ~4,300 millones | ~340 sextillones |

#### Direcciones especiales

| | IPv4 | IPv6 |
|---|---|---|
| Localhost | `127.0.0.1` | `::1` |
| Default route | `0.0.0.0` | `::` |
| Broadcast | `255.255.255.255` | (no existe) |

#### Clases de redes privadas (RFC 1918)

| Clase | Rango | Notación CIDR |
|-------|-------|---------------|
| A | `10.0.0.0` - `10.255.255.255` | `10.0.0.0/8` |
| B | `172.16.0.0` - `172.31.255.255` | `172.16.0.0/12` |
| C | `192.168.0.0` - `192.168.255.255` | `192.168.0.0/16` |

### Notación CIDR

`192.168.1.0/24` = 24 bits de red, 8 bits de host = 256 IPs (254 utilizables)

| CIDR | Máscara | Hosts |
|------|---------|-------|
| /8 | 255.0.0.0 | 16,777,214 |
| /16 | 255.255.0.0 | 65,534 |
| /24 | 255.255.255.0 | 254 |
| /30 | 255.255.255.252 | 2 |

### Puertos importantes

| Puerto | Protocolo | Servicio |
|--------|-----------|----------|
| 20, 21 | TCP | FTP |
| 22 | TCP | **SSH** |
| 23 | TCP | Telnet (inseguro) |
| 25 | TCP | SMTP (correo) |
| 53 | TCP/UDP | **DNS** |
| 80 | TCP | **HTTP** |
| 110 | TCP | POP3 |
| 143 | TCP | IMAP |
| 443 | TCP | **HTTPS** |
| 465, 587 | TCP | SMTP seguro |
| 993 | TCP | IMAPS |
| 995 | TCP | POP3S |
| 3389 | TCP | RDP |

### Comandos de configuración

#### Comandos modernos (`ip`)

```bash
ip addr                     # Mostrar IPs (igual que ip a)
ip addr show eth0           # Solo una interfaz
ip a                        # Abreviado
ip link                     # Estado de interfaces
ip route                    # Tabla de rutas
ip r                        # Abreviado

# Cambios temporales (necesitan sudo)
sudo ip addr add 192.168.0.5/24 dev eth0
sudo ip link set eth0 up
sudo ip link set eth0 down
sudo ip route add default via 192.168.0.1
```

#### Comandos legacy (deprecated pero aún en exámenes)

```bash
ifconfig                    # Mostrar interfaces (legacy)
ifconfig eth0               # Específica
sudo ifconfig eth0 up
sudo ifconfig eth0 down
route -n                    # Tabla de rutas (legacy)
```

#### Hostname

```bash
hostname                    # Mostrar
hostname -I                 # IPs del equipo
sudo hostname nuevo-nombre  # Cambiar (temporal)
hostnamectl set-hostname nuevo-nombre  # Permanente
```

### Conectividad

```bash
ping google.com             # Test de conexión
ping -c 4 google.com        # 4 paquetes
ping6 ::1                   # IPv6
traceroute google.com       # Ruta a destino
tracepath google.com        # Sin sudo
mtr google.com              # Combina ping + traceroute
```

### DNS

```bash
host google.com             # Resolver dominio (simple)
dig google.com              # Más info (detallado)
dig @8.8.8.8 google.com     # Especificar servidor DNS
nslookup google.com         # Forma legacy
getent hosts google.com     # Usar resolución del sistema
```

#### Configuración DNS

```bash
cat /etc/resolv.conf        # Servidores DNS configurados
cat /etc/hosts              # Resolución local
cat /etc/nsswitch.conf      # Orden de búsqueda
```

**Ejemplo `/etc/hosts`:**
```
127.0.0.1   localhost
192.168.1.10  miservidor.local miservidor
```

**Ejemplo `/etc/resolv.conf`:**
```
nameserver 8.8.8.8
nameserver 1.1.1.1
search example.com
```

### Puertos y conexiones

```bash
ss -tuln                    # Sockets TCP/UDP escuchando
ss -tu                      # Conexiones activas
ss -p                       # Con procesos
netstat -tuln               # Legacy (deprecated)
lsof -i :80                 # Quién usa puerto 80
nmap localhost              # Scan ports (instalable)
```

**Opciones `ss`:**
- `-t` TCP
- `-u` UDP
- `-l` Listening
- `-n` Numérico (no resolve)
- `-p` Procesos

### Wget y curl

```bash
# wget - downloader
wget https://url
wget -O archivo.txt https://url       # Guardar como
wget -c https://url                    # Continuar descarga
wget -r https://sitio                  # Recursivo (mirror)

# curl - swiss army knife HTTP
curl https://url
curl -O https://url/file.zip          # Descarga (preserva nombre)
curl -o archivo https://url            # Descarga con nombre
curl -X POST -d "data" https://url     # POST request
curl -X PUT -d @file.json https://url
curl -H "Authorization: Bearer xxx" https://url
curl -I https://url                    # Solo headers
curl -L https://url                    # Sigue redirects
```

### SSH (Secure Shell)

```bash
ssh user@server                        # Conectar
ssh -p 2222 user@server                # Puerto custom
ssh -i llave.pem user@server           # Con llave
ssh-keygen                             # Generar par de llaves
ssh-keygen -t rsa -b 4096              # RSA 4096 bits
ssh-keygen -t ed25519                  # Ed25519 (moderno)
ssh-copy-id user@server                # Copiar llave pública
scp archivo user@server:/path/         # Copiar via SSH
scp -r dir user@server:/path/          # Recursivo
scp user@server:/file ./local          # Desde remoto
sftp user@server                       # FTP via SSH
```

**Archivos SSH importantes:**

| Archivo | Propósito |
|---------|-----------|
| `~/.ssh/id_rsa` | Llave privada (¡NUNCA compartir!) |
| `~/.ssh/id_rsa.pub` | Llave pública (compartible) |
| `~/.ssh/authorized_keys` | Llaves autorizadas a entrar |
| `~/.ssh/known_hosts` | Servidores conocidos |
| `~/.ssh/config` | Configuración cliente |
| `/etc/ssh/sshd_config` | Configuración servidor |

---

# TEMA 5: Seguridad y permisos (peso 7)

## 5.1 Seguridad básica e identificación de usuarios (peso 2)

### Tipos de usuarios

| Tipo | UID | Descripción |
|------|-----|-------------|
| **root** | 0 | Superusuario, control total del sistema |
| **Sistema** | 1-999 | Servicios y daemons (nginx, postgres...) |
| **Normales** | 1000+ | Humanos |

> **⚠️ Excepción:** En distribuciones antiguas Red Hat, los usuarios normales empiezan en UID 500.

### Comandos de identificación

```bash
whoami                      # Tu usuario actual
id                          # Tu UID, GID, grupos
id usuario                  # Info de otro usuario
who                         # Quién está conectado
w                           # Quién y qué hace
last                        # Últimos logins
lastlog                     # Último login por usuario
finger usuario              # Info detallada (instalable)
```

### Cambio de usuario

#### `su` (Switch User)

```bash
su                          # Cambia a root (mantiene env actual)
su -                        # Cambia a root con SU entorno
su - usuario                # Cambia a otro usuario con su entorno
su usuario                  # Cambia sin reload entorno
exit                        # Salir
```

#### `sudo` (SuperUser DO)

```bash
sudo comando                # Ejecuta UN comando como root
sudo -i                     # Shell de root (similar a su -)
sudo -s                     # Shell de root (mantiene env)
sudo -u otro_usuario cmd    # Como otro usuario
sudo -l                     # Lista qué puedes hacer con sudo
```

**Configuración:** `/etc/sudoers` (editar con `visudo` solamente).

### Diferencias `su` vs `sudo`

| | `su` | `sudo` |
|---|---|---|
| Necesita | Password de root | Password del usuario |
| Sesión | Cambia identidad completa | Solo el comando especificado |
| Auditoría | No por defecto | Logs en `/var/log/auth.log` |
| Granular | No | Sí (usuario por usuario) |

### Información de cuenta

```bash
chfn                        # Cambiar info personal (full name, etc.)
chsh                        # Cambiar shell del usuario
chsh -s /bin/zsh            # A zsh
passwd                      # Cambiar tu password
sudo passwd usuario         # Cambiar password de otro
```

### Archivo `/etc/passwd`

**⚠️ Importante:** En sistemas modernos NO contiene contraseñas (esas están en `/etc/shadow`).

```
root:x:0:0:root:/root:/bin/bash
carol:x:1000:1000:Carol Doe:/home/carol:/bin/bash
```

**7 campos separados por `:`:**

1. `root` — username
2. `x` — placeholder de contraseña (real está en shadow)
3. `0` — UID
4. `0` — GID primario
5. `root` — GECOS (nombre completo, info)
6. `/root` — directorio home
7. `/bin/bash` — shell

### Archivo `/etc/shadow`

Contiene las contraseñas hasheadas. **Solo legible por root.**

```
root:$6$abc...:18000:0:99999:7:::
```

**9 campos separados por `:`:**

1. Username
2. Hash de contraseña (`$6$` = SHA-512)
3. Días desde último cambio (epoch)
4. Días mínimos antes de cambiar
5. Días máximos antes de cambiar
6. Días de aviso antes de expirar
7. Días de inactividad permitidos después de expirar
8. Fecha de expiración de cuenta
9. Reservado

### Archivo `/etc/group`

```
sudo:x:27:carol,john
```

**4 campos:**

1. Nombre del grupo
2. Placeholder password (raro)
3. GID
4. Miembros separados por coma

---

## 5.2 Crear usuarios y grupos (peso 2)

### Crear usuarios

```bash
sudo useradd usuario                         # Crear básico (sin home a veces)
sudo useradd -m usuario                      # Con home (-m = make home)
sudo useradd -m -s /bin/bash usuario         # Con shell específico
sudo useradd -m -s /bin/bash -G grupo usuario  # Con grupo secundario
sudo useradd -u 2000 usuario                 # UID específico

# adduser (Debian/Ubuntu) - interactivo, más amigable
sudo adduser usuario
```

### Modificar usuarios

```bash
sudo usermod -aG grupo usuario               # AGREGAR a grupo (-a = append)
sudo usermod -G grupo1,grupo2 usuario        # Reemplaza grupos secundarios
sudo usermod -L usuario                      # Bloquear (Lock)
sudo usermod -U usuario                      # Desbloquear (Unlock)
sudo usermod -s /bin/zsh usuario             # Cambiar shell
sudo usermod -d /new/home -m usuario         # Cambiar y mover home
sudo usermod -l nuevo viejo                  # Renombrar usuario
sudo usermod -e 2025-01-01 usuario           # Fecha expiración
```

> **⚠️ Trampa común:** `usermod -G` SIN `-a` REEMPLAZA todos los grupos secundarios. Siempre usa `-aG` para agregar.

### Eliminar usuarios

```bash
sudo userdel usuario                         # Borra usuario (NO el home)
sudo userdel -r usuario                      # Borra usuario Y home
```

### Contraseñas

```bash
passwd                                       # Cambiar tu password
sudo passwd usuario                          # Cambiar de otro
sudo passwd -l usuario                       # Bloquear (Lock)
sudo passwd -u usuario                       # Desbloquear
sudo passwd -d usuario                       # Borrar password (sin password!)
sudo passwd -e usuario                       # Forzar cambio en próximo login
chage usuario                                # Configurar caducidad interactivo
sudo chage -l usuario                        # Ver info de caducidad
sudo chage -E 2025-12-31 usuario             # Fecha expiración
sudo chage -M 90 usuario                     # Máximo 90 días entre cambios
```

### Grupos

#### Crear/Modificar/Eliminar

```bash
sudo groupadd grupo                          # Crear grupo
sudo groupadd -g 1500 grupo                  # Con GID específico
sudo groupdel grupo                          # Borrar
sudo groupmod -n nuevo viejo                 # Renombrar grupo
sudo groupmod -g 2000 grupo                  # Cambiar GID
```

#### Gestión de membresía

```bash
groups                                       # Mis grupos
groups usuario                               # Grupos de usuario
sudo gpasswd -a usuario grupo                # Agregar usuario a grupo
sudo gpasswd -d usuario grupo                # Quitar usuario de grupo
sudo gpasswd -A admin1,admin2 grupo          # Asignar admins del grupo
```

### Plantilla de nuevos usuarios: `/etc/skel/`

Cuando creas un usuario con `useradd -m`, los archivos de `/etc/skel/` se copian a su home.

Típicamente contiene:
- `.bashrc`
- `.profile`
- `.bash_logout`

---

## 5.3 Gestión de permisos (peso 2)

### Tipos de permisos

| Permiso | Símbolo | Octal | En archivos | En directorios |
|---------|---------|-------|-------------|----------------|
| **Read** | `r` | 4 | Leer contenido | Listar archivos |
| **Write** | `w` | 2 | Modificar/eliminar | Crear/borrar archivos |
| **Execute** | `x` | 1 | Ejecutar como programa | Entrar al directorio |

### Categorías de usuarios

| Categoría | Letra | Descripción |
|-----------|-------|-------------|
| User (owner) | `u` | Propietario del archivo |
| Group | `g` | Grupo del archivo |
| Others | `o` | Todos los demás |
| All | `a` | Los tres juntos (u+g+o) |

### Lectura de permisos

```
-rwxr-xr--
│└┬┘└┬┘└┬┘
│ │  │  └── Otros: r-- (leer)
│ │  └────── Grupo: r-x (leer + ejecutar)
│ └───────── Usuario: rwx (leer + escribir + ejecutar)
└─────────── Tipo: archivo regular
```

### Modos de permisos

#### Modo simbólico

**Estructura:** `[ugoa][+-=][rwx]`

```bash
chmod u+x archivo            # Usuario + ejecutar
chmod g-w archivo            # Grupo - escribir
chmod o=r archivo            # Otros = solo leer
chmod a+r archivo            # Todos + leer
chmod ug+rw,o-rwx archivo    # Múltiples cambios
chmod -R u+rwx directorio    # Recursivo
```

#### Modo numérico (octal)

Suma de los valores: r=4, w=2, x=1

| Octal | Permisos | Descripción |
|-------|----------|-------------|
| 0 | `---` | Nada |
| 1 | `--x` | Solo ejecutar |
| 2 | `-w-` | Solo escribir |
| 3 | `-wx` | Escribir + ejecutar |
| 4 | `r--` | Solo leer |
| 5 | `r-x` | Leer + ejecutar |
| 6 | `rw-` | Leer + escribir |
| 7 | `rwx` | Todo |

**Combinaciones comunes a memorizar:**

| Comando | Permisos | Uso típico |
|---------|----------|------------|
| `chmod 755 file` | `rwxr-xr-x` | Scripts, directorios |
| `chmod 644 file` | `rw-r--r--` | Archivos normales |
| `chmod 600 file` | `rw-------` | Archivos privados |
| `chmod 700 dir` | `rwx------` | Directorio privado |
| `chmod 777 file` | `rwxrwxrwx` | ⚠️ ¡EVITAR! |
| `chmod 444 file` | `r--r--r--` | Solo lectura para todos |
| `chmod 400 file` | `r--------` | Solo lectura propietario |

> **TIP del libro:** Si un valor de permiso es **impar**, ¡el archivo seguramente es ejecutable! (porque x=1)

### Cambiar propietario: `chown`

```bash
sudo chown usuario archivo                   # Solo usuario
sudo chown usuario:grupo archivo             # Usuario y grupo
sudo chown :grupo archivo                    # Solo grupo
sudo chown -R usuario directorio             # Recursivo
```

### Cambiar grupo: `chgrp`

```bash
sudo chgrp grupo archivo                     # Solo grupo
sudo chgrp -R grupo directorio               # Recursivo
```

> **⚠️ Restricción:** Solo root puede cambiar la propiedad de archivos de otros usuarios. Un usuario normal solo puede cambiar el grupo a uno al que pertenece.

### `umask` (máscara de permisos)

Define los permisos QUITADOS al crear archivos nuevos.

```bash
umask                                        # Ver actual
umask 022                                    # Establecer
umask 077                                    # Más restrictiva
```

**Cálculo:**
- Archivos nuevos: 666 - umask = permisos finales
- Directorios nuevos: 777 - umask = permisos finales

| umask | Archivos nuevos | Directorios nuevos |
|-------|------------------|---------------------|
| 022 | 644 (rw-r--r--) | 755 (rwxr-xr-x) |
| 002 | 664 (rw-rw-r--) | 775 (rwxrwxr-x) |
| 077 | 600 (rw-------) | 700 (rwx------) |

> **Nota:** Los archivos nunca se crean con `x` automáticamente, hay que añadirlo manualmente.

### Permisos especiales

#### SUID (Set User ID) — valor octal 4

Hace que el ejecutable se corra con permisos del DUEÑO, no del que ejecuta.

```bash
chmod u+s archivo                            # Activar SUID (simbólico)
chmod 4755 archivo                           # Activar SUID (numérico)
```

**Visualización:** `s` reemplaza la `x` en permisos del usuario:
```
-rwsr-xr-x   # SUID activado y ejecutable
-rwSr-xr-x   # SUID activado pero NO ejecutable (mayúscula)
```

**Ejemplos clásicos:** `passwd` (necesita escribir en /etc/shadow), `sudo`, `su`.

#### SGID (Set Group ID) — valor octal 2

- **En archivos ejecutables:** se ejecuta con permisos del GRUPO dueño.
- **En directorios:** los archivos creados dentro heredan el grupo del directorio.

```bash
chmod g+s archivo                            # Activar SGID
chmod 2755 archivo                           # Activar SGID (numérico)
```

**Visualización:** `s` reemplaza la `x` en permisos del grupo:
```
-rwxr-sr-x
```

#### Sticky bit — valor octal 1

Solo en directorios. Solo el dueño del archivo puede borrarlo, aunque el directorio sea writable por todos.

```bash
chmod +t directorio                          # Activar sticky
chmod 1755 directorio                        # Activar sticky (numérico)
```

**Visualización:** `t` reemplaza la `x` en permisos de otros:
```
drwxrwxrwt   # Sticky bit activado (lo más común: /tmp)
```

**Caso de uso clásico:** `/tmp` (todos pueden crear pero no borrar archivos ajenos).

### Combinaciones especiales

```bash
# 4 dígitos = especial + ugo
chmod 4755 archivo            # SUID + 755
chmod 2755 archivo            # SGID + 755
chmod 1755 directorio         # Sticky + 755
chmod 6755 archivo            # SUID + SGID + 755
chmod 7755 archivo            # SUID + SGID + Sticky + 755
```

### Tabla de permisos especiales

| Valor | Permiso | Visualización |
|-------|---------|---------------|
| 1 | Sticky | `t` (lugar de x en otros) |
| 2 | SGID | `s` (lugar de x en grupo) |
| 4 | SUID | `s` (lugar de x en usuario) |

---

## 5.4 Directorios y archivos especiales (peso 1)

### Directorios temporales

| Directorio | Propósito | Sobrevive reinicio |
|------------|-----------|---------------------|
| `/tmp` | Temporales generales | **No** (borrado al boot) |
| `/var/tmp` | Temporales persistentes | **Sí** |
| `/run` | Runtime (PIDs, sockets) | No |
| `/dev/shm` | Memoria compartida | No |

Todos tienen sticky bit (`drwxrwxrwt`) para que cada usuario solo pueda borrar sus propios archivos.

### Enlaces

#### Hard links (enlaces duros)

Otro nombre para el MISMO archivo (mismo inodo).

```bash
ln archivo enlace_duro                       # Crear hard link
```

**Características:**
- Comparten el mismo **inodo**
- Borrar uno NO afecta al otro
- Solo dentro del mismo filesystem
- No pueden apuntar a directorios
- Borras el "original" → hard link sigue funcionando

#### Symbolic links / Soft links (enlaces simbólicos)

Atajo o "acceso directo" que apunta a otra ruta.

```bash
ln -s archivo enlace_blando                  # Crear symbolic link
ln -s /ruta/destino /ruta/enlace             # Con rutas absolutas
```

**Características:**
- Son archivos especiales tipo `l`
- Pueden cruzar filesystems
- Pueden apuntar a directorios
- Si borras el original → el symlink queda **roto** (broken/dangling)

#### Visualización con `ls -l`

```bash
$ ls -l
lrwxrwxrwx 1 carol carol 5 Jan 1 12:00 enlace -> archivo
│
└── 'l' al inicio = symlink
```

```bash
readlink enlace                              # Ver a dónde apunta
realpath enlace                              # Ruta real resuelta
```

### Comparación

| | Hard link | Symbolic link |
|---|---|---|
| Comando | `ln file link` | `ln -s file link` |
| Inodo | Mismo | Diferente |
| Cross-filesystem | No | Sí |
| Apunta a directorio | No | Sí |
| Si se borra original | Sigue funcionando | Roto (dangling) |
| Tipo en `ls -l` | `-` (regular) | `l` (link) |

---

# Cheatsheet: Comandos Esenciales

## Top 20 comandos del examen

```bash
# Navegación y archivos
ls          # Listar
cd          # Cambiar directorio
pwd         # Directorio actual
cp          # Copiar
mv          # Mover/renombrar
rm          # Borrar
mkdir       # Crear directorio
touch       # Crear archivo / actualizar fecha

# Texto y procesamiento
cat         # Mostrar contenido
less        # Pager
head/tail   # Inicio/fin de archivo
grep        # Buscar patrones
sort        # Ordenar
uniq        # Eliminar duplicados
wc          # Contar líneas/palabras
sed/awk     # Procesamiento avanzado

# Sistema
ps          # Procesos
top         # Monitor en vivo
df          # Espacio disco
free        # Memoria
ip          # Configuración red
ssh         # Conexión remota

# Permisos y usuarios
chmod       # Cambiar permisos
chown       # Cambiar propietario
sudo        # Ejecutar como root
whoami      # Usuario actual
id          # IDs y grupos
```

## Atajos de teclado en Bash

| Atajo | Acción |
|-------|--------|
| `Ctrl+C` | Cancelar comando actual |
| `Ctrl+D` | EOF / Logout |
| `Ctrl+Z` | Pausar (suspender) proceso |
| `Ctrl+L` | Limpiar pantalla (= `clear`) |
| `Ctrl+A` | Inicio de línea |
| `Ctrl+E` | Fin de línea |
| `Ctrl+U` | Borrar desde cursor a inicio |
| `Ctrl+K` | Borrar desde cursor a fin |
| `Ctrl+W` | Borrar palabra anterior |
| `Ctrl+R` | Búsqueda inversa en historial |
| `Tab` | Autocompletar |
| `Tab Tab` | Mostrar todas las opciones |
| `↑` / `↓` | Comandos previos |
| `!!` | Repetir último comando |

---

# Estrategia de estudio recomendada

## Plan de 4 semanas

### Semana 1: Bases (Temas 1 y 2.1-2.2)
- Día 1-2: Tema 1 completo (distribuciones, FOSS, licencias)
- Día 3-4: Comandos básicos, variables, prompt
- Día 5-7: Practicar `man`, `--help`, navegación

**Práctica:** Instala una VM con Ubuntu/Debian. Configura el usuario.

### Semana 2: Sistema de archivos (Tema 2.3-2.4 y 3.1-3.2)
- Día 1-2: FHS, navegación, `ls`, rutas
- Día 3-4: Crear/copiar/mover/borrar, globbing
- Día 5: Archivar (tar, gzip, zip)
- Día 6-7: grep, sed, awk, find

**Práctica:** Crea estructura de archivos. Comprime, descomprime. Busca patrones en logs.

### Semana 3: Scripts y sistema (Tema 3.3 y 4)
- Día 1-3: **Scripts bash** (peso 4!) — practica mucho
- Día 4: Hardware (lscpu, free, lsblk, ps, top)
- Día 5: Logs (journalctl, /var/log)
- Día 6-7: Red (ip, ping, ss, ssh)

**Práctica:** Escribe 5 scripts: backup, deploy, info-sistema, etc.

### Semana 4: Seguridad y revisión (Tema 5)
- Día 1-2: Usuarios y grupos
- Día 3-4: **Permisos** (modo simbólico Y numérico)
- Día 5: Permisos especiales, links
- Día 6-7: Repaso general + simulacros

**Práctica:** Examen simulado en lpi.org.

## Recursos recomendados

### Oficiales
- **LPI Learning Materials**: lpi.org/learning (PDF que ya tienes)
- **LPI Exam Objectives**: wiki.lpi.org
- Examen oficial en español o inglés

### Práctica
- **LinuxQuest**: [LinuxQuest](https://github.com/AlexisSM377/LinuxQuest) — Plataforma gamificada con 85 misiones basadas en LPI Linux Essentials
- **Linux Journey**: linuxjourney.com (gratis)
- **OverTheWire Bandit**: overthewire.org/wargames/bandit/
- **Linux Survival**: linuxsurvival.com

### Simulacros
- **Pearson VUE**: simuladores oficiales
- **GoCertify**: tests gratuitos de práctica

### Entorno de práctica
- **VirtualBox** + Ubuntu LTS (gratis, perfecto)
- **WSL2** en Windows (rápido, sin VM)
- **Docker** + imagen Ubuntu/Debian
- **Cloud**: AWS Free Tier, GCP $300 crédito

---

# Trampas comunes del examen

## ⚠️ Errores frecuentes

### 1. Confundir `==` con `-eq`
```bash
[ 1+1 == 2 ]    # FALSO (compara strings)
[ $((1+1)) -eq 2 ]   # VERDADERO
```

### 2. `usermod -G` SIN `-a`
```bash
usermod -G grupo usuario      # ⚠️ REEMPLAZA grupos secundarios
usermod -aG grupo usuario     # ✅ AGREGA al grupo
```

### 3. Pensar que GNU/Linux es Unix
Linux **NO es Unix**. Es **tipo Unix** (Unix-like). No contiene código Unix.

### 4. Confundir Android con Linux puro
Android usa **kernel Linux modificado**, NO es una distribución Linux estándar.

### 5. Olvidar `./` para ejecutar scripts
```bash
script.sh           # ❌ "command not found"
./script.sh         # ✅ Funciona
```

### 6. Confundir hard links con symlinks
- **Hard link**: mismo inodo, no cruza filesystems, no apunta a directorios
- **Symlink**: archivo nuevo, puede cruzar filesystems, puede apuntar a directorios

### 7. Olvidar que `rm` no tiene papelera
```bash
rm -rf /        # ⚠️ DESASTRE TOTAL
rm -rf ~        # ⚠️ Borra todo tu home
```

### 8. `passwd` vs `/etc/passwd`
- `passwd` = comando para cambiar contraseña
- `/etc/passwd` = archivo de usuarios (NO contiene contraseñas)
- `/etc/shadow` = archivo con hashes de contraseñas

### 9. UID 0 SIEMPRE es root
Si haces que un usuario normal tenga UID 0, **se convierte en root** efectivamente.

### 10. Sticky bit, SUID, SGID

| Permiso | Letra | Octal | Aplica a |
|---------|-------|-------|----------|
| SUID | `s` (en u) | 4xxx | Archivos ejecutables |
| SGID | `s` (en g) | 2xxx | Archivos ejecutables y directorios |
| Sticky | `t` (en o) | 1xxx | Solo directorios |

### 11. Diferencia `>` y `>>`
```bash
echo "hola" > archivo      # SOBRESCRIBE
echo "hola" >> archivo     # APPEND (agrega al final)
```

### 12. `man 5 passwd` vs `man passwd`
```bash
man passwd       # Comando passwd (sección 1)
man 5 passwd     # Formato del archivo /etc/passwd (sección 5)
```

---

## 🎯 Tips finales para el examen

1. **Lee preguntas dos veces.** Hay trampas con palabras como "NO", "INCORRECTO", "EXCEPTO".

2. **Sintaxis exacta importa.** `ls -al` ≠ `ls -aL` (mayúscula).

3. **Practica los comandos en una terminal real.** No solo memorices, ejecuta.

4. **Domina permisos.** Es uno de los temas más densos. Practica conversión simbólica ↔ octal hasta hacerlo en segundos.

5. **Domina scripts** (peso 4 del examen). Si no sabes escribir un `if/for/case` básico, vas a fallar.

6. **No te bloquees en una pregunta.** Marca y vuelve después. Tienes 60 minutos para 40 preguntas (1.5 min/pregunta).

7. **Las opciones tienen pistas.** Si no sabes la respuesta, descarta las claramente erróneas primero.

8. **El examen tiene preguntas de "rellenar".** Necesitas saber exactamente cómo se escribe el comando.

9. **Repasa pesos.** No estudies igual cosas con peso 1 que con peso 4.

10. **Confía en lo que practicaste.** La práctica vale más que la memorización pura.

---

## 🏆 Lista de verificación final

Antes del examen, deberías poder:

### Tema 1
- [ ] Nombrar 5 distribuciones por familia
- [ ] Diferenciar GPL de MIT
- [ ] Explicar las 4 libertades
- [ ] Reconocer paquetes según gestor
- [ ] Diferenciar Android de Linux puro

### Tema 2
- [ ] Estructura completa del FHS
- [ ] Navegar con rutas absolutas y relativas
- [ ] Usar `ls`, `cd`, `pwd`, `mkdir`, `touch`, `cp`, `mv`, `rm` con todas sus opciones comunes
- [ ] Manipular variables de entorno
- [ ] Usar globbing
- [ ] Buscar ayuda con man, info, --help, apropos

### Tema 3
- [ ] Crear/extraer tar, gzip, zip
- [ ] Procesar texto con grep, sed, awk
- [ ] Escribir scripts con shebang, variables, argumentos
- [ ] Usar if, for, while
- [ ] Manejar exit codes
- [ ] Usar pipes y redirecciones

### Tema 4
- [ ] Identificar hardware con comandos
- [ ] Gestionar procesos (ps, top, kill)
- [ ] Leer logs con journalctl y /var/log
- [ ] Configurar IP, DNS, hostname
- [ ] Usar SSH y SCP

### Tema 5
- [ ] Crear/modificar/eliminar usuarios y grupos
- [ ] Cambiar permisos en modo simbólico Y numérico
- [ ] Entender SUID, SGID, sticky bit
- [ ] Crear hard links y symlinks
- [ ] Cambiar propietario con chown

---

**🎓 Cuando puedas marcar todos los checkboxes y obtengas 80%+ en 3 simulacros, estás listo.**

**¡Mucho éxito en tu certificación LPI Linux Essentials 010-160!** 🐧
