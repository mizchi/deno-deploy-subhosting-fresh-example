// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $api_deploy from "./routes/api/deploy.ts";
import * as $deployment_id_index from "./routes/deployment/[id]/index.tsx";
import * as $index from "./routes/index.tsx";
import * as $project_projectId_index from "./routes/project/[projectId]/index.tsx";
import * as $DeployEditor from "./islands/DeployEditor.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/api/deploy.ts": $api_deploy,
    "./routes/deployment/[id]/index.tsx": $deployment_id_index,
    "./routes/index.tsx": $index,
    "./routes/project/[projectId]/index.tsx": $project_projectId_index,
  },
  islands: {
    "./islands/DeployEditor.tsx": $DeployEditor,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;