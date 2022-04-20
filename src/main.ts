import {Octokit} from 'octokit';

const octokit = new Octokit({});

const queryNumberOfRepos = (language: string, created: string) => {
  const searchQuery = {q: `language:${language} created:<${created}`};
  console.debug(
    `Starting query for ${language} repositories, which were created before ${created}`
  );
  octokit.request('GET /search/repositories', searchQuery).then(response => {
    if (response.data.incomplete_results) {
      console.warn(`Results for ${language} query are incomplete`);
    }
    console.log(
      `Total count ${language} language repos ${response.data.total_count}`
    );
  });
};
const createdBefore = '2022-04-19';
queryNumberOfRepos('Objective-C', createdBefore);
queryNumberOfRepos('swift', createdBefore);
