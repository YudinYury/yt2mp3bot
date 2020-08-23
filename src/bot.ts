import { config } from 'dotenv';
import pTimeout from 'p-timeout';

config();

async function bootstrap() {
    console.log('POSTGRES_HOST =', process.env.POSTGRES_HOST);
    // await databaseConnect();
    if (process.env.DRY_RUN) {
      process.exit(0);
    }
  }
  
  pTimeout(bootstrap(), 60 * 1000, 'App start timeout').catch((e: unknown) => {
    console.error('Something went wrong', e);
    process.exit(1);
  });
  