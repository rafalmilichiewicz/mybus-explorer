
import { LUBLIN_OFFSET, USER_AGENT } from "../../consts/magic-numbers.ts";
import generateToken from './token.ts';

export default async function generateHeaders(ageHeader: number) {
    return {
        'Age': `${await generateToken(ageHeader) + LUBLIN_OFFSET}`,
        'User-Agent': USER_AGENT,
    };
}
