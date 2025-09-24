import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
    // ignoreAttributes: true,
    // parseTagValue: true,
    // parseAttributeValue: false,
    attributeNamePrefix: "",
    ignoreAttributes: ["?xml"],
    ignoreDeclaration: true,
});

export default function parseXml(data: string | BufferSource) {
    return parser.parse(data);
}
