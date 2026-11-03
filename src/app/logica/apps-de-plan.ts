import { AppWilla } from '../modelos/app-willa';

/** Cruza los uuids de un plan con el catálogo. Respeta el orden del plan y omite
 *  los uuids que no existen en `apps.json` (RF-002-07). */
export function appsDePlan(uuids: string[], apps: AppWilla[]): AppWilla[] {
  const porUuid = new Map(apps.map((a) => [a.uuid, a]));
  return uuids.flatMap((uuid) => {
    const app = porUuid.get(uuid);
    return app ? [app] : [];
  });
}
