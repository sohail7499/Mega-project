import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        // useForm() se mila control object, jo Controller ko React Hook Form se connect karta hai
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value}
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              license_key: "gpl",
              promotion: false,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            // plugins → features available karata hai
            // toolbar → un features ke buttons/menu ko editor me show/control karta hai
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
