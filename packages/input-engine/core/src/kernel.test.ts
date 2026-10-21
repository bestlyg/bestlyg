import { describe, expect, it } from '@rstest/core';
import {
    applyInputEnginePolicyPatches,
    createInputEngineState,
    deriveInputEngineViewModel,
    inputEngineReducer,
} from './kernel';
import { resolveInputEngineConfig } from './config';

describe('input-engine core', () => {
    it('提交中即使没有禁用文案也禁止重复提交，完成后恢复', () => {
        const config = resolveInputEngineConfig();
        const state = createInputEngineState({ editor: { text: 'hello' } });
        const submitting = inputEngineReducer(state, { type: 'SUBMIT_STARTED' });
        expect(deriveInputEngineViewModel(submitting, config, 'desktop').canSubmit).toBe(false);
        const finished = inputEngineReducer(submitting, { type: 'SUBMIT_FINISHED' });
        expect(deriveInputEngineViewModel(finished, config, 'desktop').canSubmit).toBe(true);
    });

    it('按事件更新编辑器、菜单、工具、选项、语音、附件和引用状态', () => {
        let state = createInputEngineState({
            activeMode: 'ask',
            modes: [
                { id: 'ask', label: '问答' },
                { id: 'doc', label: '文档' },
            ],
            optionGroups: [
                { id: 'model', label: '模型', options: [{ label: '默认模型', value: 'default' }] },
            ],
            references: [{ id: 'ref-1', type: 'message', title: '引用消息' }],
            tools: [{ id: 'network', label: '联网', active: false }],
        });

        state = inputEngineReducer(state, { type: 'EDITOR_CHANGED', value: { text: 'hello' } });
        state = inputEngineReducer(state, { type: 'FOCUS_CHANGED', focused: true });
        state = inputEngineReducer(state, { type: 'COMPOSITION_CHANGED', composing: true });
        state = inputEngineReducer(state, { type: 'MODE_SELECTED', modeId: 'doc' });
        state = inputEngineReducer(state, {
            type: 'TOOL_TOGGLED',
            toolId: 'network',
            active: true,
        });
        state = inputEngineReducer(state, {
            type: 'OPTION_SELECTED',
            groupId: 'model',
            value: 'default',
        });
        state = inputEngineReducer(state, { type: 'VOICE_TOGGLED', active: true });
        state = inputEngineReducer(state, { type: 'TOOL_MENU_OPENED', anchorId: 'plus' });
        state = inputEngineReducer(state, { type: 'SLASH_COMMAND_OPENED', query: 'net' });
        state = inputEngineReducer(state, {
            type: 'ATTACHMENT_ADDED',
            attachment: {
                id: 'file-1',
                name: 'demo.csv',
                type: 'file',
                status: 'uploading',
                progress: 10,
            },
        });
        state = inputEngineReducer(state, {
            type: 'ATTACHMENT_UPDATED',
            id: 'file-1',
            patch: { status: 'ready' },
        });
        state = inputEngineReducer(state, {
            type: 'REFERENCE_ADDED',
            reference: { id: 'ref-2', type: 'link', title: '链接' },
        });
        state = inputEngineReducer(state, { type: 'SUBMIT_STARTED' });
        state = inputEngineReducer(state, { type: 'DISABLED_REASON_SET', reason: '业务禁用' });

        expect(state.editor.text).toBe('hello');
        expect(state.focused).toBe(true);
        expect(state.composing).toBe(true);
        expect(state.activeMode).toBe('doc');
        expect(state.tools[0]?.active).toBe(true);
        expect(state.optionGroups[0]?.selectedValue).toBe('default');
        expect(state.voice.active).toBe(true);
        expect(state.toolMenu).toMatchObject({ open: true, anchorId: 'plus' });
        expect(state.slashCommand).toMatchObject({ open: true, query: 'net' });
        expect(state.attachments[0]).toMatchObject({ id: 'file-1', status: 'ready' });
        expect(state.references).toHaveLength(2);
        expect(state.isSubmitting).toBe(true);
        expect(state.disabledReason).toBe('业务禁用');

        state = inputEngineReducer(state, { type: 'ATTACHMENT_REMOVED', id: 'file-1' });
        state = inputEngineReducer(state, { type: 'REFERENCE_REMOVED', id: 'ref-1' });
        state = inputEngineReducer(state, { type: 'TOOL_MENU_CLOSED' });
        state = inputEngineReducer(state, { type: 'SLASH_COMMAND_CLOSED' });
        state = inputEngineReducer(state, { type: 'SUBMIT_FINISHED' });

        expect(state.attachments).toHaveLength(0);
        expect(state.references.map((item) => item.id)).toEqual(['ref-2']);
        expect(state.toolMenu.open).toBe(false);
        expect(state.slashCommand).toMatchObject({ open: false, query: '' });
        expect(state.isSubmitting).toBe(false);
    });

    it('派生提交状态和策略补丁', () => {
        const config = resolveInputEngineConfig({
            copywriting: {
                overAttachmentLimitReason: '附件太多',
                uploadingDisabledReason: '正在上传',
            },
            policies: { maxAttachmentCount: 1 },
        });

        const emptyState = createInputEngineState();
        expect(deriveInputEngineViewModel(emptyState, config, 'desktop').disableReason).toBe(
            '请输入内容',
        );

        const uploadingState = createInputEngineState({
            attachments: [{ id: 'file-1', name: '上传中.csv', type: 'file', status: 'uploading' }],
        });
        expect(deriveInputEngineViewModel(uploadingState, config, 'desktop').disableReason).toBe(
            '正在上传',
        );

        const overLimitState = createInputEngineState({
            attachments: [
                { id: 'file-1', name: 'a.csv', type: 'file', status: 'ready' },
                { id: 'file-2', name: 'b.csv', type: 'file', status: 'ready' },
            ],
        });
        expect(deriveInputEngineViewModel(overLimitState, config, 'desktop').disableReason).toBe(
            '附件太多',
        );

        const patchedConfig = applyInputEnginePolicyPatches(config, [
            { policies: { allowEmptySubmit: true }, layout: { hiddenSlots: ['toolbar_trailing'] } },
            undefined,
        ]);
        expect(patchedConfig.policies.allowEmptySubmit).toBe(true);
        expect(patchedConfig.layout.hiddenSlots).toEqual(['toolbar_trailing']);
    });

    it('初始化和事件更新时会把 slotConfig 投影为提交文本', () => {
        const state = createInputEngineState({
            editor: {
                slotConfig: [
                    { type: 'text', value: '使用 ' },
                    { key: 'model', props: { options: ['专家'] }, type: 'select', value: '专家' },
                ],
                text: '',
            },
        });
        expect(state.editor.text).toBe('使用 专家');

        const nextState = inputEngineReducer(state, {
            type: 'EDITOR_CHANGED',
            value: {
                skill: { title: '帮我写作', value: 'write' },
                text: ' 标题',
            },
        });
        expect(nextState.editor.text).toBe('write 标题');
    });
});
