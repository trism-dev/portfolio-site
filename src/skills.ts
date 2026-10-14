// Skills with no evidence stay off this list. `to` is a project slug or an in-page anchor.
export const skills: { skill: string; evidence: { label: string; to: string }[] }[] = [
  { skill: 'Python', evidence: [{ label: 'Heart Disease pipeline', to: 'heart-disease' }] },
  { skill: 'PostgreSQL', evidence: [{ label: 'Heart Disease ingest and training records', to: 'heart-disease' }] },
  { skill: 'scikit-learn / XGBoost', evidence: [{ label: 'Heart Disease model comparison', to: 'heart-disease' }] },
  { skill: 'Docker / Docker Compose', evidence: [{ label: 'Heart Disease local environment', to: 'heart-disease' }] },
  { skill: 'pytest', evidence: [{ label: 'Heart Disease pipeline tests', to: 'heart-disease' }] },
  { skill: 'SQL, ERD, BPMN, systems analysis', evidence: [{ label: 'Formwork', to: '#experience' }] },
];
