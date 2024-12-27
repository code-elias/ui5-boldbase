# UI5 Template

Author: @eligolam
Languages: .xml, .js

## How to launch

1. Install node modules
```bash
npm i
```

2. Adjust Ports
   a. Fix node port in **_package.json_**
   b. Fix API port in **_common.js_**
   c. Fix yaml port in **_ui5.yaml_**

3. Launch solution
```bash
npm start
```

---
## Base controller Hierarchy
UI5 does not yet have support for JS modules.
To keep controllers clean we decided to use various **Base** controllers to keep logics separated. 

The current **dependency hierarchy** is this: 
[BaseController.js](./uimodule/webapp/controller/BaseController.js) > [BaseAjaxController.js](./uimodule/webapp/controller/BaseAjaxController.js) > [BaseAjaxResponseController.js](./uimodule/webapp/controller/BaseAjaxResponseController.js) > [BaseAjaxErrorController.js](./uimodule/webapp/controller/BaseAjaxErrorController.js) > [BaseErrorController.js](./uimodule/webapp/controller/BaseErrorController.js) > [BaseControllerProject.js](./uimodule/webapp/controller/BaseControllerProject.js) 

All controllers in the App need to depend on [BaseControllerProject.js](./uimodule/webapp/controller/BaseControllerProject.js). 

### BaseController.js
Utility functions for common app operations, including model management, routing, session handling, API requests, and user notifications.

### BaseAjaxController.js
Functions for handling **AJAX requests** with promise handling for API calls. It includes custom functions for building AJAX options, handling responses, and managing errors with custom properties for flexible error management.

#### Usage
```js
BusyIndicator.show(0); // Show busy indicator during the AJAX call

this.getAjaxPromise(url, 'GET' /* Other options */)
  .then(response => {
    const oModel = new JSONModel(response)
    this.setModel(oModel, 'YourModel')
  })
  .catch(error => {
    MessageBox.error(error.Message);
    console.error("Error:", error);
  })
  .finally(() => {
    BusyIndicator.hide(); // Hide busy indicator after AJAX completes
  })
```

### BaseAjaxResponseController.js
Manages AJAX responses, handling success directly and processing errors with custom metadata and error handling logic.

### BaseAjaxErrorController.js
Handles AJAX errors by categorizing them based on their source (frontend or backend), sets an error model with detailed information, and displays an error box making adjustments based on connection issues, authentication errors, or specific API errors.

### BaseErrorController.js
General handling for Errors allowing consistent handling and display of errors within the application.

### BaseControllerProject.js
**Base controller** with project-wide utility functions for consistent usage across the project.