# Jira Comment
Add a comment to an issues

## BUILD
This repo requires build before publishing. Refer to scripts in package.json

For examples on how to use this, check out the [gajira-demo](https://github.com/atlassian/gajira-demo) repository
> ##### Only supports Jira Cloud. Does not support Jira Server (hosted)

## Usage

> ##### Note: this action requires [Jira Login Action](https://github.com/marketplace/actions/jira-login)

To add comment to an issue you need to specify an issue key and a comment as action inputs, like:

```yaml
- name: Comment on issue
  uses: velas/jira-comment@master
  with:
  issues_keys: 'VLX-2, VLX-4'
  comment: ${{ github.event.pusher.name }} pushed to repository: ${{ github.event.repository.full_name }}
```

### Environment variables
- None

### Inputs
- `issues_keys` - An issue key to add a comment for
- `comment` - Comment

### Outputs
- None
