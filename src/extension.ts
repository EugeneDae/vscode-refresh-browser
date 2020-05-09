import * as vscode from 'vscode';
import * as applescript from 'applescript';
import Script from './script';

function showInformationMessage(msg: string): void {
    vscode.window.showInformationMessage('[Refresh Browser] ' + msg);
}

function showErrorMessage(msg: string): void {
    vscode.window.showErrorMessage('[Refresh Browser] ' + msg);
}

function runScript(script: string): Promise<any> {
    return new Promise((resolve, reject) => {
        applescript.execString(script, (err: any, rtn: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(rtn);
            }
       });
    });
}

/*
This doesn't work due to a bug:
https://github.com/microsoft/vscode/issues/96643

async function executeTask(task: vscode.Task) {
	const execution = await vscode.tasks.executeTask(task);

    return new Promise<void>(resolve => {
        let disposable = vscode.tasks.onDidEndTask(e => {
			// console.log(e.execution.task.group === vscode.TaskGroup.Build);
			if (e.execution.task === execution.task) {
				disposable.dispose();
				resolve();
			}
        });
    });
}
*/

async function executeBuildTask(task: vscode.Task) {
	// Temporary workaround, see above
	const execution = await vscode.tasks.executeTask(task);

    return new Promise<void>(resolve => {
        let disposable = vscode.tasks.onDidEndTask(e => {
			if (e.execution.task.group === vscode.TaskGroup.Build) {
				disposable.dispose();
				resolve();
			}
        });
    });
}

async function getBuildTasks() {
	return new Promise<vscode.Task[]>(resolve => {
		vscode.tasks.fetchTasks().then((tasks) => {
			resolve(tasks.filter((task) => task.group === vscode.TaskGroup.Build));
		});
	});
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.refreshBrowser', async () => {
		const config = vscode.workspace.getConfiguration('refreshBrowser');

		if (config.get('runBuildTask') === true) {
			const buildTasks = await getBuildTasks();
			for (const buildTask of buildTasks) {
				await executeBuildTask(buildTask);
			}
		}

		const script = Script.get(
			config.get('browser') as string,
			config.get('urlPrefixes')
		);

		runScript(script).catch((err) => {
			console.log(err);
			vscode.window.showErrorMessage('An error occurred.');
		});
	}));
}

export function deactivate() {}
