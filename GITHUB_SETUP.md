# 🔗 GitHub Integration Guide

## 📋 **Quick Setup**

### **Option 1: Automatic Update (Recommended)**
```bash
# Replace YOUR_GITHUB_USERNAME with your actual GitHub username
node update-portfolio-projects.js YOUR_GITHUB_USERNAME
```

### **Option 2: Manual Preview**
```bash
# See what projects would be generated first
node fetch-github-projects.js YOUR_GITHUB_USERNAME
```

## 🎯 **What These Scripts Do:**

### **`update-portfolio-projects.js`**
- ✅ Fetches your GitHub repositories
- ✅ Filters out forks (only original projects)
- ✅ Sorts by stars and recent activity
- ✅ Automatically updates `portfolio.html`
- ✅ Generates proper tech tags and categories
- ✅ Links to your actual GitHub repositories

### **`fetch-github-projects.js`**
- 📋 Shows you the HTML that would be generated
- 🔍 Lets you preview before making changes
- 📝 Manual copy-paste option

## 🚀 **Step-by-Step Process:**

### **1. Find Your GitHub Username**
- Go to your GitHub profile
- Your username is in the URL: `github.com/YOUR_USERNAME`
- Example: `github.com/johndoe` → username is `johndoe`

### **2. Run the Update Script**
```bash
node update-portfolio-projects.js YOUR_USERNAME
```

### **3. Update Browser Cache**
```bash
node update-version.js
```

### **4. Refresh Your Browser**
- Go to `http://localhost:8000/portfolio.html`
- Your real projects should now be displayed!

## 📊 **What Gets Updated:**

### **Project Information:**
- ✅ **Project Names** → Your actual repository names
- ✅ **Descriptions** → Repository descriptions
- ✅ **Tech Stack** → Based on repository language and topics
- ✅ **GitHub Links** → Direct links to your repositories
- ✅ **Live Links** → Homepage URLs if available

### **Smart Filtering:**
- 🔍 **Original Projects Only** → No forks
- ⭐ **Best Projects First** → Sorted by stars
- 📅 **Recent Activity** → Most recently updated
- 🎯 **Top 6 Projects** → Your best work

## 🛠️ **Customization Options:**

### **If You Want to Customize:**
1. Run `fetch-github-projects.js` first to see the HTML
2. Copy the generated HTML
3. Manually edit `portfolio.html`
4. Replace the project cards section

### **Adding Custom Images:**
- Replace the Unsplash image URLs with your own screenshots
- Upload project images to your repository
- Use GitHub's repository preview images

## 🔧 **Troubleshooting:**

### **"No repositories found"**
- ✅ Make sure your GitHub username is correct
- ✅ Ensure your repositories are public
- ✅ Check that you have original repositories (not just forks)

### **"Could not find projects grid section"**
- ✅ Make sure `portfolio.html` exists
- ✅ Ensure the file structure is correct

### **"Error updating portfolio.html"**
- ✅ Check file permissions
- ✅ Make sure the file isn't open in another program

## 🎨 **Next Steps:**

### **After Updating Projects:**
1. **Customize Descriptions** → Edit project descriptions in `portfolio.html`
2. **Add Screenshots** → Replace placeholder images with actual project screenshots
3. **Update Links** → Add live demo links if available
4. **Customize Tech Tags** → Add more specific technologies used

### **Keep It Updated:**
- Run the script whenever you add new projects to GitHub
- Update version numbers with `node update-version.js`
- Refresh your browser to see changes

## 💡 **Pro Tips:**

### **For Better Project Presentation:**
- Add detailed README files to your GitHub repositories
- Include screenshots in your repository
- Set up GitHub Pages for live demos
- Use descriptive repository names

### **For Portfolio Enhancement:**
- Add project screenshots to your repositories
- Create detailed project descriptions
- Include setup instructions in README files
- Add live demo links in repository descriptions

---

**🎉 Your portfolio will now showcase your actual GitHub projects instead of placeholder content!** 