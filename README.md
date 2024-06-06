# CeShareLocalStorage

The purpose of this extension is to facilitate the seamless transfer of local storage values and cookies between different browser tabs, allowing users to effortlessly synchronize data across multiple web pages. This is particularly useful for web developers and testers who need to maintain consistent session states or configurations across different tabs for efficient workflow management.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

## Installation

- Clone the Repository: open your terminal and run the following command to clone the repository:

```sh
git clone https://github.com/02900/ce-copy-local-storage
```

- Install Angular CLI: ensure you have Angular CLI version 16 or higher installed. You can install it globally using npm:

```sh
npm install -g @angular/cli@^16
```

- Install Dependencies: navigate to the project directory and install the required dependencies:

```sh
cd ./ce-copy-local-storage
npm install
```

- Build the Project: use Angular CLI to build the project:

```sh
ng build
```

- This will create the necessary files in the ./dist/ce-copy-local-storage directory.

- Enable Developer Mode in Chrome: open your Chrome browser and navigate to the Extensions page:

```chrome://extensions/```

- Enable Developer Mode by toggling the switch in the upper-right corner.

- Load Unpacked Extension: click on the “Load unpacked” button.
- Select the ./dist/ce-copy-local-storage folder from your project directory.

## Description

The Transfer Local Storage and Cookies Chrome Extension is a powerful tool designed to streamline the process of synchronizing data across multiple browser tabs. Whether you’re a web developer, tester, or power user, this extension simplifies your workflow by allowing you to effortlessly transfer local storage values and cookies from one tab to another.

Key Features:

- Seamless Data Transfer: Easily select a source tab and target tab to transfer local storage values and cookies with a single click.
- User-Friendly Interface: Intuitive and easy-to-use interface for selecting tabs and specific data to transfer.
- Persistent URL Storage: Save the last entered target URL to local storage, ensuring it is available the next time you open the extension.
- Broad Compatibility: Works with any website, providing flexibility and convenience for various use cases.
- Enhanced Productivity: Ideal for developers and testers who need to maintain consistent session states across different tabs, making development and testing more efficient.

How It Works:

1. Select Source Tab: Choose the tab from which you want to transfer local storage values and cookies.
2. Select Target Tab: Choose the tab to which you want to transfer the data.
3. Choose Data: Select specific local storage keys and cookies to transfer.
4. Sync Data: Click the “Sync” button to transfer the selected data.
5. Transfer to New URL: Enter a new URL and click the “Open URL with Transfer” button to open the new URL in a new tab with the transferred data.
6. Transfer to New URL: Enter a new URL and click the “Open URL with Transfer” button to open the new URL in a new tab with the transferred data.

This extension enhances your browsing experience by providing a simple yet powerful way to manage and synchronize data across multiple tabs, ensuring your sessions are always up-to-date and consistent.

## Permissions

To provide these features, the extension requires permissions to access scripting, storage, tabs, activeTab, cookies, and host permissions. These permissions are necessary to interact with the browser tabs, manipulate local storage and cookies, and store user preferences securely.

- Scripting: This permission is necessary to execute scripts that handle the transfer of local storage between tabs. It allows the extension to perform actions on the web pages in the tabs, ensuring the data transfer process is executed properly.
- Storage: This permission is required to store the last entered URL in the extension’s local storage. It ensures that the user’s input is saved and retrieved when the extension is reopened, providing a seamless user experience.
- Tabs: This permission is essential for accessing information about the user’s open tabs, such as URLs and tab IDs. It enables the extension to select source and target tabs for transferring data.
- activeTab: This permission allows the extension to access the currently active tab and perform actions on it. It ensures that the extension can identify and interact with the active tab for data transfer purposes.
- cookies: This permission is crucial for accessing and manipulating cookies in the source and target tabs. It enables the extension to transfer cookies from one tab to another, maintaining session continuity.
- Host permission: The extension requires access to all URLs (_://_/\*) to facilitate the transfer of local storage and cookies across any website. This broad access ensures that the extension can function correctly regardless of the specific domains being used by the user.

## Development server

- Run `ng build --watch` for a dev server.
- Go to chrome://extensions/.
- At the top right, turn on Developer mode.
- Click Load unpacked.
- Find and select the extension under /dist folder.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
