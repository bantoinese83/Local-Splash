-- Local Splash Database Seed Script
-- This script populates the database with sample data for testing and demonstration

-- Insert sample profiles (these would normally be created through auth, but we'll insert them directly for seeding)
INSERT INTO profiles (id, username, full_name, avatar_url, website, is_artist, artist_bio, is_admin, updated_at) VALUES
-- Main user (b.antoine.se@gmail)
('550e8400-e29b-41d4-a716-446655440000', 'bantoine', 'Antoine Bernard', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'https://antoine-art.com', true, 'Contemporary artist specializing in vibrant abstract paintings that explore the intersection of technology and nature. Based in Paris, I create bold, energetic works that capture the essence of modern urban life.', true, NOW()),

-- Additional artists
('550e8400-e29b-41d4-a716-446655440001', 'sarahchen', 'Sarah Chen', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 'https://sarahchen.art', true, 'Digital artist and illustrator creating whimsical characters and dreamy landscapes. My work combines traditional techniques with modern digital tools to create unique visual stories.', false, NOW()),

('550e8400-e29b-41d4-a716-446655440002', 'marcusrodriguez', 'Marcus Rodriguez', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'https://marcus-sculptures.com', true, 'Sculptor working primarily with reclaimed materials to create thought-provoking installations. My work addresses environmental themes and the relationship between humans and nature.', false, NOW()),

('550e8400-e29b-41d4-a716-446655440003', 'emmathompson', 'Emma Thompson', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'https://emma-photography.com', true, 'Fine art photographer capturing the beauty of everyday moments. I specialize in street photography and portraiture, finding extraordinary stories in ordinary places.', false, NOW()),

('550e8400-e29b-41d4-a716-446655440004', 'alexkim', 'Alex Kim', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 'https://alexkim.art', true, 'Mixed media artist exploring themes of identity and belonging. My work combines painting, collage, and digital elements to create layered narratives about cultural heritage.', false, NOW()),

-- Regular users (non-artists)
('550e8400-e29b-41d4-a716-446655440005', 'artlover123', 'Jessica Martinez', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', 'https://jessica-martinez.com', false, null, false, NOW()),

('550e8400-e29b-41d4-a716-446655440006', 'collector_pro', 'David Wilson', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face', 'https://david-wilson.com', false, null, false, NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample artworks
INSERT INTO artworks (id, title, description, price, image_url, category_id, artist_id, type, dimensions, created_at) VALUES
-- Antoine's artworks
(1, 'Digital Dreams', 'A vibrant abstract painting exploring the intersection of technology and human emotion. Bold colors and dynamic shapes create a sense of movement and energy.', 450.00, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Digital Art' LIMIT 1), '550e8400-e29b-41d4-a716-446655440000', 'Original', '24" x 36"', NOW()),

(2, 'Urban Symphony', 'Contemporary mixed media piece capturing the rhythm and energy of city life. Layers of paint and digital elements create depth and texture.', 320.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Mixed Media' LIMIT 1), '550e8400-e29b-41d4-a716-446655440000', 'Original', '18" x 24"', NOW()),

(3, 'Neon Nights', 'Bold, energetic painting inspired by the vibrant nightlife of Paris. Electric blues and yellows create a pop art aesthetic that captures the city''s energy.', 280.00, 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Painting' LIMIT 1), '550e8400-e29b-41d4-a716-446655440000', 'Original', '20" x 20"', NOW()),

(4, 'Pop Culture Explosion', 'Vibrant pop art piece celebrating contemporary culture with bold colors and dynamic composition. A modern take on classic pop art aesthetics.', 380.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Painting' LIMIT 1), '550e8400-e29b-41d4-a716-446655440000', 'Original', '30" x 40"', NOW()),

-- Sarah's artworks
(5, 'Whimsical Forest', 'Digital illustration featuring magical creatures in an enchanted forest. Soft pastels and dreamy atmosphere create a sense of wonder and imagination.', 180.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Digital Art' LIMIT 1), '550e8400-e29b-41d4-a716-446655440001', 'Print', '12" x 16"', NOW()),

(6, 'Dreamy Landscapes', 'Series of digital paintings exploring surreal landscapes where reality meets fantasy. Each piece tells a story of adventure and discovery.', 220.00, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Digital Art' LIMIT 1), '550e8400-e29b-41d4-a716-446655440001', 'Print', '16" x 20"', NOW()),

(7, 'Fantasy Portraits', 'Digital portrait series featuring characters from imaginary worlds. Each portrait tells a unique story through expressive details and vibrant colors.', 160.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Digital Art' LIMIT 1), '550e8400-e29b-41d4-a716-446655440001', 'Print', '10" x 12"', NOW()),

-- Marcus's artworks
(8, 'Reclaimed Beauty', 'Sculpture created from reclaimed metal and wood, addressing themes of environmental consciousness and renewal. The piece represents the cycle of life and regeneration.', 650.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Sculpture' LIMIT 1), '550e8400-e29b-41d4-a716-446655440002', 'Original', '36" x 24" x 18"', NOW()),

(9, 'Nature''s Voice', 'Large-scale installation piece made from found objects and natural materials. The work speaks to the relationship between humans and the environment.', 850.00, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Sculpture' LIMIT 1), '550e8400-e29b-41d4-a716-446655440002', 'Original', '48" x 36" x 24"', NOW()),

(10, 'Urban Fragments', 'Abstract sculpture made from recycled materials found in urban environments. The piece explores themes of waste, renewal, and transformation.', 420.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Sculpture' LIMIT 1), '550e8400-e29b-41d4-a716-446655440002', 'Original', '24" x 18" x 12"', NOW()),

-- Emma's artworks
(11, 'Street Stories', 'Fine art photography series capturing candid moments of urban life. Each photograph tells a story of human connection and everyday beauty.', 120.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Photography' LIMIT 1), '550e8400-e29b-41d4-a716-446655440003', 'Print', '11" x 14"', NOW()),

(12, 'Portrait Series', 'Intimate portrait photography exploring themes of identity and self-expression. Each subject reveals their unique story through their gaze and posture.', 150.00, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Photography' LIMIT 1), '550e8400-e29b-41d4-a716-446655440003', 'Print', '16" x 20"', NOW()),

(13, 'Urban Landscapes', 'Photography series capturing the beauty and complexity of urban environments. Each image reveals hidden stories within the cityscape.', 140.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Photography' LIMIT 1), '550e8400-e29b-41d4-a716-446655440003', 'Print', '12" x 18"', NOW()),

-- Alex's artworks
(14, 'Cultural Mosaic', 'Mixed media collage exploring themes of cultural identity and belonging. Layers of traditional and contemporary elements create a rich visual narrative.', 290.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Mixed Media' LIMIT 1), '550e8400-e29b-41d4-a716-446655440004', 'Original', '22" x 28"', NOW()),

(15, 'Heritage Stories', 'Painting series that combines traditional techniques with modern themes. Each piece explores the artist''s cultural heritage and personal journey.', 340.00, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Painting' LIMIT 1), '550e8400-e29b-41d4-a716-446655440004', 'Original', '24" x 30"', NOW()),

(16, 'Digital Identity', 'Contemporary digital art piece exploring themes of online identity and virtual reality. Bold colors and geometric shapes create a futuristic aesthetic.', 200.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop', (SELECT id FROM categories WHERE name = 'Digital Art' LIMIT 1), '550e8400-e29b-41d4-a716-446655440004', 'Print', '18" x 24"', NOW())
ON CONFLICT (id) DO NOTHING;

-- Update blog posts to use our sample profiles
UPDATE blog_posts 
SET author_id = '550e8400-e29b-41d4-a716-446655440000'
WHERE author_id IS NULL;

-- Create additional blog posts
INSERT INTO blog_posts (title, excerpt, content, category_id, author_id, status, published_at) VALUES
(
  'Artist Spotlight: Sarah Chen - Digital Dreams and Whimsical Worlds',
  'Meet Sarah Chen, a digital artist whose whimsical illustrations are capturing hearts and inspiring imaginations across the globe.',
  'Sarah Chen''s journey into digital art began with a simple drawing tablet and a dream to create worlds where anything is possible. Her work, characterized by soft pastels, dreamy atmospheres, and magical creatures, has quickly gained recognition in the digital art community.

**Early Beginnings**
Sarah discovered her passion for art during her studies in graphic design. What started as technical exercises quickly evolved into a personal artistic language that combines traditional illustration techniques with modern digital tools.

**Artistic Process**
Sarah''s creative process is deeply intuitive. She begins each piece with loose sketches, allowing her imagination to guide the composition. Her use of soft, ethereal colors creates a sense of wonder and magic that draws viewers into her fantastical worlds.

**Inspiration and Themes**
Her work explores themes of:
- Childhood wonder and imagination
- The connection between humans and nature
- Dreams and the subconscious
- Cultural diversity and inclusion

**Recent Achievements**
- Featured in Digital Art Magazine
- Solo exhibition at the Contemporary Art Gallery
- Commission work for children''s book illustrations
- Growing following on social media platforms

Sarah''s art reminds us that creativity knows no bounds and that sometimes the most powerful stories are told through the simplest, most beautiful images.',
  (SELECT id FROM blog_categories WHERE slug = 'artist-spotlights'),
  '550e8400-e29b-41d4-a716-446655440000',
  'published',
  NOW() - INTERVAL '4 days'
),
(
  'The Future of Art: Technology Meets Tradition',
  'Exploring how emerging technologies are reshaping the art world while preserving traditional techniques and values.',
  'The art world is experiencing a digital revolution, but this doesn''t mean the end of traditional techniques. Instead, we''re seeing a beautiful fusion of old and new, where technology enhances rather than replaces the human touch in art creation.

**Digital Tools and Traditional Techniques**
Modern artists are finding innovative ways to combine:
- Traditional painting with digital enhancement
- Sculpture with 3D printing technology
- Photography with augmented reality
- Drawing with AI-assisted creation tools

**New Opportunities for Artists**
Technology has opened up new possibilities:
- Global reach through online platforms
- New revenue streams through NFTs and digital art
- Collaborative projects across continents
- Interactive and immersive art experiences

**Preserving Traditional Values**
Despite technological advances, core artistic values remain:
- The importance of human creativity and emotion
- The value of physical art objects
- The need for authentic artistic expression
- The role of art in human connection

**Looking Ahead**
The future of art lies in the balance between innovation and tradition. Artists who embrace new tools while maintaining their authentic voice will thrive in this evolving landscape.

Local Splash is committed to supporting artists in this journey, providing a platform that celebrates both traditional and digital art forms.',
  (SELECT id FROM blog_categories WHERE slug = 'art-news'),
  '550e8400-e29b-41d4-a716-446655440000',
  'published',
  NOW() - INTERVAL '5 days'
)
ON CONFLICT (slug) DO NOTHING;

-- Create additional blog comments
INSERT INTO blog_comments (post_id, author_id, content, status) VALUES
(
  (SELECT id FROM blog_posts WHERE title LIKE '%Sarah Chen%' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440000',
  'Sarah''s work is absolutely beautiful! I''m inspired by her creative process.',
  'approved'
),
(
  (SELECT id FROM blog_posts WHERE title LIKE '%Future of Art%' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440000',
  'Technology is definitely changing the art world, but I agree that traditional values are still important.',
  'approved'
),
(
  (SELECT id FROM blog_posts WHERE title LIKE '%Welcome to Local Splash%' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440000',
  'This is exactly what the art community needed! I''m excited to be part of this platform.',
  'approved'
),
(
  (SELECT id FROM blog_posts WHERE title LIKE '%Art of Pricing%' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440000',
  'Great advice! I''ve been struggling with pricing my work. This article really helped me understand the market better.',
  'approved'
),
(
  (SELECT id FROM blog_posts WHERE title LIKE '%Artist Brand%' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440000',
  'Building a brand has been challenging, but these tips are really practical. Thanks for sharing!',
  'approved'
),
(
  (SELECT id FROM blog_posts WHERE title LIKE '%Local Art Scenes%' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440000',
  'I love how this platform connects local artists. It''s creating such a vibrant community!',
  'approved'
)
ON CONFLICT DO NOTHING;
