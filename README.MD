# Titans' Billboard

This is the codeused to make a [chrome extesion](https://chrome.google.com/webstore/detail/titans-billboard/hhlkinjhggikceamfgghhmeglglkbkeochrome) that shows answers to the question "If you had a huge billboard, what would you put on it?" asked on the Tim Ferriss Showssfdasdfsdfa

It was done using a semi-automatic approach

## Approach
1. The **scrapper** scraps Tim Ferriss' page and populates a database with all the episodes that have at least one guest.
2. The **scrapper** also finds each episode's audio URL and exact position on which the question gets answered (as specified in the show notes) and updates the DB records
3. **webListener** Is a react app that plays each episode's audio from when the question is asked, and presents me with a text-area where I type the guest's answer, the answer then is saved.
4. The chrome extension in `/chrome` talks to an Amazon Lambda function that provides a random episode record, including the billboard answer, of course.
