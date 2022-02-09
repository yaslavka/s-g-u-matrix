import { Hub } from '@sentry/hub';
import { EventProcessor, Integration } from '@sentry/types';
import { fill, isThenable, loadModule, logger } from '@sentry/utils';

interface PgClient {
  prototype: {
    query: () => void | Promise<unknown>;
  };
}

/** Tracing integration for node-postgres package */
export class Postgres implements Integration {
  /**
   * @inheritDoc
   */
  public static id: string = 'Postgres';

  /**
   * @inheritDoc
   */
  public name: string = Postgres.id;

  /**
   * @inheritDoc
   */
  public setupOnce(_: (callback: EventProcessor) => void, getCurrentHub: () => Hub): void {
    const pkg = loadModule<{ Client: PgClient }>('pg');

    if (!pkg) {
      logger.error('Postgres Integration was unable to require `pg` package.');
      return;
    }

    /**
     * function (query, callback) => void
     * function (query, params, callback) => void
     * function (query) => Promise
     * function (query, params) => Promise
     * function (pg.Cursor) => pg.Cursor
     */
    fill(pkg.Client.prototype, 'query', function(orig: () => void | Promise<unknown>) {
      return function(this: unknown, config: unknown, values: unknown, callback: unknown) {
        const scope = getCurrentHub().getScope();
        const parentSpan = scope?.getSpan();
        const span = parentSpan?.startChild({
          description: typeof config === 'string' ? config : (config as { text: string }).text,
          op: `db`,
        });

        if (typeof callback === 'function') {
          return orig.call(this, config, values, function(err: Error, result: unknown) {
            span?.finish();
            callback(err, result);
          });
        }

        if (typeof values === 'function') {
          return orig.call(this, config, function(err: Error, result: unknown) {
            span?.finish();
            values(err, result);
          });
        }

        const rv = typeof values !== 'undefined' ? orig.call(this, config, values) : orig.call(this, config);

        if (isThenable(rv)) {
          return (rv as Promise<unknown>).then((res: unknown) => {
            span?.finish();
            return res;
          });
        }

        span?.finish();
        return rv;
      };
    });
  }
}
