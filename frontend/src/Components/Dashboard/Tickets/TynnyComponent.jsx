 import React, { useRef } from 'react';
 import { Editor } from '@tinymce/tinymce-react';

 export default function TynnyComponent() {
   const editorRef = useRef(null);
   const log = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
     }
   };
   return (
     <div className='border border-gray-300 rounded-md'>
       <Editor
         apiKey='d0phs830m1lya2tkztd0t7z5wkcqu0ux61rfyer1r1qhrb3y'
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue=""
         init={{
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
     </div>
   );
 }
