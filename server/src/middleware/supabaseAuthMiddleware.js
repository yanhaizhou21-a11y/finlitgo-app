import { getSupabaseClient } from '../utils/supabaseClient.js';

/**
 * Middleware that verifies the request has a valid Supabase auth token.
 * Attaches `req.supabaseUser` on success.
 */
export function requireSupabaseAuth(req, res, next) {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const supabase = getSupabaseClient(req);
    supabase.auth.getUser().then(({ data, error }) => {
        if (error || !data?.user) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        req.supabaseUser = data.user;
        return next();
    }).catch(() => {
        return res.status(500).json({ error: 'Auth verification failed' });
    });
}

/**
 * Middleware that checks if the authenticated user is an admin.
 * Must be used after requireSupabaseAuth.
 */
export function requireAdmin(req, res, next) {
    const supabase = getSupabaseClient(req);
    supabase
        .from('users')
        .select('role')
        .eq('id', req.supabaseUser?.id)
        .maybeSingle()
        .then(({ data }) => {
            if (data?.role !== 'admin') {
                return res.status(403).json({ error: 'Admin access required' });
            }
            return next();
        })
        .catch(() => {
            return res.status(500).json({ error: 'Role verification failed' });
        });
}
