import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getProjectsInOrg, Project } from "../../internal/subhosting.ts";

type RootProps = {
  projects: Project[];
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    const projects = await getProjectsInOrg({});
    const resp = await ctx.render({ projects } as RootProps);
    return resp;
  },
};

export default function ProjectDetailPage(props: PageProps<RootProps>) {
  return (
    <>
      <div>
        Project Detail: {props.params.projectId}
        <br />
        <ul>
          {props.data.projects.map((project) => (
            <li key={project.id} className="p-3">
              <a
                className="text-blue-500 hover:text-blue-700"
                href={`/project/${project.id}`}
              >
                {project.name}
              </a>
              <pre>
                <code>
                  {JSON.stringify(project, null, 2)}
                </code>
              </pre>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
