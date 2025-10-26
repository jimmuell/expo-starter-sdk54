-- Storage Setup for Avatars
-- This migration sets up storage buckets and policies for user avatars

-- Create avatars bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload an avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- Policy: Avatar images are publicly accessible
CREATE POLICY "Avatar images are publicly accessible" 
  ON storage.objects
  FOR SELECT 
  USING (bucket_id = 'avatars');

-- Policy: Users can upload their own avatar
CREATE POLICY "Users can upload their own avatar" 
  ON storage.objects
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = (SELECT auth.uid()::text)
  );

-- Policy: Users can update their own avatar
CREATE POLICY "Users can update their own avatar" 
  ON storage.objects
  FOR UPDATE 
  USING (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = (SELECT auth.uid()::text)
  );

-- Policy: Users can delete their own avatar
CREATE POLICY "Users can delete their own avatar" 
  ON storage.objects
  FOR DELETE 
  USING (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = (SELECT auth.uid()::text)
  );

