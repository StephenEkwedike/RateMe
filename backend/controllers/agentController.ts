import { RequestHandler } from 'express';
import * as agentSvc from '../services/agentService';

export const addAgent: RequestHandler = async (req, res) => {
  // Use Clerk userId as businessId for now (adjust if you store businessId in claims)
  const businessId = req.auth?.userId!;
  const agent = await agentSvc.createAgent({ ...req.body, businessId });
  res.status(201).json(agent);
};

export const getAgents: RequestHandler = async (req, res) => {
  const businessId = req.auth?.userId!;
  const list = await agentSvc.listAgents(businessId);
  res.json(list);
};

export const patchAgent: RequestHandler = async (req, res) => {
  const [_, [updated]] = await agentSvc.updateAgent(req.params.id, req.body);
  res.json(updated);
};

export const removeAgent: RequestHandler = async (req, res) => {
  await agentSvc.deleteAgent(req.params.id);
  res.sendStatus(204);
};