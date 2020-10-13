const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
let count = 5;
const apiKey= 'Nf3PEAgdBJqKWSG652YhuyIX1fyGk5kiyN7Q9tgyYNk';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
        if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
} 

// Helper Function to Set Attributes on DOM Elements
function setAttribute(element , attributes){
    for( const key in attributes){
        element.setAttribute(key , attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
function  displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        // Create <a> to link to unsplashed
        const item = document.createElement('a');
        setAttribute(item , {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');

        setAttribute(img , {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load',imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplashed API
async function getPhotos() {
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();        
    }catch(error){

    }
}

// Check to see if scrolling near the bottom page, Load More Photos
window.addEventListener('scroll' , ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false ; 
        getPhotos();
    }
});

// on Load
getPhotos();