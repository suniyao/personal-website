# Posts Organization Guide

## 📁 Folder Structure Options

You can now organize your posts in multiple ways:

### Option 1: By Year (Recommended)
```
public/posts/
├── 2024/
│   ├── ross-23-reflection.md
│   └── gravityless-raindrops-on-the-window.md
├── 2025/
│   └── i-know-its-16-but-dont-u-think-91.md
└── 2026/
    └── your-new-post.md
```

### Option 2: By Category
```
public/posts/
├── reflections/
│   ├── ross-23-reflection.md
│   └── ross-24-reflection.md
├── life-updates/
│   └── gravityless-raindrops.md
└── tech/
    └── chord-overtone-notes.md
```

### Option 3: Combination (Year + Category)
```
public/posts/
├── 2024/
│   ├── reflections/
│   └── updates/
└── 2025/
    ├── reflections/
    └── updates/
```

### Option 4: Keep Flat Structure
If you prefer the current flat structure, that still works!

---

## 🖼️ Image Captions - New Syntax

### ✅ NEW WAY (Native Markdown)

Instead of using HTML divs, you can now use standard markdown with the title text:

```markdown
![Description of image](https://example.com/image.jpg "This is the caption that appears below!")
```

The text after the URL in quotes becomes your caption automatically.

### Examples:

**Before (HTML way):**
```markdown
[![](https://example.com/image.jpg)](https://example.com/image.jpg)
<div class="caption">
This is my caption
</div>
```

**After (Markdown way):**
```markdown
![My image](https://example.com/image.jpg "This is my caption")
```

**For clickable images with captions:**
```markdown
[![My image](https://example.com/thumb.jpg "Click to see larger")](https://example.com/full.jpg)
```

---

## 🎨 Caption Styling

Captions automatically:
- Center align
- Use smaller font
- Gray color (#888888)
- Use Spectral font (or Zen Old Mincho for Chinese/Japanese)

You can add language attributes in your frontmatter:
```yaml
---
title: "My Post"
lang: zh
---
```

---

## 📝 Frontmatter Options

Your posts support these fields:

```yaml
---
title: "Your Post Title"
subtitle: "Optional subtitle with *markdown* support"
date: "2024-10-02"
cover: "https://example.com/cover-image.jpg"
category: "reflections"    # Optional: for categorization
tags: ["life", "tech"]      # Optional: for tagging
lang: "zh"                  # Optional: zh, ja, or en
---
```

---

## 🔄 Migration Notes

The new system is **backward compatible** - your existing posts with HTML `<div class="caption">` will still work. But for new posts, use the cleaner markdown syntax!

---

## 📍 URL Structure

The post URL is based on the file path:
- `public/posts/my-post.md` → `/update/my-post`
- `public/posts/2024/my-post.md` → `/update/2024/my-post`
- `public/posts/tech/my-post.md` → `/update/tech/my-post`
