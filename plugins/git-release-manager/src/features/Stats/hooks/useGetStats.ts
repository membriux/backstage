/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useAsync } from 'react-use';
import { gitReleaseManagerApiRef } from '../../../api/serviceApiRef';

import { useProjectContext } from '../../../contexts/ProjectContext';
import { useApi } from '@backstage/core-plugin-api';

export const useGetStats = () => {
  const pluginApiClient = useApi(gitReleaseManagerApiRef);
  const { project } = useProjectContext();

  const stats = useAsync(async () => {
    const [{ releases: allReleases }, { tags: allTags }] = await Promise.all([
      pluginApiClient.getAllReleases({
        owner: project.owner,
        repo: project.repo,
      }),
      pluginApiClient.getAllTags({
        owner: project.owner,
        repo: project.repo,
      }),
    ]);

    return {
      allReleases,
      allTags,
    };
  }, [project]);

  return {
    stats,
  };
};
