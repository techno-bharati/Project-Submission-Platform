import getProjects from "@/actions/getProjects";
import { DataTable } from "./_components/DataTable";
import { columns, Project } from "./columns";
import { Title } from "@/components/Typography";

const AdminProjectPage = async () => {
  const projects = await getProjects();
  return (
    <div className="max-w-6xl m-auto">
      <Title>Projects</Title>
      <div className="border-b my-3" />
      <DataTable columns={columns} data={projects} />
    </div>
  );
};

export default AdminProjectPage;
