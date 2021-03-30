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
    // const issueId = this.argv.issue;
    const { comment } = this.argv;

    const issuesIDs = this.argv.issue.split(",");
    console.log(`All issues IDs: ${issuesIDs}`)
    for (let i = 0; i < issuesIDs.length; i++) {
      const issueId = issuesIDs[i];
      console.log(`Current issue ID: ${issueId}`);
      issueId = makeProperIssueID(issueId);
      console.log(`Adding comment to ${issueId}: \n${comment}`);
      await this.Jira.addComment(issueId, { body: comment });
    }
    return {};
  }
};

function makeProperIssueID(issueID) {
  issueId = issueId.toUpperCase();
  issueId.replace(" ", "-");
  if (!issueId.includes("VTX-")) {
    // do nothing
  } else {
    issueId = "VTX-" + issueId;
  }
  return issueId;
}
