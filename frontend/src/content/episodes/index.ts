import type { Episode } from "@/lib/content/schema";

export const episodes: Episode[] = [
  {
    slug: "attention-economy-hidden-tax",
    title: "The Attention Economy's Hidden Tax",
    episodeNumber: 1,
    publishDate: "November 19, 2025",
    duration: "44 min",
    summary:
      "We give away attention constantly — to notifications, feeds, open offices — without ever seeing the invoice. In this debut episode, Jordan unpacks the structural mechanisms that extract focus from workers and explores what it would take to opt out.",
    body: `Every product that competes for your attention is extracting something you cannot get back. The attention economy is not a metaphor — it is an accurate description of a market where your focus is the commodity being traded, and the sellers are not you.

In this opening episode, we trace the history of attention as a resource, from the first newspaper ads to the algorithmic feeds designed to maximise dwell time. What changed between 1990 and today is not human psychology — it is the infrastructure. The pipes got faster, the signals got louder, and the businesses depending on your eyeballs got better at keeping them.

The hidden tax shows up in meeting culture, in open-plan offices, in the expectation of instant replies. Each interruption costs more than its face value. Research on task resumption consistently shows that deep focus takes fifteen to twenty minutes to rebuild after even a minor disruption. When your day is structured around constant availability, the tax compounds invisibly.

We close with three questions worth sitting with: Who profits when your attention fragments? What organisational structures inadvertently encourage the fragmentation? And what would a workplace designed to protect attention actually look like?`,
  },
  {
    slug: "building-in-public-cost-of-transparency",
    title: "Building in Public: The True Cost of Transparency",
    episodeNumber: 2,
    publishDate: "November 26, 2025",
    duration: "39 min",
    summary:
      "Building in public has become a badge of honour in the startup world. But when transparency becomes performance, it can distort decision-making, exhaust founders, and create a false narrative of progress. We examine the tradeoffs honestly.",
    body: `There is a version of transparency that serves your audience, and a version that serves your own sense of accountability. The two look identical from the outside and feel very different from the inside.

The "build in public" movement emerged from a genuine insight: showing your work builds trust, attracts collaborators, and holds you accountable to your own stated goals. For many founders and independent creators, the practice has been genuinely generative. The problems begin when the performance of building starts to shape the building itself.

When every decision becomes a tweet thread, you start optimising for legibility. Messy, necessary pivots become harder to execute because they contradict the narrative you have been broadcasting. You start shaping your roadmap around what looks good in public rather than what is strategically correct. The feedback loop inverts: the audience starts driving the product.

We talk about where the line is, how to draw it intentionally, and what a sustainable transparency practice actually looks like for someone who is in it for the long run rather than the engagement metrics.`,
  },
  {
    slug: "when-ai-gets-context-wrong",
    title: "When AI Gets the Context Wrong",
    episodeNumber: 3,
    publishDate: "December 3, 2025",
    duration: "48 min",
    summary:
      "AI systems are remarkably capable at pattern matching and remarkably brittle when context shifts. We explore why context is the hard problem, how organisations miscalibrate their trust in AI outputs, and what failure looks like when nobody's watching.",
    body: `The failure mode nobody talks about enough is not hallucination — it is misplaced confidence about context. A language model can produce fluent, coherent, detailed prose about something it fundamentally does not understand, and the prose will look correct to someone who does not already know the answer.

Context failure is not a new problem. Humans fail at it constantly — in legal contracts, in medical handoffs, in software requirements documents. What is new is scale and speed. When an AI system misapplies context across ten thousand documents simultaneously, the blast radius of the error is qualitatively different from a human making the same mistake once.

In this episode we look at three concrete examples where AI systems applied learned context in ways that were subtly wrong in ways that mattered: a legal discovery tool that misread jurisdiction, a content moderation system that lost its calibration after a policy update, and a code review bot that learned the team's bad habits alongside their good ones.

The takeaway is not that AI is unreliable. It is that reliability requires ongoing investment in the human systems that surround the AI — the review processes, the ground truth datasets, the escalation paths for flagging when something feels off. The technology is often not the bottleneck. The organisational scaffolding is.`,
  },
  {
    slug: "myth-of-the-10x-engineer",
    title: "The Myth of the 10x Engineer",
    episodeNumber: 4,
    publishDate: "December 10, 2025",
    duration: "51 min",
    summary:
      "The 10x engineer is a persistent piece of tech industry folklore. But the research on individual versus team performance tells a different story. We dig into what the evidence actually says and why the myth survives despite it.",
    body: `The idea of the 10x engineer — the individual contributor so exceptional they produce ten times the output of their peers — has been circulating in software culture since the 1960s. Like most durable myths, it contains a grain of truth wrapped in a lot of motivated reasoning.

The original studies this claim is based on are worth reading carefully. They show high variance in individual programmer performance on isolated tasks. They do not show that the highest performers in one context remain the highest performers across contexts, teams, or problem types. Individual programming speed does not predict team output. It does not predict code quality over time. It does not predict the ability to grow other engineers, reduce organisational debt, or navigate ambiguous requirements.

What the research on high-performing engineering teams consistently shows is that the important variables are systemic: psychological safety, clear ownership boundaries, low meeting overhead, efficient feedback loops. The teams that perform at ten times the rate of average teams are not teams with better individuals — they are teams with better systems.

The myth persists because it is convenient. It gives organisations an excuse not to fix their systems, and it gives senior engineers a narrative that flatters their self-image. Neither convenience is free.`,
  },
  {
    slug: "deep-work-in-a-distracted-world",
    title: "Deep Work in a Distracted World",
    episodeNumber: 5,
    publishDate: "December 17, 2025",
    duration: "56 min",
    summary:
      "Cal Newport popularised the term. But what does deep work actually look like as a practice inside organisations that were not designed for it? We talk to practitioners who have protected uninterrupted focus at scale — and examine what it cost them.",
    body: `Deep work — the ability to focus without distraction on cognitively demanding tasks — produces disproportionate results. That claim is not controversial. The controversy is about how to create the conditions for it inside real organisations that run on email, Slack, and standing meetings.

The practitioners we spoke to for this episode converged on a counterintuitive finding: the bottleneck is almost never individual willpower. People know how to focus. The bottleneck is the social contract of availability. In most knowledge work environments, being responsive is treated as a proxy for productivity. The person who replies to every Slack message within four minutes is perceived as hardworking. The person who does not reply until 3pm is perceived as absent. Both perceptions are wrong.

Creating space for deep work requires renegotiating that social contract explicitly. That means team-wide agreements about response time expectations. It means asynchronous-first communication norms. It means leadership visibly modelling the behaviour. None of these changes are technically difficult. All of them are socially difficult, because they require people to sit with uncertainty about whether their colleagues are actually working.

The organisations that have made it work share one characteristic: they measured outcomes, not availability. When you stop treating responsiveness as a performance signal, the social pressure to fragment attention drops dramatically. What you lose in the feeling of control, you gain in actual work.`,
  },
  {
    slug: "psychology-of-code-review",
    title: "The Psychology of Code Review",
    episodeNumber: 6,
    publishDate: "December 24, 2025",
    duration: "43 min",
    summary:
      "Code review is one of the most psychologically loaded rituals in software engineering. It is technically about correctness and quality. It is socially about status, belonging, and identity. Getting it right requires understanding both layers simultaneously.",
    body: `A pull request is not just a diff. It is a public statement about how you think. When someone leaves a comment on your code, they are commenting on your thinking. That is why even technically innocuous feedback can land as a personal attack — and why technically correct feedback can damage trust, slow down teams, and increase attrition.

The research on code review is mostly quantitative: how many defects are caught, how long reviews take, what review coverage predicts. The qualitative research — what the experience of review feels like for authors and reviewers — is thinner, but it points to some consistent patterns. Authors with less seniority consistently describe review as anxiety-inducing. Reviewers with more seniority often underestimate that anxiety. The gap in perception is not about intent. It is about asymmetric information about what the review process feels like from the other chair.

High-performing teams tend to have explicit norms around review — what a review comment should contain, what a nit is, what requires blocking, how to separate "I would do this differently" from "this must change." The norm-setting work pays off not because the norms are technically sophisticated, but because they make the implicit explicit and reduce the ambiguity that turns disagreement into conflict.

Code review is also an asymmetric learning opportunity. The author learns from the reviewer's perspective. The reviewer almost always learns something about the author's domain. Teams that treat review as mutual education rather than quality gatekeeping consistently report higher satisfaction and lower friction.`,
  },
  {
    slug: "designing-for-neurodiversity",
    title: "Designing for Neurodiversity",
    episodeNumber: 7,
    publishDate: "December 31, 2025",
    duration: "47 min",
    summary:
      "Neurodiverse users are not edge cases. They represent a substantial share of your audience, and the design choices that serve them best also tend to improve the experience for everyone else. We explore what designing for cognitive diversity actually requires.",
    body: `The concept of the "average user" is a statistical fiction. Every interface is used by people with different working memory capacities, different sensory sensitivities, different reading speeds, different tolerance for ambiguity. Design that pretends otherwise is optimised for a person who does not exist.

Neurodiversity in a design context means accounting for the full range of how people process information: ADHD, autism spectrum conditions, dyslexia, dyscalculia, anxiety, and the cognitive variation that does not come with a diagnostic label. The overlap between these groups is large enough that designing for one typically benefits several others.

The most impactful changes are often the least glamorous. Consistent navigation reduces the cognitive overhead of orienting. Plain language reduces the barrier for anyone processing language differently or in a second language. Sufficient contrast and generous white space reduce sensory load. Predictable interaction patterns reduce anxiety about getting something wrong.

What is striking is that these are not specialised accommodations — they are generally good design. The mental model that treats accessible design as a cost to be minimised versus good design that is good for everyone is not just ethically wrong. It is empirically wrong.`,
  },
  {
    slug: "open-source-burnout",
    title: "Open Source Burnout: Who Pays the Price?",
    episodeNumber: 8,
    publishDate: "January 7, 2026",
    duration: "49 min",
    summary:
      "Billions of dollars of commercial infrastructure runs on code maintained by individuals who are often unpaid, under-resourced, and burned out. We look at the structural dynamics behind open source sustainability and who bears the cost when maintainers quit.",
    body: `There is a standard story about open source: a hobbyist writes a useful library, it gets picked up by enterprises, and the maintainer ends up spending their weekends triaging issues for companies worth billions of dollars. The story is accurate, but it is also incomplete, because it makes what is a structural problem sound like a series of unfortunate individual circumstances.

The sustainability gap in open source is a predictable consequence of the economic model. Companies internalise the value of the software without contributing proportionally to its maintenance. Individual maintainers bear the cost of that subsidy. The subsidy is invisible because the cost is distributed across nights and weekends that nobody invoices for.

Some maintainers have found ways out — sponsorship programmes, commercial licensing, foundation structures. Most have not. The ones who have not face a slow attrition: the interesting parts of maintenance get rarer as the project matures, the volume of requests grows, the appreciation decreases, and the personal cost becomes impossible to justify.

The question is who bears the cost when they quit. Sometimes another maintainer steps in. Sometimes the project forks and the forks fragment. Sometimes a critical dependency silently stops receiving security patches, and nobody notices until a vulnerability appears. The Log4Shell incident was not an anomaly. It was an inevitability given the structural dynamics.`,
  },
  {
    slug: "hidden-curriculum-of-remote-work",
    title: "The Hidden Curriculum of Remote Work",
    episodeNumber: 9,
    publishDate: "January 14, 2026",
    duration: "41 min",
    summary:
      "Remote work transferred a lot of coordination overhead back to individuals. It also made the invisible rules of office culture suddenly visible — or invisible in new ways. We look at what remote work reveals about how organisations actually function.",
    body: `When you remove the physical office from the equation, you do not remove organisational culture. You make it explicit. Every norm that was previously enforced by proximity now has to be stated, documented, or negotiated. That is an opportunity and a cost simultaneously.

The hidden curriculum of office work — how to read a room, whose approval matters, when to escalate and when to absorb — is transmitted through observation. In a remote environment, that transmission breaks down. Junior employees who would have absorbed these norms through proximity are now navigating a context they cannot fully read. Senior employees often do not notice, because they already have the map.

The organisations that have navigated this well have done so by making the implicit explicit. They wrote down the things that previously went without saying. They created rituals that substituted for ambient social contact. They accepted that some things that worked in offices would not work remotely, and they let them go rather than forcing a digital approximation.

The ones that have struggled have done so by treating remote work as a temporary deviation from a normal that they expect to return to. That framing makes it impossible to invest seriously in the infrastructure that distributed work actually requires.`,
  },
  {
    slug: "ethical-debt-tech-teams",
    title: "Ethical Debt: When Tech Teams Cut Corners",
    episodeNumber: 10,
    publishDate: "January 21, 2026",
    duration: "53 min",
    summary:
      "Technical debt gets tracked in tickets and sprints. Ethical debt rarely gets tracked at all. We examine what ethical debt looks like in software teams — privacy trade-offs deferred, bias in training data ignored, dark patterns rationalised — and what it costs when it compounds.",
    body: `Technical debt is a useful metaphor because it makes an abstract trade-off concrete. You borrow against future effort in exchange for present speed. The interest compounds. Eventually you pay it back, or the codebase becomes unmaintainable. The metaphor works because software teams have felt the pain.

Ethical debt operates by the same mechanism, but the pain is rarely felt by the people who incurred it. The privacy decision deferred to Q3 that never gets revisited. The bias in the training data that was known about but considered out of scope for the initial launch. The manipulative dark pattern that the team rationalised as industry standard. Each of these is a debt with an interest rate — but the interest is paid by users, not engineers.

The absence of feedback loops is what makes ethical debt so persistent. Technical debt announces itself through slow builds, failing tests, and engineers who refuse to touch certain modules. Ethical debt is often silent until it catastrophically isn't. There is no CI check that fails when you deploy a feature that erodes user trust.

What teams that manage ethical debt well have in common is institutionalised disagreement. They have created processes that make it cheap to raise concerns and expensive to dismiss them. Not because the individuals are more ethical, but because the system makes it harder to ignore signals.`,
  },
  {
    slug: "metrics-that-lie-vanity-vs-signal",
    title: "Metrics That Lie: Vanity vs Signal",
    episodeNumber: 11,
    publishDate: "January 28, 2026",
    duration: "46 min",
    summary:
      "Measuring the wrong thing confidently is worse than not measuring at all. We look at how teams fall in love with metrics that feel meaningful but don't predict outcomes — and how to find the signals that actually do.",
    body: `Every metric is a model. It makes a claim about which aspect of a system matters and how to observe it. A bad metric is not a neutral instrument — it is an argument for the wrong theory of what produces results, and acting on it will produce the wrong results.

The most common failure mode is optimising for things that are easy to measure rather than things that matter. Monthly active users can grow while engagement depth collapses. Story points can increase while customer value delivered decreases. Deployment frequency can go up while team stress goes through the roof. The metric is not lying — it is reporting what it was asked to report. The lie is in the inference.

Vanity metrics are persistent because they are comforting. They are typically positive, typically trending in the right direction, and easy to explain to stakeholders who do not want to sit with complexity. Signal metrics are often uncomfortable — they expose trade-offs, they require context to interpret, and they frequently deliver news that nobody is happy to hear.

The diagnostic question is: if this metric moved in the wrong direction, would we do something about it? Vanity metrics are often immune to that question, because teams know implicitly that the metric is decorative. Signal metrics are ones that, when they move, change what you do. Start there and work backwards to what you should be tracking.`,
  },
  {
    slug: "second-system-effect-revisited",
    title: "The Second System Effect, Revisited",
    episodeNumber: 12,
    publishDate: "February 4, 2026",
    duration: "50 min",
    summary:
      "Fred Brooks described the second system effect in 1975. Fifty years later, teams are still building ambitious rewrites that collapse under their own scope. We revisit the pattern, explore why it persists, and ask whether it is ever avoidable.",
    body: `Fred Brooks described the second system effect as a pattern where the engineer who successfully delivered a small, constrained first system accumulates ideas that could not fit into it — and dumps them all into the second. The result is an over-engineered system that frequently fails to ship or ships in a form less useful than what it replaced.

The pattern survives because it is driven by a combination of forces that do not go away: accumulated design debt from the first system, inflated confidence from its success, and the genuine desire to do it right this time. None of these forces are irrational. Their combination, however, is reliably dangerous.

Modern software teams encounter the second system effect most visibly in full rewrites. The old codebase is slow, the architecture is wrong, the team hates working in it. The rewrite begins with high morale and ambitious plans. Eighteen months in, the new system replicates forty percent of the old system's features while introducing new constraints nobody anticipated, and the organisation is running two systems in parallel with the team stretched between them.

The teams that escape the pattern do so by treating scope as the primary constraint from the beginning, not as a problem to solve later. They ask not "what should the new system be?" but "what is the smallest version of the new system that makes the old system optional?" The constraint is uncomfortable. It saves the project.`,
  },
  {
    slug: "trust-distributed-teams",
    title: "Trust and the Distributed Team",
    episodeNumber: 13,
    publishDate: "February 11, 2026",
    duration: "42 min",
    summary:
      "Trust is the operating system of effective teams. In co-located organisations, it is built through proximity and shared experience. In distributed teams, it has to be designed. We look at what the research says and what practitioners have learned.",
    body: `Trust is not a feeling. It is a prediction — a confidence that another person will act in ways that are consistent with what you need from them. In a co-located team, that prediction is calibrated through hundreds of small data points: the way someone responds in a tense meeting, how they handle an unexpected problem, whether they follow through on small commitments. Distributed teams lose most of that signal.

What takes its place has to be intentional. The research on trust in distributed teams identifies two types: cognitive trust, based on competence and reliability, and affective trust, based on care and relationship. Co-located teams build both naturally. Distributed teams tend to build cognitive trust readily — they can assess competence through work products — and struggle with affective trust, which requires more intentional investment.

The teams that build high affective trust in distributed environments do so through a combination of structured rituals and genuine discretionary effort. Regular synchronous time that is not task-focused. Clear and consistent follow-through on commitments, no matter how small. Explicit expressions of care about people as people. These are not complicated. They are, however, easy to deprioritise when the calendar is full.

The most common trust failure in distributed teams is the trust repair failure: when trust breaks down through misunderstanding or miscommunication, the repair mechanism that would work in a co-located context — an overheard conversation, a shared lunch, ambient signals of goodwill — is simply not available. Explicit repair processes are not optional in distributed teams. They are infrastructure.`,
  },
  {
    slug: "learning-velocity-fast-teams",
    title: "Learning Velocity: How Fast Teams Stay Sharp",
    episodeNumber: 14,
    publishDate: "February 18, 2026",
    duration: "45 min",
    summary:
      "The teams that stay technically sharp over multiple years share a common characteristic: they treat learning as a system, not a personal responsibility. We look at what high-learning-velocity teams do differently and how to build those systems intentionally.",
    body: `Every technical team faces the same entropy: knowledge that was current yesterday becomes outdated, tools evolve, new approaches emerge. Teams that stay sharp are not staffed with unusually motivated individuals — they have built systems that make continuous learning the path of least resistance rather than an act of willpower.

The distinction between learning as a system and learning as a personal responsibility matters enormously in practice. When learning is personal, it happens at inconsistent rates, it is not shared, and it decays when individuals leave. When learning is systematic, the team's collective knowledge grows independently of any individual, and new hires can tap into accumulated understanding rather than starting from zero.

High-learning-velocity teams share some consistent structural features. They have regular structured time for technical exploration that is protected from feature work. They have knowledge-sharing practices that are low-effort and high-visibility — short internal talks, written explorations, annotated code. They treat learning from mistakes as infrastructure rather than an afterthought — blameless retrospectives are the most visible version of this, but the practice extends to code review, architecture decisions, and postmortems.

The most underrated element is psychological safety in the learning context specifically. Teams where asking a question is socially costly accumulate knowledge silently and share it rarely. Teams where asking questions is normal accumulate knowledge collectively and spread it efficiently. The structural difference between these two states is often a single norm set by the team's most senior technical person.`,
  },
  {
    slug: "cost-of-context-switching",
    title: "The Cost of Context Switching",
    episodeNumber: 15,
    publishDate: "February 25, 2026",
    duration: "38 min",
    summary:
      "The research on context switching is unambiguous: it is expensive. But the costs are rarely felt by the person creating the context switches. We trace how fragmented schedules are manufactured and what it takes to stop the bleeding.",
    body: `The cognitive cost of context switching is well-documented. Switching between tasks introduces a switching cost — the time and cognitive energy required to load the new context and release the old one. For tasks that require deep focus, this cost is significant: studies consistently estimate ten to twenty minutes of recovery time per major context switch.

What is less discussed is who manufactures the context switches. In most knowledge work environments, the switches are not imposed by the work — they are imposed by the social and organisational infrastructure. Meetings that could be emails. Emails that require immediate responses. Slack messages that create a background expectation of availability. Each of these is a choice made by someone else about how your time is spent.

The economic structure of the problem is that the person who interrupts bears almost none of the cost. An interruption costs the interrupter ten seconds and the interrupted party fifteen minutes. That asymmetry means the market for interruptions, left unregulated, clears at a volume that is far too high for productive work.

The solutions that work are asymmetric by design. They make it slightly more effortful to interrupt than to wait. They protect blocks of time at the team level rather than leaving individuals to defend their own calendars. They normalise slow responses and abnormalise urgency. None of these are technically difficult. All of them require genuine organisational commitment, because they conflict with the default that equates availability with effort.`,
  },
  {
    slug: "breaking-things-gracefully",
    title: "Breaking Things Gracefully: Resilience by Design",
    episodeNumber: 16,
    publishDate: "March 4, 2026",
    duration: "55 min",
    summary:
      "Systems fail. The question is not whether they will break but how they break and whether the break is survivable. We explore what resilience engineering actually means in practice and why the most robust systems are designed to fail gracefully.",
    body: `Resilience is not the absence of failure. It is the property that determines what happens when failure arrives. A brittle system fails catastrophically. A resilient system degrades gracefully, contains failures, and recovers predictably.

The most important insight in resilience engineering is that failures are rarely caused by single points. They are caused by the intersection of multiple latent conditions that were each, individually, insufficient to cause a failure. The Challenger disaster. The 2003 Northeast blackout. Every significant software incident you have ever been in an on-call rotation for. The common thread is not a single broken component — it is a system whose safety margins had eroded below the threshold required to absorb an unexpected combination of stresses.

Building for graceful degradation requires accepting a trade-off that makes many engineers uncomfortable: you build more complexity into the normal path in order to constrain the failure path. Circuit breakers, bulkheads, retries with backoff, graceful timeouts — these are all complexity additions. Their value is invisible when everything is working. Their value is decisive when something is not.

The organisational dimension of resilience is as important as the technical one. Systems are maintained by people. People are embedded in incentive structures. If the incentive structure rewards feature velocity over operational stability — and most do — the safety margins get borrowed against. Not maliciously, but incrementally. Every borrowed margin is a quiet bet that the conditions for failure will not arrive before it is repaid.`,
  },
  {
    slug: "feedback-loops-high-stakes",
    title: "Feedback Loops in High-Stakes Systems",
    episodeNumber: 17,
    publishDate: "March 11, 2026",
    duration: "58 min",
    summary:
      "Fast feedback loops are a founding principle of agile development. But not all feedback loops are created equal. We examine how feedback loop design shapes organisational behaviour — and what happens when the loop is broken, inverted, or too fast.",
    body: `A feedback loop is a mechanism by which a system receives information about its own behaviour and uses that information to adjust. In software, we have trained ourselves to believe faster feedback is always better. That belief is mostly right and partially wrong.

The part that is mostly right: slow feedback loops hide problems and delay learning. When there are weeks between writing code and seeing its effects in production, you lose the ability to connect cause and effect. Fast feedback — short CI cycles, feature flags, continuous deployment — compresses that gap and accelerates learning. These are genuine goods.

The part that is partially wrong: some feedback loops are genuinely too fast for human cognition to use well. Algorithmic trading systems have learned this the hard way. When a loop runs faster than human reaction time and faster than human understanding can keep pace with, the feedback stops being informative and starts being destabilising. The Flash Crash of 2010 is the most famous example, but the pattern appears in content moderation, in social media recommendation, in any system where the loop is tight enough that the correction causes the next problem faster than any human can understand what happened.

The design question is: what is the right speed for this loop? Fast enough to surface problems before they compound. Slow enough to allow understanding before response. The answer is different for different domains, and calibrating it well requires understanding the human systems that will act on the feedback, not just the technical systems generating it.`,
  },
  {
    slug: "quiet-power-of-documentation",
    title: "The Quiet Power of Documentation",
    episodeNumber: 18,
    publishDate: "March 18, 2026",
    duration: "40 min",
    summary:
      "Documentation is treated as a maintenance cost by most teams and as a strategic asset by a few. We explore why the few are right, what makes documentation actually useful, and why most attempts to improve it fail despite good intentions.",
    body: `Documentation is one of the most consistently undervalued practices in software engineering, and the undervaluation is not irrational from the individual's perspective. Writing documentation is slow, the benefits are mostly felt by future people rather than the present person, and the lack of documentation rarely creates immediate visible pain. The costs are diffuse. The benefits are delayed. The incentive to deprioritise it is structural.

The teams that have figured out documentation do so by solving the incentive problem rather than the skills problem. Most attempts to improve documentation assume the bottleneck is that people do not know how to write well. It is not. The bottleneck is that documentation has no natural owner and no natural moment. It competes with everything else for time and always loses.

The structural fix is to make documentation unavoidable at decision points. Architecture decisions documented as Architecture Decision Records. Onboarding paths that require contributors to write documentation as the price of contribution. Code review checklists that include documentation requirements. None of these are technically sophisticated. All of them change the economics of when documentation happens.

What good documentation actually looks like is also worth describing. Not comprehensive — comprehensive documentation is usually wrong by the time it is written. Accurate at the level of decision rationale rather than implementation detail. Structured to answer the questions that new people actually ask rather than the questions that existing people think they should ask.`,
  },
  {
    slug: "async-by-default-team-communication",
    title: "Async by Default: Rethinking Team Communication",
    episodeNumber: 19,
    publishDate: "March 25, 2026",
    duration: "44 min",
    summary:
      "Asynchronous communication is not just a remote work tool — it is a design philosophy about how information should move through organisations. We examine what async-first teams do differently and what it requires of leaders and individual contributors alike.",
    body: `The default communication mode in most organisations is synchronous: meetings, phone calls, real-time chat. The assumption built into this default is that fast information exchange is always preferable to slow information exchange. That assumption is expensive.

Synchronous communication has a specific, irreplaceable value: it is good at building shared context quickly, resolving genuinely ambiguous situations, and maintaining social connection. It is not particularly good at producing decisions, communicating complex information, or distributing knowledge across teams and time zones. Most organisations use it for everything, and most organisations would benefit from using it for less.

Async-first teams make a different default assumption: if a communication can wait, it should wait, and the waiting time should be used to write it down properly. The discipline of writing forces clarity that verbal communication does not require. When you have to write down what you are proposing and why, you find the holes in your argument. The act of articulation is itself a quality check.

The cultural shift required is substantial. Leaders who equate responsiveness with engagement have to learn to read engagement differently. Individual contributors who use real-time chat as a substitute for thinking have to learn to think first. The transition is uncomfortable. The teams that have made it consistently report lower meeting load, better documentation, and faster onboarding for new hires, because the context they need has been written down rather than living inside a small number of people's heads.`,
  },
  {
    slug: "technical-interview-mistakes",
    title: "What We Get Wrong About Technical Interviews",
    episodeNumber: 20,
    publishDate: "April 1, 2026",
    duration: "52 min",
    summary:
      "Technical interviews have barely changed in two decades despite substantial evidence that their predictive validity is poor. We examine the hidden biases in whiteboard problems, live coding exercises, and culture fit conversations — and explore what a more signal-rich process could look like.",
    body: `The standard technical interview — a whiteboard problem, a live coding exercise, and a culture fit conversation — was not designed. It evolved from informal practices at a handful of companies in the 1990s and became the industry default by imitation. Its predictive validity for actual job performance is, according to multiple independent analyses, unremarkable.

The research on hiring consistently shows that the biggest predictors of actual performance are structured interviews and work sample tests — asking candidates to do work representative of the job and evaluating it against explicit criteria. These are not new insights. They have been in the industrial-organisational psychology literature for decades. The gap between what the research recommends and what the industry does is striking.

The persistence of the status quo is not mysterious. Interviews are conducted by people who succeeded in the current process, which produces a natural bias toward preserving it. The process also serves functions beyond selection: it creates a shared experience, it signals cultural membership, and it provides candidates a window into the team. These are not nothing. They do not, however, justify a process with weak predictive validity.

The more interesting question is what would actually work better. Take-home projects address some of the anxiety of live performance but introduce their own biases around time availability. Pair programming exercises are more representative but introduce interpersonal dynamics. The teams that have moved toward structured, criterion-referenced evaluation consistently report better outcomes and more diverse hiring. The path exists. It requires deliberately giving up the rituals that feel meaningful even though the evidence for their value is thin.`,
  },
];
