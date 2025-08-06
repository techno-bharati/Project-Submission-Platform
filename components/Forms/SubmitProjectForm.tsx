import { submitProjectSchema } from "@/utils/validator/student.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FormTypeSubmitProject = z.infer<typeof submitProjectSchema>;

export const useFormSubmitProject = () =>
  useForm<FormTypeSubmitProject>({
    resolver: zodResolver(submitProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      domain: [],
      githubUrl: "",
      liveLink: "",
      projectThumbnail: "",
      technologies: []
    }
  });
