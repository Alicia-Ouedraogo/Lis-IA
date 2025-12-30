
export const SYSTEM_INSTRUCTION = `Tu es "lis'IA", une compagne IA spécialisée dans le soutien émotionnel pour les jeunes Africains souffrant d'anxiété.

TON RÔLE :
Être l'espace de sécurité que beaucoup n'ont pas chez eux ou dans leur entourage. Tu es là pour valider leurs sentiments, surtout quand la société leur dit "sois fort", "ce n'est rien" ou "prie seulement".

LIGNE DE CONDUITE :
1. Validation Absolue : Ne remets jamais en question leur douleur. Utilise des phrases comme : "Ta douleur est réelle, peu importe ce que disent les autres", "Prendre soin de son esprit est un acte de courage, pas de faiblesse".
2. Contexte Culturel : Comprends que l'anxiété peut être perçue comme un tabou ou une "maladie d'ailleurs". Explique doucement que l'esprit humain est le même partout et que chacun mérite la paix.
3. Langage Fraternel : Parle comme une grande sœur ou un ami sage. Sois chaleureuse, respectueuse et protectrice.
4. Techniques de Calme : Guide-les vers les outils de l'application (respiration, 5-4-3-2-1) en expliquant que c'est une manière de reprendre le pouvoir sur son corps.

SÉCURITÉ :
Si l'utilisateur est en danger immédiat, suggère-lui de contacter une personne de confiance ou un service de santé, sans le brusquer.

Format : Markdown simple, phrases courtes, ton apaisant.`;

export const GROUNDING_EXERCISES = [
  {
    id: '54321',
    name: 'La Méthode 5-4-3-2-1',
    description: 'Une technique pour revenir au présent quand tout va trop vite.',
    steps: [
      'Identifie **5 choses** que tu vois autour de toi.',
      'Identifie **4 choses** que tu peux toucher.',
      'Identifie **3 sons** que tu entends.',
      'Identifie **2 odeurs** que tu sens.',
      'Identifie **1 chose** que tu peux goûter (ou une émotion positive).'
    ],
    color: 'bg-orange-50 text-orange-700'
  },
  {
    id: 'pmr',
    name: 'Détente Corporelle',
    description: 'Relâche le poids que tu portes sur tes épaules.',
    steps: [
      'Serre tes poings très fort pendant 5 secondes...',
      'Relâche tout d\'un coup et sens la tension partir.',
      'Lève tes épaules vers tes oreilles...',
      'Laisse-les tomber lourdement en expirant.',
      'Sente ton corps devenir plus léger.'
    ],
    color: 'bg-emerald-50 text-emerald-700'
  }
];

export const VALIDATION_QUOTES = [
  "Ton anxiété n'est pas une faiblesse de caractère, c'est un signal de ton corps qui demande du repos.",
  "Dire que tu souffres n'est pas un manque de respect, c'est un acte de vérité.",
  "Tu n'as pas besoin d'être fort(e) tout le temps. Ici, tu as le droit de déposer ton fardeau.",
  "La santé mentale est aussi importante que la santé physique. Ton esprit mérite d'être soigné.",
  "Tu es le gardien de ta propre paix. Personne ne peut te dire ce que tu ressens à l'intérieur."
];

export const MOOD_DATA: Record<string, { icon: string, label: string, color: string }> = {
  peaceful: { icon: 'fa-dove', label: 'Apaisé(e)', color: 'text-emerald-500' },
  anxious: { icon: 'fa-bolt', label: 'Anxieux(se)', color: 'text-orange-500' },
  sad: { icon: 'fa-cloud-rain', label: 'Triste', color: 'text-blue-500' },
  angry: { icon: 'fa-fire', label: 'En colère', color: 'text-rose-500' },
  exhausted: { icon: 'fa-battery-empty', label: 'Épuisé(e)', color: 'text-slate-500' },
  happy: { icon: 'fa-sun', label: 'Heureux(se)', color: 'text-yellow-500' }
};
