const fs = require("fs");
let posts = [];
let categories = [];

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/posts.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                posts = JSON.parse(data);

                fs.readFile('./data/categories.json', 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        categories = JSON.parse(data);
                        resolve();
                    }
                });
            }
        });
    });
}

module.exports.getAllPosts = function(){
    return new Promise((resolve,reject)=>{
        (posts.length > 0 ) ? resolve(posts) : reject("no results returned"); 
    });
}

module.exports.getPostsByCategory = function(category){
    return new Promise((resolve,reject)=>{
        let filPosts = posts.filter(post=>post.category == category);

        if(filPosts.length == 0){
            reject("no results returned")
        }else{
            resolve(filPosts);
        }
    });
}

module.exports.getPostsByMinDate = function(minDateStr) {
    return new Promise((resolve, reject) => {
        let filPosts = posts.filter(post => (new Date(post.postDate)) >= (new Date(minDateStr)))

        if (filPosts.length == 0) {
            reject("no results returned")
        } else {
            resolve(filPosts);
        }
    });
}

module.exports.getPostById = function(id){
    return new Promise((resolve,reject)=>{
        let foundPost = posts.find(post => post.id == id);

        if(foundPost){
            resolve(foundPost);
        }else{
            reject("no result returned");
        }
    });
}

module.exports.addPost = function(postData){
    return new Promise((resolve,reject)=>{
        postData.published = postData.published ? true : false;
        postData.id = posts.length + 1;
        let now = new Date();
        postData.postDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        posts.push(postData);
        resolve();
    });
}

module.exports.getPublishedPosts = function(){
    return new Promise((resolve,reject)=>{
        let filPosts = posts.filter(post => post.published);
        (filPosts.length > 0) ? resolve(filPosts) : reject("no results returned");
    });
}

module.exports.getPublishedPostsByCategory = function(category){
    return new Promise((resolve,reject)=>{
        let filPosts = posts.filter(post => post.published && post.category == category);
        (filPosts.length > 0) ? resolve(filPosts) : reject("no results returned");
    });
}

module.exports.getCategories = function(){
    return new Promise((resolve,reject)=>{
        (categories.length > 0 ) ? resolve(categories) : reject("no results returned"); 
    });
}