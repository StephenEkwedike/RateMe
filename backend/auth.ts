// =====================================================================
// FILE: backend/auth.ts
// PURPOSE: Authentication middleware and utilities for Express API
// =====================================================================

import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { logger } from './utils/logger';

// Define custom types to enhance type safety
// We rely on ClerkExpressWithAuth() to populate req.auth
// No need for a custom AuthenticatedRequest interface if we use req.auth directly

// Adds req.auth.userId etc.
// Cast Clerk middleware to Express RequestHandler to satisfy router.use() typing
export const clerkAuth: RequestHandler = ClerkExpressWithAuth() as unknown as RequestHandler;

/**
 * Middleware to require authenticated user
 * Enhanced with logging, detailed error messages, and proper typing
 */
export const requireUser: RequestHandler = (req, res, next) => {
  if (!req.auth?.userId) {
    logger.warn('Unauthenticated request rejected', {
      path: req.path,
      method: req.method,
      ip: req.ip,
    });
    return res.status(401).json({
      error: 'unauthenticated',
      message: 'You must be logged in to access this resource',
      code: 'AUTH_REQUIRED'
    });
  }
  // Logging successful authentication
  logger.debug('User authenticated', {
    userId: req.auth.userId,
    path: req.path,
    method: req.method,
  });
  next();
}

/**
 * Middleware to require specific roles
 * @param roles - Array of required roles
 */
export function requireRoles(roles: string[]): RequestHandler {
  return async (req, res, next) => {
    if (!req.auth?.userId) {
      return res.status(401).json({
        error: 'unauthenticated',
        message: 'You must be logged in to access this resource',
        code: 'AUTH_REQUIRED'
      });
    }
    try {
      const userRoles = await getUserRoles(req.auth.userId);
      const hasRequiredRole = roles.some(role => userRoles.includes(role));
      if (!hasRequiredRole) {
        logger.warn('Insufficient permissions', {
          userId: req.auth.userId,
          requiredRoles: roles,
          userRoles,
          path: req.path,
        });
        return res.status(403).json({
          error: 'forbidden',
          message: 'You do not have permission to access this resource',
          code: 'INSUFFICIENT_PERMISSIONS'
        });
      }
      next();
    } catch (error) {
      logger.error('Error verifying user roles', { userId: req.auth.userId, error });
      return res.status(500).json({
        error: 'server_error',
        message: 'An error occurred while verifying your permissions',
        code: 'AUTH_ERROR'
      });
    }
  };
}

/**
 * Get user roles from database or auth provider
 */
async function getUserRoles(userId: string): Promise<string[]> {
  // TODO: Replace with real role lookup (e.g., database or Clerk metadata)
  return ['user'];
}

/**
 * Middleware to attach organization context
 * Useful for multi-tenant applications
 */
export const requireOrganization: RequestHandler = (req, res, next) => {
  if (!req.auth?.userId) {
    return res.status(401).json({
      error: 'unauthenticated',
      message: 'You must be logged in to access this resource',
      code: 'AUTH_REQUIRED'
    });
  }
  if (!req.auth.orgId) {
    return res.status(403).json({
      error: 'organization_required',
      message: 'You must be part of an organization to access this resource',
      code: 'ORG_REQUIRED'
    });
  }
  next();
}

/**
 * Utility to get the current user's token
 */
export async function getUserToken(req: Request): Promise<string | null> {
  if (!req.auth?.getToken) {
    return null;
  }
  try {
    return await req.auth.getToken();
  } catch (error) {
    logger.error('Failed to get user token', { error });
    return null;
  }
}