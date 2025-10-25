import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(): Promise<void> {
    try {
      await (this.$connect as unknown as () => Promise<void>)();
      console.log('Prisma connected to the database');
    } catch (error) {
      console.error('Error connecting Prisma to the database:', error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await (this.$disconnect as unknown as () => Promise<void>)();
    console.log('Prisma disconnected');
  }
}
