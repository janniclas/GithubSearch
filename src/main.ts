import {Octokit} from 'octokit';

const octokit = new Octokit({});

const queryNumberOfRepos = async (
  language: string,
  created: string,
  textSearch?: string
) => {
  const search = textSearch ? textSearch + '+' : '';
  const searchQuery = {q: `${search}language:${language} created:<${created}`};

  console.debug(
    `Starting query for ${language} repositories, which were created before ${created}`
  );
  octokit.request('GET /search/repositories', searchQuery).then(response => {
    if (response.data.incomplete_results) {
      console.warn(`Results for ${JSON.stringify(searchQuery)} are incomplete`);
    }
    console.log(
      `Total count for query ${JSON.stringify(searchQuery)} ${
        response.data.total_count
      }`
    );
  });
};

const createdBefore = '2022-04-19';
queryNumberOfRepos('Objective-C', createdBefore);
const releaseDateSwift = '2014-01-01';
queryNumberOfRepos('Objective-C', releaseDateSwift);
queryNumberOfRepos('swift', createdBefore);
queryNumberOfRepos('swift', createdBefore, 'server');
