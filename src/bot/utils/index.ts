import fs from 'fs';
import { client } from '../app';
import BaseCommand from './BaseCommand';

export async function importFile (filePath: string): Promise<any> {
    return (await import(filePath))?.default ||
        await import(filePath)
};

export function registerCommands (mainPath: string) {
    try {
        fs.readdirSync(`${mainPath}/commands/`).forEach(async dir => {
            const commands = fs.readdirSync(`${mainPath}/commands/${dir}/`).filter(file => file.endsWith('.ts'));

            for ( const file of commands ) {
                const pull = await importFile(`../commands/${dir}/${file}`) as BaseCommand;
                if ( !pull?.config?.name ) continue;

                if ( pull?.config?.aliases && Array.isArray(pull.config.aliases) ) 
                    pull.config.aliases.forEach(alias => client.aliases.set(alias, pull.config.name));
                client.commands.set(pull.config.name as string, pull);
            }
        })
    } catch (err: any) {
        console.log(err.stack)
    }
};

export async function registerEvents (mainPath: string) {
    try {
        fs.readdirSync(`${mainPath}/events/`)
            .filter(file => file.endsWith(".ts")).forEach(async file => {
                const pull = (await import(`../events/${file}`))?.default;
                if ( !pull?.on ) return;
    
                client.on(pull?.on as any, pull.invoke.bind(pull));
            })
    } catch (err: any) {
        console.log(err.stack)
    }
};