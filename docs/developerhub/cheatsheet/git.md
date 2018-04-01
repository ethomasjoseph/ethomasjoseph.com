---
layout: page
section: cheetsheet
hideLogoInit: false
title: GIT Commands - Cheatsheet
summary: Collection of some useful scenarios in GIT and commands to deal with them.
categories: [dev-cheetsheet]
last_updated: March 30, 2018
---
{% include setup %}
Git is a powerful source version system, and I firmly believe that using the command line to control it is the best way to master this tool. Although there are various UI tools, there is a tool specific learning curve, which makes it difficult for people used to two different GIT tools to communicate. Moreover, learning the command line for GIT to me is the best way to learning it. Command line also gives a unified way of web searching, and finding the appropriate command for your problem at hand.

I started putting together a cheatsheet for GIT, when I first started learning it. Over the period of time, I have shared it with multiple team members, and also used it to conduct sessions for my teams. I had kept it all this while on my private notes. I am now sharing this on my site so that it can benefit more people.

Instead of describing what each command does, I have reversed it to help find the commands that are required for your task at hand. This in no way is a complete guide to GIT, but you will find the most common scenarios here. If you like something to be added, please let me know through the comments, or give me a pull request.

I want to ... | then use ...
--- | ---
**create** a new repository | `git init` <br/><br/>-- OR --<br/><br/> `git init --bare` (if the repository has to act as a server where you will not work directly)
**clone** a repository <br/> (similar to **checkout** in SVN) | `git clone URL`<br/> e.g. `git clone https://github.com/ethomasjoseph/ethomasjoseph.com.git`
**create** a new local branch and work on it | `git checkout -b new_branch_name`<br/><br/>-- OR --<br/><br/>`git branch new_branch_name`<br/>`git checkout new_branch_name`
**add a new remote repository** | `git remote add upstream NEW_REPO_URL` - add a new repository alias 'upstream' with given URL
**push** a **new** local branch into remote repo | `git push -u origin fea_branch_name`
**update** my current branch "feat_branch" with latest changes from other developers :smile: | `git pull --rebase` -  pulls in changes from the current branches and keep your own modifications in line.<br/>This is a much better and cleaner option than a simple `git pull` which tries to merge the changes from the remote repository with your own.
**update** my feature branch "feat_branch" with latest changes from branch "develop" | `git checkout develop` (go to develop)<br/>`git pull` (sych with remote repo)<br/>`git checkout feat_branch` (go to fea_branch)<br/>`git merge --no-ff develop` (bring changes from develop to current branch)<br/><br/>-- OR --<br/><br/>`git checkout develop` (go to develop)<br/>`git pull` (sych with remote repo)<br/>`git merge --no-ff develop feat_branch` (merge changes from develop into feat_branch)<br/><br/>**NOTE:** The option `--no-ff` ensures that there is always a merge commit even if   if it detects that your current HEAD is an ancestor of the commit you're trying to merge. This is especially useful to revert any merges.<br/><br/>-- OR --<br/><br/>**Using `git rebase` option:**<br/>`git checkout develop` (go to develop)<br/>`git pull` (sych with remote repo)<br/>`git checkout feat_branch` (go to fea_branch)<br/>`git rebase develop` (bring changes from develop to current branch - rebase rewrite history to make it neatly tucked in)<br/><br/>**WARNING** *This option of `git rebase` should be used only with team consensus. Otherwise it annoys others, when they see that their master history is rewritten.  Use it along with* `git pull --rebase`. The command **`git rebase -i` turns you into a ninja. Do not try at home :smiley:**
**update** all my locally tracked branches with latest changes from remote | `git pull --all`
**view** all the local branches (includes local only & synced remote branches) | `git branch`
**view** all the remote branches | `git branch -r`
**point** the feat_branch branch to point to a particular commit | `git branch -f feat_branch COMMITHASH` - make the branch feat_branch to point to the COMMITHASH commit.
**rename**  the local branch (current branch)	| `git branch -m new_name`
**delete** a local branch | `git branch -d local_branch` unstages commits
**delete** a remote branch | `git push origin :remote_branch`<br/><br/>-- OR --<br/><br/>`git push origin --delete remote_branch`
**push** changes after a conflict which gives [**rejected**] "non-fastforward" error |	`git add /path/to/conflictedfile`<br/>`commit -m "your comment"`<br/>`git pull origin branch_name`<br/>`git push`
**discard** local changes | There could be only three categories of files when we make local changes:<br/>1. Staged Tracked files (added, not modified)<br/>2. Unstaged Tracked files (added in index, but later modified)<br/>3. Unstaged Untracked files a.k.a Untracked files<br/><br/> + **Staged** - Those that are moved to staging area/ Added to index<br/> + **Tracked** - modified files<br/>+ **Untracked** - new files. Always unstaged. If staged, that means they are tracked.<br/><br/>Here is what you can do depending on the type of local change.<br/>1.  `git checkout` - Removes Unstaged Tracked files ONLY [Type 2]<br/>&nbsp;&nbsp;&nbsp;&nbsp;--`git checkout /path/to/filename/or/pattern` - reverts the specified file(s) of local changes.<br/>2. `git clean -f` - Removes Unstaged Untracked files ONLY [Type 3].<br/>&nbsp;&nbsp;&nbsp;&nbsp;-- flags i (interactive), f (files), d (directory)<br/>3. `git reset --hard` - Removes Tracked files only (Staged and Unstaged) files ONLY[Type 1, Type 2]<br/>&nbsp;&nbsp;&nbsp;&nbsp;-- `git reset` will move the branch backwords as if the commit had never been made at the first places.<br/>4. `git stash -u` - Removes all changes [Type 1, Type 2, Type 3] (comitted unpushed changes will also be removed)
**reverse** changes made | `git reset HEAD~1` - go back one commit. Applies for local commits only.<br/><br/>**DANGEROUS** - as there is no way to retrieve the original copy, and is a permanent UNDO. *NEVER git reset on commits from remote repo*.<br/><br/>-- OR --<br/><br/>`git revert HEAD` - reverts the changes which were pointed to by HEAD. HEAD could be replaced by any commit. In effect, it produces another commit which reverts the changes made in the HEAD (or the other commit specified).
**reverse** a branch merge<br/>(eg, pull out a feature from the main branch)<br/>(in effect is reversing the changes made as above) | `git revert -m 1 [sha_of_merge_commit]`<br/>This will create a new commit (say `abcd1234`)
**reverse a reversal** of the branch merge<br/>(eg, you suddenly realized that actually the feature branch can go into the main branch, which you had pulled out as described above) | `git revert abcd1234` (where `abcd1234` is the commit hash of the merge reversal made earlier)<br/><br/>Once you revert a change, merging the feature branch to main branch again will not work. You will have to revert the revert commit.
**merge conflicts** when I want to accept theirs | `git merge --strategy-option theirs branch_name_to_merge`
**Save my current work** without committing (hmm, the guest came in while having my dinner) | `git stash save "my lovely message"`<br/>`git stash list` - list the stashes (as a stack - LIFO)<br/>`git stash apply` - applies the latest stash (leaves the stack intact)<br/>`git stash pop` - applies the latest stash and deletes it from the stack!<br/>`git stash apply  stash@{2}`- applies the specified stash<br/>`git stash drop stash@{0}` - removes the specified stash<br/><br/>*Psst... and if your stash stays stale...*<br/>`git stash branch testchanges` which creates a new branch for you, checks out the commit you were on when you stashed your work, reapplies your work there, and then drops the stash if it applies successfully
*select few commits from elsewhere to current branch* | `git cherry-pick C1 C2 C3` - plops C1 C2 and C3 commits in that order to the current branch.<br/><br/>-- OR --<br/><br/>`git rebase -i C1` - gives an interactive dialog to rebase commits of the current branch to be attached in sequence to the specified branch or commit. We can drop a commit or option of reordering and squashing commits.

## References
If you are new to GIT, I would recommend <a href="http://pcottle.github.io/learnGitBranching/" target="{{ APP.links.target_external }}">Peter Cottle's "hands-on" tutorial</a> on GIT, or GitHub's <a href="https://try.github.io" target="{{ APP.links.target_external }}">Try Git</a>.

There are a few other references as well, which will be very useful for overall GIT concepts as well as wading through some simple and complex use cases.

* [http://gitready.com](http://gitready.com)
* [http://www.gitguys.com](http://www.gitguys.com)
* [https://www.atlassian.com/git](https://www.atlassian.com/git)
