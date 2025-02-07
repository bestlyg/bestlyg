import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import 'monaco-editor/esm/vs/editor/editor.all.js';
import { useControllableValue } from 'ahooks';
import React from 'react';

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    allowNonTsExtensions: true,
    lib: [],
});

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker();
        }
        return new editorWorker();
    },
};

export function MonacoEditor(props: {
    defaultValue?: string;
    value?: string;
    onChange?: (v: string) => void;
}) {
    const [code, setCode] = useControllableValue(props);
    const editorRef = React.useRef<ReturnType<typeof monaco.editor.create> | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
        if (editorRef.current) return;
        editorRef.current = monaco.editor.create(containerRef.current!, {
            value: code,
            language: 'typescript',
            theme: 'vs-dark',
            minimap: {
                enabled: false,
            },
            scrollBeyondLastLine: false,
            scrollbar: {
                verticalScrollbarSize: 4,
                horizontalScrollbarSize: 8,
            },
            suggest: {
                showStatusBar: false,
                showMethods: false,
                showFunctions: false,
                showClasses: false,
                showVariables: false,
                showConstants: false,
                showProperties: false,
                showEvents: false,
                showOperators: false,
                showKeywords: false,
                showWords: false,
            },
            mouseWheelScrollSensitivity: 0,
            formatOnPaste: true,
            overviewRulerLanes: 0,
            lineNumbersMinChars: 4,
            fontSize: 14,
            fontWeight: '450',
        });
        editorRef.current.onDidChangeCursorSelection(() => {
            setCode(editorRef.current?.getModel()?.getValue() ?? '');
        });
    }, []);
    React.useEffect(() => {
        editorRef.current?.getModel()?.setValue(props.defaultValue ?? '');
    }, [props.defaultValue]);
    return <div ref={containerRef} className="w-full min-h-[400px] h-full" />;
}
