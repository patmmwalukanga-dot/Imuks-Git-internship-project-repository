// LandingPage.tsx
// React Native — Scholarly Academic Success Tracker
// Dependencies: react-native (core), react-native-linear-gradient
// Install: npm install react-native-linear-gradient
//          npx pod-install  (iOS)

import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Design tokens (mirrored from the original Tailwind theme) ───────────────
const C = {
  primary: '#00200f',
  onPrimary: '#ffffff',
  primaryContainer: '#01381e',
  onPrimaryContainer: '#70a380',
  secondaryContainer: '#dfe3b2',
  onSecondaryContainer: '#61663e',
  secondaryFixed: '#e2e6b5',
  surface: '#fafaf4',
  onSurface: '#1a1c19',
  onSurfaceVariant: '#414942',
  outlineVariant: '#c0c9c0',
  heroTop: '#01381e',
  heroBottom: '#00200f',
} as const;

const SP = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 80,
} as const;

// ─── Sub-components ────────────────────────────────────────────────────────[...]

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        {/* Material Symbol "school" rendered as unicode emoji substitute */}
        <Text style={styles.brandIcon}>🎓</Text>
        <Text style={styles.brandName}>Scholarly</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.getStartedBtn,
          pressed && styles.btnPressed,
        ]}
        onPress={() => {}}
        accessibilityRole="button"
        accessibilityLabel="Get Started"
      >
        <Text style={styles.getStartedLabel}>Get Started</Text>
      </Pressable>
    </View>
  );
}

function HeroSection() {
  return (
    <LinearGradient
      colors={[C.heroTop, C.heroBottom]}
      style={styles.heroSection}
    >
      {/* Eye-brow */}
      <View style={styles.eyebrowRow}>
        <Text style={styles.eyebrowStar}>✦</Text>
        <Text style={styles.eyebrowText}>ACADEMIC EXCELLENCE 2.0</Text>
      </View>

      {/* Headline */}
      <Text style={styles.heroHeadline}>
        Stay Ahead of{'
'}the Curve
      </Text>

      {/* Body */}
      <Text style={styles.heroBody}>
        The all-in-one student tracker for grades, tasks, and schedules.
        Achieve your academic goals with surgical precision.
      </Text>

      {/* CTA */}
      <Pressable
        style={({ pressed }) => [
          styles.ctaBtn,
          pressed && styles.btnPressed,
        ]}
        onPress={() => {}}
        accessibilityRole="button"
        accessibilityLabel="Start Tracking"
      >
        <Text style={styles.ctaLabel}>Start Tracking</Text>
      </Pressable>

      {/* Hero image */}
      <View style={styles.heroImageWrapper}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNVazjBf5XSqeK3VY0_NKHn7hHcZ2NN-mq7gKMQZDZgx_nBtZR0kSVYKAEsBGzRSGtEykQXiUPjMKsG2CDmP01Q9UgA0Mtek7OvDoxlp-l7MaYPvpr0Wf4oZuagp7',
          }}
          style={styles.heroImage}
          resizeMode="cover"
          accessibilityLabel="Scholarly app dashboard"
        />
      </View>
    </LinearGradient>
  );
}

type FeatureCardProps = {
  emoji: string;
  title: string;
  description: string;
};

function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureIcon}>{emoji}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureBody}>{description}</Text>
    </View>
  );
}

function FeaturesSection() {
  const features: FeatureCardProps[] = [
    {
      emoji: '📊',
      title: 'Grade Management',
      description:
        'Track weighted averages across all semesters. Predictive analytics tell you exactly what you need on that final exam.',
    },
    {
      emoji: '📅',
      title: 'Smart Scheduling',
      description:
        'Sync your syllabus with a dynamic calendar that flags overlapping deadlines and carves out optimal study blocks.',
    },
    {
      emoji: '⚡',
      title: 'Task Priority',
      description:
        'AI-driven prioritization based on due dates, project weight, and your historical productivity patterns.',
    },
  ];

  return (
    <View style={styles.featuresSection}>
      {/* Section header */}
      <Text style={styles.featuresSectionTitle}>
        Precision Tools for Success
      </Text>
      <Text style={styles.featuresSectionSubtitle}>
        Built by educators and designers to streamline the cognitive load of
        student life.
      </Text>

      {/* Cards */}
      {features.map((f) => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </View>
  );
}

const FOOTER_LINKS = [
  'Privacy Policy',
  'Terms of Service',
  'Help Center',
  'Contact Us',
];

function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.footerDivider} />

      {/* Brand */}
      <View style={styles.footerBrand}>
        <Text style={styles.brandIcon}>🎓</Text>
        <Text style={[styles.brandName, { fontSize: 20 }]}>Scholarly</Text>
      </View>
      <Text style={styles.footerTagline}>
        Empowering students to reach their full potential through organizational
        excellence.
      </Text>

      {/* Links */}
      <View style={styles.footerLinks}>
        {FOOTER_LINKS.map((link) => (
          <Pressable key={link} onPress={() => {}} accessibilityRole="link">
            <Text style={styles.footerLink}>{link}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.copyright}>
        © 2024 Scholarly Tracker. All academic rights reserved.
      </Text>
    </View>
  );
}

// ─── Root screen ────────────────────────────────────────────────────────[...]

export default function LandingPage() {
  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={C.primaryContainer}
        translucent={false}
      />

      {/* Sticky header sits above the scroll view */}
      <Header />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </ScrollView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────[...]

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.surface,
  },

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.surface,
    paddingHorizontal: SP.sm,
    paddingVertical: SP.sm,
    // Elevation / shadow
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
    }),
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandIcon: {
    fontSize: 22,
  },
  brandName: {
    fontWeight: '700',
    fontSize: 22,
    color: C.primary,
    letterSpacing: -0.3,
  },
  getStartedBtn: {
    backgroundColor: C.primary,
    paddingHorizontal: SP.md,
    paddingVertical: 8,
    borderRadius: 6,
  },
  getStartedLabel: {
    color: C.onPrimary,
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.6,
  },

  // ── Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // ── Hero
  heroSection: {
    paddingTop: SP.xxl,
    paddingBottom: SP.xxl,
    paddingHorizontal: SP.sm,
    alignItems: 'center',
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SP.sm,
  },
  eyebrowStar: {
    color: C.secondaryFixed,
    fontSize: 12,
  },
  eyebrowText: {
    color: C.secondaryFixed,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.2,
  },
  heroHeadline: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 44,
    letterSpacing: -0.8,
    marginBottom: SP.sm,
  },
  heroBody: {
    fontSize: 16,
    color: C.onPrimaryContainer,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
    marginBottom: SP.lg,
    opacity: 0.85,
  },
  ctaBtn: {
    backgroundColor: C.secondaryContainer,
    paddingHorizontal: SP.xl,
    paddingVertical: 14,
    borderRadius: 6,
    marginBottom: SP.lg,
  },
  ctaLabel: {
    color: C.onSecondaryContainer,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.6,
  },
  btnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  heroImageWrapper: {
    width: '100%',
    maxWidth: 420,
    height: 220,
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: SP.sm,
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
    }),
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  // ── Features
  featuresSection: {
    backgroundColor: C.surface,
    paddingVertical: SP.xxl,
    paddingHorizontal: SP.sm,
  },
  featuresSectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: C.primary,
    textAlign: 'center',
    letterSpacing: -0.4,
    marginBottom: SP.xs,
  },
  featuresSectionSubtitle: {
    fontSize: 14,
    color: C.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SP.lg,
    maxWidth: 300,
    alignSelf: 'center',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: SP.md,
    marginBottom: SP.sm,
    borderWidth: 1,
    borderColor: C.outlineVariant,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: SP.xs,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: C.primary,
    marginBottom: 4,
  },
  featureBody: {
    fontSize: 14,
    color: C.onSurfaceVariant,
    lineHeight: 20,
  },

  // ── Footer
  footer: {
    backgroundColor: C.surface,
    paddingHorizontal: SP.sm,
    paddingBottom: SP.xxl,
    paddingTop: SP.lg,
    alignItems: 'center',
  },
  footerDivider: {
    height: 1,
    backgroundColor: C.outlineVariant,
    width: '100%',
    marginBottom: SP.lg,
    opacity: 0.4,
  },
  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SP.xs,
  },
  footerTagline: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 260,
    marginBottom: SP.md,
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SP.sm,
    marginBottom: SP.md,
  },
  footerLink: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    textDecorationLine: 'underline',
  },
  copyright: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    textAlign: 'center',
    opacity: 0.7,
  },
});
