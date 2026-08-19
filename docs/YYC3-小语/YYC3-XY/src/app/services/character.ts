import type { CharacterConfig, ValidationResult, ValidationMessage, Child } from '../../types';

// Mock Data
const MOCK_CHARACTERS: Record<string, CharacterConfig> = {
  female: {
    id: 'char_001',
    name: '沫语',
    gender: 'female',
    age: 8,
    zodiac: '兔',
    avatarPath: 'figma:asset/avatar_female.png',
    birthday: { solar: '2016-03-15', lunar: '二月初七' },
    currentTheme: 'default',
    personality: {
      traits: {
        curiosity: 0.8,
        creativity: 0.7,
        patience: 0.6,
        friendliness: 0.9,
        empathy: 0.8,
        playfulness: 0.7,
      },
      description: '沫语是一个充满好奇心和创造力的AI角色',
      preferences: ['阅读', '绘画', '探索'],
      dislikes: [],
    },
  } as CharacterConfig,
  male: {
    id: 'char_002',
    name: '沫言',
    gender: 'male',
    age: 8,
    zodiac: '兔',
    avatarPath: 'figma:asset/avatar_male.png',
    birthday: { solar: '2016-03-15', lunar: '二月初七' },
    currentTheme: 'default',
    personality: {
      traits: {
        energy: 0.9,
        logic: 0.7,
        empathy: 0.6,
        friendliness: 0.8,
        curiosity: 0.7,
        creativity: 0.6,
        patience: 0.5,
        playfulness: 0.8,
      },
      description: '沫言是一个充满活力和逻辑思维的AI角色',
      preferences: ['运动', '科学', '冒险'],
      dislikes: [],
    },
  } as CharacterConfig,
};

export const characterManager = {
  setCurrentChild: (child: Child | null) => {
    localStorage.setItem('currentChild', JSON.stringify(child));
  },

  getCurrentChild: (): CharacterConfig => {
    const child = localStorage.getItem('currentChild');
    return child ? JSON.parse(child) : MOCK_CHARACTERS.female;
  },

  getCurrentCharacter: (): CharacterConfig => {
    return characterManager.getCurrentChild();
  },

  getCharacterByGender: (gender: 'male' | 'female'): CharacterConfig => {
    return MOCK_CHARACTERS[gender];
  },
};

export const characterValidator = {
  validateCharacterConfig: (config: CharacterConfig): ValidationResult => {
    const errors: ValidationMessage[] = [];
    const warnings: ValidationMessage[] = [];
    const suggestions: ValidationMessage[] = [];

    if (!config.id) errors.push({ field: 'id', message: 'ID is missing' });
    if (!config.name) errors.push({ field: 'name', message: 'Name is missing' });
    if (config.age < 0) errors.push({ field: 'age', message: 'Age cannot be negative' });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
    };
  },

  autoFixCharacterConfig: (config: CharacterConfig): CharacterConfig => {
    return {
      ...config,
    };
  },
};
