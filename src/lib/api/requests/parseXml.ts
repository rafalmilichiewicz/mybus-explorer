import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
    attributeNamePrefix: '',
    ignoreAttributes: ['?xml'],
    ignoreDeclaration: true,
});

export default function parseXml(data: string) {
    console.log(data);
    return parser.parse(data);
}
