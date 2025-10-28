/**
 * Data model capturing all of the content that populates Hope's portfolio
 * website. This file can be modified independently of the components to
 * update text, images and other personal details without changing the
 * structure of the React components themselves.
 */

const hopeData = {
  // Basic identity
  modelName: 'Ntinyari Hope',
  fullName: 'Hope Ntinyari Koome',
  location: 'Nairobi, Kenya',
  websiteUrl: 'www.reallygreatsite.com',

  // Introductory tagline used in the footer and meta descriptions
  tagline:
    "I'm a fashion enthusiast who believes fashion is more than just clothes but how it makes you feel. Every outfit is a story. Every style is a statement.",

  // Narrative sections
  introduction:
    "Hey I'm Ntinyari Hope a fashion enthusiast, model and style storyteller. I see fashion as more than just clothes, it's a language I use to express confidence, creativity and individuality.",
  startedModeling:
    'Modelling and fashion has always been in me since childhood, its not a phase—\nit\'s a part of me.',
  whyModel:
    "Modelling has always been part of me, not something I've discovered but something I've always known. Since childhood I've been drawn to the art of fashion and expression and with time that inner spark grew into purpose nurtured by the unwavering support from my mum.",

  // Lists and preferences
  modelingTypes: ['Runway', 'Commercial', 'Beauty', 'Fitness'],
  desiredFeeling: 'Confident, classy and authentic',
  styleDescription: 'Bold, elegant and timeless',
  styleInspiration: 'Designers',
  websiteStyle: 'Luxury',
  favoriteColors: 'Nude colours',
  logoPreference: 'I want my name styled as a logo',
  websiteFeel: 'Elegant and simple',

  // Inspirational quotes to sprinkle around the site
  fashionQuotes: [
    'Confidence is the best accessory one could wear.',
    "If you can't beat your competitor just dress better.",
    "Fashion is more than clothes; it's a story only the bold ones can clearly tell."
  ],

  // Assets and external links
  professionalPhotosLink:
    'https://drive.google.com/drive/folders/1uX3QDsrSu56Lbd78KsdvaeHPFO7pEj-a?usp=sharing',
  casualPhotos: true,
  photoCategories: ['Photoshoot', 'Casual'],
  videosLink: 'tiktok.com/@ntinyarihope',

  // Personal reflections
  meaningOfFashion:
    'Fashion is my whole personality. I feel like every outfit I put on is a love letter to my past me, my present me and my future me.',
  uniqueness:
    "My uniqueness lies in how I see fashion beyond clothes—it's confidence, storytelling and self expression.",
  experience: 'Yes but willing to collaborate',
  dreams:
    'Travel, style people, inspire young girls and walk shows.',
  funStory: 'Yes',

  // Contact information
  email: 'ntinyarihope1@gmail.com',
  wantsBookingButton: 'Email',
  social: {
    instagram: '',
    tiktok: 'tiktok.com/@ntinyarihope',
    youtube: '',
    twitter: '',
    others: '',
  },
  whatsapp: true,
  subscribeSection: true,

  // Music preferences
  favoriteSong: 'Skyfall - Adele',
  siteMusic: 'Soft music',

  // Additional quotes and statements
  shortQuote: 'You can have anything in life if you dress for it.',
  extendedBio:
    "I'm a fashion enthusiast who believes fashion is more than just clothes but how it makes you feel. Every outfit is a story. Every style is a statement. Through modelling and styling, I bring my vision of confidence, beauty and authenticity to life.",

  // Team members for the "Meet My Team" section
  team: [
    {
      name: 'Chidi Eze',
      role: 'Makeup Artist',
      imageSrc: '/images/team1.png',
    },
    {
      name: 'Drew Feig',
      role: 'Photographer',
      imageSrc: '/images/team2.png',
    },
    {
      name: 'Harper Russo',
      role: 'Creative Director',
      imageSrc: '/images/team3.png',
    },
    {
      name: 'Jamie Chastain',
      role: 'Stylist',
      imageSrc: '/images/team4.png',
    },
  ],

  // Projects for the project showcase
  projects: [
    {
      title: 'Project 1',
      clientName: 'Salford & Co.',
      imageSrc: '/images/project1.png',
    },
    {
      title: 'Project 2',
      clientName: 'Larana, Inc.',
      imageSrc: '/images/project2.png',
    },
  ],
};

export default hopeData;
