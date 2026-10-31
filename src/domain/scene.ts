export type ScenePreset = 'deep-space' | 'nebula' | 'starlight';
export const SCENES: readonly ScenePreset[] = ['deep-space','nebula','starlight'];
export function parseScene(value: unknown): ScenePreset {
  return typeof value === 'string' && SCENES.includes(value as ScenePreset) ? value as ScenePreset : 'deep-space';
}
