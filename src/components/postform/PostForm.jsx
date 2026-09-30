import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Input, RTE, Select } from "../index";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/service";

function PostForm({ post }) {
  // watch → form values ko observe karta hai
  // setValue → kisi field ki value manually change karta hai
  // getValues → form ki current values read karta hai
  // control → RTE jaise Controller-based component ko React Hook Form se connect karta hai
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  return <div>PostForm </div>;
}

export default PostForm;
