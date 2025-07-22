import FeaturedImage from './FeaturedImage'
import CountrySelectorNav from "@components/common/Country-selector-Nav";
import React from "react";
import RelatedPost from "@components/pages/blog/RelatedPost";
import {postList} from "@/constants/postList";


const Blog = () => {
    return (
        <div className="w-[100%] h-auto md:mt-[220px] mt-40 ">
            <CountrySelectorNav />
            <FeaturedImage />
            <RelatedPost relatedPost={postList}/>
        </div>
    )
}


export default Blog;