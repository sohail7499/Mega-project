import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/service";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      {/* Puri card ko clickable banata hai aur post ki ID ke basis par uske page par le jata hai */}
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
          {/* Appwrite ki image ID ko preview URL mein convert karke image display karta hai */}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
