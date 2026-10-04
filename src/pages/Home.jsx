import React, { useState, useEffect, use } from "react";
import { Container, PostForm } from "../components/index";
import appwriteService from "../appwrite/service";

function Home() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });
  }, []);

  if (posts === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="py-2 w-1/4">
              <PostForm {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
