# GUÍA DE ESTUDIO COMPLETA: LINUX ESSENTIALS

---

## TEMA 1: LA COMUNIDAD LINUX Y UNA CARRERA EN EL MUNDO DEL CÓDIGO ABIERTO

### 1.1 Los Sistemas Operativos Populares y la Evolución de Linux

**Tema:** Sistemas operativos y distribuciones Linux

**Conceptos clave:**

* Linux es un sistema operativo tipo Unix creado en 1991 por Linus Torvalds, inspirado en Unix pero con código independiente. Se desarrolla mediante comunidades internacionales sin respaldo de una sola empresa.
* Una distribución es un paquete que contiene el kernel Linux más un conjunto de aplicaciones seleccionadas, optimizado para casos de uso específicos como escritorio o servidor.
* Debian, Ubuntu, CentOS, RHEL y openSUSE son distribuciones principales que usan diferentes gestores de paquetes (dpkg/rpm) y tienen distintos enfoques.
* Los sistemas embebidos combinan hardware y software con función específica; Android y Raspbian son los sistemas embebidos Linux más populares.
* El código Linux es libre y gratuito, permitiendo uso sin restricciones y promoviendo libertades del usuario.

**Comandos importantes:**

* `uname -a`: Muestra información del sistema operativo y kernel instalado
* `lsb_release -a`: Obtiene detalles de la distribución instalada
* `cat /etc/os-release`: Muestra información de la distribución
* `hostnamectl`: Ver y cambiar información del ordenador en la red

**Ejemplos prácticos:**

* Verificar qué distribución está instalada: `cat /etc/os-release` mostrará detalles como NAME, VERSION, PRETTY_NAME. En Ubuntu, el resultado incluiría "NAME="Ubuntu" VERSION="20.04 LTS"".
* Conocer la versión del kernel: `uname -r` devuelve algo como "5.4.0-42-generic" indicando versión y número de construcción del kernel.
* Identificar si es un sistema embebido: Revisar `/proc/cpuinfo` y comparar con especificaciones de Raspberry Pi (ARM) o Android (sobre kernel Linux).

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la principal diferencia entre Debian y Red Hat en cuanto a gestión de paquetes?
  * A) Debian usa RPM, Red Hat usa APK
  * B) Debian usa DPKG, Red Hat usa RPM
  * C) Debian usa APT, Red Hat usa Yum sin diferencia de paquete
  * D) No hay diferencia, ambas usan el mismo formato
  * **Respuesta correcta: B)** Debian y derivadas (Ubuntu, Linux Mint) usan el gestor dpkg con formato .deb. Red Hat, CentOS y Fedora usan RPM con formato .rpm.

* **Pregunta 2:** ¿Qué distribución es conocida por su herramienta de configuración YaST?
  * A) Ubuntu
  * B) CentOS
  * C) SUSE
  * D) Fedora
  * **Respuesta correcta: C)** SUSE y openSUSE son reconocidas por YaST, herramienta que permite instalar, configurar software, hardware, servicios y redes de forma gráfica.

**Errores comunes:**

* **Error típico:** Creer que Linux es Unix. Ubuntu o Debian son exactamente iguales a Unix antiguo.
* **Por qué está mal:** Linux toma principios de Unix pero es un proyecto independiente sin código Unix. Aunque compatible, tiene diferencias significativas en arquitectura interna.

* **Error típico:** Asumir que todas las distribuciones usan el mismo gestor de paquetes y comandos de instalación.
* **Por qué está mal:** Debian usa `apt install`, Red Hat usa `yum/dnf install`. Usar apt en CentOS fallará; el gestor debe corresponder a la distribución.

**Notas de examen:**

* Las preguntas frecuentes sobre distribuciones se enfocan en: familia de distribución, gestor de paquetes, caso de uso (servidor/escritorio), y empresa mantenedora.
* No confundir Fedora (enfoque usuarios y novedades) con RHEL (solución empresarial estable). Fedora prueba tecnologías que irán a RHEL.
* CentOS es RHEL compilado gratuitamente; Ubuntu LTS es Debian estabilizada con soporte largo. Ambas son opciones gratuitas pero con propósitos distintos.
* Preguntas trampa: "¿Qué distribución es mejor?" - La respuesta correcta es "depende del caso de uso", no "una en particular es universal".

---

### 1.2 Principales Aplicaciones de Código Abierto

**Tema:** Software y paquetes en Linux

**Conceptos clave:**

* Un paquete es un conjunto de software con configuración y documentación que facilita instalación, actualización y uso. Contiene binarios, librerías, archivos de configuración y metadatos.
* Las aplicaciones de Office de código abierto incluyen LibreOffice (suite completa: Writer, Calc, Impress) como alternativa a Microsoft Office en Linux.
* Los navegadores web principales en Linux incluyen Firefox (desarrollado por Mozilla, código abierto) y Chromium/Google Chrome disponibles nativamente.
* El multimedia en Linux incluye VLC (reproductor versátil), GIMP (editor de imágenes raster), Audacity (editor de audio), todos de código abierto.
* Los servidores web populares son Apache HTTP Server y Nginx; bases de datos incluyen MySQL, PostgreSQL; lenguajes de programación: Python, Ruby, PHP, Java.

**Comandos importantes:**

* `apt update && apt upgrade`: Actualiza lista de paquetes e instala actualizaciones (Debian/Ubuntu)
* `yum install <paquete>`: Instala paquete en sistemas Red Hat/CentOS
* `dpkg -l`: Lista paquetes instalados y su estado (Debian)
* `rpm -qa`: Muestra todos los paquetes RPM instalados
* `apt search <término>`: Busca paquetes disponibles por nombre o descripción

**Ejemplos prácticos:**

* Instalar LibreOffice completo: `apt install libreoffice` descarga Writer, Calc, Impress y componentes asociados (~150-300 MB dependiendo de dependencias).
* Verificar qué navegadores web están disponibles: `apt search browser | grep -E "firefox|chromium|google-chrome"` muestra opciones disponibles.
* Instalar software multimedia: `apt install vlc gimp audacity` proporciona reproductor, editor de imágenes y editor de audio en una sola orden.
* Verificar que Apache está instalado: `dpkg -l | grep apache2` o `rpm -qa | grep httpd` según distribución.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la función principal de un gestor de paquetes en Linux?
  * A) Compilar código fuente en binarios ejecutables
  * B) Descargar, instalar, actualizar y eliminar software de forma controlada
  * C) Crear scripts shell para automatización
  * D) Gerenciar usuarios y permisos del sistema
  * **Respuesta correcta: B)** El gestor de paquetes (apt, yum, pacman) descarga de repositorios, resuelve dependencias, instala, actualiza y elimina software de manera organizada.

* **Pregunta 2:** ¿Qué suite ofimática de código abierto es equivalente a Microsoft Office en Linux?
  * A) OpenOffice
  * B) LibreOffice
  * C) Calligra Suite
  * D) Todas son equivalentes
  * **Respuesta correcta: B)** LibreOffice es la suite más mantenida y funcional, descendiente de OpenOffice, con Writer (Word), Calc (Excel), Impress (PowerPoint).

**Errores comunes:**

* **Error típico:** Instalar un paquete sin ejecutar `apt update` primero, resultando en versiones desactualizadas.
* **Por qué está mal:** `apt update` descarga la lista actualizada de paquetes disponibles del repositorio. Sin esto, apt intenta instalar versiones antiguas o no encuentra paquetes nuevos.

* **Error típico:** Usar `apt install` en un sistema Red Hat/CentOS.
* **Por qué está mal:** Red Hat usa `yum` o `dnf`, no apt. apt es específico de Debian/Ubuntu. El comando fallará con "comando no encontrado".

**Notas de examen:**

* Las preguntas sobre paquetes incluyen: diferencia entre binario y código fuente, cómo instalar/desinstalar, ubicación de archivos post-instalación.
* Memorizar: Apache = servidor web, MySQL/PostgreSQL = base de datos, Python/PHP/Ruby = lenguajes, VLC/GIMP = multimedia. El examen pregunta aplicaciones por categoría.
* Preguntas trampa: "¿Qué aplicación de código abierto NO existe?" - Suelen presentar nombres falsos junto a reales. Conocer nombres reales evita trampas.

---

### 1.3 Software de Código Abierto y Licencias

**Tema:** Licencias y modelos de negocio en software libre

**Conceptos clave:**

* Software Libre según GNU: respeta 4 libertades fundamentales (uso sin restricción, estudiar código fuente, distribuir copias, mejorar y compartir mejoras). No significa precio cero.
* Código Abierto enfatiza beneficios prácticos del acceso al código (mejor seguridad, correcciones rápidas), no necesariamente todas las libertades GNU.
* GPL (GNU Public License) es copyleft: obliga derivados a mantener mismos términos. MIT y BSD son permisivas: permiten código privativo.
* Apache License 2.0 proporciona protección explícita de patentes; es permisiva pero más completa que MIT.
* Modelos de negocio: soporte/servicios profesionales (Red Hat), actualizaciones premium, hosting administrado, servicios consultoría.

**Comandos importantes:**

* `head -20 /usr/share/doc/<paquete>/copyright`: Muestra información de licencia de paquete instalado
* `apt-cache show <paquete>`: Detalla información incluida licencia de paquete antes de instalar
* `cat /usr/share/licenses/<paquete>/LICENSE`: Accede al archivo de licencia completo
* `find /usr/share/doc -name "LICENSE" -o -name "COPYING"`: Localiza archivos de licencia

**Ejemplos prácticos:**

* Verificar licencia de Apache: `apt-cache show apache2 | grep License` muestra "License: Apache-2.0".
* Consultar licencia completa antes de usar: `head -30 /usr/share/doc/apache2/copyright` muestra términos al inicio del archivo.
* Entender diferencia práctica: GPL requiere que tu código derivado sea GPL (compartir mejoras); MIT permite privativo. Si usas librería MIT en producto cerrado, es legal.
* Ejemplo negocio Red Hat: vende soporte y servicios alrededor de RHEL gratuito, no cobra por licencia de software sino por servicios.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la principal diferencia entre licencias copyleft como GPL y permisivas como MIT?
  * A) GPL es más restrictiva y requiere compartir mejoras; MIT permite código propietario derivado
  * B) MIT es más restrictiva que GPL
  * C) No hay diferencia legal, solo práctica
  * D) GPL solo aplica a software no comercial
  * **Respuesta correcta: A)** GPL es copyleft: si distribuyes derivado modificado, debes hacerlo GPL (compartir código). MIT es permisiva: puedes usar en privativo sin obligación de compartir.

* **Pregunta 2:** ¿Cuál de las siguientes NO es una libertad del Software Libre según FSF?
  * A) Libertad de usar sin restricción
  * B) Libertad de estudiar código fuente
  * C) Libertad de distribuir copias sin costo
  * D) Libertad de mejorar y compartir mejoras
  * **Respuesta correcta: C)** Las libertades no incluyen "sin costo"; software libre puede costar dinero. Incluye: uso sin restricción (0), estudiar (1), distribuir (2), mejorar (3).

**Errores comunes:**

* **Error típico:** Asumir "código abierto" = "gratis" = "sin restricciones".
* **Por qué está mal:** Código abierto puede tener licencia restrictiva (GPL es abierta pero restrictiva). Open source es sobre acceso al código, no precio ni libertades garantizadas.

* **Error típico:** Creer que GPL permite cualquier uso sin obligaciones.
* **Por qué está mal:** GPL permite libertades pero impone: si distribuyes modificaciones, debes hacerlas GPL. No es "haz lo que quieras".

**Notas de examen:**

* Memorizar 4 libertades GNU: uso (0), estudio (1), distribución (2), mejora (3). Examen pregunta "¿cuál es libertad?" y lista opciones falsas.
* GPL v2 vs v3: v3 agregó protecciones contra Tivoización (DRM). Diferencia rara en nivel essentials, pero GPL v2 es más común (Linux kernel, muchos proyectos).
* Modelos de negocio: distinguir entre soporte (Red Hat), hosting (Canonical con Ubuntu), y servicios profesionales. Examen pregunta cómo empresas monetizan software libre.

---

### 1.4 Destrezas TIC y Trabajo con Linux

**Tema:** Seguridad, privacidad y habilidades para trabajar con Linux

**Conceptos clave:**

* Las interfaces gráficas de usuario (GUI) en Linux incluyen GNOME, KDE, XFCE, Cinnamon que proporcionan entorno de escritorio accesible para usuarios no técnicos.
* Linux se usa industrialmente en: automoción (sistemas de vehículos), medicina (equipos diagnósticos), servidores empresariales, dispositivos IoT, telecomunicaciones.
* La privacidad en internet requiere entender qué datos transmites (correo, navegación, contraseñas) y cómo protegerlos con cifrado.
* Encriptación simétrica usa una clave compartida (AES, DES); encriptación asimétrica usa par público-privado (RSA, ECDSA) para transferencia segura de claves.
* Certificados SSL/TLS, HTTPS, y firma digital protegen integridad y autenticidad de comunicación. HTTP no cifra; HTTPS sí.

**Comandos importantes:**

* `openssl enc -aes-256-cbc -in archivo.txt -out archivo.enc`: Cifra archivo con AES-256
* `openssl enc -d -aes-256-cbc -in archivo.enc -out archivo.txt`: Descifra archivo AES-256
* `gpg --encrypt --recipient usuario@email.com archivo.txt`: Cifra con clave pública GPG
* `gpg --decrypt archivo.txt.gpg`: Descifra con clave privada GPG
* `curl -I https://sitio.com`: Verifica certificado SSL en HTTPS

**Ejemplos prácticos:**

* Cifrar un documento sensible: `openssl enc -aes-256-cbc -in confidencial.txt -out confidencial.enc` genera archivo cifrado que requiere contraseña para descifrar.
* Crear comunicación segura con GPG: usuario A cifra con clave pública de B; solo B con su clave privada descifra. Perfectamente seguro incluso si canal se compromete.
* Verificar seguridad de conexión web: `curl -I https://www.google.com` muestra encabezados; busca "Strict-Transport-Security" para HSTS (fuerza HTTPS).
* Entender uso real: cuando compras online, HTTPS cifra tu número de tarjeta entre tu navegador y servidor. Certificado SSL verifica que es realmente el banco, no un impostor.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la principal ventaja de la encriptación asimétrica (RSA) sobre la simétrica (AES) en comunicaciones seguras?
  * A) Es más rápida que AES
  * B) No requiere compartir clave secreta previamente
  * C) Es más fácil de implementar
  * D) No necesita certificados
  * **Respuesta correcta: B)** Asimétrica resuelve el problema de compartir claves: solo se comparte clave pública, la privada nunca viaja. Simétrica requiere ambas partes tengan misma clave de antemano.

* **Pregunta 2:** ¿Qué protocolo de internet transmite datos sin cifrar y es considerado inseguro?
  * A) HTTPS
  * B) FTPS
  * C) HTTP
  * D) SSH
  * **Respuesta correcta: C)** HTTP transmite texto plano. HTTPS cifra con TLS. FTP sin S transmite sin cifra (raro hoy). SSH cifra por defecto. HTTP es el inseguro de la lista.

**Errores comunes:**

* **Error típico:** Usar contraseña débil para cifrado OpenSSL, creyendo que cifrado la protege.
* **Por qué está mal:** Cifrado es tan fuerte como la contraseña. Contraseña débil (12345) es quebrantable por fuerza bruta rápidamente, incluso con AES-256.

* **Error típico:** Confundir HTTP con HTTPS. Asumir que cualquier página web es segura.
* **Por qué está mal:** Muchos sitios aún usan HTTP (raro pero existe). HTTPS es diferente: busca "https://" en URL y candado en navegador. Phishing usa HTTP con URLs similares a sitios reales.

**Notas de examen:**

* Las preguntas sobre privacidad cobran importancia. Temas: SSL/TLS (cómo funciona), certificados (qué validan), diferencia HTTP/HTTPS, GPG (cifra + firma digital).
* Memorizar: Simétrica (rápida, requiere compartir clave), Asimétrica (lenta, sin compartir clave). Híbrida: asimétrica intercambia clave, luego simétrica cifra datos.
* Preguntas trampa: "¿HTTPS es invulnerable?" No. Protege tráfico pero no contraseña débil en servidor o malware local.

---

## TEMA 2: ENCONTRANDO EL CAMINO EN UN SISTEMA LINUX

### 2.1 Aspectos Básicos de la Línea de Comandos

**Tema:** Estructura de comandos y conceptos fundamentales de shell

**Conceptos clave:**

* La línea de comandos (shell/terminal) es una interfaz de texto para interactuar con el sistema operativo. Bash es el shell estándar en Linux.
* La estructura de comando es: `comando [opciones] [argumentos]`. Opciones modifican comportamiento (ej: `-l`, `--long`). Argumentos proporcionan datos al comando.
* Las comillas en bash tienen significados distintos: comillas simples `'texto'` previenen expansión de variables. Comillas dobles `"texto"` permiten expansión de $variables.
* Las variables en bash almacenan valores (strings, números). Se definen como `VARIABLE=valor` y se usan con `$VARIABLE`. Sin $ se trata como texto literal.
* El PATH es una variable que contiene directorios donde bash busca comandos ejecutables. Un comando encuentra si está en uno de esos directorios.

**Comandos importantes:**

* `echo [texto]`: Imprime texto en pantalla; `echo $VARIABLE` imprime valor de variable
* `set`: Muestra todas las variables de shell definidas en sesión actual
* `export VARIABLE=valor`: Define variable global accesible por programas hijos
* `echo $PATH`: Muestra directorios donde se buscan comandos (separados por :)
* `which comando`: Muestra ubicación completa de comando ejecutable

**Ejemplos prácticos:**

* Definir y usar variable: `NOMBRE="Linux"` luego `echo Hola $NOMBRE` imprime "Hola Linux". Sin comillas: `echo Hola NOMBRE` imprime "Hola NOMBRE" literal.
* Comillas simples vs dobles: `echo '$NOMBRE'` imprime literal "$NOMBRE". `echo "$NOMBRE"` imprime valor. Diferencia crítica para scripts.
* Ver todos los directorios donde se buscan comandos: `echo $PATH` devuelve `/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin` (bash busca orden).
* Entender por qué comando no se encuentra: Si ejecutas `mi_script.sh` en directorio actual, falla (no está en PATH). Solución: `./mi_script.sh` (ruta explícita) o agregar directorio a PATH.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la principal diferencia entre comillas simples y dobles en bash?
  * A) No hay diferencia, ambas funcionan igual
  * B) Comillas simples previenen expansión de variables; comillas dobles la permiten
  * C) Comillas dobles son más rápidas que simples
  * D) Simples se usan para números, dobles para texto
  * **Respuesta correcta: B)** `echo '$HOME'` imprime literal "$HOME". `echo "$HOME"` imprime valor como "/home/usuario". Diferencia fundamental en bash.

* **Pregunta 2:** ¿Qué variable bash contiene la ruta donde se buscan comandos ejecutables?
  * A) COMMAND
  * B) PATH
  * C) LOCATE
  * D) SEARCH
  * **Respuesta correcta: B)** PATH es la variable estándar. Contiene directorios separados por `:`. Si ejecutas `ls`, bash busca en cada directorio de PATH hasta encontrar `/bin/ls`.

**Errores comunes:**

* **Error típico:** Escribir `echo $variable` sin comillas en un script y asumir que siempre imprime el valor.
* **Por qué está mal:** Si variable contiene espacios o caracteres especiales, pueden interpretarse como argumentos separados. Mejor: `echo "$variable"` (con comillas).

* **Error típico:** Intentar ejecutar un script en directorio actual simplemente escribiendo `mi_script.sh`.
* **Por qué está mal:** El directorio actual (.) no está en PATH por seguridad. Debes escribir `./mi_script.sh` para ejecutar con ruta explícita.

**Notas de examen:**

* Las preguntas sobre variables cobran importancia: diferencia entre variable (sin $) y valor ($VARIABLE), diferencia comillas simples/dobles.
* Memorizar: PATH = directorios de búsqueda, HOME = directorio del usuario, USER = nombre de usuario, PWD = directorio actual. Preguntas frecuentes sobre estas.
* Preguntas trampa: "¿Qué hace `echo $1`?" En script, $1 es primer argumento. `echo '$1'` imprime literal "$1".

---

### 2.2 Uso de la Línea de Comandos para Obtener Ayuda

**Tema:** Acceso a documentación e información de comandos desde terminal

**Conceptos clave:**

* El comando `man comando` abre manual del sistema (manual pages) con documentación completa. Navegación con espacio (adelante), q (salir), / (buscar).
* El comando `comando --help` o `comando -h` proporciona ayuda rápida (resumen corto) sin abrir manual completo.
* El comando `whatis comando` muestra descripción breve de una línea sobre qué hace el comando.
* El comando `apropos palabra_clave` busca comandos cuya descripción contiene la palabra clave. Útil si no recuerdas nombre exacto del comando.
* El comando `info comando` proporciona información más detallada que man (formato hipertexto). Menos común que man pero a veces más exhaustivo.

**Comandos importantes:**

* `man ls`: Abre manual de comando ls con todas las opciones documentadas
* `ls --help`: Imprime ayuda rápida de ls (muy resumida)
* `whatis chmod`: Muestra "chmod - cambiar modo de archivo"
* `apropos compress`: Lista todos los comandos relacionados con compresión
* `info ls`: Abre información detallada de ls en formato info

**Ejemplos prácticos:**

* Encontrar cómo cambiar permisos sin recordar comando: `apropos permission` lista comandos, entre ellos `chmod`. Luego `man chmod` abre documentación.
* Buscar opciones de ls: `man ls | grep -A5 "long"` encuentra sección sobre opción -l (listado largo) en el manual.
* Verificar si comando existe sin ejecutarlo: `whatis mkdir` devuelve "mkdir - crear directorio" confirmando que existe.
* Aprender sintaxis rápidamente: `tar --help` muestra opciones principales sin necesidad de leer manual completo (útil en examen bajo presión).

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la diferencia principal entre `man comando` y `comando --help`?
  * A) man es más rápido que --help
  * B) man proporciona documentación completa; --help da resumen breve
  * C) --help se usa para comandos antiguos; man para nuevos
  * D) No hay diferencia, muestran lo mismo
  * **Respuesta correcta: B)** `man ls` abre manual completo de varias páginas. `ls --help` imprime resumen de una pantalla. Ambos útiles en contextos distintos.

* **Pregunta 2:** ¿Qué comando usarías si necesitas buscar comandos relacionados con comprensión de archivos pero no recuerdas el nombre exacto?
  * A) man compression
  * B) whatis compress
  * C) apropos compress
  * D) grep compress /usr/share/man
  * **Respuesta correcta: C)** `apropos` busca en la descripción de comandos disponibles. Devuelve `gzip, tar, zip` y otros relacionados con compress.

**Errores comunes:**

* **Error típico:** Usar `man comando` en un comando que no tiene manual instalado, esperando siempre encontrar documentación.
* **Por qué está mal:** `man` requiere que el manual esté instalado (archivos `/usr/share/man/`). En sistemas mínimos, puede no existir. Alternativa: `comando --help`.

* **Error típico:** Intentar usar `apropos` sin haber actualizado la base de datos de manuales.
* **Por qué está mal:** `apropos` indexa descripciones. Después de instalar paquetes nuevos, ejecutar `sudo updatedb` o `mandb` para que `apropos` encuentre nuevos comandos.

**Notas de examen:**

* Las preguntas sobre ayuda enfatizan: cuándo usar `man` (información completa), cuándo usar `--help` (rápido), cuándo usar `apropos` (búsqueda).
* Memorizar: `man comando` = manual sistema, `comando --help` = ayuda integrada, `apropos palabra` = búsqueda por descripción, `whatis comando` = línea descriptiva.
* Preguntas trampa: "¿`man man` existe?" Sí. "¿Puedo buscar en man con /?". Sí, busca dentro del manual abierto.

---

### 2.3 Uso de Directorios y Listado de Archivos

**Tema:** Navegación del sistema de archivos y gestión de directorios

**Conceptos clave:**

* El sistema de archivos Linux es jerárquico, comenzando en `/` (raíz). Todo es un archivo: archivos regulares, directorios, dispositivos, enlaces, sockets.
* Rutas absolutas comienzan con `/` (ej: `/home/usuario/archivo.txt`). Rutas relativas no comienzan con `/` (ej: `usuario/archivo.txt`, relativos a directorio actual).
* El directorio actual se representa con `.`, el padre con `..`. Esto permite navegar: `cd ../` sube un nivel, `cd ../../` dos niveles.
* El directorio home del usuario se representa con `~`. `cd ~` va al home. `~usuario` refiere al home de otro usuario (si tienes permisos).
* El comando `ls` lista archivos en directorio. Opciones principales: `-l` (listado largo), `-a` (incluye ocultos), `-h` (tamaños legibles), `-R` (recursivo).

**Comandos importantes:**

* `pwd`: Imprime directorio de trabajo actual (print working directory)
* `cd ruta`: Cambia a directorio especificado (cd .. va al padre, cd ~ va al home)
* `ls`: Lista archivos en directorio actual
* `ls -la`: Listado largo (-l) incluyendo ocultos (-a), muestra permisos, propietario, tamaño, fecha
* `mkdir directorio`: Crea nuevo directorio
* `mkdir -p ruta/completa/con/varios`: Crea directorios padres si no existen

**Ejemplos prácticos:**

* Navegar entre directorios: `pwd` muestra `/home/usuario`. `cd /usr/local/bin` lleva a ese directorio. `pwd` ahora muestra `/usr/local/bin`. `cd ~` vuelve al home.
* Usar rutas relativas: Desde `/home/usuario`, `cd Desktop` va a `/home/usuario/Desktop` (ruta relativa). `cd ../otro_usuario` va a `/home/otro_usuario` (sube al padre de usuario actual).
* Listar archivos con detalles: `ls -la` muestra: `-rw-r--r-- usuario grupo 1024 dic 15 10:30 archivo.txt`. Primer carácter (-) es tipo, letras son permisos rwxrwxrwx.
* Crear estructura de directorios en una orden: `mkdir -p proyectos/web/src/main/java` crea toda la estructura si no existe.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la diferencia entre ruta absoluta y ruta relativa?
  * A) Absoluta es más rápida que relativa
  * B) Absoluta comienza con /; relativa es relativa al directorio actual
  * C) Relativa es más segura que absoluta
  * D) No hay diferencia funcional, ambas llegan al mismo lugar
  * **Respuesta correcta: B)** Ruta absoluta `/home/usuario/archivo` funciona desde cualquier lugar. Relativa `archivo` solo funciona si estás en `/home/usuario`.

* **Pregunta 2:** ¿Qué hace el comando `cd ../..`?
  * A) Va al directorio anterior visitado
  * B) Sube dos niveles en la jerarquía de directorios
  * C) Va al directorio de un usuario llamado ".."
  * D) Crea dos directorios
  * **Respuesta correcta: B)** `..` representa directorio padre. `cd ../..` sube dos niveles. Desde `/home/usuario/Desktop`, lleva a `/home`.

**Errores comunes:**

* **Error típico:** Usar rutas relativas en scripts esperando que funcionen desde cualquier lugar.
* **Por qué está mal:** Rutas relativas dependen del directorio actual. Script en `/home/usuario/script.sh` con `cd datos` busca en directorio actual, no en `/home/usuario/datos`. Mejor: rutas absolutas o variables.

* **Error típico:** No diferenciar entre `ls /directorio` y `cd /directorio`.
  * **Por qué está mal:** `ls` solo lista, no cambia tu directorio. `cd` cambia donde estás. Después de `ls /tmp`, sigues en directorio anterior.

**Notas de examen:**

* Las preguntas sobre directorios enfatizan: diferencia absoluto/relativo, significado de `.`, `..`, `~`, comando correcto para cada tarea.
* Memorizar: `.` = actual, `..` = padre, `~` = home, `/` = raíz. Preguntas frecuentes mezclan estos conceptos.
* Preguntas trampa: "¿Cuál es diferencia entre `cd ~` y `cd`?" Ambos van al home. "`cd -`?" Va al anterior directorio visitado.

---

### 2.4 Crear, Mover y Borrar Archivos

**Tema:** Manipulación de archivos desde línea de comandos

**Conceptos clave:**

* El comando `touch archivo` crea archivo vacío o actualiza timestamp si existe. Se usa para crear archivos vacíos o marcar archivos como modificados recientemente.
* El comando `cp origen destino` copia archivo. `cp -r directorio/ destino/` copia recursivamente directorios con contenido. `-i` solicita confirmación si sobrescribe.
* El comando `mv origen destino` mueve (renombra) archivo o directorio. Funciona entre sistemas de archivos. Si destino es directorio, mueve archivo dentro.
* El comando `rm archivo` elimina archivo. `rm -r directorio` elimina directorio y contenido recursivamente. `-f` fuerza sin pedir confirmación. CUIDADO: no recuperable.
* El comando `mkdir` crea directorio vacío. `mkdir -p ruta/completa` crea todos los padres necesarios. No confundir con `touch` que crea archivo, no directorio.

**Comandos importantes:**

* `touch archivo.txt`: Crea archivo vacío o actualiza fecha de modificación
* `cp archivo.txt copia.txt`: Copia archivo en mismo directorio con nuevo nombre
* `cp -r directorio/ copia_dir/`: Copia directorio entero con contenido
* `mv archivo.txt nuevo_nombre.txt`: Renombra archivo
* `mv archivo.txt /otro/directorio/`: Mueve archivo a otro directorio
* `rm archivo.txt`: Elimina archivo (sin papelera, permanente)
* `rm -r directorio/`: Elimina directorio y todo su contenido

**Ejemplos prácticos:**

* Crear archivo para proyecto: `touch proyecto.py` crea archivo vacío que luego editas. Sin crear directorio.
* Copiar archivo con respaldo: `cp importante.txt importante.txt.bak` crea respaldo antes de editar. `-i` previene sobrescritura accidental: `cp -i importante.txt importante.txt.bak`.
* Mover múltiples archivos: `mv *.log /var/log/` mueve todos los .log al directorio /var/log/. El globbing * se expande a todos los archivos coincidentes.
* Eliminar archivos antiguos: `rm archivo_antiguo.txt` elimina directamente sin confirmación (a menos que usar `-i`). A diferencia de GUI, no va a papelera.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la diferencia entre `cp` y `mv`?
  * A) cp es más rápido que mv
  * B) cp duplica archivo; mv cambia su ubicación sin duplicar
  * C) mv es peligroso; cp es seguro
  * D) No hay diferencia, ambos hacen lo mismo
  * **Respuesta correcta: B)** `cp archivo1.txt archivo2.txt` crea archivo2 (ahora existen ambos). `mv archivo1.txt archivo2.txt` renombra archivo1 a archivo2 (desaparece archivo1).

* **Pregunta 2:** ¿Qué comando eliminaría un directorio llamado "prueba" que contiene archivos?
  * A) rm prueba
  * B) rm -r prueba
  * C) rmdir prueba
  * D) del prueba
  * **Respuesta correcta: B)** `rm -r` elimina recursivamente directorio y contenido. `rm` solo archivos, `rmdir` solo directorios vacíos, `del` no existe en Linux.

**Errores comunes:**

* **Error típico:** Usar `rm` sin comprender que es permanente. No hay papelera de reciclaje en Linux.
* **Por qué está mal:** A diferencia de GUI, `rm archivo` elimina permanentemente sin confirmación. No se puede recuperar (a menos que especialista en recuperación de datos). Siempre hacer respaldo primero.

* **Error típico:** Intentar copiar directorio sin `-r`: `cp directorio/ destino/`.
* **Por qué está mal:** `cp` sin `-r` solo copia archivos. Falla con "es un directorio" para directorios anidados. Obligatorio `-r` para directorios.

**Notas de examen:**

* Las preguntas sobre archivos enfatizan: comando correcto para cada tarea (crear/copiar/mover/eliminar), opciones importantes (-r para recursiva, -i para interactivo).
* Memorizar: `touch` = crear, `cp` = copiar, `mv` = mover/renombrar, `rm` = eliminar (destructivo). Preguntas frecuentes confunden estos comandos.
* Preguntas trampa: "¿Qué hace `touch` en archivo existente?" Actualiza timestamp, no sobrescribe contenido. "`rm -r` es peligroso?" Sí, elimina todo sin confirmación.

---

## TEMA 3: EL PODER DE LA LÍNEA DE COMANDOS

### 3.1 Archivar Ficheros desde la Línea de Comandos

**Tema:** Compresión y archivado de datos

**Conceptos clave:**

* La compresión reduce tamaño de archivo usando algoritmos. `gzip` (compresión GNU) es formato muy común resultando en `.gz`. `bzip2` comprime más pero es más lento, resultando en `.bz2`.
* El archivado agrupa múltiples archivos en uno sin compresión necesaria. `tar` crea archivos tar que agrupan sin comprimir. Es común combinar: `tar.gz` (tar comprimido con gzip).
* `zip` crea archivos `.zip` comprimiendo múltiples archivos. Ampliamente compatible, usado en Windows/Mac/Linux. A diferencia de tar, usa un archivo único contenedor.
* `tar` es esencial en Linux. Opciones: `-c` (crear), `-x` (extraer), `-f archivo.tar` (especificar archivo), `-z` (con gzip), `-j` (con bzip2), `-v` (verbose/verboso).
* La diferencia entre archivo y compresión es crucial: `tar` archivo agrupa, `gzip` comprime. `tar.gz` combina ambos: agrupa con `tar`, luego comprime con `gzip`.

**Comandos importantes:**

* `tar -cvf archivo.tar directorio/`: Crea tar agrupando directorio (sin compresión)
* `tar -czvf archivo.tar.gz directorio/`: Crea tar comprimido con gzip (-z incluye compresión)
* `tar -xvf archivo.tar`: Extrae archivos de tar en directorio actual
* `tar -xzvf archivo.tar.gz`: Extrae archivo tar comprimido con gzip
* `gzip archivo.txt`: Comprime archivo resultando archivo.txt.gz, elimina original
* `gunzip archivo.txt.gz`: Descomprime archivo, elimina .gz
* `zip -r archivo.zip directorio/`: Crea zip comprimiendo directorio recursivamente
* `unzip archivo.zip`: Extrae archivos de zip

**Ejemplos prácticos:**

* Crear respaldo comprimido de proyecto: `tar -czvf proyecto_backup_2025.tar.gz proyecto/` crea archivo comprimido. Verificar: `tar -tzvf proyecto_backup_2025.tar.gz` lista contenido sin extraer.
* Compartir múltiples archivos por email: `zip -r presentacion.zip slides/ imagenes/ audio/` agrupa todo en compresión compatible, más simple que tar.gz para usuarios Windows.
* Comprimir archivo de log antigua: `gzip archivo.log` reduce archivo.log muy grande a archivo.log.gz (típicamente 90% menor), liberando espacio.
* Restaurar backup: `tar -xzvf proyecto_backup_2025.tar.gz` extrae todo en directorio actual. Verificar primero con `tar -tzvf` qué contiene.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la diferencia entre `tar` y `gzip`?
  * A) tar comprime; gzip agrupa archivos
  * B) tar agrupa archivos; gzip comprime
  * C) No hay diferencia, ambos hacen lo mismo
  * D) gzip es más antiguo que tar
  * **Respuesta correcta: B)** `tar` agrupa múltiples archivos en uno (sin compresión necesaria). `gzip` comprime un archivo (puede ser el tar resultante). Juntos: `tar.gz`.

* **Pregunta 2:** ¿Qué comando crearía archivo.tar.gz comprimiendo un directorio completo?
  * A) tar -xvf archivo.tar.gz directorio/
  * B) tar -cvf archivo.tar directorio/; gzip archivo.tar
  * C) tar -czvf archivo.tar.gz directorio/
  * D) zip -r archivo.tar.gz directorio/
  * **Respuesta correcta: C)** Opción `-z` en tar incluye compresión gzip directamente. Más eficiente que B (dos pasos). La respuesta A extrae, no crea.

**Errores comunes:**

* **Error típico:** Usar `gzip` en directorio esperando que funcione.
* **Por qué está mal:** `gzip` comprime archivos individuales, no directorios. Intenta con directorio: error "es un directorio". Primero `tar`, luego `gzip` (o combinar con `-z`).

* **Error típico:** Intentar extraer archivo tar.gz sin opción `-z`.
  * **Por qué está mal:** `tar -xvf archivo.tar.gz` falla. Necesita `tar -xzvf` (incluir `-z` para decompresión gzip automática).

**Notas de examen:**

* Las preguntas sobre tar/gzip enfatizan: opciones correctas (c=crear, x=extraer, z=gzip, f=archivo), diferencia archivo/compresión.
* Memorizar: `tar -czvf` = crear comprimido, `tar -xzvf` = extraer comprimido. Preguntas frecuentes sobre qué opción usar.
* Preguntas trampa: "¿`tar` garantiza que archivo es más pequeño?" No. tar solo agrupa. Solo gzip/bzip2 comprimen. tar.tar puede ser más grande que archivos originales.

---

### 3.2 Buscar y Extraer Datos de Ficheros

**Tema:** Redirección, tuberías y búsqueda en archivos

**Conceptos clave:**

* La redirección de entrada/salida (I/O) controla dónde comando obtiene datos (entrada) y dónde envía resultados (salida). `>` redirige salida a archivo (sobrescribe). `>>` añade a archivo.
* El operador `<` redirige entrada desde archivo. `comando < archivo.txt` hace que comando lea del archivo en lugar de teclado.
* Las tuberías (pipes) `|` conectan salida de un comando como entrada de otro: `comando1 | comando2`. Ejemplo: `cat archivo.txt | grep palabra` envía contenido a grep que filtra.
* El comando `grep` busca líneas que coincidan con patrón. `grep palabra archivo.txt` encuentra líneas conteniendo palabra. `-i` ignora mayúsculas, `-v` invierte (líneas que NO coinciden), `-c` cuenta coincidencias.
* Las expresiones regulares (regex) son patrones para búsqueda. `^` inicio línea, `$` final línea, `.` cualquier carácter, `*` cero o más repeticiones, `[a-z]` cualquier letra minúscula.

**Comandos importantes:**

* `comando > archivo.txt`: Redirige salida a archivo (sobrescribe si existe)
* `comando >> archivo.txt`: Añade salida a archivo (append)
* `comando < archivo.txt`: Redirige entrada desde archivo
* `comando1 | comando2`: Canaliza salida de comando1 a entrada de comando2
* `grep patrón archivo.txt`: Busca líneas coincidentes en archivo
* `grep -r patrón directorio/`: Busca recursivamente en directorio
* `grep -i patrón archivo.txt`: Búsqueda insensible a mayúsculas
* `grep -c patrón archivo.txt`: Cuenta líneas coincidentes
* `sed 's/viejo/nuevo/g' archivo.txt`: Sustituye viejo por nuevo (todas las ocurrencias)

**Ejemplos prácticos:**

* Guardar salida de comando: `ls -la > lista.txt` guarda listado en lista.txt (archivo se sobrescribe si existe). `ls -la >> lista.txt` añade al final.
* Procesar datos con tuberías: `cat usuarios.txt | grep admin` filtra solo líneas con "admin". `cat usuarios.txt | grep admin | wc -l` cuenta cuántos usuarios admin hay.
* Buscar en múltiples archivos: `grep -r "error" /var/log/` busca "error" en todos los archivos bajo /var/log/ recursivamente.
* Sustitución en archivo: `sed 's/localhost/ejemplo.com/g' config.txt > config_nuevo.txt` sustituye localhost por ejemplo.com en todo el archivo, guarda en nuevo.
* Combinar búsqueda y redirección: `grep "CRITICAL" logfile.log | sort | uniq > errores_criticos.txt` encuentra líneas CRITICAL, ordena, elimina duplicados, guarda en archivo.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la diferencia entre `>` y `>>`?
  * A) > es más rápido que >>
  * B) > sobrescribe archivo; >> añade al final
  * C) > se usa para archivos de texto; >> para binarios
  * D) No hay diferencia, ambos guardan en archivo
  * **Respuesta correcta: B)** `echo "datos" > archivo.txt` crea/sobrescribe archivo. `echo "datos" >> archivo.txt` añade línea nueva. Crucialmente diferente para logs.

* **Pregunta 2:** ¿Qué hace el comando `grep -v palabra archivo.txt`?
  * A) Busca "palabra" de forma muy rápida
  * B) Imprime líneas que contienen "palabra"
  * C) Imprime líneas que NO contienen "palabra"
  * D) Busca palabra en múltiples archivos
  * **Respuesta correcta: C)** `-v` invierte búsqueda. `grep -v error logfile.log` muestra todas las líneas excepto las con "error". Útil para filtrar problemas.

**Errores comunes:**

* **Error típico:** Usar `>` reiteradamente esperando acumular datos.
* **Por qué está mal:** `ls -la > listado.txt` luego `pwd > listado.txt` sobrescribe contenido anterior. Segundo comando borra el primero. Usar `>>` para acumular.

* **Error típico:** Confundir `<` (redirección entrada) con `>` (salida).
  * **Por qué está mal:** `grep palabra < archivo.txt` canaliza contenido de archivo a grep. `grep palabra > archivo.txt` intenta guardar búsqueda en archivo (no lo que probablemente querías).

**Notas de examen:**

* Las preguntas sobre tuberías y redirección enfatizan: diferencia `>` vs `>>`, funcionamiento de pipes, opciones grep (-i, -v, -c, -r).
* Memorizar: `>` sobrescribe, `>>` acumula, `|` conecta comandos, `<` entrada desde archivo. Preguntas frecuentes mezclan estos operadores.
* Preguntas trampa: "`grep` en archivo binario?" Puede causar salida corrupta. Usar `grep -a` o herramientas especiales. "`grep | grep | grep` lento?" Posible pero raro; considerar sed o awk.

---

### 3.3 Crear un Script a partir de una Serie de Comandos

**Tema:** Scripting en Bash para automatización

**Conceptos clave:**

* Un script Bash es archivo de texto con comandos shell ejecutados secuencialmente. Comienza con shebang `#!/bin/bash` que indica intérprete. Sin él, puede fallar si se ejecuta sin especificar bash.
* Los permisos de ejecución son necesarios para ejecutar script: `chmod +x script.sh` agrega permiso ejecutable. Luego ejecutar con `./script.sh` (ruta explícita requiere permiso ejecutable).
* Las variables en scripts se definen como `VARIABLE="valor"`. Se usan con `$VARIABLE`. Sin `$`, se trata como texto literal, no valor.
* Los argumentos al script se acceden con `$1` (primer argumento), `$2` (segundo), etc. `$0` es nombre del script. `$#` es cantidad total de argumentos. `$@` son todos los argumentos.
* Las estructuras condicionales `if [ condición ]; then ... fi` ejecutan código basado en condición. `-f archivo` verifica si archivo existe, `-d directorio` verifica si es directorio, `-z texto` si es vacío.

**Comandos importantes:**

* `#!/bin/bash`: Shebang (primera línea de script), especifica intérprete
* `chmod +x script.sh`: Agrega permiso de ejecución
* `./script.sh argumento1 argumento2`: Ejecuta script con argumentos
* `echo $0`: Imprime nombre del script
* `echo $#`: Imprime cantidad de argumentos pasados
* `echo $@`: Imprime todos los argumentos
* `if [ -f archivo ]; then ... fi`: Verifica si archivo existe
* `for variable in lista; do ... done`: Itera sobre elementos

**Ejemplos prácticos:**

* Script simple que saluda: Crear archivo `saludo.sh` con contenido:
```
#!/bin/bash
echo "¡Hola, $1!"
```
Luego `chmod +x saludo.sh` y `./saludo.sh Maria` imprime "¡Hola, Maria!".

* Script con argumentos y verificación:
```
#!/bin/bash
if [ $# -eq 0 ]; then
  echo "Error: proporciona archivo"
  exit 1
fi
if [ -f "$1" ]; then
  echo "Procesando $1"
else
  echo "Archivo no existe"
  exit 1
fi
```

* Script con bucle para procesar múltiples archivos:
```
#!/bin/bash
for archivo in *.log; do
  echo "Procesando $archivo"
  cat "$archivo" | grep "ERROR" >> errores.txt
done
```

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Por qué un script Bash debe comenzar con `#!/bin/bash`?
  * A) Es un comentario, no es realmente necesario
  * B) Indica al sistema qué intérprete usar para ejecutar el script
  * C) Define variables del script
  * D) Previene errores de sintaxis
  * **Respuesta correcta: B)** El shebang `#!` es directiva especial que Unix/Linux reconoce en primera línea. Especifica intérprete (`bash`, `sh`, `python`, etc.). Sin él, sistema puede intentar ejecutar como intérprete por defecto (a veces incorrecto).

* **Pregunta 2:** En un script Bash, ¿cómo accedes al primer argumento pasado?
  * A) $0
  * B) $1
  * C) $@
  * D) $#
  * **Respuesta correcta: B)** `$1` es primer argumento. `$0` es nombre del script. `$@` son todos. `$#` es cantidad. Script llamado como `script.sh hola mundo`, `$1` = "hola", `$2` = "mundo".

**Errores comunes:**

* **Error típico:** Crear script sin permiso de ejecución e intentar ejecutar con `./script.sh`.
* **Por qué está mal:** Sin permiso de ejecución, falla con "Permiso denegado". Solucionar con `chmod +x script.sh`. Alternativa: `bash script.sh` (especificar intérprete) ejecuta sin necesidad de permiso.

* **Error típico:** Usar variable sin `$`: `echo NOMBRE` en lugar de `echo $NOMBRE`.
* **Por qué está mal:** Sin `$`, bash imprime literal "NOMBRE", no valor contenido. Con `$`, bash expande a valor de variable.

**Notas de examen:**

* Las preguntas sobre scripting enfatizan: shebang, permisos ejecución, acceso a argumentos, condicionales, bucles.
* Memorizar: `$0` = script, `$1` = arg1, `$#` = cantidad args, `$@` = todos args. Preguntas frecuentes sobre qué variable usar.
* Preguntas trampa: "¿Script en directorio actual se ejecuta simplemente como `script.sh`?" No, requiere `./script.sh` por seguridad (PATH no incluye directorio actual).

---

## TEMA 4: EL SISTEMA OPERATIVO LINUX

### 4.1 La Elección del Sistema Operativo

**Tema:** Distribuciones y criterios de selección

**Conceptos clave:**

* Un sistema operativo gestiona hardware, proporciona interfaz usuario, gestiona memoria, procesos, archivos. Linux es kernel; distribuciones agregan utilidades completando el SO.
* La selección de distribución depende de caso de uso: servidor (CentOS, RHEL, Debian), escritorio (Ubuntu, Linux Mint), especializada (Kali para seguridad, openSUSE con YaST).
* Ubuntu LTS (Long Term Support) proporciona 5 años soporte por lanzamiento (20.04 LTS = soporte hasta 2030). Versiones no-LTS solo 9 meses. Importante para producción.
* CentOS/RHEL énfasis en estabilidad para servidores, soporte comercial (RHEL), comunidad gratuita (CentOS). Lanzamientos cada 2-3 años, muy estables.
* Debian es la distribución comunitaria más grande, enfoque en libertad software, ningún software propietario por defecto. Perfecto para usuarios que valoran libertad.

**Comandos importantes:**

* `cat /etc/os-release`: Muestra distribución y versión
* `lsb_release -a`: Información de distribución instalada
* `uname -a`: Información del kernel
* `hostnamectl`: Muestra y cambia nombre de host/hostname
* `systemctl --version`: Versión del sistema init (systemd)

**Ejemplos prácticos:**

* Verificar compatibilidad de distribución: `cat /etc/os-release` en servidor muestra "NAME="CentOS Linux" VERSION="7"", confirmando CentOS 7 (importante para instalar paquetes específicos).
* Elegir distribución para caso de uso: Para servidor de producción, RHEL/CentOS ofrecen 10 años soporte. Para escritorio personal, Ubuntu o Mint ofrecen más software gráfico. Para privacidad extrema, Tails u OpenBSD.
* Migración entre distribuciones: De Debian a Ubuntu es fácil (Ubuntu basada en Debian, compatible). De Debian a CentOS requiere reinstalar (distintos gestores paquetes, archivos config).

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál distribución sería mejor para un servidor que requiere 10 años de soporte?
  * A) Ubuntu (versión actual)
  * B) Fedora
  * C) Red Hat Enterprise Linux
  * D) Linux Mint
  * **Respuesta correcta: C)** RHEL ofrece soporte comercial de 10 años. Ubuntu LTS ofrece 5. Fedora solo 13 meses. Mint es para escritorio, no servidores.

* **Pregunta 2:** ¿Cuál es una diferencia clave entre Debian y Red Hat?
  * A) Debian es comercial; Red Hat es comunitario
  * B) Red Hat enfatiza libertad software; Debian es más pragmático
  * C) Debian es completamente comunitario; RHEL es comercial (aunque CentOS es gratuito)
  * D) No hay diferencia significativa
  * **Respuesta correcta: C)** Debian es proyecto comunitario puro enfocado en libertad. RHEL es solución empresarial (pago) pero con CentOS gratuito. Filosofías diferentes.

**Errores comunes:**

* **Error típico:** Elegir distribución por popularidad sin considerar caso de uso.
* **Por qué está mal:** Ubuntu Mint son ideales para escritorio pero no para servidores empresariales. RHEL/CentOS son estables para servidores pero menos flexibles que Debian para desarrolladores.

* **Error típico:** Asumir que todas las distribuciones tienen igual soporte a largo plazo.
* **Por qué está mal:** Ubuntu LTS (5 años), RHEL (10 años), Fedora (13 meses), Debian testing (sin fecha fija). Para producción, elegir distribución con soporte claro.

**Notas de examen:**

* Las preguntas sobre distribuciones enfatizan: diferencias clave, caso de uso apropiado, duración de soporte.
* Memorizar: Ubuntu = fácil escritorio + server, CentOS = servidor estable gratuito, RHEL = servidor comercial, Debian = comunitario puro.
* Preguntas trampa: "¿Qué SO es mejor?" No hay uno mejor; depende del caso de uso específico.

---

### 4.2 Conocer el Hardware del Ordenador

**Tema:** Componentes hardware y gestión de dispositivos

**Conceptos clave:**

* El hardware comprende procesador (CPU), memoria RAM, almacenamiento (SSD/HDD), placa madre, fuente de poder. Linux debe reconocer cada componente.
* La memoria RAM es memoria volátil, rápida, usada por programas activos. Medida en GB. Si insuficiente, sistema usa swap (disco lento) degradando rendimiento.
* El almacenamiento incluye SSD (rápido, sin partes móviles) y HDD (más lento, partes móviles). Particiones dividen disco en segmentos separados (ej: / raíz, /home usuario, /boot arranque).
* Los dispositivos se representan en `/dev/`: `/dev/sda` es disco duro primario, `/dev/sdb` segundo disco. Particiones: `/dev/sda1` primera partición de sda.
* Los periféricos incluyen teclado, mouse, impresoras, USB, conectados a puertos. Requieren drivers (módulos kernel) para funcionar. `lsusb` lista dispositivos USB.

**Comandos importantes:**

* `cat /proc/cpuinfo`: Información detallada del procesador
* `free -h`: Muestra memoria RAM disponible y usada (h = formato legible)
* `df -h`: Espacio en disco de todos los sistemas de archivos montados
* `lsblk`: Lista todos los dispositivos de bloque (discos y particiones)
* `lsusb`: Lista dispositivos USB conectados
* `hwinfo`: Información completa de hardware (si instalado)
* `lspci`: Lista dispositivos PCI (tarjetas gráficas, tarjetas red, etc.)

**Ejemplos prácticos:**

* Verificar capacidad de procesador: `cat /proc/cpuinfo` muestra procesador, número de cores, velocidad. En servidor, determina capacidad de procesamiento.
* Monitorear memoria disponible: `free -h` muestra RAM total, usada, disponible. Si `available` es bajo, sistema necesita más RAM o optimización.
* Verificar espacio en disco: `df -h /` muestra espacio del sistema de archivos raíz. Si uso > 90%, riesgo de sistema lleno (especialmente /boot crítico).
* Identificar disco externo conectado: `lsblk` muestra `/dev/sda` (disco interno), `/dev/sdb` (USB externo típicamente). Importante antes de formatear.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál comando muestra cantidad de memoria RAM disponible en el sistema?
  * A) df -h
  * B) lsblk
  * C) free -h
  * D) cat /proc/cpuinfo
  * **Respuesta correcta: C)** `free -h` muestra RAM detalladamente. `df -h` es disco, `lsblk` discos/particiones, `cpuinfo` es procesador.

* **Pregunta 2:** En un sistema Linux, ¿a qué se refiere `/dev/sda1`?
  * A) Al primer disco duro
  * B) A la primera partición del primer disco duro
  * C) Al segundo disco duro
  * D) A memoria RAM
  * **Respuesta correcta: B)** `/dev/sda` es disco (a=primero), `/dev/sda1` es partición 1 de ese disco. `/dev/sdb` sería segundo disco.

**Errores comunes:**

* **Error típico:** Confundir RAM (memoria volátil, rápida) con almacenamiento (disco, permanente).
* **Por qué está mal:** RAM se mide en GB, limitada por hardware. Se ejecutan programas aquí. Almacenamiento permanente pero lento. Insuficiente RAM causa ralentización (uso swap).

* **Error típico:** Asumir que espacio libre en disco es espacio libre en RAM.
* **Por qué está mal:** Son distintos. Puedes tener 1 TB disco libre pero solo 4 GB RAM disponible. Para programas grandes, RAM es limitante, no disco.

**Notas de examen:**

* Las preguntas sobre hardware enfatizan: distinción entre componentes, comandos para verificar cada uno, nombres de dispositivos.
* Memorizar: `/dev/sda` = disco, `/dev/sda1` = partición, `free -h` = RAM, `df -h` = disco, `lsblk` = discos/particiones.
* Preguntas trampa: "`lsusb` muestra RAM?" No. "`df -h` muestra RAM?" No. Cada comando para su propósito específico.

---

### 4.3 Dónde los Datos se Almacenan

**Tema:** Sistema de archivos, procesos y almacenamiento

**Conceptos clave:**

* El sistema de archivos es estructura jerárquica de directorios. Raíz es `/`. Todo lo demás es subdirectorio. Linux sigue Filesystem Hierarchy Standard (FHS).
* Directorios principales: `/bin` (comandos sistema), `/etc` (configuración), `/home` (datos usuario), `/var` (logs, datos variables), `/usr` (aplicaciones usuario), `/tmp` (archivos temporales).
* Un proceso es programa ejecutado en memoria. `PID` (Process ID) identifica cada proceso. Padre-hijo: procesos pueden generar subprocesos. `init` (PID 1) es primer proceso.
* Procesos se controlan con `ps` (listar), `kill` (terminar), `top` (monitoreo tiempo real). Estado: running, sleeping, stopped, zombie.
* Memoria en Linux se gestiona en páginas. Swap es área en disco usada como extensión de RAM cuando insuficiente. Mucho swap indica sistema con presión de memoria.

**Comandos importantes:**

* `ps aux`: Lista todos los procesos en ejecución con detalles
* `top`: Monitoreo tiempo real de procesos y recursos
* `kill PID`: Termina proceso con PID especificado
* `kill -9 PID`: Fuerza terminación de proceso (SIGKILL)
* `systemctl status servicio`: Estado de servicio del sistema
* `journalctl -u servicio`: Logs del sistema journal
* `dmesg`: Logs del kernel (mensajes de arranque)
* `uname -r`: Versión del kernel

**Ejemplos prácticos:**

* Listar procesos y encontrar CPU alto: `top` muestra procesos ordenados por uso CPU. Si proceso consume 100% una CPU, considerar optimizar o asignar más recursos.
* Terminar proceso problemático: `ps aux | grep nombre_proceso` encuentra PID del proceso, luego `kill PID` termina gracefully. Si no responde, `kill -9 PID` fuerza.
* Verificar servicio activo: `systemctl status apache2` en Debian muestra si Apache está corriendo. `systemctl restart apache2` reinicia. Importante para servidores.
* Verificar logs del kernel: `dmesg | tail -20` muestra últimos 20 mensajes del kernel, útil para diagnosticar hardware o problemas de arranque.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la diferencia entre `kill PID` y `kill -9 PID`?
  * A) No hay diferencia, ambos terminan procesos
  * B) kill termina gracefully; -9 fuerza terminación inmediata
  * C) -9 es más lento que kill sin bandera
  * D) kill sin bandera no funciona
  * **Respuesta correcta: B)** `kill` envía SIGTERM (termina gracefully, permite limpieza). `kill -9` envía SIGKILL (termina inmediata, no se puede ignorar). Usar SIGKILL solo si SIGTERM falla.

* **Pregunta 2:** ¿En qué directorio se almacenan típicamente los logs del sistema en Linux?
  * A) /usr/logs
  * B) /home/logs
  * C) /var/log
  * D) /tmp/logs
  * **Respuesta correcta: C)** FHS especifica `/var/log` para logs del sistema (syslog, apache, etc.). `/var` contiene datos variables. `/tmp` es temporal (se limpia), no apropiado para logs permanentes.

**Errores comunes:**

* **Error típico:** Usar `kill -9` como primera opción para todos los procesos.
* **Por qué está mal:** `-9` termina inmediatamente sin permitir limpieza (cerrar archivos, liberar recursos). Puede causar corrupción de datos. Primero intentar `kill` normal, solo usar `-9` si no responde.

* **Error típico:** Confundir `/etc` (configuración sistema) con `/etc/user` (no existe en FHS).
* **Por qué está mal:** Configuración de usuario está en `~/.config` (home usuario). Sistema está en `/etc`. Intentar editar usuario config en `/etc` fallaría.

**Notas de examen:**

* Las preguntas sobre almacenamiento enfatizan: directorios FHS, procesos (PID, estado), comandos de gestión.
* Memorizar directorios: `/bin` = comandos, `/etc` = config, `/home` = usuarios, `/var/log` = logs, `/tmp` = temporal, `/usr` = aplicaciones.
* Preguntas trampa: "¿`/boot` contiene datos usuario?" No, solo kernel y bootloader. "`/home` contiene logs del sistema?" No, `/var/log`.

---

### 4.4 Tu Ordenador en la Red

**Tema:** Redes, protocolos de comunicación, DNS

**Conceptos clave:**

* IPv4 es protocolo de red versión 4, usa direcciones de 32 bits (ej: 192.168.1.100). Formato: cuatro números separados por puntos (0-255 cada uno). Clases: A (grandes redes), B (medianas), C (pequeñas/LANs).
* IPv6 es protocolo versión 6, usa direcciones 128 bits (ej: 2001:0db8::1). Desarrollado para resolver escasez de direcciones IPv4. Lentamente reemplazando IPv4.
* DHCP (Dynamic Host Configuration Protocol) asigna automáticamente dirección IP a dispositivos en red. Máquina solicita dirección, servidor DHCP proporciona (típico en casas, oficinas).
* DNS (Domain Name System) traduce nombres (google.com) a direcciones IP (142.250.185.46). Sin DNS, deberías memorizar IPs de sitios que usas.
* Máscara de red determina qué dispositivos están en misma red. `/24` (o 255.255.255.0) significa primeros 3 octetos son red, último es host. Ej: 192.168.1.0/24 incluye 192.168.1.1 a 192.168.1.254.

**Comandos importantes:**

* `ip addr show`: Muestra direcciones IP asignadas (moderno, reemplaza `ifconfig`)
* `ip route show`: Muestra tabla de rutas (dónde enviar paquetes)
* `ping dirección`: Verifica conectividad a dirección (ICMP echo)
* `nslookup dominio`: Consulta DNS, muestra IP de dominio
* `dig dominio`: Herramienta avanzada de DNS (más detalles que nslookup)
* `traceroute destino`: Muestra ruta que siguen paquetes hacia destino
* `ifconfig`: Información de interfaces (antiguo, evitar en nuevo código)
* `hostname`: Muestra nombre de ordenador en red

**Ejemplos prácticos:**

* Verificar dirección IP: `ip addr show` muestra `inet 192.168.1.50/24 brd 192.168.1.255` indicando IP 192.168.1.50 en red /24 (máscara 255.255.255.0).
* Verificar conectividad internet: `ping 8.8.8.8` envía paquetes a Google DNS. Si responde, internet funciona. Si no, problema de conectividad.
* Resolver dominio a IP: `nslookup google.com` devuelve "Address: 142.250.185.46" (una de las IPs de Google). Sin DNS, deberías conocer esta IP.
* Rastrear ruta a destino: `traceroute google.com` muestra todos los saltos (hops) desde tu máquina a Google, útil para diagnosticar dónde se pierde conectividad.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la función principal de DHCP?
  * A) Traducir nombres de dominio a IPs
  * B) Asignar automáticamente direcciones IP a dispositivos en la red
  * C) Enrutar paquetes entre redes
  * D) Cifrar comunicaciones de red
  * **Respuesta correcta: B)** DHCP proporciona automáticamente dirección IP (y máscara, puerta de enlace, DNS) a dispositivos que se conectan. Sin DHCP, deberías configurar IP manualmente.

* **Pregunta 2:** ¿Qué significa la notación `/24` en una dirección IPv4?
  * A) Puerto 24 de la dirección
  * B) Máscara de red con primeros 24 bits como red
  * C) Versión 24 de IPv4
  * D) Prioridad de la dirección
  * **Respuesta correcta: B)** `/24` es notación CIDR, significa que primeros 24 bits (3 octetos) son red, último 8 bits son hosts. Equivalente a máscara 255.255.255.0.

**Errores comunes:**

* **Error típico:** Confundir IPv4 (limitadas ~4 billones direcciones) con IPv6 (prácticamente ilimitadas).
* **Por qué está mal:** Internet se queda sin direcciones IPv4. IPv6 resuelve esto pero adopción es lenta. Ambos coexisten actualmente.

* **Error típico:** Asumir que `ping` no responde siempre significa red rota.
* **Por qué está mal:** Algunos administradores desactivan ICMP por seguridad. `ping google.com` puede fallar pero web funciona. Usar `curl` para verificar conectividad web.

**Notas de examen:**

* Las preguntas sobre redes enfatizan: diferencia IPv4/IPv6, función DHCP/DNS, máscara de red, comandos de diagnóstico.
* Memorizar: IPv4 = 32 bits (xxx.xxx.xxx.xxx), IPv6 = 128 bits (hexadecimal), DHCP = asignación automática, DNS = nombre a IP, `/24` = máscara 255.255.255.0.
* Preguntas trampa: "¿`ping` demuestra que servicios web funcionan?" No, solo conectividad ICMP. "`nslookup` solo funciona con internet?" Sí, necesita acceso a servidor DNS.

---

## TEMA 5: SEGURIDAD Y SISTEMA DE PERMISOS DE ARCHIVOS

### 5.1 Seguridad Básica e Identificación de Tipos de Usuarios

**Tema:** Cuentas de usuario, privilegios y control de acceso

**Conceptos clave:**

* Linux es multiusuario: múltiples usuarios pueden trabajar simultáneamente. Cada usuario tiene UID (User ID), cuenta, home directorio. Usuario root (UID 0) es administrador con privilegios ilimitados.
* Usuarios regulares tienen permisos limitados (no pueden modificar sistema crítico, instalar paquetes sin sudo). Más seguro: minimiza daño de compromisos accidentales o ataques.
* `sudo` (superuser do) permite usuarios autorizados ejecutar comandos como root sin conocer contraseña root. Auditable y más seguro que compartir contraseña root.
* Grupos permiten compartir permisos. Usuario puede pertenecer múltiples grupos. Archivos tienen permisos para: propietario, grupo, otros. Muy flexible.
* Autenticación es proceso de verificar identidad (contraseña, biométrica). Autorización es decidir qué puede hacer usuario autenticado (basado en permisos, grupos).

**Comandos importantes:**

* `whoami`: Muestra usuario actual
* `id`: Muestra UID, GID, grupos del usuario actual
* `sudo comando`: Ejecuta comando como root (requiere autorización)
* `su usuario`: Cambia a otro usuario (requiere su contraseña)
* `sudo su`: Cambia a root (requiere contraseña del usuario actual)
* `groups`: Muestra grupos del usuario actual
* `cat /etc/passwd`: Archivo con información de usuarios
* `cat /etc/shadow`: Archivo con contraseñas (solo root)

**Ejemplos prácticos:**

* Verificar usuario y permisos: `id` devuelve `uid=1000(usuario) gid=1000(usuario) groups=1000(usuario),4(adm),24(cdrom)`. Muestra UID, GID, grupos.
* Ejecutar comando como root: `sudo apt update` actualiza lista de paquetes (requiere privilegios). Sin sudo, falla "permiso denegado".
* Cambiar usuario temporalmente: `su - otro_usuario` solicita contraseña, luego actúas como otro usuario. `exit` vuelve al usuario original.
* Verificar quién puede usar sudo: `sudo -l` lista comandos que usuario actual puede ejecutar con sudo (configurado en `/etc/sudoers`).

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la principal ventaja de usar `sudo` en lugar de compartir contraseña root?
  * A) sudo es más rápido que root
  * B) sudo permite auditoría de comandos ejecutados, no requiere conocer contraseña root
  * C) sudo no requiere autenticación
  * D) No hay diferencia de seguridad
  * **Respuesta correcta: B)** `sudo` es auditable (registra quién ejecutó qué). No necesitas dar contraseña root a múltiples administradores. Más granular: puedes autorizar comandos específicos.

* **Pregunta 2:** ¿Cuál es el UID del usuario root en Linux?
  * A) 0
  * B) 1
  * C) 1000
  * D) No tiene UID
  * **Respuesta correcta: A)** UID 0 es root por defecto. Cualquier usuario con UID 0 tiene privilegios root (raro pero posible). UIDs regulares comienzan en 1000.

**Errores comunes:**

* **Error típico:** Trabajar siempre como root en escritorio personal por conveniencia.
* **Por qué está mal:** Un error (comando mal escrito) como root puede destruir todo el sistema. Mejor trabajar como usuario regular, usar sudo cuando necesario.

* **Error típico:** Compartir contraseña root con múltiples administradores.
* **Por qué está mal:** No hay auditoría de quién hizo qué. Si algo sale mal, no sabes quién lo causó. Mejor usar sudo con configuración en `/etc/sudoers`.

**Notas de examen:**

* Las preguntas sobre seguridad enfatizan: diferencia usuario/root, function de sudo, grupos, auditoría.
* Memorizar: root = UID 0 (todo permite), usuarios = UID >= 1000 (limitados), sudo = auditable, grupos = comparten permisos.
* Preguntas trampa: "¿`sudo` requiere contraseña root?" No, requiere contraseña del usuario actual (que está en grupo sudo).

---

### 5.2 Creación de Usuarios y Grupos

**Tema:** Gestión de cuentas de usuario y grupos

**Conceptos clave:**

* El archivo `/etc/passwd` contiene información de usuarios: nombre, UID, GID, home, shell. Formato: `usuario:x:1000:1000:Nombre Real:/home/usuario:/bin/bash` (la x es para compatibilidad histórica, contraseña en /etc/shadow).
* El archivo `/etc/shadow` contiene contraseñas cifradas (shadow = oculto). Solo root puede leer. Más seguro que /etc/passwd que es legible por todos.
* El archivo `/etc/group` contiene información de grupos: nombre, GID, miembros. Formato: `grupo:x:1000:usuario1,usuario2`.
* El comando `useradd usuario` crea nuevo usuario (mínimo). `useradd -m usuario` también crea home. `useradd -m -s /bin/bash usuario` especifica shell.
* El comando `userdel usuario` elimina usuario (no elimina home). `userdel -r usuario` elimina usuario y home directorio.

**Comandos importantes:**

* `useradd -m -s /bin/bash usuario`: Crea usuario con home y shell bash
* `passwd usuario`: Cambia contraseña de usuario
* `userdel usuario`: Elimina usuario (conserva home)
* `userdel -r usuario`: Elimina usuario y home
* `groupadd grupo`: Crea nuevo grupo
* `groupdel grupo`: Elimina grupo
* `usermod -G grupo1,grupo2 usuario`: Agrega usuario a grupos
* `cat /etc/passwd`: Muestra todos los usuarios
* `cat /etc/group`: Muestra todos los grupos

**Ejemplos prácticos:**

* Crear nuevo usuario: `sudo useradd -m -s /bin/bash juan` crea usuario juan con home `/home/juan` y shell bash. Luego `sudo passwd juan` establece contraseña.
* Agregar usuario a grupo: `sudo usermod -G sudo juan` agrega juan al grupo sudo (permite usar sudo). `sudo usermod -G sudo,video,audio juan` agrega a múltiples grupos.
* Listar usuarios en sistema: `cat /etc/passwd | cut -d: -f1` imprime solo nombres de usuarios (extrae primer campo separado por :).
* Eliminar usuario y su home: `sudo userdel -r juan` elimina usuario juan y directorio `/home/juan` (cuidado, es destructivo).

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la diferencia entre `/etc/passwd` y `/etc/shadow`?
  * A) passwd contiene contraseñas en texto plano; shadow las contiene cifradas
  * B) passwd es legible por todos; shadow solo por root. shadow contiene contraseñas cifradas
  * C) No hay diferencia, ambos contienen misma información
  * D) shadow es solo para grupos, passwd para usuarios
  * **Respuesta correcta: B)** `/etc/passwd` (legible por todos) contiene información de usuarios pero NO contraseñas (solo x). `/etc/shadow` (solo root) contiene contraseñas cifradas.

* **Pregunta 2:** ¿Qué comando crearías un usuario nuevo con home directorio?
  * A) useradd usuario
  * B) useradd -m usuario
  * C) adduser usuario
  * D) createuser usuario
  * **Respuesta correcta: B)** `useradd -m` crea usuario con home (`-m` = make home). Sin `-m`, home no se crea (configuración automática en algunas distros, pero mejor especificar).

**Errores comunes:**

* **Error típico:** Olvidar establecer contraseña al crear usuario.
* **Por qué está mal:** `useradd -m usuario` crea usuario pero sin contraseña. Usuario no puede login. Debes ejecutar `passwd usuario` después.

* **Error típico:** Usar `userdel usuario` sin `-r` esperando que home se elimine.
* **Por qué está mal:** Solo se elimina la cuenta. Archivos `/home/usuario` permanecen. Usar `-r` para eliminar home.

**Notas de examen:**

* Las preguntas sobre gestión de usuarios enfatizan: archivos `/etc/passwd`, `/etc/shadow`, `/etc/group`, comandos create/delete/modify usuarios.
* Memorizar: `/etc/passwd` = usuarios legible, `/etc/shadow` = contraseñas solo root, `/etc/group` = grupos, `useradd -m` = crear con home.
* Preguntas trampa: "¿Puedo editar directamente `/etc/passwd`?" Posible pero riesgoso; mejor usar comandos (`useradd`, `usermod`, etc.).

---

### 5.3 Gestión de Permisos y Propiedad de Archivos

**Tema:** Permisos archivo, propiedad, y control de acceso

**Conceptos clave:**

* Permisos archivo componen 10 caracteres: primer carácter es tipo (- archivo, d directorio, l enlace), siguientes 9 son rwx para propietario, grupo, otros.
* Permiso `r` (read = 4) permite leer. `w` (write = 2) permite escribir/modificar. `x` (execute = 1) permite ejecutar (archivos) o listar (directorios).
* Notación numérica: `chmod 755 archivo` = propietario rwx (7), grupo rx (5), otros rx (5). Suma: r(4)+w(2)+x(1)=7.
* El comando `chmod` cambia permisos. `chmod u+x script.sh` agrega execute al propietario. `chmod 644 archivo` establece rw- a todos menos otros.
* El comando `chown` cambia propietario. `chown usuario:grupo archivo` cambia propietario a usuario y grupo a grupo.

**Comandos importantes:**

* `ls -l`: Muestra permisos (-rw-r--r-- usuario grupo tamaño fecha nombre)
* `chmod modo archivo`: Cambia permisos (modo numérico o simbólico)
* `chmod u+x archivo`: Agrega execute al propietario (simbólico)
* `chmod 755 archivo`: Establece rwxr-xr-x (numérico)
* `chown usuario archivo`: Cambia propietario
* `chown usuario:grupo archivo`: Cambia propietario y grupo
* `chgrp grupo archivo`: Cambia solo grupo
* `umask`: Muestra máscara de permisos por defecto para nuevos archivos

**Ejemplos prácticos:**

* Ver permisos archivo: `ls -l script.sh` muestra `-rwxr-xr-x usuario grupo ...`. Significado: propietario rwx (7), grupo rx (5), otros rx (5) = 755.
* Cambiar permisos para ejecutar: `chmod +x script.sh` agrega execute a todos (u+x solo propietario). `chmod 755 script.sh` es equivalente: propietario rwx, otros rx.
* Crear archivo privado: `chmod 600 archivo_secreto.txt` = rw------- (solo propietario lee/escribe, nadie más acceso). Útil para claves privadas, datos sensibles.
* Cambiar propietario de archivo: `sudo chown nuevo_usuario archivo.txt` cambia propietario (requiere root). `sudo chown nuevo_usuario:nuevo_grupo archivo.txt` cambia ambos.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Qué significa la notación `-rw-r--r--`?
  * A) Archivo ejecutable por propietario
  * B) Propietario rw, grupo r, otros r (sin execute)
  * C) Directorio con permisos 644
  * D) Enlace simbólico
  * **Respuesta correcta: B)** Primer `-` = archivo regular. `rw-` = propietario lee/escribe. `r--` = grupo solo lee. `r--` = otros solo leen. Equivalente a 644.

* **Pregunta 2:** ¿Qué comando establecerías permisos 755 a archivo.txt?
  * A) chmod 755 archivo.txt
  * B) chmod u=rwx,g=rx,o=rx archivo.txt
  * C) Ambas son correctas
  * D) Ninguna de las anteriores
  * **Respuesta correcta: C)** Ambas establecen rwxr-xr-x. Forma numérica (755) es concisa. Simbólica (u=rwx,g=rx,o=rx) es explícita. Ambas válidas y equivalentes.

**Errores comunes:**

* **Error típico:** Usar `chmod 777` (rwxrwxrwx = permisos máximos) por comodidad.
* **Por qué está mal:** Inseguro: todos pueden leer/escribir/ejecutar. Mejor ser específico: `chmod 755` (propietario rwx, otros rx) para ejecutables, `chmod 644` (rw-r--r--) para datos.

* **Error típico:** Cambiar permisos sin entender qué significa cada dígito.
* **Por qué está mal:** `chmod 777 /etc/passwd` permitiría que cualquier usuario modifique contraseñas (desastre). Recordar: primer dígito = propietario, segundo = grupo, tercero = otros.

**Notas de examen:**

* Las preguntas sobre permisos enfatizan: cómo leer `ls -l`, notación numérica vs simbólica, diferencia entre propietario/grupo/otros.
* Memorizar: r=4, w=2, x=1. 755 = rwxr-xr-x, 644 = rw-r--r--, 600 = rw-------.
* Preguntas trampa: "¿`chmod` sin argumentos?" Falla. "¿Directorio con execute significa?" Permite listar contenido (x en directorio = enter/access).

---

### 5.4 Directorios y Archivos Especiales

**Tema:** Enlaces simbólicos, duros y archivos temporales

**Conceptos clave:**

* Un enlace simbólico (soft link) es archivo especial que apunta a otro archivo. `ln -s origen enlace` crea enlace simbólico. Si archivo original se elimina, enlace "se rompe" (apunta a nada).
* Un enlace duro (hard link) es segundo nombre para mismo archivo (mismo inode). `ln origen enlace` crea enlace duro. Ambos nombres refieren exactamente el mismo contenido.
* `/tmp` es directorio para archivos temporales. Típicamente se limpia automáticamente (reinicio o cron job). No es apropiado para datos permanentes.
* Inode es estructura interna que almacena metadatos de archivo (tamaño, permisos, ubicación en disco). Enlace duro crea segunda entrada que apunta a mismo inode.
* La diferencia crucial: eliminar enlace simbólico no afecta original. Eliminar una entrada de enlace duro permanece si hay otras entradas (el archivo se elimina cuando conteo de enlaces es 0).

**Comandos importantes:**

* `ln -s origen enlace`: Crea enlace simbólico (soft link)
* `ln origen enlace`: Crea enlace duro (hard link)
* `ls -l`: Muestra enlace (@ para simbólico, número antes de propietario es conteo de enlaces)
* `readlink enlace`: Muestra a qué apunta enlace simbólico
* `stat archivo`: Muestra información incluyendo inode y conteo de enlaces
* `rm archivo`: Elimina archivo (o referencia enlace duro)
* `rm enlace_simbolico`: Elimina solo el enlace, no el archivo original

**Ejemplos prácticos:**

* Crear enlace simbólico para acceso fácil: `ln -s /usr/local/bin/programa programa_local` crea enlace en directorio actual que apunta a programa. Eliminar `programa_local` no afecta programa original.
* Enlace duro para backup: `ln archivo archivo.respaldo` crea segundo nombre para mismo contenido. Cambiar `archivo` afecta ambos (mismo contenido). Si eliminas uno, otro sigue funcionando (ambos apuntan a mismo inode).
* Ver a qué apunta enlace: `readlink -f enlace` muestra ruta completa a la que apunta enlace simbólico (útil si es relativo).
* Contar referencias de archivo: `stat archivo` muestra "Links: 2" si hay 2 nombres para archivo (enlace duro). Archivo se elimina cuando Links baja a 0.

**Preguntas tipo examen:**

* **Pregunta 1:** ¿Cuál es la diferencia entre enlace simbólico y enlace duro?
  * A) Simbólico es más rápido; duro es más lento
  * B) Simbólico apunta a archivo (rompe si eliminas original); duro es segundo nombre para mismo archivo
  * C) No hay diferencia funcional
  * D) Duro solo funciona en directorios; simbólico solo en archivos
  * **Respuesta correcta: B)** Enlace simbólico es puntero (rompe si eliminas target). Enlace duro es segundo nombre (ambos apuntan mismo inode, sobrevive eliminación del "original").

* **Pregunta 2:** ¿Qué sucede si eliminas un archivo que tiene un enlace duro?
  * A) El enlace duro se rompe (apunta a nada)
  * B) El archivo permanece accesible a través del enlace duro
  * C) Ambos se eliminan
  * D) El sistema devuelve error
  * **Respuesta correcta: B)** Eliminar uno de los enlaces duros no elimina datos (inode permanece con Links: 1). El archivo sigue accesible via el otro nombre.

**Errores comunes:**

* **Error típico:** Confundir enlace simbólico con copia (cp).
* **Por qué está mal:** `ln -s archivo enlace` no copia contenido (ocuparía mismo espacio). Crea puntero muy pequeño. Editar via enlace simbólico edita original (no son independientes).

* **Error típico:** Crear enlace duro a directorio (no funciona).
* **Por qué está mal:** `ln directorio enlace` falla con "is a directory". Enlace duro no funciona con directorios (por razones de la estructura del filesystem). Usar enlace simbólico: `ln -s directorio enlace`.

**Notas de examen:**

* Las preguntas sobre enlaces enfatizan: diferencia simbólico/duro, cuándo se rompe enlace simbólico, relación con inode.
* Memorizar: enlace simbólico = puntero (rompe si original se elimina), enlace duro = segundo nombre (sobrevive), inode = estructura de metadatos compartida por enlaces duros.
* Preguntas trampa: "¿Puedo editar via enlace?" Sí, siempre (ambos refieren mismo contenido para duro, contenido original para simbólico).

---

## CONCLUSIÓN

Esta guía de estudio cubre los temas principales del examen Linux Essentials (010-160) nivel de conceptos básicos. Cada tema incluye:

- **Conceptos clave**: Fundamentos que debes entender
- **Comandos importantes**: Herramientas principales para cada tema
- **Ejemplos prácticos**: Casos reales de uso
- **Preguntas tipo examen**: Formato múltiple choice como en examen real
- **Errores comunes**: Trampas frecuentes que evitar
- **Notas de examen**: Tips de estrategia y puntos críticos

### Recomendaciones para estudio:

1. **Práctica hands-on**: Ejecuta todos los comandos en terminal Linux (máquina virtual o WSL)
2. **Memorización estratégica**: Enfócate en comandos frecuentes, opciones principales
3. **Comprensión sobre memorización**: Entiende POR QUÉ cada comando funciona así
4. **Repite preguntas**: Resuelve múltiples veces hasta que respuestas sean automáticas
5. **Simula examen**: Establece tiempo límite, contesta sin notas

### Distribuciones recomendadas para práctica:

- **Ubuntu Desktop**: Fácil de instalar, comunidad grande, muy similar a examen
- **CentOS/RHEL**: Perfecto para aprender RPM-based systems
- **Debian**: La distribución madre, perfecta para aprender fundamentals

¡Buena suerte en tu examen Linux Essentials!

