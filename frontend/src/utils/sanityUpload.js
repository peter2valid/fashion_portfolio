/**
 * Utility functions for uploading files to Sanity CMS
 */

export async function uploadToSanity(file) {
  const type = file.type;
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'khc2znfk';
  const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
  
  const endpoint = type.startsWith("video")
    ? `https://${projectId}.api.sanity.io/v2021-06-07/assets/files/${dataset}`
    : `https://${projectId}.api.sanity.io/v2021-06-07/assets/images/${dataset}`;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SANITY_TOKEN}`,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

export async function deleteFromSanity(assetId) {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'khc2znfk';
  const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
  
  const endpoint = `https://${projectId}.api.sanity.io/v2021-06-07/assets/${dataset}/${assetId}`;

  try {
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SANITY_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Delete failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}

export function getSanityImageUrl(assetId, width = 800, height = 600) {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'khc2znfk';
  const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}?w=${width}&h=${height}&fit=crop&auto=format`;
}

export function getSanityFileUrl(assetId) {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'khc2znfk';
  const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
  
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}`;
}

