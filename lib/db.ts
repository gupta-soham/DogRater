import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dog_ratings';

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI as string)
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Dog Schema
const dogSchema = new mongoose.Schema({
  breed: String,
  lifeExpectancy: Number,
  country: String,
  image: String,
  ratings: [{
    value: Number,
    timestamp: { type: Date, default: Date.now }
  }],
  averageRating: { type: Number, default: 0 }
});

// Update average rating when a new rating is added
dogSchema.pre('save', function (next) {
  if (this.ratings && this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, curr) => acc + (curr.value || 0), 0);
    this.averageRating = parseFloat((sum / this.ratings.length).toFixed(2));
  }
  next();
});

export const Dog = mongoose.models.Dog || mongoose.model('Dog', dogSchema);

export async function getDogs() {
  await connectDB();
  const dogs = await Dog.find();
  return dogs.map(dog => ({
    id: dog._id.toString(),
    breed: dog.breed,
    lifeExpectancy: dog.lifeExpectancy,
    country: dog.country,
    image: dog.image,
    rating: dog.averageRating || 0
  }));
}

export async function rateDog(dogId: string, rating: number) {
  await connectDB();

  const dog = await Dog.findById(dogId);
  if (!dog) {
    throw new Error('Dog not found');
  }

  if (!dog.ratings) {
    dog.ratings = [];
  }

  dog.ratings.push({ value: rating });

  await dog.save();

  return {
    id: dog._id.toString(),
    rating: dog.averageRating
  };
}
