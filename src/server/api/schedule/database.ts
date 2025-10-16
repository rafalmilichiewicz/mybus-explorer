import type { Variables } from '../../types.ts';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

const getDatabaseRoute = createRoute({
    method: 'get',
    path: '/database',
    tags: ['Schedule'],
    summary: 'Get schedule database stream',
    description:
        'Returns a decompressed schedule database as a binary stream. The stream is generated from a gzip-compressed schedule source.',
    responses: {
        200: {
            description: 'Decompressed binary schedule data',
            content: {
                'application/octet-stream': {
                    schema: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
        500: {
            description: 'Failed to decompress or fetch schedule data',
        },
    },
});

const database = new OpenAPIHono<{ Variables: Variables }>();
database.openapi(getDatabaseRoute, async (c) => {
    const api = c.get('api');
    const config = c.get('config');

    try {
        const stream = await api.schedule.getStream();

        if (!stream) {
            return c.text('Failed to get schedule stream', 500);
        }

        const filename = `database_${config.CITY.ID}.sqlite`;
        return c.body(stream, 200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${filename}`,
        });
    } catch (error) {
        console.error('Error streaming schedule:', error);
        return c.text('Internal server error', 500);
    }
});

export { database };
