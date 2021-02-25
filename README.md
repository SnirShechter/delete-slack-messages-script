# Delete Slack Messages Script

Deletes all slack messages from the #general channel.

## Why does anyone need this script?

Apparently, Slack does not allow to delete the #general channel or easily clean its history ([see more info](https://slack.com/intl/en-il/help/articles/220105027-The-general-channel)). Deleting the messages one by one is annoying, hence this script.

Please notice that the script does not yet handle threads properly. In the event of threads, you will need to delete the in-thread replies manually before it can continue.
## Instructions

-   Clone the project
-   Run `npm install`
-   Get the workspace url and a user with admin permissions.
-   Replace the WORKSPACE_URL, EMAIL and PASSWORD variable values at the top of the script. 
-   Run the script and wait for the magic to happen :)

**NOTE** - Unfortunately, this script does not yet work with accounts connected using Google (which do not have a password).