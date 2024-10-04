import { Editor } from '@tinymce/tinymce-react';

const TinyMCE = ({ editorRef }) => {
    return (
        <>
            <Editor
                apiKey='v12ld4fyiekikay5d5tuv6j4578f6daxybv4qrm2a0oymp5j'
                onInit={(_evt, editor) => editorRef.current = editor}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    );
}
export default TinyMCE;