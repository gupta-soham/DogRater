import { connectDB, Dog } from "./db";

export async function initializeDogs() {
    await connectDB();
    const count = await Dog.countDocuments();

    if (count === 0) {
        const initialDogs = [
            // Germany
            {
                breed: "German Shepherd",
                lifeExpectancy: 11,
                country: "Germany",
                image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Rottweiler",
                lifeExpectancy: 10,
                country: "Germany",
                image: "https://images.unsplash.com/photo-1665333354010-050f08f35907",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Dachshund",
                lifeExpectancy: 13,
                country: "Germany",
                image: "https://images.unsplash.com/photo-1588176053174-ebc2de5d6422",
                ratings: [],
                averageRating: 0
            },

            // Japan
            {
                breed: "Shiba Inu",
                lifeExpectancy: 13,
                country: "Japan",
                image: "https://plus.unsplash.com/premium_photo-1718652842683-8e7f623fbc1b",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Kishu",
                lifeExpectancy: 14,
                country: "Japan",
                image: "https://images.ctfassets.net/m5ehn3s5t7ec/wp-image-198193/ff7eed032c4cdb6678f9e7eb31c96176/Kishu.jpeg",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Japanese Spitz",
                lifeExpectancy: 12,
                country: "Japan",
                image: "https://images.unsplash.com/photo-1665330767335-fb76325065bf",
                ratings: [],
                averageRating: 0
            },

            // United States
            {
                breed: "Australian Shepherd",
                lifeExpectancy: 13,
                country: "United States",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpXPQcjk7Sl_JDb0DJMdLceGUHfmx-vTcZMNb4di-SHwD2a3SI",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Boston Terrier",
                lifeExpectancy: 12,
                country: "United States",
                image: "https://images.unsplash.com/photo-1722257401157-6c2bcb80c0b4",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Alaskan Malamute",
                lifeExpectancy: 11,
                country: "United States",
                image: "https://images.unsplash.com/photo-1624193527943-26a0b13835c2",
                ratings: [],
                averageRating: 0
            },

            // Russia
            {
                breed: "Siberian Husky",
                lifeExpectancy: 12,
                country: "Russia",
                image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Samoyed",
                lifeExpectancy: 12,
                country: "Russia",
                image: "https://images.unsplash.com/photo-1529429617124-95b109e86bb8",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Black Russian Terrier",
                lifeExpectancy: 11,
                country: "Russia",
                image: "https://cdn.prod.website-files.com/61bcf7a199a6ef4fbfb9ee04/66e45b4f4778ae37bf1f5d02_HFWZzIWNeq7l9M0KltoWzD4Wv4USWCD-kVnzRd5DLaM.webp",
                ratings: [],
                averageRating: 0
            },

            // United Kingdom
            {
                breed: "Border Collie",
                lifeExpectancy: 14,
                country: "United Kingdom",
                image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "English Bulldog",
                lifeExpectancy: 9,
                country: "United Kingdom",
                image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Yorkshire Terrier",
                lifeExpectancy: 13,
                country: "United Kingdom",
                image: "https://images.unsplash.com/photo-1526440847959-4e38e7f00b04",
                ratings: [],
                averageRating: 0
            },

            // Scotland
            {
                breed: "Golden Retriever",
                lifeExpectancy: 11,
                country: "Scotland",
                image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Scottish Terrier",
                lifeExpectancy: 12,
                country: "Scotland",
                image: "https://www.pd.com.au/wp-content/uploads/2021/07/Scottish-Terrier-Profile-of-the-Die-Hard-Dog.jpg",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "West Highland Terrier",
                lifeExpectancy: 13,
                country: "Scotland",
                image: "https://images.unsplash.com/photo-1446730853965-62433e868929",
                ratings: [],
                averageRating: 0
            },

            // Wales
            {
                breed: "Pembroke Welsh Corgi",
                lifeExpectancy: 12,
                country: "Wales",
                image: "https://plus.unsplash.com/premium_photo-1710406095492-7e62eba19745",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Cardigan Welsh Corgi",
                lifeExpectancy: 13,
                country: "Wales",
                image: "https://image.petmd.com/files/styles/863x625/public/2023-10/cardigan-welsh-corgi.jpg",
                ratings: [],
                averageRating: 0
            },
            {
                breed: "Welsh Terrier",
                lifeExpectancy: 12,
                country: "Wales",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGzpUC6R6nn45s7d_dy1AdESMq2V1za3Kqg&s",
                ratings: [],
                averageRating: 0
            }
        ];

        await Dog.insertMany(initialDogs);
        console.log('Initial dogs created successfully');
    }
}