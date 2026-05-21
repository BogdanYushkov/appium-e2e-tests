import { logger } from '../utils/logger';
import { envConfig } from '../config/envConfig';

export class RetryHelper {
    static async retry<T>(
        fn: () => Promise<T>,
        options: { attempts?: number; delay?: number; name?: string } = {}
    ): Promise<T> {
        const { attempts = envConfig.retry.maxAttempts, delay = envConfig.retry.delay, name = 'action' } = options;

        for (let attempt = 1; attempt <= attempts; attempt++) {
            try {
                return await fn();
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                logger.warn(`${name} - attempt ${attempt}/${attempts} failed: ${message}`);
                if (attempt === attempts) {
                    throw error;
                }
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        throw new Error(`${name} failed after ${attempts} attempts`);
    }
}
