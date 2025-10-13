import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
    // TODO 
    // ignoreAttributes: true,
    // parseTagValue: true,
    // parseAttributeValue: false,
    attributeNamePrefix: "",
    ignoreAttributes: ["?xml"],
    ignoreDeclaration: true,
});

export default function parseXml(data: string) {
    return parser.parse(data);
}
