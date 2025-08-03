import { ReactNode } from "react";

export type BaseComponent = {
  children?: ReactNode;
  className?: string;
};

export enum ProjectDomains {
  WebDevelopment = "WebDevelopment",
  MobileAppDevelopment = "MobileAppDevelopment",
  MachineLearning = "MachineLearning",
  ArtificialIntelligence = "ArtificialIntelligence",
  DataScience = "DataScience",
  CyberSecurity = "CyberSecurity",
  InternetOfThings = "InternetOfThings",
  Blockchain = "Blockchain",
  Robotics = "Robotics",
  EmbeddedSystems = "EmbeddedSystems",
  ComputerVision = "ComputerVision",
  FinTech = "FinTech",
  EdTech = "EdTech",
  HealthTech = "HealthTech",
  Others = "Others"
}

export enum TechnologiesEnum {
  React = "react",
  NextJS = "nextjs",
  TypeScript = "typescript",
  JavaScript = "javascript",
  NodeJS = "nodejs",
  Express = "express",
  Python = "python",
  Flask = "flask",
  Django = "django",
  Rust = "rust",
  Go = "go",
  Java = "java",
  SpringBoot = "springboot",
  PostgreSQL = "postgresql",
  MongoDB = "mongodb",
  Redis = "redis",
  Docker = "docker",
  Kubernetes = "kubernetes",
  GraphQL = "graphql",
  TailwindCSS = "tailwind"
}
