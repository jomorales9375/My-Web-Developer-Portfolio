#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

// Function to fetch GitHub repositories
function fetchGitHubRepos(username) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: `/users/${username}/repos?sort=updated&per_page=10`,
            method: 'GET',
            headers: {
                'User-Agent': 'Portfolio-Website',
                'Accept': 'application/vnd.github.v3+json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const repos = JSON.parse(data);
                    resolve(repos);
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

// Function to generate project HTML
function generateProjectHTML(project, index) {
    const category = getProjectCategory(project.language || 'Other');
    const techTags = getTechTags(project.language, project.topics || []);
    
    return `
                <!-- Project ${index + 1} -->
                <div class="project-card" data-category="${category}">
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" alt="${project.name}">
                        <div class="project-overlay">
                            <div class="project-links">
                                <a href="${project.homepage || project.html_url}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                                <a href="${project.html_url}" class="project-link" target="_blank"><i class="fab fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="project-info">
                        <h3>${formatProjectName(project.name)}</h3>
                        <p>${project.description || 'A well-crafted project showcasing modern development practices and clean code architecture.'}</p>
                        <div class="project-tech">
                            ${techTags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>`;
}

// Function to determine project category
function getProjectCategory(language) {
    const categories = {
        'JavaScript': 'web',
        'TypeScript': 'web',
        'HTML': 'web',
        'CSS': 'web',
        'Python': 'web',
        'Java': 'web',
        'C#': 'web',
        'PHP': 'web',
        'Ruby': 'web',
        'Go': 'web',
        'Rust': 'web',
        'Swift': 'mobile',
        'Kotlin': 'mobile',
        'React': 'web',
        'Vue': 'web',
        'Angular': 'web',
        'Node.js': 'web'
    };
    
    return categories[language] || 'web';
}

// Function to get tech tags
function getTechTags(language, topics) {
    const tags = [];
    
    if (language) {
        tags.push(language);
    }
    
    // Add relevant topics as tags
    const relevantTopics = topics.filter(topic => 
        ['react', 'vue', 'angular', 'node', 'express', 'mongodb', 'mysql', 'postgresql', 'docker', 'aws', 'firebase', 'typescript', 'javascript', 'html', 'css', 'python', 'java', 'php'].includes(topic.toLowerCase())
    );
    
    tags.push(...relevantTopics.slice(0, 2));
    
    return tags.length > 0 ? tags : ['Web Development'];
}

// Function to format project name
function formatProjectName(name) {
    return name
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Function to update portfolio.html
function updatePortfolioFile(projectsHTML) {
    try {
        let content = fs.readFileSync('portfolio.html', 'utf8');
        
        // Find the projects grid section
        const startMarker = '            <div class="projects-grid">';
        const endMarker = '            </div>';
        
        const startIndex = content.indexOf(startMarker);
        const endIndex = content.indexOf(endMarker, startIndex + startMarker.length);
        
        if (startIndex === -1 || endIndex === -1) {
            throw new Error('Could not find projects grid section in portfolio.html');
        }
        
        // Replace the projects section
        const beforeProjects = content.substring(0, startIndex + startMarker.length);
        const afterProjects = content.substring(endIndex);
        
        const newContent = beforeProjects + '\n' + projectsHTML + '\n' + afterProjects;
        
        fs.writeFileSync('portfolio.html', newContent);
        console.log('✅ Successfully updated portfolio.html');
        
    } catch (error) {
        console.error('❌ Error updating portfolio.html:', error.message);
        throw error;
    }
}

// Main function
async function main() {
    const username = process.argv[2];
    
    if (!username) {
        console.log('❌ Please provide your GitHub username');
        console.log('Usage: node update-portfolio-projects.js YOUR_GITHUB_USERNAME');
        console.log('\nExample: node update-portfolio-projects.js johndoe');
        process.exit(1);
    }
    
    try {
        console.log(`🔍 Fetching repositories for ${username}...`);
        const repos = await fetchGitHubRepos(username);
        
        if (repos.length === 0) {
            console.log('❌ No repositories found or username is incorrect');
            process.exit(1);
        }
        
        console.log(`✅ Found ${repos.length} repositories`);
        
        // Filter out forks and sort by stars/updated
        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
            .slice(0, 6);
        
        if (filteredRepos.length === 0) {
            console.log('❌ No original repositories found (only forks)');
            process.exit(1);
        }
        
        console.log(`📝 Generating portfolio projects from ${filteredRepos.length} repositories...`);
        
        // Generate the HTML
        const projectsHTML = filteredRepos.map((repo, index) => 
            generateProjectHTML(repo, index)
        ).join('\n');
        
        // Update the portfolio file
        updatePortfolioFile(projectsHTML);
        
        console.log('\n🎉 Portfolio updated successfully!');
        console.log(`📊 Updated ${filteredRepos.length} projects:`);
        
        filteredRepos.forEach((repo, index) => {
            console.log(`   ${index + 1}. ${formatProjectName(repo.name)} (${repo.language || 'Other'})`);
        });
        
        console.log('\n💡 Next steps:');
        console.log('1. Run: node update-version.js');
        console.log('2. Refresh your browser to see the changes');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.message.includes('Not Found')) {
            console.log('💡 Make sure your GitHub username is correct and your repositories are public');
        }
    }
}

main(); 