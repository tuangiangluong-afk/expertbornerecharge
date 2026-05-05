
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

async function testSync() {
    const SOLOCA_URL = process.env.SOLOCA_SUPABASE_URL;
    const SOLOCA_KEY = process.env.SOLOCA_SERVICE_ROLE_KEY || process.env.SOLOCA_ANON_KEY;
    const SOLOCA_WORKSPACE_ID = process.env.SOLOCA_WORKSPACE_ID || '64502331-945e-4f34-90f4-7cb05a4963df';

    if (!SOLOCA_URL || !SOLOCA_KEY) {
        console.error('SOLOCA configuration missing in .env.local');
        process.exit(1);
    }

    console.log('Connecting to Soloca:', SOLOCA_URL);
    const solocaDb = createClient(SOLOCA_URL, SOLOCA_KEY);

    const { data, error } = await solocaDb
        .from('authority_articles')
        .select('id, title, status')
        .eq('workspace_id', SOLOCA_WORKSPACE_ID)
        .eq('status', 'completed');

    if (error) {
        console.error('Fetch error:', error);
    } else {
        console.log('Completed articles found:', data.length);
        data.forEach(a => console.log(`- [${a.id}] ${a.title}`));
    }
}

testSync();
