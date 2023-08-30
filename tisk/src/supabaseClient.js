import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qfychehddqnqcyikupzm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmeWNoZWhkZHFucWN5aWt1cHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNzE1MTksImV4cCI6MjAwNzg0NzUxOX0.pK4d9UWKDHvxawN0sdmz3U10VuFW7rVuSRTFAK_I0hA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
