import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface HtmlEditorProps {
    onChange: (data: string) => void;
    editorLoaded: boolean;
    value: string;
}

export default function HtmlEditor({
                                     onChange,
                                     editorLoaded,
                                     value,
                                 }: HtmlEditorProps) {
    const editorRef = useRef<{ CKEditor: typeof CKEditor; ClassicEditor: typeof ClassicEditor }>();
    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        };
    }, []);

    return (
        <>
            {editorLoaded ? (
                <CKEditor
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event: any, editor: any) => {
                        const data = editor.getData();
                        onChange(data);
                    }}
                    config={{
                        extraPlugins: [ UploadAdapterPlugin ],
                        toolbar: [
                            'undo',
                            'redo',
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "link",
                            "bulletedList",
                            "numberedList",
                            "blockQuote",
                            "|",
                            'uploadImage'
                        ],
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </>
    );
}

function UploadAdapterPlugin(editor: any) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader: any) => {
        return new MyUploadAdapter(loader)
    }
}

class MyUploadAdapter {
    private loader: any;
    private url: string;
    private xhr: any;

    constructor(props: any) {
        // CKEditor 5's FileLoader instance.
        this.loader = props;
        // URL where to send files.
        this.url = `/api/v1/image/upload`;
    }

    // Starts the upload process.
    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        } );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest()
        const token = "Bearer " + localStorage.getItem("token") ?? ""

        xhr.open('POST', this.url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Authorization', token)
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve: { (value: unknown): void; (arg0: { default: any; }): void; }, reject: { (reason?: any): void; (arg0: string | undefined): any; } ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${ loader.file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response.url
            });
        } );

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', (evt: { lengthComputable: any; total: any; loaded: any; }) => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
        const data = new FormData();

        this.loader.file.then((result: string | Blob) => {
                data.append('file', result);
                this.xhr.send(data);
            }
        )
    }

}
