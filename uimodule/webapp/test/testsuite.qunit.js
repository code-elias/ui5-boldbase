window.suite = function () {
    "use strict";

    const oSuite = new parent.jsUnitTestSuite(),
        sContextPath = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);

    // oSuite.addTestPage(`${sContextPath}integration/opaTests.qunit.html`);
    oSuite.addTestPage(`${sContextPath}unit/unitTests.qunit.html`);

    return oSuite;
};
