"use client";

import {
  FormTypeSubmitProject,
  useFormSubmitProject
} from "@/components/Forms/SubmitProjectForm";
import { Title } from "@/components/Typography";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector from "@/components/ui/multiple-select";
import { ProjectDomainOptions, Technologies } from "@/lib/constants";
import { ImageUpload } from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import SubmitProject from "@/actions/submitProject";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ZipUpload } from "@/components/UploadZip";

const UserProjectSubmitPage = () => {
  const form = useFormSubmitProject();

  const router = useRouter();

  const { mutate: submitProject, isPending: isSubmitProjectPending } =
    useMutation({
      mutationFn: SubmitProject,
      onSuccess: () => {
        toast.success("Project submitted successfully!", {
          id: "project-submission"
        });
        form.reset();
        router.push("/user/my-projects");
      },
      onError: () => {
        toast.error("Project not submitted.", { id: "project-submission" });
      }
    });

  const onSubmit = (values: FormTypeSubmitProject) => {
    submitProject(values);
  };

  const { watch, setValue } = form;

  const thumbnail = watch("projectThumbnail");
  const zipUrl = watch("zip");

  console.log("FORM ERROR::::", form.formState.errors);

  return (
    <section className="max-w-4xl mx-auto py-2">
      <div className="border-b">
        <Title>Submit Project</Title>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-5 flex flex-col pb-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitProjectPending}
                    placeholder="This is your public display project name."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isSubmitProjectPending}
                    placeholder="Describe your project..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="domain"
            render={() => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <MultipleSelector
                    disabled={isSubmitProjectPending}
                    defaultOptions={ProjectDomainOptions}
                    placeholder="Project Domain"
                    creatable
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    onChange={(values) => {
                      setValue(
                        "domain",
                        Array.isArray(values) ? values.map((v) => v.value) : []
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technologies"
            render={() => (
              <FormItem>
                <FormLabel>Technologies</FormLabel>
                <FormControl>
                  <MultipleSelector
                    defaultOptions={Technologies}
                    disabled={isSubmitProjectPending}
                    placeholder="Tech-Stack used"
                    creatable
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Enter Team Member Names
                      </p>
                    }
                    onChange={(values) => {
                      setValue(
                        "technologies",
                        Array.isArray(values) ? values.map((v) => v.value) : []
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitProjectPending}
                    placeholder="www.github.com/xyz"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="liveLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live Link</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitProjectPending}
                    placeholder="www.xyz.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full grid md:grid-cols-3 gap-2">
            <ImageUpload
              imageUrl={thumbnail}
              setValue={(public_id) => {
                setValue("projectThumbnail", public_id);
              }}
            />
            <ZipUpload
              fileUrl={zipUrl}
              setValue={(public_id) => {
                setValue("zip", public_id);
              }}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitProjectPending}
            variant={"outline"}
            className="self-end w-full md:w-fit"
          >
            {isSubmitProjectPending && <Loader2 className="animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UserProjectSubmitPage;
