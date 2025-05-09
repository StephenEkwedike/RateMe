import { Agent } from '../database';

export const createAgent = (data: { name: string; phone?: string; businessId: string }) =>
  Agent.create(data);

export const listAgents = (businessId: string) =>
  Agent.findAll({ where: { businessId } });

export const updateAgent = (
  id: string,
  data: Partial<{ name: string; phone: string }>
) => Agent.update(data, { where: { id }, returning: true });

export const deleteAgent = (id: string) => Agent.destroy({ where: { id } });