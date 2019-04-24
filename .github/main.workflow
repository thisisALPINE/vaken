workflow "Scan push for important changes" {
  on = "push"
  resolves = ["Seekret", "post slack message"]
}

action "Seekret" {
  uses = "docker://cdssnc/seekret-github-action"
}

workflow "Label approved pull requests" {
  on = "pull_request_review"
  resolves = ["Label when approved"]
}

action "Label when approved" {
  uses = "pullreminders/label-when-approved-action@master"
  secrets = ["GITHUB_TOKEN"]
  env = {
    LABEL_NAME = "approved"
    APPROVALS  = "2"
  }
}

workflow "on pull request merge, delete the branch" {
  on = "pull_request"
  resolves = ["branch cleanup"]
}

action "branch cleanup" {
  uses = "jessfraz/branch-cleanup-action@master"
  secrets = ["GITHUB_TOKEN"]
  env = {
    NO_BRANCH_DELETED_EXIT_CODE = "0"
  }
}

action "detect dependency changes" {
  uses = "bencooper222/check-for-node-dep-changes@master"
  secrets = ["GITHUB_TOKEN"]
}

action "post slack message" {
  needs = ["detect dependency changes"]
  uses = "pullreminders/slack-github-action@master"
  secrets = [
    "SLACK_BOT_TOKEN",
  ]
  args = "{\"channel\": \"CDJEP2U1X\", \"text\": \"One or more dependencies of Vaken in the default branch have been changed; `npm i` is recommended.\"}}"
}
