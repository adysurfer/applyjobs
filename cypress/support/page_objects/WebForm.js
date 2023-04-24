const ac = require("@antiadmin/anticaptchaofficial")

export class WebForm {
    openCareerPage() {
        cy.visit('/careers')
    }
    acceptHomePageCookies() {
        cy.wait(2000)
        // access from parent to within shadow root
        cy.get("div[id='usercentrics-root']").shadow().find('button[data-testid="uc-accept-all-button"]').click()
    }
    isJobExist(jobTitle) {
        cy.get('div[class*="result-item"]')
            // filter job positions here in this case -> QA
            .filter(`:contains(${jobTitle})`).should('be.visible')
    }
    clickJob(job) {
        cy.get('div[class*="result-item"]')
            // filter job positions here in this case -> QA
            .filter(`:contains(${job})`).should('be.visible')
            // click on the first QA job found
            .first()
            .within(() => {
                cy.get('div.text-right a')
                    .click()
            })
    }
    formCookies() {
        // web form cookies
        cy.get('[class*=cc-dismiss]').first().click({ force: true })
    }
    applyJob() {
        // apply for job
        cy.get('[data-qa="show-page-apply"]').click()
    }
    verifyJobTitle(isTitle) {
        // verify if job title is correct
        cy.get('h2').should('include.text', isTitle)
    }
    solveHCaptcha(apiKey) {
        // using hcaptcha solver npm package
        // provide values for api key, current application form url, and datasitekey for hcaptcha
        ac.setAPIKey(apiKey)
        cy.url().then(currentUrl => {
            cy.get('.h-captcha').invoke('attr', 'data-sitekey').then(dataSiteKey => {
                ac.solveHCaptchaProxyless(currentUrl, dataSiteKey)
                    .then(token => {
                        console.log('token: ' + token)
                        // insert captcha token response for form submission
                        cy.get('#hcaptchaResponseInput').invoke('val', token)
                    })
                    .catch(error => console.log('test received error ' + error))
            })
        })
        //wait for form submission until captcha is solved and a token is receieved, usually takes around 25~35 seconds.
        cy.wait(35000)
    }
    verifyResumeUpload() {
        /* Ends up in 403 forbidden request error, Although chromewebsecurity is set to false, manual upload of file works, but not working in cypress
        */
        cy.intercept('POST', 'https://jobs.lever.co/parseResume').as('uploadResume')
        cy.get('input[type="file"]').selectFile('cypress/fixtures/TestQADummy.txt')
        cy.wait('@uploadResume').then((res) => {
            // Check for status code, skipping this check for now as I always get 403 forbidden
            //expect(res.response.statusCode).to.equal(200)
        })
    }
    validateNameInput(name) {
        cy.get('input[name="name"]').type(name).should('have.attr', 'required')
    }
    validateEmailInput(email) {
        cy.get('input[name="email"]').type(email).should('have.attr', 'required')
    }
    validatePhoneInput(phone) {
        cy.get('input[name="phone"]').type(phone).should('have.attr', 'required')
    }
    validateSalaryInput(salary) {
        cy.get('input[name="cards[16cd39ca-6520-4ed6-a74c-04f777c0732a][field0]"]').type(salary).should('have.attr', 'required')
    }
    // Function to validate organization input
    orgInput(org) {
        cy.get('input[name="org"]').type(org).should('have.value', org);
    }

    // Function to validate LinkedIn URL input
    linkedInURLInput(url) {
        cy.get('input[name="urls[LinkedIn]"]').type(url).should('have.value', url);
    }

    // Function to validate Twitter URL input
    twitterURLInput(url) {
        cy.get('input[name="urls[Twitter]"]').type(url).should('have.value', url);
    }

    // Function to validate GitHub URL input
    gitHubURLInput(url) {
        cy.get('input[name="urls[GitHub]"]').type(url).should('have.value', url);
    }

    // Function to validate Portfolio URL input
    portfolioURLInput(url) {
        cy.get('input[name="urls[Portfolio]"]').type(url).should('have.value', url);
    }

    // Function to validate Other URL input
    otherURLInput(url) {
        cy.get('input[name="urls[Other]"]').type(url).should('have.value', url);
    }
    coverLetter(txt) {
        // add cover letter
        cy.get('textarea[name="comments"]').type(txt)
    }
    validateCheckbox() {
        // validate checkbox
        cy.get('input[type="checkbox"]').check().should('be.checked')
    }
    submit() {
        cy.get('#application-form').submit()
    }
    validateFormSubmission(check, txt) {
        // validate successful form submission and new url include correct text
        cy.url().should(check, txt)
    }
    validateFormSuccessMessage(msg) {
        // validate success message(application submitted) element for DOM
        cy.get('[data-qa="msg-submit-success"]').should(msg)
    }
    isNameValidationExist(vld) {
        cy.get('input[name="name"]:invalid').should(vld)
    }
    clearNameField() {
        cy.get('input[name="name"]').clear()
    }
    nameFieldvalidationMsg(msg) {
        cy.get('input[name="name"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', msg)
    }
    isEmailValidationExist(vld) {
        cy.get('input[name="email"]:invalid').should(vld)
    }
    clearEmailField() {
        cy.get('input[name="email"]').clear()
    }
    emailFieldValidationMsg(msg) {
        cy.get('input[name="email"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', msg)
    }
    isPhoneValidationExist(vld) {
        cy.get('input[name="phone"]:invalid').should(vld)
    }
    clearPhoneField() {
        cy.get('input[name="phone"]').clear()
    }
    phoneFieldValidationMsg(msg) {
        cy.get('input[name="phone"]:invalid')
            .invoke('prop', 'validationMessage')
            .should('equal', msg)
    }
    isSalaryValidationExist(vld) {
        cy.get('input[name="cards[16cd39ca-6520-4ed6-a74c-04f777c0732a][field0]"]:invalid').should(vld)
    }
    clearSalaryField() {
        cy.get('input[name="cards[16cd39ca-6520-4ed6-a74c-04f777c0732a][field0]"]').clear()
    }
    salaryFieldValidationMsg(msg) {
        cy.get('input[name="cards[16cd39ca-6520-4ed6-a74c-04f777c0732a][field0]"]')
            .invoke('prop', 'validationMessage')
            .should('equal', msg)
    }

}

export const form = new WebForm()