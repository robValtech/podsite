---
description: "Use when creating or updating React component tests, Vitest component tests, RTL tests, or accessibility assertions for components. Read the accessibility persona collection and report persona coverage for the component in the final response."
applyTo: "@/components/**/*.test.tsx"
---

# Component Test Persona Guidance

Before you create or modify a component test file, read:

- `.github/accessibility-personas/persona-collection.json`
- `.github/accessibility-personas/persona-collection.schema.json`

Use the persona collection to decide which personas are relevant to the component being tested.

## Required workflow

1. Read the persona collection before editing the test.
2. Identify which personas are:

- primary: directly exercised by the component's behavior or layout
- secondary: relevant but only partially covered by the component or current test scope
- not applicable: not meaningfully exercised by this component

3. List how certain persona based on their interactions, layout, focus behavior, affordance, or accessibility needs are covered by the test scenarios. Be specific about which assertions or interactions map to which personas.
4. Run the `A11y coverage gap analysis`
5. In your final response, include a `Persona Coverage` section.

## A11y coverage gap analysis

Analyse the current test scenarios in the current test file and highlight which personas are covered by the existing tests, and identify any gaps in coverage where a persona's needs or interactions are not fully exercised by the current test scenarios.

For any relevant personas that cannot be fully covered by automated component tests, identify the specific gaps in testing coverage and explain why they cannot be tested at this level. This might include things like visual focus indicators, screen reader announcements, hover states, mobile touch interactions, or any other aspect of the user experience that requires manual review, different automation tools or E2E testing on real devices.

For any case an automated test can cover with 100% confidence a personas needs in the current test file, make suggestion to add said test scenario if it's not already covered. If a persona is relevant but should not be enforced at component-test level, say so explicitly and explain whether the gap belongs in E2E, visual, or manual testing instead.

Manual testing gaps should be listed in a `Manual persona coverage` section in the final response, using the `Manual persona coverage output format` described below.

Testing gaps that can be automated outside the component test file (e.g. in E2E or visual tests) should be listed in the `Page level testing` section in the final response, along with an explanation of why they cannot be fully covered at component-test level.

## Page level testing (Playwright and axe-core)

Highlight accessibility checks that could not be covered with 100% confidence and accuracy either directly or heuristically in the current tests. in the component tests and would require manual review or E2E testing on real devices.

## Manual testing gaps

Any converage gap identified above that cannot be fully covered by automated tests at any level should be listed here using the `Manual persona coverage output format`.

### Manual persona coverage output format

- `### firstName (<persona-id>):` — `device, input method, or specific accessibility need`;

Explain which part of the component maps to the persona and why it cannot be fully covered by automated tests.

Provide specific steps the manual tester should take to validate the component from this persona's perspective, and any particular things they should look for or interact with during testing. For example, if the gap is related to visual focus indicators, the tester should use keyboard navigation to interact with the component and observe whether focus states are visually discernible and meet accessibility standards. The steps should be actionable and clear to ensure that the manual tester can effectively evaluate the component's accessibility for that persona exactly the same way that persona would test it themselves.

## Persona Coverage output format

Use one bullet per persona that you considered.

- `<persona-id> (firstName, lastName)` — `primary|secondary|not applicable`; explain which part of the component maps to the persona and whether the test now covers it, partially covers it, or intentionally does not cover it.

Keep each bullet concrete. Mention the interaction, layout, focus behavior, affordance, or accessibility assertion that drove the decision.

List the testing gaps where automated testing cannot be 100% substituted for manual testing from each considered persona's perspective.

## Scope guidance

- Prefer Pam for keyboard-only workflows, focus order, focus visibility, and key activation.
- Prefer Rob for pointer affordance, click targets, hover-only risk, and semantic clickability.
- Prefer Amira for mobile layout, touch targets, viewport resilience, and interruption-sensitive flows.
- If a persona is relevant but should not be enforced at component-test level, say so explicitly and explain whether the gap belongs in E2E, visual, or manual testing instead.
- Do not claim persona coverage without tying it to an actual assertion, an existing semantic guarantee, or an explicit out-of-scope rationale.
- MUST NOT edit the persona collection or schema as part of this task. If you think a persona or attribute is missing or should be modified, raise it for manual review rather than making an assumption. The goal is to have a stable and well defined set of personas that we can rely on for consistent accessibility coverage, so when in doubt, ask for clarification rather than guessing.
- MUST NOT edit the instructions in this file to add new sections, properties, or requirements. If you think something is missing or should be modified, raise it for manual review rather than making an assumption. The goal is to have a clear and consistent set of instructions that we can rely on for consistent test coverage, so when in doubt, ask for clarification rather than guessing.
