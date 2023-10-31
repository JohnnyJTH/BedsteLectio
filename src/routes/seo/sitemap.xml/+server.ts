import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    return await sitemap.response({
        origin: 'https://bedstelectio.tech',
        excludePatterns: ["/modul", "/opgave", "/spørgeskema"]
    });
};