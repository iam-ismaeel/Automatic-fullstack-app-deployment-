import {post} from "@/api/post";
import React from "react";
import PostCard from "@components/pages/blog/post-card";

const RelatedPost = ({relatedPost,}: {relatedPost:post[]}) => {
    return (
        <section>
            <div className="flex justify-center items-center mt-10">
                <h3 className="text-large-bold">Related Blog Posts</h3>
            </div>

            <div className="block">
                <div className="flex justify-center items-center">
                    <p className="mt-5 w-[70%] text-center">Stay ahead with the latest industry news, product
                        highlights, and expert tips.
                        Discover valuable insights to help you make informed decisions and get the most out of your
                        Azany
                        experience.</p>
                </div>


            </div>
            <div className="block">
        <div className="mt-10 mb-10 flex justify-center items-center ">
            <div
                className="flex-1 w-[70%] h-full grid grid-cols-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2   gap-y-4 gap-x-5 lg:gap-x-8">
                {relatedPost.map((item: post) => (
                    <PostCard key={item.id} data={item} size="xlarge"/>
                ))}
            </div>
        </div>
        </div>
        </section>
    )
}


export default RelatedPost;