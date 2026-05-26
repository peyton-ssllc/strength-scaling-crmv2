export type QueueLead = {
  id: string;
  business: string;
  contact: string;
  role: string;
  phone: string;
  email: string;
  status: string;
  followUp: string;
  city: string;
  state: string;
  timezone: string;
  calls: number;
  niche: string;
  score: number;
  due: boolean;
  source: string;
  lastTouch: string;
  nextAction: string;
  notes: string;
};

export const queueLeads: QueueLead[] = [
  {
    id: "lead_001",
    business: "CrossFit WOTOWN",
    contact: "Unknown Owner",
    role: "Owner",
    phone: "(205) 955-7553",
    email: "owner@crossfitwotown.com",
    status: "No Answer",
    followUp: "May 1, 11:34 AM",
    city: "Birmingham",
    state: "AL",
    timezone: "CT",
    calls: 1,
    niche: "CrossFit",
    score: 78,
    due: true,
    source: "Gym owner list",
    lastTouch: "No answer on first attempt",
    nextAction: "Call again now, then send a short text if no answer.",
    notes: "Good fit. Local CrossFit box with active class schedule.",
  },
  {
    id: "lead_002",
    business: "Meta Fitness Studio",
    contact: "General Manager",
    role: "Manager",
    phone: "(205) 783-1218",
    email: "hello@metafitnessstudio.com",
    status: "No Answer",
    followUp: "May 1, 11:40 AM",
    city: "Birmingham",
    state: "AL",
    timezone: "CT",
    calls: 1,
    niche: "Fitness Studio",
    score: 74,
    due: true,
    source: "Instagram scrape",
    lastTouch: "No answer",
    nextAction: "Call and ask for owner. If gatekeeper answers, confirm best callback time.",
    notes: "Boutique studio. Likely needs lead gen help for challenges.",
  },
  {
    id: "lead_003",
    business: "Iron Beach Gym",
    contact: "Front Desk",
    role: "Staff",
    phone: "(659) 253-5300",
    email: "info@ironbeachgym.com",
    status: "Called",
    followUp: "May 2, 11:36 AM",
    city: "Birmingham",
    state: "AL",
    timezone: "CT",
    calls: 1,
    niche: "Strength Gym",
    score: 82,
    due: false,
    source: "Gym owner list",
    lastTouch: "Front desk answered",
    nextAction: "Call back and ask for the owner by name if available.",
    notes: "Looks like a strong local gym. Worth a second attempt.",
  },
  {
    id: "lead_004",
    business: "Iron Empire Barbell Club",
    contact: "Owner",
    role: "Owner",
    phone: "(205) 514-3738",
    email: "team@ironempirebarbell.com",
    status: "Called",
    followUp: "May 2, 11:37 AM",
    city: "Birmingham",
    state: "AL",
    timezone: "CT",
    calls: 1,
    niche: "Barbell Club",
    score: 87,
    due: false,
    source: "Referral",
    lastTouch: "Called once",
    nextAction: "Call again. Mention growth audit and semi-private training acquisition.",
    notes: "High-quality niche fit. Prioritize if owner answers.",
  },
  {
    id: "lead_005",
    business: "CLUB4 Trussville",
    contact: "Manager",
    role: "Manager",
    phone: "(659) 444-1400",
    email: "trussville@club4fitness.com",
    status: "New",
    followUp: "-",
    city: "Birmingham",
    state: "AL",
    timezone: "CT",
    calls: 0,
    niche: "Commercial Gym",
    score: 68,
    due: false,
    source: "Gym brand list",
    lastTouch: "Never contacted",
    nextAction: "First call. Qualify whether local manager can discuss marketing.",
    notes: "Brand location. May require routing to regional decision maker.",
  },
  {
    id: "lead_006",
    business: "CrossFit Mudtown",
    contact: "Owner",
    role: "Owner",
    phone: "(205) 790-2019",
    email: "info@crossfitmudtown.com",
    status: "New",
    followUp: "-",
    city: "Birmingham",
    state: "AL",
    timezone: "CT",
    calls: 0,
    niche: "CrossFit",
    score: 84,
    due: false,
    source: "Gym owner list",
    lastTouch: "Never contacted",
    nextAction: "First call. Strong niche match.",
    notes: "Active CrossFit gym. Good target for appointment setting.",
  },
];

export const queueOutcomes = [
  "Connected - Interested",
  "Booked Meeting",
  "Callback Requested",
  "No Answer",
  "Left Voicemail",
  "Gatekeeper",
  "Not Interested",
  "Bad Number",
  "Do Not Contact",
];
