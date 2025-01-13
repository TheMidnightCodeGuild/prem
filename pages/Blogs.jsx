import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Head from "next/head";

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Experience the Divine Stay Near Mahakaleshwar Temple",
      excerpt: "Discover the perfect accommodation just steps away from the sacred Mahakaleshwar Temple. Learn about our special facilities for pilgrims and spiritual seekers.",
      image: "/images/card-1.webp",
      date: "March 15, 2024"
    },
    {
      id: 2,
      title: "Top 5 Tourist Destinations Around Our Hotel",
      excerpt: "Explore the rich cultural heritage of Ujjain with our curated guide to the must-visit attractions within easy reach of Hotel Prem Chaya Inn.",
      image: "/images/card-2.webp", 
      date: "March 10, 2024"
    },
    {
      id: 3,
      title: "Your Ultimate Guide to Ujjain's Simhasth Kumbh Mela",
      excerpt: "Planning to attend the Kumbh Mela? Read our comprehensive guide on accommodation, facilities, and special arrangements during this auspicious event.",
      image: "/images/card-3.webp",
      date: "March 5, 2024"
    }
  ];

  return (
    <>
      <Head>
        <title>Hotel Prem Chaya Inn Blogs - Best Hotel Near Mahakal Temple Ujjain</title>
        <meta name="description" content="Read our blogs about staying near Mahakaleshwar Temple Ujjain. Best hotel in Ujjain near railway station, Mahakal Mandir and Chamunda Temple at low prices." />
        <meta name="keywords" content="Ujjain hotels, Ujjain Mahakaleshwar temple, Ujjain tourist places, best hotels in Ujjain, Prem Chaya Inn, hotel near railway station Ujjain, hotels near Mahakal mandir, hotels near Chamunda temple, budget hotels in Ujjain" />
        <meta property="og:title" content="Hotel Prem Chaya Inn Blogs - Best Hotel Near Mahakal Temple Ujjain" />
        <meta property="og:description" content="Read our blogs about staying near Mahakaleshwar Temple Ujjain. Best hotel in Ujjain near railway station, Mahakal Mandir and Chamunda Temple at low prices." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://premchayainn.com/blogs" />
      </Head>
      <Navbar />
      <div className="pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Our Latest Blog Posts
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`Blogs/${post.id}`}
                    className="inline-block px-4 py-2 bg-[#B4B4DC] text-black rounded hover:bg-[#9494BC] transition-colors duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
