import type { StaticPageContent, FAQEntry } from "@/lib/content/schema";

export const aboutPage: StaticPageContent = {
  slug: "about",
  title: "About Signals & Systems",
  intro:
    "Signals & Systems is a weekly podcast exploring the intersection of technology, human behaviour, and the future of work. We talk to builders, researchers, and practitioners about the systems — technical, social, and organisational — that shape how we work and what we create.",
  body: `Signals & Systems launched in November 2025 with a simple premise: the most interesting conversations in technology are not about the technology. They are about the people and organisations trying to wield it responsibly.

Every week, host Jordan Ellis sits down with thinkers and practitioners from engineering, design, behavioural science, and organisational leadership to explore the questions that do not have clean answers: How do high-performing teams actually work? What happens to attention when everything competes for it? When does building in public serve the mission and when does it distort it?

The show does not produce hot takes. It produces long, careful conversations with people who have thought hard about the problems they discuss. Episodes are typically 40 to 60 minutes — long enough to get past the conventional wisdom and into the actual texture of ideas.

Jordan Ellis has spent the past fifteen years working at the intersection of software engineering and organisational design, first as an engineer, later as a people manager, and more recently as a writer and interviewer. The podcast grew out of the conversations Jordan kept having in professional contexts that felt too good to leave in a hotel bar or a Zoom call.

Signals & Systems is independently produced with no institutional backing. It is supported entirely by listeners.`,
};

export const faqPage: StaticPageContent = {
  slug: "faq",
  title: "Frequently Asked Questions",
  intro:
    "Everything you need to know about the show — how it works, how often it publishes, and how to get in touch.",
  body: "Find answers to common questions below.",
};

export const faqEntries: FAQEntry[] = [
  {
    id: "faq-how-often",
    question: "How often does Signals & Systems publish new episodes?",
    answer:
      "New episodes are published every Tuesday. Occasional bonus episodes are released when a particularly interesting conversation comes together outside the regular schedule.",
  },
  {
    id: "faq-episode-length",
    question: "How long are episodes?",
    answer:
      "Most episodes run between 38 and 58 minutes. Conversations are not cut artificially short, so length follows the quality of the exchange. We do not pad for duration or cut for format.",
  },
  {
    id: "faq-topics",
    question: "What topics does the show cover?",
    answer:
      "Signals & Systems covers the intersection of technology, human behaviour, and organisational design. Past episodes have addressed deep work, open source sustainability, code review culture, AI context failures, technical interview design, and distributed team trust — among others. If it touches how technology-adjacent people work and think, it is fair game.",
  },
  {
    id: "faq-guests",
    question: "How are guests selected?",
    answer:
      "Guests are selected because they have thought carefully and originally about the topic at hand. They are not selected for institutional affiliation, follower counts, or promotional agendas. Jordan reaches out to people whose public writing or work has produced a genuine reaction — agreement, disagreement, or the useful friction between the two.",
  },
  {
    id: "faq-pitch",
    question: "Can I pitch myself or someone else as a guest?",
    answer:
      "Yes. Guest pitches are welcome by email. A good pitch describes the specific topic the guest would speak to, why their perspective on it is distinctive, and what a listener would take away that they could not get from reading the guest's existing public work. Pitches without a clear angle are less likely to receive a response.",
  },
  {
    id: "faq-transcript",
    question: "Are transcripts available?",
    answer:
      "Episode summaries are available on every episode page. Full transcripts are in development and will be published for all episodes when the format is stable. Accessibility of the content is a priority, not a backlog item.",
  },
  {
    id: "faq-contact",
    question: "How do I get in touch with the show?",
    answer:
      "The best way to reach the show is by email. Jordan reads every message personally. Response times vary, but everything gets read. For feedback about a specific episode, include the episode title so it gets routed correctly.",
  },
  {
    id: "faq-support",
    question: "How can I support the show?",
    answer:
      "The most valuable thing you can do is tell someone who would genuinely benefit from it. Word of mouth remains the primary way independent podcasts grow their audiences. If you want to support financially, listener support options are in development.",
  },
];
