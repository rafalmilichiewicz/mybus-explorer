import { z } from '@hono/zod-openapi';
import { PositionSchema, TransportModeSchema } from '../common.ts';

export const StopSchema = z.object({
    idSip: z.number().openapi({ example: 1 }),
    idZtm: z.number().openapi({ example: 1001 }),
    streetId: z.number().openapi({ example: 1 }),
    streetName: z.string().openapi({ example: 'Lipowa' }),
    order: z.number().openapi({ example: 736 }),
    description: z.string().openapi({ example: 'OGRÓD SASKI 01' }),
    groupName: z.string().openapi({ example: 'OGRÓD SASKI' }),
    groupNumber: z.string().openapi({ example: '01' }),
    position: PositionSchema,
    routes: z.object({
        bus: z.array(z.string()).openapi({
            example: ['4', '8', '13', '15', '20', '32', '40', '44', '74', '302', '950', 'N2', 'N3'],
        }),
        tram: z.array(z.string()).openapi({ example: [] }),
        trolleybus: z.array(z.string()).openapi({ example: ['151', '155', '158'] }),
    }),
    destinations: z.array(z.string()).openapi({
        example: [
            'OS.PORĘBA',
            'ŻEGLARSKA',
            'DĄBROWA',
            'ABRAMOWICE',
            'PANCERNIAKÓW',
            'FELIN',
            'HERBERTA',
            'OS.WIDOK',
            'LIPNIAK',
            'DWORZEC LUBLIN',
            'ZEMBORZYCE GÓRNE',
            'KRĘŻNICA JARA',
            'DWORZEC ŚWIDNIK MIASTO',
            'RONDO PRZEMYSŁOWCÓW',
        ],
    }),
    transportMode: TransportModeSchema,
    _post: z.unknown().optional(),
    _tabType: z.unknown().optional(),
});
