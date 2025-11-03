// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import deno from '@deno/astro-adapter';
import mermaid from 'astro-mermaid';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    site: 'https://rafalmilichiewicz.github.io/',
    base: '/mybus-explorer',
    integrations: [
        mermaid({
            theme: 'forest',
            autoTheme: true,
        }),
        starlight({
            plugins: [
                starlightOpenAPI([
                    {
                        base: 'api',
                        schema: './src/schemas/docs.json',
                    },
                ]),
            ],
            title: 'MyBus Explorer Docs',
            social: [
                {
                    icon: 'seti:html',
                    label: 'Author',
                    href: 'https://rmilichiewicz.com',
                },
                {
                    icon: 'github',
                    label: 'GitHub',
                    href: 'https://github.com/rafalmilichiewicz/mybus-explorer',
                },
            ],
            sidebar: [
                {
                    label: 'Aim & Scope',
                    link: 'aim/',
                },
                {
                    label: 'MyBus Mobile App',
                    items: [
                        'mybus',
                        'mybus/city-data',
                        { label: 'Endpoints', autogenerate: { directory: 'mybus/endpoints' } },
                    ],
                },
                {
                    label: 'Database',
                    autogenerate: { directory: 'database' },
                },
                {
                    label: 'Common Types',
                    autogenerate: { directory: 'common' },
                },
                {
                    label: 'Application',
                    autogenerate: { directory: 'app' },
                },
                ...openAPISidebarGroups,
                {
                    label: 'Programming War Crimes',
                    link: 'crimes',
                },
                {
                    label: 'Glossary',
                    link: 'glossary',
                },
            ],
        }),
    ],
    adapter: deno({}),
});
