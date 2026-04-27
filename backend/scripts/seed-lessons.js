import pool from '../src/db.js';

const seedLessons = async () => {
  try {
    console.log('Agregando lecciones de prueba...\n');

    const lessons = [
      {
        title: 'Introducción a Linux',
        description: 'Aprende qué es Linux y cómo funciona',
        content: 'Linux es un sistema operativo de código abierto. Es usado por servidores, computadoras de escritorio y dispositivos móviles.',
        difficulty: 'beginner',
        order: 1
      },
      {
        title: 'El comando PWD',
        description: 'Descubre tu ubicación actual en el sistema',
        content: 'PWD (Print Working Directory) muestra la ruta completa del directorio actual. Ejemplo: /home/usuario/Desktop',
        difficulty: 'beginner',
        order: 2
      },
      {
        title: 'El comando LS',
        description: 'Lista archivos y carpetas',
        content: 'LS (List) muestra el contenido del directorio. Opciones útiles: -l (lista larga), -a (archivos ocultos)',
        difficulty: 'beginner',
        order: 3
      },
      {
        title: 'El comando ECHO',
        description: 'Imprime texto en la terminal',
        content: 'ECHO muestra texto. Ejemplo: echo "Hola Mundo" imprime "Hola Mundo" en pantalla.',
        difficulty: 'beginner',
        order: 4
      },
      {
        title: 'Navegación con CD',
        description: 'Cambia entre directorios',
        content: 'CD (Change Directory) te permite moverte entre carpetas. Ejemplo: cd /home, cd .., cd ~',
        difficulty: 'intermediate',
        order: 5
      },
      {
        title: 'Crear archivos con TOUCH',
        description: 'Crea archivos vacíos',
        content: 'TOUCH crea archivos vacíos o actualiza su fecha de modificación. Ejemplo: touch archivo.txt',
        difficulty: 'intermediate',
        order: 6
      },
      {
        title: 'Permisos de archivos',
        description: 'Entiende cómo funcionan los permisos en Linux',
        content: 'Los permisos se representan con rwx (read, write, execute). Usa chmod para cambiarlos. Ejemplo: chmod 755 archivo',
        difficulty: 'intermediate',
        order: 7
      },
      {
        title: 'Búsqueda con FIND',
        description: 'Busca archivos en el sistema',
        content: 'FIND busca archivos por nombre, tipo, tamaño, etc. Ejemplo: find . -name "*.txt"',
        difficulty: 'advanced',
        order: 8
      },
      {
        title: 'Pipes y redirección',
        description: 'Combina comandos y redirige salida',
        content: 'El pipe (|) conecta comandos. Ejemplo: ls | grep ".txt". Redirección: > (archivo), >> (append)',
        difficulty: 'advanced',
        order: 9
      },
      {
        title: 'Scripting básico',
        description: 'Crea scripts de bash',
        content: 'Los scripts permiten automatizar tareas. Comienzan con #!/bin/bash. Usa variables con $nombre.',
        difficulty: 'advanced',
        order: 10
      }
    ];

    for (const lesson of lessons) {
      await pool.query(
        `INSERT INTO lessons (title, description, content, difficulty, order_num)
         VALUES ($1, $2, $3, $4, $5)`,
        [lesson.title, lesson.description, lesson.content, lesson.difficulty, lesson.order]
      );
      console.log(`✓ ${lesson.title}`);
    }

    console.log('\n✅ Lecciones agregadas exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error agregando lecciones:', error.message);
    process.exit(1);
  }
};

seedLessons();
