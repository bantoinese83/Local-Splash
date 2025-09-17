-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  is_artist boolean default false,
  artist_bio text,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up.
create function public.handle_new_user() returns trigger as $$
declare
  random_username text;
begin
  -- Generate a random username until a unique one is found
  loop
    random_username := 'user' || floor(random() * 1000000);
    exit when not exists (select 1 from public.profiles where username = random_username);
  end loop;

  insert into public.profiles (id, username, full_name, avatar_url)
  values (new.id, random_username, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name, public) 
  values ('avatars', 'avatars', true);

create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update their own avatar." on storage.objects
  for update using ( auth.uid() = owner ) with check (bucket_id = 'avatars');

-- Artwork tables
create table categories (
  id bigserial primary key,
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table categories enable row level security;
create policy "Categories are viewable by everyone." on categories for select using (true);

create table artworks (
  id bigserial primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  image_url text not null,
  artist_id uuid references public.profiles(id) on delete cascade not null,
  category_id bigint references public.categories(id) on delete set null,
  type text not null default 'original', -- 'original' or 'print'
  dimensions text -- e.g., '12x16 inches'
);

alter table artworks enable row level security;
create policy "Artworks are viewable by everyone." on artworks for select using (true);
create policy "Artists can create their own artworks." on artworks for insert with check (auth.uid() = artist_id);
create policy "Artists can update their own artworks." on artworks for update using (auth.uid() = artist_id);
create policy "Artists can delete their own artworks." on artworks for delete using (auth.uid() = artist_id);

-- Storage for artwork images
insert into storage.buckets (id, name, public)
  values ('artworks', 'artworks', true);

create policy "Artwork images are publicly accessible." on storage.objects
  for select using (bucket_id = 'artworks');

create policy "Artists can upload artwork images." on storage.objects
  for insert with check (bucket_id = 'artworks' AND auth.role() = 'authenticated');

-- Example Categories (optional)
insert into categories (name) values ('Painting'), ('Photography'), ('Sculpture'), ('Digital Art'), ('Print');
