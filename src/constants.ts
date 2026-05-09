import { Question, Result } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: "Your ideal weekend starts with...",
    choices: [
      { id: 'q1a1', text: "A hidden trail you just discovered", personality: 'Explorer' },
      { id: 'q1a2', text: "The same cozy nook at your favorite bookstore", personality: 'Loyalist' },
      { id: 'q1a3', text: "Bringing a blank sketchbook to a vibrant new park", personality: 'Creative' },
      { id: 'q1a4', text: "A single chapter of a book and a perfectly made bed", personality: 'Minimalist' },
    ]
  },
  {
    id: 'q2',
    text: "Pick a workspace vibe:",
    choices: [
      { id: 'q2a1', text: "A bustling train station window", personality: 'Explorer' },
      { id: 'q2a2', text: "A plant-filled attic with a vintage record player", personality: 'Creative' },
      { id: 'q2a3', text: "A library desk with zero distractions", personality: 'Minimalist' },
      { id: 'q2a4', text: "A spot where the barista knows your order by heart", personality: 'Loyalist' },
    ]
  },
  {
    id: 'q3',
    text: "What kind of energy do friends know you for?",
    choices: [
      { id: 'q3a1', text: "The one who always says 'yes' to a road trip", personality: 'Explorer' },
      { id: 'q3a2', text: "The calm center in every storm", personality: 'Minimalist' },
      { id: 'q3a3', text: "The one with the most unexpected, brilliant ideas", personality: 'Creative' },
      { id: 'q3a4', text: "The one who remembers everyone's birthday", personality: 'Loyalist' },
    ]
  },
  {
    id: 'q4',
    text: "If your life were a film genre, it would be...",
    choices: [
      { id: 'q4a1', text: "A sweeping travel documentary", personality: 'Explorer' },
      { id: 'q4a2', text: "A classic black-and-white noir", personality: 'Minimalist' },
      { id: 'q4a3', text: "A whimsical indie arthouse flick", personality: 'Creative' },
      { id: 'q4a4', text: "A heartwarming family dramedy", personality: 'Loyalist' },
    ]
  },
  {
    id: 'q5',
    text: "Your morning ritual is likely...",
    choices: [
      { id: 'q5a1', text: "Checking the horizon for new light", personality: 'Explorer' },
      { id: 'q5a2', text: "Following the exact steps that bring you peace", personality: 'Loyalist' },
      { id: 'q5a3', text: "Dreaming up three possibilities for the day", personality: 'Creative' },
      { id: 'q5a4', text: "One intentional moment of total silence", personality: 'Minimalist' },
    ]
  }
];

export const RESULTS: Record<string, Result> = {
  Explorer: {
    type: 'Explorer',
    title: 'The Explorer',
    description: "You're a seeker of new horizons and bold experiences. Your curiosity isn't just a trait; it's your compass.",
    recommendedDrink: 'Spiced Bloom Latte',
    icon: 'Compass'
  },
  Loyalist: {
    type: 'Loyalist',
    title: 'The Loyalist',
    description: "You find beauty in consistency and warmth in tradition. You're the heart of your community, dependable and kind.",
    recommendedDrink: 'Classic Oat Cappuccino',
    icon: 'Heart'
  },
  Creative: {
    type: 'Creative',
    title: 'The Creative',
    description: "Your world is painted in shades of imagination. You see the hidden details that others miss and turn them into art.",
    recommendedDrink: 'Vanilla Bean Mist',
    icon: 'Palette'
  },
  Minimalist: {
    type: 'Minimalist',
    title: 'The Minimalist',
    description: "You choose quality over quantity every time. Your life is a masterclass in intention and quiet sophistication.",
    recommendedDrink: 'Double Ristretto',
    icon: 'Sun'
  }
};
