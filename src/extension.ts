import * as vscode from 'vscode';
import * as applescript from 'applescript';
import Script from './script';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.refreshBrowser', () => {
		const config = vscode.workspace.getConfiguration('refreshBrowser');
		const urlPrefixes = config.get('urlPrefixes');

		const script = Script.get(
			config.get('browser') as string,
			config.get('urlPrefixes')
		);

		applescript.execString(script, (err: any, rtn: any) => {
			if (err) {
				console.log(err);
				vscode.window.showErrorMessage('Refresh Browser: an error occurred while executing the script.');
			} else {
				vscode.window.showInformationMessage(rtn);
			}
		});

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
