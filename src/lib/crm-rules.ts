export const leadStatuses = [
  "new",
  "queued",
  "working",
  "contacted",
  "follow_up_scheduled",
  "meeting_booked",
  "qualified",
  "unqualified",
  "bad_data",
  "do_not_contact",
  "converted",
  "lost",
] as const;

export const queueEligibleStatuses = new Set([
  "new",
  "queued",
  "contacted",
  "follow_up_scheduled",
  "working",
]);

export const callOutcomes = [
  "connected_interested",
  "connected_not_interested",
  "connected_callback_requested",
  "no_answer",
  "left_voicemail",
  "bad_number",
  "gatekeeper",
  "booked_meeting",
  "wrong_contact",
  "do_not_contact",
  "needs_manager_review",
] as const;

export type CallOutcome = (typeof callOutcomes)[number];

export const followUpRules: Record<
  CallOutcome,
  {
    nextStatus: string;
    followUpDays?: number;
    requiresNote?: boolean;
    requiresFollowUpTime?: boolean;
    removeFromQueue?: boolean;
    managerReview?: boolean;
  }
> = {
  connected_interested: {
    nextStatus: "qualified",
    followUpDays: 1,
    requiresNote: true,
  },
  connected_not_interested: {
    nextStatus: "lost",
    requiresNote: true,
    removeFromQueue: true,
  },
  connected_callback_requested: {
    nextStatus: "follow_up_scheduled",
    requiresFollowUpTime: true,
    requiresNote: true,
  },
  no_answer: {
    nextStatus: "follow_up_scheduled",
    followUpDays: 1,
  },
  left_voicemail: {
    nextStatus: "follow_up_scheduled",
    followUpDays: 2,
  },
  bad_number: {
    nextStatus: "bad_data",
    removeFromQueue: true,
    managerReview: true,
  },
  gatekeeper: {
    nextStatus: "follow_up_scheduled",
    followUpDays: 2,
    requiresNote: true,
  },
  booked_meeting: {
    nextStatus: "meeting_booked",
    requiresNote: true,
    removeFromQueue: true,
  },
  wrong_contact: {
    nextStatus: "bad_data",
    requiresNote: true,
    managerReview: true,
  },
  do_not_contact: {
    nextStatus: "do_not_contact",
    requiresNote: true,
    removeFromQueue: true,
  },
  needs_manager_review: {
    nextStatus: "contacted",
    requiresNote: true,
    managerReview: true,
  },
};

export type LeadScoringInput = {
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  contactName?: string | null;
  source?: string | null;
  status?: string | null;
  positiveReply?: boolean;
  attempts?: number;
};

export function calculateLeadScore(input: LeadScoringInput) {
  if (input.status === "do_not_contact") {
    return 0;
  }

  let score = 40;

  if (input.phone) score += 10;
  else score -= 20;

  if (input.email) score += 5;
  if (input.website) score += 5;
  if (input.contactName) score += 10;
  if (input.source?.toLowerCase().includes("referral")) score += 15;
  if (input.source?.toLowerCase().includes("gym")) score += 10;
  if (input.positiveReply) score += 25;
  if ((input.attempts ?? 0) >= 5) score -= 20;
  if (input.status === "meeting_booked") score += 40;
  if (input.status === "bad_data") score -= 40;
  if (input.status === "lost") score -= 50;

  return Math.max(0, Math.min(100, score));
}

export function getNextFollowUpDate(outcome: CallOutcome, from = new Date()) {
  const rule = followUpRules[outcome];
  if (!rule.followUpDays) return null;

  const next = new Date(from);
  next.setDate(next.getDate() + rule.followUpDays);
  next.setHours(10, 0, 0, 0);
  return next;
}
