import { client } from '../lib/sanity';

export async function getProjects() {
  try {
    return await client.fetch(`*[_type == "project"] | order(date desc) {
      _id,
      title,
      clientName,
      description,
      date,
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      gallery[] {
        "url": asset->url,
        "alt": alt
      },
      tags[],
      featured
    }`);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getGallery() {
  try {
    return await client.fetch(`*[_type == "gallery"] | order(_createdAt desc) {
      _id,
      title,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      category,
      featured
    }`);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export async function getVideos() {
  try {
    return await client.fetch(`*[_type == "video"] | order(date desc) {
      _id,
      title,
      description,
      "videoUrl": videoFile.asset->url,
      "thumbnailUrl": thumbnail.asset->url,
      "thumbnailAlt": thumbnail.alt,
      date,
      category,
      featured
    }`);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export async function getFeaturedContent() {
  try {
    const [projects, gallery, videos] = await Promise.all([
      client.fetch(`*[_type == "project" && featured == true] | order(date desc) [0...3] {
        _id,
        title,
        clientName,
        description,
        date,
        "imageUrl": mainImage.asset->url,
        "imageAlt": mainImage.alt,
        tags[],
        featured
      }`),
      client.fetch(`*[_type == "gallery" && featured == true] | order(_createdAt desc) [0...6] {
        _id,
        title,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        category,
        featured
      }`),
      client.fetch(`*[_type == "video" && featured == true] | order(date desc) [0...2] {
        _id,
        title,
        description,
        "videoUrl": videoFile.asset->url,
        "thumbnailUrl": thumbnail.asset->url,
        "thumbnailAlt": thumbnail.alt,
        date,
        category,
        featured
      }`)
    ]);
    
    return { projects, gallery, videos };
  } catch (error) {
    console.error('Error fetching featured content:', error);
    return { projects: [], gallery: [], videos: [] };
  }
}
