# applyjobs

Clone repo using: `git clone https://github.com/adysurfer/applyjobs.git`

## Pre-requisites

1. Node JS

## Install the project

Install project dependencies with: `npm install`

## Run Tests:

1. Standard Execution(headless): npm run cypress:test:execution
2. Open Browser execution(headed): npm run cypress:runner
3. Standard tags based execution(headless): npm run cypress:test:smoke
4. Skip Tagged tests(unTagged)(headless): npm run cypress:test:unTagged
5. Combined tags execution(headless): npm run cypress:test:smoke:e2e
6. Report(mochawesome):

   - Run cypress with `npm run cypress:test:smoke:e2e`
   - Access the generated mochawesome report `index.html` from report folder
  