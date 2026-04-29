# 📚 LINUXQUEST - CONTENIDO EDUCATIVO MAESTRO

## Basado en el currículum oficial LPI Linux Essentials (Examen 010-160)
## Documento de referencia para Claude Code - diseño de misiones

> **Propósito:** Este archivo contiene TODO el contenido educativo del juego LinuxQuest, organizado en 5 mundos que mapean directamente a los 5 temas del examen LPI Linux Essentials. Claude Code usa este documento para generar misiones, enemigos, NPCs, narrativa y progresión del juego.

---

## 🎮 ESTRUCTURA GENERAL DEL JUEGO

### Mapeo Currículum → Mundos:

```
TEMA 1 (LPI) → MUNDO 1: CASTILLO DE LINUX
  └─ La comunidad Linux y código abierto

TEMA 2 (LPI) → MUNDO 2: CAMINOS PERDIDOS  
  └─ Encontrando el camino en un sistema Linux

TEMA 3 (LPI) → MUNDO 3: TORRES ANTIGUAS DEL PODER
  └─ El poder de la línea de comandos

TEMA 4 (LPI) → MUNDO 4: NÚCLEO DEL REINO
  └─ El sistema operativo Linux

TEMA 5 (LPI) → MUNDO 5: BÓVEDAS SECRETAS
  └─ Seguridad y permisos
```

### Importancia y peso del examen LPI:

```
1.1 Sistemas operativos populares       Peso: 2
1.2 Aplicaciones de código abierto      Peso: 2
1.3 Software libre y licencias          Peso: 1
1.4 Destrezas TIC                       Peso: 2

2.1 Línea de comandos básica            Peso: 4
2.2 Ayuda en línea de comandos          Peso: 2
2.3 Directorios y listado de archivos   Peso: 2
2.4 Crear, mover y borrar archivos      Peso: 2

3.1 Archivar ficheros                   Peso: 2
3.2 Buscar y extraer datos              Peso: 3
3.3 Scripts sencillos                   Peso: 4

4.1 Elección del sistema operativo      Peso: 1
4.2 Conocer el hardware                 Peso: 2
4.3 Donde se almacenan los datos        Peso: 3
4.4 Tu ordenador en la red              Peso: 2

5.1 Seguridad básica                    Peso: 2
5.2 Crear usuarios y grupos             Peso: 2
5.3 Gestión de permisos                 Peso: 2
5.4 Directorios y archivos especiales   Peso: 1

TOTAL: 41 puntos de peso = 75+ misiones
```

---

## 👥 NPCs DEL JUEGO

### Diseñados para guiar al jugador en cada mundo:

```
LINUX EL SABIO (Mundo 1)
├─ Anciano fundador de los reinos digitales
├─ Vestimenta: túnica blanca, barba plateada
├─ Personalidad: Filósofo, narrador, paciente
├─ Función: Da bienvenida, enseña historia y filosofía
└─ Frase iconica: "Para entender el camino, primero debes conocer a tus ancestros."

GREP-ILD (Mundo 2)
├─ Joven explorador-cartógrafo
├─ Vestimenta: capucha verde, mapa enrollado
├─ Personalidad: Curioso, energético, didáctico
├─ Función: Enseña navegación y comandos básicos
└─ Frase: "Cada directorio es una nueva aventura. Sígueme."

CHMOD-ARD (Mundo 3)
├─ Mago artesano, controla el flujo de información
├─ Vestimenta: capa azul con runas
├─ Personalidad: Místico, técnico, preciso
├─ Función: Enseña pipes, redirecciones, regex
└─ Frase: "El verdadero poder fluye a través de las tuberías."

KERNEL EL FORJADOR (Mundo 4)
├─ Herrero del reino digital
├─ Vestimenta: armadura metálica, martillo
├─ Personalidad: Robusto, técnico, confiable
├─ Función: Enseña sistemas, hardware, redes
└─ Frase: "El núcleo es donde la magia se forja en realidad."

SUDO-MAN (Mundo 5)
├─ Guardián supremo del reino
├─ Vestimenta: armadura roja con escudo dorado
├─ Personalidad: Autoritario pero justo, vigilante
├─ Función: Enseña seguridad, usuarios, permisos
└─ Frase: "El poder absoluto requiere absoluta responsabilidad."
```

---

## 🌍 MUNDO 1: CASTILLO DE LINUX

### Currículum LPI mapeado:
- **Tema 1:** La comunidad Linux y carrera en código abierto

### Concepts a enseñar:

#### 1.1 - Sistemas operativos populares y evolución de Linux

**Conocimientos clave:**
- Distribuciones Linux (Debian, Ubuntu, CentOS, Fedora, openSUSE, Red Hat, SUSE, Linux Mint)
- Sistemas embebidos (Raspberry Pi, Raspbian, Android)
- Linux y Cloud Computing (AWS, Azure, GCP)

**Términos/Comandos:**
- `uname -a` (información del sistema)
- `cat /etc/os-release` (info de distribución)
- `lsb_release -a` (información completa)

**Datos para misiones:**
```yaml
distribuciones:
  debian:
    descripcion: "Madre de muchas distros, estabilidad ante todo"
    derivadas: [Ubuntu, Mint, Kali]
    package_manager: "apt/dpkg"
  red_hat:
    descripcion: "Reino corporativo, soporte empresarial"
    derivadas: [Fedora, CentOS, Rocky Linux]
    package_manager: "yum/rpm/dnf"
  arch:
    descripcion: "Para los valientes que quieren control total"
    derivadas: [Manjaro, EndeavourOS]
    package_manager: "pacman"
  suse:
    descripcion: "Reino europeo, antigua tradición"
    derivadas: [openSUSE]
    package_manager: "zypper/rpm"

embedded:
  android:
    base: "Linux Kernel"
    devices: [smartphones, tablets, smart_tvs, watches]
  raspberry_pi:
    distros: [Raspbian, Ubuntu_Pi, RetroPie]
    uses: [educacion, hobby, IoT, robótica]

cloud:
  proveedores: [AWS, Azure, GCP, DigitalOcean]
  ventajas:
    - escalabilidad
    - pago_por_uso
    - alta_disponibilidad
    - reducción_costes_inicial
```

#### 1.2 - Aplicaciones de código abierto

**Software esencial a mencionar:**
```yaml
office:
  libreoffice: "Suite ofimática completa"
  apache_openoffice: "Alternativa clásica"
  
navegadores:
  firefox: "El zorro defensor del código abierto"
  chromium: "Base de Chrome, sin tracking de Google"

multimedia:
  vlc: "Reproduce todo lo que existe"
  audacity: "Editor de audio profesional"
  gimp: "Photoshop libre"
  blender: "3D, animación, video"
  inkscape: "Vectores y SVG"

servidores:
  apache: "Servidor web veterano"
  nginx: "Servidor web moderno"
  mysql: "Base de datos relacional"
  postgresql: "Base de datos avanzada"
  postfix: "Servidor de correo"
  samba: "Compartir archivos con Windows"

programacion:
  python: "Lenguaje versátil"
  perl: "El padre de los scripts"
  php: "Web dinámica"
  c_cpp: "Bajo nivel, sistemas"
  java: "Multiplataforma empresarial"

paquetes:
  apt: "Debian/Ubuntu"
  dpkg: "Bajo nivel Debian"
  yum: "Red Hat clásico"
  dnf: "Yum moderno"
  rpm: "Paquetes Red Hat"
  snap: "Universal Canonical"
  flatpak: "Universal moderno"
```

#### 1.3 - Software libre y licencias

**Las 4 libertades del software libre:**
1. Usar el programa para cualquier propósito
2. Estudiar cómo funciona y modificarlo
3. Distribuir copias
4. Distribuir versiones modificadas

**Licencias importantes:**
```yaml
copyleft:
  GPL_v2: "GNU Public License - Linux usa esta"
  GPL_v3: "Versión moderna, cierra agujeros"
  AGPL: "Para servicios web"
  LGPL: "Para librerías"

permisivas:
  MIT: "Hazlo lo que quieras"
  BSD: "Similar a MIT"
  Apache_2_0: "Con cláusula de patentes"

organizaciones:
  FSF: "Free Software Foundation - Stallman"
  OSI: "Open Source Initiative"
  Creative_Commons: "Para contenido no-software"
```

#### 1.4 - Destrezas TIC

**Interfaces gráficas:**
- GNOME (predeterminado en Ubuntu, Fedora)
- KDE Plasma (configurable, potente)
- XFCE (ligera)
- Cinnamon (Mint, similar a Windows)
- MATE (clásica, GNOME 2)

**Privacidad e internet:**
- Cookies de tracking
- HTTPS vs HTTP
- VPNs
- Tor
- Encriptación (GPG, PGP)

### Misiones Mundo 1 (15 misiones):

```yaml
mision_1_1:
  nombre: "El Despertar del Iniciado"
  npc: "Linux el Sabio"
  tipo: "narrativa_intro"
  objetivo: "Entender qué es una distribución"
  comando: "uname -a"
  validacion: "output contiene 'Linux'"
  recompensa: { xp: 10, items: ["pergamino_basico"], bits: 5 }
  dificultad: "facil"

mision_1_2:
  nombre: "Identificando el Reino"
  npc: "Linux el Sabio"
  objetivo: "Identificar distribución actual"
  comando: "cat /etc/os-release"
  validacion: "output contiene 'NAME='"
  recompensa: { xp: 15, items: ["mapa_distros"], bits: 5 }

mision_1_3:
  nombre: "El Pergamino de las Familias"
  npc: "Linux el Sabio"
  objetivo: "Aprender la familia Debian"
  tipo: "quiz"
  pregunta: "¿Cuál NO es derivada de Debian?"
  opciones: ["Ubuntu", "Mint", "Fedora", "Kali"]
  respuesta: "Fedora"
  recompensa: { xp: 20, items: ["estandarte_debian"], bits: 10 }

mision_1_4:
  nombre: "El Estandarte del León"
  npc: "Linux el Sabio"
  objetivo: "Conocer la familia Red Hat"
  tipo: "quiz"
  pregunta: "¿Qué gestor de paquetes usa Fedora?"
  opciones: ["apt", "yum", "dnf", "pacman"]
  respuesta: "dnf"
  recompensa: { xp: 20, items: ["estandarte_redhat"], bits: 10 }

mision_1_5:
  nombre: "Los Tesoros de Office"
  npc: "Linux el Sabio"
  objetivo: "Aprender alternativas libres"
  tipo: "matching"
  pares:
    - { ms: "Word", linux: "LibreOffice Writer" }
    - { ms: "Excel", linux: "LibreOffice Calc" }
    - { ms: "PowerPoint", linux: "LibreOffice Impress" }
    - { ms: "Photoshop", linux: "GIMP" }
  recompensa: { xp: 25, items: ["caja_herramientas"], bits: 15 }

mision_1_6:
  nombre: "El Camino del Servidor"
  npc: "Linux el Sabio"
  objetivo: "Identificar servicios servidor"
  tipo: "drag_drop"
  servicios: ["Apache", "Nginx", "MySQL", "PostgreSQL", "Postfix", "Samba"]
  recompensa: { xp: 30, items: ["llave_servidor"], bits: 15 }

mision_1_7:
  nombre: "El Pacto de la Libertad"
  npc: "Linux el Sabio"
  objetivo: "Entender las 4 libertades"
  tipo: "ordenar"
  items: ["Usar", "Estudiar", "Distribuir", "Modificar"]
  recompensa: { xp: 25, items: ["medallon_libertad"], bits: 15 }

mision_1_8:
  nombre: "Las Diez Licencias"
  npc: "Linux el Sabio"
  objetivo: "Conocer GPL vs MIT"
  tipo: "quiz"
  preguntas:
    - "¿Qué licencia usa el kernel Linux?"
    - "¿Qué significa copyleft?"
    - "¿Es MIT más permisiva que GPL?"
  recompensa: { xp: 30, items: ["pergamino_gpl"], bits: 20 }

mision_1_9:
  nombre: "Los Embajadores Libres"
  npc: "Linux el Sabio"
  objetivo: "FSF vs OSI"
  recompensa: { xp: 20, items: ["sello_fsf"], bits: 10 }

mision_1_10:
  nombre: "El Escritorio Místico"
  npc: "Linux el Sabio"
  objetivo: "Identificar entornos gráficos"
  tipo: "imagen_a_nombre"
  entornos: ["GNOME", "KDE", "XFCE", "Cinnamon", "MATE"]
  recompensa: { xp: 30, items: ["llave_gui"], bits: 20 }

mision_1_11:
  nombre: "La Nube Mágica"
  npc: "Linux el Sabio"
  objetivo: "Entender cloud computing"
  tipo: "verdadero_falso"
  afirmaciones:
    - "Cloud usa Linux internamente: VERDADERO"
    - "Cloud requiere comprar hardware: FALSO"
    - "AWS, Azure, GCP corren Linux: VERDADERO"
  recompensa: { xp: 25, items: ["cristal_cloud"], bits: 15 }

mision_1_12:
  nombre: "Los Sistemas Embebidos"
  npc: "Linux el Sabio"
  objetivo: "Linux en dispositivos pequeños"
  tipo: "matching"
  dispositivo_distro:
    - { device: "Raspberry Pi", distro: "Raspbian" }
    - { device: "Smartphone", distro: "Android" }
    - { device: "SmartTV", distro: "Linux modificado" }
    - { device: "Router", distro: "OpenWRT" }
  recompensa: { xp: 25, items: ["chip_embedded"], bits: 15 }

mision_1_13:
  nombre: "El Desafío del Encriptado"
  npc: "Linux el Sabio"
  objetivo: "Conceptos básicos GPG"
  comando: "gpg --version"
  validacion: "output contiene 'gpg'"
  recompensa: { xp: 30, items: ["llave_gpg"], bits: 20 }

mision_1_14:
  nombre: "El Guardián de la Privacidad"
  npc: "Linux el Sabio"
  objetivo: "HTTPS vs HTTP, VPN, Tor"
  tipo: "quiz_avanzado"
  recompensa: { xp: 35, items: ["capa_invisibilidad"], bits: 25 }

mision_1_15:
  nombre: "Boss Final - Guardián del Conocimiento Libre"
  npc: "BOSS"
  tipo: "boss_battle"
  pregunta_final: "Demuestra que dominas Tema 1 LPI"
  desafios:
    - "Quiz de 10 preguntas (Tema 1 completo)"
    - "Identificar 5 distribuciones por logo"
    - "Asignar licencia correcta a 5 proyectos"
  recompensa: 
    xp: 100
    items: ["corona_de_codigo", "pase_mundo_2"]
    bits: 100
    titulo: "Iniciado del Reino"
```

### Items específicos del Mundo 1:

```yaml
items_mundo_1:
  pergamino_basico: { descripcion: "Conocimiento fundamental Linux" }
  mapa_distros: { descripcion: "Muestra todas las distribuciones" }
  estandarte_debian: { descripcion: "Símbolo de la familia Debian" }
  estandarte_redhat: { descripcion: "Símbolo de la familia Red Hat" }
  caja_herramientas: { descripcion: "Apps libres para trabajar" }
  llave_servidor: { descripcion: "Acceso a conceptos de servidor" }
  medallon_libertad: { descripcion: "Las 4 libertades del software" }
  pergamino_gpl: { descripcion: "Texto sagrado de licencias" }
  sello_fsf: { descripcion: "Endorsement Free Software Foundation" }
  llave_gui: { descripcion: "Acceso a entornos gráficos" }
  cristal_cloud: { descripcion: "Poder de la nube" }
  chip_embedded: { descripcion: "Linux en dispositivos pequeños" }
  llave_gpg: { descripcion: "Encriptación GPG" }
  capa_invisibilidad: { descripcion: "Privacidad y anonimato" }
  corona_de_codigo: { descripcion: "Símbolo del primer mundo conquistado" }
  pase_mundo_2: { descripcion: "Acceso al Mundo 2" }
```

---

## 🌍 MUNDO 2: CAMINOS PERDIDOS

### Currículum LPI mapeado:
- **Tema 2:** Encontrando el camino en un sistema Linux

### Subsecciones:

#### 2.1 - Aspectos básicos de la línea de comandos

**Conceptos:**
- Estructura del comando: `comando -opciones argumentos`
- Comportamiento de comandos
- Comillas (simples, dobles, escape)
- Variables (`$VAR`, `${VAR}`)
- Manipulación de variables

**Comandos:**
```bash
echo "Hello"
echo $USER
NAME="LinuxQuest"
echo $NAME
export VAR=value
unset VAR
env
set
which python
type cd
```

#### 2.2 - Uso de la línea de comandos para obtener ayuda

**Comandos críticos:**
```bash
man comando        # Manual completo
man -k palabra     # Buscar en manuales
man -f comando     # Descripción corta
info comando       # Info pages
help comando       # Help builtin shell
comando --help     # Help específico
apropos palabra    # Sinónimo de man -k
whatis comando     # Sinónimo de man -f
```

**Estructura del manual:**
```
Sección 1: Comandos de usuario
Sección 2: System calls
Sección 3: Funciones de biblioteca
Sección 4: Devices
Sección 5: Formatos de archivo
Sección 6: Juegos
Sección 7: Convenciones
Sección 8: Comandos de admin
Sección 9: Kernel
```

#### 2.3 - Directorios y listado de archivos

**Conceptos:**
- Sistema de archivos jerárquico
- FHS (Filesystem Hierarchy Standard)
- Rutas absolutas vs relativas
- Directorio home (`~`)
- Directorios especiales (`.`, `..`, `~`)
- Archivos ocultos (empiezan con `.`)

**Comandos:**
```bash
pwd              # Directorio actual
cd /path         # Cambiar directorio
cd               # Ir a home
cd ~             # Ir a home
cd -             # Volver al anterior
cd ..            # Subir un nivel
cd ../..         # Subir dos niveles

ls               # Listar
ls -l            # Formato largo
ls -a            # Incluir ocultos
ls -la           # Largo + ocultos
ls -lh           # Tamaños humanos
ls -R            # Recursivo
ls -t            # Por tiempo
ls -S            # Por tamaño
ls --color       # Con colores
```

**Directorios principales:**
```
/                # Raíz
/bin             # Binarios esenciales
/sbin            # Binarios de admin
/etc             # Configuración del sistema
/home            # Directorios de usuario
/root            # Home del root
/tmp             # Archivos temporales
/var             # Datos variables (logs, mail)
/usr             # Programas de usuario
/usr/bin         # Programas usuarios normales
/usr/local       # Programas instalados localmente
/opt             # Software opcional
/proc            # Información del kernel
/sys             # Información del sistema
/dev             # Dispositivos
/mnt             # Puntos de montaje temporales
/media           # Medios extraíbles
/boot            # Archivos del bootloader
/lib             # Librerías esenciales
```

#### 2.4 - Crear, mover y borrar archivos

**Comandos:**
```bash
touch archivo            # Crear archivo vacío
touch -t 202304271200    # Cambiar fecha
mkdir directorio         # Crear directorio
mkdir -p a/b/c           # Crear ruta completa
mkdir -m 755 dir         # Con permisos

cp origen destino        # Copiar
cp -r dir1 dir2          # Recursivo
cp -i orig dest          # Pregunta antes
cp -p orig dest          # Preserva atributos

mv origen destino        # Mover/renombrar
mv -i orig dest          # Pregunta antes

rm archivo               # Borrar
rm -r directorio         # Borrar recursivo
rm -f archivo            # Forzar (no pregunta)
rm -rf directorio        # ⚠️ PELIGRO

rmdir directorio         # Borrar directorio vacío

# Globbing
ls *.txt                 # Todos los .txt
ls archivo?              # archivo + 1 char
ls [abc]*                # Empieza con a, b, o c
ls archivo[1-9]          # archivo1 a archivo9
```

### Misiones Mundo 2 (20 misiones):

```yaml
mision_2_1:
  nombre: "El Primer Paso del Caminante"
  npc: "Grep-Ild"
  objetivo: "Tu primer comando: pwd"
  comando: "pwd"
  validacion: "output empieza con /"
  recompensa: { xp: 15, items: ["botas_caminante"], bits: 5 }

mision_2_2:
  nombre: "El Mapa del Hogar"
  npc: "Grep-Ild"
  objetivo: "Llegar a tu directorio home"
  comando: "cd ~"
  validacion: "pwd_after = $HOME"
  recompensa: { xp: 15, items: ["llave_hogar"], bits: 10 }

mision_2_3:
  nombre: "Inspecciona el Reino"
  npc: "Grep-Ild"
  objetivo: "Listar archivos del directorio actual"
  comando: "ls"
  recompensa: { xp: 15, items: ["lente_observador"], bits: 5 }

mision_2_4:
  nombre: "Los Secretos Ocultos"
  npc: "Grep-Ild"
  objetivo: "Mostrar archivos ocultos"
  comando: "ls -a"
  validacion: "output contiene '.'"
  recompensa: { xp: 20, items: ["lente_arcano"], bits: 10 }

mision_2_5:
  nombre: "La Vista Detallada"
  npc: "Grep-Ild"
  objetivo: "Listado largo con detalles"
  comando: "ls -l"
  recompensa: { xp: 20, items: ["pergamino_detalles"], bits: 10 }

mision_2_6:
  nombre: "Los Tamaños Humanos"
  npc: "Grep-Ild"
  objetivo: "Listar con tamaños legibles"
  comando: "ls -lh"
  recompensa: { xp: 20, items: ["balanza_magica"], bits: 10 }

mision_2_7:
  nombre: "El Salto del Conejo"
  npc: "Grep-Ild"
  objetivo: "Subir un nivel de directorio"
  comando: "cd .."
  recompensa: { xp: 15, items: ["botas_salto"], bits: 5 }

mision_2_8:
  nombre: "El Sendero Absoluto"
  npc: "Grep-Ild"
  objetivo: "Navegar a /tmp con ruta absoluta"
  comando: "cd /tmp"
  validacion: "pwd = /tmp"
  recompensa: { xp: 25, items: ["mapa_absoluto"], bits: 15 }

mision_2_9:
  nombre: "Crear el Refugio"
  npc: "Grep-Ild"
  objetivo: "Crear directorio 'mi_aventura'"
  comando: "mkdir mi_aventura"
  validacion: "exists mi_aventura"
  recompensa: { xp: 20, items: ["pala_constructor"], bits: 10 }

mision_2_10:
  nombre: "El Pergamino en Blanco"
  npc: "Grep-Ild"
  objetivo: "Crear archivo 'aventura.txt'"
  comando: "touch aventura.txt"
  validacion: "exists aventura.txt"
  recompensa: { xp: 20, items: ["pluma_magica"], bits: 10 }

mision_2_11:
  nombre: "La Ruta Perfecta"
  npc: "Grep-Ild"
  objetivo: "Crear ruta anidada 'a/b/c'"
  comando: "mkdir -p a/b/c"
  validacion: "exists a/b/c"
  recompensa: { xp: 30, items: ["pico_arcano"], bits: 15 }

mision_2_12:
  nombre: "El Espejo de los Pergaminos"
  npc: "Grep-Ild"
  objetivo: "Copiar 'aventura.txt' a 'aventura_copia.txt'"
  comando: "cp aventura.txt aventura_copia.txt"
  recompensa: { xp: 25, items: ["espejo_clones"], bits: 15 }

mision_2_13:
  nombre: "El Ritual de Renombrar"
  npc: "Grep-Ild"
  objetivo: "Renombrar 'aventura_copia.txt' a 'leyenda.txt'"
  comando: "mv aventura_copia.txt leyenda.txt"
  recompensa: { xp: 25, items: ["pergamino_renombrar"], bits: 15 }

mision_2_14:
  nombre: "La Eliminación del Mal"
  npc: "Grep-Ild"
  objetivo: "Borrar 'leyenda.txt'"
  comando: "rm leyenda.txt"
  validacion: "NOT exists leyenda.txt"
  recompensa: { xp: 25, items: ["espada_purificadora"], bits: 15 }

mision_2_15:
  nombre: "El Manual del Sabio"
  npc: "Grep-Ild"
  objetivo: "Leer manual de 'ls'"
  comando: "man ls"
  recompensa: { xp: 30, items: ["libro_sagrado"], bits: 20 }

mision_2_16:
  nombre: "La Búsqueda de Conocimiento"
  npc: "Grep-Ild"
  objetivo: "Buscar comandos sobre 'copy'"
  comando: "apropos copy"
  recompensa: { xp: 25, items: ["bola_cristal"], bits: 15 }

mision_2_17:
  nombre: "La Variable Mística"
  npc: "Grep-Ild"
  objetivo: "Mostrar tu nombre de usuario"
  comando: "echo $USER"
  recompensa: { xp: 30, items: ["amuleto_var"], bits: 20 }

mision_2_18:
  nombre: "El Glob del Caos"
  npc: "Grep-Ild"
  objetivo: "Listar todos los .txt"
  comando: "ls *.txt"
  recompensa: { xp: 30, items: ["espejo_glob"], bits: 20 }

mision_2_19:
  nombre: "El Rango Mágico"
  npc: "Grep-Ild"
  objetivo: "Listar archivos[1-5]"
  comando: "ls archivo[1-5]"
  recompensa: { xp: 30, items: ["dado_rango"], bits: 20 }

mision_2_20:
  nombre: "Boss Mundo 2 - Guardián de los Caminos"
  npc: "BOSS"
  tipo: "boss_navegacion"
  desafios:
    - "Crea estructura completa: aventura/heroe/inventario/"
    - "Copia 3 archivos a otra carpeta"
    - "Mueve y renombra correctamente"
    - "Limpia todo sin errores"
  recompensa:
    xp: 150
    items: ["mapa_dorado", "pase_mundo_3"]
    bits: 100
    titulo: "Caminante Experto"
```

---

## 🌍 MUNDO 3: TORRES ANTIGUAS DEL PODER

### Currículum LPI mapeado:
- **Tema 3:** El poder de la línea de comandos

### Subsecciones:

#### 3.1 - Archivar ficheros desde la línea de comandos

**Comandos esenciales:**
```bash
# tar - The Tape ARchiver
tar -cvf archive.tar files/        # Crear
tar -xvf archive.tar               # Extraer
tar -tvf archive.tar               # Listar
tar -czvf archive.tar.gz files/    # Crear comprimido gzip
tar -xzvf archive.tar.gz           # Extraer gzip
tar -cjvf archive.tar.bz2 files/   # Crear comprimido bzip2
tar -xjvf archive.tar.bz2          # Extraer bzip2

# Compresión individual
gzip archivo                        # Comprimir → archivo.gz
gunzip archivo.gz                   # Descomprimir
gzip -d archivo.gz                  # Igual que gunzip
gzip -k archivo                     # Mantener original

bzip2 archivo                       # Mejor compresión
bunzip2 archivo.bz2                 # Descomprimir

xz archivo                          # Compresión moderna
unxz archivo.xz

# zip/unzip (compatibilidad Windows)
zip archive.zip files               # Crear zip
zip -r archive.zip directorio       # Recursivo
unzip archive.zip                   # Extraer
unzip -l archive.zip                # Listar

# cpio (legacy pero importante)
find . | cpio -o > archive.cpio
cpio -i < archive.cpio
```

#### 3.2 - Buscar y extraer datos de los ficheros

**Pipes y redirección:**
```bash
# Redirección
comando > archivo               # Stdout a archivo (sobrescribe)
comando >> archivo              # Stdout a archivo (append)
comando 2> error.log            # Stderr a archivo
comando &> all.log              # Stdout y Stderr a mismo archivo
comando < archivo               # Stdin desde archivo
comando << EOF                  # Heredoc
texto
EOF

# Pipes
comando1 | comando2             # Salida de 1 → entrada de 2
comando1 | comando2 | comando3  # Encadenar

# tee - duplicar salida
comando | tee archivo           # Pantalla Y archivo
comando | tee -a archivo        # Append
```

**Comandos de procesamiento:**
```bash
cat archivo                     # Mostrar todo
cat archivo1 archivo2           # Concatenar
cat -n archivo                  # Con números de línea

less archivo                    # Pager interactivo
more archivo                    # Pager simple
head archivo                    # Primeras 10 líneas
head -n 5 archivo              # Primeras 5
tail archivo                    # Últimas 10 líneas
tail -n 5 archivo              # Últimas 5
tail -f archivo                # Seguir cambios

wc archivo                      # Líneas, palabras, bytes
wc -l archivo                   # Solo líneas
wc -w archivo                   # Solo palabras
wc -c archivo                   # Solo bytes

sort archivo                    # Ordenar
sort -r archivo                 # Inverso
sort -n archivo                 # Numérico
sort -k 2 archivo              # Por columna 2
sort -u archivo                 # Único

uniq archivo                    # Líneas únicas (necesita ordenado)
uniq -c archivo                 # Con conteo
uniq -d archivo                 # Solo duplicados

cut -d ',' -f 1 archivo        # Columna 1 separado por coma
cut -c 1-10 archivo            # Caracteres 1-10

tr 'a-z' 'A-Z' < archivo       # Traducir/reemplazar
tr -d '\n' < archivo            # Eliminar newlines
tr -s ' ' < archivo             # Squash espacios
```

**grep y regex:**
```bash
grep "patron" archivo           # Buscar patrón
grep -i "patron" archivo        # Case insensitive
grep -v "patron" archivo        # Inverso (no contiene)
grep -r "patron" directorio     # Recursivo
grep -n "patron" archivo        # Con número de línea
grep -c "patron" archivo        # Contar coincidencias
grep -l "patron" *.txt          # Solo nombres de archivos

# Regex básico
grep "^inicio" archivo          # Inicio de línea
grep "fin$" archivo             # Fin de línea
grep "a.b" archivo              # . = cualquier char
grep "[abc]" archivo            # Cualquiera de a, b, c
grep "[^abc]" archivo           # Excepto a, b, c
grep "a*" archivo               # Cero o más a
grep "a+" archivo               # Una o más (egrep)
grep "a?" archivo               # Cero o uno (egrep)
grep -E "a|b" archivo           # Extended regex (OR)

# sed - Stream EDitor
sed 's/old/new/' archivo        # Reemplaza primera
sed 's/old/new/g' archivo       # Reemplaza todas
sed -i 's/old/new/g' archivo    # In-place edit
sed '1d' archivo                # Borra línea 1
sed '/patron/d' archivo         # Borra líneas con patrón
sed -n '5,10p' archivo          # Imprime líneas 5-10

# awk - Procesador potente
awk '{print $1}' archivo        # Primera columna
awk -F ',' '{print $2}' archivo # Separador coma, columna 2
awk '{sum+=$1} END {print sum}' # Sumar columna 1
awk '$1>10 {print}' archivo     # Filtrar
awk 'NR==5 {print}' archivo     # Línea 5

# find - búsqueda potente
find / -name "archivo.txt"     # Buscar por nombre
find / -name "*.log"            # Por extensión
find / -type f                  # Solo archivos
find / -type d                  # Solo directorios
find / -size +100M              # > 100MB
find / -mtime -7                # Modificados últimos 7 días
find / -user juan               # Por usuario
find / -name "*.bak" -delete    # Borrar encontrados
find / -exec comando {} \;      # Ejecutar comando

# locate - búsqueda rápida (necesita updatedb)
locate archivo
sudo updatedb
```

#### 3.3 - Crear scripts a partir de comandos

**Estructura básica de script:**
```bash
#!/bin/bash
# Comentario
# Variables
NAME="LinuxQuest"
echo "Hola $NAME"

# Argumentos
echo "Script: $0"
echo "Primer arg: $1"
echo "Segundo arg: $2"
echo "Todos: $@"
echo "Cantidad: $#"

# Condicionales
if [ "$1" == "hola" ]; then
    echo "Hola tú también"
elif [ "$1" == "adios" ]; then
    echo "Adiós"
else
    echo "No entendí"
fi

# Comparaciones
[ -f archivo ]      # Existe archivo
[ -d dir ]          # Existe directorio
[ -r archivo ]      # Legible
[ -w archivo ]      # Escribible
[ -x archivo ]      # Ejecutable
[ -z "$VAR" ]       # Variable vacía
[ "$A" == "$B" ]    # Strings iguales
[ "$A" -eq "$B" ]   # Números iguales
[ "$A" -lt "$B" ]   # Menor que
[ "$A" -gt "$B" ]   # Mayor que

# Bucles
for i in 1 2 3; do
    echo $i
done

for f in *.txt; do
    echo "Procesando $f"
done

while [ condition ]; do
    comando
done

# Funciones
saludar() {
    echo "Hola $1"
}
saludar "Juan"

# Hacer ejecutable
chmod +x script.sh
./script.sh
```

**Editores (vi/nano):**
```bash
# vim/vi
vi archivo      # Abrir
i               # Modo inserción
ESC             # Salir de inserción
:w              # Guardar
:q              # Salir
:wq             # Guardar y salir
:q!             # Salir sin guardar
dd              # Borrar línea
yy              # Copiar línea
p               # Pegar
/patron         # Buscar
:%s/old/new/g   # Reemplazar todo

# nano (más fácil)
nano archivo    # Abrir
Ctrl+O          # Guardar
Ctrl+X          # Salir
Ctrl+W          # Buscar
Ctrl+K          # Cortar línea
Ctrl+U          # Pegar
```

### Misiones Mundo 3 (20 misiones):

```yaml
mision_3_1:
  nombre: "El Primer Pergamino Comprimido"
  npc: "Chmod-Ard"
  objetivo: "Crear archivo.tar de un directorio"
  comando: "tar -cvf backup.tar mis_archivos/"
  recompensa: { xp: 30, items: ["caja_compresion"], bits: 15 }

mision_3_2:
  nombre: "La Liberación del Pergamino"
  npc: "Chmod-Ard"
  objetivo: "Extraer archivo.tar"
  comando: "tar -xvf backup.tar"
  recompensa: { xp: 25, items: ["pergamino_liberado"], bits: 15 }

mision_3_3:
  nombre: "El Hechizo de la Compresión Doble"
  npc: "Chmod-Ard"
  objetivo: "Crear .tar.gz"
  comando: "tar -czvf backup.tar.gz mis_archivos/"
  recompensa: { xp: 35, items: ["doble_caja"], bits: 20 }

mision_3_4:
  nombre: "La Tubería Mística"
  npc: "Chmod-Ard"
  objetivo: "Encadenar ls con grep"
  comando: "ls -la | grep \".txt\""
  recompensa: { xp: 40, items: ["pipe_dorado"], bits: 25 }

mision_3_5:
  nombre: "La Redirección al Infinito"
  npc: "Chmod-Ard"
  objetivo: "Guardar salida en archivo"
  comando: "ls > listado.txt"
  recompensa: { xp: 35, items: ["pergamino_redireccion"], bits: 20 }

mision_3_6:
  nombre: "La Bestia del Append"
  npc: "Chmod-Ard"
  objetivo: "Agregar a archivo existente"
  comando: "echo \"línea\" >> archivo.txt"
  recompensa: { xp: 30, items: ["pluma_append"], bits: 20 }

mision_3_7:
  nombre: "Los Espejos del Tee"
  npc: "Chmod-Ard"
  objetivo: "Mostrar Y guardar simultáneamente"
  comando: "ls | tee listado.txt"
  recompensa: { xp: 40, items: ["espejo_tee"], bits: 25 }

mision_3_8:
  nombre: "El Cazador de Patrones"
  npc: "Chmod-Ard"
  objetivo: "Buscar 'error' en archivos"
  comando: "grep \"error\" archivo.log"
  recompensa: { xp: 40, items: ["arco_grep"], bits: 25 }

mision_3_9:
  nombre: "Las Mil Búsquedas"
  npc: "Chmod-Ard"
  objetivo: "Buscar recursivamente"
  comando: "grep -r \"TODO\" ."
  recompensa: { xp: 45, items: ["arco_recursivo"], bits: 30 }

mision_3_10:
  nombre: "El Conjuro Insensible"
  npc: "Chmod-Ard"
  objetivo: "Buscar sin distinguir mayúsculas"
  comando: "grep -i \"warning\" log.txt"
  recompensa: { xp: 35, items: ["lente_neutral"], bits: 20 }

mision_3_11:
  nombre: "La Inversión Sagrada"
  npc: "Chmod-Ard"
  objetivo: "Líneas que NO contienen patrón"
  comando: "grep -v \"#\" config.txt"
  recompensa: { xp: 40, items: ["espejo_invertido"], bits: 25 }

mision_3_12:
  nombre: "Las Cabezas del Pergamino"
  npc: "Chmod-Ard"
  objetivo: "Primeras 10 líneas"
  comando: "head -n 10 archivo.txt"
  recompensa: { xp: 30, items: ["corona_head"], bits: 20 }

mision_3_13:
  nombre: "Las Colas Persistentes"
  npc: "Chmod-Ard"
  objetivo: "Seguir log en tiempo real"
  comando: "tail -f /var/log/syslog"
  recompensa: { xp: 45, items: ["ojo_persistente"], bits: 30 }

mision_3_14:
  nombre: "El Ordenador Místico"
  npc: "Chmod-Ard"
  objetivo: "Ordenar archivo numéricamente"
  comando: "sort -n numeros.txt"
  recompensa: { xp: 35, items: ["balanza_orden"], bits: 25 }

mision_3_15:
  nombre: "Los Únicos Sobrevivientes"
  npc: "Chmod-Ard"
  objetivo: "Líneas únicas con conteo"
  comando: "sort archivo.txt | uniq -c"
  recompensa: { xp: 50, items: ["filtro_uniq"], bits: 35 }

mision_3_16:
  nombre: "El Cuchillo Cortador"
  npc: "Chmod-Ard"
  objetivo: "Extraer columna 2 de CSV"
  comando: "cut -d ',' -f 2 datos.csv"
  recompensa: { xp: 45, items: ["cuchillo_cut"], bits: 30 }

mision_3_17:
  nombre: "El Hechizo Sed"
  npc: "Chmod-Ard"
  objetivo: "Reemplazar texto"
  comando: "sed 's/old/new/g' archivo.txt"
  recompensa: { xp: 50, items: ["varita_sed"], bits: 35 }

mision_3_18:
  nombre: "El Buscador Awk"
  npc: "Chmod-Ard"
  objetivo: "Imprimir primera columna"
  comando: "awk '{print $1}' datos.txt"
  recompensa: { xp: 50, items: ["bola_awk"], bits: 35 }

mision_3_19:
  nombre: "Tu Primer Script Mágico"
  npc: "Chmod-Ard"
  objetivo: "Crear y ejecutar script bash"
  pasos:
    - "echo '#!/bin/bash' > saludo.sh"
    - "echo 'echo Hola Mundo' >> saludo.sh"
    - "chmod +x saludo.sh"
    - "./saludo.sh"
  recompensa: { xp: 80, items: ["grimorio_bash"], bits: 60 }

mision_3_20:
  nombre: "Boss Mundo 3 - El Mago Pipemaster"
  npc: "BOSS"
  tipo: "boss_pipes"
  desafios:
    - "Procesa log: extrae IPs únicas con conteo"
    - "Crea backup comprimido de carpeta"
    - "Script que muestre archivos del día"
  recompensa:
    xp: 200
    items: ["bastón_supremo", "pase_mundo_4"]
    bits: 150
    titulo: "Mago de la Línea de Comandos"
```

---

## 🌍 MUNDO 4: NÚCLEO DEL REINO

### Currículum LPI mapeado:
- **Tema 4:** El sistema operativo Linux

### Subsecciones:

#### 4.1 - Elección del sistema operativo

**Diferencias Win/Mac/Linux:**
```yaml
windows:
  filesystem: "NTFS"
  case_sensitivity: false
  path_separator: "\\"
  ejecutables: ".exe, .bat, .cmd"
  
mac:
  filesystem: "APFS, HFS+"
  case_sensitivity: depende
  path_separator: "/"
  base: "Unix (BSD)"
  
linux:
  filesystem: "ext4, btrfs, xfs, etc"
  case_sensitivity: true
  path_separator: "/"
  ejecutables: "permiso x"
  open_source: true
```

**Ciclo de vida de distribuciones:**
- LTS (Long Term Support): 5+ años
- Stable: 2-3 años  
- Rolling release: actualizaciones constantes
- End-of-life (EOL): sin soporte

#### 4.2 - Conocer el hardware del ordenador

**Comandos de hardware:**
```bash
# CPU
lscpu                       # Info detallada CPU
cat /proc/cpuinfo           # Info raw
nproc                       # Número de cores

# Memoria
free                        # RAM y swap
free -h                     # Humano
cat /proc/meminfo           # Detallado

# Discos
lsblk                       # Bloques de almacenamiento
df                          # Espacio usado
df -h                       # Humano
du -sh directorio/          # Tamaño de directorio
fdisk -l                    # Particiones (necesita sudo)

# USB y otros buses
lsusb                       # Dispositivos USB
lspci                       # Dispositivos PCI
lspci | grep VGA           # Tarjetas video

# Hardware general
sudo dmidecode              # Info BIOS/hardware
hwinfo                      # Hardware info
inxi                        # Info elegante (instalable)

# Información del sistema
uname -a                    # Info sistema completa
uname -r                    # Versión kernel
hostnamectl                 # Hostname y info
uptime                      # Tiempo encendido
date                        # Fecha y hora
cal                         # Calendario
```

**Dispositivos en /dev:**
```
/dev/sda      # Primer disco SATA/SCSI
/dev/sdb      # Segundo disco
/dev/sda1     # Primera partición primer disco
/dev/nvme0n1  # SSD NVMe
/dev/cdrom    # CD/DVD
/dev/usb...   # USB
/dev/null     # Agujero negro
/dev/zero     # Genera ceros
/dev/random   # Aleatorio
```

#### 4.3 - Donde se almacenan los datos

**Procesos:**
```bash
ps                          # Procesos del shell actual
ps aux                      # Todos los procesos
ps auxf                     # Con árbol
ps -ef                      # Otra forma
ps -u usuario               # De un usuario

top                         # Monitor en vivo
htop                        # Top mejorado (instalable)

kill PID                    # Terminar proceso (SIGTERM)
kill -9 PID                 # Forzar (SIGKILL)
killall nombre              # Matar por nombre
pkill nombre                # Igual

jobs                        # Procesos en background
bg %1                       # Mandar a background
fg %1                       # Traer a foreground
nohup comando &             # Resistir cierre de sesión
```

**Logs del sistema:**
```bash
# systemd-journal
journalctl                  # Todo el journal
journalctl -u nginx         # Por servicio
journalctl -f               # Seguir
journalctl --since "1 hour ago"
journalctl -p err           # Por prioridad

# Logs tradicionales
tail -f /var/log/syslog     # Log general (Debian)
tail -f /var/log/messages   # General (Red Hat)
tail -f /var/log/auth.log   # Autenticación
tail -f /var/log/kern.log   # Kernel
dmesg                       # Mensajes del kernel
dmesg -T                    # Con timestamps

# Archivos importantes
/etc/fstab                  # Sistemas a montar
/etc/passwd                 # Usuarios
/etc/shadow                 # Contraseñas (solo root)
/etc/group                  # Grupos
/etc/hostname               # Nombre del equipo
/etc/hosts                  # Hosts locales
```

**Memoria virtual:**
```bash
vmstat                      # Stats memoria virtual
swapon                      # Mostrar swap
sudo swapon /swapfile       # Activar swap
free -h                     # Ver swap usado
```

#### 4.4 - Tu ordenador en la red

**Conceptos:**
- IP (IPv4: 4 octetos, IPv6: 8 grupos hex)
- Máscara de red
- Gateway
- DNS
- TCP/UDP
- Puertos comunes (22 SSH, 80 HTTP, 443 HTTPS)

**Comandos de red:**
```bash
# Configuración
ip addr                     # Mostrar IPs
ip a                        # Abreviado
ip route                    # Tabla de rutas
ip r                        # Abreviado
ifconfig                    # Legacy (deprecated)
hostname                    # Nombre equipo
hostname -I                 # IPs del equipo

# Conectividad
ping google.com             # Probar conexión
ping -c 4 google.com        # 4 paquetes
traceroute google.com       # Ruta a destino
mtr google.com              # Combinado ping+traceroute

# DNS
host google.com             # Resolver DNS
dig google.com              # Más info
nslookup google.com         # Otra forma

# Puertos y conexiones
ss -tuln                    # Sockets TCP/UDP escuchando
netstat -tuln               # Legacy
lsof -i :80                 # Quién usa puerto 80
nmap localhost              # Scan ports (instalable)

# Configuración DNS
cat /etc/resolv.conf        # Servidores DNS
cat /etc/hosts              # Hosts locales

# Wget y curl
wget https://url             # Descargar archivo
curl https://url             # Hacer request
curl -O https://file         # Descargar
curl -X POST -d "data" url   # POST request

# SSH
ssh user@server             # Conectar
ssh -p 2222 user@server     # Puerto custom
scp archivo user@server:/path  # Copiar via SSH
ssh-keygen                  # Generar llaves
ssh-copy-id user@server     # Copiar llave pública
```

### Misiones Mundo 4 (20 misiones):

```yaml
mision_4_1:
  nombre: "El Conocedor del Núcleo"
  npc: "Kernel el Forjador"
  objetivo: "Ver versión del kernel"
  comando: "uname -r"
  recompensa: { xp: 30, items: ["medallon_kernel"], bits: 20 }

mision_4_2:
  nombre: "El Inspector de CPU"
  npc: "Kernel el Forjador"
  objetivo: "Información del procesador"
  comando: "lscpu"
  recompensa: { xp: 35, items: ["chip_cpu"], bits: 25 }

mision_4_3:
  nombre: "La Memoria del Reino"
  npc: "Kernel el Forjador"
  objetivo: "Ver memoria RAM"
  comando: "free -h"
  recompensa: { xp: 30, items: ["cristal_ram"], bits: 20 }

mision_4_4:
  nombre: "Los Discos Eternos"
  npc: "Kernel el Forjador"
  objetivo: "Listar dispositivos de bloque"
  comando: "lsblk"
  recompensa: { xp: 35, items: ["disco_dorado"], bits: 25 }

mision_4_5:
  nombre: "El Espacio Disponible"
  npc: "Kernel el Forjador"
  objetivo: "Ver espacio en disco"
  comando: "df -h"
  recompensa: { xp: 30, items: ["regla_espacio"], bits: 20 }

mision_4_6:
  nombre: "Los Ríos USB"
  npc: "Kernel el Forjador"
  objetivo: "Listar dispositivos USB"
  comando: "lsusb"
  recompensa: { xp: 30, items: ["llave_usb"], bits: 20 }

mision_4_7:
  nombre: "Los Procesos Vivos"
  npc: "Kernel el Forjador"
  objetivo: "Ver todos los procesos"
  comando: "ps aux"
  recompensa: { xp: 40, items: ["lupa_procesos"], bits: 30 }

mision_4_8:
  nombre: "El Top del Reino"
  npc: "Kernel el Forjador"
  objetivo: "Monitor en vivo"
  comando: "top"
  recompensa: { xp: 45, items: ["trono_top"], bits: 35 }

mision_4_9:
  nombre: "El Verdugo de Procesos"
  npc: "Kernel el Forjador"
  objetivo: "Matar proceso por PID"
  comando: "kill PID"
  recompensa: { xp: 50, items: ["espada_kill"], bits: 40 }

mision_4_10:
  nombre: "El Diario del Reino"
  npc: "Kernel el Forjador"
  objetivo: "Ver journal de systemd"
  comando: "journalctl -n 50"
  recompensa: { xp: 45, items: ["libro_journal"], bits: 35 }

mision_4_11:
  nombre: "El Mensaje del Kernel"
  npc: "Kernel el Forjador"
  objetivo: "Ver mensajes del kernel"
  comando: "dmesg | tail -20"
  recompensa: { xp: 45, items: ["pergamino_dmesg"], bits: 35 }

mision_4_12:
  nombre: "El Tiempo en el Reino"
  npc: "Kernel el Forjador"
  objetivo: "Tiempo encendido del sistema"
  comando: "uptime"
  recompensa: { xp: 25, items: ["reloj_uptime"], bits: 15 }

mision_4_13:
  nombre: "El Camino de Red"
  npc: "Kernel el Forjador"
  objetivo: "Ver IPs del sistema"
  comando: "ip addr"
  recompensa: { xp: 40, items: ["mapa_red"], bits: 30 }

mision_4_14:
  nombre: "Las Rutas del Mensajero"
  npc: "Kernel el Forjador"
  objetivo: "Ver tabla de rutas"
  comando: "ip route"
  recompensa: { xp: 40, items: ["brújula_red"], bits: 30 }

mision_4_15:
  nombre: "El Eco del Cielo"
  npc: "Kernel el Forjador"
  objetivo: "Ping a google"
  comando: "ping -c 4 google.com"
  recompensa: { xp: 35, items: ["eco_ping"], bits: 25 }

mision_4_16:
  nombre: "El DNS Mágico"
  npc: "Kernel el Forjador"
  objetivo: "Resolver dominio"
  comando: "host google.com"
  recompensa: { xp: 40, items: ["pergamino_dns"], bits: 30 }

mision_4_17:
  nombre: "Los Puertos del Castillo"
  npc: "Kernel el Forjador"
  objetivo: "Ver puertos escuchando"
  comando: "ss -tuln"
  recompensa: { xp: 45, items: ["llave_puertos"], bits: 35 }

mision_4_18:
  nombre: "La Conexión SSH"
  npc: "Kernel el Forjador"
  objetivo: "Generar llave SSH"
  comando: "ssh-keygen"
  recompensa: { xp: 50, items: ["llave_ssh"], bits: 40 }

mision_4_19:
  nombre: "El Mensajero curl"
  npc: "Kernel el Forjador"
  objetivo: "Hacer request HTTP"
  comando: "curl https://api.github.com"
  recompensa: { xp: 40, items: ["mensajero_curl"], bits: 30 }

mision_4_20:
  nombre: "Boss Mundo 4 - El Núcleo Roto"
  npc: "BOSS"
  tipo: "boss_sistema"
  desafios:
    - "Diagnostica problema de red"
    - "Encuentra proceso consumiendo memoria"
    - "Revisa logs y encuentra el error"
  recompensa:
    xp: 250
    items: ["forja_kernel", "pase_mundo_5"]
    bits: 200
    titulo: "Forjador del Núcleo"
```

---

## 🌍 MUNDO 5: BÓVEDAS SECRETAS

### Currículum LPI mapeado:
- **Tema 5:** Seguridad y permisos

### Subsecciones:

#### 5.1 - Seguridad básica e identificación de usuarios

**Tipos de usuarios:**
```
root (UID 0):       Superusuario, control total
Usuarios sistema:   UID 1-999 (servicios, daemons)
Usuarios normales:  UID 1000+ (humanos)
```

**Comandos:**
```bash
whoami              # Usuario actual
id                  # ID del usuario actual
id usuario          # ID de otro usuario
who                 # Quién está conectado
w                   # Quién y qué hacen
last                # Últimos logins
lastlog             # Último login por usuario
finger usuario      # Info detallada (instalable)

su                  # Cambiar a root
su - usuario        # Cambiar a usuario
su -                # Root con su entorno
sudo comando        # Ejecutar como root
sudo -i             # Shell de root
sudo -u usuario cmd # Como otro usuario
exit                # Salir de su/sudo
```

#### 5.2 - Crear usuarios y grupos

**Comandos críticos:**
```bash
# Crear usuarios
useradd usuario              # Crear usuario básico
useradd -m usuario           # Con home
useradd -m -s /bin/bash usuario
useradd -G grupo usuario     # Con grupo secundario
adduser usuario              # Interactivo (Debian)

# Modificar
usermod -aG grupo usuario    # Agregar a grupo
usermod -L usuario           # Bloquear
usermod -U usuario           # Desbloquear
usermod -s /bin/zsh usuario  # Cambiar shell
usermod -d /new/home usuario # Cambiar home

# Eliminar
userdel usuario              # Borrar
userdel -r usuario           # Borrar con home

# Contraseñas
passwd                       # Cambiar tu password
sudo passwd usuario          # Cambiar de otro
passwd -l usuario            # Bloquear
passwd -u usuario            # Desbloquear
chage usuario                # Configurar caducidad

# Grupos
groupadd grupo               # Crear grupo
groupdel grupo               # Borrar
groupmod -n nuevo viejo      # Renombrar
groups                       # Mis grupos
groups usuario               # Grupos de usuario
gpasswd -a usuario grupo     # Agregar a grupo
gpasswd -d usuario grupo     # Quitar de grupo
```

**Archivos de configuración:**
```
/etc/passwd:
formato: usuario:x:UID:GID:gecos:home:shell

/etc/shadow:
formato: usuario:hash_password:lastchange:min:max:warn:inactive:expire

/etc/group:
formato: grupo:x:GID:miembros

/etc/skel/:
plantilla para nuevos usuarios
```

#### 5.3 - Gestión de permisos

**Tipos de permisos:**
```
r (read)    = 4
w (write)   = 2
x (execute) = 1

Para directorios:
r = listar contenido
w = crear/borrar archivos
x = entrar al directorio

Tres categorías:
u = usuario (owner)
g = grupo
o = otros
a = todos (a = u+g+o)
```

**Comandos:**
```bash
# chmod - cambiar permisos
chmod 755 archivo               # rwxr-xr-x
chmod 644 archivo               # rw-r--r--
chmod +x script.sh              # Agregar ejecución
chmod -w archivo                # Quitar escritura
chmod u+x archivo               # Solo usuario ejecuta
chmod g-w archivo               # Quitar grupo escribe
chmod o=r archivo               # Otros solo lectura
chmod -R 755 directorio         # Recursivo

# Modos comunes:
755 = rwxr-xr-x (scripts/dirs)
644 = rw-r--r-- (archivos normales)
600 = rw------- (privados)
700 = rwx------ (privados ejecutables)
777 = rwxrwxrwx (TODO el mundo, peligroso)

# chown - cambiar propietario
chown usuario archivo           # Solo usuario
chown usuario:grupo archivo     # Usuario y grupo
chown :grupo archivo            # Solo grupo
chown -R usuario directorio     # Recursivo

# chgrp - cambiar grupo
chgrp grupo archivo

# umask - máscara default
umask                           # Ver actual
umask 022                       # Establecer
# umask 022 → archivos 644, dirs 755
```

**Permisos especiales:**
```bash
# SUID (Set User ID)
chmod u+s archivo               # SUID
chmod 4755 archivo              # Con número
# Ejecuta como el dueño (ej: passwd, sudo)

# SGID (Set Group ID)
chmod g+s archivo               # SGID
chmod 2755 archivo              # Con número
# En dir: archivos heredan grupo

# Sticky bit
chmod +t directorio             # Sticky
chmod 1755 directorio           # Con número
# Solo dueño puede borrar (ej: /tmp)
```

#### 5.4 - Directorios y archivos especiales

**Directorios temporales:**
```
/tmp                # Temporales (sticky bit)
/var/tmp            # Temporales persistentes (sobreviven reinicio)
/run                # Runtime
```

**Enlaces:**
```bash
# Hard link (mismo inodo)
ln archivo enlace
# Mismo archivo con dos nombres

# Symbolic link (acceso directo)
ln -s archivo enlace
ln -s /path/destino /path/enlace

# Ver enlaces
ls -l                       # 'l' al inicio = symlink
readlink enlace             # Dónde apunta
```

### Misiones Mundo 5 (20 misiones):

```yaml
mision_5_1:
  nombre: "Tu Identidad en el Reino"
  npc: "Sudo-Man"
  objetivo: "Identificarse"
  comando: "whoami"
  recompensa: { xp: 30, items: ["espejo_yo"], bits: 20 }

mision_5_2:
  nombre: "Los Detalles del Ser"
  npc: "Sudo-Man"
  objetivo: "Ver tu ID y grupos"
  comando: "id"
  recompensa: { xp: 30, items: ["pergamino_id"], bits: 20 }

mision_5_3:
  nombre: "Los Ojos del Castillo"
  npc: "Sudo-Man"
  objetivo: "Ver quién está conectado"
  comando: "who"
  recompensa: { xp: 35, items: ["lupa_who"], bits: 25 }

mision_5_4:
  nombre: "El Trabajo del Pueblo"
  npc: "Sudo-Man"
  objetivo: "Ver qué hacen los usuarios"
  comando: "w"
  recompensa: { xp: 35, items: ["lente_w"], bits: 25 }

mision_5_5:
  nombre: "El Libro de los Usuarios"
  npc: "Sudo-Man"
  objetivo: "Ver /etc/passwd"
  comando: "cat /etc/passwd"
  recompensa: { xp: 40, items: ["libro_passwd"], bits: 30 }

mision_5_6:
  nombre: "Crear un Aliado"
  npc: "Sudo-Man"
  objetivo: "Crear usuario (con sudo)"
  comando: "sudo useradd -m aliado"
  recompensa: { xp: 60, items: ["pluma_useradd"], bits: 50 }

mision_5_7:
  nombre: "La Llave del Aliado"
  npc: "Sudo-Man"
  objetivo: "Asignar contraseña"
  comando: "sudo passwd aliado"
  recompensa: { xp: 50, items: ["llave_passwd"], bits: 40 }

mision_5_8:
  nombre: "El Grupo Sagrado"
  npc: "Sudo-Man"
  objetivo: "Crear grupo"
  comando: "sudo groupadd guerreros"
  recompensa: { xp: 50, items: ["estandarte_grupo"], bits: 40 }

mision_5_9:
  nombre: "Unirse al Hermandad"
  npc: "Sudo-Man"
  objetivo: "Agregar usuario a grupo"
  comando: "sudo usermod -aG guerreros aliado"
  recompensa: { xp: 55, items: ["sello_hermandad"], bits: 45 }

mision_5_10:
  nombre: "El Banquero del Reino"
  npc: "Sudo-Man"
  objetivo: "Ver /etc/group"
  comando: "cat /etc/group"
  recompensa: { xp: 30, items: ["pergamino_grupos"], bits: 20 }

mision_5_11:
  nombre: "Los Permisos Sagrados"
  npc: "Sudo-Man"
  objetivo: "Ver permisos de archivos"
  comando: "ls -la"
  recompensa: { xp: 35, items: ["lente_permisos"], bits: 25 }

mision_5_12:
  nombre: "El Cambio de Permisos Numérico"
  npc: "Sudo-Man"
  objetivo: "Hacer ejecutable script"
  comando: "chmod 755 script.sh"
  recompensa: { xp: 50, items: ["mazo_chmod"], bits: 40 }

mision_5_13:
  nombre: "El Cambio Simbólico"
  npc: "Sudo-Man"
  objetivo: "Quitar permisos de otros"
  comando: "chmod o-rwx archivo"
  recompensa: { xp: 50, items: ["mazo_simbolico"], bits: 40 }

mision_5_14:
  nombre: "La Propiedad Cambiada"
  npc: "Sudo-Man"
  objetivo: "Cambiar dueño"
  comando: "sudo chown usuario archivo"
  recompensa: { xp: 60, items: ["sello_propiedad"], bits: 50 }

mision_5_15:
  nombre: "El SUID Mágico"
  npc: "Sudo-Man"
  objetivo: "Activar SUID"
  comando: "sudo chmod u+s archivo"
  recompensa: { xp: 70, items: ["amuleto_suid"], bits: 60 }

mision_5_16:
  nombre: "El Pegajoso de /tmp"
  npc: "Sudo-Man"
  objetivo: "Ver sticky bit en /tmp"
  comando: "ls -ld /tmp"
  recompensa: { xp: 50, items: ["lente_sticky"], bits: 40 }

mision_5_17:
  nombre: "El Enlace Duro"
  npc: "Sudo-Man"
  objetivo: "Crear hard link"
  comando: "ln archivo enlace"
  recompensa: { xp: 50, items: ["cadena_dura"], bits: 40 }

mision_5_18:
  nombre: "El Enlace Suave"
  npc: "Sudo-Man"
  objetivo: "Crear symbolic link"
  comando: "ln -s archivo enlace_suave"
  recompensa: { xp: 50, items: ["cadena_suave"], bits: 40 }

mision_5_19:
  nombre: "El Cambio de Identidad"
  npc: "Sudo-Man"
  objetivo: "Cambiar a otro usuario"
  comando: "su - usuario"
  recompensa: { xp: 55, items: ["máscara_su"], bits: 45 }

mision_5_20:
  nombre: "Boss Final - El Guardián Supremo"
  npc: "BOSS_FINAL"
  tipo: "boss_supremo"
  desafios:
    - "Crea estructura de seguridad: usuarios, grupos, permisos"
    - "Implementa permisos correctos (no 777)"
    - "Soluciona problema de seguridad complejo"
    - "Quiz final: 20 preguntas de los 5 temas"
  recompensa:
    xp: 500
    items: ["corona_suprema", "titulo_certificado_lpi"]
    bits: 500
    titulo: "Maestro Linux Essentials"
    achievement: "Certificación LPI Linux Essentials simulada completada"
```

---

## 🎯 SISTEMA DE PROGRESIÓN

### Niveles del jugador:

```yaml
niveles:
  1-5:    "Iniciado"           # Mundo 1
  6-15:   "Aprendiz"            # Mundo 2
  16-25:  "Aventurero"          # Mundo 3
  26-35:  "Caballero"           # Mundo 4
  36-50:  "Maestro Linux"       # Mundo 5
  
xp_por_nivel:
  formula: "100 * nivel"
  nivel_2: 100
  nivel_5: 250
  nivel_10: 500
  nivel_25: 1250
  nivel_50: 2500
```

### Sistema de bits (moneda):

```yaml
gastos_bits:
  comprar_pista: 10
  saltar_mision: 50
  comprar_item_basico: 25
  comprar_item_raro: 100
  comprar_item_epico: 500
  resetear_progreso: 1000
```

### Tienda del juego:

```yaml
items_comprables:
  pociones:
    pocion_pistas:
      precio: 15
      efecto: "Da pista en próxima misión"
    pocion_xp_doble:
      precio: 50
      efecto: "XP x2 en próximas 3 misiones"
    pocion_tiempo_extra:
      precio: 30
      efecto: "+5 min en misiones cronometradas"
  
  equipamiento:
    casco_sudo:
      precio: 200
      efecto: "Comandos sudo más rápidos"
    botas_velocidad:
      precio: 150
      efecto: "Auto-completar más rápido"
    capa_seguridad:
      precio: 300
      efecto: "Resistencia a ataques en boss"
```

### Logros (achievements):

```yaml
logros:
  primer_comando:
    nombre: "Primer Paso"
    descripcion: "Ejecuta tu primer comando"
    icono: "🎯"
    
  velocista:
    nombre: "Velocista"
    descripcion: "Completa 10 misiones en menos de 1 hora"
    icono: "⚡"
    
  perfeccionista:
    nombre: "Perfeccionista"
    descripcion: "Completa misión sin errores"
    icono: "💯"
    
  explorador:
    nombre: "Explorador"
    descripcion: "Visita los 5 mundos"
    icono: "🗺️"
    
  dominador:
    nombre: "Dominador del Reino"
    descripcion: "Termina los 5 bosses finales"
    icono: "👑"
    
  certificado:
    nombre: "Linux Master"
    descripcion: "Completa todas las 95 misiones"
    icono: "🏆"
```

---

## 🎨 NARRATIVA Y AMBIENTACIÓN

### Lore central:

```
Hace mucho tiempo, el Reino Digital fue creado por Linus Torvalds, 
un sabio programador que decidió compartir su creación con el mundo. 
Su filosofía de libertad, código abierto y colaboración dio nacimiento 
a un universo donde el conocimiento es poder y la curiosidad la mayor virtud.

Pero hace algunos años, las fuerzas del Caos Propietario invadieron 
el reino. Los enemigos del software libre intentan corromper el sistema, 
borrar archivos críticos y limitar las libertades digitales.

Tú, joven aventurero, has sido elegido para restaurar el orden. 
Cada NPC del reino te enseñará un aspecto fundamental del poder Linux. 
A través de 5 mundos, dominarás los comandos, entenderás los sistemas 
y al final, tendrás el conocimiento de un verdadero administrador Linux.

Tu misión: completar los 5 mundos y obtener el Pergamino de la 
Certificación, que prueba que has dominado los Linux Essentials.
```

### Tonos de diálogo:

```yaml
linux_el_sabio:
  estilo: "Anciano filosófico"
  ejemplo: "Hijo mío, Linux no es solo un sistema operativo... 
            es una filosofía. Es el código respirando libertad."
  
grep_ild:
  estilo: "Joven aventurero entusiasta"
  ejemplo: "¡Mira! ¡Cada comando es una nueva habilidad! 
            ¿Listo para explorar?"
  
chmod_ard:
  estilo: "Mago místico"
  ejemplo: "El verdadero poder fluye a través de las tuberías. 
            Permíteme mostrarte el flujo de datos..."
  
kernel_el_forjador:
  estilo: "Robusto y técnico"
  ejemplo: "El núcleo es donde la magia se forja en realidad. 
            Cada proceso, cada hilo, cada byte importa."
  
sudo_man:
  estilo: "Autoritario pero sabio"
  ejemplo: "El poder absoluto requiere absoluta responsabilidad. 
            Usa sudo con sabiduría, no con ira."
```

### Frases de combate (boss battles):

```yaml
bosses:
  guardian_conocimiento:
    inicio: "¡Demuestra que mereces el conocimiento del primer mundo!"
    al_perder: "Has fallado, pero el conocimiento perdura. Inténtalo de nuevo."
    al_ganar: "Bien hecho, iniciado. El Mundo 2 te espera."
    
  guardian_caminos:
    inicio: "¿Crees que conoces los caminos? Demuéstralo."
    al_ganar: "Caminante, has demostrado dominio. Las torres te esperan."
    
  pipemaster:
    inicio: "El flujo es vida. Demuéstrame que entiendes el flujo."
    al_ganar: "Mago, has dominado el arte. El núcleo es tu siguiente prueba."
    
  nucleo_roto:
    inicio: "Salva el reino. El núcleo está corrupto."
    al_ganar: "Forjador, has salvado el sistema. Solo te queda una prueba."
    
  guardian_supremo:
    inicio: "Esta es la prueba final. Si la superas, serás certificado."
    al_ganar: "ENHORABUENA. Has dominado Linux Essentials. Eres un Maestro."
```

---

## 🎮 ELEMENTOS TÉCNICOS PARA IMPLEMENTACIÓN

### Validación de comandos:

```javascript
// Estructura de validación de cada misión
const validacion = {
  tipo: "comando_exacto" | "comando_regex" | "estado_filesystem" | "output_contiene",
  
  // Para comandos
  comando_esperado: "ls -la",
  comando_alternativos: ["ls -la", "ls -al"],
  
  // Para output
  output_debe_contener: ["bin", "etc", "home"],
  output_no_debe_contener: ["error"],
  
  // Para estado
  archivo_debe_existir: "/tmp/test.txt",
  permisos_esperados: "755",
  
  // Para regex
  regex_pattern: /^drwx/,
  
  // Mensajes
  mensaje_exito: "¡Excelente! Has dominado este comando.",
  mensaje_error: "Inténtalo de nuevo. Pista: usa la opción -a"
};
```

### Sandbox de Linux:

```yaml
opciones_sandbox:
  webcontainer:
    descripcion: "Browser-based, ideal para web"
    pros: ["Sin servidor", "Rápido", "Seguro"]
    contras: ["Limitado en comandos avanzados"]
    
  docker_backend:
    descripcion: "Container Docker en backend"
    pros: ["Comandos completos", "Aislado"]
    contras: ["Requiere infra"]
    
  vps_compartido:
    descripcion: "VPS con usuarios separados"
    pros: ["100% real"]
    contras: ["Caro a escala"]

recomendacion_inicial: "WebContainer para mundos 1-3, Docker para 4-5"
```

### Estructura de datos:

```sql
-- Schema sugerido (Prisma)

model User {
  id            String   @id @default(uuid())
  username      String   @unique
  email         String   @unique
  passwordHash  String
  level         Int      @default(1)
  xp            Int      @default(0)
  bits          Int      @default(0)
  currentWorld  Int      @default(1)
  achievements  String[] @default([])
  inventory     Item[]
  progress      Quest[]
  createdAt     DateTime @default(now())
}

model Quest {
  id           String   @id @default(uuid())
  questId      String   // mision_1_1, mision_1_2...
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  status       Status   @default(PENDING)  // PENDING|IN_PROGRESS|COMPLETED
  attemptCount Int      @default(0)
  completedAt  DateTime?
  
  @@unique([userId, questId])
}

model Item {
  id        String  @id @default(uuid())
  name      String  // de los items definidos
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  obtainedAt DateTime @default(now())
}
```

---

## 🎓 EXAMEN FINAL (BOSS DEFINITIVO)

### 20 preguntas tipo LPI:

```yaml
preguntas_finales:
  - pregunta: "¿Cuál comando muestra usuarios conectados?"
    opciones: ["ps", "who", "ls", "cd"]
    correcta: "who"
    
  - pregunta: "¿Cómo cambias permisos a 755 numéricamente?"
    opciones: ["chmod 755 file", "chmod u+rwx file", "chown 755 file", "set 755 file"]
    correcta: "chmod 755 file"
    
  - pregunta: "¿Qué directorio contiene archivos de configuración?"
    opciones: ["/bin", "/etc", "/var", "/home"]
    correcta: "/etc"
    
  - pregunta: "¿Cuál es el separador en /etc/passwd?"
    opciones: [",", ";", ":", "|"]
    correcta: ":"
    
  - pregunta: "¿Cómo agregas usuario a grupo sin quitar otros grupos?"
    opciones: ["usermod -G grupo user", "usermod -aG grupo user", 
              "groupadd user grupo", "addgroup grupo user"]
    correcta: "usermod -aG grupo user"
    
  - pregunta: "¿Qué hace el comando 'tar -czvf backup.tar.gz dir/'?"
    opciones: 
      - "Extrae backup"
      - "Crea backup comprimido gzip"
      - "Lista contenido"
      - "Comprime con bzip2"
    correcta: "Crea backup comprimido gzip"
    
  - pregunta: "¿Cuál es la diferencia entre 'sudo' y 'su'?"
    opciones:
      - "Son lo mismo"
      - "sudo ejecuta UN comando como root, su cambia al usuario root"
      - "su es más seguro"
      - "sudo no requiere contraseña"
    correcta: "sudo ejecuta UN comando como root, su cambia al usuario root"
    
  # ... 13 más siguiendo este formato
```

---

## 📝 NOTAS PARA CLAUDE CODE

### Cuando uses este documento:

```
1. ESTRUCTURA: 5 mundos × 15-20 misiones = 75-100 misiones totales
2. PROGRESIÓN: Dificultad incremental
3. NPCs: Cada mundo tiene su NPC con personalidad propia
4. NARRATIVA: Hilo conductor de "salvar el reino digital"
5. APRENDIZAJE: Cada misión debe enseñar UN concepto específico
6. VALIDACIÓN: Sistema robusto de verificar comandos
7. RECOMPENSAS: Balanceadas (xp, items, bits)
8. BOSS BATTLES: Al final de cada mundo
9. EXAMEN FINAL: Boss del mundo 5 = simulación examen LPI

PRIORIDAD DE IMPLEMENTACIÓN:
Semana 7: Mundo 1 + boss
Semana 8: Mundo 2 + boss
Semana 9: Mundo 3 + boss
Semana 10: Mundo 4 + boss
Semana 11: Mundo 5 + boss final + examen

CADA MISIÓN DEBE INCLUIR:
- ID único
- Nombre épico (en español, medieval-cibernético)
- NPC que la otorga
- Mundo al que pertenece
- Objetivo de aprendizaje
- Comando(s) Linux a ejecutar
- Validación robusta
- Recompensa balanceada
- Pista (opcional, costo 10 bits)
- Conexión con la narrativa principal
```

---

## 🎯 RESUMEN EJECUTIVO

```
LinuxQuest = RPG educativo + Linux Essentials LPI 010-160

Cobertura:
✅ 5 temas oficiales LPI = 5 mundos
✅ 19 secciones LPI = misiones organizadas
✅ 89+ comandos Linux cubiertos
✅ Conceptos de licencias, hardware, redes, seguridad
✅ Boss battles para reforzar aprendizaje
✅ Examen final = simulación real LPI

Progresión:
- 95+ misiones totales
- 50 niveles de jugador
- Sistema de XP, bits, items
- Logros y achievements
- 5 NPCs únicos
- Narrativa épica medieval-cibernética

Resultado para el usuario:
- Aprende Linux Essentials de forma divertida
- Equivale a curso ~80 horas
- Preparación para certificación LPI 010-160
- Habilidades reales aplicables en producción
```

**Este es el contenido educativo COMPLETO para LinuxQuest. Claude Code puede usar este documento para generar TODAS las misiones siguiendo la estructura definida.**
