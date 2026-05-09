
export type CoffeePersonality = 'Explorer' | 'Loyalist' | 'Creative' | 'Minimalist';

export interface Choice {
  id: string;
  text: string;
  personality: CoffeePersonality;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
}

export interface Result {
  type: CoffeePersonality;
  title: string;
  description: string;
  recommendedDrink: string;
  icon: string;
}
