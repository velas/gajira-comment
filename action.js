const Jira = require("./common/net/Jira");

module.exports = class {
  constructor({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    });

    this.config = config;
    this.argv = argv;
    this.githubEvent = githubEvent;
  }

  async execute() {
    const { comment } = this.argv;

    const issuesKeys = this.argv.issues_keys;
    core.info(`Issues keys: ${issuesKeys}`);
    const issuesIDs = this.argv.issues_keys.split(', ');
    core.info(`All issues IDs: ${issuesIDs}`)
    for (let i = 0; i < issuesIDs.length; i++) {
      let issueId = issuesIDs[i];
      conre.info(`Current issue ID: ${issueId}`);
      issueId = makeProperIssueID(issueId);
      core.info(`Adding comment to ${issueId}: \n${comment}`);
      await this.Jira.addComment(issueId, { body: comment });
    }
    return {};
  }
};

function makeProperIssueID(issue) {
  let issueId = issue.toUpperCase();
  issueId = issueId.replace(' ', '-');
  if (!issueId.includes('VTX-')) {
    issueId = 'VTX-' + issueId;
  } 
  return issueId;
}
