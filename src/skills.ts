// Skills with no evidence stay off this list. `to` is a project slug or an in-page anchor.
export const skills: { skill: string; evidence: { label: string; to: string }[] }[] = [
  { skill: 'Python', evidence: [{ label: 'Tripwire', to: 'tripwire' }, { label: 'Heart Disease', to: 'heart-disease' }] },
  { skill: 'PostgreSQL', evidence: [{ label: 'Tripwire ingest', to: 'tripwire' }, { label: 'Heart Disease in Docker', to: 'heart-disease' }] },
  { skill: 'scikit-learn / XGBoost', evidence: [{ label: 'Heart Disease model comparison', to: 'heart-disease' }, { label: 'Tripwire credibility model', to: 'tripwire' }] },
  { skill: 'Docker / Docker Compose', evidence: [{ label: 'Tripwire', to: 'tripwire' }, { label: 'Heart Disease', to: 'heart-disease' }] },
  { skill: 'GitHub Actions (CI)', evidence: [{ label: 'Tripwire: 158 tests against Postgres', to: 'tripwire' }] },
  { skill: 'pytest', evidence: [{ label: 'Tripwire', to: 'tripwire' }, { label: 'Heart Disease', to: 'heart-disease' }] },
  { skill: 'SQL, ERD, BPMN, systems analysis', evidence: [{ label: 'Formwork', to: '#experience' }] },
];
