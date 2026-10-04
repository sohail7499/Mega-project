import React, { useCallback } from "react";
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
  // Redux store ke auth slice ke andar jo userData hai, usko nikaal kar userData variable mein store karo.

  const submit = async (data) => {
    // update section
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
      //new post create
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    // watch → form ke changes ko continuously observe karta hai
    // subscription → watch se milne wala listener/subscription hai,
    //                jisse hum baad mein watching ko unsubscribe kar sakte hain

    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    // unsubscribe → component unmount hone par watch ko stop karta hai
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />

        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value));
            // User ne slug input mein jo current value dali hai, usko slugTransform() se slug format mein convert karo aur converted value ko slug field mein set karo.
          }}
        />

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

        <Input
          label="FeaturedImage"
          className="mb-4"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
            {/* Appwrite mein stored image ka ID:
              Aur getFilePreview() us ID se image ka preview URL deta hai. */}
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="status"
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update " : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
