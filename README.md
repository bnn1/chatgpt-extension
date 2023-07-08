# ChatGPT Extension

The ChatGPT Extension is a powerful enhancement tool for the ChatGPT website, designed to streamline and enrich your interactions with the platform. This Google Chrome extension, built with Vite and React, introduces a suite of new functionalities that allow for a more efficient and personalized user experience.

## Warning
The extension is experimental! The use of extension may result in data loss! Use at your own risk.
Future development is postponed due to more important projects on the list.

---

## Table of Contents

- [ChatGPT Extension](#chatgpt-extension)
  - [Warning](#warning)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Loading the Extension in Chrome](#loading-the-extension-in-chrome)
  - [Known Bugs](#known-bugs)
  - [Contributing](#contributing)
  - [License](#license)
  - [User Data and Privacy](#user-data-and-privacy)
---

## Features

- **Batch Chat Deletion**: No more one-by-one chat removals. With this feature, you can select and delete multiple chat threads simultaneously, making chat management a breeze.
- **Conversation History Export**: Preserve your intellectual exchanges and creative ideas by exporting your chat history. This feature provides an easy way to keep a record of your conversations for future reference or analysis &mdash; **postponed**.
- **Prompt Bookmarks**: Save the prompts you find yourself using frequently. This feature allows you to bookmark and easily access your favorite or most used prompts, saving you time and enhancing your productivity &mdash; **postponed**.
---
## Getting Started  

Follow these instructions to get a local copy of the project up and running on your machine for development and testing purposes.

### Prerequisites

- Node.js and npm: This project requires Node.js. If it's not already installed on your computer, you can download it [here](https://nodejs.org/en/download/).
- Google Chrome: As this is a Chrome extension, Google Chrome is necessary. If you don't have it installed, you can download it [here](https://www.google.com/chrome/).

### Installation

1. **Clone the Repository**: Use the following command in your terminal to clone the repository to your local machine:

```bash
git clone git@github.com:bnn1/chatgpt-extension.git
```

2. **Navigate to the Project Directory**: Use the following command to navigate to the project directory:

```bash
cd chatgpt-extension
```

3. **Install Dependencies**: Run the following command to install all the necessary dependencies:

```bash
yarn install
```

4. **Start the Development Server**: Use the following command to start the development server:

```bash
yarn dev
```
---

## Loading the Extension in Chrome

1. **Build the Project**: Before loading the extension in Chrome, build the project using the following command:

```bash
yarn build
```

2. **Load the Extension**: Open Google Chrome and go to `chrome://extensions/`. Enable Developer mode by clicking the toggle switch at the top right. Click the "Load unpacked" button and select the `dist` folder in your project directory.
---

## Known Bugs

1. Checkboxes disappear when changing url from `/` to `/c/conversationId`
2. Sometimes extension drops dead and doesn't react to button clicks. Reload the extension to fix.

## Contributing

We appreciate and welcome all contributions. Please read our [CONTRIBUTING](CONTRIBUTING.md) guidelines before making a contribution.

---

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE.md) file.

---

## User Data and Privacy

The ChatGPT Extension operates with certain browser permissions to provide its functionalities. This includes utilization of local storage and access to secure bearer token. While these permissions are necessary for the extension to function properly, we understand the importance of user privacy and data security.

Please be aware that while the extension does have access to this data, it is used solely for the purpose of enhancing your experience on the ChatGPT website and is not shared, sold, or used for any other purposes. We are committed to maintaining the highest standards of privacy and security.

However, as with any tool that has access to sensitive data, we encourage users to ensure their systems are secure and to use this extension responsibly. If you have any questions or concerns about how the ChatGPT Extension handles data, please feel free to [reach out](https://t.me/barysbarbarys) to us.
