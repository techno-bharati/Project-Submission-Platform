import { ReactNode } from "react";

export type BaseComponent = {
  children?: ReactNode;
  className?: string;
};

export enum ProjectDomains {
  WebDevelopment = "Web Development",
  MobileAppDevelopment = "Mobile App Development",
  MachineLearning = "Machine Learning",
  ArtificialIntelligence = "Artificial Intelligence",
  DataScience = "Data Science",
  CyberSecurity = "Cyber Security",
  InternetOfThings = "Internet Of Things",
  Blockchain = "Blockchain",
  Robotics = "Robotics",
  EmbeddedSystems = "Embedded Systems",
  ComputerVision = "Computer Vision",
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
