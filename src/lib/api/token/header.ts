import { CONFIG } from '../../consts/config.ts';
import generateToken from './token.ts';

export async function generateHeaders(ageHeader: number) {
    return {
        'Age': `${(await generateToken(ageHeader)) + CONFIG.CITY.OFFSET}`,
        'User-Agent': CONFIG.API.USER_AGENT,
    };
}
