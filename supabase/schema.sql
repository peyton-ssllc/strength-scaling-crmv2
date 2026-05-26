create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role text not null check (role in ('admin', 'sdr')),
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text,
  owner_name text,
  email text,
  phone text,
  website text,
  instagram_url text,
  city text,
  state text,
  country text not null default 'US',
  lead_source text,
  status text not null default 'new' check (
    status in (
      'new',
      'queued',
      'working',
      'contacted',
      'follow_up_scheduled',
      'meeting_booked',
      'qualified',
      'unqualified',
      'bad_data',
      'do_not_contact',
      'converted',
      'lost'
    )
  ),
  score integer not null default 0 check (score >= 0 and score <= 100),
  assigned_to uuid references public.profiles(id),
  last_contacted_at timestamptz,
  next_follow_up_at timestamptz,
  timezone text,
  notes_summary text,
  is_client boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  rep_id uuid not null references public.profiles(id),
  type text not null check (
    type in (
      'call',
      'text',
      'email',
      'note',
      'status_change',
      'task_created',
      'task_completed',
      'meeting_booked',
      'pipeline_stage_changed',
      'review_flag_created',
      'imported'
    )
  ),
  outcome text,
  channel text,
  note text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  assigned_to uuid not null references public.profiles(id),
  title text not null,
  type text not null check (type in ('call', 'text', 'email', 'meeting_follow_up', 'admin_review')),
  status text not null default 'open' check (status in ('open', 'completed', 'skipped', 'overdue')),
  due_at timestamptz not null,
  completed_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  owner_id uuid not null references public.profiles(id),
  stage text not null default 'interested' check (
    stage in (
      'new_lead',
      'contacted',
      'interested',
      'meeting_booked',
      'meeting_completed',
      'proposal_sent',
      'closed_won',
      'closed_lost',
      'client_onboarding'
    )
  ),
  value numeric(12,2) not null default 0,
  probability integer not null default 0 check (probability >= 0 and probability <= 100),
  expected_close_date date,
  lost_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.meetings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  rep_id uuid not null references public.profiles(id),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'no_show', 'cancelled')),
  calendar_event_id text,
  meeting_url text,
  created_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id),
  business_name text not null,
  primary_contact_name text,
  email text,
  phone text,
  status text not null default 'onboarding' check (status in ('onboarding', 'active', 'paused', 'churned')),
  start_date date,
  created_at timestamptz not null default now()
);

create table public.lead_imports (
  id uuid primary key default gen_random_uuid(),
  uploaded_by uuid not null references public.profiles(id),
  file_name text not null,
  status text not null default 'draft' check (status in ('draft', 'validating', 'ready', 'imported', 'failed')),
  total_rows integer not null default 0,
  valid_rows integer not null default 0,
  duplicate_rows integer not null default 0,
  error_rows integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.lead_import_rows (
  id uuid primary key default gen_random_uuid(),
  import_id uuid not null references public.lead_imports(id) on delete cascade,
  raw_data jsonb not null,
  mapped_data jsonb not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'valid', 'duplicate', 'error', 'imported')),
  error_message text,
  created_lead_id uuid references public.leads(id),
  created_at timestamptz not null default now()
);

create table public.queue_locks (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  rep_id uuid not null references public.profiles(id),
  locked_at timestamptz not null default now(),
  expires_at timestamptz not null,
  unique (lead_id)
);

create table public.review_flags (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  rep_id uuid not null references public.profiles(id),
  reason text not null check (
    reason in (
      'bad_data',
      'hot_lead',
      'angry_contact',
      'needs_manager',
      'pricing_question',
      'do_not_contact_request'
    )
  ),
  status text not null default 'open' check (status in ('open', 'resolved')),
  created_at timestamptz not null default now(),
  resolved_by uuid references public.profiles(id),
  resolved_at timestamptz
);

create table public.team_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id),
  body text not null,
  created_at timestamptz not null default now()
);

create index leads_assigned_to_idx on public.leads(assigned_to);
create index leads_status_idx on public.leads(status);
create index leads_next_follow_up_at_idx on public.leads(next_follow_up_at);
create index leads_score_idx on public.leads(score desc);
create index activities_lead_id_created_at_idx on public.activities(lead_id, created_at desc);
create index tasks_assigned_to_due_at_idx on public.tasks(assigned_to, due_at);
create index opportunities_stage_idx on public.opportunities(stage);
create index queue_locks_expires_at_idx on public.queue_locks(expires_at);

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.activities enable row level security;
alter table public.tasks enable row level security;
alter table public.opportunities enable row level security;
alter table public.meetings enable row level security;
alter table public.clients enable row level security;
alter table public.lead_imports enable row level security;
alter table public.lead_import_rows enable row level security;
alter table public.queue_locks enable row level security;
alter table public.review_flags enable row level security;
alter table public.team_messages enable row level security;

create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create policy "Profiles can read team profiles"
on public.profiles for select
to authenticated
using (true);

create policy "Admins manage profiles"
on public.profiles for all
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "Admins can manage all leads"
on public.leads for all
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "SDRs can read assigned leads"
on public.leads for select
to authenticated
using (assigned_to = auth.uid() or public.current_user_role() = 'admin');

create policy "SDRs can update assigned leads"
on public.leads for update
to authenticated
using (assigned_to = auth.uid())
with check (assigned_to = auth.uid());

create policy "Authenticated users can read activity for visible leads"
on public.activities for select
to authenticated
using (
  public.current_user_role() = 'admin'
  or exists (
    select 1 from public.leads
    where leads.id = activities.lead_id
    and leads.assigned_to = auth.uid()
  )
);

create policy "SDRs can insert their own activities"
on public.activities for insert
to authenticated
with check (rep_id = auth.uid());

create policy "Users manage visible tasks"
on public.tasks for all
to authenticated
using (public.current_user_role() = 'admin' or assigned_to = auth.uid())
with check (public.current_user_role() = 'admin' or assigned_to = auth.uid());

create policy "Admins manage revenue workspace"
on public.opportunities for all
to authenticated
using (public.current_user_role() = 'admin' or owner_id = auth.uid())
with check (public.current_user_role() = 'admin' or owner_id = auth.uid());

create policy "Users manage meetings they own"
on public.meetings for all
to authenticated
using (public.current_user_role() = 'admin' or rep_id = auth.uid())
with check (public.current_user_role() = 'admin' or rep_id = auth.uid());

create policy "Authenticated users read clients"
on public.clients for select
to authenticated
using (true);

create policy "Admins manage clients"
on public.clients for all
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "Admins manage imports"
on public.lead_imports for all
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "Admins manage import rows"
on public.lead_import_rows for all
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "Users manage own queue locks"
on public.queue_locks for all
to authenticated
using (public.current_user_role() = 'admin' or rep_id = auth.uid())
with check (public.current_user_role() = 'admin' or rep_id = auth.uid());

create policy "Users can create review flags"
on public.review_flags for insert
to authenticated
with check (rep_id = auth.uid());

create policy "Users can read relevant review flags"
on public.review_flags for select
to authenticated
using (public.current_user_role() = 'admin' or rep_id = auth.uid());

create policy "Admins can update review flags"
on public.review_flags for update
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "Authenticated users read chat"
on public.team_messages for select
to authenticated
using (true);

create policy "Authenticated users send chat"
on public.team_messages for insert
to authenticated
with check (sender_id = auth.uid());
