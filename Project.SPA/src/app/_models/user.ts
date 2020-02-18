import { Photo } from './photo';

export interface User {
    /* Podstawowe informacje */
    id: number;
    username: string;
    gender: string;
    age: number;
    zodiacSign: string;
    created: Date;
    lastActive: Date;
    city: string;
    country: string;
    /* Zakładka Info */
    growth: string;
    eyeColor: string;
    hairColor: string;
    martialStatus: string;
    education: string;
    profession: string;
    children: string;
    languages: string;
    /* Zakładka O mnie */
    motto: string;
    description: string;
    personality: string;
    lookingFor: string;
    /* Zakładka pasje zainteresowania */
    interests: string;
    freeTime: string;
    sport: string;
    movies: string;
    music: string;
    /* Zakładka preferencje */
    iLike: string;
    iDoNotLike: string;
    makesMeLaugh: string;
    itFeelsBestIn: string;
    friendeWouldDescribeMe: string;
    /* Zakładka zdjecia */
    photos: Photo[];
    photoUrl: string;
}
