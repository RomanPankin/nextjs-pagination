import React from "react";
import Link from 'next/link';
import Head from 'next/head';

interface Blog {
  title: string;
  content: string;
}

const blogs = [...Array(105)].map<Blog>((_, index) => ({
  title: `This is blog ${index+1}`,
  content: `Content for the blog ${index+1}`
}))

const pageSize = 10;

export default function PageNumber(
     { pageNumber, totalPages, blogs } :
     { pageNumber: number, totalPages: number, blogs: Blog[] }
  ) {
  const changeColor = () => {
    if (typeof window !== "undefined") {
       document.body.style.backgroundColor = 'yellow';
    }
  };

  return (
    <>
      {/* Tags */}
      <Head>
        <title>Page Number {pageNumber}</title>

        {pageNumber > 1 ? <link rel="prev" href={`/page/${pageNumber-1}/`} /> : null}
        {pageNumber < totalPages ? <link rel="next" href={`/page/${pageNumber+1}`} /> : null}
        <link rel="canonical" href={`/page/${pageNumber}`} />
      </Head>

      {/* Page */}
      <h1>Page Number {pageNumber}/{totalPages}</h1>

      {blogs.map(blog => (
        <p key={blog.title}>{blog.title} - {blog.content}</p>
      ))}

      <p>
        {pageNumber > 1 ?
        <Link href={`/page/${pageNumber-1}`}>
          <a>← Prev page &nbsp; &nbsp;</a>
        </Link> : null}
        
        {pageNumber < totalPages ?
        <Link href={`/page/${pageNumber+1}`}>
          <a>Next page →</a>
        </Link> : null}
      </p>

      <button onClick={() => changeColor()}>
        Change background color
      </button>
    </>
  );
}

export async function getStaticProps({ params: { pageNumber }}: { params: { pageNumber: string }}) {
  const start = (+pageNumber - 1) * pageSize;
  const end = start + pageSize;
  const content = blogs.filter((_, index) => index >= start && index < end);

  return {
    props: {
        pageNumber: +pageNumber,
        totalPages: Math.ceil(blogs.length / pageSize),
        blogs: content
    },
  }
}

export async function getStaticPaths() {
  const paths = [...Array(Math.ceil(blogs.length / pageSize))].map((blog, index) => ({ params: { pageNumber: `${index+1}`}}));

  return {
    paths,
    fallback: false
  };
}