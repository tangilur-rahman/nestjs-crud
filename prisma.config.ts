import dotenv from 'dotenv';
import path from 'node:path';

// load .env in project root so env() can read it during prisma CLI commands
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
