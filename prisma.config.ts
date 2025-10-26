import 'dotenv/config';
import path from 'node:path';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: path.join(process.cwd(), 'prisma', 'schema'),
  migrations: {
    path: path.join(process.cwd(), 'prisma', 'migrations'),
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
