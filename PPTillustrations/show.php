<?php
// Directory containing PNG files
$directory = 'path/to/your/folder';

// Fetch all PNG files from the directory
$images = glob($directory . '/*.png');

// Encode the image paths as JSON for JavaScript
$imageList = json_encode($images);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PNG Slideshow</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
        }
        img {
            max-width: 80%;
            max-height: 80%;
            border: 2px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>
    <img id="slideshow" src="" alt="Slideshow">
    <script>
        // Get the PHP-generated image list
        const images = <?php echo $imageList; ?>;
        let currentIndex = 0;

        // Function to update the slideshow image
        function updateSlideshow() {
            const imgElement = document.getElementById('slideshow');
            imgElement.src = images[currentIndex];
            currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image
        }

        // Start the slideshow
        if (images.length > 0) {
            updateSlideshow(); // Show the first image immediately
            setInterval(updateSlideshow, 3000); // Change image every 3 seconds
        } else {
            document.body.innerHTML = '<p>No PNG images found in the folder.</p>';
        }
    </script>
</body>
</html>
