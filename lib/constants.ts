import { Option } from "@/components/ui/multiple-select";
import { ProjectDomains, TechnologiesEnum } from "./types";

export const ProjectDomainOptions: Option[] = [
  { label: "Web Development", value: ProjectDomains.WebDevelopment },
  {
    label: "Mobile App Development",
    value: ProjectDomains.MobileAppDevelopment
  },
  { label: "Machine Learning", value: ProjectDomains.MachineLearning },
  {
    label: "Artificial Intelligence",
    value: ProjectDomains.ArtificialIntelligence
  },
  { label: "Data Science", value: ProjectDomains.DataScience },
  { label: "Cyber Security", value: ProjectDomains.CyberSecurity },
  { label: "Internet of Things", value: ProjectDomains.InternetOfThings },
  { label: "Blockchain", value: ProjectDomains.Blockchain },
  { label: "Robotics", value: ProjectDomains.Robotics },
  { label: "Embedded Systems", value: ProjectDomains.EmbeddedSystems },
  { label: "Computer Vision", value: ProjectDomains.ComputerVision },
  { label: "FinTech", value: ProjectDomains.FinTech },
  { label: "EdTech", value: ProjectDomains.EdTech },
  { label: "HealthTech", value: ProjectDomains.HealthTech }
];

export const Technologies: Option[] = [
  { label: "React", value: TechnologiesEnum.React },
  { label: "Next.js", value: TechnologiesEnum.NextJS },
  { label: "TypeScript", value: TechnologiesEnum.TypeScript },
  { label: "JavaScript", value: TechnologiesEnum.JavaScript },
  { label: "Node.js", value: TechnologiesEnum.NodeJS },
  { label: "Express.js", value: TechnologiesEnum.Express },
  { label: "Python", value: TechnologiesEnum.Python },
  { label: "Flask", value: TechnologiesEnum.Flask },
  { label: "Django", value: TechnologiesEnum.Django },
  { label: "Rust", value: TechnologiesEnum.Rust },
  { label: "Go", value: TechnologiesEnum.Go },
  { label: "Java", value: TechnologiesEnum.Java },
  { label: "Spring Boot", value: TechnologiesEnum.SpringBoot },
  { label: "PostgreSQL", value: TechnologiesEnum.PostgreSQL },
  { label: "MongoDB", value: TechnologiesEnum.MongoDB },
  { label: "Redis", value: TechnologiesEnum.Redis },
  { label: "Docker", value: TechnologiesEnum.Docker },
  { label: "Kubernetes", value: TechnologiesEnum.Kubernetes },
  { label: "GraphQL", value: TechnologiesEnum.GraphQL },
  { label: "Tailwind CSS", value: TechnologiesEnum.TailwindCSS }
];
