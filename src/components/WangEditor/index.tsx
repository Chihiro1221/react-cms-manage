import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

interface IProp {
  content: string;
  onChange: (content: string) => void;
}
const MyEditor: React.FC<IProp> = props => {
  const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例
  const toolbarConfig = {};
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    if (props.content === '') editor?.clear();
  }, [props.content]);

  const handleEditChange = (editor: IDomEditor) => {
    const content = editor.getHtml();
    props.onChange(content);
  };
  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" style={{ borderBottom: '1px solid #ccc' }} />
        <Editor
          defaultConfig={editorConfig}
          value={props.content}
          onCreated={setEditor}
          onChange={handleEditChange}
          mode="default"
          style={{ height: '500px' }}
        />
      </div>
    </>
  );
};

export default MyEditor;
