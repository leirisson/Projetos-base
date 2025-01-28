/*
  # Add insert policy for profiles table

  1. Changes
    - Add policy to allow users to insert their own profile during registration
  
  2. Security
    - Users can only insert a profile for themselves
    - The profile ID must match their auth.uid
*/

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Also update the existing select policy to allow viewing own profile
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);