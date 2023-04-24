import { form } from "../support/page_objects/WebForm"

describe('Apply for a job', function () {
  // this code block will execute once before all tests
  beforeEach('Visit career page and accept cookies', function () {
    // if mobile test, default is set to Desktop
    //cy.viewport(Cypress.env('iphone'))

    // visit userlane careers page
    form.openCareerPage()

    // accept cookies for userlane Homapage
    form.acceptHomePageCookies()

  })

  it('Verify if any QA position exists', { tags: '@smoke' }, function () {
    // check if job position for job category exists
    form.isJobExist('Automation Test Engineer')
  })

  it('Apply for QA position and verify successful form submission', { tags: ['@smoke', '@e2e'] }, function () {
    // click on job from the category
    form.clickJob('Automation Test Engineer')

    // dismiss cookies
    form.formCookies()

    // apply job
    form.applyJob()

    // verify if job title is correct
    form.verifyJobTitle('Automation Test Engineer')

    // solve hcaptcha, api key access value
    form.solveHCaptcha('d02284d27a65a676e20972b5f2f3b753')

    // verify resume upload
    /* Ends up in 403 forbidden request error, Although chromewebsecurity is set to false, usual manual upload of file works, but not working in cypress.
    */
    form.verifyResumeUpload()

    // Fill in required fields and validate for required
    form.validateNameInput('John Doe')
    form.validateEmailInput('testcypressuser@protonmail.com')
    form.validatePhoneInput('11199999333')
    form.validateSalaryInput('5000 EUR')

    // Fill in optional fields
    // Usage in your Cypress test
    form.orgInput("Test Company")
    form.linkedInURLInput("https://www.linkedin.com/test")
    form.twitterURLInput("https://twitter.com/test")
    form.gitHubURLInput("https://github.com/johndoe")
    form.portfolioURLInput("https://portfolio.com/test")
    form.otherURLInput("https://otherwebsite.com/test")

    // Fill in optional cover letter textarea
    form.coverLetter('This is my cover letter for the job application.')

    // validate the "Yes" checkbox for future job opportunities
    form.validateCheckbox()

    // submit the form
    form.submit()

    // verify succesful form submission and new url include 'thanks'
    form.validateFormSubmission('include', 'thanks')

    // success message(application submitted) element should exist in DOM
    form.validateFormSuccessMessage('exist')
  })

  it('Verify validation errors for empty form submission and required fields', { tags: ['@smoke', '@e2e'] }, function () {
    // click on job from the category
    form.clickJob('Automation Test Engineer')

    // dismiss cookies
    form.formCookies()

    // click to apply for job
    form.applyJob()

    // verify empty form submission
    // submit the form
    form.submit()

    // Assert that the page URL remains unchanged
    form.validateFormSubmission('not.include', 'thanks')

    // success message element should not exist in DOM
    form.validateFormSuccessMessage('not.exist')

    // verify resume upload
    form.verifyResumeUpload()

    // Fill in required fields and validate for required
    //  verify no 'name field' validation error after text is entered
    form.validateNameInput('John Doe')
    form.isNameValidationExist('not.exist')

    // Verify empty'name' input field is now invalid and has the expected validation message
    form.clearNameField()
    form.nameFieldvalidationMsg('Please fill out this field.')

    //  verify no 'email field' validation error after correct text is entered
    form.validateEmailInput('testcypressuser@protonmail.com')
    form.isEmailValidationExist('not.exist')

    // Verify that the empty email input field is now invalid and has the expected validation message
    form.clearEmailField()
    form.emailFieldValidationMsg('Please fill out this field.')

    // verify 'email format' validation error after invalid text is entered
    form.validateEmailInput("testcypressuser")
    form.emailFieldValidationMsg("Please include an '@' in the email address. 'testcypressuser' is missing an '@'.")

    //  verify 'phone validation' field after text is entered
    form.validatePhoneInput('11199999333')
    form.isPhoneValidationExist('not.exist')

    // Verify empty phone input field is now invalid and has the expected validation message
    form.clearPhoneField()
    form.phoneFieldValidationMsg('Please fill out this field.')

    //  verify 'salary input field' validation after text is entered
    form.validateSalaryInput('5000 EUR')
    form.isSalaryValidationExist('not.exist')

    // Verify that the empty salary input field is now invalid and has the expected validation message
    form.clearSalaryField()
    form.salaryFieldValidationMsg('Please fill out this field.')
  })
})