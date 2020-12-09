import React from 'react';
import { Link } from '../../layout/Link/Link';
import { Avatar } from '../Avatar/Avatar';
import { CoverImage } from '../CoverImage/CoverImage';
import { Author } from '../types';

export interface PostPreviewProps {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
}

export const PostPreview: React.FunctionComponent<PostPreviewProps> = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) => {
  return (
    <div>
      <div>
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3>
        <Link href={`/posts/${slug}`}>{title}</Link>
      </h3>
      <div>{/* <DateFormatter dateString={date} /> */}</div>
      <p>{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
};
