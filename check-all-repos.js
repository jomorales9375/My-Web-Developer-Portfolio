#!/usr/bin/env node

const https = require('https');

// Function to fetch all GitHub repositories (including forks)
function fetchAllGitHubRepos(username) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: `/users/${username}/repos?sort=updated&per_page=100&type=all`,
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

// Main function
async function main() {
    const username = process.argv[2];
    
    if (!username) {
        console.log('❌ Please provide your GitHub username');
        console.log('Usage: node check-all-repos.js YOUR_GITHUB_USERNAME');
        process.exit(1);
    }
    
    try {
        console.log(`🔍 Fetching ALL repositories for ${username} (including forks)...`);
        const repos = await fetchAllGitHubRepos(username);
        
        if (repos.length === 0) {
            console.log('❌ No repositories found');
            process.exit(1);
        }
        
        console.log(`✅ Found ${repos.length} total repositories`);
        
        // Look for car marketplace related projects
        const carProjects = repos.filter(repo => {
            const name = repo.name.toLowerCase();
            const description = (repo.description || '').toLowerCase();
            return name.includes('car') || 
                   name.includes('auto') || 
                   name.includes('vehicle') || 
                   name.includes('marketplace') ||
                   description.includes('car') ||
                   description.includes('auto') ||
                   description.includes('vehicle') ||
                   description.includes('marketplace');
        });
        
        if (carProjects.length > 0) {
            console.log('\n🚗 Found potential car marketplace projects:');
            carProjects.forEach((repo, index) => {
                console.log(`\n${index + 1}. ${repo.name}`);
                console.log(`   Description: ${repo.description || 'No description'}`);
                console.log(`   Language: ${repo.language || 'Not specified'}`);
                console.log(`   URL: ${repo.html_url}`);
                console.log(`   Fork: ${repo.fork ? 'Yes' : 'No'}`);
                console.log(`   Updated: ${repo.updated_at}`);
            });
        } else {
            console.log('\n❌ No car marketplace projects found in your repositories');
            console.log('\n📋 All your repositories:');
            repos.forEach((repo, index) => {
                console.log(`${index + 1}. ${repo.name} (${repo.language || 'Not specified'}) - ${repo.fork ? 'Fork' : 'Original'}`);
            });
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

main(); 