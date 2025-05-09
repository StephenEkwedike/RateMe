import { RequestHandler } from 'express';
import { Business } from '../database';
import { randomUUID } from 'crypto';

/**
 * List all businesses (Clerk-protected)
 */
export const list: RequestHandler = async (_req, res) => {
  const businesses = await Business.findAll();
  res.json(businesses);
};

/**
 * Create a new business with generated API key
 */
export const create: RequestHandler = async (req, res) => {
  const biz = await Business.create({
    name: req.body.name,
    apiKey: randomUUID().replace(/-/g, ''),
    plan: 'starter'
  });
  res.status(201).json(biz);
};

/**
 * Delete a business by ID
 */
export const remove: RequestHandler = async (req, res) => {
  await Business.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
};