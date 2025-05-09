import { useApi } from "./useApi";
import {
  smsService,
  SentInvite,
  ManualSendDTO,
} from "@/services/smsService";

/** Live-query the “sent-invites” history */
export function useSmsHistory() {
  const { data, loading, error, refetch } = useApi<SentInvite[]>(
    smsService.history,
    { autoLoad: true }
  );

  return {
    history: data || [],
    loading,
    error,
    refetch,
  };
}

/** Fire-and-forget invite sender */
export function useSendInvite() {
  const { execute, loading, error } = useApi<SentInvite, [ManualSendDTO]>(
    smsService.sendInvite
  );

  return {
    sendInvite: execute,
    loading,
    error,
  };
}