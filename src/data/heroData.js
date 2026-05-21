import { Clock3, Headphones, ShieldCheck, Users, BarChart3, Globe2, Zap } from 'lucide-react';

export const heroStats = {
  about: [
    { value: '10k+', label: 'businesses served' },
    { value: '50+', label: 'countries reached' },
    { value: '24/7', label: 'AI support coverage' },
  ],
  pricing: [
    { value: '4', label: 'simple plans' },
    { value: '20%', label: 'yearly savings' },
    { value: '0', label: 'setup fees' },
  ],
};

export const contactHeroCards = [
  { icon: Clock3, title: 'Fast Response', text: 'Under 2 hours', tone: 'blue' },
  { icon: Headphones, title: '24/7 Support', text: 'Always available', tone: 'orange' },
  { icon: Users, title: 'Expert Team', text: 'AI specialists', tone: 'cyan' },
  { icon: ShieldCheck, title: 'Trusted By', text: '10,000+ users', tone: 'green' },
];

export const aboutTrustBadges = [
  { icon: ShieldCheck, text: 'Secure AI workflows' },
  { icon: BarChart3, text: 'Measured business impact' },
  { icon: Globe2, text: 'Built for global teams' },
  { icon: Zap, text: 'Fast deployment model' },
];
