# Swagger Preview

This project contains an extension to VS Code, allowing you to preview a [Swagger 2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md) document within the VS Code UI,
much like you can do with markdown files.

The extension is implemented in TypeScript, in the file [swaggerpreview/src/extension.ts](swaggerpreview/src/extension.ts). In response to edits to a Swagger JSON document, it parses the data and generates HTML that is then displayed in a preview window.

Note: at this time, the plugin does not work very well if you are using a dark theme in VS Code. Switch to the light theme while using it.

## Installation

There is no installer for this plugin. Instead, you copy three files in place.

Under your VS Code home folder, create a 'swaggerpreview' folder under '.vscode/extensions'. The home folder is found under ~/ on Linux and OS X, under %USERPROFILE% on Windows. Then, create a folder swaggerpreview/out/src,
copy the files from the out/src directory in this repo, and the package.json file into the top-level 'swaggerpreview' folder.

Restart VS Code, open a Swagger file, and press F1. This should pop open the command prompt. The command to look for is named 'Swagger Preview.' When selected, it should create a second window pane and display a rendering of the Swagger data as documentation-style HTML.

You may want to add a keybinding for the command. For example, I've been using this:

```
	{ "key": "ctrl+shift+q", "command": "extension.showSwaggerPreview" }
```

While editing the Swagger document, you will notice that the preview pane is updated as you type, but you cannot edit text in the preview document directly.

Scrolling one window or moving the caret does not scroll the other window.

Some section headers are marked with a triangle "arrow," which indicates that it is collapsable. For long documents, this may be a meaningful way of getting a better overview of the document. However, when the Swagger document is edited, the preview pane is completely redrawn, sending all collapsed/expanded sections back to their original state. Editing does not scroll the preview back to the top, so the preview window position is, fortunately, not changed on edits to the document.

## Missing Features

Information from the `securityDefinitions,` `security,` `tags,` and `externalDocs` sections are not displayed.
