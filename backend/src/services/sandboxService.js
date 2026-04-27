import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';

const TEMP_BASE = join(tmpdir(), 'linuxquest-sandbox');
const MAX_SANDBOX_SIZE = 10 * 1024 * 1024; // 10MB per user

const initializeSandbox = (sandboxDir) => {
  try {
    writeFileSync(
      join(sandboxDir, 'README.txt'),
      'Bienvenido a LinuxQuest\nEste es tu espacio de trabajo temporal.\nPractica comandos de Linux aquí.\n'
    );
    writeFileSync(
      join(sandboxDir, 'datos.txt'),
      'Línea 1: Datos de ejemplo\nLínea 2: Para practicar grep\nLínea 3: Y otros comandos\n'
    );
  } catch (error) {
    console.error('Error initializing sandbox files:', error);
  }
};

export const createUserSandbox = (userId) => {
  const userSandboxDir = join(TEMP_BASE, `user_${userId}`);

  try {
    mkdirSync(userSandboxDir, { recursive: true });
    initializeSandbox(userSandboxDir);
    console.log(`Sandbox created for user ${userId}: ${userSandboxDir}`);
    return userSandboxDir;
  } catch (error) {
    console.error(`Error creating sandbox for user ${userId}:`, error);
    throw error;
  }
};

export const deleteUserSandbox = (userId) => {
  const userSandboxDir = join(TEMP_BASE, `user_${userId}`);

  try {
    rmSync(userSandboxDir, { recursive: true, force: true });
    console.log(`Sandbox deleted for user ${userId}`);
  } catch (error) {
    console.error(`Error deleting sandbox for user ${userId}:`, error);
  }
};

export const getSandboxPath = (userId) => {
  return join(TEMP_BASE, `user_${userId}`);
};

export const validateSandboxPath = (sandboxDir, requestedPath) => {
  try {
    const resolvedPath = resolve(sandboxDir, requestedPath);
    const resolvedBase = resolve(sandboxDir);

    return resolvedPath.startsWith(resolvedBase);
  } catch {
    return false;
  }
};

export const cleanupUserSandbox = (userId) => {
  const userSandboxDir = join(TEMP_BASE, `user_${userId}`);

  try {
    rmSync(userSandboxDir, { recursive: true, force: true });
    createUserSandbox(userId);
    console.log(`Sandbox cleaned for user ${userId}`);
  } catch (error) {
    console.error(`Error cleaning sandbox for user ${userId}:`, error);
  }
};
