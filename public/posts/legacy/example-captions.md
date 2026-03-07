---
title: "Example Post with Image Captions"
subtitle: "Demonstrating the new markdown caption syntax"
date: "2026-03-07"
cover: "/posts/images/rhit-window.png"
category: "examples"
---

## Using the New Caption Syntax

Instead of HTML divs, you can now use native markdown with quotes for captions!

### Example 1: Simple Image with Caption

![A beautiful landscape](/posts/images/rhit-window.png "This is a caption that appears below the image automatically!")

### Example 2: Without Caption

Just omit the title text if you don't want a caption:

![Image without caption](/posts/images/rhit-window.png)

## How It Works

The syntax is: `![alt text](image-url "caption text")`

- **Alt text**: Used for accessibility and shown if image fails to load
- **Image URL**: The path to your image
- **Caption text** (in quotes): Displayed below the image in styled format

This works for all image types - local images in your public folder or external URLs!

## Benefits

✅ Cleaner markdown syntax  
✅ No HTML required  
✅ Better for content portability  
✅ Still supports old `<div class="caption">` method for backward compatibility
