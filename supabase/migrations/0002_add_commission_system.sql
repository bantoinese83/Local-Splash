-- Add commission system for monetization
-- This migration adds order tracking and commission calculation

-- Create orders table
create table orders (
  id bigserial primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  artist_id uuid references public.profiles(id) on delete cascade not null,
  artwork_id bigint references public.artworks(id) on delete cascade not null,
  total_amount numeric(10, 2) not null check (total_amount >= 0),
  commission_rate numeric(5, 4) not null default 0.1 check (commission_rate >= 0 and commission_rate <= 1),
  commission_amount numeric(10, 2) not null check (commission_amount >= 0),
  artist_payout numeric(10, 2) not null check (artist_payout >= 0),
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  payment_intent_id text, -- Stripe payment intent ID
  shipping_address jsonb, -- Store shipping information
  billing_address jsonb, -- Store billing information
  notes text
);

-- Enable RLS
alter table orders enable row level security;

-- RLS policies for orders
create policy "Users can view their own orders as buyer." on orders
  for select using (auth.uid() = buyer_id);

create policy "Artists can view orders for their artwork." on orders
  for select using (auth.uid() = artist_id);

create policy "Users can create orders." on orders
  for insert with check (auth.uid() = buyer_id);

create policy "Artists can update order status for their artwork." on orders
  for update using (auth.uid() = artist_id);

-- Create function to calculate commission
create or replace function calculate_commission(
  total_amount numeric,
  commission_rate numeric default 0.1
) returns numeric as $$
begin
  return total_amount * commission_rate;
end;
$$ language plpgsql;

-- Create function to calculate artist payout
create or replace function calculate_artist_payout(
  total_amount numeric,
  commission_amount numeric
) returns numeric as $$
begin
  return total_amount - commission_amount;
end;
$$ language plpgsql;

-- Create trigger to automatically calculate commission and payout
create or replace function calculate_order_amounts() returns trigger as $$
begin
  -- Calculate commission amount
  new.commission_amount := calculate_commission(new.total_amount, new.commission_rate);
  
  -- Calculate artist payout
  new.artist_payout := calculate_artist_payout(new.total_amount, new.commission_amount);
  
  return new;
end;
$$ language plpgsql;

create trigger calculate_order_amounts_trigger
  before insert or update on orders
  for each row execute function calculate_order_amounts();

-- Create index for better performance
create index idx_orders_buyer_id on orders(buyer_id);
create index idx_orders_artist_id on orders(artist_id);
create index idx_orders_artwork_id on orders(artwork_id);
create index idx_orders_status on orders(status);
create index idx_orders_created_at on orders(created_at);

-- Add commission settings table for future configuration
create table commission_settings (
  id bigserial primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  default_commission_rate numeric(5, 4) not null default 0.1 check (default_commission_rate >= 0 and default_commission_rate <= 1),
  minimum_commission numeric(10, 2) not null default 0.50 check (minimum_commission >= 0),
  maximum_commission numeric(10, 2) check (maximum_commission is null or maximum_commission >= 0),
  is_active boolean not null default true
);

-- Enable RLS
alter table commission_settings enable row level security;

-- RLS policies for commission settings
create policy "Commission settings are viewable by everyone." on commission_settings
  for select using (true);

-- Insert default commission settings
insert into commission_settings (default_commission_rate, minimum_commission, maximum_commission, is_active)
values (0.1, 0.50, null, true);
