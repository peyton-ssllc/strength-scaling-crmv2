import {
  Activity,
  AlarmClock,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Crown,
  DatabaseZap,
  Gauge,
  Import,
  LayoutDashboard,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

export const navItems = [
  { label: "My Queue", href: "/queue", icon: PhoneCall },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Contacts", href: "/contacts", icon: DatabaseZap },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Team Chat", href: "/team-chat", icon: MessageSquareText },
  { label: "Pipeline & Clients", href: "/pipeline-clients", icon: BarChart3 },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Import Leads", href: "/import-leads", icon: Import },
  { label: "Members", href: "/members", icon: Users },
];

export const leads = [
  {
    id: "ld_1024",
    business: "Iron Valley Performance",
    contact: "Mason Reed",
    role: "Owner",
    phone: "(615) 555-0148",
    email: "mason@ironvalley.fit",
    location: "Nashville, TN",
    score: 91,
    status: "Due follow-up",
    source: "Gym owner list",
    lastTouch: "Voicemail left 2 days ago",
    nextAction: "Call now, then send quick SMS if no answer",
    notes:
      "Runs a 7,500 sqft strength gym. Mentioned wanting more semi-private training clients.",
  },
  {
    id: "ld_1025",
    business: "Northline Athletics",
    contact: "Amanda Torres",
    role: "Founder",
    phone: "(512) 555-0181",
    email: "amanda@northlineathletics.com",
    location: "Austin, TX",
    score: 84,
    status: "New",
    source: "Instagram scrape",
    lastTouch: "Never contacted",
    nextAction: "First call",
    notes: "High intent signals from recent hiring posts and paid challenge campaign.",
  },
  {
    id: "ld_1026",
    business: "ForgeFit Studio",
    contact: "Ryan Cho",
    role: "General Manager",
    phone: "(303) 555-0119",
    email: "ryan@forgefit.co",
    location: "Denver, CO",
    score: 77,
    status: "Callback",
    source: "Referral",
    lastTouch: "Asked for callback this afternoon",
    nextAction: "Call at scheduled time",
    notes: "Wants owner looped in if marketing audit looks useful.",
  },
];

export const outcomes = [
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

export const queueStats = [
  { label: "Due now", value: "37", icon: AlarmClock, tone: "text-sky-300" },
  { label: "Worked today", value: "64", icon: CheckCircle2, tone: "text-emerald-300" },
  { label: "Meetings", value: "5", icon: CalendarDays, tone: "text-violet-300" },
  { label: "Pace", value: "92%", icon: Gauge, tone: "text-amber-300" },
];

export const adminMetrics = [
  { label: "Team calls today", value: "412", change: "+18% vs avg" },
  { label: "Meetings booked", value: "27", change: "8 this afternoon" },
  { label: "Follow-ups overdue", value: "13", change: "Needs cleanup" },
  { label: "Hot leads flagged", value: "9", change: "Manager review" },
];

export const repMetrics = [
  { label: "Calls today", value: "72", change: "28 left to target" },
  { label: "Connect rate", value: "18%", change: "+4% this week" },
  { label: "Meetings booked", value: "4", change: "Ranked #2 today" },
  { label: "Follow-ups due", value: "11", change: "3 overdue" },
];

export const pipelineStages = [
  {
    name: "Interested",
    value: "$42k",
    items: [
      { company: "Iron Valley Performance", owner: "Mason Reed", rep: "Avery", age: "2d" },
      { company: "ForgeFit Studio", owner: "Ryan Cho", rep: "Sam", age: "1d" },
    ],
  },
  {
    name: "Meeting Booked",
    value: "$68k",
    items: [
      { company: "Peak House Gym", owner: "Dana Mills", rep: "Jordan", age: "Today" },
      { company: "Northline Athletics", owner: "Amanda Torres", rep: "Avery", age: "Today" },
    ],
  },
  {
    name: "Proposal Sent",
    value: "$31k",
    items: [{ company: "Legacy Strength Club", owner: "Ben Park", rep: "Mia", age: "4d" }],
  },
  {
    name: "Client Onboarding",
    value: "$54k",
    items: [
      { company: "Barbell Republic", owner: "Chris Hale", rep: "Jordan", age: "Won" },
      { company: "Pulse Fitness Lab", owner: "Nina Brooks", rep: "Mia", age: "Won" },
    ],
  },
];

export const activities = [
  { icon: PhoneCall, title: "Avery called Iron Valley Performance", meta: "No answer, voicemail left" },
  { icon: Sparkles, title: "Mia booked Peak House Gym", meta: "Discovery call tomorrow at 11:00 AM" },
  { icon: ShieldCheck, title: "Admin flagged ForgeFit Studio", meta: "Owner requested pricing review" },
  { icon: Activity, title: "Jordan moved Barbell Republic to onboarding", meta: "Closed won" },
];

export const leaderboard = [
  { rank: 1, name: "Jordan Lee", calls: 86, meetings: 6, points: 940, badge: Crown },
  { rank: 2, name: "Avery Stone", calls: 72, meetings: 4, points: 810, badge: Trophy },
  { rank: 3, name: "Mia Carter", calls: 69, meetings: 4, points: 790, badge: Trophy },
  { rank: 4, name: "Sam Wells", calls: 61, meetings: 3, points: 650, badge: Trophy },
];

export const members = [
  { name: "Peyton Carlson", role: "Admin", status: "Active", focus: "Manager review" },
  { name: "Jordan Lee", role: "SDR Rep", status: "Calling", focus: "High-score queue" },
  { name: "Avery Stone", role: "SDR Rep", status: "Calling", focus: "Due follow-ups" },
  { name: "Mia Carter", role: "SDR Rep", status: "Active", focus: "Booked meetings" },
];
