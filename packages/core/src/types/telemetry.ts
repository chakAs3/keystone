import { DatabaseProvider } from './core';

export type Status = false | { lastSentDate?: string; informedAt: string };

export type Configuration = {
  telemetry:
    | {
        device: Status;
        projects: {
          default: Status;
          [projectPath: string]: Status;
        };
      }
    | false
    | undefined;
};

export type Device = {
  previous: string | null; // new Date().toISOString().slice(0, 10)
  os: string; // `linux` | `darwin` | `windows` | ... // os.platform()
  node: string; // `14` | ... | `18` // process.version.split('.').shift().slice(1)
};
export type PackageName =
  | '@keystone-6/core'
  | '@keystone-6/auth'
  | '@keystone-6/fields-document'
  | '@keystone-6/cloudinary'
  | '@keystone-6/session-store-redis'
  | '@opensaas/keystone-nextjs-auth';

export type Project = {
  previous: string | null; // new Date().toISOString().slice(0, 10)
  // omitted uuid for <BII
  // omitted anything GraphQL related <BII

  // filtered to packages with the prefixes
  // - `@keystone-6`
  // - `@k6-contrib`
  // - `@opensaas`
  // - ...
  versions: Partial<Record<PackageName, string>>;
  lists: number;
  database: DatabaseProvider;
  // uses a new `field.__ksTelemetryFieldTypeName` for the key, defaults to `unknown`
  fields: {
    [key: string]: number;
  };
};

// [also] when running `keystone dev`
export type ShareDeviceEvent = {
  reportedAt: Date & // Date.now(), added by server
    Device;
};

// [also] when running `keystone dev`
export type ShareProjectEvent = {
  reportedAt: Date & // Date.now(), added by server
    Project;
};