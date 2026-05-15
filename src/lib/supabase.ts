import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dkerqrgfamevnsdplkla.supabase.co';
const supabaseKey = 'sb_publishable_yOL55z98MPPn5rnxOiRgSg__hyQG_kj';

export const supabase = createClient(supabaseUrl, supabaseKey);
