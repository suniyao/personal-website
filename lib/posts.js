import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
 
const postsDirectory = path.join(process.cwd(), 'public/posts');

/**
 * Recursively get all markdown files from posts directory
 */
function getAllMarkdownFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (item === 'legacy') {
        continue;
      }
      // Recursively get files from subdirectories
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}
 
export function getSortedPostsData() {
  // Get all markdown files recursively
  const markdownFiles = getAllMarkdownFiles(postsDirectory);
  
  const allPostsData = markdownFiles.map((fullPath) => {
    // Get relative path from posts directory and remove .md extension
    const relativePath = path.relative(postsDirectory, fullPath);
    const id = relativePath.replace(/\.md$/, '');
 
    // Read markdown file as string
    const fileContents = fs.readFileSync(fullPath, 'utf8');
 
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
 
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}