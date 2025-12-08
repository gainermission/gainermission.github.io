import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { Plugin } from 'vite';
import type { DayLog, DayLogWithFilename } from '../src/types/MealLog';

const VIRTUAL_MODULE_ID = 'virtual:meal-data';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

export function yamlDataPlugin(options: { dataDir: string }): Plugin {
  const dataDir = path.resolve(options.dataDir);

  return {
    name: 'yaml-data-plugin',

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        // Check if data directory exists
        if (!fs.existsSync(dataDir)) {
          console.warn(`Data directory ${dataDir} does not exist`);
          return `export const mealData = [];`;
        }

        // Read all YAML files from data directory
        const files = fs.readdirSync(dataDir)
          .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
          .sort()
          .reverse(); // Newest first (descending order)

        if (files.length === 0) {
          console.warn(`No YAML files found in ${dataDir}`);
          return `export const mealData = [];`;
        }

        // Parse each file
        const dayLogs: DayLogWithFilename[] = files.map(filename => {
          const content = fs.readFileSync(path.join(dataDir, filename), 'utf-8');
          const data = yaml.load(content) as DayLog;
          return { ...data, filename };
        });

        // Generate module code
        return `export const mealData = ${JSON.stringify(dayLogs, null, 2)};`;
      }
    },

    handleHotUpdate({ file, server }) {
      // If YAML file in data dir changes, invalidate virtual module
      if (file.startsWith(dataDir) && (file.endsWith('.yaml') || file.endsWith('.yml'))) {
        const module = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
        if (module) {
          server.moduleGraph.invalidateModule(module);
          server.ws.send({ type: 'full-reload' });
        }
      }
    }
  };
}
