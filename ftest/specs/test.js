var waitForExistTime = 5000;

// describe("ExpensesList page", function() {

//   it("should contain the relevant components", function() {

//     browser.url("http://localhost:1324")

//     var navbarExists = browser.waitForExist("nav=Expenses", waitForExistTime);
//     expect(navbarExists).toBe(true);

//   });

// });

describe("Expense page", function() {

  it("should show the relevant components for a NEW EXPENSE", function() {

    browser.url("http://localhost:1324");
    browser.click(".ftest-plusButton");

    var navbarExists = browser.waitForExist("nav=Expense", waitForExistTime);
    expect(navbarExists).toBe(true);

    var ledgerIconExists = browser.isExisting(".ftest-ledgerIcon");
    expect(ledgerIconExists).toBe(false);

    var amountInputExists = browser.waitForExist(".ftest-amountInput", waitForExistTime);
    expect(amountInputExists).toBe(true);

    var descriptionInputExists = browser.waitForExist(".ftest-descriptionInput", waitForExistTime);
    expect(descriptionInputExists).toBe(true);

    var sharedExists = browser.waitForExist(".ftest-shared", waitForExistTime);
    expect(sharedExists).toBe(true);

    var amongstExists = browser.waitForExist(".ftest-amongst", waitForExistTime);
    expect(amongstExists).toBe(true);

    var amongstWhoExists = browser.isExisting(".ftest-amongstWho");
    expect(amongstWhoExists).toBe(false);

    var splitExists = browser.waitForExist(".ftest-split", waitForExistTime);
    expect(splitExists).toBe(true);

    var splitAmountInputExists = browser.isExisting(".ftest-splitAmountInput");
    expect(splitAmountInputExists).toBe(false);

    var paidByExists = browser.waitForExist(".ftest-paidBy", waitForExistTime);
    expect(paidByExists).toBe(true);

    var paidByWhoExists = browser.isExisting(".ftest-paidByWho");
    expect(paidByWhoExists).toBe(false);

    var saveButtonExists = browser.waitForExist(".ftest-saveButton", waitForExistTime);
    expect(saveButtonExists).toBe(true);

  });

  it("should show the relevant components for Shared : No", function() {

    browser.url("http://localhost:1324");
    browser.click(".ftest-plusButton");

    var shared = browser.element(".ftest-shared").element("button=No");
    shared.waitForExist(waitForExistTime);
    shared.click();

    var amountInputExists = browser.waitForExist(".ftest-amountInput", waitForExistTime);
    expect(amountInputExists).toBe(true);

    var descriptionInputExists = browser.waitForExist(".ftest-descriptionInput", waitForExistTime);
    expect(descriptionInputExists).toBe(true);

    var amongstExists = browser.isExisting(".ftest-amongst");
    expect(amongstExists).toBe(false);

    var amongstWhoExists = browser.isExisting(".ftest-amongstWho");
    expect(amongstWhoExists).toBe(false);

    var splitExists = browser.isExisting(".ftest-split");
    expect(splitExists).toBe(false);

    var splitAmountInputExists = browser.isExisting(".ftest-splitAmountInput");
    expect(splitAmountInputExists).toBe(false);

    var paidByExists = browser.waitForExist(".ftest-paidBy", waitForExistTime);
    expect(paidByExists).toBe(true);

    var paidByWhoExists = browser.isExisting(".ftest-paidByWho");
    expect(paidByWhoExists).toBe(false);

    var saveButtonExists = browser.waitForExist(".ftest-saveButton", waitForExistTime);
    expect(saveButtonExists).toBe(true);

  });

  it("should show the relevant components for Amongst : Some", function() {

    browser.url("http://localhost:1324");
    browser.click(".ftest-plusButton");

    var amongst = browser.element(".ftest-amongst").element("button=Some");
    amongst.waitForExist(waitForExistTime);
    amongst.click();

    var amountInputExists = browser.waitForExist(".ftest-amountInput", waitForExistTime);
    expect(amountInputExists).toBe(true);

    var descriptionInputExists = browser.waitForExist(".ftest-descriptionInput", waitForExistTime);
    expect(descriptionInputExists).toBe(true);

    var sharedExists = browser.waitForExist(".ftest-shared", waitForExistTime);
    expect(sharedExists).toBe(true);

    var amongstWhoExists = browser.isExisting(".ftest-amongstWho");
    expect(amongstWhoExists).toBe(true);

    var splitExists = browser.isExisting(".ftest-split");
    expect(splitExists).toBe(true);

    var splitAmountInputExists = browser.isExisting(".ftest-splitAmountInput");
    expect(splitAmountInputExists).toBe(false);

    var paidByExists = browser.waitForExist(".ftest-paidBy", waitForExistTime);
    expect(paidByExists).toBe(true);

    var paidByWhoExists = browser.isExisting(".ftest-paidByWho");
    expect(paidByWhoExists).toBe(false);

    var saveButtonExists = browser.waitForExist(".ftest-saveButton", waitForExistTime);
    expect(saveButtonExists).toBe(true);

  });

  it("should show the relevant components for Split : Differently", function() {

    browser.url("http://localhost:1324");
    browser.click(".ftest-plusButton");

    var split = browser.element(".ftest-split").element("button=Differently");
    split.waitForExist(waitForExistTime);
    split.click();

    var amountInputExists = browser.waitForExist(".ftest-amountInput", waitForExistTime);
    expect(amountInputExists).toBe(true);

    var descriptionInputExists = browser.waitForExist(".ftest-descriptionInput", waitForExistTime);
    expect(descriptionInputExists).toBe(true);

    var sharedExists = browser.waitForExist(".ftest-shared", waitForExistTime);
    expect(sharedExists).toBe(true);

    var amongstExists = browser.isExisting(".ftest-amongst");
    expect(amongstExists).toBe(true);

    var amongstWhoExists = browser.isExisting(".ftest-amongstWho");
    expect(amongstWhoExists).toBe(false);

    var splitAmountInputExists = browser.isExisting(".ftest-splitAmountInput");
    expect(splitAmountInputExists).toBe(true);

    var paidByExists = browser.waitForExist(".ftest-paidBy", waitForExistTime);
    expect(paidByExists).toBe(true);

    var paidByWhoExists = browser.isExisting(".ftest-paidByWho");
    expect(paidByWhoExists).toBe(false);

    var saveButtonExists = browser.waitForExist(".ftest-saveButton", waitForExistTime);
    expect(saveButtonExists).toBe(true);

  });

  it("should show the relevant components for PaidBy : Someone Else", function() {

    browser.url("http://localhost:1324");
    browser.click(".ftest-plusButton");

    var paidBy = browser.element(".ftest-paidBy").element("button=Someone Else");
    paidBy.waitForExist(waitForExistTime);
    paidBy.click();

    var amountInputExists = browser.waitForExist(".ftest-amountInput", waitForExistTime);
    expect(amountInputExists).toBe(true);

    var descriptionInputExists = browser.waitForExist(".ftest-descriptionInput", waitForExistTime);
    expect(descriptionInputExists).toBe(true);

    var sharedExists = browser.waitForExist(".ftest-shared", waitForExistTime);
    expect(sharedExists).toBe(true);

    var amongstExists = browser.isExisting(".ftest-amongst");
    expect(amongstExists).toBe(true);

    var amongstWhoExists = browser.isExisting(".ftest-amongstWho");
    expect(amongstWhoExists).toBe(false);

    var splitExists = browser.isExisting(".ftest-split");
    expect(splitExists).toBe(true);

    var splitAmountInputExists = browser.isExisting(".ftest-splitAmountInput");
    expect(splitAmountInputExists).toBe(false);

    var paidByWhoExists = browser.waitForExist(".ftest-paidByWho", waitForExistTime);
    expect(paidByWhoExists).toBe(true);

    var saveButtonExists = browser.waitForExist(".ftest-saveButton", waitForExistTime);
    expect(saveButtonExists).toBe(true);

  });

  it("should be able to save an expense ", function() {

    browser.url("http://localhost:1324");
    browser.click(".ftest-plusButton");

    var amountInput = browser.element(".ftest-amountInput");
    amountInput.waitForExist(waitForExistTime);
    amountInput.setValue("10");

    var descriptionInput = browser.element(".ftest-descriptionInput");
    descriptionInput.waitForExist(waitForExistTime);
    descriptionInput.setValue("it should be able to save an expense");

    var saveButton = browser.element(".ftest-saveButton");
    saveButton.waitForExist(waitForExistTime);
    saveButton.click();

    var navbarExists = browser.waitForExist("nav=Expenses", waitForExistTime);
    expect(navbarExists).toBe(true);

    var expenseList = browser.element(".ftest-expenseList");
    var expenseListExists = expenseList.waitForExist(waitForExistTime);
    expect(expenseListExists).toBe(true);

    var savedExpenseAmountExists = browser.element(".ftest-expenseList").element("li*=10").waitForExist(waitForExistTime);
    expect(savedExpenseAmountExists).toBe(true);

    var savedExpenseDescriptionExists = browser.element(".ftest-expenseList").element("li*=it should be able to save an expense").waitForExist(waitForExistTime);
    expect(savedExpenseDescriptionExists).toBe(true);

    var ledgerIcon = browser.element(".ftest-ledgerIcon");
    ledgerIcon.waitForExist(waitForExistTime);
    ledgerIcon.click();

    //to be modified to be more forgiving (too hardcoded now)
    var calico = browser.getText("//*[text()[contains(.,'calico')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(calico).toBe("Owes\nbrowncat : $0\nfatpaws : $3.33");

    var browncat = browser.getText("//*[text()[contains(.,'browncat')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(browncat).toBe("Owes\nfatpaws : $3.33\ncalico : $0");

    var fatpaws = browser.getText("//*[text()[contains(.,'fatpaws')]]/following-sibling::div[descendant::text()[contains(.,'calico')]]");
    expect(fatpaws).toBe("Owes\nbrowncat : $0\ncalico : $0");
  });

  it("should be able to save an expense amongst : Some ", function() {

    browser.url("http://localhost:1324");
    browser.click(".ftest-plusButton");

    var amountInput = browser.element(".ftest-amountInput");
    amountInput.waitForExist(waitForExistTime);
    amountInput.setValue("10");

    var descriptionInput = browser.element(".ftest-descriptionInput");
    descriptionInput.waitForExist(waitForExistTime);
    descriptionInput.setValue("it should be able to save an expense amongst : Some");

     var amongst = browser.element(".ftest-amongst").element("button=Some");
    amongst.waitForExist(waitForExistTime);
    amongst.click();

    var amongstWhoMe = browser.element("//div[contains(concat(' ', normalize-space(@class), ' '), ' ftest-amongstWho ')]//*[./text()='Me']");
    amongstWhoMe.waitForExist(waitForExistTime);
    amongstWhoMe.click();

    var amongstWhoCalico = browser.element("//div[contains(concat(' ', normalize-space(@class), ' '), ' ftest-amongstWho ')]//*[./text()='calico']");
    amongstWhoCalico.waitForExist(waitForExistTime);
    amongstWhoCalico.click();

    var saveButton = browser.element(".ftest-saveButton");
    saveButton.waitForExist(waitForExistTime);
    saveButton.click();

    var savedExpenseAmountExists = browser.element("//ul[contains(concat(' ', normalize-space(@class), ' '), ' ftest-expenseList ')]//*[./text()='10']").waitForExist(waitForExistTime);
    expect(savedExpenseAmountExists).toBe(true);

    var savedExpenseDescriptionExists = browser.element(".ftest-expenseList").element("li*=it should be able to save an expense amongst : Some").waitForExist(waitForExistTime);
    expect(savedExpenseDescriptionExists).toBe(true);

    var ledgerIcon = browser.element(".ftest-ledgerIcon");
    ledgerIcon.waitForExist(waitForExistTime);
    ledgerIcon.click();

    // //to be modified to be more forgiving (too hardcoded now)
    var calico = browser.getText("//*[text()[contains(.,'calico')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(calico).toBe("Owes\nbrowncat : $0\nfatpaws : $5");

    var browncat = browser.getText("//*[text()[contains(.,'browncat')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(browncat).toBe("Owes\nfatpaws : $0\ncalico : $0");

    var fatpaws = browser.getText("//*[text()[contains(.,'fatpaws')]]/following-sibling::div[descendant::text()[contains(.,'calico')]]");
    expect(fatpaws).toBe("Owes\nbrowncat : $0\ncalico : $0");
  });

  it("should be able to save an expense split : Differently ", function() {

    browser.url("http://localhost:1324");
    browser.click(".ftest-plusButton");

    var amountInput = browser.element(".ftest-amountInput");
    amountInput.waitForExist(waitForExistTime);
    amountInput.setValue("10");

    var descriptionInput = browser.element(".ftest-descriptionInput");
    descriptionInput.waitForExist(waitForExistTime);
    descriptionInput.setValue("it should be able to save an expense split : Differently");

     var split = browser.element(".ftest-split").element("button=Differently");
    split.waitForExist(waitForExistTime);
    split.click();

    var splitMe = browser.element("//div[contains(concat(' ', normalize-space(@class), ' '), ' ftest-splitAmountInput ')]//input[@id='splitAmount_Me']");
    splitMe.waitForExist(waitForExistTime);
    splitMe.setValue("1.50");

     var splitBrowncat = browser.element("//div[contains(concat(' ', normalize-space(@class), ' '), ' ftest-splitAmountInput ')]//input[@id='splitAmount_browncat']");
    splitBrowncat.waitForExist(waitForExistTime);
    splitBrowncat.setValue("5.25");

    var splitCalico = browser.element("//div[contains(concat(' ', normalize-space(@class), ' '), ' ftest-splitAmountInput ')]//input[@id='splitAmount_calico']");
    splitCalico.waitForExist(waitForExistTime);
    splitCalico.setValue("3.25");

    var saveButton = browser.element(".ftest-saveButton");
    saveButton.waitForExist(waitForExistTime);
    saveButton.click();

    var savedExpenseAmountExists = browser.element("//ul[contains(concat(' ', normalize-space(@class), ' '), ' ftest-expenseList ')]//*[./text()='10']").waitForExist(waitForExistTime);
    expect(savedExpenseAmountExists).toBe(true);

    var savedExpenseDescriptionExists = browser.element(".ftest-expenseList").element("li*=it should be able to save an expense split : Differently").waitForExist(waitForExistTime);
    expect(savedExpenseDescriptionExists).toBe(true);

    var ledgerIcon = browser.element(".ftest-ledgerIcon");
    ledgerIcon.waitForExist(waitForExistTime);
    ledgerIcon.click();

    // //to be modified to be more forgiving (too hardcoded now)
    var calico = browser.getText("//*[text()[contains(.,'calico')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(calico).toBe("Owes\nbrowncat : $0\nfatpaws : $3.25");

    var browncat = browser.getText("//*[text()[contains(.,'browncat')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(browncat).toBe("Owes\nfatpaws : $5.25\ncalico : $0");

    var fatpaws = browser.getText("//*[text()[contains(.,'fatpaws')]]/following-sibling::div[descendant::text()[contains(.,'calico')]]");
    expect(fatpaws).toBe("Owes\nbrowncat : $0\ncalico : $0");
  });

  it("should be able to save an expense paidBy : Someone Else ", function() {

    browser.url("http://localhost:1324");
    browser.click(".ftest-plusButton");

    var amountInput = browser.element(".ftest-amountInput");
    amountInput.waitForExist(waitForExistTime);
    amountInput.setValue("10");

    var descriptionInput = browser.element(".ftest-descriptionInput");
    descriptionInput.waitForExist(waitForExistTime);
    descriptionInput.setValue("it should be able to save an expense paidBy : Someone Else");

    var paidBy = browser.element(".ftest-paidBy").element("button=Someone Else");
    paidBy.waitForExist(waitForExistTime);
    paidBy.click();

    var paidByCalico = browser.element("//label[@for='paidByWho_calico']");
    paidByCalico.waitForExist(waitForExistTime);
    paidByCalico.click();

    var saveButton = browser.element(".ftest-saveButton");
    saveButton.waitForExist(waitForExistTime);
    saveButton.click();

    var savedExpenseAmountExists = browser.element("//ul[contains(concat(' ', normalize-space(@class), ' '), ' ftest-expenseList ')]//*[./text()='10']").waitForExist(waitForExistTime);
    expect(savedExpenseAmountExists).toBe(true);

    var savedExpenseDescriptionExists = browser.element(".ftest-expenseList").element("li*=it should be able to save an expense paidBy : Someone Else").waitForExist(waitForExistTime);
    expect(savedExpenseDescriptionExists).toBe(true);

    var ledgerIcon = browser.element(".ftest-ledgerIcon");
    ledgerIcon.waitForExist(waitForExistTime);
    ledgerIcon.click();

    // //to be modified to be more forgiving (too hardcoded now)
    var calico = browser.getText("//*[text()[contains(.,'calico')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(calico).toBe("Owes\nbrowncat : $0\nfatpaws : $0");

    var browncat = browser.getText("//*[text()[contains(.,'browncat')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(browncat).toBe("Owes\nfatpaws : $0\ncalico : $3.33");

    var fatpaws = browser.getText("//*[text()[contains(.,'fatpaws')]]/following-sibling::div[descendant::text()[contains(.,'calico')]]");
    expect(fatpaws).toBe("Owes\nbrowncat : $0\ncalico : $3.33");
  });

  it("should be able to save an expense amongst : Some, split : Differently, paidBy : Someone Else ", function() {

    browser.url("http://localhost:1324");
    browser.click(".ftest-plusButton");

    var amountInput = browser.element(".ftest-amountInput");
    amountInput.waitForExist(waitForExistTime);
    amountInput.setValue("10");

    var descriptionInput = browser.element(".ftest-descriptionInput");
    descriptionInput.waitForExist(waitForExistTime);
    descriptionInput.setValue("it should be able to save an expense paidBy : Someone Else");

    var amongst = browser.element(".ftest-amongst").element("button=Some");
    amongst.waitForExist(waitForExistTime);
    amongst.click();

    var amongstWhoMe = browser.element("//div[contains(concat(' ', normalize-space(@class), ' '), ' ftest-amongstWho ')]//*[./text()='Me']");
    amongstWhoMe.waitForExist(waitForExistTime);
    amongstWhoMe.click();

    var amongstWhoCalico = browser.element("//div[contains(concat(' ', normalize-space(@class), ' '), ' ftest-amongstWho ')]//*[./text()='calico']");
    amongstWhoCalico.waitForExist(waitForExistTime);
    amongstWhoCalico.click();

    var split = browser.element(".ftest-split").element("button=Differently");
    split.waitForExist(waitForExistTime);
    split.click();

    var splitMe = browser.element("//div[contains(concat(' ', normalize-space(@class), ' '), ' ftest-splitAmountInput ')]//input[@id='splitAmount_Me']");
    splitMe.waitForExist(waitForExistTime);
    splitMe.setValue("1.50");

    var splitCalico = browser.element("//div[contains(concat(' ', normalize-space(@class), ' '), ' ftest-splitAmountInput ')]//input[@id='splitAmount_calico']");
    splitCalico.waitForExist(waitForExistTime);
    splitCalico.setValue("8.50");


    var paidBy = browser.element(".ftest-paidBy").element("button=Someone Else");
    paidBy.waitForExist(waitForExistTime);
    paidBy.click();

    var paidByCalico = browser.element("//label[@for='paidByWho_calico']");
    paidByCalico.waitForExist(waitForExistTime);
    paidByCalico.click();

    var saveButton = browser.element(".ftest-saveButton");
    saveButton.waitForExist(waitForExistTime);
    saveButton.click();

    var savedExpenseAmountExists = browser.element("//ul[contains(concat(' ', normalize-space(@class), ' '), ' ftest-expenseList ')]//*[./text()='10']").waitForExist(waitForExistTime);
    expect(savedExpenseAmountExists).toBe(true);

    var savedExpenseDescriptionExists = browser.element(".ftest-expenseList").element("li*=it should be able to save an expense paidBy : Someone Else").waitForExist(waitForExistTime);
    expect(savedExpenseDescriptionExists).toBe(true);

    var ledgerIcon = browser.element(".ftest-ledgerIcon");
    ledgerIcon.waitForExist(waitForExistTime);
    ledgerIcon.click();

    // //to be modified to be more forgiving (too hardcoded now)
    var calico = browser.getText("//*[text()[contains(.,'calico')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(calico).toBe("Owes\nbrowncat : $0\nfatpaws : $0");

    var browncat = browser.getText("//*[text()[contains(.,'browncat')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(browncat).toBe("Owes\nfatpaws : $0\ncalico : $0");

    var fatpaws = browser.getText("//*[text()[contains(.,'fatpaws')]]/following-sibling::div[descendant::text()[contains(.,'calico')]]");
    expect(fatpaws).toBe("Owes\nbrowncat : $0\ncalico : $1.5");
  });


  it("should be able to edit an expense ", function() {

    browser.url("http://localhost:1324");
    var plusButton = browser.element(".ftest-plusButton");
    plusButton.waitForExist(waitForExistTime);
    plusButton.click();

    var amountInput = browser.element(".ftest-amountInput");
    amountInput.waitForExist(waitForExistTime);
    amountInput.setValue("10");

    var descriptionInput = browser.element(".ftest-descriptionInput");
    descriptionInput.waitForExist(waitForExistTime);
    descriptionInput.setValue("it should be able to edit an expense");

    var saveButton = browser.element(".ftest-saveButton");
    saveButton.waitForExist(waitForExistTime);
    saveButton.click();

    var navbarExists = browser.waitForExist("nav=Expenses", waitForExistTime);
    expect(navbarExists).toBe(true);

    var expenseList = browser.element(".ftest-expenseList");
    var expenseListExists = expenseList.waitForExist(waitForExistTime);
    expect(expenseListExists).toBe(true);

    var savedExpense = browser.element("//ul[contains(concat(' ', normalize-space(@class), ' '), ' ftest-expenseList ')]//*[./text()='10']");
    savedExpense.waitForExist(waitForExistTime);
    savedExpense.click();
    amountInput = browser.element(".ftest-amountInput");
    amountInput.waitForExist(waitForExistTime);
    amountInput.setValue("12");
    descriptionInput = browser.element(".ftest-descriptionInput");
    descriptionInput.waitForExist(waitForExistTime);
    descriptionInput.setValue("this is an edited expense");
    saveButton = browser.element(".ftest-saveButton");
    saveButton.waitForExist(waitForExistTime);
    saveButton.click();
    expenseList = browser.element(".ftest-expenseList");
    expenseListExists = expenseList.waitForExist(waitForExistTime);

    //change all to xpath, more accurate

    var originalExpenseAmountExists = browser.element("//ul[contains(concat(' ', normalize-space(@class), ' '), ' ftest-expenseList ')]//*[./text()='10']").isExisting();
    expect(originalExpenseAmountExists).toBe(false);

    var originalExpenseDescriptionExists = browser.element(".ftest-expenseList").element("li*=it should be able to save an expense").isExisting();
    expect(originalExpenseDescriptionExists).toBe(false);

    var editedExpenseAmountExists = browser.element("//ul[contains(concat(' ', normalize-space(@class), ' '), ' ftest-expenseList ')]//*[./text()='12']").waitForExist(waitForExistTime);
    expect(editedExpenseAmountExists).toBe(true);

    var editedExpenseDescriptionExists = browser.element(".ftest-expenseList").element("li*=this is an edited expense").waitForExist(waitForExistTime);
    expect(editedExpenseDescriptionExists).toBe(true);

    var ledgerIcon = browser.element(".ftest-ledgerIcon");
    ledgerIcon.waitForExist(waitForExistTime);
    ledgerIcon.click();

    //to be modified to be more forgiving (too hardcoded now)
    calico = browser.getText("//*[text()[contains(.,'calico')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(calico).toBe("Owes\nbrowncat : $0\nfatpaws : $4");
    browncat = browser.getText("//*[text()[contains(.,'browncat')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(browncat).toBe("Owes\nfatpaws : $4\ncalico : $0");
    fatpaws = browser.getText("//*[text()[contains(.,'fatpaws')]]/following-sibling::div[descendant::text()[contains(.,'calico')]]");
    expect(fatpaws).toBe("Owes\nbrowncat : $0\ncalico : $0");

  });

  it("should be able to delete an expense ", function() {

    browser.url("http://localhost:1324");
    var plusButton = browser.element(".ftest-plusButton");
    plusButton.waitForExist(waitForExistTime);
    plusButton.click();

    var amountInput = browser.element(".ftest-amountInput");
    amountInput.waitForExist(waitForExistTime);
    amountInput.setValue("10");

    var descriptionInput = browser.element(".ftest-descriptionInput");
    descriptionInput.waitForExist(waitForExistTime);
    descriptionInput.setValue("it should be able to edit an expense");

    var saveButton = browser.element(".ftest-saveButton");
    saveButton.waitForExist(waitForExistTime);
    saveButton.click();

    var navbarExists = browser.waitForExist("nav=Expenses", waitForExistTime);
    expect(navbarExists).toBe(true);

    var expenseList = browser.element(".ftest-expenseList");
    var expenseListExists = expenseList.waitForExist(waitForExistTime);
    expect(expenseListExists).toBe(true);

    var savedExpense = browser.element("//ul[contains(concat(' ', normalize-space(@class), ' '), ' ftest-expenseList ')]//*[./text()='10']");
    savedExpense.waitForExist(waitForExistTime);
    savedExpense.click();

    var deleteButton = browser.element(".ftest-deleteButton");
    deleteButton.waitForExist(waitForExistTime);
    deleteButton.click();

    //change all to xpath, more accurate

    var originalExpenseAmountExists = browser.element("//ul[contains(concat(' ', normalize-space(@class), ' '), ' ftest-expenseList ')]//*[./text()='10']").isExisting();
    expect(originalExpenseAmountExists).toBe(false);

    var originalExpenseDescriptionExists = browser.element(".ftest-expenseList").element("li*=it should be able to save an expense").isExisting();
    expect(originalExpenseDescriptionExists).toBe(false);

    var ledgerIcon = browser.element(".ftest-ledgerIcon");
    ledgerIcon.waitForExist(waitForExistTime);
    ledgerIcon.click();

    //to be modified to be more forgiving (too hardcoded now)
    calico = browser.getText("//*[text()[contains(.,'calico')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(calico).toBe("Owes\nbrowncat : $0\nfatpaws : $0");
    browncat = browser.getText("//*[text()[contains(.,'browncat')]]/following-sibling::div[descendant::text()[contains(.,'fatpaws')]]");
    expect(browncat).toBe("Owes\nfatpaws : $0\ncalico : $0");
    fatpaws = browser.getText("//*[text()[contains(.,'fatpaws')]]/following-sibling::div[descendant::text()[contains(.,'calico')]]");
    expect(fatpaws).toBe("Owes\nbrowncat : $0\ncalico : $0");

  });

});
