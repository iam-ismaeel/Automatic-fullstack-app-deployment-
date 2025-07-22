"use client"
import React, { useState } from "react";
import Link from "next/link";
import { Share, Close, WhatsApp, Instagram, Twitter, Facebook } from "@icons";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

type shareProps = {
  shareUrl: string;
  content: string;
};
const ShareButton = ({ shareUrl, content }: shareProps) => {
  const [openShare, setOpenShare] = useState<boolean>(false);

  const handleShare = () => {
    setOpenShare(!openShare);
  };
  return (
    <div
      className={`socials-wrapper ${
        openShare && "active"
      } flex items-center gap-1 `}
      onClick={(e) => {
        handleShare();
        e.stopPropagation();
      }}
    >
      <button className="share-button">
        {!openShare ? (
          <Share className="text-2xl" />
        ) : (
          <Close className="text-2xl" />
        )}
      </button>
      <ul className="socials-menu">
        <li className="social">
          <FacebookShareButton url={shareUrl} hashtag="#hashtag">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </li>
        {/* <li className="social">
          <TelegramShareButton url={shareUrl} title={content}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </li> */}
        <li className="social">
          <TwitterShareButton
            url={shareUrl}
            title={content}
            hashtags={["hashtag1", "hashtag2"]}
          >
            <Twitter size={32} round />
          </TwitterShareButton>
        </li>

        <li className="social">
          <WhatsappShareButton url={shareUrl} title={content}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </li>
      </ul>
    </div>
  );
};

export default ShareButton;
