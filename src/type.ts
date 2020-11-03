export interface Scaffold {
  repoUrl: string;
  name: string;
}

export interface FFConfig{
  scaffolds: Scaffold[]
}