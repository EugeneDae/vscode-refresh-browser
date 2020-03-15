const BROWSER_TYPES: { [key: string]: Array<string> } = {
    'safari': [
        'Safari', 'Webkit',
        'Safari Technology Preview'
    ],

    'chrome': [
        'Google Chrome', 'Opera', 'Microsoft Edge',
        'Vivaldi', 'Brave Browser', 'Yandex',
        'Chromium', 'Google Chrome Canary'
    ]
};

const BROWSER_SCRIPTS: { [key: string]: Function }= {
    'safari': (browserName: string, urlPrefixes: Array<string>) => `
${COMMON_SCRIPT}

set URL_PREFIXES to {${urlPrefixes.map(v => `"${v}"`).join(',')}}

tell application "${browserName}"
    set _target to current tab of front window

    if ((count of URL_PREFIXES) > 0) then
        repeat with _window in windows
            repeat with _tab in tabs of _window
                if (my startswith(URL of _tab, URL_PREFIXES)) then
                    set _target to _tab
                    set current tab of _window to _tab
                    exit repeat
                end if
            end repeat
        end repeat
    end if

    if (URL of _target is not missing value) then
        set URL of _target to (URL of _target)
    end if
end tell
    `,

    'chrome': (browserName: string, urlPrefixes: Array<string>) => `
${COMMON_SCRIPT}

set URL_PREFIXES to {${urlPrefixes.map(v => `"${v}"`).join(',')}}

tell application "${browserName}"
    set _wIndex to 0
    set _tIndex to 0
    set _target to active tab of front window

    if ((count of URL_PREFIXES) > 0) then
        repeat with _window in windows
            set _wIndex to _wIndex + 1
            repeat with _tab in tabs of _window
                set _tIndex to _tIndex + 1

                if (my startswith(URL of _tab, URL_PREFIXES)) then
                    set _target to _tab
                    set active tab index of window _wIndex to _tIndex
                    exit repeat
                end if
            end repeat
        end repeat
    end if

    reload _target
end tell
    `,
};

const COMMON_SCRIPT = `
on startswith(_str, _list)
    repeat with i in _list
        if _str starts with i then return true
    end repeat
    false
end startswith
`;

const Script: { [key: string]: Function } = {
    getBrowserType(browserName: string) {
        return Object.keys(BROWSER_TYPES).find(key => BROWSER_TYPES[key].includes(browserName));
    },

    get(browserName: string, urlPrefixes: Array<string>) {
        const browserType = this.getBrowserType(browserName);

        if (browserType !== undefined) {
            return BROWSER_SCRIPTS[browserType](browserName, urlPrefixes);
        }
    }
};

export default Script;
