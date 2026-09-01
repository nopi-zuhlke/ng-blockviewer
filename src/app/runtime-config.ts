import { InjectionToken } from '@angular/core';

export interface RuntimeConfig {
  backendBaseUrl: string;
}

const runtimeConfig: RuntimeConfig = {
  backendBaseUrl: 'http://localhost:3000',
};

export const RUNTIME_CONFIG = new InjectionToken<RuntimeConfig>('RUNTIME_CONFIG', {
  factory: () => runtimeConfig,
});

export function loadRuntimeConfig(): Promise<void> {
  return fetch('/config.json')
    .then((response) => (response.ok ? response.json() : {}))
    .then((config: Partial<RuntimeConfig>) => {
      Object.assign(runtimeConfig, config);
    })
    .catch(() => {
      // keep defaults
    });
}
