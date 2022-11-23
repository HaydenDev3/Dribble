import fs from 'fs';
import { client } from '../app';

export function registerCommands (mainPath: string) {
    try {
        fs.readdirSync(`${mainPath}/commands/`).forEach(async dir => {
            const commands = fs.readdirSync(`${mainPath}/commands/${dir}/`).filter(file => file.endsWith('.ts'));

            for ( const file of commands ) {
                const pull = (await import(`../commands/${dir}/${file}`))?.default;
                if ( !pull?.config?.name ) return;

                client.commands.set(pull.config.name as string, pull);
            }
        })
    } catch (err: any) {
        console.log(err.stack)
    }
};

export async function registerEvents (mainPath: string) {
    try {
        const files = fs.readdirSync(`${mainPath}/events/`).filter(file => file.endsWith(".ts"));

        for ( const file of files ) {
            const pull = (await import(`../events/${file}`))?.default;
            if ( !pull?.on ) return;

            client.on(pull?.on as any, pull.invoke.bind(pull));
        }
    } catch (err: any) {
        console.log(err.stack)
    }
};