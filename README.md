# ChatGPT extension

Adds an ability for bulk deletes. 

The extension is buggy and don't have many features but it probably will not be updated in the near future.

You are free to do whatever you want with this extension: fork, edit, sell, whatever. You can even say "man this extension is shit", I won't mind.

Hopefully it does what it suppose to do.

## Usage

1. `git clone git@github.com:bnn1/chatgpt-extension.git`
2. `cd chatgpt-extensions`
3. `pnpm install`
4. `pnpm build`

The output is in the `dist` directory. You can load unpacked extension or use an extension file pre-packed by me in the releases.

## How it works

It intercepts your request to openai backend and extracts the Bearer token. Then using the token it requests all your conversations. Then it creates checkboxes with value assigned to the conversation ID. And the `delete` button handler deletes all checked conversations with 200ms delay before each request.

## Known bugs

1. Checkboxes only exist on the first 28 conversations, if you need to keep the first 28 conversations and delete later conversations, sorry, you're out of luck
2. When entering a conversation from the main url (i.e. chat.openai.com -> chat.openai.com/c/conversation_id) the checkboxes disappear. Reload the page for them to appear